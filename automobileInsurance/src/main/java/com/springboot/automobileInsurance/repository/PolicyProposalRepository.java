package com.springboot.automobileInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.PolicyProposal;

public interface PolicyProposalRepository extends JpaRepository<PolicyProposal, Integer> {

}
