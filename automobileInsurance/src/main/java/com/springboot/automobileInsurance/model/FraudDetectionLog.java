package com.springboot.automobileInsurance.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fraud_detection_log")
public class FraudDetectionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int fraudScore;

    @Column(length = 512)
    private String reason;

    @Column(length = 512)
    private String detectedBy;

    @Column(length = 512)
    private String createdAt;

    @ManyToOne
    private ClaimTable claimTable;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getFraudScore() {
		return fraudScore;
	}

	public void setFraudScore(int fraudScore) {
		this.fraudScore = fraudScore;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getDetectedBy() {
		return detectedBy;
	}

	public void setDetectedBy(String detectedBy) {
		this.detectedBy = detectedBy;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public ClaimTable getClaimTable() {
		return claimTable;
	}

	public void setClaimTable(ClaimTable claimTable) {
		this.claimTable = claimTable;
	}

    
}
