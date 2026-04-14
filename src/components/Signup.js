import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let err = {};

    if (!name) err.name = "Name is required";

    if (!email) {
      err.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = "Enter valid email";
    }

    if (!password) {
      err.password = "Password is required";
    } else {
      if (password.length < 8)
        err.password = "Minimum 8 characters required";
      else if (!/[A-Z]/.test(password))
        err.password = "Must include uppercase letter";
      else if (!/[!@#$%^&*]/.test(password))
        err.password = "Must include special character";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password })
    );

    navigate("/login"); // no popup
  };

  return (
    <div className="container">
      <h2>Signup</h2>

      <input
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <button onClick={handleSignup}>Signup</button>

      <p className="link-text" onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Signup;