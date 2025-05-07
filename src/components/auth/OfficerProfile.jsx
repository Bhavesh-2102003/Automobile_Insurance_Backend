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
    <div className="profile-container" style={{ maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #e0eafc", padding: 32 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Officer Profile</h2>
      {/* Move Edit button outside the form */}
      {!editMode && (
        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <button type="button" className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
      <form onSubmit={handleSave} autoComplete="off">
        {/* ... all your profile fields ... */}
        <div className="profile-field"><strong>ID:</strong> {officer.id}</div>
        <div className="profile-field"><strong>Full Name:</strong> {officer.fullName}</div>
        <div className="profile-field"><strong>Email:</strong> {officer.email}</div>
        <div className="profile-field"><strong>License No:</strong> {officer.licenseNo}</div>
        <div className="profile-field"><strong>ID No:</strong> {officer.idNo}</div>
        <div className="profile-field"><strong>Aadhaar No:</strong> {officer.aadhaarNo}</div>
        <div className="profile-field"><strong>User:</strong> {officer.user ? officer.user.username || officer.user.id : "-"}</div>
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
        {/* Only show Save/Cancel in edit mode */}
        {editMode && (
          <div className="form-group" style={{ marginTop: 24, textAlign: "center" }}>
            <button type="submit" className="save-btn" disabled={loading} style={{ marginRight: 8 }}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        )}
        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
export default OfficerProfile