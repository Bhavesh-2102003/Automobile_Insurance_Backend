package com.springboot.automobileInsurance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.service.OfficerService;

@RestController
@RequestMapping("/api/officer")
@CrossOrigin({"http://localhost:5173"})
public class OfficerController {
    
    @Autowired
    private OfficerService officerService;
    
    // to add the officer
    @PostMapping("/add")
    public Officer addOfficer(@RequestBody Officer officer) throws InvalidUsernameException {
        return officerService.addOfficer(officer);
    }
    
    //to get the profile of the officer using id 
    
    @GetMapping("/profile/{id}")
    public Officer getProfile(@PathVariable int id) {
        return officerService.getById(id);
    }

    // to update the officer details in particular field 
    
    @PutMapping("update/profile/{id}")
    public Officer updateProfile(@PathVariable int id,@RequestBody Officer officer) {
        return officerService.updateOfficer(id, officer);
    }

    //to get all the officer 
    @GetMapping("/all")
    public List<Officer> getAllOfficers() {
        return officerService.getAllOfficers();
    }
    
    // to get the officer by username 
    @GetMapping("/username/{username}")
    public Officer getByUsername(@PathVariable String username) {
        return officerService.getByUsername(username);
    }
    
    
    //to find the officer (findOfficerByUserId)
    
    @GetMapping("/getByuser/{uId}")
    public Officer getByUserId(@PathVariable int uId) {
    	return officerService.getByUserId(uId);
    		
    }
    
}