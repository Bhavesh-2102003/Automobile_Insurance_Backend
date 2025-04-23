package com.springboot.automobileInsurance.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.enums.ProposalStatus;
import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.PolicyProposal;
import com.springboot.automobileInsurance.repository.PolicyProposalRepository;

@Service
public class PolicyProposalService {
	
	@Autowired
	private PolicyProposalRepository policyProposalRepository;

	public List<PolicyProposal> getAllProposal() {
		return policyProposalRepository.findAll();
	}

	public PolicyProposal getProposalById(int id) {
		Optional<PolicyProposal> optional = policyProposalRepository.findById(id);
		if(optional.isEmpty())
			throw new InvalidIDException("Policy Proposal Id is Invalid");
		return optional.get();
	}

	public List<PolicyProposal> getProposalByStatus(ProposalStatus status) {
		
		return policyProposalRepository.findByStatus(status);
	}


	public PolicyProposal updateProposalStatus(PolicyProposal policyProposal, int id, ProposalStatus status) {
		policyProposalRepository.findById(id);
		policyProposal.setStatus(status);
		if(status == ProposalStatus.APPROVED) {
			policyProposal.setDocumentsVerified(true);
		}
		return policyProposalRepository.save(policyProposal);
	}

	

	
}
