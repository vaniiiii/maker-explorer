import { ethers } from "hardhat";
import hre from "hardhat";
import { VaultInfoV2, VaultInfoV2__factory } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const vaultInfoV2Factory: VaultInfoV2__factory =
    (await hre.ethers.getContractFactory(
      "VaultInfoV2"
    )) as VaultInfoV2__factory;
  const vaultInfoV2Deployer: VaultInfoV2 = await vaultInfoV2Factory
    .connect(deployer)
    .deploy();

  const vaultInfoV2 = await vaultInfoV2Deployer.waitForDeployment();
  console.log("✅ VaultInfoV2 deployed to:", await vaultInfoV2.getAddress());

  // run npx hardhat verify --network ethereum ${contractAddy} command to verify
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
