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
	
	private int approvedCount;
	
	private int pendingCount;
	
	private int rejectedCount;
	
	
	@OneToOne
	private ClaimTable claimTable;


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getApprovedCount() {
		return approvedCount;
	}


	public void setApprovedCount(int approvedCount) {
		this.approvedCount = approvedCount;
	}


	public int getPendingCount() {
		return pendingCount;
	}


	public void setPendingCount(int pendingCount) {
		this.pendingCount = pendingCount;
	}


	public int getRejectedCount() {
		return rejectedCount;
	}


	public void setRejectedCount(int rejectedCount) {
		this.rejectedCount = rejectedCount;
	}


	public ClaimTable getClaimTable() {
		return claimTable;
	}


	public void setClaimTable(ClaimTable claimTable) {
		this.claimTable = claimTable;
	}




	
	

}