package com.springboot.automobileInsurance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.enums.PolicyStatus;
import com.springboot.automobileInsurance.enums.PolicyType;
import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.repository.OfficerRepository;
import com.springboot.automobileInsurance.repository.PolicyDetailsRepository;

@Service
public class PolicyDetailsService {

	@Autowired
    private PolicyDetailsRepository policyDetailsRepository;
	
	@Autowired
	private OfficerRepository officerRepository;

   
	public List<PolicyDetails> findByCustomerId(int cId) {
		
		return policyDetailsRepository.findByCustomerId(cId);
	}


	public PolicyDetails addPolicy(PolicyDetails policyDetails) {
		//extract the officer from the policy
		Officer officer = policyDetails.getOfficer();
		
		//save these to the respective repo to generate the id 
		
		officerRepository.save(officer);
		
		//restore the saved details back to the policyDetails
		
		policyDetails.setOfficer(officer);
		
		return policyDetailsRepository.save(policyDetails);
	}


	public List<PolicyDetails> getAllVehicleByPolicies(int vId) {
		
		return policyDetailsRepository.findByVehicleDetailsId(vId);
	}


	public List<PolicyDetails> getPoliciesByStatus(PolicyStatus policyStatus) {
		
		return policyDetailsRepository.findByPolicyStatus(policyStatus);
	}


	public List<PolicyDetails> getPoliciesByType(PolicyType policyType) {
		
		return policyDetailsRepository.findByPolicyType(policyType);
	}

}
