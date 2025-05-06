package com.springboot.automobileInsurance.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.VehicleDetails;
import com.springboot.automobileInsurance.repository.VehicleDetailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class VehicleDetailsServiceTest {

    @Mock
    private VehicleDetailsRepository vehicleDetailsRepository;

    @InjectMocks
    private VehicleDetailsService vehicleDetailsService;

    private VehicleDetails sampleVehicle;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleVehicle = new VehicleDetails();
        sampleVehicle.setId(1);
        sampleVehicle.setRegistrationNumber("TN01AB1234");
        sampleVehicle.setVehicleType("Car");
    }

    @Test
    void testAddVehicleDetails() {
        when(vehicleDetailsRepository.save(sampleVehicle)).thenReturn(sampleVehicle);

        VehicleDetails savedVehicle = vehicleDetailsService.addVehicleDetails(sampleVehicle);

        assertNotNull(savedVehicle);
        assertEquals(sampleVehicle.getId(), savedVehicle.getId());
        verify(vehicleDetailsRepository, times(1)).save(sampleVehicle);
    }

    @Test
    void testFindById_ValidId() {
        when(vehicleDetailsRepository.findById(1)).thenReturn(Optional.of(sampleVehicle));

        VehicleDetails vehicle = vehicleDetailsService.findById(1);

        assertNotNull(vehicle);
        assertEquals(1, vehicle.getId());
        verify(vehicleDetailsRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_InvalidId_ThrowsException() {
        when(vehicleDetailsRepository.findById(2)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> {
            vehicleDetailsService.findById(2);
        });

        verify(vehicleDetailsRepository, times(1)).findById(2);
    }
}
