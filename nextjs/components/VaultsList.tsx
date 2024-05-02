import { useState, useEffect } from "react";
import { useSearchVaults } from "@/hooks/useSearchVaults";

interface VaultListProps {
  collateralType: string;
  vaultNumber: string;
}

export default function VaultList({
  collateralType,
  vaultNumber,
}: VaultListProps) {
  const { data, error, loading, progress } = useSearchVaults(
    collateralType,
    vaultNumber
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div>
        <div>Loading...</div>
        <div style={{ width: "100%", backgroundColor: "#ccc" }}>
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: "blue",
              height: "20px",
            }}
          ></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available.</div>;
  }

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
}
