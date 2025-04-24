package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.service.OfficerService;

@RestController
@RequestMapping("/api/officer")
public class OfficerController {
	
	@Autowired
	private OfficerService officerService;
	
	@PostMapping("/add")
	public Officer addOfficer(@RequestBody Officer officer) throws InvalidUsernameException {
		return officerService.addOfficer(officer);
	}

}
