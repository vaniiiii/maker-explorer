import { useState, useEffect } from "react";
import { useSearchVaults } from "@/hooks/useSearchVaults";

interface VaultListProps {
  collateralType: string;
  vaultNumber: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function VaultList({
  collateralType,
  vaultNumber,
  loading,
  setLoading,
}: VaultListProps) {
  const { data, error, progress, searchAttempted } = useSearchVaults(
    collateralType,
    vaultNumber,
    setLoading
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
        <div className="w-full bg-gray-300">
          <div
            style={{ width: `${progress}%` }}
            className="h-5 bg-blue-500"
          ></div>
        </div>
      </div>
    );
  }

  if (!collateralType || !vaultNumber) {
    return (
      <div className="text-center text-xl">
        Please select a collateral type and vault number to begin the search.
      </div>
    );
  }

  if (searchAttempted && data.length === 0) {
    return <div>No data available.</div>;
  } else if (searchAttempted) {
    return (
      <div>
        <h3 className="text-center">Vault Information</h3>
        <ul>
          {data.map((item, index) => (
            <li className="text-center" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
