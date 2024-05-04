# 🔍 MakerDAO Mini-Explorer

## Introduction

🧪 This project represents mock explorer for Maker Protocol. [The Maker Protocol](https://makerdao.com/en/whitepaper), also known as the Multi-Collateral Dai (MCD) system, allows users to generate Dai by leveraging collateral assets approved by “Maker Governance.”

🏦 This tool aims to provide an intuitive interface for exploring existing CDPs, focusing on providing real-time data regarding collateral types, debt levels, and other essential metrics critical for understanding and managing CDPs effectively. CDPs are fundamental to the functioning of the Maker Protocol. They allow users to lock collateral assets in a smart contract and mint Dai against these assets.

⚙️ Built using NextJS, RainbowKit, Hardhat, Foundry, Wagmi, Viem and Typescript.

- 🔍 Find Closest Vaults: Locate the nearest 20 vaults based on a specified ID and collateral type.

- 📊 Check Position Metrics: Examine position collateral, debt, and collateralization ratio.
  Determine the maximum and minimum values necessary to maintain the position above the required ratio.

📝 VaultInfoV2 contract, which includes totalDebt calculation, is [deployed and verified](https://etherscan.io/address/0xfBc1243f0E160D2744721D6D9a909C8DC124A87E) on Ethereum.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Quick start

**Clone the Repository**

```bash
git clone https://github.com/vaniiiii/maker-explorer.git
cd maker-explorer
```

### Setting Up the Frontend

1. Install Dependencies

```bash
cd nextjs
npm install
```

2. Run NextJS App

```bash
npx next dev
```

Visit http://localhost:3000 to view the app. On the `Homepage`, you can perform searches, and on the `Vaults` page, you can check position metrics.

### Setting Up Smart Contracts (Optional)

1. Install Dependencies

```bash
cd hardhat
npm install
```

2. Compile and Test Contracts

```bash
forge build
forge test
```

3. Deploy contracts

To deploy the contracts to the Ethereum network, first fill out the `.envexample` template and rename it to `.env`. Then, run the deployment script:

```bash
npx hardhat deploy --network ethereum
```
