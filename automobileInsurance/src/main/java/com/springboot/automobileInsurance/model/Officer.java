package com.springboot.automobileInsurance.model;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name ="officer")
public class Officer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private String fullName;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false,length = 10)
	private String contact;
	
	@Column(nullable = false,length = 512)
	private String address;
	
	@Column(nullable = false,length = 512)
	private String branchLocation;
	
	@Column(nullable = false)
	private int licenseNo;
	
	@Column(nullable = false)
	private int idNo;
	
	@Column(nullable = false)
	private double aadhaarNo;
	
	
	@OneToOne
	private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBranchLocation() {
		return branchLocation;
	}

	public void setBranchLocation(String branchLocation) {
		this.branchLocation = branchLocation;
	}
	

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}
	
	public int getLicenseNo() {
		return licenseNo;
	}

	public void setLicenseNo(int licenseNo) {
		this.licenseNo = licenseNo;
	}

	public int getIdNo() {
		return idNo;
	}

	public void setIdNo(int idNo) {
		this.idNo = idNo;
	}

	public double getAadhaarNo() {
		return aadhaarNo;
	}

	public void setAadhaarNo(double aadhaarNo) {
		this.aadhaarNo = aadhaarNo;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Officer [id=" + id + ", fullName=" + fullName + ", email=" + email + ", contact=" + contact
				+ ", address=" + address + ", branchLocation=" + branchLocation + ", licenseNo=" + licenseNo + ", idNo="
				+ idNo + ", aadhaarNo=" + aadhaarNo + ", user=" + user + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(aadhaarNo, address, branchLocation, contact, email, fullName, id, idNo, licenseNo, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Officer other = (Officer) obj;
		return Double.doubleToLongBits(aadhaarNo) == Double.doubleToLongBits(other.aadhaarNo)
				&& Objects.equals(address, other.address) && Objects.equals(branchLocation, other.branchLocation)
				&& Objects.equals(contact, other.contact) && Objects.equals(email, other.email)
				&& Objects.equals(fullName, other.fullName) && id == other.id && idNo == other.idNo
				&& licenseNo == other.licenseNo && Objects.equals(user, other.user);
	}
	
	
	
}