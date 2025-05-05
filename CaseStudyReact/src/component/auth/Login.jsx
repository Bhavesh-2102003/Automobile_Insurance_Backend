import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/userSlice";
import { useDispatch } from "react-redux";


function Login()
{
    
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const navigate=useNavigate();
    const [userId,setUserId]=useState(null);
  
    const focusShadow = '0 0 0 0.25rem rgba(29, 76, 209, 0.25)';

    useEffect(() => {
      if (userId) {
          console.log("User ID updated:", userId);
      }
  }, [userId]);

  const dispatch = useDispatch();

const customerLogin = async (event) => {
  event.preventDefault();

  let body = {
    username,
    password
  };

  try {
    let response = await axios.post("http://localhost:8087/api/auth/token/generate", body);
    let token = response.data.token;

    // Save in Redux store
    dispatch(setCredentials({ username, token }));

    // Optionally save in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    let resp = await axios.get('http://localhost:8087/api/auth/user/details', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const role = resp.data.role;
    const userIdFromBackend = resp.data.id;
    setUserId(userIdFromBackend); 
    
    let customerResponse = await axios.get(`http://localhost:8087/api/customer/getByUserId/${userIdFromBackend}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const customerId = customerResponse.data.id;
    localStorage.setItem("customerId", customerId);

    switch (role) {
      case 'USER_DEFAULT':
        navigate("/customer");
        break;
      case 'VENDOR':
        navigate("/vendor");
        break;
      case 'ADMIN':
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

  
    return (
        
        <div
          className="d-flex align-items-center justify-content-center min-vh-100 p-4"
          style={{
            background: 'linear-gradient(to bottom right, #ede9fe, #f3f4f6)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
            
          <div
            className="bg-white p-5 rounded-4 shadow-lg border "
            style={{ maxWidth: '550px', width: '100%', borderColor: '#f3f4f6', transition: 'box-shadow 0.3s ease' }}
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
                  className="fas fa-shield-alt"
                  style={{ fontSize: '28px', color: 'rgb(29, 76, 209)' }}
                  aria-hidden="true"
                ></i>
              </div>
              <h1 className="h3 fw-bold text-center text-dark mb-1">Welcome Back</h1>
              <p className="text-muted text-center fs-6">
                Login to your HexaCover account
              </p>
            </div>
    
            <form onSubmit={()=>{customerLogin(event)}}>
              <div className="mb-4">
                <label htmlFor="text" className="form-label text-secondary fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter Username"
                  aria-label="Username"
                  style={{
                    borderColor: '#d1d5db',
                    
                    transition: 'box-shadow 0.3s ease',
                  }}
                
                  onChange={(event)=>{setUsername(event.target.value)}}
                />
              </div>
    
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-secondary fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  style={{
                    borderColor: '#d1d5db',
                    
                    transition: 'box-shadow 0.3s ease',
                  }}
                  
                  onChange={(event)=>{setPassword(event.target.value)}}
                />
              </div>
    
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
                style={{
                 
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer',
                }}
                
                aria-label="Login"
              >
                Login
              </button>
            </form>
    
            <div className="d-flex justify-content-between small mt-4">
              <a
                href="resetPassword.html"
                className="text-primary fw-semibold text-decoration-none"
              >
                Forgot password?
              </a>
              
                Don't have an account? 
                <Link to="/customer/signup"> Sign Up as Customer </Link>
                
              
            </div>
          </div>
        </div>
      );
}
export default Login;