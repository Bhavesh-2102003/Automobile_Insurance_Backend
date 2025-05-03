package com.springboot.automobileInsurance.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.exception.InvalidIDException;
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
        User user = officer.getUser ();
        
        user.setRole("OFFICER");
        
        user = authService.signUp(user);
        
        authRepository.save(user);
        
        officer.setUser (user);
        
        return officerRepository.save(officer);
    }

    public List<Officer> getAllOfficers() {
        return officerRepository.findAll();
    }

    public Officer getById(int id) {
    	
        Optional<Officer> optional = officerRepository.findById(id);
        
        if (optional.isEmpty()) {
        	
            throw new InvalidIDException("Invalid Officer Id");
        }
        
        return optional.get();
    }

    public Officer getByUsername(String username) {
    	
        return officerRepository.findByUserUsername(username);
        
    }

    public Officer updateOfficer(Officer officer) {
    	
        Optional<Officer> optional = officerRepository.findById(officer.getId());
        
        if (optional.isEmpty()) {
        	
            throw new InvalidIDException("Invalid Officer Id");
        }
        
        Officer existingOfficer = optional.get();
        
        // Update fields
        existingOfficer.setFullName(officer.getFullName());
        existingOfficer.setEmail(officer.getEmail());
        existingOfficer.setContact(officer.getContact());
        existingOfficer.setAddress(officer.getAddress());
        existingOfficer.setBranchLocation(officer.getBranchLocation());
        existingOfficer.setLicenseNo(officer.getLicenseNo());
        existingOfficer.setIdNo(officer.getIdNo());
        existingOfficer.setAadhaarNo(officer.getAadhaarNo());
        
        return officerRepository.save(existingOfficer);
    }
}