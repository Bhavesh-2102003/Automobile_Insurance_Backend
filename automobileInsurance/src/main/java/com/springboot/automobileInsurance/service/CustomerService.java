package com.springboot.automobileInsurance.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;
	
	Logger logger = LoggerFactory.getLogger("CustomerService");

	// Adds a new customer to the repository.
	 
	public Customer addCustomer(Customer customer) {
		logger.info("Adding customer: {}", customer.getFirstName());
		return customerRepository.save(customer);
	}

	/**
	 * Finds a customer by contact number.
	 */
	public Customer findByContact(String contact) {
		logger.info("Finding customer by contact: {}", contact);
		return customerRepository.findByContact(contact);
	}

	// Finds a customer by ID. Throws exception if ID is invalid.
	 
	public Customer findById(int cId) {
		logger.info("Finding customer by ID: {}", cId);
		Optional<Customer> optional=customerRepository.findById(cId);
		if(optional.isEmpty())
		{
			logger.error("Customer ID {} is invalid", cId);
			throw new InvalidIDException("Customer ID Invalid");
		}
		return optional.get();
	}

	// Retrieves all customers in a paginated format.
	 
	public Page<Customer> getAllCustomers(Pageable pageable) {
		logger.info("Fetching all customers with pagination");
		return customerRepository.findAll(pageable);
	}
	
	// Deletes a customer by ID after verifying their existence.
	
	public void deleteCustomerById(int id) {
		logger.info("Deleting customer by ID:", id);
	    Optional<Customer> optional = customerRepository.findById(id);
	    if (optional.isEmpty()) {
	    	logger.error("Customer not found with ID:", id);
	        throw new InvalidIDException("Customer not found");
	    }
	    Customer customer = optional.get();
	    customerRepository.delete(customer);
	}

	
	 // Updates a customer by ID. Returns null if not found.
	 
	public Customer updateCustomer(int id, Customer updatedCustomer) {
		logger.info("Updating customer with ID:", id);
	    return customerRepository.findById(id).map(customer -> {
	        customer.setFirstName(updatedCustomer.getFirstName());
	        customer.setLastName(updatedCustomer.getLastName());
	        customer.setContact(updatedCustomer.getContact());
	        customer.setEmailAddress(updatedCustomer.getEmailAddress());
	        return customerRepository.save(customer);
	    }).orElse(null);
	}
	
	
	 // Returns the total number of customers.

	public int getCustomerCount() {
		logger.info("Getting total customer count");
	    return (int) customerRepository.count();
	}
}
