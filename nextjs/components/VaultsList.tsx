import { useState, useEffect } from "react";
import { search } from "@/utils/search";

interface VaultListProps {
  collateralType: string;
  vaultNumber: string;
}

export default function VaultList({
  collateralType,
  vaultNumber,
}: VaultListProps) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!collateralType || !vaultNumber) {
        return; // @dev Exit early if inputs are not valid
      }

      try {
        const result = await search(collateralType, vaultNumber);
        setData(result);
        setError(null);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
        setData([]);
      }
    };

    fetchData();
  }, [collateralType, vaultNumber]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available.</div>;
  } else {
    return (
      <div>
        <h3 className="text-center">Vault Information</h3>
        <ul>
          {data.map((item) => (
            <li className="text-center" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
