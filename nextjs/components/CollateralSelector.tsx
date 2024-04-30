import { useState } from "react";

export default function CollateralSelector({
  selectedCollateral,
  onCollateralSelect,
}: {
  selectedCollateral: string;
  onCollateralSelect: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "ETH-A", value: "ETH-A" },
    { label: "WBTC-A", value: "WBTC-A" },
    { label: "WSTETH-A", value: "WSTETH-A" },
  ];

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value: string) => {
    onCollateralSelect(value);
    setIsOpen(false);
  };

  const displayValue = selectedCollateral
    ? options.find((opt) => opt.value === selectedCollateral)?.label
    : "Choose collateral";

  return (
    <div className="p-1 flex flex-col">
      <div className="relative">
        <div
          className="form-select h-10 text-white bg-black bg-opacity-20 outline-none border-0 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:bg-opacity-50"
          onClick={handleDropdownToggle}
        >
          {displayValue}
        </div>
        {isOpen && (
          <div className="absolute w-full bg-black bg-opacity-20 mt-1 rounded-lg z-10">
            <div
              className="p-2 text-white text-center hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer"
              onClick={() => handleOptionSelect("")}
            >
              Deselect
            </div>
            {options.map((option) => (
              <div
                key={option.value}
                className="p-2 text-white text-center hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer"
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
