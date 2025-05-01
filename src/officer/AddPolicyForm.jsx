import React, { useState } from "react";
import axios from "axios";

function AddPolicyForm({ onPolicyAdded }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    policyType: "OWN_DAMAGE",
    coverageAmount: "",
    price: "",
    duration: "",
    createdAt: "",
    policyStatus: "PENDING",
    eligibilityCriteria: "",
    features: "",
    categories: "BIKE",
    minCoverageAmount: "",
    maxCoverageAmount: "",
    termsAndConditions: ""
  });
  const [totalCost, setTotalCost] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ($event) => {
    const { name, value } = $event.target;
    setForm({ ...form, [name]: value });
    if (name === 'price' || name === 'duration') {
      calculateTotalCost(name === 'price' ? value : form.price, name === 'duration' ? value : form.duration);
    }
  };

  const calculateTotalCost = (price, duration) => {
    const cost = parseFloat(price) * parseInt(duration);
    setTotalCost(isNaN(cost) ? 0 : cost);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:8087/api/policy-template/add", {
        name: form.name,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        policyType: form.policyType,
        coverageAmount: parseFloat(form.coverageAmount),
        price: parseFloat(form.price),
        duration: parseInt(form.duration),
        createdAt: form.createdAt,
        policyStatus: form.policyStatus,
        eligibilityCriteria: form.eligibilityCriteria,
        features: form.features,
        categories: form.categories,
        minCoverageAmount: parseFloat(form.minCoverageAmount),
        maxCoverageAmount: parseFloat(form.maxCoverageAmount),
        termsAndConditions: form.termsAndConditions
      });
      setMessage("Policy template added successfully!");
      setForm({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        policyType: "OWN_DAMAGE",
        coverageAmount: "",
        price: "",
        duration: "",
        createdAt: "",
        policyStatus: "PENDING",
        eligibilityCriteria: "",
        features: "",
        categories: "BIKE",
        minCoverageAmount: "",
        maxCoverageAmount: "",
        termsAndConditions: ""
      });
      setTotalCost(0);
      onPolicyAdded();
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data || "Error adding policy template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-policy-form">
      <h2>Add New Policy</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="mb-2">
              <label>Policy Name</label>
              <input type="text" name="name" value={form.name} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <label>Description</label>
              <textarea name="description" value={form.description} className="form-control" onChange={handleChange} rows="2"></textarea>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Start Date</label>
              <input type="date" name="startDate" value={form.startDate} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>End Date</label>
              <input type="date" name="endDate" value={form.endDate} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Policy Type</label>
              <select name="policyType" value={form.policyType} className="form-control" onChange={handleChange} required>
                <option value="OWN_DAMAGE">Own Damage</option>
                <option value="THIRD_PARTY">Third Party</option>
                <option value="COMPREHENSIVE">Comprehensive</option>
                <option value="ZERO_DEPRECIATION">Zero Depreciation</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Category</label>
              <select name="categories" value={form.categories} className="form-control" onChange={handleChange} required>
                <option value="BIKE">Bike</option>
                <option value="CAR">Car</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Coverage Amount</label>
              <input type="number" name="coverageAmount" value={form.coverageAmount} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Price</label>
              <input type="number" name="price" value={form.price} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Duration (months)</label>
              <input type="number" name="duration" value={form.duration} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Created At</label>
              <input type="date" name="createdAt" value={form.createdAt} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Policy Status</label>
              <select name="policyStatus" value={form.policyStatus} className="form-control" onChange={handleChange} required>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mb-2">
              <label>Eligibility Criteria</label>
              <textarea name="eligibilityCriteria" value={form.eligibilityCriteria} className="form-control" onChange={handleChange} rows="2"></textarea>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mb-2">
              <label>Features</label>
              <textarea name="features" value={form.features} className="form-control" onChange={handleChange} rows="2"></textarea>
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Min Coverage Amount</label>
              <input type="number" name="minCoverageAmount" value={form.minCoverageAmount} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Max Coverage Amount</label>
              <input type="number" name="maxCoverageAmount" value={form.maxCoverageAmount} className="form-control" onChange={handleChange} required />
            </div>
          </div>
          <div className="col-md-3">
            <div className="mb-2">
              <label>Total Cost</label>
              <input type="text" value={`$${totalCost}`} className="form-control" readOnly />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label>Terms and Conditions</label>
              <textarea name="termsAndConditions" value={form.termsAndConditions} className="form-control" onChange={handleChange} rows="3"></textarea>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Policy"}
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddPolicyForm;