import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [topError, setTopError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // ✅ validation
    if (!email || !password) {
      setTopError("Please fill all fields");
      return;
    }

    try {
      // ✅ API call
      const response = await axios.post(
        "https://fuelapi11.azurewebsites.net/api/Account/login",
        {
          email: email,
          password: password
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // ✅ full user details save
      localStorage.setItem("user", JSON.stringify(response.data));

      // ✅ clear error
      setTopError("");

      // ✅ navigate to home
      navigate("/home");

    } catch (error) {
      console.log(error);
      setTopError("Incorrect email or password");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {/* ✅ error message */}
      {topError && <p className="top-error">{topError}</p>}

      {/* ✅ email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ✅ password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* ✅ login button */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;