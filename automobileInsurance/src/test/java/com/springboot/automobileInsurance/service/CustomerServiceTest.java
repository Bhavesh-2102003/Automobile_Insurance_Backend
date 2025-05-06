package com.springboot.automobileInsurance.service;


import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.springboot.automobileInsurance.exception.InvalidIDException;
import com.springboot.automobileInsurance.model.Customer;
import com.springboot.automobileInsurance.repository.CustomerRepository;

class CustomerServiceTest {

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private CustomerRepository customerRepository;

    private Customer customer;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        customer = new Customer();
        customer.setId(1);
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setContact("1234567890");
        customer.setEmailAddress("john@example.com");
    }

    @Test
    void testAddCustomer() {
        when(customerRepository.save(any(Customer.class))).thenReturn(customer);

        Customer saved = customerService.addCustomer(customer);

        assertNotNull(saved);
        assertEquals("John", saved.getFirstName());
        verify(customerRepository, times(1)).save(customer);
    }

    @Test
    void testFindByContact() {
        when(customerRepository.findByContact("1234567890")).thenReturn(customer);

        Customer found = customerService.findByContact("1234567890");

        assertNotNull(found);
        assertEquals("Doe", found.getLastName());
    }

    @Test
    void testFindById_Valid() {
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));

        Customer found = customerService.findById(1);

        assertNotNull(found);
        assertEquals("john@example.com", found.getEmailAddress());
    }

    @Test
    void testFindById_Invalid() {
        when(customerRepository.findById(999)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> customerService.findById(999));
    }

    @Test
    void testGetAllCustomers() {
        Page<Customer> page = new PageImpl<>(List.of(customer));
        Pageable pageable = PageRequest.of(0, 10);
        when(customerRepository.findAll(pageable)).thenReturn(page);

        Page<Customer> result = customerService.getAllCustomers(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
    }

    @Test
    void testDeleteCustomerById_Valid() {
        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));
        doNothing().when(customerRepository).delete(customer);

        assertDoesNotThrow(() -> customerService.deleteCustomerById(1));
        verify(customerRepository, times(1)).delete(customer);
    }

    @Test
    void testDeleteCustomerById_Invalid() {
        when(customerRepository.findById(999)).thenReturn(Optional.empty());

        assertThrows(InvalidIDException.class, () -> customerService.deleteCustomerById(999));
    }

    @Test
    void testUpdateCustomer_Valid() {
        Customer updated = new Customer();
        updated.setFirstName("Jane");
        updated.setLastName("Smith");
        updated.setContact("9876543210");
        updated.setEmailAddress("jane@example.com");

        when(customerRepository.findById(1)).thenReturn(Optional.of(customer));
        when(customerRepository.save(any(Customer.class))).thenReturn(updated);

        Customer result = customerService.updateCustomer(1, updated);

        assertNotNull(result);
        assertEquals("Jane", result.getFirstName());
        assertEquals("9876543210", result.getContact());
    }

    @Test
    void testUpdateCustomer_Invalid() {
        Customer updated = new Customer();
        when(customerRepository.findById(999)).thenReturn(Optional.empty());

        Customer result = customerService.updateCustomer(999, updated);
        assertNull(result);
    }

    @Test
    void testGetCustomerCount() {
        when(customerRepository.count()).thenReturn(5L);

        int count = customerService.getCustomerCount();

        assertEquals(5, count);
    }
}
