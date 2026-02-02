import { useState, useEffect } from "react";
import { getAllDomains } from "@/features/dataset/services/domainService";

export function useGetAllDomains() {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const res = await getAllDomains();
        setDomains(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  return { domains, loading, error };
}
