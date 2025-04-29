import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchCustomerCount from "../store/action/customerAction";
import axios from "axios";
import { Link } from "react-router-dom";

function OfficerDashboard() {
  const dispatch = useDispatch();
  const customerCount = useSelector(state => state.customerStats.count);
  const [stats, setStats] = React.useState({
    approved: 0,
    rejected: 0,
    pending: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    // Fetch policy stats and customer count from backend (replace URLs with your API endpoints)
    async function fetchStats() {
      try {
        const policyRes = await axios.get("http://localhost:8087/api/policy/stats");
        setStats(prev => ({
          ...prev,
          approved: policyRes.data.approved,
          rejected: policyRes.data.rejected,
          pending: policyRes.data.pending
        }));
      } catch (err) {
        // fallback or show error
      }
    }
    fetchStats();
    dispatch(fetchCustomerCount());
  }, [dispatch]);

  useEffect(() => {
    setStats(prev => ({ ...prev, totalCustomers: customerCount }));
  }, [customerCount]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)', padding: '40px 0' }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold" style={{ color: '#1e90ff' }}>Officer Dashboard</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title text-success">Approved</h5>
                <p className="display-5 fw-bold">{stats.approved}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title text-danger">Rejected</h5>
                <p className="display-5 fw-bold">{stats.rejected}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title text-warning">Pending</h5>
                <p className="display-5 fw-bold">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title text-primary">Total Customers</h5>
                <p className="display-5 fw-bold">{stats.totalCustomers}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Manage Customers</h5>
                <p>View, update, or delete customers.</p>
                <Link to="/officer/customers" className="btn btn-primary">Go to Customers</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Manage Policies</h5>
                <p>View and add policies.</p>
                <Link to="/officer/policies" className="btn btn-primary">Go to Policies</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Add Policy</h5>
                <p>Add a new policy.</p>
                <Link to="/officer/add-policy" className="btn btn-primary">Add Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfficerDashboard;
