package com.springboot.automobileInsurance.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.exception.InvalidIDException;
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

	public ClaimTracking getClaimById(int id) {
		  Optional<ClaimTracking> optional =claimTrackingRepository.findById(id);
		  if(optional.isEmpty())
			  throw new InvalidIDException("Invalid id");
		return optional.get();

	 }

	public List<ClaimTracking> getByClaimStatus(String claimStatus) {
			return claimTrackingRepository.findByStatus(claimStatus);
		
	}
		  
}


