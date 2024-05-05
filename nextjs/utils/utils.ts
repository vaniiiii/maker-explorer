import { formatEther } from "viem";
import * as C from "@/utils/constants";

export const parseVaultInfo = (data: any) => {
  const ilk = data ? bytesToString(data[3]) : "";
  const collateral = data ? parseFloat(formatEther(data[4])) : 0;
  const debt = data ? parseFloat(formatEther(data[6])) / C.RAY : 0;

  const ilkType = getIlkType(ilk);
  const { price, liqRatio } = C.ILK_CONFIG[ilkType];

  const collateralizationRatio =
    debt !== 0 ? (100 * collateral * price) / debt : 0;
  const minimalCollateral = calculateMinimalCollateral(
    collateral,
    debt,
    price,
    liqRatio
  ).toFixed(2);
  const maximumDebt = calculateMaximumDebt(
    collateral,
    debt,
    price,
    liqRatio
  ).toFixed(2);

  return {
    ilk,
    collateral: collateral.toFixed(2),
    debt: debt.toFixed(2),
    collateralizationRatio: collateralizationRatio.toFixed(0),
    minimalCollateral,
    maximumDebt,
  };
};

function calculateMinimalCollateral(
  collateral: number,
  debt: number,
  price: number,
  liqRatio: number
): number {
  if (price === 0) return 0;

  const debtInIlk = debt / price;
  return debtInIlk * liqRatio;
}
// assuming DAI is pegged to USD 1:1
function calculateMaximumDebt(
  collateral: number,
  debt: number,
  price: number,
  liqRatio: number
): number {
  if (liqRatio === 0) return 0;

  const collateralInUSD = collateral * price;
  return collateralInUSD / liqRatio;
}

function getIlkType(ilk: string): string {
  return (
    Object.keys(C.ILK_CONFIG).find((type) => ilk.startsWith(type)) || "OTHER"
  );
}

export function bytesToString(hex: string): string {
  return Buffer.from(hex.replace(/^0x/, ""), "hex")
    .toString()
    .replace(/\x00/g, "");
}
