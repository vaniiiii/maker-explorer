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

  return (
    <div>
      <h3 className="text-center">Vault Information</h3>
    </div>
  );
}
