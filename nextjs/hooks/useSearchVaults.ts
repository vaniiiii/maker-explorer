import { useState, useEffect } from "react";
import { search } from "@/utils/search";

export function useSearchVaults(collateralType: string, vaultNumber: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      if (!collateralType || !vaultNumber) {
        return; // @dev Exit early if inputs are not valid
      }

      setLoading(true);
      setProgress(0);
      try {
        const results = await search(collateralType, vaultNumber, setProgress);
        setData(results);
        setError(null);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collateralType, vaultNumber]);

  return { data, loading, error, progress };
}
