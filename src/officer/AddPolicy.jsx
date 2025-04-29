import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function AddPolicy() {
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

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      dispatch(fetchPolicyCount()); // Refresh dashboard count after add
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data || "Error adding policy template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '95vw', fontSize: '1.2rem' }}>
      <h1 className="mb-4" style={{ fontSize: '2.2rem', fontWeight: 700 }}>Add Policy Template</h1>

      <div className="table-responsive" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)', borderRadius: '16px', padding: '32px', background: '#fff' }}>
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
            <div className="col-12">
              <div className="mb-2">
                <label>Terms and Conditions</label>
                <textarea name="termsAndConditions" value={form.termsAndConditions} className="form-control" onChange={handleChange} rows="3"></textarea>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : (
                  'Add Policy Template'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPolicy;
