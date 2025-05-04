import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const CustomerFactsSection = () => {
  const [counters, setCounters] = useState({
    happyClients: 0,
    projectsSucceed: 0,
    awardsAchieved: 0,
    teamMembers: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2500;
    const steps = 100;
    const increment = 1234 / steps;
    const interval = duration / steps;

    const intervalId = setInterval(() => {
      setCounters(prev => ({
        happyClients: Math.min(1234, prev.happyClients + increment),
        projectsSucceed: Math.min(1234, prev.projectsSucceed + increment),
        awardsAchieved: Math.min(1234, prev.awardsAchieved + increment),
        teamMembers: Math.min(1234, prev.teamMembers + increment)
      }));
    }, interval);

    setTimeout(() => clearInterval(intervalId), duration);
  };

  return (
    <div className="container-fluid overflow-hidden my-5 px-lg-0">
      <div className="container facts px-lg-0">
        <div className="row g-0 mx-lg-0">
          {/* Text Content Section */}
          <div className="col-lg-6 facts-text wow fadeIn" data-wow-delay="0.1s">
            <div className="h-100 px-4 ps-lg-0">
              <h1 className="text-black  mb-4">For Individuals And Organisations</h1>
              <p className="text-blue mb-5">
                Hexacover offers tailored insurance solutions for both individuals and organizations, 
                ensuring seamless protection and hassle-free claims. Stay covered with flexible plans 
                designed for your needs.
              </p>
              <Link to="/services" className="align-self-start btn btn-secondary py-3 px-5">
                More Details
              </Link>
            </div>
          </div>

          {/* Counter Section */}
          <div 
            className="col-lg-6 facts-counter wow fadeIn" 
            data-wow-delay="0.5s"
            ref={counterRef}
          >
            <div className="h-100 px-4 pe-lg-0">
              <div className="row g-5">
                <div className="col-sm-6">
                  <h1 className="display-5">
                    {Math.round(counters.happyClients).toLocaleString()}
                  </h1>
                  <p className="fs-5 text-primary">Happy Clients</p>
                </div>
                <div className="col-sm-6">
                  <h1 className="display-5">
                    {Math.round(counters.projectsSucceed).toLocaleString()}
                  </h1>
                  <p className="fs-5 text-primary">Projects Succeed</p>
                </div>
                <div className="col-sm-6">
                  <h1 className="display-5">
                    {Math.round(counters.awardsAchieved).toLocaleString()}
                  </h1>
                  <p className="fs-5 text-primary">Awards Achieved</p>
                </div>
                <div className="col-sm-6">
                  <h1 className="display-5">
                    {Math.round(counters.teamMembers).toLocaleString()}
                  </h1>
                  <p className="fs-5 text-primary">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFactsSection;    