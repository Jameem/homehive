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
    transaction = await escrow.connect(seller).list(1);
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
    it('Updates ownership', async () => {
      expect(await property.ownerOf(1)).to.be.equal(escrowAddress);
    });
  });
});
