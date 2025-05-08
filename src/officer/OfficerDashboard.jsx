import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CoverageChart from "./CoverageChart";  // Import the CoverageChart component

function OfficerDashboard() {
  const [stats, setStats] = useState({ approved: 0, rejected: 0, totalCustomers: 0 });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const claimRes = await axios.get("http://localhost:8087/api/status/count", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(prev => ({
          ...prev,
          approved: claimRes.data.approved,
          rejected: claimRes.data.rejected,
        }));
      } catch (err) {
        // handle error
      }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const customerRes = await axios.get("http://localhost:8087/api/customer/count", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(prev => ({ ...prev, totalCustomers: customerRes.data.count }));
      } catch (err) {
        // handle error
      }
    }
    fetchCustomerCount();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)', padding: '40px 0' }}>
      <div className="container-fluid">
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
                <h5 className="card-title text-primary">Total Customers</h5>
                <p className="display-5 fw-bold">{stats.totalCustomers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other links/cards for managing customers, policies, etc. */}
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Manage Customers</h5>
                <p>View, update, or delete customers.</p>
                <Link to="/officer/customer" className="btn btn-primary">Go to Customers</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Manage Policies</h5>
                <p>View and add policies.</p>
                <Link to="/officer/policies" className="btn btn-primary">Go to Policies</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Claim Request</h5>
                <p>View and update claim requests.</p>
                <Link to="/officer/claims-request" className="btn btn-primary">Claim Request</Link>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Claim Amount Calculator</h5>
                <p>Estimate claim approval amount for any policy </p>
                <Link to="/officer/claim-amount-calculator" className="btn btn-primary">Open Calculator</Link>
              </div>
            </div>
          </div>
        </div>
          
          

        {/* Place the CoverageChart at the bottom */}
        <div className="row mt-4">
          <div className="col-md-12">
            <CoverageChart />
          </div>
        </div>

        
        <div className="row justify-content-center g-4 mt-4"> 
        <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Officer profile</h5>
                <p>View and Update your profile</p>
                <Link to="/officer/profile" className="btn btn-primary">Go to Profile</Link>
              </div>
            </div>
          </div>
  

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Add Policy Form</h5>
                <p>Add new policy</p>
                <Link to="/officer/add-policy-form" className="btn btn-primary">Add Policy</Link>
              </div>
            </div>
          </div>
          {/* Logout section */}
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h5 className="card-title">Logout</h5>
                <p>Logout from the system.</p>
                <Link to="/" onClick={() => localStorage.removeItem('token')} className="btn btn-primary">Logout</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OfficerDashboard;
