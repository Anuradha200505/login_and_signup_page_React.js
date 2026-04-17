import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api"; // ✅ IMPORTANT (capital A)

function Home() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await api.get("/Brands");

      if (Array.isArray(response.data)) {
        setBrands(response.data);
      } else {
        setBrands([]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Welcome 🎉</h2>

      <p>Name: {user?.displayName}</p>
      <p>Email: {user?.email}</p>

      <button onClick={handleLogout}>Logout</button>

      <h3>Brands List</h3>

      {brands.length > 0 ? (
        brands.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Home;