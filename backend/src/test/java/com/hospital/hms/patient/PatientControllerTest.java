package com.hospital.hms.patient;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    controllers = PatientController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = {com.hospital.hms.common.security.SecurityConfig.class, com.hospital.hms.common.security.JwtAuthenticationFilter.class}
    )
)
@AutoConfigureMockMvc(addFilters = false)
@SuppressWarnings("null")
public class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PatientRepository patientRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createPatient_withExistingNic_returnsBadRequest() throws Exception {
        // Arrange
        String existingNic = "123456789V";
        Patient newPatient = new Patient();
        newPatient.setNicPassport(existingNic);
        newPatient.setFullName("John Doe");

        Patient existingPatient = new Patient();
        existingPatient.setNicPassport(existingNic);

        when(patientRepository.findByNicPassport(existingNic)).thenReturn(Optional.of(existingPatient));

        // Act & Assert
        mockMvc.perform(post("/api/patients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPatient)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Patient with NIC/Passport " + existingNic + " already exists."));
    }

    @Test
    public void createPatient_withNewNic_returnsOk() throws Exception {
        // Arrange
        String newNic = "987654321V";
        Patient newPatient = new Patient();
        newPatient.setNicPassport(newNic);
        newPatient.setFullName("Jane Doe");

        Patient savedPatient = new Patient();
        savedPatient.setNicPassport(newNic);
        savedPatient.setFullName("Jane Doe");
        savedPatient.setPatientId("PAT-2026-0001");
        savedPatient.setId(1L);

        when(patientRepository.findByNicPassport(newNic)).thenReturn(Optional.empty());
        when(patientRepository.count()).thenReturn(0L);
        when(patientRepository.save(any(Patient.class))).thenReturn(savedPatient);

        // Act & Assert
        mockMvc.perform(post("/api/patients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newPatient)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.patientId").value("PAT-2026-0001"))
                .andExpect(jsonPath("$.nicPassport").value(newNic))
                .andExpect(jsonPath("$.fullName").value("Jane Doe"));
    }
}
