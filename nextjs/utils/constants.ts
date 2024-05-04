import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { createConfig } from "wagmi";
import { bytesToString } from "@/utils/utils";
import * as C from "@/utils/constants";

interface IlkConfig {
  [key: string]: { price: number; liqRatio: number };
}

const RAY = 10 ** 27;
const MAX_RPC_CALLS = 5;
const MAX_RETRIES = 3;
const CALLDATA_LIMIT = 50_000;
const DESIRED_VAULTS = 20;

const BATCH_SIZE_ETH = 10;
const BATCH_SIZE_OTHERS = 100;
const MAX_BATCH_SIZE = 1000;

const ALCHEMY_API_KEY = "";

const VAULT_INFO_ADDRESS = "0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d";
const MANAGER_ADDRESS = "0x5ef30b9986345249bc32d8928B7ee64DE9435E39";
const VAULT_INFO_V2_ADDRESS = "0xfBc1243f0E160D2744721D6D9a909C8DC124A87E";

const VAULT_INFO_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "cdpId",
        type: "uint256",
      },
    ],
    name: "getCdpInfo",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "avatar",
        type: "address",
      },
      {
        internalType: "address",
        name: "urn",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "ilk",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "ink",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "art",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const MANAGER_ABI = [
  {
    constant: true,
    inputs: [],
    name: "cdpi",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const VAULT_INFO_V2_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "_cdpId", type: "uint256" }],
    name: "getCdpInfo",
    outputs: [
      { internalType: "address", name: "urnAddr", type: "address" },
      { internalType: "address", name: "ownerAddr", type: "address" },
      { internalType: "address", name: "userAddr", type: "address" },
      { internalType: "bytes32", name: "ilk", type: "bytes32" },
      { internalType: "uint256", name: "collateral", type: "uint256" },
      { internalType: "uint256", name: "debt", type: "uint256" },
      { internalType: "uint256", name: "totalDebt", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ETH_PRICE = 3200;
const BTC_PRICE = 63000;
const USDC_PRICE = 1;
const OTHER_PRICE = 1000;

const ETH_LIQ_RATIO = 1.45;
const BTC_LIQ_RATIO = 1.5;
const USDC_LIQ_RATIO = 1.01;
const OTHER_LIQ_RATIO = 1.5;

const ILK_CONFIG: IlkConfig = {
  ETH: { price: ETH_PRICE, liqRatio: ETH_LIQ_RATIO },
  WBTC: { price: BTC_PRICE, liqRatio: BTC_LIQ_RATIO },
  USDC: { price: USDC_PRICE, liqRatio: USDC_LIQ_RATIO },
  OTHER: {
    price: OTHER_PRICE,
    liqRatio: OTHER_LIQ_RATIO,
  },
};

const client = createPublicClient({
  chain: mainnet,
  transport: http(C.ALCHEMY_API_KEY),
  batch: {
    multicall: {
      batchSize: C.CALLDATA_LIMIT,
    },
  },
});

export {
  RAY,
  MAX_RPC_CALLS,
  MAX_RETRIES,
  ALCHEMY_API_KEY,
  DESIRED_VAULTS,
  BATCH_SIZE_ETH,
  BATCH_SIZE_OTHERS,
  MAX_BATCH_SIZE,
  CALLDATA_LIMIT,
  VAULT_INFO_ADDRESS,
  VAULT_INFO_ABI,
  MANAGER_ADDRESS,
  MANAGER_ABI,
  VAULT_INFO_V2_ADDRESS,
  VAULT_INFO_V2_ABI,
  ILK_CONFIG,
  client,
};
