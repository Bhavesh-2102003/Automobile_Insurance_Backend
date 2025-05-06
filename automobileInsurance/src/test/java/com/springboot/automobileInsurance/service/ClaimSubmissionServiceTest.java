package com.springboot.automobileInsurance.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.springboot.automobileInsurance.dto.ClaimUpdateDTO;
import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.repository.ClaimSubmissionRepository;

class ClaimSubmissionServiceTest {

    @InjectMocks
    private ClaimSubmissionService claimSubmissionService;

    @Mock
    private ClaimSubmissionRepository claimSubmissionRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSubmitClaim() {
        ClaimTable claim = new ClaimTable();
        when(claimSubmissionRepository.save(claim)).thenReturn(claim);

        ClaimTable saved = claimSubmissionService.submitClaim(claim);
        assertEquals(claim, saved);
    }

    @Test
    void testUploadImage_Success() throws IOException {
        ClaimTable claim = new ClaimTable();
        claim.setId(1);
        MultipartFile file = new MockMultipartFile("image", "test.jpg", "image/jpeg", "dummy image".getBytes());

        when(claimSubmissionRepository.findById(1)).thenReturn(Optional.of(claim));
        when(claimSubmissionRepository.save(any(ClaimTable.class))).thenReturn(claim);

        ClaimTable result = claimSubmissionService.uploadImage(1, file);
        assertNotNull(result.getImageUrl());
    }

    @Test
    void testUploadImage_InvalidExtension() {
        ClaimTable claim = new ClaimTable();
        claim.setId(1);
        MultipartFile file = new MockMultipartFile("image", "test.txt", "text/plain", "invalid".getBytes());

        when(claimSubmissionRepository.findById(1)).thenReturn(Optional.of(claim));

        assertThrows(RuntimeException.class, () -> {
            claimSubmissionService.uploadImage(1, file);
        });
    }

    @Test
    void testGetAllClaims() {
        List<ClaimTable> claims = Arrays.asList(new ClaimTable(), new ClaimTable());
        when(claimSubmissionRepository.findByCustomerId(5)).thenReturn(claims);

        List<ClaimTable> result = claimSubmissionService.getAllClaims(5);
        assertEquals(2, result.size());
    }

    @Test
    void testGetListOfClaim() {
        List<ClaimTable> claims = Arrays.asList(new ClaimTable(), new ClaimTable());
        when(claimSubmissionRepository.findAll()).thenReturn(claims);

        List<ClaimTable> result = claimSubmissionService.getListOfClaim();
        assertEquals(2, result.size());
    }

    @Test
    void testUpdateClaim_Success() {
        int claimId = 1;
        ClaimTable claim = new ClaimTable();
        ClaimUpdateDTO dto = new ClaimUpdateDTO();
        dto.setStatus("APPROVED");
        dto.setFeedback("Reviewed");
        dto.setApprovedAmount(1000.0);

        when(claimSubmissionRepository.findById(claimId)).thenReturn(Optional.of(claim));
        when(claimSubmissionRepository.save(claim)).thenReturn(claim);

        ResponseEntity<String> response = claimSubmissionService.updateClaim(claimId, dto);
        assertEquals("Claim updated successfully.", response.getBody());
    }

    @Test
    void testUpdateClaim_InvalidId() {
        when(claimSubmissionRepository.findById(100)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> {
            claimSubmissionService.updateClaim(100, new ClaimUpdateDTO());
        });
    }

    @Test
    void testCountApprovedClaims() {
        when(claimSubmissionRepository.countByStatus("APPROVED")).thenReturn(3);
        int count = claimSubmissionService.countApprovedClaims();
        assertEquals(3, count);
    }

    @Test
    void testCountRejectedClaims() {
        when(claimSubmissionRepository.countByStatus("REJECTED")).thenReturn(2);
        int count = claimSubmissionService.countRejectedClaims();
        assertEquals(2, count);
    }
}
