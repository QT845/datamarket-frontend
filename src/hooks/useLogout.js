import api from "../api/api";

function useLogout() {
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.warn("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
  };

  return { logout };
}

export default useLogout;
