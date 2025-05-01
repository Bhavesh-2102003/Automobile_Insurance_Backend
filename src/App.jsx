import { Navigate, Routes, Route } from "react-router-dom";
import OfficerLogin from "./components/auth/OfficerLogin";
import OfficerSignup from "./components/auth/OfficerSignup";
import OfficerProfile from "./components/auth/OfficerProfile";
import OfficerDashboard from "./officer/OfficerDashboard";
import Policy from "./officer/Policy";
import AddPolicy from "./officer/AddPolicy";
import AddPolicyForm from "./officer/AddPolicyForm";
import CustomerList from "./officer/CustomerList";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/officer/login" />} />
      <Route path="officer/login" element={<OfficerLogin />} />
      <Route path="officer/signup" element={<OfficerSignup />} />
      <Route path="officer/dashboard" element={<OfficerDashboard />} />
      <Route path="officer/policies" element={<Policy />} />
      <Route path="officer/add-policy" element={<AddPolicy />} />
      <Route path="officer/add-policy-form" element={<AddPolicyForm />} />
      <Route path="officer/customer" element={<CustomerList />} />
      <Route path="officer/profile" element={<OfficerProfile />} />
    </Routes>
  );
}

export default App;