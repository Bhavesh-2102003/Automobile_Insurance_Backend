import React from 'react';
import { Link } from 'react-router-dom';

const PremiumInsuranceServices = () => {
  const services = [
    {
      title: "Car Insurance",
      icon: "/assets/icon-08-light.png",
      description: "Protect Your Ride, Secure Your Future – Affordable Coverage, Hassle-Free Claims, and 24/7 Support!",
      highlights: [
        "Instant policy issuance",
        "24/7 claim support",
        "Flexible payment options",
        "New car replacement"
      ],
      cta: "Insure",
      gradient: "from-blue-500 to-indigo-600",
      delay: "0.1s"
    },
    {
      title: "Bike Insurance",
      icon: "/assets/icon-01-light.png",
      description: "Ride Fearless, Insure Smart – Affordable Bike Insurance with Instant Claims & 24/7 Roadside Assistance!",
      highlights: [
        "Accident cover up to ₹15L",
        "Theft protection",
        "Personal accident cover",
        "Third-party liability"
      ],
      cta: "Insure",
      gradient: "from-emerald-500 to-teal-600",
      delay: "0.3s"
    },
    {
      title: "Road Side Assistance",
      icon: "/assets/icon-05-light.png",
      description: "24/7 Roadside Assistance – Fast, Reliable, and Always There When You Need Us!",
      highlights: [
        "Nationwide network",
        "Towing services",
        "Fuel delivery",
        "Lockout service"
      ],
      cta: "Read More",
      gradient: "from-amber-500 to-orange-600",
      delay: "0.5s"
    },
    {
      title: "Check your Challans",
      icon: "/assets/icon-08-light.png",
      description: "Check your pending vehicle challans for free through HexaCover",
      highlights: [
        "Real-time updates",
        "Multiple vehicle support",
        "Payment gateway",
        "SMS alerts"
      ],
      cta: "Check Now",
      gradient: "from-violet-500 to-purple-600",
      delay: "0.1s"
    },
    {
      title: "Check Coverage",
      icon: "/assets/icon-07-light.png",
      description: "Know which policy covers what damages before Insuring your Vehicle",
      highlights: [
        "Comprehensive vs third-party",
        "Add-on benefits",
        "Claim scenarios",
        "Exclusions explained"
      ],
      cta: "Know about Coverage",
      gradient: "from-rose-500 to-pink-600",
      delay: "0.3s"
    },
    {
      title: "Refer a Friend",
      icon: "/assets/icon-06-light.png",
      description: "Refer a Friend and earn Bonus for each referral",
      highlights: [
        "₹500 bonus per referral",
        "Unlimited earnings",
        "Easy tracking",
        "Instant payouts"
      ],
      cta: "Refer Now",
      gradient: "from-cyan-500 to-sky-600",
      delay: "0.5s"
    }
  ];

  return (
    <div id="services-section" className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute top-20 -right-20 w-64 h-64 rounded-full bg-blue-400 opacity-10"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-400 opacity-10"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full mb-4">
            Insurance Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Provide <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Professional</span> Insurance Services
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive coverage options designed for modern vehicle owners with premium benefits and exceptional service
          </p>
        </div>

        {/* Services Grid */}
        <div className="container-xxl py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        

      <div className="row g-4">
          {/* Car Insurance */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary p-3 rounded me-3">
                    <i className="fas fa-car text-white fs-4"></i>
                  </div>
                  <h3 className="mb-0">Car Insurance</h3>
                </div>
                <p className="text-muted mb-4">
                  Protect Your Ride, Secure Your Future with our comprehensive coverage:
                </p>
                <ul className="mb-4">
                  <li>Affordable premium options</li>
                  <li>Hassle-free claim process</li>
                  <li>24/7 customer support</li>
                </ul>
                <Link to="/customer/submit-details" className="btn btn-outline-primary w-100 py-2">
                  Get Car Insurance <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Bike Insurance */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary p-3 rounded me-3">
                    <i className="fas fa-motorcycle text-white fs-4"></i>
                  </div>
                  <h3 className="mb-0">Bike Insurance</h3>
                </div>
                <p className="text-muted mb-4">
                  Ride with confidence knowing you're protected:
                </p>
                <ul className="mb-4">
                  <li>Instant claims processing</li>
                  <li>24/7 roadside assistance</li>
                  <li>Flexible payment options</li>
                  <li>Third-party or comprehensive</li>
                </ul>
                <Link to="/customer/submit-details" className="btn btn-outline-primary w-100 py-2">
                  Get Bike Insurance <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Roadside Assistance */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary p-3 rounded me-3">
                    <i className="fas fa-road text-white fs-4"></i>
                  </div>
                  <h3 className="mb-0">Roadside Assistance</h3>
                </div>
                <p className="text-muted mb-4">
                  Never stranded with our reliable services:
                </p>
                <ul className="mb-4">
                  <li>24/7 emergency support</li>
                  <li>Nationwide network</li>
                  <li>Towing services</li>
                  <li>Flat tire assistance</li>
                </ul>
                <Link to="" className="btn btn-outline-primary w-100 py-2">
                  Learn More <i className="fas fa-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Challan Check */}
          <div className="col-md-6 col-lg-4 mt-4">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary p-3 rounded me-3">
                    <i className="fas fa-file-invoice text-white fs-4"></i>
                  </div>
                  <h3 className="mb-0">Challan Check</h3>
                </div>
                <p className="text-muted mb-4">
                  Quickly check your pending vehicle challans:
                </p>
                <ul className="mb-4">
                  <li>Free verification service</li>
                  <li>Instant results</li>
                  <li>Multiple vehicle support</li>
                  <li>Payment options</li>
                </ul>
                <Link to="" className="btn btn-outline-primary w-100 py-2">
                  Check Now <i className="fas fa-search ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Coverage Guide */}
          <div className="col-md-6 col-lg-4 mt-4">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary p-3 rounded me-3">
                    <i className="fas fa-shield-alt text-white fs-4"></i>
                  </div>
                  <h3 className="mb-0">Coverage Guide</h3>
                </div>
                <p className="text-muted mb-4">
                  Understand what your policy covers:
                </p>
                <ul className="mb-4">
                  <li>Comprehensive vs third-party</li>
                  <li>Add-on benefits</li>
                  <li>Claim scenarios</li>
                  <li>Exclusions explained</li>
                </ul>
                <Link to="" className="btn btn-outline-primary w-100 py-2">
                  Explore Coverage <i className="fas fa-book-open ms-2"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Referral Program */}
          <div className="col-md-6 col-lg-4 mt-4">
            <div className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary p-3 rounded me-3">
                    <i className="fas fa-user-friends text-white fs-4"></i>
                  </div>
                  <h3 className="mb-0">Referral Program</h3>
                </div>
                <p className="text-muted mb-4">
                  Earn rewards by sharing with friends:
                </p>
                <ul className="mb-4">
                  <li>₹500 bonus per referral</li>
                  <li>Easy sharing options</li>
                  <li>Track your rewards</li>
                  <li>No limit on referrals</li>
                </ul>
                <Link to="" className="btn btn-outline-primary w-100 py-2">
                  Refer Now <i className="fas fa-gift ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200 border-opacity-30">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Claim Approval</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1M+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumInsuranceServices;