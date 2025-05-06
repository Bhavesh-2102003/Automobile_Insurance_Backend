import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import Header from "./Header";

function PolicyPDF() {
  const location = useLocation();
  const policy = location.state?.policy;

  if (!policy || !policy.vehicleDetails  || !policy.customer) {
    return <p>Loading policy details...</p>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Insurance Policy Details", 20, 20);

    const details = [
      `Policy ID: ${policy.id}`,
      "---------------------------------------------------------------------------------------------------------",
      "Customer Details",
      "---------------------------------------------------------------------------------------------------------",
      `Customer name : ${policy.customer.firstName+" "+policy.customer.lastName}`,
      `Contact : ${policy.customer.contact}`,
      `Email Address : ${policy.customer.emailAddress}`,
      `Address : ${policy.customer.address}`,
      `Driving License Number : ${policy.vehicleDetails.drivingLicenseNo}`,
      "---------------------------------------------------------------------------------------------------------",
      "Vehicle Details",
      "---------------------------------------------------------------------------------------------------------",
    `Vehicle Type: ${policy.vehicleDetails.vehicleType}`,
      `Model: ${policy.vehicleDetails.carVariant || policy.vehicleDetails.bikeModel}`,
      `Registration Number: ${policy.vehicleDetails.registrationNumber}`,
        `Fuel Type: ${policy.vehicleDetails.fuelType}`,
        `Vehicle Make : ${policy.vehicleDetails.vehicleMake}`,
        "---------------------------------------------------------------------------------------------------------",
        "Policy Details",
        "---------------------------------------------------------------------------------------------------------",
      `Coverage Type: ${policy.coverageType}`,
      `Coverage Amount: Rs.${policy.coverageAmount}`,
      `Total Coverage: Rs.${policy.coverageAmount * 10}`,
      `Status: ${policy.status}`,
      `Start Date: ${policy.startDate}`,
      `End Date: ${policy.endDate}`,
    ];

    let y = 30;
    details.forEach((line) => {
      doc.setFontSize(12);
      doc.text(line, 20, y);
      y += 10;
    });
    doc.setFontSize(9)
    doc.text("Thank you for choosing HexaCover",65,290);
    doc.save(`Policy_${policy.id}.pdf`);
  };

  return (
    <div>
    <Header />
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Policy Details</h1>
      <p><strong>Policy ID:</strong> {policy.id}</p>
      <p><strong>Customer Name:</strong> {policy.customer.firstName+" "+policy.customer.lastName}</p>
      <p><strong>Coverage Type:</strong> {policy.coverageType}</p>
      <p><strong>Vehicle Type:</strong> {policy.vehicleDetails.vehicleType}</p>
      <p><strong>Registration Number:</strong> {policy.vehicleDetails.registrationNumber}</p>
      <p><strong>Model:</strong> {policy.vehicleDetails.carVariant || policy.vehicleDetails.bikeModel}</p>
      <p><strong>Coverage Amount:</strong> ₹{policy.coverageAmount}</p>
      <p><strong>Total Coverage:</strong> ₹{policy.coverageAmount * 10}</p>
      <p><strong>Status:</strong> {policy.status}</p>
      <p><strong>Start Date:</strong> {policy.startDate}</p>
      <p><strong>End Date:</strong> {policy.endDate}</p>

      <button
        onClick={generatePDF}
        className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded"
      >
        Download as PDF
      </button>
    </div>
    </div>
  );
}

export default PolicyPDF;
