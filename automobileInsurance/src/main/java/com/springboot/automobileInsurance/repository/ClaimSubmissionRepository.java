package com.springboot.automobileInsurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.ClaimTable;

public interface ClaimSubmissionRepository extends JpaRepository<ClaimTable, Integer>{

	List<ClaimTable> findByCustomerId(int cId);


	int countByStatus(String status);

}
