import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../Api";

function EditSite() {
  const { state } = useLocation(); // existing data
  const { siteKey } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    outletName: state?.outletName || "",
    siteCode: state?.siteCode || "",
    siteAddress1: state?.siteAddress1 || "",
    siteAddress2: state?.siteAddress2 || "",
    siteAddress3: state?.siteAddress3 || "",
    state: state?.state || "",
    district: state?.district || "",
    pinCode: state?.pinCode || "",
    email: state?.email || "",
    corporation: state?.corporation || "",
    siteImageUrl: state?.siteImageUrl || ""
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
      siteKey: Number(siteKey),
      ...formData,
      pinCode: Number(formData.pinCode),
      isPrimarySite: true,
      isActive: true,
      pumpLocation: []
    };

    try {
      await api.put(`/SiteDetail/${siteKey}`, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      alert("Updated Successfully ✅");
      navigate("/home");

    } catch (error) {
      console.log(error);
      alert("Update Failed ❌");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "400px",
          padding: "20px",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <h2>Edit Site</h2>

        <input name="outletName" value={formData.outletName} onChange={handleChange} placeholder="Outlet Name" />
        <input name="siteCode" value={formData.siteCode} onChange={handleChange} placeholder="Site Code" />
        <input name="siteAddress1" value={formData.siteAddress1} onChange={handleChange} placeholder="Address1" />
        <input name="district" value={formData.district} onChange={handleChange} placeholder="District" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="corporation" value={formData.corporation} onChange={handleChange} placeholder="Corporation" />
        <input name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pincode" />
        <input name="siteImageUrl" value={formData.siteImageUrl} onChange={handleChange} placeholder="Image URL" />

        <button type="submit" style={{ marginTop: "10px" }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditSite;