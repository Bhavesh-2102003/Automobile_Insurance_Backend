import React, { useState } from "react";
import { calculateClaimAmount } from "./ClaimAmountCalculator";
import "./ClaimRequest.css";

const policyTypes = [
  { label: "Comprehensive", value: "comprehensive" },
  { label: "Third Party", value: "third party" },
  { label: "Own Damage", value: "own damage" }
];

const vehicleTypes = [
  { label: "Car", value: "car" },
  { label: "Bike", value: "bike" }
];

// Risk profiles (static, not from DB)
const riskProfiles = [
  {
    title: "High Risk",
    description: "Sports cars, superbikes, vehicles used for commercial purposes, or vehicles older than 10 years. Higher premium and lower claim approval ratio."
  },
  {
    title: "Moderate Risk",
    description: "Regular sedans, hatchbacks, standard bikes aged 5-10 years. Standard premium and moderate claim approval ratio."
  },
  {
    title: "Low Risk",
    description: "New vehicles (less than 5 years), vehicles with comprehensive coverage, and regular usage. Lower premium and higher claim approval ratio."
  }
];

// Guidelines (static, not from DB)
const guidelines = [
  "Ensure all policy documents are valid and up to date.",
  "Verify the vehicle's accident history and maintenance records.",
  "For third-party claims, only damages to others are covered.",
  "Comprehensive policies cover a wider range of damages, but may require more documentation.",
  "Own damage claims are subject to depreciation and exclusions as per policy.",
  "Submit clear images and detailed descriptions for faster claim approval."
];

