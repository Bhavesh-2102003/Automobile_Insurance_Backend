package com.springboot.automobileInsurance.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.repository.PolicyDetailsRepository;

@Service
public class PolicyDetailsService {

	@Autowired
	private PolicyDetailsRepository policyDetailsRepository;

	Logger logger = LoggerFactory.getLogger("PolicyDetailsService");

	// Fetch policies by customer ID
	public List<PolicyDetails> findByCustomerId(int cId) {
		
		logger.info("Fetching policy details for customer ID:", cId);
		
		return policyDetailsRepository.findByCustomerId(cId);
	}

	// Add a new policy
	public PolicyDetails addPolicy(PolicyDetails policyDetails) {
		
		logger.info("Adding new policy:", policyDetails);
		
		return policyDetailsRepository.save(policyDetails);
	}
	
	// Fetch policy by vehicle ID
	public PolicyDetails findByVehicleId(int vId) {
		
		logger.info("Fetching policy by vehicle ID:", vId);
		
		return policyDetailsRepository.findByVehicleDetailsId(vId);
	}

	// Get all policy records
	public List<PolicyDetails> getAll() {
		
		logger.info("Fetching all policy details");
		
		return policyDetailsRepository.findAll();
	}
	// Prime React chart for count of the coverage types
	public Map<String, Integer> getCoverageTypeCounts() {
	    List<PolicyDetails> policies = policyDetailsRepository.findAll();

	    // Create a Map to store counts
	    Map<String, Integer> coverageTypeCounts = new HashMap<>();

	    // Loop through the list of policies and manually count the coverage types
	    for (PolicyDetails policy : policies) {
	        String coverageType = policy.getCoverageType();

	        // If coverage type is already in the map, increment the count, otherwise initialize it
	        coverageTypeCounts.put(
	                coverageType,
	                coverageTypeCounts.getOrDefault(coverageType, 0) + 1
	        );
	    }

	    return coverageTypeCounts;
	}


	
	
}
