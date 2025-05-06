import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaBirthdayCake, FaVenusMars, 
         FaPhone, FaMapMarkerAlt, FaCity, FaGlobeAmericas, 
         FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
         

function Profile() {
    
  
  const [customer,setCustomer]=useState(null);
  const [emailEdit,setEmailEdit]=useState(false);
  const [contactEdit,setContactEdit]=useState(false);
  const [addressEdit,setAddressEdit]=useState(false);
  const [emailChange,setEmailChange]=useState(null);
  const [contactChange,setContactChange]=useState(null);
  const [addressChange,setAddressChange]=useState(null);
  const customerId=localStorage.getItem('customerId');
  const navigate=useNavigate();


  useEffect(()=>{
    const getCustomer=async()=>{
        const token=localStorage.getItem('token');

        
        let response=await axios.get(`http://localhost:8087/api/customer/getByCustomerId/${customerId}`,
          {
            headers:{
              "Authorization":`Bearer ${token}`
            }
          }
        )
        setCustomer(response.data)
    }

    getCustomer();
    
  },[])


  if (!customer) {
    // Show a loading indicator until the customer data is fetched
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <p>Loading customer data...</p>
      </div>
    );
  }

  const handleAddressChange=()=>{
    axios.put(`http://localhost:8087/api/customer/editAddress/${customerId}`,null,
      {
        params:{
          address:addressChange
        }
      }
    )
    setAddressEdit(false);
    navigate(0);
  }

  const handleContactChange=()=>{
    axios.put(`http://localhost:8087/api/customer/editContact/${customerId}`,null,
      {
        params:{
          contact:contactChange
        }
      }
    )
    setContactEdit(false);
    navigate(0);
  }
  
  const handleEmailChange=()=>{
    axios.put(`http://localhost:8087/api/customer/editEmail/${customerId}`,null,
      {
        params:{
          email:emailChange
        }
      }
    )
    setEmailEdit(false);
    navigate(0);
  }

  return (
    <div>
    <Header />
    <div className="min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
      padding: '40px 0'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Profile Card */}
            
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              {/* Header */}
              <div className="card-header text-white" style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                padding: '2rem'
              }}>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-white d-flex justify-content-center align-items-center" 
                       style={{ width: '100px', height: '100px', border: '4px solid rgba(255,255,255,0.5)' }}>
                    <FaUserCircle size={60} className="text-primary" />
                  </div>
                  <div className="ms-4">
                    <h2 className="mb-1">{customer.firstName} {customer.lastName}</h2>
                    <p className="mb-2">@{customer.user.username}</p>
                    
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="card-body p-4 p-md-5">
                <div className="row g-4">
                  {/* Personal Information */}
                  <div className="col-md-6">
                    <div className="bg-light rounded p-4 h-100">
                      <h5 className="mb-4 text-primary d-flex align-items-center">
                        <FaUser className="me-2" /> Personal Information
                      </h5>
                      <div className="mb-3">
                        <small className="text-muted">Date of Birth</small>
                        <p className="mb-0">{customer.dateOfBirth}</p>
                      </div>
                      <div>
                        <small className="text-muted">Gender</small>
                        <p className="mb-0">{customer.gender}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="col-md-6">
                    <div className="bg-light rounded p-4 h-100">
                      <h5 className="mb-4 text-primary d-flex align-items-center">
                        <FaEnvelope className="me-2" /> Contact Information
                      </h5>
                      <div className="mb-3">
                        <small className="text-muted">Email Address</small>
                        <button
                          style={{
                            backgroundColor: "#6a11cb",
                            color: "white",
                            border: "none",
                            padding: "2px 6px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize:"15px",
                            marginLeft:"5px"
                          }}
                          onClick={()=>{setEmailEdit(emailEdit?false:true)}}
                        >
                          Edit
                        </button>
                        {emailEdit?
                        <div>
                        <input 
                        type="email"
                        className="form-control mt-1"
                        onChange={(event)=>{setEmailChange(event.target.value)}}
                        />
                        <button
                        onClick={handleEmailChange}
                        style={{
                          backgroundColor: "#28a745", // green
                          color: "white",
                          border: "none",
                          padding: "3px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "15px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          marginTop:"5px"
                        }}
                      >
                        Done
                      </button>
                        </div>:<p className="mb-0">{customer.emailAddress}</p>  
                      }
                      </div>
                      <div>
                        <small className="text-muted">Phone Number</small>
                        <button
                          style={{
                            backgroundColor: "#6a11cb",
                            color: "white",
                            border: "none",
                            padding: "2px 6px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize:"15px",
                            marginLeft:"5px"
                          }}
                          onClick={()=>{setContactEdit(contactEdit?false:true)}}
                        >
                          Edit
                        </button>
                        {contactEdit?
                        <div>
                        <input 
                        type="email"
                        className="form-control mt-1"
                        onChange={(event)=>{setContactChange(event.target.value)}}
                        />
                        <button
                        onClick={handleContactChange}
                        style={{
                          backgroundColor: "#28a745", // green
                          color: "white",
                          border: "none",
                          padding: "3px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "15px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          marginTop:"5px"
                        }}
                      >
                        Done
                      </button>
                        </div>:<p className="mb-0">{customer.contact}</p>  
                      }
                        
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="col-md-12">
                    <div className="bg-light rounded p-4">
                      <h5 className="mb-4 text-primary d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2" /> Address Information
                      </h5>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <div>
                            <small className="text-muted">Street Address</small>
                            <button
                          style={{
                            backgroundColor: "#6a11cb",
                            color: "white",
                            border: "none",
                            padding: "2px 6px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize:"15px",
                            marginLeft:"5px"
                          }}
                          onClick={()=>{setAddressEdit(addressEdit?false:true)}}
                        >
                          Edit
                        </button>
                        {addressEdit?
                        <div>
                        <input 
                        type="email"
                        className="form-control mt-1"
                        onChange={(event)=>{setAddressChange(event.target.value)}}
                        />
                        <button
                        onClick={handleAddressChange}
                        style={{
                          backgroundColor: "#28a745", // green
                          color: "white",
                          border: "none",
                          padding: "3px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "15px",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                          marginTop:"5px"
                        }}
                      >
                        Done
                      </button>

                        </div>
                        :<p className="mb-0">{customer.address}</p>  
                      }
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <small className="text-muted">City</small>
                            <p className="mb-0">{customer.city}</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <small className="text-muted">State / Country</small>
                            <p className="mb-0">{customer.state}, {customer.country}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="card-footer bg-white text-center py-3" style={{
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px'
              }}>
                <small className="text-muted">© {new Date().getFullYear()} Hexacover</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Profile;