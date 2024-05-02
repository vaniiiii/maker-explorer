import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.25",
    settings: {
      evmVersion: "shanghai",
      optimizer: {
        enabled: true,
        runs: 200,
      }
    },
  },
  etherscan: {
    // npx hardhat verify --network rinkeby {contractAddress} [{constructor arguments}]
    apiKey:
      process.env.ETHERSCAN_API_KEY !== undefined ? process.env.ETHERSCAN_API_KEY : '',
  },
  sourcify: {
    enabled: true
  },
  networks: {
    ethereum: {
      chainId: 1,
      url: 'https://cloudflare-eth.com',
      accounts: process.env.DEPLOYER_PRIVATE_KEY !== undefined ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    }
  }
}

export default config;