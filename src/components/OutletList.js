import { useEffect, useState, useCallback } from "react";
import { getSiteDetails, deleteSite } from "../services/api";
import { useNavigate } from "react-router-dom";
import PumpModal from "./PumpModal"; // ✅ IMPORT

function OutletList() {
  const [sites, setSites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false); // ✅ MODAL STATE

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // 🔄 Fetch
  const fetchSites = useCallback(async () => {
    const res = await getSiteDetails(user.token);
    if (res.success) {
      setSites(res.data.result || []);
    }
  }, [user.token]);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  // ❌ Delete
  const handleDelete = async (siteKey) => {
    if (!window.confirm("Delete this outlet?")) return;

    const res = await deleteSite(user.token, siteKey);
    if (res.success) {
      alert("Deleted ✅");
      fetchSites();
    }
  };

  // 🔄 Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = sites.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sites.length / rowsPerPage);

  return (
    <div className="main-content">

      {/* HEADER */}
      <div className="header">
        <h2>Outlet Configuration</h2>
        <button className="primary-btn" onClick={() => navigate("/create")}>
          + Outlet
        </button>
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Outlet Name</th>
            <th>Full Address</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Add New</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentData.length > 0 ? (
            currentData.map((site) => (
              <tr key={site.siteKey}>
                <td>{site.outletName}</td>

                <td>
                  {site.siteAddress1}, {site.siteAddress2}, {site.siteAddress3}
                  <br />
                  {site.district}, {site.state} - {site.pinCode}
                </td>

                <td>{site.corporation}</td>

                <td>
  <label className="switch">
    <input
      type="checkbox"
      checked={site.isActive ?? true}
      onChange={() => {
        setSites((prev) =>
          prev.map((s) =>
            s.siteKey === site.siteKey
              ? { ...s, isActive: !s.isActive }
              : s
          )
        );
      }}
    />
    <span className="slider"></span>
  </label>

  {site.isActive ? (
    <span style={{ marginLeft: "8px", color: "green" }}>
      Active
    </span>
  ) : (
    <span style={{ marginLeft: "8px", color: "red" }}>
      Inactive
    </span>
  )}
</td>

                <td>
                  <button onClick={() => navigate(`/update/${site.siteKey}`)}>
                    ✏️
                  </button>
                </td>

                {/* ✅ LOCATION BUTTON */}
                <td>
                  <button onClick={() => setShowModal(true)}>
                    ➕ Location
                  </button>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(site.siteKey)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">

        <div>
          Rows per page:
          <input
            type="number"
            min="1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value) || 1);
              setCurrentPage(1);
            }}
            style={{ width: "60px", marginLeft: "5px" }}
          />
        </div>

        <div className="page-controls">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ‹
          </button>

          <span>{currentPage}</span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {/* ✅ MODAL RENDER */}
      {showModal && (
        <PumpModal onClose={() => setShowModal(false)} />
      )}

    </div>
  );
}

export default OutletList;