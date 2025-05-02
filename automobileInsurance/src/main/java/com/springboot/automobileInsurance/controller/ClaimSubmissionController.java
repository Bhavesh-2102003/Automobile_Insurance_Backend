package com.springboot.automobileInsurance.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	@PostMapping("/api/claim/submit")
	public ClaimTable submitClaim(@RequestBody ClaimTable claimTable) throws IOException
	{
		Customer customer=customerService.findById(claimTable.getCustomer().getId());
		VehicleDetails vehicleDetails=vehicleDetailsService.findById(claimTable.getVehicleDetails().getId());
		PolicyDetails policyDetails =policyDetailsService.findByVehicleId(vehicleDetails.getId());
		
		claimTable.setPolicyDetails(policyDetails);
		claimTable.setCustomer(customer);
		claimTable.setVehicleDetails(vehicleDetails);
		
		return claimSubmissionService.submitClaim(claimTable);
	}
	
	
}
