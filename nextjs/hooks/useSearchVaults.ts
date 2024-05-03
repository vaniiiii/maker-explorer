import { useState, useEffect } from "react";
import { search } from "@/utils/search";

export function useSearchVaults(
  collateralType: string,
  vaultNumber: string,
  setLoading: (loading: boolean) => void
) {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

  useEffect(() => {
    let isActive = true;

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
      setError(null);
      setSearchAttempted(true);
      try {
        const results = await search(collateralType, vaultNumber, setProgress);
        if (isActive) {
          setData(results);
          setError(null);
        }
      } catch (err: any) {
        if (isActive) {
          setError(err.message || "An unexpected error occurred");
          console.error(err);
          setData([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isActive = false;
    };
  }, [collateralType, vaultNumber]);

  return { data, error, progress, searchAttempted };
}
