import { useContractRead } from "wagmi";
import { parseVaultInfo } from "@/utils/utils";
import { VAULT_INFO_ABI, VAULT_INFO_ADDRESS } from "@/utils/constants";

export default function VaultInfo({ vaultNumber }: { vaultNumber: string }) {
  const { data, isError, isLoading } = useContractRead({
    address: VAULT_INFO_ADDRESS,
    abi: VAULT_INFO_ABI,
    functionName: "getCdpInfo",
    args: [vaultNumber],
    chainId: 1,
  });

  if (vaultNumber === "") return null;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data...</p>;

  let {
    ilk,
    collateral,
    debt,
    collateralizationRatio,
    minimalCollateral,
    maximumDebt,
  } = parseVaultInfo(data);

  if (ilk === "") {
    ilk = "--";
    collateral = "--";
    debt = "--";
    collateralizationRatio = "--";
    minimalCollateral = "--";
    maximumDebt = "--";
  }

  return (
    <div className="bg-black bg-opacity-20 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Collateral:</p>
        <p className="text-white">
          {collateral} {ilk}
        </p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Debt:</p>
        <p className="text-white">{debt} DAI</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Collateralization Ratio:</p>
        <p className="text-white">{collateralizationRatio}%</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Min. Collateral:</p>
        <p className="text-white">
          {minimalCollateral} {ilk}
        </p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Max. Debt:</p>
        <p className="text-white">{maximumDebt} DAI</p>
      </div>
    </div>
  );
}
