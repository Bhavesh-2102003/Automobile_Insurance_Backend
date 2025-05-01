import React, { useEffect, useState } from "react";
import './Policy.css';
import axios from "axios";

function Policy() {
  const [policies, setPolicies] = useState([]);
  const [expandedPolicyId, setExpandedPolicyId] = useState(null);
  
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    async function fetchPolicies() {
      try {
        const res = await axios.get(`http://localhost:8087/api/policy/all`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        setPolicies(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPolicies();
  }, [token]);

  const getStatusBadge = (status) => {
    const statusColors = {
      Active: 'bg-success',
      Pending: 'bg-warning',
      Expired: 'bg-danger'
    };
    return `<span class="badge ${statusColors[status] || 'bg-secondary'} rounded-pill">${status}</span>`;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)', padding: '40px 0' }}>
      <div className="container-fluid">
        <div className="add-policy-container">
          <div className="header-section mb-5">
            <h1 className="display-5 fw-bold text-primary">Insurance Policies</h1>
          </div>

          <div className="row g-4">
            {policies.map((policy) => (
              <div className="col-12 col-md-6 col-xl-4" key={policy.id}>
                <div 
                  className={`card policy-card shadow-lg ${expandedPolicyId === policy.id ? 'expanded' : ''}`}
                  onClick={() => setExpandedPolicyId(prev => prev === policy.id ? null : policy.id)}
                >
                  <div className="card-header bg-transparent">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="mb-1">#Policy{policy.id}</h3>
                        <small className="text-muted">
                          {new Date(policy.startDate).toLocaleDateString('en-IN')} - 
                          {new Date(policy.endDate).toLocaleDateString('en-IN')}
                        </small>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: getStatusBadge(policy.status) }} />
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="badge bg-primary fs-6 mb-2">
                          {policy.coverageType}
                        </span>
                        <h5 className="mb-0">₹{policy.coverageAmount.toLocaleString()}</h5>
                      </div>
                      <i className={`bi ${
                        policy.vehicleDetails?.vehicleType === 'Car' 
                          ? 'bi-car-front fs-1 text-info' 
                          : 'bi-bicycle fs-1 text-success'
                      }`} />
                    </div>

                    {expandedPolicyId === policy.id && (
                      <div className="mt-4 pt-3 border-top">
                        <div className="row g-3">
                          <div className="col-12">
                            <h5 className="text-primary mb-3">
                              <i className="bi bi-person-circle me-2"></i>
                              Customer Details
                            </h5>
                            <div className="d-flex align-items-center mb-3">
                              <div className="bg-primary text-white rounded-circle p-2 me-3">
                                {policy.customer?.firstName?.[0]}
                              </div>
                              <div>
                                <p className="mb-0 fw-bold fs-5">
                                  {policy.customer?.firstName} {policy.customer?.lastName}
                                </p>
                                <small className="text-muted">{policy.customer?.emailAddress}</small>
                              </div>
                            </div>
                            <div className="row small g-2">
                              <div className="col-4">Contact</div>
                              <div className="col-8">{policy.customer?.contact}</div>
                              <div className="col-4">Location</div>
                              <div className="col-8">
                                {policy.customer?.city}, {policy.customer?.state}
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <h5 className="text-primary mb-3">
                              <i className="bi bi-car-front me-2"></i>
                              Vehicle Details
                            </h5>
                            <div className="row small g-2">
                              <div className="col-4">Registration</div>
                              <div className="col-8">{policy.vehicleDetails?.registrationNumber}</div>
                              <div className="col-4">Make/Model</div>
                              <div className="col-8">
                                {policy.vehicleDetails?.vehicleMake}{' '}
                                {policy.vehicleDetails?.carVariant || policy.vehicleDetails?.bikeModel}
                              </div>
                              <div className="col-4">Fuel Type</div>
                              <div className="col-8">{policy.vehicleDetails?.fuelType}</div>
                              <div className="col-4">Previous Insurer</div>
                              <div className="col-8">
                                {policy.vehicleDetails?.previousInsuranceProvider}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;