import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

function VehicleSubmission() {
  const [vehicleType, setVehicleType] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [commercialCar, setCommercialCar] = useState(null);
  const [vehicleMake, setVehicleMake] = useState(null);
  const [previousInsuranceProvider, setPreviousInsuranceProvider] = useState(null);
  const [previousInsurancePolicyNo, setPreviousInsurancePolicyNo] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [gstNumber, setGstNumber] = useState(null);
  const [drivingLicenseNo, setDrivingLicenseNo] = useState(null);
  const [bikeModel, setBikeModel] = useState(null);
  const [carVariant, setCarVariant] = useState(null);
  const [kilometersDriven, setKilometersDriven] = useState(null);
  const [endDate,setEndDate]=useState(null);
  const navigate=useNavigate();
  

  const addVehicleDetails=async(event)=>{
    event.preventDefault();
    const username=localStorage.getItem('username');
    const token=localStorage.getItem('token');
    let response=await axios.get('http://localhost:8087/api/auth/user/details',
        {
            headers: {
                "Authorization": `Bearer ${token}`  
            }
        }
    )
    const userId = response.data.id;
    

    let customerReponse=await axios.get(`http://localhost:8087/api/customer/getByUserId/${userId}`);
    const customerId=customerReponse.data.id;
    

    const body = {
        vehicleType: vehicleType,
        registrationNumber: registrationNumber,
        fuelType: fuelType,
        commercialCar: commercialCar,
        vehicleMake: vehicleMake,
        previousInsuranceProvider: previousInsuranceProvider,
        previousInsurancePolicyNo: previousInsurancePolicyNo,
        pincode: pincode,
        gstNumber: gstNumber,
        drivingLicenseNo: drivingLicenseNo,
        bikeModel: bikeModel,
        carVariant: carVariant,
        kilometersDriven: kilometersDriven,
        customer: {
          id: customerId   // set from previously fetched customer object
        }
      };

      let responseVehicleSubmission=await axios.post("http://localhost:8087/api/vehicle/add",body,
        {
            headers: {
                "Authorization": `Bearer ${token}`  
            }
        }
      )

      let body2=responseVehicleSubmission.data;
      console.log(body);
      
      // Pass the vehicle details object to the Quote page
    navigate("/customer/quote", { state: { body,endDate,body2 } });


  }

  

  return (
    <div>
      <Header />
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="mb-4 text-center">Vehicle Details Form</h2>

        {/* ...User Info Section... */}

        <div>
          <h4 className="border-bottom border-primary pb-2 mb-4 fw-bold text-primary">
            Vehicle Details
          </h4>
          <form id="vehicleForm" noValidate onSubmit={(event)=>{addVehicleDetails(event)}}>
          <div className="d-flex w-100">
    <input
        type="radio"
        className="btn-check"
        name="vehicleType"
        id="vehicleCar"
        value="Car"
        onChange={(e) => setVehicleType(e.target.value)}
        checked={vehicleType === "Car"}
    />
    <label
        className={`flex-fill btn ${vehicleType === "Car" ? "btn-primary" : "btn-outline-primary"} mx-2`}
        htmlFor="vehicleCar"
    >
        Car
    </label>

    <input
        type="radio"
        className="btn-check"
        name="vehicleType"
        id="vehicleBike"
        value="Bike"
        onChange={(e) => setVehicleType(e.target.value)}
        checked={vehicleType === "Bike"}
    />
    <label
        className={`flex-fill btn ${vehicleType === "Bike" ? "btn-primary" : "btn-outline-primary"} mx-2`}
        htmlFor="vehicleBike"
    >
        Bike
    </label>
</div>

            <div className="mb-3">
              <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
              <input type="text" className="form-control" id="registrationNumber" required onChange={(e) => setRegistrationNumber(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="fuelType" className="form-label">Fuel Type</label>
              <select className="form-select" id="fuelType" required defaultValue="" onChange={(e) => setFuelType(e.target.value)}>
                <option value="" disabled>Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="commercialCar" className="form-label">Commercial Car</label>
              <select className="form-select" id="commercialCar" required defaultValue="" onChange={(e) => setCommercialCar(e.target.value)}>
                <option value="" disabled>Is this a commercial car?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="vehicleMake" className="form-label">Vehicle Make</label>
              <input type="text" className="form-control" id="vehicleMake" required onChange={(e) => setVehicleMake(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">Select End Date</label>
              <input type="date" className="form-control" id="endDate" required onChange={(e) => setEndDate(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="previousInsuranceProvider" className="form-label">Previous Insurance Provider</label>
              <input type="text" className="form-control" id="previousInsuranceProvider" required onChange={(e) => setPreviousInsuranceProvider(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="previousInsurancePolicyNo" className="form-label">Previous Insurance Policy No</label>
              <input type="text" className="form-control" id="previousInsurancePolicyNo" required onChange={(e) => setPreviousInsurancePolicyNo(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input type="text" className="form-control" id="pincode" pattern="\\d{6}" required onChange={(e) => setPincode(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="gstNumber" className="form-label">GST Number</label>
              <input type="text" className="form-control" id="gstNumber" onChange={(e) => setGstNumber(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="drivingLicenseNo" className="form-label">Driving License No</label>
              <input type="text" className="form-control" id="drivingLicenseNo" required onChange={(e) => setDrivingLicenseNo(e.target.value)} />
            </div>

            {vehicleType === "Bike" && (
                <div className="mb-3">
                    <label htmlFor="bikeModel" className="form-label">Bike Model</label>
                    <select className="form-select" id="bikeModel" defaultValue="" onChange={(e) => setBikeModel(e.target.value)}>
                    <option value="" disabled>-- Select Bike Model --</option>
                    <option value="Hero Splendor">Hero Splendor</option>
                    <option value="Honda Shine">Honda Shine</option>
                    <option value="TVS Apache">TVS Apache</option>
                    <option value="Bajaj Pulsar">Bajaj Pulsar</option>
                    <option value="Royal Enfield Classic 350">Royal Enfield Classic 350</option>
                    <option value="Yamaha FZ">Yamaha FZ</option>
                    <option value="Others">Others</option>
                    </select>
                </div>
                )}

                {vehicleType === "Car" && (
                <div className="mb-3">
                    <label htmlFor="carVariant" className="form-label">Car Model</label>
                    <select className="form-select" id="carVariant" defaultValue="" onChange={(e) => setCarVariant(e.target.value)}>
                    <option value="" disabled>-- Select Car Model --</option>
                    <option value="Maruti Suzuki Swift">Maruti Suzuki Swift</option>
                    <option value="Hyundai i20">Hyundai i20</option>
                    <option value="Tata Nexon">Tata Nexon</option>
                    <option value="Kia Seltos">Kia Seltos</option>
                    <option value="Honda City">Honda City</option>
                    <option value="Mahindra Scorpio">Mahindra Scorpio</option>
                    <option value="Others">Others</option>
                    </select>
                </div>
                )}

            <div className="mb-3">
              <label htmlFor="kilometersDriven" className="form-label">Kilometers Driven</label>
              <input type="number" className="form-control" id="kilometersDriven" min="0" required onChange={(e) => setKilometersDriven(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default VehicleSubmission;
