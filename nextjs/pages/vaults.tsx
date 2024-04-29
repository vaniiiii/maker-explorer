import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import VaultInfo from "@/components/VaultInfo";

export default function Vaults() {
  const [vaultNumber, setVaultNumber] = useState("");

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <p className="font-bold text-4xl text-center">
        Explore Vault informations
      </p>
      <SearchBar inputValue={vaultNumber} onInputChange={setVaultNumber} />
      <VaultInfo vaultNumber={vaultNumber} />
    </div>
  );
}
