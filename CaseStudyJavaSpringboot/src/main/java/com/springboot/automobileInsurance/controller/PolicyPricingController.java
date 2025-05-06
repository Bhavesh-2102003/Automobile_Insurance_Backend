package com.springboot.automobileInsurance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.PolicyPricingService;

@RestController
//@CrossOrigin(origins = "http://localhost:5173/")
public class PolicyPricingController {

    @Autowired
    private PolicyPricingService policyPricingService;

    @PostMapping("/api/policypricing/owndamage")
    public double getOwnDamagePrice(@RequestBody VehicleDetails vehicleDetails) {
        return policyPricingService.calculateOwnDamagePrice(vehicleDetails);
    }

    @PostMapping("/api/policypricing/thirdparty")
    public double getThirdPartyPrice(@RequestBody VehicleDetails vehicleDetails) {
        return policyPricingService.calculateThirdPartyPrice(vehicleDetails);
    }

    @PostMapping("/api/policypricing/comprehensive")
    public double getComprehensivePrice(@RequestBody VehicleDetails vehicleDetails) {
        return policyPricingService.calculateComprehensivePrice(vehicleDetails);
    }
}
