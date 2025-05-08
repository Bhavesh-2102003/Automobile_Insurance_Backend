package com.springboot.automobileInsurance.service;

import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.model.VehicleDetails;

/**
 * to calculate claim amount based on policy type, coverage amount, and vehicle age.
 */
public class ClaimAmountCalculator {

    /**
     * Calculates the approved claim amount based on the policy type, coverage amount, and vehicle age.
     claimTable The claim table entity containing references to policy and vehicle.
     The calculated approved claim amount.
     */
    public static double calculateClaimAmount(ClaimTable claimTable) {
        PolicyDetails policy = claimTable.getPolicyDetails();
        VehicleDetails vehicle = claimTable.getVehicleDetails();

        String policyType = policy.getCoverageType(); // "comprehensive", "third party", "own damage"
        Double coverageAmount = policy.getCoverageAmount();
        String vehicleType = vehicle.getVehicleType(); // "Car" or "Bike"

        double claimAmount = 0.0;
        switch (policyType.toLowerCase()) {
            case "comprehensive":
                if ("car".equalsIgnoreCase(vehicleType)) {
                    claimAmount = coverageAmount * 0.8;
                } else if ("bike".equalsIgnoreCase(vehicleType)) {
                    claimAmount = coverageAmount * 0.7;
                }
                break;
            case "third party":
                if ("car".equalsIgnoreCase(vehicleType)) {
                    claimAmount = 20000;
                } else if ("bike".equalsIgnoreCase(vehicleType)) {
                    claimAmount = 10000;
                }
                break;
            case "own damage":
                if ("car".equalsIgnoreCase(vehicleType)) {
                    claimAmount = coverageAmount * 0.6;
                } else if ("bike".equalsIgnoreCase(vehicleType)) {
                    claimAmount = coverageAmount * 0.5;
                }
                break;
            default:
                claimAmount = 0;
        }
        return claimAmount;
    }


}
