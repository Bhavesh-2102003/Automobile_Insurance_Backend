package com.springboot.automobileInsurance.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.model.User;
import com.springboot.automobileInsurance.repository.AuthRepository;
import com.springboot.automobileInsurance.repository.OfficerRepository;

@Service
public class OfficerService {

   Logger logger = LoggerFactory.getLogger("OfficerService");

    @Autowired
    private OfficerRepository officerRepository;
    
    @Autowired
    private AuthRepository authRepository;
    
    @Autowired
    private AuthService authService;

    // Adds a new officer with associated user and role set as OFFICER
    public Officer addOfficer(Officer officer) throws InvalidUsernameException {
        logger.info("Adding a new officer: {}", officer.getFullName());

        User user = officer.getUser ();
        
        user.setRole("OFFICER");
        
        user = authService.signUp(user);
        
        authRepository.save(user);
        
        officer.setUser (user);
        
        Officer savedOfficer = officerRepository.save(officer);
        logger.info("Officer added successfully with ID: {}", savedOfficer.getId());

        return savedOfficer;
    }

    // Returns a list of all officers
    public List<Officer> getAllOfficers() {
        logger.info("Fetching all officers");
        return officerRepository.findAll();
    }

    // Retrieves officer by ID, throws exception if not found
    public Officer getById(int id) {
        logger.info("Fetching officer by ID: {}", id);
    	
        Optional<Officer> optional = officerRepository.findById(id);
        
        if (optional.isEmpty()) {
            logger.error("Officer with ID {} not found", id);
            throw new InvalidIDException("Invalid Officer Id");
        }
        
        logger.info("Officer found with ID: {}", id);
        return optional.get();
    }

    // Retrieves officer by username
    public Officer getByUsername(String username) {
        logger.info("Fetching officer by username: {}", username);
        return officerRepository.findByUserUsername(username);
    }

    // Updates officer details 
    public Officer updateOfficer(int id, Officer officer) {
        logger.info("Updating officer with ID: {}", id);

        Optional<Officer> optional = officerRepository.findById(id);

        if (optional.isEmpty()) {
            logger.error("Officer with ID {} not found for update", id);
            throw new InvalidIDException("Invalid Officer Id");
        }

        Officer existingOfficer = optional.get();

        // Update fields
        
        existingOfficer.setContact(officer.getContact());
        
        existingOfficer.setAddress(officer.getAddress());
        
        existingOfficer.setBranchLocation(officer.getBranchLocation());

        Officer updatedOfficer = officerRepository.save(existingOfficer);
        logger.info("Officer updated successfully with ID: {}", updatedOfficer.getId());

        return updatedOfficer;
    }

	public Officer getByUserId(int uId) {
		
		return officerRepository.findByUserId(uId);
	}
	
}
