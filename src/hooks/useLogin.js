import { useState } from "react";
import api from "@/api/api";
import { useAuth } from "@/auth/useAuth";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  const login = async (loginData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", loginData);

      const accessToken = res.data.data.accessToken;

      localStorage.setItem("accessToken", accessToken);

      const meRes = await api.get("/auth/me");

      setUser(meRes.data.data);

      return true;
    } catch (err) {
      setError(err);
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
