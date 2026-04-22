// components/Sidebar.js
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="logo">Fuel App</h2>

      <div className="menu">
        <div className="menu-item">Admin</div>

        <div
          className="submenu active"
          onClick={() => navigate("/home")}
        >
          Manage Outlet
        </div>
      </div>
    </div>
  );
}

export default Sidebar;