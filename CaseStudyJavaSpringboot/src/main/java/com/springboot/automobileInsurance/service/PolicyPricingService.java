package com.springboot.automobileInsurance.service;

import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.model.VehicleDetails;

@Service
public class PolicyPricingService {

    public double calculateOwnDamagePrice(VehicleDetails vehicleDetails) {
        double basePrice = vehicleDetails.getVehicleType().equalsIgnoreCase("Car") ? 5000 : 2000;
        double adjustments = calculateAdjustments(vehicleDetails);
        double gstMultiplier = vehicleDetails.getGSTNumber() != null ? 1.18 : 1.0;
        return Math.round((basePrice + adjustments) * 1.10 * gstMultiplier);
    }

    public double calculateThirdPartyPrice(VehicleDetails vehicleDetails) {
        double basePrice = vehicleDetails.getVehicleType().equalsIgnoreCase("Car") ? 3000 : 1500;
        double adjustments = calculateAdjustments(vehicleDetails);
        double gstMultiplier = vehicleDetails.getGSTNumber() != null ? 1.18 : 1.0;
        return Math.round((basePrice + adjustments) * 1.05 * gstMultiplier);
    }

    public double calculateComprehensivePrice(VehicleDetails vehicleDetails) {
        double basePrice = vehicleDetails.getVehicleType().equalsIgnoreCase("Car") ? 10000 : 5000;
        double adjustments = calculateAdjustments(vehicleDetails);
        double gstMultiplier = vehicleDetails.getGSTNumber() != null ? 1.18 : 1.0;
        return Math.round((basePrice + adjustments) * 1.15 * gstMultiplier);
    }

    private double calculateAdjustments(VehicleDetails vehicleDetails) {
        double adjustments = 0;

        switch (vehicleDetails.getFuelType()) {
            case "Diesel":
                adjustments += 1000;
                break;
            case "Hybrid":
                adjustments += 500;
                break;
            case "Electric":
                adjustments -= 500;
                break;
        }

        adjustments += (vehicleDetails.getKilometersDriven() / 10000) * 500;

        if ("Yes".equalsIgnoreCase(vehicleDetails.getCommercialCar())) {
            adjustments += 2000;
        }

        if (vehicleDetails.getPreviousInsurancePolicyNo() != null && !vehicleDetails.getPreviousInsurancePolicyNo().isEmpty()) {
            adjustments -= 1000;
        }

        String[] metroPincodes = {"110001", "400001", "560001", "600001"};
        for (String metroPincode : metroPincodes) {
            if (vehicleDetails.getPincode().equals(metroPincode)) {
                adjustments += 1000;
                break;
            }
        }

        int vehicleAge = calculateVehicleAge(vehicleDetails);
        if (vehicleAge > 5) {
            double basePrice = vehicleDetails.getVehicleType().equalsIgnoreCase("Car") ? 5000 : 2000;
            adjustments -= basePrice * 0.10 * (vehicleAge - 5);
        }

        return adjustments;
    }

    private int calculateVehicleAge(VehicleDetails vehicleDetails) {
        return 6;
    }
}