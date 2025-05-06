package com.springboot.automobileInsurance.model;

import java.time.LocalDate;


import com.springboot.automobileInsurance.enums.Categories;
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
public class PolicyTemplate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private String name;

	@Column(length = 1000)
	private String description; //details about the policy

	@Column(nullable = false)
	private LocalDate startDate;

	@Column(nullable = false)
	private LocalDate endDate;

	@Enumerated(EnumType.STRING)
	private PolicyType policyType;

	@Column(nullable = false)
	private double coverageAmount;

	@Column(nullable = false)
	private double price;

	@Column(nullable = false)
	private int duration; // in months

	@Column(nullable = false)
	private LocalDate createdAt;

	@Enumerated(EnumType.STRING)
	private PolicyStatus policyStatus;

	@Column(length = 1000)
	private String eligibilityCriteria; // Restrictions or requirements

	@Column(length = 1000)
	private String features; // Key features or benefits
	
	@Enumerated(EnumType.STRING)
	private Categories categories;
	
	private double minCoverageAmount;
	
	private double maxCoverageAmount;

	@Column(length = 2000)
	private String termsAndConditions; // Legal or informational text

	@ManyToOne
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public double getCoverageAmount() {
		return coverageAmount;
	}

	public void setCoverageAmount(double coverageAmount) {
		this.coverageAmount = coverageAmount;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public PolicyStatus getPolicyStatus() {
		return policyStatus;
	}

	public void setPolicyStatus(PolicyStatus policyStatus) {
		this.policyStatus = policyStatus;
	}

	public String getEligibilityCriteria() {
		return eligibilityCriteria;
	}

	public void setEligibilityCriteria(String eligibilityCriteria) {
		this.eligibilityCriteria = eligibilityCriteria;
	}

	public String getFeatures() {
		return features;
	}

	public void setFeatures(String features) {
		this.features = features;
	}

	
	public Categories getCategories() {
		return categories;
	}

	public void setCategories(Categories categories) {
		this.categories = categories;
	}

	public double getMinCoverageAmount() {
		return minCoverageAmount;
	}

	public void setMinCoverageAmount(double minCoverageAmount) {
		this.minCoverageAmount = minCoverageAmount;
	}

	public double getMaxCoverageAmount() {
		return maxCoverageAmount;
	}

	public void setMaxCoverageAmount(double maxCoverageAmount) {
		this.maxCoverageAmount = maxCoverageAmount;
	}

	public String getTermsAndConditions() {
		return termsAndConditions;
	}

	public void setTermsAndConditions(String termsAndConditions) {
		this.termsAndConditions = termsAndConditions;
	}

	public Officer getOfficer() {
		return officer;
	}

	public void setOfficer(Officer officer) {
		this.officer = officer;
	}

		
	
}

	