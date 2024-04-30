import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CollateralSelector from "@/components/CollateralSelector";
import VaultsList from "@/components/VaultsList";

export default function Home() {
  const [vaultNumber, setVaultNumber] = useState("");
  const [debouncedVaultNumber, setDebouncedVaultNumber] = useState("");
  const [selectedCollateral, setSelectedCollateral] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVaultNumber(vaultNumber);
    }, 300); // Debounce delay
    return () => {
      clearTimeout(handler);
    };
  }, [vaultNumber]);

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <div>
        <p className="mb-2 font-bold text-4xl text-center">
          Find Closest Vault
        </p>
        <CollateralSelector
          selectedCollateral={selectedCollateral}
          onCollateralSelect={setSelectedCollateral}
        />
        <SearchBar inputValue={vaultNumber} onInputChange={setVaultNumber} />
      </div>
      <VaultsList
        collateralType={selectedCollateral}
        vaultNumber={debouncedVaultNumber}
      />
    </div>
  );
}
