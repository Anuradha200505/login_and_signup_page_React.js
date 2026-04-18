import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";

function Home() {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [activeSite, setActiveSite] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchSites();
    // eslint-disable-next-line
  }, []);

  const fetchSites = async () => {
    try {
      const response = await api.get("/SiteDetail");

      if (response.data && response.data.result) {
        setSites(response.data.result);
      } else {
        setSites([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleCard = (key) => {
    setActiveSite(activeSite === key ? null : key);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>
        Site Details
      </h2>

      {/* ✅ ADD BUTTON */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={() => navigate("/AddSite")}>
          Add Site Details
        </button>
      </div>

      {/* 🔥 GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {sites.map((site) => (
          <div
            key={site.siteKey}
            onClick={() => toggleCard(site.siteKey)}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {site.siteImageUrl && (
                <img
                  src={site.siteImageUrl}
                  alt="site"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <h3 style={{ margin: 0 }}>{site.outletName}</h3>
            </div>

            {activeSite === site.siteKey && (
              <div style={{ marginTop: "10px" }}>
                <p><b>Code:</b> {site.siteCode}</p>
                <p>
                  <b>Address:</b> {site.siteAddress1}, {site.siteAddress2}, {site.siteAddress3}
                </p>
                <p><b>District:</b> {site.district}</p>
                <p><b>Email:</b> {site.email}</p>
                <p><b>Corporation:</b> {site.corporation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔴 (optional remove pannalam) */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "200px",
            background: "red",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;