import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api"; // capital A

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

    try {
      const response = await api.post("/Account/login", {
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify(response.data));
      setTopError("");
      navigate("/home");

    } catch (error) {
      setTopError("Incorrect email or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {/* 🔴 Error message in red */}
      {topError && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {topError}
        </p>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;