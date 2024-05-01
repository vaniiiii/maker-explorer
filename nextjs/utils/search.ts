import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import * as C from '@/utils/constants';

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export async function search(collateralType: string, vaultNumber: string) {
  const result = await client.readContract({
    "abi": C.VAULT_INFO_ABI,
    "address": C.VAULT_INFO_ADDRESS,
    functionName: "getCdpInfo",
    args: [vaultNumber],
  })
  return result
}