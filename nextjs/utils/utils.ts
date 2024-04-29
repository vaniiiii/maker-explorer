import { formatEther } from 'viem';

export const parseVaultInfo = (data: any) => {

  const ilk = data ? bytesToString(data[3]) : "N/A";
  const collateral = data ? Math.trunc(parseFloat(formatEther(data[4]))) : "N/A";
  const debt = data ? Math.trunc(parseFloat(formatEther(data[5]))) : "N/A";

  return {
    ilk,
    collateral,
    debt,
  };
};

function bytesToString(hex: string): string {
  return Buffer.from(hex.replace(/^0x/, ''), 'hex')
    .toString()
    .replace(/\x00/g, '');
}


