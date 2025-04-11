package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.CustomerService;
import com.springboot.automobileInsurance.service.VehicleDetailsService;

@RestController
public class VehicleDetailsController {
	
	@Autowired
	VehicleDetailsService vehicleDetailsService;
	
	@Autowired
	CustomerService customerService;
	
	@PostMapping("/api/vehicle/add")
	public VehicleDetails addVehicleDetails(@RequestBody VehicleDetails vehicleDetails)
	{
		
		String contact=vehicleDetails.getContact();
		
		Customer customer=customerService.findByContact(contact);
		
		vehicleDetails.setCustomer(customer);
		
		return vehicleDetailsService.addVehicleDetails(vehicleDetails);
	}
}
