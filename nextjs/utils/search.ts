import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { bytesToString } from "@/utils/utils";
import * as C from "@/utils/constants";

const client = C.client;

export async function search(
  collateralType: string,
  roughCdpId: string,
  setProgress: (progress: number) => void
) {
  const totalVaults: number = parseInt(
    (await client.readContract({
      abi: C.MANAGER_ABI,
      address: C.MANAGER_ADDRESS,
      functionName: "cdpi",
      args: [],
    })) as string
  );

  if (parseInt(roughCdpId) > totalVaults) {
    throw new Error(
      `Invalid vault ID: Please enter a number between 1 and ${totalVaults}`
    );
  }

  let lowerId = parseInt(roughCdpId);
  let upperId = parseInt(roughCdpId) + 1;

  const vaults: number[] = [];

  const batchSize =
    collateralType === "ETH-A" ? C.BATCH_SIZE_ETH : C.BATCH_SIZE_OTHERS;

  while (lowerId > 0 || upperId <= totalVaults) {
    let callCountLower: number = lowerId > 0 ? batchSize : 0;
    let callCountUpper: number = upperId <= totalVaults ? batchSize : 0;

    if (callCountLower == 0) {
      callCountUpper = 2 * batchSize;
    } else if (callCountUpper == 0) {
      callCountLower = 2 * batchSize;
    }

    let calls: any = [];
    for (let i = 0; i < callCountLower && lowerId > 0; i++, lowerId--) {
      calls.push({
        address: C.VAULT_INFO_ADDRESS,
        abi: C.VAULT_INFO_ABI,
        functionName: "getCdpInfo",
        args: [lowerId],
      });
    }
    for (
      let i = 0;
      i < callCountUpper && upperId <= totalVaults;
      i++, upperId++
    ) {
      calls.push({
        address: C.VAULT_INFO_ADDRESS,
        abi: C.VAULT_INFO_ABI,
        functionName: "getCdpInfo",
        args: [upperId],
      });
    }

    let attempts = 0;
    let failedCalls: any = [];

    do {
      try {
        const results = await client.multicall({ contracts: calls });
        failedCalls = [];

        results.forEach((result: any, index: number) => {
          if (
            result.status === "success" &&
            bytesToString(result.result[3]) === collateralType
          ) {
            vaults.push(calls[index].args[0]);
            setProgress(
              Math.min(100, (vaults.length / C.DESIRED_VAULTS) * 100)
            );
          } else if (result.status === "failure") {
            failedCalls.push(calls[index]);
          }
        });

        if (failedCalls.length === 0) break;

        calls = failedCalls;
        attempts++;
      } catch (e) {
        console.error("Failed during multicall fetch:", e);
        if (++attempts >= C.MAX_RETRIES) throw e;
      }
    } while (failedCalls.length > 0 && attempts < C.MAX_RETRIES);

    if (vaults.length >= C.DESIRED_VAULTS) break;
  }

  setProgress(100);

  vaults.sort(
    (a, b) =>
      Math.abs(a - parseInt(roughCdpId)) - Math.abs(b - parseInt(roughCdpId))
  );

  return vaults.length < C.DESIRED_VAULTS
    ? vaults.slice(0, vaults.length)
    : vaults.slice(0, C.DESIRED_VAULTS);
}
