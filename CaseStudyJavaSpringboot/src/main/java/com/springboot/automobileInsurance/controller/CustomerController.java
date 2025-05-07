package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Customer;
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
	
	@PutMapping("/api/customer/editAddress/{cId}")
	public void editAddress(@RequestParam String address,@PathVariable int cId)
	{
		customerService.editAddress(address,cId);
	}
	
	@PutMapping("/api/customer/editEmail/{cId}")
	public void editEmail(@RequestParam String email,@PathVariable int cId)
	{
		customerService.editEmail(email,cId);
	}
	
	@PutMapping("/api/customer/editContact/{cId}")
	public void editContact(@RequestParam String contact,@PathVariable int cId)
	{
		customerService.editContact(contact,cId);
	}
	
	
}
