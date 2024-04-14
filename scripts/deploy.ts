import { properties } from '../metadata/properties';

const { ethers } = require('hardhat');

const tokens = (n: number) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

async function main() {
  // Setup accounts
  const [buyer, seller, inspector, lender] = await ethers.getSigners();

  // Deploy Property contract
  const Property = await ethers.getContractFactory('Property');
  const property = await Property.deploy();
  await property.waitForDeployment();

  console.log(`Deployed Property Contract at: ${await property.getAddress()}`);
  console.log(`Minting 3 properties...\n`);

  for (let i = 1; i <= 3; i++) {
    const transaction = await property
      .connect(seller)
      .mint(properties[`property${i}`]);
    await transaction.wait();
  }
  console.log(`Deploying escrow...\n`);

  // Deploy Escrow
  const Escrow = await ethers.getContractFactory('Escrow');
  const propertyAddress = await property.getAddress();
  const escrow = await Escrow.deploy(
    propertyAddress,
    seller.address,
    inspector.address,
    lender.address
  );
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();

  console.log(`Deployed Escrow Contract at: ${escrowAddress}`);
  console.log(`Listing 3 properties...\n`);

  for (let i = 1; i <= 3; i++) {
    // Approve properties...
    const transaction = await property
      .connect(seller)
      .approve(escrowAddress, i);
    await transaction.wait();
  }

  // Listing properties...
  let transaction = await escrow
    .connect(seller)
    .list(1, buyer.address, tokens(20), tokens(10));
  await transaction.wait();

  transaction = await escrow
    .connect(seller)
    .list(2, buyer.address, tokens(15), tokens(5));
  await transaction.wait();

  transaction = await escrow
    .connect(seller)
    .list(3, buyer.address, tokens(10), tokens(5));
  await transaction.wait();

  console.log(`Finished.`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
