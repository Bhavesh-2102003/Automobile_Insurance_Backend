package com.springboot.automobileInsurance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.repository.CustomerRepository;
import com.springboot.automobileInsurance.repository.PolicyDetailsRepository;

@Service
public class PolicyDetailsService {

	@Autowired
	PolicyDetailsRepository policyDetailsRepository;

	@Autowired
	CustomerRepository customerRepository;

	public List<PolicyDetails> findByCustomerId(int cId) {

		return policyDetailsRepository.findByCustomerId(cId);
	}

	public PolicyDetails addPolicy(PolicyDetails policyDetails) {

		return policyDetailsRepository.save(policyDetails);
	}

	public List<PolicyDetails> getAll() {

		return policyDetailsRepository.findAll();
	}

	
}