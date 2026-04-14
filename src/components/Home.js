import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Welcome 🎉</h2>
      <p>Login Successful</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;