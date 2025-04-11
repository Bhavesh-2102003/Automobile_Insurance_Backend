package com.springboot.automobileInsurance.model;

import jakarta.persistence.*;
@Entity
public class PolicyRenewalRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    
	@Column(nullable = false)
    private String requestedAt;

    @Column(nullable = false)
    private String status;
    
    
    @Column(nullable = false)
    private int customerId;
    
    @OneToOne
    private PolicyDetails policyDetails;

    @OneToOne
    private Payment payment;
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRequestedAt() {
		return requestedAt;
	}

	public void setRequestedAt(String requestedAt) {
		this.requestedAt = requestedAt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public PolicyDetails getPolicyDetails() {
		return policyDetails;
	}

	public void setPolicyDetails(PolicyDetails policyDetails) {
		this.policyDetails = policyDetails;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

    
    
	
}