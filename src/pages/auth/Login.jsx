import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { login, loading, error } = useLogin();

  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(loginData);

    if (success) {
      navigate("/me");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </div>

      {error && <p>{error.response?.data?.message || "Login failed"}</p>}
      {/* {error && <p>{error.response?.data?.errors || "Login failed"}</p>} */}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        Don't have an account yet ?{" "}
        <span onClick={() => navigate("/register")}>Sign Up</span>
      </p>
    </div>
  );
}