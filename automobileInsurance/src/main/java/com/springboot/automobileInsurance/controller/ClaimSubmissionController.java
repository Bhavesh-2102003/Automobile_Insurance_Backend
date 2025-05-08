package com.springboot.automobileInsurance.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.automobileInsurance.dto.ClaimUpdateDTO;
import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.service.ClaimSubmissionService;
import com.springboot.automobileInsurance.service.CustomerService;
import com.springboot.automobileInsurance.service.PolicyDetailsService;
import com.springboot.automobileInsurance.service.VehicleDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class ClaimSubmissionController {

	@Autowired
	private ClaimSubmissionService claimSubmissionService;

	@Autowired
	private CustomerService customerService;

	@Autowired
	private VehicleDetailsService vehicleDetailsService;

	@Autowired
	private PolicyDetailsService policyDetailsService;

	@PostMapping("/api/claim/submit")
	public ClaimTable submitClaim(@RequestBody ClaimTable claimTable) throws IOException {
		Customer customer = customerService.findById(claimTable.getCustomer().getId());
		VehicleDetails vehicleDetails = vehicleDetailsService.findById(claimTable.getVehicleDetails().getId());
		PolicyDetails policyDetails = policyDetailsService.findByVehicleId(vehicleDetails.getId());

		claimTable.setPolicyDetails(policyDetails);
		claimTable.setCustomer(customer);
		claimTable.setVehicleDetails(vehicleDetails);

		return claimSubmissionService.submitClaim(claimTable);
	}

	@PostMapping("/api/claim/upload/{cId}")
	public ClaimTable uploadImage(@PathVariable int cId, @RequestParam MultipartFile file) throws IOException {
		return claimSubmissionService.uploadImage(cId, file);
	}

	@GetMapping("/api/claim/getAll/{cId}")
	public List<ClaimTable> getAllClaims(@PathVariable int cId) {
		return claimSubmissionService.getAllClaims(cId);
	}

	/* get all the claim to view the ui */

	@GetMapping("/api/claim/all")
	public List<ClaimTable> getListOfClaim() {
		return claimSubmissionService.getListOfClaim();
	}
	
	@PutMapping("api/claim/update/{id}")
	public ResponseEntity<String> updateClaim(@PathVariable int id, @RequestBody ClaimUpdateDTO claimUpdateDTO) {
	    return claimSubmissionService.updateClaim(id, claimUpdateDTO); 
	}
	//to get the count by the status of approval and rejected 
		@GetMapping("/api/status/count")
		public Map<String, Integer> getClaimCounts() {
		    Map<String, Integer> counts = new HashMap<>();
		    counts.put("approved", claimSubmissionService.countApprovedClaims());
		    counts.put("rejected", claimSubmissionService.countRejectedClaims());
		    return counts;
	}
		
}
