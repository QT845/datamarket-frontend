import { useState } from "react";
import api from "../api/api";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (loginData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/auth/login", loginData);
      const accessToken = res.data.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    }
  };

  return { login, loading, error };
}

export default useLogin;
