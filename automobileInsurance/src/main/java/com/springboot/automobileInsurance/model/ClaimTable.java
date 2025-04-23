package com.springboot.automobileInsurance.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class ClaimTable {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @Column(nullable = false)
	    private String claimType;

	    @Column(nullable = false)
	    private String reason;

	    @Column(nullable = false)
	    private String location;

	    @Column(nullable = false)
	    private String policeReportNumber;

	    @Column(nullable = false)
	    private String garageDetails;

	    @Column(nullable = false)
	    private String driverName;

	    @Column(nullable = false)
	    private String driverLicense;

	    @Column(nullable = false)
	    private String damageDescription;

	    @Column(nullable = false)
	    private LocalDateTime accidentDate;

	    @Column(nullable = false)
	    private LocalDateTime submittedAt;
	    
	   

	    @ManyToOne
	    private Customer customer;

	    @OneToOne
	    private VehicleDetails vehicleDetails;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getClaimType() {
			return claimType;
		}

		public void setClaimType(String claimType) {
			this.claimType = claimType;
		}

		public String getReason() {
			return reason;
		}

		public void setReason(String reason) {
			this.reason = reason;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getPoliceReportNumber() {
			return policeReportNumber;
		}

		public void setPoliceReportNumber(String policeReportNumber) {
			this.policeReportNumber = policeReportNumber;
		}

		public String getGarageDetails() {
			return garageDetails;
		}

		public void setGarageDetails(String garageDetails) {
			this.garageDetails = garageDetails;
		}

		public String getDriverName() {
			return driverName;
		}

		public void setDriverName(String driverName) {
			this.driverName = driverName;
		}

		public String getDriverLicense() {
			return driverLicense;
		}

		public void setDriverLicense(String driverLicense) {
			this.driverLicense = driverLicense;
		}

		public String getDamageDescription() {
			return damageDescription;
		}

		public void setDamageDescription(String damageDescription) {
			this.damageDescription = damageDescription;
		}

		public LocalDateTime getAccidentDate() {
			return accidentDate;
		}

		public void setAccidentDate(LocalDateTime accidentDate) {
			this.accidentDate = accidentDate;
		}

		public LocalDateTime getSubmittedAt() {
			return submittedAt;
		}

		public void setSubmittedAt(LocalDateTime submittedAt) {
			this.submittedAt = submittedAt;
		}

		public Customer getCustomer() {
			return customer;
		}

		public void setCustomer(Customer customer) {
			this.customer = customer;
		}

		public VehicleDetails getVehicleDetails() {
			return vehicleDetails;
		}

		public void setVehicleDetails(VehicleDetails vehicleDetails) {
			this.vehicleDetails = vehicleDetails;
		}
	    
	    
}
