package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.ClaimSubmissionService;
import com.springboot.automobileInsurance.service.CustomerService;
import com.springboot.automobileInsurance.service.VehicleDetailsService;

@RestController
@CrossOrigin({"http://localhost:5173"})
public class ClaimSubmissionController {
	
	@Autowired
	ClaimSubmissionService claimSubmissionService;
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	VehicleDetailsService vehicleDetailsService;
	
//	@PostMapping("/api/claim/submit/{contact}")
//	public ClaimTable submitClaim(@RequestBody ClaimTable claimTable,
//									@PathVariable String contact)
//	{
//		Customer customer=customerService.findByContact(contact);
//		VehicleDetails vehicleDetails=vehicleDetailsService.findByContact(contact);
//		
//		claimTable.setCustomer(customer);
//		claimTable.setVehicleDetails(vehicleDetails);
//		
//		return claimSubmissionService.submitClaim(claimTable);
//	}
}
