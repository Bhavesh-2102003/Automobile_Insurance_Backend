package com.springboot.automobileInsurance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.model.ClaimTracking;
import com.springboot.automobileInsurance.repository.ClaimTrackingRepository;

@Service
public class ClaimTrackingService {
	
	@Autowired
	ClaimTrackingRepository claimTrackingRepository;

	public List<ClaimTracking> getClaimTracking(int cId) {
		
	List<ClaimTracking> list=claimTrackingRepository.findByCustomerId(cId);	
	return list;
	}

}
