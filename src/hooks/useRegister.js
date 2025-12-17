import { useState } from "react";
import api from "../api/api";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (registerData) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", registerData);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  return { register, loading, error };
}

export default useRegister;
