package com.hospital.hms.inpatient;

import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@SpringBootTest
@ActiveProfiles("h2")
@SuppressWarnings("null")
public class InpatientControllerPerformanceTest {

    @Autowired
    private InpatientController inpatientController;

    @Autowired
    private WardRepository wardRepository;

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Test
    public void benchmarkDischargeBed() {
        // Setup
        Ward ward = new Ward();
        ward.setWardCode("TEST-WARD");
        ward.setWardName("Test Ward");
        ward = wardRepository.save(ward);

        Bed bed = new Bed("TEST-BED", ward);
        bed = bedRepository.save(bed);

        Patient patient = new Patient();
        patient.setPatientId("PAT-TEST-01");
        patient.setNicPassport("123456789V");
        patient.setFullName("Test Patient");
        patient.setGender("Male");
        patient.setPhone("0712345678");
        patient = patientRepository.save(patient);

        int numAdmissions = 1000;
        List<Admission> admissions = new ArrayList<>();
        for (int i = 0; i < numAdmissions; i++) {
            Admission admission = new Admission("ADM-" + UUID.randomUUID(), patient, bed, "Reason", "Doctor");
            admission.setStatus(Admission.AdmissionStatus.ADMITTED);
            admissions.add(admission);
        }
        admissionRepository.saveAll(admissions);

        try {
            // Benchmark
            long startTime = System.currentTimeMillis();
            inpatientController.dischargeBed(bed.getId(), Map.of("dischargeSummary", "Test summary"));
            long endTime = System.currentTimeMillis();

            long duration = endTime - startTime;
            System.out.println("==================================================");
            System.out.println("Benchmark dischargeBed for " + numAdmissions + " admissions");
            System.out.println("Duration: " + duration + " ms");
            System.out.println("==================================================");
        } finally {
            // Cleanup
            admissionRepository.deleteAll(admissions);
            patientRepository.delete(patient);
            bedRepository.delete(bed);
            wardRepository.delete(ward);
        }
    }
}
