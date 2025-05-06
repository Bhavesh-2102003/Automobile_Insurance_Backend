import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Login from './component/auth/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  // ⬅️ Import BrowserRouter
import SignUp from './component/customer/SignUp'
import ClaimSubmission from './component/customer/CustomerVehicleSubmission'
import VehicleSubmission from './component/customer/CustomerVehicleSubmission'
import Quote from './component/customer/Quote'
import Payment from './component/customer/Payment'
import PolicyList from './component/customer/PolicyList'
import CustomerLanding from './component/customer/CustomerLanding'
import ClaimSubmissionForm from './component/customer/ClaimSubmission'
import ClaimTrackingPage from './component/customer/CustomerClaimTracking'
import Profile from './component/customer/ProfileSection'
import Settings from './component/customer/Settings'
import PolicyPDF from './component/customer/PolicyPDF'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/customer/signup" element={<SignUp />} />
        <Route path="/customer" element={<CustomerLanding />} />
        <Route path="/customer/submit-details" element={<VehicleSubmission />} />
        <Route path="/customer/quote" element={<Quote />} />
        <Route path="/customer/payment" element={<Payment />} />
        <Route path="/customer/policy-list" element={<PolicyList />} />
        <Route path="/customer/submit-claim" element={<ClaimSubmissionForm />} />
        <Route path="/customer/track-claim" element={<ClaimTrackingPage />}/>
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/settings" element={<Settings />} />
        <Route path="/customer/policypdf" element={<PolicyPDF />} />
      </Routes>
    </Router>
  )
}

export default App
