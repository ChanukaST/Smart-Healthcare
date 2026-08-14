package com.hospital.hms.patient;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@SuppressWarnings("null")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<Patient> getAllPatients(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return patientRepository.searchPatients(search.trim());
        }
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nic/{nic}")
    public ResponseEntity<Patient> getPatientByNic(@PathVariable String nic) {
        return patientRepository.findByNicPassport(nic)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPatient(@RequestBody Patient patient) {
        if (patient.getNicPassport() != null && patientRepository.findByNicPassport(patient.getNicPassport()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Patient with NIC/Passport " + patient.getNicPassport() + " already exists."));
        }

        // Generate unique patient ID: PAT-2026-XXXX
        if (patient.getPatientId() == null || patient.getPatientId().isEmpty()) {
            long count = patientRepository.count() + 1;
            patient.setPatientId(String.format("PAT-%d-%04d", java.time.Year.now().getValue(), count));
        }

        Patient saved = patientRepository.save(patient);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable Long id, @RequestBody Patient updated) {
        return patientRepository.findById(id).map(patient -> {
            patient.setFullName(updated.getFullName());
            patient.setAge(updated.getAge());
            patient.setGender(updated.getGender());
            patient.setPhone(updated.getPhone());
            patient.setAddress(updated.getAddress());
            patient.setDistrict(updated.getDistrict());
            patient.setBloodGroup(updated.getBloodGroup());
            patient.setEmergencyContactName(updated.getEmergencyContactName());
            patient.setEmergencyContactPhone(updated.getEmergencyContactPhone());
            patient.setMedicalHistory(updated.getMedicalHistory());
            Patient saved = patientRepository.save(patient);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }
}
