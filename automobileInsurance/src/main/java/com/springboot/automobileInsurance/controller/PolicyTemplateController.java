package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.PolicyTemplate;
import com.springboot.automobileInsurance.service.PolicyTemplateService;

@RestController
@RequestMapping("/api/policy-template")
@CrossOrigin({"http://localhost:5173"})
public class PolicyTemplateController {

	@Autowired
	private PolicyTemplateService policyTemplateService;

	@PostMapping("/add")
	public PolicyTemplate addPolicyTemplate(@RequestBody PolicyTemplate policyTemplate) {

		return policyTemplateService.addPolicyTemplate(policyTemplate);
}
	
	@PostMapping("/all")
	public List<PolicyTemplate> getAll(){
		
		return policyTemplateService.getAll();
		
	}
	@PutMapping("/update/{id}")
    public PolicyTemplate updatePolicyTemplate(@PathVariable int id, @RequestBody PolicyTemplate policyTemplate) {
        return policyTemplateService.updatePolicyTemplate(id, policyTemplate);
    }
	
	@DeleteMapping("/delete/{id}")
    public void deletePolicyTemplate(@PathVariable int id) {
    	policyTemplateService.deletePolicyTemplate(id);
    }

	
}