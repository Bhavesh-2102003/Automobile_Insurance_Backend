package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.enums.ProposalStatus;
import com.springboot.automobileInsurance.model.PolicyProposal;
import com.springboot.automobileInsurance.service.PolicyProposalService;

@RestController
@RequestMapping("/api/policyProposal")
public class PolicyProposalController {
	
	@Autowired
	private PolicyProposalService policyProposalService;
	
	@GetMapping("/all")
	public List<PolicyProposal> getAllProposal(){
		return policyProposalService.getAllProposal();
	}
	
	@GetMapping("/{id}")
	public PolicyProposal getProposalById(@PathVariable int id) {
		return policyProposalService.getProposalById(id);
	}
	
	@GetMapping("/status/{status}")
	public List<PolicyProposal> getProposalByStatus(@PathVariable ProposalStatus status) {
		return policyProposalService.getProposalByStatus(status);
	}
	
	@PutMapping("/{id}/{status}")
	public PolicyProposal updateProposalStatus(@RequestBody PolicyProposal policyProposal,@PathVariable int id,@PathVariable ProposalStatus status) {
		return policyProposalService.updateProposalStatus(policyProposal,id,status);
	}

}
