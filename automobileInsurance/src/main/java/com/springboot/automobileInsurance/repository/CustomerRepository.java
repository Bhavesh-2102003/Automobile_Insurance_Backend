package com.springboot.automobileInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	Customer findByContact(String contact);

}
