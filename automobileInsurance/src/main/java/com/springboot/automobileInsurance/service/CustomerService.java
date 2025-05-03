package com.springboot.automobileInsurance.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;

	public Customer addCustomer(Customer customer) {
		
		return customerRepository.save(customer);
	}

	public Customer findByContact(String contact) {
		
		return customerRepository.findByContact(contact);
	}

	public Customer findById(int cId) {
		
		Optional<Customer> optional=customerRepository.findById(cId);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("Customer ID Invalid");
		}
		
		return optional.get();
	}

	public Page<Customer> getAllCustomers(Pageable pageable) {
		
		return customerRepository.findAll(pageable);
	}
	
	public void deleteCustomerById(int id) {
		
	    Optional<Customer> optional = customerRepository.findById(id);
	    
	    if (optional.isEmpty()) {
	    	
	        throw new InvalidIDException("Customer not found");
	    }
	    Customer customer = optional.get();
	    
	    customerRepository.delete(customer);
	}

	// Update customer by id
	public Customer updateCustomer(int id, Customer updatedCustomer) {
		
	    return customerRepository.findById(id).map(customer -> {
	    	
	        customer.setFirstName(updatedCustomer.getFirstName());
	        
	        customer.setLastName(updatedCustomer.getLastName());
	        
	        customer.setContact(updatedCustomer.getContact());
	        
	        customer.setEmailAddress(updatedCustomer.getEmailAddress());
	        
	        return customerRepository.save(customer);
	        
	    }).orElse(null);
	}
	
	public int getCustomerCount() {
		
	    return (int) customerRepository.count();
	}

}
