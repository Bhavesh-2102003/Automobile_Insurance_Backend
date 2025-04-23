package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.ClaimTracking;
import com.springboot.automobileInsurance.service.ClaimTrackingService;

@RestController
public class ClaimTrackingController {
	
	@Autowired
	ClaimTrackingService claimTrackingService;
	
	@GetMapping("/api/claim/tracking/{cId}")
	public List<ClaimTracking> getClaimTracking(@PathVariable int cId)
	{
		return claimTrackingService.getClaimTracking(cId);
	}
	
	@PutMapping("/api/claim/tracking/status")
	public ClaimTracking getClaimById(@PathVariable int id) {
		return claimTrackingService.getClaimById(id);
	}
	
	@GetMapping("/api/claim/tracking/{cId}")
	public List<ClaimTracking> getByClaimStatus(@PathVariable String claimStatus)
	{
		return claimTrackingService.getByClaimStatus(claimStatus);
	}
	
}
