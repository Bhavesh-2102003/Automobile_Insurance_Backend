package com.springboot.automobileInsurance.model;
import jakarta.persistence.*;

@Entity
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@Column(nullable = false)
    private String proposedId;

    @Column(nullable = false)
    private String proposedDate;

    @Column(nullable = false)
    private String proposedStatus;

    @Column(nullable = false)
    private String reviewedBy;

    @Column(nullable = false)
    private String reviewedAt;

    @Column(length = 45)
    private String comments;

    @ManyToOne
    private Customer customer;

    @OneToOne
    private Payment payment;
    

    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProposedId() {
		return proposedId;
	}

	public void setProposedId(String proposedId) {
		this.proposedId = proposedId;
	}

	public String getProposedDate() {
		return proposedDate;
	}

	public void setProposedDate(String proposedDate) {
		this.proposedDate = proposedDate;
	}

	public String getProposedStatus() {
		return proposedStatus;
	}

	public void setProposedStatus(String proposedStatus) {
		this.proposedStatus = proposedStatus;
	}

	public String getReviewedBy() {
		return reviewedBy;
	}

	public void setReviewedBy(String reviewedBy) {
		this.reviewedBy = reviewedBy;
	}

	public String getReviewedAt() {
		return reviewedAt;
	}

	public void setReviewedAt(String reviewedAt) {
		this.reviewedAt = reviewedAt;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

    
    
}