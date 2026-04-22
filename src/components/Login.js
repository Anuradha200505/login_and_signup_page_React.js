import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [topError, setTopError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setTopError("Please fill all fields");
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      localStorage.setItem("user", JSON.stringify(result.data)); // ✅ store token
      navigate("/home");
    } else {
      setTopError("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {topError && <p className="top-error">{topError}</p>}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;