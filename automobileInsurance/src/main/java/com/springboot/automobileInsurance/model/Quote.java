package com.springboot.automobileInsurance.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Quote {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @Column(nullable = false)
	    private String insurer;

	    @Column(nullable = false)
	    private String insuranceType;

	    @Column(nullable = false)
	    private Double premium;

	    @Column(nullable = false)
	    private String coverage;

	    @Column(nullable = false)
	    private String duration;

	    @Column(nullable = false)
	    private LocalDateTime createdAt;
	    
	    @OneToOne
	    private VehicleDetails vehicleDetails;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getInsurer() {
			return insurer;
		}

		public void setInsurer(String insurer) {
			this.insurer = insurer;
		}

		public String getInsuranceType() {
			return insuranceType;
		}

		public void setInsuranceType(String insuranceType) {
			this.insuranceType = insuranceType;
		}

		public Double getPremium() {
			return premium;
		}

		public void setPremium(Double premium) {
			this.premium = premium;
		}

		public String getCoverage() {
			return coverage;
		}

		public void setCoverage(String coverage) {
			this.coverage = coverage;
		}

		public String getDuration() {
			return duration;
		}

		public void setDuration(String duration) {
			this.duration = duration;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public VehicleDetails getVehicleDetails() {
			return vehicleDetails;
		}

		public void setVehicleDetails(VehicleDetails vehicleDetails) {
			this.vehicleDetails = vehicleDetails;
		}
	    
	    
}
