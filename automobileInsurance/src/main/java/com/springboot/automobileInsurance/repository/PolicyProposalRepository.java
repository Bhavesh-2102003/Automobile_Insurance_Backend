package com.springboot.automobileInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.enums.ProposalStatus;
import com.springboot.automobileInsurance.model.PolicyProposal;

public interface PolicyProposalRepository extends JpaRepository<PolicyProposal, Integer> {

	List<PolicyProposal> findByStatus(ProposalStatus status);

}
