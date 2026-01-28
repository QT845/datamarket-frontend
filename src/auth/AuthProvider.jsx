import { useState, useEffect } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
