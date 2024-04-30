import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import VaultInfo from "@/components/VaultInfo";

export default function Vaults() {
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
      <p className="font-bold text-4xl text-center">Explore MakerDAO Vaults</p>
      <SearchBar inputValue={vaultNumber} onInputChange={setVaultNumber} />
      <VaultInfo vaultNumber={debouncedValue} />
    </div>
  );
}
