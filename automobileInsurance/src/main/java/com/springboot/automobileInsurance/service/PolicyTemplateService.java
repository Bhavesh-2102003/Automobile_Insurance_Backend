package com.springboot.automobileInsurance.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.model.PolicyTemplate;
import com.springboot.automobileInsurance.repository.OfficerRepository;
import com.springboot.automobileInsurance.repository.PolicyTemplateRepository;

@Service
public class PolicyTemplateService {

	@Autowired
	private PolicyTemplateRepository policyTemplateRepository;

	public PolicyTemplate addPolicyTemplate(PolicyTemplate policyTemplate) {

		return policyTemplateRepository.save(policyTemplate);
	}

	public List<PolicyTemplate> getAll() {

		return policyTemplateRepository.findAll();
	}
	
	public PolicyTemplate updatePolicyTemplate(int id, PolicyTemplate policyTemplate) {
        policyTemplate.setId(id);
        return policyTemplateRepository.save(policyTemplate);
    }

    public void deletePolicyTemplate(int id) {
        policyTemplateRepository.deleteById(id);
    }

}
