package com.hospital.hms.international;

import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/international-patients")
public class InternationalPatientController {

    private final InternationalPatientRepository internationalRepository;
    private final PatientRepository patientRepository;

    public InternationalPatientController(InternationalPatientRepository internationalRepository, PatientRepository patientRepository) {
        this.internationalRepository = internationalRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping
    public List<InternationalPatientDetails> getAllInternationalPatients() {
        return internationalRepository.findAll();
    }

    @PostMapping("/register-enquiry")
    public ResponseEntity<?> registerInternationalPatient(@RequestBody Map<String, Object> req) {
        String fullName = (String) req.get("fullName");
        String passport = (String) req.get("passportNumber");
        String nationality = (String) req.get("nationality");
        String country = (String) req.get("countryOfResidence");
        String phone = (String) req.get("phone");
        String currency = (String) req.get("preferredCurrency");
        String language = (String) req.get("preferredLanguage");
        String notes = (String) req.get("treatmentEnquiryNotes");
        Integer age = req.get("age") != null ? Integer.valueOf(req.get("age").toString()) : 35;
        String gender = req.get("gender") != null ? (String) req.get("gender") : "MALE";

        // Check if patient already exists by passport
        Optional<Patient> existingPatient = patientRepository.findByNicPassport(passport);
        Patient savedPatient;

        if (existingPatient.isPresent()) {
            savedPatient = existingPatient.get();
        } else {
            String patientId = String.format("INT-%d-%04d", java.time.Year.now().getValue(), patientRepository.count() + 1);
            Patient patient = new Patient(patientId, passport, fullName, age, gender, phone, country, "International", "O+");
            savedPatient = patientRepository.save(patient);
        }

        // Create or update International details
        Optional<InternationalPatientDetails> existingDetails = internationalRepository.findByPassportNumber(passport);
        InternationalPatientDetails details;
        if (existingDetails.isPresent()) {
            details = existingDetails.get();
            details.setTreatmentEnquiryNotes(notes);
            details.setPreferredCurrency(currency);
        } else {
            details = new InternationalPatientDetails(
                    savedPatient, passport, nationality, country, language, currency, notes
            );
        }
        details.setTravelCoordinationDetails("Airport transfer & hospital suite arrangement upon confirmation.");
        InternationalPatientDetails savedDetails = internationalRepository.save(details);

        return ResponseEntity.ok(savedDetails);
    }
}
