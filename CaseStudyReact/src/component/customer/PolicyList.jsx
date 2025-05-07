import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import jsPDF from "jspdf";


function PolicyList() {

    const [policies, setPolicies] = useState([]);
    const navigate=useNavigate();
    const [claims,setClaims]=useState([]);
    const customerId=localStorage.getItem('customerId');
    const token=localStorage.getItem('token');
    const location = useLocation();
    

    useEffect(()=>{
        const fetchAllPolicies=async()=>{
    let response=await axios.get('http://localhost:8087/api/auth/user/details',
        {
            headers: {
                "Authorization": `Bearer ${token}`  
            }
        }
    )
    const userId = response.data.id;
    let customerReponse=await axios.get(`http://localhost:8087/api/customer/getByUserId/${userId}`,
      {
          headers: {
              "Authorization": `Bearer ${token}`  
          }
      });
    const customerId=customerReponse.data.id;

    let policyResponse=await axios.get(`http://localhost:8087/api/policy/getAll/${customerId}`,
      {
          headers: {
              "Authorization": `Bearer ${token}`  
          }
      });
    setPolicies(policyResponse.data);}
    fetchAllPolicies();

    const getAllClaims=async()=>{
      let response=await axios.get(`http://localhost:8087/api/claim/getAll/${customerId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`  
            }
        });
      setClaims(response.data);
      
  }
  getAllClaims();
    },[])

    const fileClaim=(policy)=>{
      console.log(policy);
      navigate("/customer/submit-claim",{state:{policy}});
    }

    const generatePDF = (policy) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Insurance Policy Details", 20, 20);
    
        const details = [
          `Policy ID: ${policy.id}`,
          "---------------------------------------------------------------------------------------------------------",
          "Customer Details",
          "---------------------------------------------------------------------------------------------------------",
          `Customer name : ${policy.customer.firstName+" "+policy.customer.lastName}`,
          `Contact : ${policy.customer.contact}`,
          `Email Address : ${policy.customer.emailAddress}`,
          `Address : ${policy.customer.address}`,
          `Driving License Number : ${policy.vehicleDetails.drivingLicenseNo}`,
          "---------------------------------------------------------------------------------------------------------",
          "Vehicle Details",
          "---------------------------------------------------------------------------------------------------------",
        `Vehicle Type: ${policy.vehicleDetails.vehicleType}`,
          `Model: ${policy.vehicleDetails.carVariant || policy.vehicleDetails.bikeModel}`,
          `Registration Number: ${policy.vehicleDetails.registrationNumber}`,
            `Fuel Type: ${policy.vehicleDetails.fuelType}`,
            `Vehicle Make : ${policy.vehicleDetails.vehicleMake}`,
            "---------------------------------------------------------------------------------------------------------",
            "Policy Details",
            "---------------------------------------------------------------------------------------------------------",
          `Coverage Type: ${policy.coverageType}`,
          `Coverage Amount: Rs.${policy.coverageAmount}`,
          `Total Coverage: Rs.${policy.coverageAmount * 10}`,
          `Status: ${policy.status}`,
          `Start Date: ${policy.startDate}`,
          `End Date: ${policy.endDate}`,
        ];
    
        let y = 30;
        details.forEach((line) => {
          doc.setFontSize(12);
          doc.text(line, 20, y);
          y += 10;
        });
        doc.setFontSize(9)
        doc.text("Thank you for choosing HexaCover",65,290);
        doc.save(`Policy_${policy.id}.pdf`);
      };

  // Status colors
  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    expiring: "bg-amber-100 text-amber-800",
    expired: "bg-rose-100 text-rose-800"
  };

  // Policy type icons
  const policyIcons = {
    Comprehensive: "fa-shield-alt",
    "Third-Party": "fa-handshake"
  };

  // Vehicle type icons
  const vehicleIcons = {
    Car: "fa-car",
    Bike: "fa-motorcycle",
    Truck: "fa-truck",
    Scooter: "fa-scooter"
  };

  return (
    <>
    <Header/>
    <div className="policy-list-page min-vh-100 py-8" style={{ 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Your Insurance Policies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage all your policies in one place. View details, renew expired policies, 
            or make changes as needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div 
              key={policy.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className={`p-5 ${policy.coverageType === "Comprehensive" ? 
                "bg-gradient-to-r from-blue-600 to-indigo-700" : 
                "bg-gradient-to-r from-amber-500 to-orange-500"} text-white`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <i className={`fas ${policyIcons[policy.coverageType]} text-xl mr-3`}></i>
                      <span className="text-sm font-semibold tracking-wider uppercase">
                        {policy.coverageType} Coverage
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{policy.vehicleDetails.vehicleType} Insurance</h3>
                  </div>
                  {(() => {
                  const hasClaim = claims.some(claim => claim.policyDetails?.id === policy.id);
                  const displayStatus = hasClaim ? "Claim Submitted" : policy.status.charAt(0).toUpperCase() + policy.status.slice(1);
                  const statusClass = hasClaim ? "bg-yellow-500 text-white" : statusColors[policy.status];

                  return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                      {displayStatus}
                    </span>
                  );
                })()}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <i className={`fas ${vehicleIcons[policy.vehicleType]} text-gray-400 text-2xl mr-3`}></i>
                  <div>
                    <p className="text-sm text-gray-500">Registration Number</p>
                    <p className="font-semibold">{policy.vehicleDetails.registrationNumber}</p>
                  </div>
                </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle Name</p>
                    <p className="font-semibold">{policy.vehicleDetails.carVariant||policy.vehicleDetails.bikeModel}</p>
                  </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-sm text-gray-500">Premium</p>
                    <p className="font-semibold">{policy.coverageAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coverage</p>
                    <p className="font-semibold">{policy.coverageAmount*10}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-semibold">{policy.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-semibold">{policy.endDate}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    onClick={()=>{generatePDF(policy)}}
                    state={{policy}}
                    className="flex-1 text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                  >
                    <i className="fas fa-eye mr-2"></i> View PDF
                  </Link>
                  {policy.status === "expired" ? (
                    <button className="flex-1 text-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center">
                      <i className="fas fa-sync-alt mr-2"></i> Renew
                    </button>
                  ) : claims.some(claim => claim.policyDetails?.id === policy.id) ? (
                    <button className="flex-1 text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      onClick={() => { navigate("/customer/track-claim") }}>
                      <i className="fas fa-ellipsis-h mr-2"></i>Track
                    </button>
                  ) : (
                    <button className="flex-1 text-center py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-200 flex items-center justify-center"
                      onClick={() => { fileClaim(policy) }}>
                      <i className="fas fa-ellipsis-h mr-2"></i> File Claim
                    </button>
                  )}

                </div>
              </div>

              {/* Progress bar for policy duration */}
              <div className="px-5 pb-5">
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-1 rounded-full ${policy.status === "expired" ? "bg-rose-500" : 
                      policy.status === "expiring" ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: policy.status === "expired" ? "100%" : "75%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Start: {policy.startDate}</span>
                  <span>End: {policy.endDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add new policy card */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-400 transition duration-200">
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-plus text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Add New Policy</h3>
              <p className="text-gray-500 mb-4">Don't see your policy here? Add it now.</p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black  bg-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                <Link to={"/customer/submit-details"}>
                <i className="fas fa-plus mr-2 text-black"></i> Add Policy
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default PolicyList;