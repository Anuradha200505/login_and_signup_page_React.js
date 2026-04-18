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
    corporation: "",
    siteImageUrl: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.outletName) newErrors.outletName = "Outlet Name required";

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid Email format";

    if (formData.pinCode.length !== 6)
      newErrors.pinCode = "Pincode must be 6 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
      siteImageUrl: formData.siteImageUrl,

      isPrimarySite: true,
      isActive: true,
      createdBy: "admin",
      modifiedBy: "admin",
      createdDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
      pumpLocation: []
    };

    try {
      await api.post("/SiteDetail", payload, {
        headers: {
          "Content-Type": "application/json-patch+json"
        }
      });

      alert("Site Added Successfully ✅");
      navigate("/home");

    } catch (error) {
      console.log(error.response?.data || error);
      alert("POST failed ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Add Site</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input name="outletName" placeholder="Outlet Name" onChange={handleChange} style={styles.input}/>
          {errors.outletName && <span style={styles.error}>{errors.outletName}</span>}

          <input name="siteCode" placeholder="Site Code" onChange={handleChange} style={styles.input}/>

          <input name="siteAddress1" placeholder="Address1" onChange={handleChange} style={styles.input}/>
          <input name="siteAddress2" placeholder="Address2" onChange={handleChange} style={styles.input}/>
          <input name="siteAddress3" placeholder="Address3" onChange={handleChange} style={styles.input}/>

          <input name="state" placeholder="State" onChange={handleChange} style={styles.input}/>
          <input name="district" placeholder="District" onChange={handleChange} style={styles.input}/>

          <input name="pinCode" placeholder="Pincode" onChange={handleChange} style={styles.input}/>
          {errors.pinCode && <span style={styles.error}>{errors.pinCode}</span>}

          <input name="email" placeholder="Email" onChange={handleChange} style={styles.input}/>
          {errors.email && <span style={styles.error}>{errors.email}</span>}

          <input name="corporation" placeholder="Corporation" onChange={handleChange} style={styles.input}/>

          {/* 🔥 IMAGE URL INPUT */}
          <input
            name="siteImageUrl"
            placeholder="Image URL (optional)"
            onChange={handleChange}
            style={styles.input}
          />

          {/* 🔥 IMAGE PREVIEW */}
          {formData.siteImageUrl && (
            <img
              src={formData.siteImageUrl}
              alt="preview"
              style={styles.image}
            />
          )}

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSite;

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f2f5"
  },
  card: {
    width: "400px",
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "12px"
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "10px auto"
  }
};