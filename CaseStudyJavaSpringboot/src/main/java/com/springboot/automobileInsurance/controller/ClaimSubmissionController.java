package com.springboot.automobileInsurance.controller;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.ClaimSubmissionService;
import com.springboot.automobileInsurance.service.CustomerService;
import com.springboot.automobileInsurance.service.PolicyDetailsService;
import com.springboot.automobileInsurance.service.VehicleDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class ClaimSubmissionController {
	
	@Autowired
	ClaimSubmissionService claimSubmissionService;
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	VehicleDetailsService vehicleDetailsService;
	
	@Autowired
	PolicyDetailsService policyDetailsService;
	
	Logger logger=LoggerFactory.getLogger("ClaimSubmissionController");
	
	
	//Here the claim is submitted through no ID's as the ID's have been explicitly defined in the claimTable and again each entity is updated from the DB
	@PostMapping("/api/claim/submit")
	public ClaimTable submitClaim(@RequestBody ClaimTable claimTable) throws IOException
	{
		//Another important thing here is there are two separate API's for claim upload 
		//->Step 1: Upload details without image URL
		//->Step 2 :Image will be uploaded only when the customer uploads his claimDetails first because i cannot integrate requestbody into formData
		Customer customer=customerService.findById(claimTable.getCustomer().getId());
		VehicleDetails vehicleDetails=vehicleDetailsService.findById(claimTable.getVehicleDetails().getId());
		PolicyDetails policyDetails =policyDetailsService.findByVehicleId(vehicleDetails.getId());
		
		claimTable.setPolicyDetails(policyDetails);
		claimTable.setCustomer(customer);
		claimTable.setVehicleDetails(vehicleDetails);
		logger.info("A new Claim has been submitted by "+claimTable.getCustomer().getFirstName());
		return claimSubmissionService.submitClaim(claimTable);
	}
	
	@PostMapping("/api/claim/upload/{cId}")
	public ClaimTable uploadImage(@PathVariable int cId,@RequestParam MultipartFile file) throws IOException
	{
		//Image is uploaded to claimtable/imageURL based on customer ID in the path react/path/images
		return claimSubmissionService.uploadImage(cId,file);
	}
	
	@GetMapping("/api/claim/getAll/{cId}")
	public List<ClaimTable> getAllClaims(@PathVariable int cId)
	{
		//Get All mapping for getting claims by a particular customer in order to display in Tracking section
		//The customer ID over here has been derived from localStorage
		return claimSubmissionService.getAllClaims(cId);
	}
	
}
