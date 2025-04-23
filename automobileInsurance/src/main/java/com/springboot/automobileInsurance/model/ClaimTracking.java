package com.springboot.automobileInsurance.model;

import java.time.LocalDateTime;

import com.springboot.automobileInsurance.enums.ClaimStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class ClaimTracking {
	 	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

	@Enumerated(EnumType.STRING)
	private ClaimStatus claimStatus;
	
    @Column(nullable = false)
    private String remarks;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToOne
    private ClaimTable claimTable;
    
    public ClaimTable getClaimTable() {
		return claimTable;
	}

	public void setClaimTable(ClaimTable claimTable) {
		this.claimTable = claimTable;
	}

	@ManyToOne
    private Customer customer;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	
	public ClaimStatus getClaimStatus() {
		return claimStatus;
	}

	public void setClaimStatus(ClaimStatus claimStatus) {
		this.claimStatus = claimStatus;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	    
}
