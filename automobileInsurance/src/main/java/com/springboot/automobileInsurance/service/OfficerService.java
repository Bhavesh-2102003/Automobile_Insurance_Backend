package com.springboot.automobileInsurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.model.User;
import com.springboot.automobileInsurance.repository.AuthRepository;
import com.springboot.automobileInsurance.repository.OfficerRepository;

@Service
public class OfficerService {

	
	@Autowired
	private OfficerRepository officerRepository;
	
	@Autowired
	private AuthRepository authRepository;
	
	@Autowired
	private AuthService authService;


	public Officer addOfficer(Officer officer) throws InvalidUsernameException {
		User user = officer.getUser();
		
		user.setRole("OFFICER");
		
		user = authService.signUp(user);
		
		authRepository.save(user);
		
		
		officer.setUser(user);
		
		return officerRepository.save(officer);
	}

}
