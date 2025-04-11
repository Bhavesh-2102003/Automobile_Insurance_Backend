package com.springboot.automobileInsurance.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "claim_count")
public class ClaimCount {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String approved;
	
	private String pending;
	
	private String rejected;
	
	
	@OneToOne
	private ClaimTable claimTable;


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getApproved() {
		return approved;
	}


	public void setApproved(String approved) {
		this.approved = approved;
	}


	public String getPending() {
		return pending;
	}


	public void setPending(String pending) {
		this.pending = pending;
	}


	public String getRejected() {
		return rejected;
	}


	public void setRejected(String rejected) {
		this.rejected = rejected;
	}


	public ClaimTable getClaimTable() {
		return claimTable;
	}


	public void setClaimTable(ClaimTable claimTable) {
		this.claimTable = claimTable;
	}
	
	

}