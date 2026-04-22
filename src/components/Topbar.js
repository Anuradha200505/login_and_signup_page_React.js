// components/Topbar.js
function Topbar() {
  return (
    <div className="topbar">

      <div className="left">
        ₹ Petrol – ₹101.89 &nbsp;&nbsp; Diesel – ₹93.45
      </div>

      <div className="right">
        <div className="date-box">
          21/04/2026 09:00 AM – 22/04/2026 08:59 AM
        </div>

        <div className="site-select">
          Site: NBE ▼
        </div>

        <div className="profile">
          👤
        </div>
      </div>

    </div>
  );
}

export default Topbar;