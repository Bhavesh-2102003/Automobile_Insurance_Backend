package com.springboot.automobileInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.User;

public interface AuthRepository extends JpaRepository<User, Integer>{

	User findByUsername(String username);

	boolean existsByUsername(String username); 
}
