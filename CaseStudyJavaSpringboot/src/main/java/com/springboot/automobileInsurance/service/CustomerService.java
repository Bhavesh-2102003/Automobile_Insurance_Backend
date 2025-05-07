package com.springboot.automobileInsurance.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.User;
import com.springboot.automobileInsurance.repository.CustomerRepository;

@Service
public class CustomerService {

	
	@Autowired
	CustomerRepository customerRepository;
	
    CustomerService(AuthService authService) {
        this.authService = authService;
    }

	@Autowired
	AuthService authService;

	public Customer addCustomer(Customer customer) throws InvalidUsernameException {
		
		User user = customer.getUser();
		
		user=authService.signUp(user);
		
		customer.setUser(user);
		
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

	public Customer findByUserId(int uId) {
		return customerRepository.findByUserId(uId);
	}

	public Customer getByCustomerId(int cId) {
		Optional<Customer> optional=customerRepository.findById(cId);
		return optional.get();
	}

	public void editAddress(String address, int cId) {
		Optional<Customer> optional=customerRepository.findById(cId);
		Customer customer=optional.get();
		customer.setAddress(address);
		customerRepository.save(customer);
		
	}

	public void editEmail(String email, int cId) {
		Optional<Customer> optional=customerRepository.findById(cId);
		Customer customer=optional.get();
		customer.setEmailAddress(email);
		customerRepository.save(customer);
	}
	
	public void editContact(String contact, int cId) {
		Optional<Customer> optional=customerRepository.findById(cId);
		Customer customer=optional.get();
		customer.setContact(contact);
		customerRepository.save(customer);
	}

	


}
