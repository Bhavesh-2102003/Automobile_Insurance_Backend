import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp()
{
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [gender, setGender] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [country, setCountry] = useState(null);
    const [contact, setContact] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    

    const customerSignup = async(event)=>{
        event.preventDefault();

        let body={
            "firstName": firstName,
            "lastName": lastName,
            "emailAddress": email,
            "dateOfBirth": dateOfBirth,
            "gender":gender,
            "address": address,
            "city": city,
            "state": state,
            "country": country,
            "contact": contact,
            user: {
                "username": username,
                "password": password
            }
        }

        console.log(body);
            let response=await axios.post("http://localhost:8087/api/customer/add",body);
            console.log(response.data);
            alert("Account created successfully! Please login to continue.");
            navigate("/");

    }



    return (
        <div
          className="d-flex align-items-center justify-content-center min-vh-100 p-4"
          style={{
            background: 'linear-gradient(to bottom right, #ede9fe, #f3f4f6)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <div
            className="bg-white p-5 rounded-4 shadow-lg border"
            style={{ maxWidth: '800px', width: '100%', borderColor: '#f3f4f6', transition: 'box-shadow 0.3s ease' }}
          >
            <div className="text-center mb-5">
              <div
                className="mx-auto d-flex align-items-center justify-content-center mb-4 rounded-circle"
                style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'rgba(29, 76, 209, 0.1)',
                  boxShadow: '0 0 10px rgba(29, 76, 209, 0.15)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <i
                  className="fas fa-user-plus"
                  style={{ fontSize: '28px', color: 'rgb(29, 76, 209)' }}
                  aria-hidden="true"
                ></i>
              </div>
              <h1 className="h3 fw-bold text-center text-dark mb-1">Create Account</h1>
              <p className="text-muted text-center fs-6">
                Sign up to get started with HexaCover
              </p>
            </div>
    
            <form onSubmit={(event)=>{customerSignup(event)}}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label text-secondary fw-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="Enter first name"
                    aria-label="First Name"
                    onChange={(event)=>{setFirstName(event.target.value)}}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label text-secondary fw-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Enter last name"
                    aria-label="Last Name"
                    onChange={(event)=>{setLastName(event.target.value)}}
                  />
                </div>
              </div>
    
              <div className="mb-3">
                <label htmlFor="emailAddress" className="form-label text-secondary fw-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  className="form-control"
                  placeholder="Enter email address"
                  aria-label="Email Address"
                    onChange={(event)=>{setEmail(event.target.value)}}
                />
              </div>
    
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="dateOfBirth" className="form-label text-secondary fw-semibold">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="form-control"
                    aria-label="Date of Birth"
                    onChange={(event)=>{setDateOfBirth(event.target.value)}}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label text-secondary fw-semibold">
                    Gender
                  </label>
                  <select id="gender" className="form-select" aria-label="Gender" onChange={(event)=>{setGender(event.target.value)}}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
    
              <div className="mb-3">
                <label htmlFor="address" className="form-label text-secondary fw-semibold">
                  Address
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  placeholder="Enter address"
                  rows="2"
                  aria-label="Address"
                    onChange={(event)=>{setAddress(event.target.value)}}
                ></textarea>
              </div>
    
              <div className="row g-3 mb-3">
                <div className="col-md-4">
                  <label htmlFor="city" className="form-label text-secondary fw-semibold">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="form-control"
                    placeholder="Enter city"
                    aria-label="City"
                    onChange={(event)=>{setCity(event.target.value)}}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label text-secondary fw-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="form-control"
                    placeholder="Enter state"
                    aria-label="State"
                    onChange={(event)=>{setState(event.target.value)}}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="country" className="form-label text-secondary fw-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="form-control"
                    placeholder="Enter country"
                    aria-label="Country"
                    onChange={(event)=>{setCountry(event.target.value)}}
                  />
                </div>
              </div>
    
              <div className="mb-3">
                <label htmlFor="contact" className="form-label text-secondary fw-semibold">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  className="form-control"
                  placeholder="Enter contact number"
                  aria-label="Contact"
                    onChange={(event)=>{setContact(event.target.value)}}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label text-secondary fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter username"
                  aria-label="Username"
                    onChange={(event)=>{setUsername(event.target.value)}}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label text-secondary fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                  aria-label="Password"
                    onChange={(event)=>{setPassword(event.target.value)}}
                />
              </div>

              
    
              
    
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
                style={{
                  backgroundColor: 'rgb(29, 76, 209)',
                  borderColor: 'rgb(29, 76, 209)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                }}
                aria-label="Sign Up"
              >
                Sign Up
              </button>
            </form>
    
            <div className="d-flex justify-content-center small mt-4">
              <Link
              to="/">
                Already have an account? <span className="fw-semibold text-primary">Login</span>
              </Link>
            </div>
          </div>
        </div>
      );
}

export default SignUp;