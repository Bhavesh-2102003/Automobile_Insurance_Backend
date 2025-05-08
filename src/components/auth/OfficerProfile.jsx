import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchOfficerProfile from "./../../store/action/fetchOfficerProfile";
import "./../OfficerProfile.css";
import axios from "axios";

const OfficerProfile = () => {
  const dispatch = useDispatch();
  const officer = useSelector((state) => state.officerProfile.officer);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ contact: "", address: "", branchLocation: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchOfficerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (officer) {
      setForm({
        contact: officer.contact || "",
        address: officer.address || "",
        branchLocation: officer.branchLocation || "",
      });
    }
  }, [officer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setSuccess("");
    setError("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      contact: officer.contact || "",
      address: officer.address || "",
      branchLocation: officer.branchLocation || "",
    });
    setSuccess("");
    setError("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8087/api/officer/update/profile/${officer.id}`,
        {
          contact: form.contact,
          address: form.address,
          branchLocation: form.branchLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      setEditMode(false);
      dispatch(fetchOfficerProfile());
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!officer) return <div>Loading...</div>;

  return (
    <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #e3f0fc 0%, #f7fbff 100%)', minHeight: '100vh', padding: 0 }}>
      {/* Hero/Header Section */}
      <div style={{ background: '#1976d2', color: '#fff', borderRadius: '0 0 32px 32px', padding: '36px 0 26px 0', marginBottom: 32, boxShadow: '0 8px 24px #1976d210' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: '#fff', borderRadius: '50%', padding: 16, marginBottom: 12 }}>
            <span role="img" aria-label="officer" style={{ fontSize: 48, color: '#1976d2' }}>👨‍💼</span>
          </span>
          <h1 style={{ fontWeight: 700, letterSpacing: 1, fontSize: 32, marginBottom: 0 }}>Officer Profile</h1>
          <div style={{ fontSize: 18, color: '#e3e3e3', marginTop: 8 }}>Automobile Insurance Officer – Trusted for Fair Claims & Customer Service</div>
        </div>
      </div>

      <div className="row justify-content-center" style={{ marginTop: 0 }}>
        <div className="col-lg-7 col-md-10">
          <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px #0002', padding: 32, margin: '40px 0' }}>
            {/* Edit button */}
            {!editMode && (
              <div style={{ textAlign: "right", marginBottom: "10px" }}>
                <button type="button" className="edit-btn btn btn-outline-primary" onClick={handleEdit}>
                  <span role="img" aria-label="edit">✏️</span> Edit
                </button>
              </div>
            )}
            <form onSubmit={handleSave} autoComplete="off">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="profile-field"><strong>ID:</strong> {officer.id}</div>
                  <div className="profile-field"><strong>Full Name:</strong> {officer.fullName}</div>
                  <div className="profile-field"><strong>Email:</strong> {officer.email}</div>
                  <div className="profile-field"><strong>License No:</strong> {officer.licenseNo}</div>
                </div>
                <div className="col-md-6">
                  <div className="profile-field"><strong>ID No:</strong> {officer.idNo}</div>
                  <div className="profile-field"><strong>Aadhaar No:</strong> {officer.aadhaarNo}</div>
                  <div className="profile-field"><strong>User:</strong> {officer.user ? officer.user.username || officer.user.id : "-"}</div>
                </div>
              </div>
              <hr style={{ margin: '24px 0 18px 0', borderColor: '#e3f0fc' }} />
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="profile-field">
                    <strong>Contact:</strong>{" "}
                    {editMode ? (
                      <input
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        className="form-control"
                        disabled={loading}
                        required
                      />
                    ) : (
                      <span style={{ marginLeft: 8 }}>{officer.contact}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="profile-field">
                    <strong>Address:</strong>{" "}
                    {editMode ? (
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="form-control"
                        disabled={loading}
                        required
                      />
                    ) : (
                      <span style={{ marginLeft: 8 }}>{officer.address}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="profile-field">
                    <strong>Branch Location:</strong>{" "}
                    {editMode ? (
                      <input
                        type="text"
                        name="branchLocation"
                        value={form.branchLocation}
                        onChange={handleChange}
                        className="form-control"
                        disabled={loading}
                        required
                      />
                    ) : (
                      <span style={{ marginLeft: 8 }}>{officer.branchLocation}</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Only show Save/Cancel in edit mode */}
              {editMode && (
                <div className="form-group" style={{ marginTop: 28, textAlign: "center" }}>
                  <button type="submit" className="save-btn btn btn-success" disabled={loading} style={{ marginRight: 8 }}>
                    {loading ? "Saving..." : <><span role="img" aria-label="save"></span> Save</>}
                  </button>
                  <button type="button" className="cancel-btn btn btn-outline-secondary" onClick={handleCancel} disabled={loading}>
                    Cancel
                  </button>
                </div>
              )}
              {success && <div className="alert alert-success mt-3">{success}</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OfficerProfile