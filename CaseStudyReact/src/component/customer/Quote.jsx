import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";



function Quote() {

    const [ownDamage,setOwnDamage]=useState(null)
    const [thirdParty,setThirdParty]=useState(null)
    const [comprehensive,setComprehensive]=useState(null)
    const navigate=useNavigate();
    

    const location = useLocation();
    const { body,endDate,body2 } = location.state || {};
    useEffect(() => {
      
      const token=localStorage.getItem('token');
    


      const fetchPrice=async ()=>{


        let token=localStorage.getItem('token');
        const ownDamageResponse = await axios.post("http://localhost:8087/api/policypricing/owndamage",body,
            {
                headers: {
                    "Authorization": `Bearer ${token}`  
                }
            }
        );

        const thirdPartyResponse = await axios.post(
            "http://localhost:8087/api/policypricing/thirdparty",
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
          );

        const comprehensiveResponse = await axios.post("http://localhost:8087/api/policypricing/comprehensive",
            body,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        setOwnDamage(ownDamageResponse.data);
        setThirdParty(thirdPartyResponse.data);
        setComprehensive(comprehensiveResponse.data);

       


      }
      fetchPrice();
    }, [thirdParty, comprehensive,ownDamage]);

    const proceedToPayment=(pricing,type)=>{
        navigate("/customer/payment", { state: { pricing,body,type,endDate,body2 } });
    }




  return (
    <div
      id="pricingTable"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1d3557, #457b9d)",
        color: "#f1faee",
        padding: "20px",
      }}
    >
      <Container>
        <div
          className="text-center mb-5"
          style={{
            height: "100px", // Increased height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontWeight: "bold", fontSize: "3rem" }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ fontSize: "1.3rem" }}>No contracts. No surprise fees.</p>
        </div>

        <Row className="justify-content-center">
          {/* Third-Party Plan */}
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-lg"
              style={{
                border: "none",
                borderRadius: "20px",
                background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
                color: "#495057",
              }}
            >
              <Card.Header
                className="text-center"
                style={{ background: "transparent", border: "none" }}
              >
                <h2 className="h5" style={{ fontWeight: "bold" }}>
                  Basic - Third Party
                </h2>
                <p className="text-muted small">
                  Third-Party Only (Mandatory as per law, covers damages to
                  others)
                </p>
              </Card.Header>
              <Card.Body className="text-center">
                <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  ₹{thirdParty}{" "}
                  <small className="text-muted" style={{ fontSize: "1rem" }}>
                    / year
                  </small>
                </h3>
                <ListGroup variant="flush" className="my-4">
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Covers injuries, death, or property damage caused to third
                    parties
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Best for old cars or budget-conscious buyers
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="text-muted text-decoration-line-through"
                    style={{ border: "none", background: "transparent" }}
                  >
                    No coverage for own vehicle damages
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="outline-primary"

                  style={{
                    borderRadius: "50px",
                    padding: "10px 30px",
                    fontWeight: "bold",
                  }}
                  onClick={()=>{
                    proceedToPayment(thirdParty,"thirdParty")
                  }}
                >
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Standard Plan */}
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-lg"
              style={{
                border: "none",
                borderRadius: "20px",
                background: "linear-gradient(145deg, #c3e6cb, #d4edda)",
                color: "#495057",
              }}
            >
              <Card.Header
                className="text-center"
                style={{ background: "transparent", border: "none" }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="h5" style={{ fontWeight: "bold" }}>
                    Standard Plan
                  </h2>
                  <span
                    className="badge bg-success"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Best Value
                  </span>
                </div>
                <p className="text-muted small">
                  (Own Damage + Third-Party)
                </p>
              </Card.Header>
              <Card.Body className="text-center">
                <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  ₹{ownDamage}{" "}
                  <small className="text-muted" style={{ fontSize: "1rem" }}>
                    / year
                  </small>
                </h3>
                <ListGroup variant="flush" className="my-4">
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Covers both third-party liabilities and own damage
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Includes fire, theft, accidents, and natural calamities
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Personal accident cover up to ₹15 lakh
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="text-muted text-decoration-line-through"
                    style={{ border: "none", background: "transparent" }}
                  >
                    No Road Side Assistance
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="success"
                  
                  style={{
                    borderRadius: "50px",
                    padding: "10px 30px",
                    fontWeight: "bold",
                  }}
                  onClick={()=>{
                    proceedToPayment(ownDamage,"ownDamage")
                  }}
                >
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Comprehensive Plan */}
          <Col md={4} className="mb-4">
            <Card
              className="h-100 shadow-lg"
              style={{
                border: "none",
                borderRadius: "20px",
                background: "linear-gradient(145deg, #d6d8db, #e2e3e5)",
                color: "#495057",
              }}
            >
              <Card.Header
                className="text-center"
                style={{ background: "transparent", border: "none" }}
              >
                <h2 className="h5" style={{ fontWeight: "bold" }}>
                  Comprehensive Plan
                </h2>
                <p className="text-muted small">Premium</p>
              </Card.Header>
              <Card.Body className="text-center">
                <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  ₹{comprehensive}{" "}
                  <small className="text-muted" style={{ fontSize: "1rem" }}>
                    / year
                  </small>
                </h3>
                <ListGroup variant="flush" className="my-4">
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Everything in the standard plan + extra benefits
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Full claim settlement without depreciation cuts
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Roadside Assistance – Towing, repairs, fuel
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ border: "none", background: "transparent" }}
                  >
                    Engine & Gearbox Protection – water/oil damage
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="dark"
                  style={{
                    borderRadius: "50px",
                    padding: "10px 30px",
                    fontWeight: "bold",
                  }}
                  onClick={()=>{
                    proceedToPayment(comprehensive,"comprehensive")
                  }}
                >
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Quote;