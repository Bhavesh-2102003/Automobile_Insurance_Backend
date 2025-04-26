package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
public class PolicyDetailsController {
	@Autowired
	private PolicyDetailsService policyDetailsService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private VehicleDetailsService vehicleDetailsService;

	@PostMapping("/api/policy/save/{cId}/{vId}")
	public PolicyDetails addPolicy(@PathVariable int cId, @PathVariable int vId,
			@RequestBody PolicyDetails policyDetails) {
		Customer customer = customerService.findById(cId);
		VehicleDetails vehicleDetails = vehicleDetailsService.findById(vId);

		policyDetails.setCustomer(customer);
		policyDetails.setVehicleDetails(vehicleDetails);

		return policyDetailsService.addPolicy(policyDetails);

	}

	@GetMapping("/api/policy/getAll-customer/{cId}")
	public List<PolicyDetails> getAllPolicies(@PathVariable int cId) {
		return policyDetailsService.findByCustomerId(cId);
	}
	
	@GetMapping("/api/policy/getAll-vehicle/{vId}")
	public List<PolicyDetails> getAllVehicleByPolicies(@RequestBody PolicyDetails policyDetails,@PathVariable int vId){
		return policyDetailsService.getAllVehicleByPolicies(vId);
	}

}