package com.springboot.automobileInsurance.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity

public class VehicleDetails {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    @Column(nullable = false)
	    private String vehicleType; // "Car" or "Bike"
	    

	    @Column(nullable = false)
	    private String registrationNumber;

	    @Column(nullable = false)
	    private String FuelType;
	    

	    @Column(nullable = false)
	    private String CommercialCar;

	    @Column(nullable = false)
	    private String VehicleMake;

	    @Column(nullable = false)
	    private String PreviousInsuranceProvider;

	    @Column(nullable = false)
	    private String PreviousInsurancePolicyNo;

	    @Column(nullable = false)
	    private String Pincode;

	    @JsonProperty("gstNumber")
	    private String GSTNumber;


	    @Column(nullable = false)
	    private String DrivingLicenseNo;

	    // Specific to Bike
	    private String BikeModel;
	    
	    private int kilometersDriven;

	    
	    // Specific to Car
	    private String CarVariant;
	    
	    @ManyToOne
	    private Customer customer;
	    
	    public int getKilometersDriven() {
			return kilometersDriven;
		}

		public void setKilometersDriven(int kilometersDriven) {
			this.kilometersDriven = kilometersDriven;
		}

	    

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getVehicleType() {
			return vehicleType;
		}

		public void setVehicleType(String vehicleType) {
			this.vehicleType = vehicleType;
		}

		public String getRegistrationNumber() {
			return registrationNumber;
		}

		public void setRegistrationNumber(String RegistrationNumber) {
			registrationNumber = RegistrationNumber;
		}

		public String getFuelType() {
			return FuelType;
		}

		public void setFuelType(String fuelType) {
			FuelType = fuelType;
		}

		
		

		public String getCommercialCar() {
			return CommercialCar;
		}

		public void setCommercialCar(String commercialCar) {
			CommercialCar = commercialCar;
		}

		public String getVehicleMake() {
			return VehicleMake;
		}

		public void setVehicleMake(String vehicleMake) {
			VehicleMake = vehicleMake;
		}

		public String getPreviousInsuranceProvider() {
			return PreviousInsuranceProvider;
		}

		public void setPreviousInsuranceProvider(String previousInsuranceProvider) {
			PreviousInsuranceProvider = previousInsuranceProvider;
		}

		public String getPreviousInsurancePolicyNo() {
			return PreviousInsurancePolicyNo;
		}

		public void setPreviousInsurancePolicyNo(String previousInsurancePolicyNo) {
			PreviousInsurancePolicyNo = previousInsurancePolicyNo;
		}

		

		public String getPincode() {
			return Pincode;
		}

		public void setPincode(String pincode) {
			Pincode = pincode;
		}

		
		


		public String getGSTNumber() {
			return GSTNumber;
		}

		public void setGSTNumber(String gSTNumber) {
			GSTNumber = gSTNumber;
		}


		public String getDrivingLicenseNo() {
			return DrivingLicenseNo;
		}

		public void setDrivingLicenseNo(String drivingLicenseNo) {
			DrivingLicenseNo = drivingLicenseNo;
		}

		public String getBikeModel() {
			return BikeModel;
		}

		public void setBikeModel(String bikeModel) {
			BikeModel = bikeModel;
		}

		public String getCarVariant() {
			return CarVariant;
		}

		public void setCarVariant(String carVariant) {
			CarVariant = carVariant;
		}

		public Customer getCustomer() {
			return customer;
		}

		public void setCustomer(Customer customer) {
			this.customer = customer;
		}
	    
	    
}
