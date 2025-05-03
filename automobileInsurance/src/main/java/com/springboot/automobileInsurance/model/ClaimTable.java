package com.springboot.automobileInsurance.model;

import java.time.LocalDate;
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
	    private int id;

	    @Column(nullable = false)
	    private String claimType;


	    @Column(nullable = false)
	    private String location;
	    
	    
	    @Column(nullable = false)
	    private String damageDescription;
	    
	    @Column(nullable = false)
	    private LocalDate accidentDate;
	    
	    @Column(nullable = false)
	    private LocalDateTime submittedAt=LocalDateTime.now();
	    
	    
	    private String imageUrl;
	    
	    @Column(nullable=false)
	    private String status;
	    
	    private String feedback;
	    
	    private double approvedAmount;
	    
	    @OneToOne
	    PolicyDetails policyDetails;
	    

		@ManyToOne
	    private Customer customer;
	    
	    @OneToOne
	    private VehicleDetails vehicleDetails;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getClaimType() {
			return claimType;
		}

		public void setClaimType(String claimType) {
			this.claimType = claimType;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getDamageDescription() {
			return damageDescription;
		}

		public void setDamageDescription(String damageDescription) {
			this.damageDescription = damageDescription;
		}

		public LocalDate getAccidentDate() {
			return accidentDate;
		}

		public void setAccidentDate(LocalDate accidentDate) {
			this.accidentDate = accidentDate;
		}

		public LocalDateTime getSubmittedAt() {
			return submittedAt;
		}

		public void setSubmittedAt(LocalDateTime submittedAt) {
			this.submittedAt = submittedAt;
		}

		public String getImageUrl() {
			return imageUrl;
		}

		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getFeedback() {
			return feedback;
		}

		public void setFeedback(String feedback) {
			this.feedback = feedback;
		}

		public double getApprovedAmount() {
			return approvedAmount;
		}

		public void setApprovedAmount(double approvedAmount) {
			this.approvedAmount = approvedAmount;
		}

		public PolicyDetails getPolicyDetails() {
			return policyDetails;
		}

		public void setPolicyDetails(PolicyDetails policyDetails) {
			this.policyDetails = policyDetails;
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