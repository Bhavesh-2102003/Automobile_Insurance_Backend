package com.springboot.automobileInsurance.model;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class PolicyDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private LocalDate startDate=LocalDate.now();

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Double coverageAmount;  

	@Column(nullable = false)
    private String coverageType; //comprehensive,third party,own damage 

    @Column(nullable = false)
    private String status="Active";


    @ManyToOne
    private Customer customer;
    
    @OneToOne
    private VehicleDetails vehicleDetails;
    
    public VehicleDetails getVehicleDetails() {
		return vehicleDetails;
	}

	public void setVehicleDetails(VehicleDetails vehicleDetails) {
		this.vehicleDetails = vehicleDetails;
	}
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public Double getCoverageAmount() {
		return coverageAmount;
	}

	public void setCoverageAmount(Double coverageAmount) {
		this.coverageAmount = coverageAmount;
	}

	public String getCoverageType() {
		return coverageType;
	}

	public void setCoverageType(String coverageType) {
		this.coverageType = coverageType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}