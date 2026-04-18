import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api";

function AddSite() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    outletName: "",
    siteCode: "",
    siteAddress1: "",
    siteAddress2: "",
    siteAddress3: "",
    state: "",
    district: "",
    pinCode: "",
    email: "",
    corporation: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      siteKey: 0,
      outletName: formData.outletName,
      siteCode: formData.siteCode,
      siteAddress1: formData.siteAddress1,
      siteAddress2: formData.siteAddress2,
      siteAddress3: formData.siteAddress3,
      state: formData.state,
      district: formData.district,
      pinCode: Number(formData.pinCode),
      email: formData.email,
      corporation: formData.corporation,

      isPrimarySite: true,
      isActive: true,

      createdBy: "admin",
      modifiedBy: "admin",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),

      pumpLocation: []
    };

    try {
      const response = await api.post("/SiteDetail", payload, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      console.log("SUCCESS:", response.data);
      alert("Site Added Successfully ✅");

      navigate("/home");

    } catch (error) {
      console.log("ERROR:", error.response?.data || error);
      alert("POST failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Site</h2>

      <form onSubmit={handleSubmit}>
        <input name="outletName" placeholder="Outlet Name" onChange={handleChange} />
        <input name="siteCode" placeholder="Site Code" onChange={handleChange} />
        <input name="siteAddress1" placeholder="Address1" onChange={handleChange} />
        <input name="siteAddress2" placeholder="Address2" onChange={handleChange} />
        <input name="siteAddress3" placeholder="Address3" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="district" placeholder="District" onChange={handleChange} />
        <input name="pinCode" placeholder="Pincode" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="corporation" placeholder="Corporation" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddSite;