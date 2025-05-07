import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const ClaimSubmissionForm = () => {
  const [claimType,setClaimType]=useState(null);
  const [accidentLocation,setLocation]=useState(null);
  const [accidentDate, setAccidentDate] = useState(null);
  const [damageDescription, setDamageDescription] = useState('');
  const [firFiled, setFirFiled] = useState(false);
  const [image, setImage] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const location=useLocation();
  const {policy}=location.state||{};
  console.log(policy);  
  const [damageImage,setDamageImage]=useState(null);
  const formData=new FormData();
  const [claimId,setClaimId]=useState(null);
  const navigate =useNavigate();

  const claimTypes = [
    'Collision',
    'Theft',
    'Vandalism',
    'Fire',
    'Natural Disaster',
    'Other'
  ];

  const handleFileChange=(e)=>{
    setDamageImage(e.target.files[0]);
  }

  const handleUpload=()=>{
    if(!damageImage)
      {
        alert('No Image Selected');
        return;
      }
      
    formData.append('file',damageImage);
    let token=localStorage.getItem('token');

    let response=axios.post(`http://localhost:8087/api/claim/upload/${claimId}`,formData,{
      headers: {
        "Authorization": `Bearer ${token}` 
    }
    })

    navigate("/customer/track-claim");

  }

  const submitClaim=async(event)=>{
    event.preventDefault();
    

    let body={
      "claimType":claimType,
      "location":accidentLocation,
      "damageDescription":damageDescription,
      "accidentDate":accidentDate,
      "status":"PENDING",
      "firFiled":firFiled,
      "customer":{
        "id":policy.customer.id
      },
      "vehicleDetails":{
        "id":policy.vehicleDetails.id
      }
    }

    let response=await axios.post("http://localhost:8087/api/claim/submit",body,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    
    setClaimId(response.data.id);

  }

  

  

  return (
    
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Header />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Insurance Claim Submission</h1>
                <p className="opacity-90 mt-1">Complete all required fields to process your claim</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={(event)=>{submitClaim(event)}} className="p-8 space-y-8">
            {/* Customer Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Customer Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.customer.firstName+" "+(policy.customer.LastName||" ")}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.customer.contact}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.customer.emailAddress}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Number
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.id}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Vehicle Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.vehicleDetails.vehicleType}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.vehicleDetails.carVariant||policy.vehicleDetails.bikeModel}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.vehicleDetails.vehicleMake}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Plate
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.vehicleDetails.registrationNumber}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.vehicleDetails.fuelType}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kilometers Driven
                  </label>
                  <div className="w-full p-3 bg-gray-100 rounded-lg">
                    {policy.vehicleDetails.kilometersDriven}
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Details Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Claim Details</h2>
              
              {/* Claim Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Claim Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="claimType"
                    
                    onChange={(e)=>{setClaimType(e.target.value)}}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.claimType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select claim type</option>
                    {claimTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.claimType && (
                    <p className="mt-2 text-sm text-red-600">{errors.claimType}</p>
                  )}
                </div>

                {/* Accident Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accident Date <span className="text-red-500">*</span>
                  </label>
                  <DatePicker                    
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.accidentDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxDate={new Date()}
                    onChange={(date) => setAccidentDate(date)}
                    placeholderText="Select date and time"
                  />
                  {errors.accidentDate && (
                    <p className="mt-2 text-sm text-red-600">{errors.accidentDate}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accident Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  onChange={(event)=>{setLocation(event.target.value)}}
                  placeholder="Street address, city, state"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Damage Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Damage Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="damageDescription"
                  onChange={(event)=>{setDamageDescription(event.target.value)}}
                  rows={4}
                  placeholder="Please describe the incident and damage in detail..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.damageDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.damageDescription && (
                  <p className="mt-2 text-sm text-red-600">{errors.damageDescription}</p>
                )}
              </div>
            </div>

            {/* Police Report Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Police Documentation</h2>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="policeReport"
                  name="policeReport"
                  onChange={(e) => setFirFiled(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="policeReport" className="ml-2 block text-sm text-gray-700">
                  Was a police FIR filed for this incident?
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Claim
                  </>
                )}
              </button>
            </div>

            {/* Damage Photos Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Damage Evidence</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Damage Photos <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer w-full">
                    <div className="group relative">
                      <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 ${
                        errors.image ? 'border-red-500' : 'border-gray-300 group-hover:border-blue-500'
                      }`}>
                        {formData.previewImage ? (
                          <div className="flex flex-col items-center">
                            <img 
                              src={formData.previewImage} 
                              alt="Damage preview" 
                              className="h-32 object-contain mb-2"
                            />
                            <span className="text-sm text-blue-600 mt-2">Click to change photo</span>
                          </div>
                        ) : (
                          <>
                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">JPG, PNG (Max 5MB each)</p>
                          </>
                        )}  
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    {errors.image && (
                      <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Upload Button */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleUpload} // Replace with your upload handler function
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClaimSubmissionForm;