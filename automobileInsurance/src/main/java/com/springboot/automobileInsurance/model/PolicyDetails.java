package com.springboot.automobileInsurance.model;

import java.time.LocalDate;

import com.springboot.automobileInsurance.enums.PolicyStatus;
import com.springboot.automobileInsurance.enums.PolicyType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class PolicyDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;  // findById
	
	@Column(nullable = false)
	private String name;  // findByName

	@Column(nullable = false)
	private LocalDate startDate;

	@Column(nullable = false)
	private LocalDate endDate;
	
	@Enumerated(EnumType.STRING)
	private PolicyType policyType; //findByPolicyType

	@Column(nullable = false)
	private Double coverageAmount;

	@Column(nullable = false)
	private String createdAt;
	
	@Enumerated(EnumType.STRING)
	private PolicyStatus policyStatus; //findByPolicyStatus

	@ManyToOne // List<Customer>
	private Customer customer;

	@ManyToOne // List<VehicleDetails>
	private VehicleDetails vehicleDetails;
	
	@ManyToOne // List<Officer>
	private Officer officer;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public PolicyType getPolicyType() {
		return policyType;
	}

	public void setPolicyType(PolicyType policyType) {
		this.policyType = policyType;
	}

	public Double getCoverageAmount() {
		return coverageAmount;
	}

	public void setCoverageAmount(Double coverageAmount) {
		this.coverageAmount = coverageAmount;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public PolicyStatus getPolicyStatus() {
		return policyStatus;
	}

	public void setPolicyStatus(PolicyStatus policyStatus) {
		this.policyStatus = policyStatus;
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

	public Officer getOfficer() {
		return officer;
	}

	public void setOfficer(Officer officer) {
		this.officer = officer;
	}
	
	

	}