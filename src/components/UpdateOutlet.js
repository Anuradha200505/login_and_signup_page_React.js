// components/UpdateOutlet.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSiteDetails, updateSiteDetails } from "../services/api";

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

function UpdateOutlet() {
  const { siteKey } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await getSiteDetails(user.token);

      if (res.success) {
        const site = res.data.result.find(
          (s) => s.siteKey === Number(siteKey)
        );
        if (site) setForm(site);
      }
    };

    load();
  }, [siteKey, user.token]);

  const handleUpdate = async () => {
    const payload = {
      ...form,
      siteKey: Number(siteKey),
      pumpLocation: []
    };

    const res = await updateSiteDetails(user.token, siteKey, payload);

    if (res.success) {
      alert("Updated ✅");
      navigate("/home");
    } else {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="main-content"> {/* 🔵 light blue bg */}

      <div className="form-container">
        <h2>Update Outlet</h2>

        <div className="form-grid">

          <div>
            <label><FaBuilding /> Outlet Name</label>
            <input
              value={form.outletName || ""}
              onChange={(e) =>
                setForm({ ...form, outletName: e.target.value })
              }
              placeholder="e.g. Sunrise Fuel Center"
            />
          </div>

          <div>
            <label><FaIndustry /> Supplier</label>
            <input
              value={form.corporation || ""}
              onChange={(e) =>
                setForm({ ...form, corporation: e.target.value })
              }
              placeholder="e.g. Indian Oil"
            />
          </div>

          <div>
            <label><FaMapMarkerAlt /> Building / Flat No.</label>
            <input
              value={form.siteAddress1 || ""}
              onChange={(e) =>
                setForm({ ...form, siteAddress1: e.target.value })
              }
              placeholder="e.g. 12A, First Floor"
            />
          </div>

          <div>
            <label><FaMapMarkerAlt /> Street / Area</label>
            <input
              value={form.siteAddress2 || ""}
              onChange={(e) =>
                setForm({ ...form, siteAddress2: e.target.value })
              }
              placeholder="e.g. Main Road"
            />
          </div>

          <div>
            <label><FaCity /> City / Village</label>
            <input
              value={form.siteAddress3 || ""}
              onChange={(e) =>
                setForm({ ...form, siteAddress3: e.target.value })
              }
              placeholder="e.g. Chennai"
            />
          </div>

          <div>
            <label><FaCity /> State</label>
            <input
              value={form.state || ""}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
              placeholder="State"
            />
          </div>

          <div>
            <label><FaCity /> District</label>
            <input
              value={form.district || ""}
              onChange={(e) =>
                setForm({ ...form, district: e.target.value })
              }
              placeholder="District"
            />
          </div>

          <div>
            <label><FaHashtag /> Pin Code</label>
            <input
              value={form.pinCode || ""}
              onChange={(e) =>
                setForm({ ...form, pinCode: e.target.value })
              }
              placeholder="e.g. 600001"
            />
          </div>

          <div>
            <label><FaEnvelope /> Email ID</label>
            <input
              value={form.email || ""}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="e.g. example@domain.com"
            />
          </div>

          <div>
            <label><FaImage /> Outlet Image</label>
            <input type="file" />
          </div>

        </div>
      </div>

      {/* 🔽 BOTTOM CENTER BUTTONS */}
      <div className="btn-row">
        <button className="blue-btn" onClick={() => navigate("/home")}>
          Back
        </button>

        <button className="blue-btn" onClick={handleUpdate}>
          Save
        </button>
      </div>

    </div>
  );
}

export default UpdateOutlet;