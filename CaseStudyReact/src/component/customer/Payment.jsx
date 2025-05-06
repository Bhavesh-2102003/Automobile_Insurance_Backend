import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card, Form, Table } from "react-bootstrap";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const { pricing, body ,type,endDate,body2} = location.state || {}; // Extract pricing and body from state

  const [customerName,setCustomerName]=useState(null);
  const [customerEmail,setCustomerEmail]=useState(null);
  const [customerContact,setCustomerContact]=useState(null);
  const [customerAddress,setCustomerAddress]=useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [carVariant, setCarVariant] = useState(null);
  const [kilometersDriven, setKilometersDriven] = useState(null);
  const navigate=useNavigate();

  useEffect(()=>{

    const approvePolicy = async() => {
        const token=localStorage.getItem('token');
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
        
        setCustomerName(customerReponse.data.firstName+" "+customerReponse.data.lastName);
        setCustomerEmail(customerReponse.data.emailAddress);
        setCustomerContact(customerReponse.data.contact);
        setCustomerAddress(customerReponse.data.address);
        setVehicleType(body.vehicleType);
        setRegistrationNumber(body.registrationNumber);
        setFuelType(body.fuelType);
        setCarVariant(body.carVariant);
        setKilometersDriven(body.kilometersDriven);

    
        let policy={
            "endDate":endDate,
            "coverageAmount":pricing,
            "coverageType":type,
            "customer":{
                "id":customerId
            },
            "vehicleDetails":{
                "id":body2.id
            }
        }
       
    
        let responsePolicy=await axios.post("http://localhost:8087/api/policy/save",policy,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`  
                }
            }
        )

        
    
      };

      approvePolicy();
    

  },[customerName,customerEmail,customerContact,customerAddress])




  

  return (
    <div
      className="payment-page d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "linear-gradient(135deg, #28313B, #485461)" }}
    >
      <Container
        className="bg-light rounded-4 shadow-lg p-5"
        style={{ maxWidth: "900px" }}
      >
        <h1 className="text-center text-primary fw-bold mb-4">Payment Page</h1>
        <p className="text-center text-secondary fs-5 mb-5">
          Verify your details and complete your payment to get insured.
        </p>

        {/* Vehicle Details */}
        <Row className="mb-4">
          <Col>
            <h4 className="fw-semibold mb-3 text-dark">Vehicle Details</h4>
            <Table bordered responsive hover>
              <tbody>
                <tr>
                  <td className="fw-semibold">Vehicle Type</td>
                  <td>{vehicleType}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Registration Number</td>
                  <td>{registrationNumber}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Fuel Type</td>
                  <td>{fuelType}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Car Variant</td>
                  <td>{carVariant}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Kilometers Driven</td>
                  <td>{kilometersDriven} km</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Customer Details */}
        <Row className="mb-5">
          <Col>
            <h4 className="fw-semibold mb-3 text-dark">Customer Details</h4>
            <Table bordered responsive hover>
              <tbody>
                <tr>
                  <td className="fw-semibold">Name</td>
                  <td>{customerName}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Email</td>
                  <td>{customerEmail}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Phone</td>
                  <td>{customerContact}</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Address</td>
                  <td>{customerAddress}</td>
                </tr>
                
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Payment Form */}
        <Row>
          <Col>
            <h4 className="fw-semibold mb-3 text-dark">Payment Details</h4>
            <Card
              className="p-4 shadow-sm rounded-4 border-0 bg-white"
              style={{ borderRadius: "15px" }}
            >
              <h5
                className="mb-4 text-center fw-bold text-primary"
                style={{ fontSize: "1.25rem" }}
              >
                Total Amount: ₹{pricing || "N/A"}
              </h5>
              <Form>
                <Form.Group className="mb-3" controlId="cardholderName">
                  <Form.Label className="fw-semibold">Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label className="fw-semibold">Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="expiryDate">
                      <Form.Label className="fw-semibold">Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="cvv">
                      <Form.Label className="fw-semibold">CVV</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="***"
                        maxLength={3}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 rounded-pill fw-bold"
                  onClick={()=>{alert("Payment Successful!")
                    navigate("/customer");
                  }} // Replace with actual payment logic
                  style={{
                    backgroundColor: "#007bff",
                    borderColor: "#007bff",
                    transition: "background-color 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  Pay ₹{pricing || "N/A"}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Payment;
