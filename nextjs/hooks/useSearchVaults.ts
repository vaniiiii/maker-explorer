import { useState, useEffect } from "react";
import { search } from "@/utils/search";

export function useSearchVaults(collateralType: string, vaultNumber: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (!collateralType || !vaultNumber) {
        setData([]);
        setError(null);
        setLoading(false);
        setProgress(0);
        setSearchAttempted(false);
        return; // @dev Exit early if inputs are not valid and reset state
      }

      setLoading(true);
      setProgress(0);
      setData([]); // @dev Reset data on new search
      setSearchAttempted(true);
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

  return { data, loading, error, progress, searchAttempted };
}
