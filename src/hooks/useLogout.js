import api from "../api/api";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout failed:", err);
    } finally {
      localStorage.clear();
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  return { logout };
}
