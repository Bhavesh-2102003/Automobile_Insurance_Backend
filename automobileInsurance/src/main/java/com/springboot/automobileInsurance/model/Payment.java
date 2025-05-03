package com.springboot.automobileInsurance.model;
import jakarta.persistence.*;


@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String amount;

    @Column(nullable = false)
    private String paymentType;

    @Column(nullable = false)
    private String garageInfo;

    @Column(nullable = false)
    private String accountNumber;
    
    @Column(nullable = false)
    private String holderName;
    
    @Column(nullable = false)
    private String ifscCode;
    
    @Column(nullable = false)
    private String status;
    

    @ManyToOne
    private ClaimTable claimTable;

  
    
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getGarageInfo() {
		return garageInfo;
	}

	public void setGarageInfo(String garageInfo) {
		this.garageInfo = garageInfo;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getHolderName() {
		return holderName;
	}

	public void setHolderName(String holderName) {
		this.holderName = holderName;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ClaimTable getClaimTable() {
		return claimTable;
	}

	public void setClaimTable(ClaimTable claimTable) {
		this.claimTable = claimTable;
	}


	    
    
    
    

}