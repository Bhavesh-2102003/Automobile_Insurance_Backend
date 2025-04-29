import { Navigate, Routes, Route } from "react-router-dom";
import OfficerLogin from "./components/auth/OfficerLogin";
import OfficerSignup from "./components/auth/OfficerSignup";
import OfficerDashboard from "./officer/OfficerDashboard";
import Policy from "./officer/Policy";
import AddPolicy from "./officer/AddPolicy";
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
      {/* Add this route for CustomerList */}
      <Route path="officer/CustomerList" element={<CustomerList />} />
      {/* Optionally, keep the lowercase version for backward compatibility */}
      <Route path="officer/customers" element={<CustomerList />} />
    </Routes>
  );
}

export default App;