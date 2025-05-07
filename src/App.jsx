import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import OfficerLogin from "./components/auth/OfficerLogin";
import OfficerSignup from "./components/auth/OfficerSignup";
import OfficerProfile from "./components/auth/OfficerProfile";
import OfficerDashboard from "./officer/OfficerDashboard";
import Policy from "./officer/Policy";
import AddPolicy from "./officer/AddPolicy";
import AddPolicyForm from "./officer/AddPolicyForm";
import CustomerList from "./officer/CustomerList";
import ClaimRequest from "./officer/ClaimRequest";
import  fetchOfficerProfile from "./store/action/fetchOfficerProfile";

function App() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id"); // Get ID from storage

  useEffect(() => {
    if(id) { // Only fetch if ID exists
      dispatch(fetchOfficerProfile(id));
    }
  }, [dispatch, id]); // Add id to dependencies

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/officer/login" />} />
      <Route path="officer/login" element={<OfficerLogin />} />
      <Route path="officer/signup" element={<OfficerSignup />} />
      <Route path="officer/dashboard" element={<OfficerDashboard />} />
      <Route path="officer/customer" element={<CustomerList />} />
      <Route path="officer/policies" element={<Policy />} />
      <Route path="officer/add-policy" element={<AddPolicy />} />
      <Route path="officer/add-policy-form" element={<AddPolicyForm />} />
      <Route path="officer/claims-request" element={<ClaimRequest />} />
      <Route path="officer/profile" element={<OfficerProfile />} />
    </Routes>
  );
}

export default App;