package com.springboot.automobileInsurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.repository.ClaimSubmissionRepository;

@Service
public class ClaimSubmissionService {
	
	@Autowired
	ClaimSubmissionRepository claimSubmissionRepository;

	public ClaimTable submitClaim(ClaimTable claimTable) {
		
		return claimSubmissionRepository.save(claimTable);
	}
}
