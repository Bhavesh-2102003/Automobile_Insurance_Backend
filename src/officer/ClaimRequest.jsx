/* ClaimRequest.jsx */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClaimRequest.css';

function ClaimRequest() {
  const [claims, setClaims] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ status: 'Approved', feedback: '', approvedAmount: 0 });

  // Fetch all claims on mount
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get('http://localhost:8087/api/claim/all');
        setClaims(res.data);
      } catch (err) {
        alert('Error loading claims');
      }
    }
    fetchClaims()
  }, []);

  // Handler for updating claim
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.feedback) return alert('Feedback is required');
    if (formData.status === 'Approved' && formData.approvedAmount <= 0)
      return alert('Approved amount must be > 0');

    const payload = {
      ...formData,
      approvedAmount: formData.status === 'Rejected' ? 0 : formData.approvedAmount,
    };

    try {
      await axios.put(
        `http://localhost:8087/api/claim/update/${selectedClaim.id}`,
        payload
      );
      alert('Claim updated');
      // reload
      const res = await axios.get('http://localhost:8087/api/claim/all');
      setClaims(res.data);
      setShowModal(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  const statusClass = (s) => s.toLowerCase();

  return (
    <div className="claim-container">
      <h1>Claim Requests</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>

      <div className="claims-grid">
        {claims
          .filter(c =>
            c.id.toString().includes(searchId) &&
            (statusFilter === 'all' || c.status === statusFilter)
          )
          .map(c => (
            <div
              key={c.id} // unique identifier
              className={`claim-card ${statusClass(c.status)}`}
              onClick={() => {
                setSelectedClaim(c);
                setFormData({ status: c.status, feedback: c.feedback || '', approvedAmount: c.approvedAmount || 0 });
                setShowModal(true);
              }}
            >
              <div className="card-header">
                <h2>Claim #{c.id}</h2>
                <span className={`status-badge ${statusClass(c.status)}`}>{c.status}</span>
              </div>
              <p>Type: {c.claimType}</p>
              <p>Date: {new Date(c.accidentDate).toLocaleDateString()}</p>
            </div>
          ))}
      </div>

      {showModal && selectedClaim && (
        <div className="modal-overlay">
          <div className="detail-modal">
            <h2>Claim #{selectedClaim.id} Details</h2>
            {/* Accident Info */}
            <section className="detail-section">
              <h3>Accident Information</h3>
              <p><strong>Type:</strong> {selectedClaim.claimType}</p>
              <p><strong>Location:</strong> {selectedClaim.location}</p>
              <p><strong>Description:</strong> {selectedClaim.damageDescription}</p>
              <div className="mb-3">
                    <small className="text-muted">Damage Image</small>
                    {selectedClaim.imageUrl ? (
                        <div className="border rounded p-2">
                            {console.log(selectedClaim.imageUrl)}
                            <img 
                            src={`/images/${selectedClaim.imageUrl.split('\\').pop()}`}
                            alt="Claim Evidence" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                            />

                        </div>
                    ) : (
                        <p className="mb-0 fw-bold text-muted">No image uploaded</p>
                    )}
                    </div>
              <p><strong>Date:</strong> {new Date(selectedClaim.accidentDate).toLocaleDateString()}</p>
            </section>
            {/* Policy Info */}
            <section className="detail-section">
              <h3>Policy Details</h3>
              <p><strong>ID:</strong> {selectedClaim.policyDetails?.id}</p>
              <p><strong>Coverage:</strong> {selectedClaim.policyDetails?.coverageType}</p>
              <p><strong>Amount:</strong> ₹{selectedClaim.policyDetails?.coverageAmount?.toLocaleString()}</p>
            </section>
            {/* Customer Info */}
            <section className="detail-section">
              <h3>Customer</h3>
              <p><strong>Name:</strong> {selectedClaim.customer?.firstName} {selectedClaim.customer?.lastName}</p>
              <p><strong>Contact:</strong> {selectedClaim.customer?.contact}</p>
              <p><strong>Email:</strong> {selectedClaim.customer?.emailAddress}</p>
            </section>

            <form onSubmit={handleUpdate} className="update-form">
              <label>Decision:</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="Approved">Approve</option>
                <option value="Rejected">Reject</option>
                <option value="Under Review">Under Review</option>
              </select>

              {formData.status === 'Approved' && (
                <>
                  <label>Approved Amount ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={formData.approvedAmount}
                    onChange={e => setFormData({ ...formData, approvedAmount: parseFloat(e.target.value) })}

                  />
                </>
              )}

              <label>{formData.status === 'Approved' ? 'Approval Notes:' : 'Rejection Reason:'}</label>
              <textarea
                value={formData.feedback}
                onChange={e => setFormData({ ...formData, feedback: e.target.value })}
              />

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Close</button>
                <button type="submit" className={`action-btn ${statusClass(formData.status)}-btn`}> 
                  {formData.status === 'Approved' ? 'Confirm Approval' : 'Confirm Rejection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default ClaimRequest;