import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-right" ref={menuRef}>
        
        {/* 👤 PROFILE ICON */}
        <div
          className="profile"
          onClick={() => setShowMenu(!showMenu)}
        >
          👤
        </div>

        {/* 🔽 DROPDOWN */}
        {showMenu && (
          <div className="dropdown">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Topbar;