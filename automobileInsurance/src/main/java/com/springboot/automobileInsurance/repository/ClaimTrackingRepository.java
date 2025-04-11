package com.springboot.automobileInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.ClaimTracking;

public interface ClaimTrackingRepository extends JpaRepository<ClaimTracking, Integer>{

	List<ClaimTracking> findByCustomerId(int cId);

}
