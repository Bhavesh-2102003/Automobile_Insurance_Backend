package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.CustomerService;
import com.springboot.automobileInsurance.service.PolicyDetailsService;
import com.springboot.automobileInsurance.service.VehicleDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")

public class PolicyDetailsController {
	@Autowired
	PolicyDetailsService policyDetailsService;
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	VehicleDetailsService vehicleDetailsService;
	
	@PostMapping("/api/policy/save")
	public PolicyDetails addPolicy(@RequestBody PolicyDetails policyDetails)
	{
		Customer customer=customerService.findById(policyDetails.getCustomer().getId());
		VehicleDetails vehicleDetails=vehicleDetailsService.findById(policyDetails.getVehicleDetails().getId());
		
		policyDetails.setCustomer(customer);
		policyDetails.setVehicleDetails(vehicleDetails);
		
		return policyDetailsService.addPolicy(policyDetails);
		
	}
	
	@GetMapping("/api/policy/getAll/{cId}")
	public List<PolicyDetails> getAllPolicies(@PathVariable int cId)
	{
		return policyDetailsService.findByCustomerId(cId);
	}
	
	
	
	
}
