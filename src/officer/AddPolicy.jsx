import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AddPolicyForm from "./AddPolicyForm";
import "./AddPolicy.css";

function AddPolicy() {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.post("http://localhost:8087/api/policy-template/all", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8087/api/policy-template/delete/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setPolicies(policies.filter(policy => policy.id !== id));
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  const PolicyCard = ({ policy }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="policy-card"
      onClick={() => setSelectedPolicy(policy)}
    >
      <h4>{policy.name}</h4>
      <p><strong>Type:</strong> {policy.policyType}</p>
      <p><strong>Price:</strong> ${policy.price}</p>
      <p><strong>Duration:</strong> {policy.duration} months</p>
      <p><strong>Categories:</strong> {policy.categories}</p>
      <button onClick={() => handleDelete(policy.id)}>Delete</button>
    </motion.div>
  );

  return (
    <div className="add-policy-container">
      <div className="header-section">
        <h1>Policy Management</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="add-policy-btn"
        >
          Add New Policy
        </button>
      </div>

      {showAddForm && <AddPolicyForm onPolicyAdded={() => { fetchPolicies(); setShowAddForm(false); }} />}

      <div className="policies-grid">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>

      {selectedPolicy && (
        <div className="policy-details">
          <h3>{selectedPolicy.name}</h3>
          <p><strong>Type:</strong> {selectedPolicy.policyType}</p>
          <p><strong>Price:</strong> ${selectedPolicy.price}</p>
          <p><strong>Duration:</strong> {selectedPolicy.duration} months</p>
          <p><strong>Categories:</strong> {selectedPolicy.categories}</p>
          <p><strong>Description:</strong> {selectedPolicy.description}</p>
          <p><strong>Eligibility Criteria:</strong> {selectedPolicy.eligibilityCriteria}</p>
          <p><strong>Features:</strong> {selectedPolicy.features}</p>
          <p><strong>Terms and Conditions:</strong> {selectedPolicy.termsAndConditions}</p>
          <p><strong>Min Coverage Amount:</strong> {selectedPolicy.minCoverageAmount}</p>
          <p><strong>Max Coverage Amount:</strong> {selectedPolicy.maxCoverageAmount}</p>
          <button onClick={() => setSelectedPolicy(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AddPolicy;