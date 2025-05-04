package com.springboot.automobileInsurance.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.repository.VehicleDetailsRepository;

@Service
public class VehicleDetailsService {
	
	@Autowired
	VehicleDetailsRepository vehicleDetailsRepository;
	

	public VehicleDetails addVehicleDetails(VehicleDetails vehicleDetails) {
		
		return vehicleDetailsRepository.save(vehicleDetails);
	}
	

	public VehicleDetails findById(int vId) {
		
		Optional<VehicleDetails> optional=vehicleDetailsRepository.findById(vId);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("Vehicle ID is invalid");
		}
		
		return optional.get();
	}

	
}
