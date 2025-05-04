import React from "react";
import { Link } from "react-router-dom";
//import logo from './assets/icon-02-primary.png'



function CustomerNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <h5 className="m-0">
          <img
            className="img-fluid me-3"
            src="{logo}"
          />
          HexaCover
        </h5>
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mx-auto bg-light rounded pe-4 py-3 py-lg-0">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          {/* Uncomment the below line if you want to add an About Us page */}
          {/* <Link to="/about" className="nav-item nav-link">About Us</Link> */}
          <Link to="/services" className="nav-item nav-link">
            Our Services
          </Link>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Claims
            </a>
            <div className="dropdown-menu bg-light border-0 m-0">
              <Link to="/claimSubmission" className="dropdown-item">
                File a New Claim
              </Link>
              <Link to="/otpVerification" className="dropdown-item">
                Track an Existing Claim
              </Link>
            </div>
          </div>
          <Link to="/contact" className="nav-item nav-link">
            Contact Us
          </Link>
        </div>
      </div>
      <Link to="/login" className="btn btn-primary px-3 d-none d-lg-block me-3">
        Login
      </Link>
      <Link to="/signup" className="btn btn-primary px-3 d-none d-lg-block">
        SignUp
      </Link>
    </nav>
  );
}

export default CustomerNavbar;