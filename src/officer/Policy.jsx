import React, { useEffect, useState } from "react";
import axios from "axios";
import './Policy.css';

function Policy() {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [expandedPolicyId, setExpandedPolicyId] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [selectedCoverageType, setSelectedCoverageType] = useState('');

  const token = localStorage.getItem('token');

  // Utility: Generate colored status badge
  const getStatusBadge = (status) => {
    const statusColors = {
      Active: 'bg-success',
      Pending: 'bg-warning',
      Expired: 'bg-danger'
    };
    return `<span class="badge ${statusColors[status] || 'bg-secondary'} rounded-pill">${status}</span>`;
  };

  // Fetch all policies once on component load
  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await axios.get('http://localhost:8087/api/policy/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPolicies(res.data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    }
    fetchPolicies();
  }, []);

  // Filter policies when searchId or coverageType changes
  useEffect(() => {
    const filtered = policies.filter(policy => {
      if (!policy) return false;

      const policyId = String(policy.id || '').toLowerCase();
      const searchTerm = searchId.toLowerCase();
      const idMatch = policyId.includes(searchTerm);

      const coverageType = (policy.coverageType || '').toLowerCase().trim();
      const coverageMatch = selectedCoverageType
        ? coverageType === selectedCoverageType.toLowerCase().trim()
        : true;

      return idMatch && coverageMatch;
    });

    setFilteredPolicies(filtered);
  }, [searchId, selectedCoverageType, policies]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)', padding: '40px 0' }}>
      <div className="container-fluid">
        <div className="add-policy-container">
          <h1 className="text-primary mb-4">Insurance Policies</h1>

          <div className="row g-3 mb-4">
            {/* Search Input */}
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by Policy ID..."
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
              />
            </div>

            {/* Coverage Filter Dropdown */}
            <div className="col-md-6">
              <select
                className="form-select form-select-lg"
                value={selectedCoverageType}
                onChange={e => setSelectedCoverageType(e.target.value)}
              >
                <option value="">All Coverage Types</option>
                <option value="Comprehensive">Comprehensive</option>
                <option value="Third Party">Third Party</option>
                <option value="Own Damage">Own Damage</option>
              </select>
            </div>
          </div>

          {/* Policy Cards */}
          <div className="row g-4">
            {filteredPolicies.map(policy => (
              <div className="col-md-6 col-lg-4" key={policy.id}>
                <div
                  className="card shadow policy-card"
                  onClick={() => setExpandedPolicyId(prev => prev === policy.id ? null : policy.id)}
                >
                  <div className="card-header d-flex justify-content-between">
                    <div>
                      <h5>#Policy{policy.id}</h5>
                      <small>
                        {new Date(policy.startDate).toLocaleDateString()} - 
                        {new Date(policy.endDate).toLocaleDateString()}
                      </small>
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: getStatusBadge(policy.status) }} />
                  </div>

                  <div className="card-body">
                    <h6>{policy.coverageType}</h6>
                    <p>₹{policy.coverageAmount.toLocaleString()}</p>

                    {expandedPolicyId === policy.id && (
                      <>
                        <hr />
                        <p><strong>Customer:</strong> {policy.customer?.firstName} {policy.customer?.lastName}</p>
                        <p><strong>Email:</strong> {policy.customer?.emailAddress}</p>
                        <p><strong>Vehicle:</strong> {policy.vehicleDetails?.vehicleMake} - {policy.vehicleDetails?.vehicleType}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* No Results */}
            {filteredPolicies.length === 0 && (
              <div className="text-center text-white mt-4">
                <h5>No policies found.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;
