const VAULT_INFO_ADDRESS = "0x68C61AF097b834c68eA6EA5e46aF6c04E8945B2d";

const VAULT_INFO_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cdpId",
        "type": "uint256"
      }
    ],
    "name": "getCdpInfo",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "avatar",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "urn",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "ilk",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "ink",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "art",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const ETH_PRICE = 3200;
const BTC_PRICE = 63000;

const ETH_LIQ_RATIO = 1.45;
const BTC_LIQ_RATIO = 1.5;
const USDC_LIQ_RATIO = 1.01;

export { VAULT_INFO_ADDRESS, VAULT_INFO_ABI, ETH_PRICE, BTC_PRICE, ETH_LIQ_RATIO, BTC_LIQ_RATIO, USDC_LIQ_RATIO };