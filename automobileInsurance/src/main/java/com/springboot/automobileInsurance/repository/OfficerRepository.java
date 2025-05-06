package com.springboot.automobileInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.Officer;

public interface OfficerRepository extends JpaRepository<Officer, Integer> {

	Officer findByUserUsername(String username);

	Officer findByUserId(int uId);

	

}
