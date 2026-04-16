import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // ✅ get user data
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Welcome 🎉</h2>

      {user ? (
        <div>
          <p><b>Name:</b> {user.displayName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Username:</b> {user.userName}</p>
          <p><b>Token:</b> {user.token}</p>
        </div>
      ) : (
        <p>No user data</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;