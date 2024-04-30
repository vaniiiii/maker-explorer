import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import CollateralSelector from "@/components/CollateralSelector";

export default function Home() {
  const [vaultNumber, setVaultNumber] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(vaultNumber);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(vaultNumber);
    }, 300); // 300ms

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
        <CollateralSelector />
      </div>
      <SearchBar inputValue={vaultNumber} onInputChange={setVaultNumber} />
    </div>
  );
}
