import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';

const ClaimTrackingPage = () => {
  // Sample claims data (car & bike insurance)
  const claims1 = [
    {
      id: 'CLAIM-2023-001',
      type: 'Car Insurance',
      status: 'Approved',
      date: '15 May 2023',
      amount: '$2,450',
      description: 'Rear collision repair - Honda City',
      vehicle: 'Honda City (DL8CAB1234)',
      documents: 3
    }
  ];

  const [claims,setClaims]=useState([]);
  const customerId=localStorage.getItem('customerId');
  const token=localStorage.getItem('token');

  useEffect(()=>{
    const getAllClaims=async()=>{
        let response=await axios.get(`http://localhost:8087/api/claim/getAll/${customerId}`,
          {
            headers:{
              'Authorization':`Bearer ${token}`
            }
          }
        );
        setClaims(response.data);
        
    }
    getAllClaims();
  },[claims])


  // Status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      'Approved': 'bg-success',
      'Processing': 'bg-primary',
      'Rejected': 'bg-danger'
    };
    return <span className={`badge ${statusStyles[status]} px-3 py-2 rounded-pill`}>{status}</span>;
  };

  return (
    <div>
        <Header />
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
        
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Your Vehicle Claims</h1>
        <p className="text-muted">Track the status of your car & bike insurance claims</p>
      </div>

      {/* Claims Cards */}
      <div className="row g-4">
        {claims.map((claim, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div 
              className="card h-100 border-0 shadow-lg overflow-hidden"
              style={{ 
                borderRadius: '15px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {/* Card Header (Consistent Blue Color) */}
              <div 
                className="card-header border-0 py-4 text-white"
                style={{ 
                  background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
                  borderRadius: '15px 15px 0 0'
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">{claim.claimType}</h5>
                  {getStatusBadge(claim.status)}
                  {console.log(claim)}
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-muted">Vehicle</small>
                  <p className="mb-0 fw-bold">{claim.vehicleDetails.carVariant||claim.vehicleDetails.bikeModel}</p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <small className="text-muted">Date</small>
                    <p className="mb-0 fw-bold">{claim.submittedAt}</p>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">Insured Declared Value(IDV)</small>
                    <p className="mb-0 fw-bold">{claim.policyDetails.coverageAmount*10}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted">Claim ID</small>
                  <p className="mb-0">{claim.id}</p>
                </div>
                
                <div className="mb-3">
                  <small className="text-muted">Description</small>
                  <p className="mb-0">{claim.damageDescription}</p>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Coverage Type</small>
                  <p className="mb-0 fw-bold">{(claim.policyDetails.coverageType).toUpperCase()}</p>
                </div>
                
                
                <div className="mb-3">
                  <small className="text-muted">Feedback from Insurance</small>
                  <p className="mb-0 fw-bold">{claim.feedback||"Yet to be reviewed by Insurer"}</p>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Approved Amount</small>
                  <p className="mb-0 fw-bold">{claim.approvedAmount||"Yet to be reviewed by Insurer"}</p>
                </div>

                <div className="mb-3">
                    <small className="text-muted">Damage Image</small>
                    {claim.imageUrl ? (
                        <div className="border rounded p-2">
                            {console.log(claim.imageUrl)}
                            <img 
                            src={`/images/${claim.imageUrl.split('\\').pop()}`} 
                            alt="Claim Evidence" 
                            style={{ maxWidth: '100%', height: 'auto' }} 
                            />

                        </div>
                    ) : (
                        <p className="mb-0 fw-bold text-muted">No image uploaded</p>
                    )}
                    </div>
              </div>

              {/* Card Footer (CTA Button) */}
              <div className="card-footer bg-white border-0 pt-0 pb-3">
                <button 
                    className="btn btn-dark w-100 py-2 rounded-pill"
                    style={{ fontWeight: '500' }}
                    onClick={() => {
                    if (claim.status !== "PENDING") {
                        proceedToPayment(claim);
                    } else {
                        alert('Please wait while your claim is being reviewed.');
                    }
                    }}
                >
                    <i className="bi bi-eye me-2"></i> Proceed to Payment
                </button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no claims) */}
      {claims.length === 0 && (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-car-front text-muted" style={{ fontSize: '3rem' }}></i>
          </div>
          <h4 className="mb-3">No claims found</h4>
          <p className="text-muted">You don't have any active claims.</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ClaimTrackingPage;