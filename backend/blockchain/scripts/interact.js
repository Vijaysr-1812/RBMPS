const { ethers } = require("hardhat");

async function main() {
  // Get accounts from the local Hardhat network
  const deployer = await ethers.getSigners();

  console.log("Deploying contract with:", deployer[0].address);

  // Compile and deploy the Token contract
  const Token = await ethers.getContractFactory("GreenToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  console.log("Token contract deployed to:", token.target);

  

  // Try minting from a non-owner account (should fail)
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});