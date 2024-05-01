import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { bytesToString } from '@/utils/utils';
import * as C from '@/utils/constants';

const client = createPublicClient({
  chain: mainnet,
  transport: http(C.ALCHEMY_API_KEY),
})

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchVault(id: number, retryCount = 3) {
  const data: any = await client.readContract({
    "abi": C.VAULT_INFO_ABI,
    "address": C.VAULT_INFO_ADDRESS,
    functionName: "getCdpInfo",
    args: [id],
  });

  const ilk = data ? bytesToString(data[3]) : "";
  return { id, ilk };
}

export async function search(collateralType: string, roughCdpId: string) {
  const totalVaults: number = await client.readContract({
    "abi": C.MANAGER_ABI,
    "address": C.MANAGER_ADDRESS,
    functionName: "cdpi",
    args: [],
  }) as number;

  let lowerId = parseInt(roughCdpId);
  let upperId = parseInt(roughCdpId) + 1;

  const vaults = [];
  let apiCallCount = 0;

  while (lowerId > 0 || upperId <= totalVaults) {
    const lowerCalls = [];
    const upperCalls = [];

    for (let i = 0; i < 5 && lowerId > 0; i++) {
      lowerCalls.push(fetchVault(lowerId--));
      apiCallCount++;
    }
    for (let i = 0; i < 5 && upperId <= totalVaults; i++) {
      upperCalls.push(fetchVault(upperId++));
      apiCallCount++;
    }

    if (apiCallCount >= 40) {
      await delay(100); // @dev rate-limit to 40 calls per 100ms
      apiCallCount = 0;
    }

    const completedCalls = await Promise.all([...lowerCalls, ...upperCalls].map(p => p.catch(e => e)));

    for (const completedCall of completedCalls) {
      if (completedCall.ilk === collateralType) {
        vaults.push(completedCall.id);
      }
    }

    if (vaults.length >= 20) break;
  }

  vaults.sort((a, b) => Math.abs(a - parseInt(roughCdpId)) - Math.abs(b - parseInt(roughCdpId)));

  return vaults.length < 20 ? vaults.slice(0, vaults.length) : vaults.slice(0, 20);
}
