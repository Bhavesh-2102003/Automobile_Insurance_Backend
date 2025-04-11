package com.springboot.automobileInsurance.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

}
