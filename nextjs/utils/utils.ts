import { formatEther } from 'viem';
import * as C from '@/utils/constants';

export const parseVaultInfo = (data: any) => {
  const ilk = data ? bytesToString(data[3]) : "";
  const collateral = data ? parseFloat(formatEther(data[4])) : 0;
  const debt = data ? parseFloat(formatEther(data[5])) : 0;
  const collateralizationRatio = debt !== 0 ? (100 * collateral * C.ETH_PRICE / debt) : 0;
  const minimalCollateral = calculateMinimalCollateral(ilk, collateral, debt).toFixed(2);
  const maximumDebt = calculateMaximumDebt(ilk, collateral, debt).toFixed(2);

  return {
    ilk,
    collateral: collateral.toFixed(2),
    debt: debt.toFixed(2),
    collateralizationRatio: collateralizationRatio.toFixed(0),
    minimalCollateral,
    maximumDebt,
  };
};

function bytesToString(hex: string): string {
  return Buffer.from(hex.replace(/^0x/, ''), 'hex').toString().replace(/\x00/g, '');
}

function calculateMinimalCollateral(ilk: string, collateral: number, debt: number): number {
  if (debt === 0) return 0;

  const debtInIlk = ilk.startsWith('ETH') ? debt / C.ETH_PRICE :
    ilk.startsWith('WBTC') ? debt / C.BTC_PRICE : 0;

  if (ilk.startsWith('ETH')) {
    return debtInIlk * C.ETH_LIQ_RATIO;
  }
  if (ilk.startsWith('WBTC')) {
    return debtInIlk * C.BTC_LIQ_RATIO;
  }

  return 0;
}

function calculateMaximumDebt(ilk: string, collateral: number, debt: number): number {
  // assuming DAI is pegged to USD 1:1
  if (collateral === 0) return 0;
  const collateralInUSD = ilk.startsWith('ETH') ? collateral * C.ETH_PRICE :
    ilk.startsWith('WBTC') ? collateral * C.BTC_PRICE : 0;

  if (ilk.startsWith('ETH')) {
    return collateralInUSD / C.ETH_LIQ_RATIO;
  }
  if (ilk.startsWith('WBTC')) {
    return collateralInUSD / C.BTC_LIQ_RATIO;
  }

  return 0;
}
