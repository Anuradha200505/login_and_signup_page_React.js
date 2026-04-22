import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSiteDetails } from "../services/api";

// 🔥 ICONS
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCity,
  FaEnvelope,
  FaIndustry,
  FaHashtag,
  FaImage
} from "react-icons/fa";

function CreateOutlet() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [form, setForm] = useState({
    outletName: "",
    supplier: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    district: "",
    pinCode: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      siteKey: 0,
      outletName: form.outletName,
      siteCode: "AUTO" + Date.now(),
      siteAddress1: form.address1,
      siteAddress2: form.address2,
      siteAddress3: form.city,
      state: form.state,
      district: form.district,
      email: form.email,
      corporation: form.supplier,
      pinCode: Number(form.pinCode),
      pumpLocation: []
    };

    const res = await addSiteDetails(user.token, payload);

    if (res.success) {
      alert("Created ✅");
      navigate("/home");
    } else {
      alert("Failed ❌");
    }
  };

  return (
  <div className="main-content"> {/* ✅ ADD THIS */}

    <div className="form-container">
      <h2>New Outlet</h2>

      <div className="form-grid">

        <div>
          <label><FaBuilding /> Outlet Name</label>
          <input name="outletName" placeholder="e.g. Sunrise Fuel Center" onChange={handleChange}/>
        </div>

        <div>
          <label><FaIndustry /> Supplier</label>
          <input name="supplier" placeholder="e.g. Indian Oil" onChange={handleChange}/>
        </div>

        <div>
          <label><FaMapMarkerAlt /> Building / Flat No.</label>
          <input name="address1" placeholder="e.g. 12A, First Floor" onChange={handleChange}/>
        </div>

        <div>
          <label><FaMapMarkerAlt /> Street / Area</label>
          <input name="address2" placeholder="e.g. Main Road" onChange={handleChange}/>
        </div>

        <div>
          <label><FaCity /> City / Village</label>
          <input name="city" placeholder="e.g. Chennai" onChange={handleChange}/>
        </div>

        <div>
          <label><FaCity /> State</label>
          <select name="state" onChange={handleChange}>
            <option>-- Select State --</option>
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
          </select>
        </div>

        <div>
          <label><FaCity /> District</label>
          <select name="district" onChange={handleChange}>
            <option>-- Select District --</option>
            <option>Chennai</option>
            <option>Coimbatore</option>
          </select>
        </div>

        <div>
          <label><FaHashtag /> Pin Code</label>
          <input name="pinCode" placeholder="e.g. 600001" onChange={handleChange}/>
        </div>

        <div>
          <label><FaEnvelope /> Email ID</label>
          <input name="email" placeholder="e.g. example@domain.com" onChange={handleChange}/>
        </div>

        <div>
          <label><FaImage /> Outlet Image</label>
          <input type="file" />
        </div>
      </div>
      </div>

      {/* ✅ BUTTONS */}
      <div className="btn-row">
        <button className="blue-btn" onClick={() => navigate("/home")}>
          Back
        </button>

        <button className="blue-btn" onClick={handleSubmit}>
          Create
        </button>
      </div>

    

  </div>
);
}

export default CreateOutlet;