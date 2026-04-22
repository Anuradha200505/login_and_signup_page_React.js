import { useState } from "react";

function PumpModal({ onClose }) {
  const [location, setLocation] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    if (!location || !code) {
      alert("Please fill all fields");
      return;
    }

    alert("Submitted ✅");
    onClose();
  };

  return (
    <div className="modal">

      <div className="modal-box">
        <h3>New Pump Location</h3>

        <input
          placeholder="Location (e.g. Near Office)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="Code (e.g. NTO)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="btn-row">
          <button onClick={onClose}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

    </div>
  );
}

export default PumpModal;