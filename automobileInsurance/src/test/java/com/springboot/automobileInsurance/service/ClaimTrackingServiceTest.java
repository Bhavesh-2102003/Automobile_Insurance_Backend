package com.springboot.automobileInsurance.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.ClaimTracking;
import com.springboot.automobileInsurance.repository.ClaimTrackingRepository;

@ExtendWith(MockitoExtension.class)
public class ClaimTrackingServiceTest {

    @Mock
    private ClaimTrackingRepository claimTrackingRepository;

    @InjectMocks
    private ClaimTrackingService claimTrackingService;

    private ClaimTracking claimTracking;
    private ClaimTracking claimTracking2;

    @BeforeEach
    public void setUp() {
        // Setup mock ClaimTracking instances
        claimTracking = new ClaimTracking();
        claimTracking.setId(1);
        claimTracking.setStatus("Approved");
        
        claimTracking2 = new ClaimTracking();
        claimTracking2.setId(2);
        claimTracking2.setStatus("Pending");
    }

    @Test
    public void testGetClaimTracking() {
        // Given
        when(claimTrackingRepository.findByCustomerId(1)).thenReturn(Arrays.asList(claimTracking, claimTracking2));

        // When
        List<ClaimTracking> claimList = claimTrackingService.getClaimTracking(1);

        // Then
        assertNotNull(claimList);
        assertEquals(2, claimList.size());
        assertEquals("Approved", claimList.get(0).getStatus());
        verify(claimTrackingRepository, times(1)).findByCustomerId(1);
    }

    @Test
    public void testGetClaimById_ValidId() {
        // Given
        when(claimTrackingRepository.findById(1)).thenReturn(Optional.of(claimTracking));

        // When
        ClaimTracking result = claimTrackingService.getClaimById(1);

        // Then
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Approved", result.getStatus());
        verify(claimTrackingRepository, times(1)).findById(1);
    }

    @Test
    public void testGetClaimById_InvalidId() {
        // Given
        when(claimTrackingRepository.findById(999)).thenReturn(Optional.empty());

        // When and Then
        assertThrows(InvalidIDException.class, () -> claimTrackingService.getClaimById(999));
        verify(claimTrackingRepository, times(1)).findById(999);
    }

    @Test
    public void testGetByClaimStatus() {
        // Given
        when(claimTrackingRepository.findByStatus("Approved")).thenReturn(Arrays.asList(claimTracking));

        // When
        List<ClaimTracking> claimList = claimTrackingService.getByClaimStatus("Approved");

        // Then
        assertNotNull(claimList);
        assertEquals(1, claimList.size());
        assertEquals("Approved", claimList.get(0).getStatus());
        verify(claimTrackingRepository, times(1)).findByStatus("Approved");
    }
}
