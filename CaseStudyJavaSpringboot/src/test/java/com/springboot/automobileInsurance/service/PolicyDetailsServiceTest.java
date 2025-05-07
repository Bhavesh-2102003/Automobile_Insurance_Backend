package com.springboot.automobileInsurance.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import com.springboot.automobileInsurance.model.PolicyDetails;
import com.springboot.automobileInsurance.repository.CustomerRepository;
import com.springboot.automobileInsurance.repository.PolicyDetailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class PolicyDetailsServiceTest {

    @Mock
    private PolicyDetailsRepository policyDetailsRepository;

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private PolicyDetailsService policyDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByCustomerId() {
        int customerId = 1;
        PolicyDetails policy1 = new PolicyDetails();
        PolicyDetails policy2 = new PolicyDetails();
        List<PolicyDetails> policies = Arrays.asList(policy1, policy2);

        when(policyDetailsRepository.findByCustomerId(customerId)).thenReturn(policies);

        List<PolicyDetails> result = policyDetailsService.findByCustomerId(customerId);
        assertEquals(2, result.size());
        verify(policyDetailsRepository, times(1)).findByCustomerId(customerId);
    }

    @Test
    void testFindByVehicleId() {
        int vehicleId = 101;
        PolicyDetails policy = new PolicyDetails();
        policy.setId(10);

        when(policyDetailsRepository.findByVehicleDetailsId(vehicleId)).thenReturn(policy);

        PolicyDetails result = policyDetailsService.findByVehicleId(vehicleId);
        assertNotNull(result);
        assertEquals(10, result.getId());
        verify(policyDetailsRepository, times(1)).findByVehicleDetailsId(vehicleId);
    }

    @Test
    void testAddPolicy() {
        PolicyDetails policy = new PolicyDetails();
        policy.setId(15);

        when(policyDetailsRepository.save(policy)).thenReturn(policy);

        PolicyDetails result = policyDetailsService.addPolicy(policy);
        assertEquals(15, result.getId());
        verify(policyDetailsRepository, times(1)).save(policy);
    }
}
