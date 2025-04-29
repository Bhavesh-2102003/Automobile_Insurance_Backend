import React, { useEffect, useState } from "react";
import axios from "axios";

function Policy() {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await axios.get("http://localhost:8087/api/policy-template/all");
        setPolicies(res.data);
      } catch (err) {
        // Handle error
      }
    }
    fetchPolicies();
  }, []);

  const handleCardClick = (policy) => {
    setSelectedPolicy(policy);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPolicy(null);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#1e90ff' }}>All Policies</h2>
      <div className="row g-4">
        {policies.map((policy) => (
          <div className="col-md-4" key={policy.id}>
            <div className="card shadow h-100" style={{ cursor: 'pointer' }} onClick={() => handleCardClick(policy)}>
              <div className="card-body">
                <h5 className="card-title">{policy.name}</h5>
                <p>Status: <span className={`fw-bold text-${policy.policyStatus === 'APPROVED' ? 'success' : policy.policyStatus === 'REJECTED' ? 'danger' : 'warning'}`}>{policy.policyStatus}</span></p>
                <p>Type: {policy.policyType}</p>
                <p>Customer: {policy.customer?.firstName} {policy.customer?.lastName}</p>
                <p>Vehicle: {policy.vehicleDetails?.vehicleType} ({policy.vehicleDetails?.RegistrationNumber})</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Custom Modal for policy details */}
      {showModal && selectedPolicy && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Policy Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <h5>{selectedPolicy.name}</h5>
                <p><b>Status:</b> {selectedPolicy.policyStatus}</p>
                <p><b>Type:</b> {selectedPolicy.policyType}</p>
                <p><b>Coverage Amount:</b> {selectedPolicy.coverageAmount}</p>
                <p><b>Start Date:</b> {selectedPolicy.startDate}</p>
                <p><b>End Date:</b> {selectedPolicy.endDate}</p>
                <hr />
                <h6>Customer Details</h6>
                <p><b>Name:</b> {selectedPolicy.customer?.firstName} {selectedPolicy.customer?.lastName}</p>
                <p><b>Email:</b> {selectedPolicy.customer?.emailAddress}</p>
                <p><b>Contact:</b> {selectedPolicy.customer?.contact}</p>
                <hr />
                <h6>Vehicle Details</h6>
                <p><b>Type:</b> {selectedPolicy.vehicleDetails?.vehicleType}</p>
                <p><b>Registration Number:</b> {selectedPolicy.vehicleDetails?.RegistrationNumber}</p>
                <p><b>Fuel Type:</b> {selectedPolicy.vehicleDetails?.FuelType}</p>
                <p><b>Make:</b> {selectedPolicy.vehicleDetails?.VehicleMake}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Policy;
