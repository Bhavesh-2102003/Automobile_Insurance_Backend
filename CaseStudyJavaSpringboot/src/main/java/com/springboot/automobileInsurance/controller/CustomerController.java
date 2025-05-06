package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.User;
import com.springboot.automobileInsurance.service.CustomerService;

@RestController
//@CrossOrigin(origins = "http://localhost:5173/")
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	AuthController authController;
	
	
	@PostMapping("/api/customer/add")
	public Customer addCustomer(@RequestBody Customer customer) throws InvalidUsernameException
	{
		return customerService.addCustomer(customer);
	}
	
	@GetMapping("/api/customer/getByUserId/{uId}")
	public Customer findCustomerByUserId(@PathVariable int uId)
	{
		return customerService.findByUserId(uId);
				
	}
	
	@GetMapping("/api/customer/getByCustomerId/{cId}")
	public Customer getByCustomerId(@PathVariable int cId)
	{
		return customerService.getByCustomerId(cId);
	}

}
