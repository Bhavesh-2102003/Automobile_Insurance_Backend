package com.springboot.automobileInsurance.model;

import java.time.LocalDate;

import com.springboot.automobileInsurance.enums.ProposalStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "policy_proposal")
public class PolicyProposal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false, unique = true)
	private String proposalNumber;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private ProposalStatus status; // PENDING, APPROVED, REJECTED

	@Column(nullable = false)
	private LocalDate proposalDate;

	@Column
	private String comments;

	@Column(nullable = false)
	private Boolean documentsVerified = false;

	@ManyToOne
	private Customer customer; // This will provide the List<Customer>

	@ManyToOne
	private VehicleDetails vehicleDetails; // This will Provide the List<Vehicle>

	@ManyToOne
	private PolicyDetails policyDetails; // This will contain all policy-related details

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProposalNumber() {
		return proposalNumber;
	}

	public void setProposalNumber(String proposalNumber) {
		this.proposalNumber = proposalNumber;
	}

	public ProposalStatus getStatus() {
		return status;
	}

	public void setStatus(ProposalStatus status) {
		this.status = status;
	}

	public LocalDate getProposalDate() {
		return proposalDate;
	}

	public void setProposalDate(LocalDate proposalDate) {
		this.proposalDate = proposalDate;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Boolean getDocumentsVerified() {
		return documentsVerified;
	}

	public void setDocumentsVerified(Boolean documentsVerified) {
		this.documentsVerified = documentsVerified;
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

	public PolicyDetails getPolicyDetails() {
		return policyDetails;
	}

	public void setPolicyDetails(PolicyDetails policyDetails) {
		this.policyDetails = policyDetails;
	}

}
