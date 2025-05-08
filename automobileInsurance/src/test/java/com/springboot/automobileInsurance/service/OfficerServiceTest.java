package com.springboot.automobileInsurance.service;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
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
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.Officer;
import com.springboot.automobileInsurance.model.User;
import com.springboot.automobileInsurance.repository.AuthRepository;
import com.springboot.automobileInsurance.repository.OfficerRepository;



@SpringBootTest

@ExtendWith(MockitoExtension.class)

public class OfficerServiceTest {

    @Mock
    private OfficerRepository officerRepository;

    @Mock
    private AuthRepository authRepository;

    @Mock
    private AuthService authService;

    @InjectMocks
    private OfficerService officerService;

    private Officer officer;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        user = new User();
        user.setUsername("officer123");
        user.setRole("OFFICER");

        officer = new Officer();
        officer.setId(1);
        officer.setFullName("John Doe");
        officer.setUser(user);
    }

    @Test
    void testAddOfficer() throws InvalidUsernameException {
        when(authService.signUp(any(User.class))).thenReturn(user);
        when(authRepository.save(any(User.class))).thenReturn(user);
        when(officerRepository.save(any(Officer.class))).thenReturn(officer);

        Officer saved = officerService.addOfficer(officer);

        assertNotNull(saved);
        assertEquals("John Doe", saved.getFullName());
        verify(officerRepository, times(1)).save(any(Officer.class));
    }

    @Test
    void testGetAllOfficers() {
        List<Officer> list = Arrays.asList(officer);
        when(officerRepository.findAll()).thenReturn(list);

        List<Officer> result = officerService.getAllOfficers();

        assertEquals(1, result.size());
        verify(officerRepository, times(1)).findAll();
    }

    @Test
    void testGetById_Found() {
        when(officerRepository.findById(1)).thenReturn(Optional.of(officer));

        Officer result = officerService.getById(1);

        assertNotNull(result);
        assertEquals("John Doe", result.getFullName());
        verify(officerRepository).findById(1);
    }

    @Test
    void testGetById_NotFound() {
        when(officerRepository.findById(2)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> {
            officerService.getById(2);
        });
    }

    @Test
    void testUpdateOfficer_Valid() {
        Officer updated = new Officer();
        updated.setId(1);
        updated.setContact("1234567890");
        updated.setAddress("New Street");
        updated.setBranchLocation("Branch A");

        when(officerRepository.findById(1)).thenReturn(Optional.of(officer));
        when(officerRepository.save(any(Officer.class))).thenReturn(updated);

        Officer result = officerService.updateOfficer(1, updated);

        assertEquals("1234567890", result.getContact());
        verify(officerRepository).save(any(Officer.class));
    }

    @Test
    void testUpdateOfficer_InvalidId() {
        Officer updated = new Officer();
        updated.setId(99); // Non-existing ID

        when(officerRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> {
            officerService.updateOfficer(99, updated);
        });
    }

    @Test
    void testGetByUsername() {
        when(officerRepository.findByUserUsername("officer123")).thenReturn(officer);

        Officer result = officerService.getByUsername("officer123");

        assertEquals("John Doe", result.getFullName());
        verify(officerRepository).findByUserUsername("officer123");
    }
    
    @Test
    void testGetByUserId() {
    	when(officerRepository.findByUserId(1)).thenReturn(officer);
    	
    	Officer result = officerService.getByUserId(1);
    	
    	assertNotNull(result);
        assertEquals("John Doe", result.getFullName());
    	verify(officerRepository).findByUserId(1);
    }
}
