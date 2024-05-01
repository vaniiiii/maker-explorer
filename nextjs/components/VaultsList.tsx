import { search } from "@/utils/search";
export default function VaultList({
  collateralType,
  vaultNumber,
}: {
  collateralType: string;
  vaultNumber: string;
}) {
  if (!collateralType || !vaultNumber) {
    return null;
  }
  const result = search(collateralType, vaultNumber).then((res) => {
    console.log(res);
  });

  return (
    <div>
      <h3 className="text-center">Vault Information</h3>
    </div>
  );
}
