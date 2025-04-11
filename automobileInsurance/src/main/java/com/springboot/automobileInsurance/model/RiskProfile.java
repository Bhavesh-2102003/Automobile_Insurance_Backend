package com.springboot.automobileInsurance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "risk_profile")
public class RiskProfile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private int totalClaims = 0;
	
	@Column(nullable = false)
	private int accidentCount = 0;
	
	private int riskScore;
	
	@OneToOne
	private Customer customer;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getTotalClaims() {
		return totalClaims;
	}

	public void setTotalClaims(int totalClaims) {
		this.totalClaims = totalClaims;
	}

	public int getAccidentCount() {
		return accidentCount;
	}

	public void setAccidentCount(int accidentCount) {
		this.accidentCount = accidentCount;
	}

	public int getRiskScore() {
		return riskScore;
	}

	public void setRiskScore(int riskScore) {
		this.riskScore = riskScore;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	
	

}
