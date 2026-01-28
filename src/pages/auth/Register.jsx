import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, loading, error } = useRegister();

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success = await register(registerData);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={registerData.fullName}
          onChange={(e) =>
            setRegisterData({ ...registerData, fullName: e.target.value })
          }
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          value={registerData.confirmPassword}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              confirmPassword: e.target.value,
            })
          }
        />
      </div>

      {error && <p>{error.response?.data?.message || "Registration failed"}</p>}

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>

      <p>
        Already have an account ?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
}
