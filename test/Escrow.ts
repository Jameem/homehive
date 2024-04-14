import { expect } from 'chai';

const { ethers } = require('hardhat');

const testProperty = {
  name: '293 Lafayette St PENTHOUSE 1, New York, NY 10012',
  description: 'Luxury NYC Penthouse',
  image: 'https://ipfs.io/ipfs/QmUsuRJyRUmeHzZxes5FRMkc4mjx35HbaTzHzzWoiRdT5G',
  attributes: [
    {
      address: 'Address',
      value: '293 Lafayette St PENTHOUSE 1, New York, NY 10012',
    },
    {
      purchase_price: 'Purchase Price',
      value: '',
    },
    {
      beds: 'Bed Rooms',
      value: 5,
    },
    {
      baths: 'Bathrooms',
      value: 12,
    },
    {
      square_feet: 'Square Feet',
      value: 7241,
    },
    {
      year_built: 'Year Built',
      value: 1885,
    },
  ],
};

const tokens = (n: number) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

describe('Escrow', () => {
  let buyer, seller, inspector, lender;
  let property, escrow, escrowAddress;

  beforeEach(async () => {
    // Setup accounts
    [buyer, seller, inspector, lender] = await ethers.getSigners();

    // Deploy Real Estate
    const RealEstate = await ethers.getContractFactory('Property');
    property = await RealEstate.deploy();

    // Mint
    let transaction = await property.connect(seller).mint(testProperty);
    await transaction.wait();

    // Deploy Escrow
    const Escrow = await ethers.getContractFactory('Escrow');
    const propertyAddress = await property.getAddress();
    escrow = await Escrow.deploy(
      propertyAddress,
      seller.address,
      inspector.address,
      lender.address
    );

    // Approve Property
    escrowAddress = await escrow.getAddress();
    transaction = await property.connect(seller).approve(escrowAddress, 1);
    await transaction.wait();

    // List Property
    transaction = await escrow
      .connect(seller)
      .list(1, buyer.address, tokens(7), tokens(2));
    await transaction.wait();
  });

  describe('Deployment', () => {
    it('Returns NFT address', async () => {
      const result = await escrow.nftAddress();
      const propertyAddress = await property.getAddress();
      expect(result).to.be.equal(propertyAddress);
    });

    it('Returns seller', async () => {
      const result = await escrow.seller();
      expect(result).to.be.equal(seller.address);
    });

    it('Returns inspector', async () => {
      const result = await escrow.inspector();
      expect(result).to.be.equal(inspector.address);
    });

    it('Returns lender', async () => {
      const result = await escrow.lender();
      expect(result).to.be.equal(lender.address);
    });
  });

  describe('Listing', () => {
    it('Updates as listed', async () => {
      const result = await escrow.isListed(1);
      expect(result).to.be.equal(true);
    });

    it('Updates ownership', async () => {
      expect(await property.ownerOf(1)).to.be.equal(escrowAddress);
    });

    it('Returns the buyer', async () => {
      const buyer = await escrow.buyer(1);
      expect(buyer).to.be.equal(buyer);
    });

    it('Returns the purchase price', async () => {
      const purchasePrice = await escrow.purchasePrice(1);
      expect(purchasePrice).to.be.equal(purchasePrice);
    });

    it('Returns the escrow amount', async () => {
      const escrowAmount = await escrow.escrowAmount(1);
      expect(escrowAmount).to.be.equal(escrowAmount);
    });
  });

  describe('Deposits', () => {
    it('Updates contract balance', async () => {
      const transaction = await escrow
        .connect(buyer)
        .depositEarnest(1, { value: tokens(5) });
      await transaction.wait();
      const balance = await escrow.getBalance();

      expect(balance).to.be.equal(tokens(5));
    });
  });

  describe('Inspection', () => {
    it('Updates inspection status', async () => {
      const transaction = await escrow
        .connect(inspector)
        .updateInspectionStatus(1, true);
      await transaction.wait();
      const passed = await escrow.inspectionPassed(1);

      expect(passed).to.be.equal(true);
    });
  });

  describe('Approval', () => {
    it('Updates approval status', async () => {
      const buyerTransaction = await escrow.connect(buyer).approveSale(1);
      await buyerTransaction.wait();

      const sellerTransaction = await escrow.connect(seller).approveSale(1);
      await sellerTransaction.wait();

      const inspectorTransaction = await escrow
        .connect(inspector)
        .approveSale(1);
      await inspectorTransaction.wait();

      expect(await escrow.approval(1, buyer.address)).to.be.equal(true);
      expect(await escrow.approval(1, seller.address)).to.be.equal(true);
      expect(await escrow.approval(1, inspector.address)).to.be.equal(true);
    });
  });

  describe('Sale', async () => {
    beforeEach(async () => {
      let transaction = await escrow
        .connect(buyer)
        .depositEarnest(1, { value: tokens(5) });

      await transaction.wait();

      transaction = await escrow
        .connect(inspector)
        .updateInspectionStatus(1, true);
      await transaction.wait();

      transaction = await escrow.connect(buyer).approveSale(1);
      await transaction.wait();

      transaction = await escrow.connect(seller).approveSale(1);
      await transaction.wait();

      transaction = await escrow.connect(lender).approveSale(1);
      await transaction.wait();

      await lender.sendTransaction({ to: escrowAddress, value: tokens(5) });

      transaction = await escrow.connect(seller).finalizeSale(1);
      await transaction.wait();
    });

    it('Updates the ownership', async () => {
      expect(await property.ownerOf(1)).to.be.equal(buyer.address);
    });

    it('Updates balance', async () => {
      expect(await escrow.getBalance()).to.be.equal(0);
    });
  });
});
