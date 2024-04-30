export default function CollateralSelector() {
  return (
    <div className="p-1 flex flex-col">
      <label htmlFor="collateral-type" className="p-3 text-xl text-center">
        Collateral types:
      </label>
      <select
        id="collateral-type"
        className="form-select h-10 text-white placeholder-white placeholder-opacity-50 bg-black bg-opacity-20 outline-none border-0 rounded-full text-center"
      >
        <option value="ETH-A">ETH-A</option>
        <option value="WBTC-A">WBTC-A</option>
        <option value="WSTETH-A">WSTETH-A</option>
      </select>
    </div>
  );
}
