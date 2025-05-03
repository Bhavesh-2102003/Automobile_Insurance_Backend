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
    
    @PostMapping("/add")
    public Officer addOfficer(@RequestBody Officer officer) throws InvalidUsernameException {
        return officerService.addOfficer(officer);
    }
    
    @GetMapping("/profile/{id}")
    public Officer getProfile(@PathVariable int id) {
        return officerService.getById(id);
    }

    @PostMapping("/profile")
    public Officer updateProfile(@RequestBody Officer officer) {
        return officerService.updateOfficer(officer);
    }

    @GetMapping("/all")
    public List<Officer> getAllOfficers() {
        return officerService.getAllOfficers();
    }

    @GetMapping("/username/{username}")
    public Officer getByUsername(@PathVariable String username) {
        return officerService.getByUsername(username);
    }
}