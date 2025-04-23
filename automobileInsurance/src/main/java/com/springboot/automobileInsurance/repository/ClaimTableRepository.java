package com.springboot.automobileInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.ClaimTable;

public interface ClaimTableRepository extends JpaRepository<ClaimTable, Integer> {

}
