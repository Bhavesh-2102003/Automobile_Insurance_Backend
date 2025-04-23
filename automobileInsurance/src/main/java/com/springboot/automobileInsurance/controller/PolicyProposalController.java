package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.service.PolicyProposalService;

@RestController
@RequestMapping("/api/policyProposal")
public class PolicyProposalController {
	
	@Autowired
	private PolicyProposalService policyProposalService;

}
