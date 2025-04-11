package com.springboot.automobileInsurance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "report")
public class Report {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int totalClaims;
	
	private int totalValueOfClaims;
	
	@OneToOne
	private ClaimTable claimTable;

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

	public int getTotalValueOfClaims() {
		return totalValueOfClaims;
	}

	public void setTotalValueOfClaims(int totalValueOfClaims) {
		this.totalValueOfClaims = totalValueOfClaims;
	}

	public ClaimTable getClaimTable() {
		return claimTable;
	}

	public void setClaimTable(ClaimTable claimTable) {
		this.claimTable = claimTable;
	}
	
	
	

}
