package com.springboot.automobileInsurance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.automobileInsurance.model.PolicyTemplate;

public interface PolicyTemplateRepository  extends JpaRepository<PolicyTemplate, Integer>{

}
