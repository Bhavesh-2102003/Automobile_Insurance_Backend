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
	    private Integer id;

	    @Column(nullable = false)
	    private String vehicleType; // "Car" or "Bike"

	    @Column(nullable = false)
	    private String RegistrationNumber;

	    @Column(nullable = false)
	    private String FuelType;

	    @Column(nullable = false)
	    private LocalDateTime PolicyExpiryDate;

	    @Column(nullable = false)
	    private String MedicalInsuranceValid;

	    @Column(nullable = false)
	    private String CommercialCar;

	    @Column(nullable = false)
	    private String VehicleMake;

	    @Column(nullable = false)
	    private String PreviousInsuranceProvider;

	    @Column(nullable = false)
	    private String PreviousInsurancePolicyNo;

	    @Column(nullable = false)
	    private String PreviousInsurerValidTill;

	    @Column(nullable = false)
	    private String Pincode;

	    @Column(nullable = false)
	    private String contact;

	    public String getContact() {
			return contact;
		}

		public void setContact(String contact) {
			this.contact = contact;
		}

		@Column(nullable = false)
	    private String Mail;

	    @Column(nullable=false)
	    @JsonProperty("gstNumber")
	    private String GSTNumber;

	    @Column(nullable = false)
	    private String RegistrationCertificateValidUpto;

	    @Column(nullable = false)
	    private String DrivingLicenseNo;

	    // Specific to Bike
	    private String BikeModel;

	    // Specific to Car
	    private String CarVariant;

	    @ManyToOne(optional=true)
	    private Customer customer;

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
			return RegistrationNumber;
		}

		public void setRegistrationNumber(String registrationNumber) {
			RegistrationNumber = registrationNumber;
		}

		public String getFuelType() {
			return FuelType;
		}

		public void setFuelType(String fuelType) {
			FuelType = fuelType;
		}

		public LocalDateTime getPolicyExpiryDate() {
			return PolicyExpiryDate;
		}

		public void setPolicyExpiryDate(LocalDateTime policyExpiryDate) {
			PolicyExpiryDate = policyExpiryDate;
		}

		public String getMedicalInsuranceValid() {
			return MedicalInsuranceValid;
		}

		public void setMedicalInsuranceValid(String medicalInsuranceValid) {
			MedicalInsuranceValid = medicalInsuranceValid;
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

		public String getPreviousInsurerValidTill() {
			return PreviousInsurerValidTill;
		}

		public void setPreviousInsurerValidTill(String previousInsurerValidTill) {
			PreviousInsurerValidTill = previousInsurerValidTill;
		}

		public String getPincode() {
			return Pincode;
		}

		public void setPincode(String pincode) {
			Pincode = pincode;
		}

		
		

		public String getMail() {
			return Mail;
		}

		public void setMail(String mail) {
			Mail = mail;
		}

		public String getGSTNumber() {
			return GSTNumber;
		}

		public void setGSTNumber(String gSTNumber) {
			GSTNumber = gSTNumber;
		}

		public String getRegistrationCertificateValidUpto() {
			return RegistrationCertificateValidUpto;
		}

		public void setRegistrationCertificateValidUpto(String registrationCertificateValidUpto) {
			RegistrationCertificateValidUpto = registrationCertificateValidUpto;
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
