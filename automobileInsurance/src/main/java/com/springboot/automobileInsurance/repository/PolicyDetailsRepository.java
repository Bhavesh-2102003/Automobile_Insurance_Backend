package com.springboot.automobileInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.PolicyDetails;

public interface PolicyDetailsRepository extends JpaRepository<PolicyDetails, Integer>{

	List<PolicyDetails> findByCustomerId(int cId);

	List<PolicyDetails> findByVehicleDetailsId(int vId);

}
