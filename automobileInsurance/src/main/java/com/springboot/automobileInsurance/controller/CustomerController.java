package com.springboot.automobileInsurance.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.service.CustomerService;

@RestController
@CrossOrigin({"http://localhost:5173"})
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	// Add a new customer
	@PostMapping("/api/customer/add")
	public Customer addCustomer(@RequestBody Customer customer) {
		return customerService.addCustomer(customer);
	}

	// Get all customers with pagination (default: page 0, size 10)
	@GetMapping("/api/customer/all")
	public ResponseEntity<?> getAllCustomers(
	    @RequestParam(defaultValue = "0") int page,
	    @RequestParam(defaultValue = "10") int size
	) {
	    Pageable pageable = PageRequest.of(page, size);
	    Page<Customer> customers = customerService.getAllCustomers(pageable);
	    return ResponseEntity.ok(customers.getContent());
	}

	// Delete a customer by their ID
	@DeleteMapping("/api/customer/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable int id) {
        customerService.deleteCustomerById(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }

	// Update customer details using their ID
	@PutMapping("/api/customer/update/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        Customer customer = customerService.updateCustomer(id, updatedCustomer);
        return ResponseEntity.ok(customer);
    }

	
	
	// Get total number of customers
	@GetMapping("/api/customer/count")
	//Map --> key value pair and map is an interface
	public Map<String, Integer> getCustomerCount() {
        //count of the customers
	    int count = customerService.getCustomerCount();
	    Map<String, Integer> response = new HashMap<>();
	    response.put("count", count);
	    return response;
	}
}
