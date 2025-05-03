package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.CustomerService;
import com.springboot.automobileInsurance.service.VehicleDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:5173/")

public class VehicleDetailsController {
	
	@Autowired
	private VehicleDetailsService vehicleDetailsService;
	
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/api/vehicle/add")
	public VehicleDetails addVehicleDetails(@RequestBody VehicleDetails vehicleDetails)
	{
		Customer customer=customerService.findById(vehicleDetails.getCustomer().getId());
		vehicleDetails.setCustomer(customer);
		return vehicleDetailsService.addVehicleDetails(vehicleDetails);
	}
	
	@GetMapping("/api/vehicle/{id}")
	public VehicleDetails getVehicleById(@PathVariable int id) {
		return vehicleDetailsService.getVehicleById(id);
	}
	
}