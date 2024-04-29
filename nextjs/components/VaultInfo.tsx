export default function VaultInfo() {
  return (
    <div className="bg-black bg-opacity-20 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Collateral:</p>
        <p className="text-white">--</p>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-white font-semibold">Debt:</p>
        <p className="text-white">--</p>
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