function CalculateClaimAmount() {
  const [policyType, setPolicyType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!policyType || !vehicleType || !coverageAmount) {
      setResult(null);
      return alert("Please fill all fields");
    }
    const amt = calculateClaimAmount(policyType, parseFloat(coverageAmount), vehicleType);
    setResult(amt);
  };

  return (
    <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #e3f0fc 0%, #f7fbff 100%)', minHeight: '100vh', padding: 0 }}>
      {/* Hero/Header Section */}
      <div style={{ background: '#1976d2', color: '#fff', borderRadius: '0 0 32px 32px', padding: '40px 0 30px 0', marginBottom: 32, boxShadow: '0 8px 24px #1976d210' }}>
        <h1 style={{ textAlign: 'center', fontWeight: 700, letterSpacing: 1, fontSize: 38 }}>Automobile Insurance Claim Approval System</h1>
        <p style={{ textAlign: 'center', maxWidth: 700, margin: '18px auto 0 auto', fontSize: 18, color: '#e3e3e3' }}>
          This platform enables officers to estimate and process insurance claims efficiently and transparently.<br/>
          The system uses policy and vehicle details to guide claim approval and ensure fair, data-driven decisions.
        </p>
      </div>

      {/* System Details & Steps */}
      <div className="row justify-content-center" style={{ marginBottom: 24 }}>
        <div className="col-lg-10">
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: '24px 32px', marginBottom: 24 }}>
            <h3 style={{ color: '#1e88e5', fontWeight: 600 }}>How Claim Approval Works</h3>
            <ol style={{ color: '#222', fontSize: 16, marginTop: 18, marginLeft: 18 }}>
              <li><b>Claim Submission:</b> Customer submits a claim with all required documents and accident details.</li>
              <li><b>Document Verification:</b> Officer reviews policy details, vehicle type, and supporting evidence.</li>
              <li><b>Calculation:</b> System calculates the eligible claim amount based on policy and vehicle category.</li>
              <li><b>Officer Review:</b> Officer checks risk profile, guidelines, and policy exclusions before approval.</li>
              <li><b>Approval/Settlement:</b> Approved claims are processed and settled as per company policy.</li>
            </ol>
            <div style={{ marginTop: 18, color: '#1565c0', fontSize: 15 }}>
              <b>Note:</b> This calculator is for estimation and training purposes. Actual approval may vary based on further investigation and documentation.
            </div>
          </div>
        </div>
      </div>

      {/* Main Calculator + Guidance Section */}
      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-10">
          <div className="claim-calc-panel" style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px #0002', padding: 32, marginBottom: 40 }}>
            <h2 style={{ textAlign: "center", color: '#1976d2', marginBottom: 8 }}>Claim Amount Calculator</h2>
            <p style={{ textAlign: "center", color: '#555', marginBottom: 18 }}>
              Estimate the approved claim amount for a given policy and vehicle type.<br/>
              <b>Note:</b> This is a guideline tool and does not guarantee claim approval.
            </p>

            {/* Risk Profiles */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: '#1e88e5', marginBottom: 8 }}><span role="img" aria-label="risk">⚠️</span> Risk Profiles</h4>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {riskProfiles.map((profile, idx) => (
                  <div key={idx} style={{ flex: 1, minWidth: 180, background: '#f6fafd', borderRadius: 8, padding: 16, borderLeft: `6px solid ${idx === 0 ? '#e53935' : idx === 1 ? '#fbc02d' : '#43a047'}` }}>
                    <h5 style={{ margin: 0, color: idx === 0 ? '#e53935' : idx === 1 ? '#fbc02d' : '#43a047' }}>{profile.title}</h5>
                    <p style={{ margin: 0, fontSize: 14 }}>{profile.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: '#1e88e5', marginBottom: 8 }}><span role="img" aria-label="guide">📋</span> Guidelines & Instructions</h4>
              <ul style={{ color: '#444', fontSize: 15, paddingLeft: 24 }}>
                {guidelines.map((g, idx) => (
                  <li key={idx} style={{ marginBottom: 4 }}>{g}</li>
                ))}
              </ul>
            </div>

            {/* Claim Calculator Form */}
            <form onSubmit={handleCalculate} style={{ display: "flex", flexDirection: "column", gap: 18, background: '#f9f9f9', borderRadius: 8, padding: 24, boxShadow: '0 1px 6px #0001' }}>
              <label>
                Policy Type:
                <select value={policyType} onChange={e => setPolicyType(e.target.value)}>
                  <option value="">Select Policy Type</option>
                  {policyTypes.map(pt => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>
              </label>
              <label>
                Vehicle Type:
                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
                  <option value="">Select Vehicle Type</option>
                  {vehicleTypes.map(vt => (
                    <option key={vt.value} value={vt.value}>{vt.label}</option>
                  ))}
                </select>
              </label>
              <label>
                Coverage Amount (₹):
                <input
                  type="number"
                  min="0"
                  value={coverageAmount}
                  onChange={e => setCoverageAmount(e.target.value)}
                  placeholder="Enter coverage amount"
                />
              </label>
              <button type="submit" className="action-btn Approved-btn">Calculate</button>
            </form>

            {/* Result */}
            {result !== null && (
              <div style={{ marginTop: 28, textAlign: "center", fontSize: 22, fontWeight: 600, color: '#2e7d32', border: '2px dashed #b9f6ca', background: '#f1fff7', borderRadius: 8, padding: 18, marginBottom: 8 }}>
                <span role="img" aria-label="approved">✅</span> Approved Claim Amount: <span>₹{result.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Policy & Vehicle Analysis Section */}
      <div className="row justify-content-center" style={{ marginBottom: 40 }}>
        <div className="col-lg-8 col-md-10">
          <div style={{ background: '#f6fafd', borderRadius: 10, padding: 28, boxShadow: '0 2px 8px #0001' }}>
            <h4 style={{ color: '#1976d2', marginBottom: 10 }}><span role="img" aria-label="analysis">🔍</span> Vehicle & Policy Analysis (Reference)</h4>
            <ul style={{ color: '#444', fontSize: 15, paddingLeft: 24 }}>
              <li>For <b>high-value vehicles</b> (sports/luxury), expect stricter scrutiny and higher documentation requirements.</li>
              <li>Policies with <b>comprehensive coverage</b> offer the broadest protection but may require detailed accident reports and maintenance records.</li>
              <li>Third-party policies <b>do not cover own damage</b>; only liabilities to others are claimable.</li>
              <li>Always review the <b>policy document</b> for exclusions, deductibles, and special conditions.</li>
              <li>Claims on <b>older vehicles</b> may be subject to higher depreciation and lower approved amounts.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculateClaimAmount;
