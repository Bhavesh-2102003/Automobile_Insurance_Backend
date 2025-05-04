package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.ClaimTracking;
import com.springboot.automobileInsurance.service.ClaimTrackingService;

@RestController
public class ClaimTrackingController {
	
	@Autowired
	ClaimTrackingService claimTrackingService;
	
	@GetMapping("/api/claim/tracking/{cId}")
	public List<ClaimTracking> getClaimTracking(@PathVariable int cId)
	{//This method has not been used as claim tracking has been integrated into claimtable itself
		return claimTrackingService.getClaimTracking(cId);
	}
}
