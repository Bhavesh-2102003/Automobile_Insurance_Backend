package com.springboot.automobileInsurance.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.InputStream;
import java.util.Arrays;
import java.util.Optional;
import java.util.List;

import com.springboot.automobileInsurance.model.ClaimTable;
import com.springboot.automobileInsurance.repository.ClaimSubmissionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

class ClaimSubmissionServiceTest {

    @Mock
    private ClaimSubmissionRepository claimSubmissionRepository;

    @InjectMocks
    private ClaimSubmissionService claimSubmissionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSubmitClaim() {
        ClaimTable claim = new ClaimTable();
        claim.setId(1);

        when(claimSubmissionRepository.save(claim)).thenReturn(claim);

        ClaimTable saved = claimSubmissionService.submitClaim(claim);

        assertNotNull(saved);
        assertEquals(1, saved.getId());
        verify(claimSubmissionRepository, times(1)).save(claim);
    }

    @Test
    void testUploadImage_ValidExtension() throws Exception {
        ClaimTable claim = new ClaimTable();
        claim.setId(1);

        MultipartFile mockFile = new MockMultipartFile(
                "file", "image.jpg", "image/jpeg", "dummy data".getBytes());

        when(claimSubmissionRepository.findById(1)).thenReturn(Optional.of(claim));
        when(claimSubmissionRepository.save(any())).thenReturn(claim);

        // Perform the upload
        ClaimTable result = claimSubmissionService.uploadImage(1, mockFile);

        assertNotNull(result);
        assertTrue(result.getImageUrl().contains("image.jpg"));

        verify(claimSubmissionRepository).findById(1);
        verify(claimSubmissionRepository).save(claim);
    }

    @Test
    void testUploadImage_InvalidExtension() {
        ClaimTable claim = new ClaimTable();
        claim.setId(1);

        MultipartFile mockFile = new MockMultipartFile(
                "file", "file.txt", "text/plain", "some content".getBytes());

        when(claimSubmissionRepository.findById(1)).thenReturn(Optional.of(claim));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            claimSubmissionService.uploadImage(1, mockFile);
        });

        assertEquals("Image Type Invalid", exception.getMessage());
    }

    @Test
    void testGetAllClaims() {
        ClaimTable claim1 = new ClaimTable();
        ClaimTable claim2 = new ClaimTable();

        when(claimSubmissionRepository.findByCustomerId(10)).thenReturn(Arrays.asList(claim1, claim2));

        List<ClaimTable> claims = claimSubmissionService.getAllClaims(10);

        assertEquals(2, claims.size());
        verify(claimSubmissionRepository, times(1)).findByCustomerId(10);
    }
}
