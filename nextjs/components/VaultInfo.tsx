import { useContractRead } from "wagmi";
import { parseVaultInfo } from "@/utils/utils";
import { VAULT_INFO_ABI, VAULT_INFO_ADDRESS } from "@/utils/constants";
import { parse } from "path";

export default function VaultInfo({ vaultNumber }: { vaultNumber: string }) {
  const { data, isError, isLoading } = useContractRead({
    address: VAULT_INFO_ADDRESS,
    abi: VAULT_INFO_ABI,
    functionName: "getCdpInfo",
    args: [vaultNumber],
    chainId: 1,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data...</p>;

  const { ilk, collateral, debt } = parseVaultInfo(data);

  return (
    <div className="bg-black bg-opacity-20 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Collateral:</p>
        <p className="text-white">{ilk}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Debt:</p>
        <p className="text-white">{debt}</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Collateralization Ratio:</p>
        <p className="text-white">--</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Minimal Collateral:</p>
        <p className="text-white">--</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Maximum Debt:</p>
        <p className="text-white">--</p>
      </div>
    </div>
  );
}
