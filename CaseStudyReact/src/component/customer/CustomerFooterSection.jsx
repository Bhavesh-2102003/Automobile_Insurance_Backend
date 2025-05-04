import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <p className="text-light">
              With a strong commitment to transparency, affordability, and efficiency, we continue to set new standards in the insurance sector. Experience the Hexacover difference today!
            </p>
            <div className="d-flex pt-2">
              <a className="btn btn-square me-1" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-square me-1" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-square me-1" href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a className="btn btn-square me-0" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Address</h5>
            <p className="text-light">
              <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA
            </p>
            <p className="text-light">
              <i className="fa fa-phone-alt me-3"></i>+012 345 67890
            </p>
            <p className="text-light">
              <i className="fa fa-envelope me-3"></i>info@example.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Quick Links</h5>
            <Link className="btn btn-link text-light p-0 mb-2 d-block" to="/about">About Us</Link>
            <Link className="btn btn-link text-light p-0 mb-2 d-block" to="/contact">Contact Us</Link>
            <Link className="btn btn-link text-light p-0 mb-2 d-block" to="/services">Our Services</Link>
            <Link className="btn btn-link text-light p-0 mb-2 d-block" to="/terms">Terms & Condition</Link>
            <Link className="btn btn-link text-light p-0 mb-2 d-block" to="/support">Support</Link>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light mb-4">Newsletter</h5>
            <p className="text-light">Subscribe to our Newsletter today</p>
            <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
              <input 
                className="form-control bg-transparent text-light w-100 py-3 ps-4 pe-5" 
                type="text" 
                placeholder="Your email" 
              />
              <button 
                type="button" 
                className="btn btn-secondary py-2 position-absolute top-0 end-0 mt-2 me-2"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container-fluid copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 text-light">
              &copy; <Link to="/" className="text-light">HexaCover</Link>, All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end text-light">
              {/* Credit removal notice can go here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;