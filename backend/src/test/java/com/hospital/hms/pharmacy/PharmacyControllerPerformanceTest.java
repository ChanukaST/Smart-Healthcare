package com.hospital.hms.pharmacy;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.doctor.DoctorRepository;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("h2")
public class PharmacyControllerPerformanceTest {

    @Autowired
    private PharmacyController pharmacyController;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    private Long prescriptionId;

    @Autowired
    private MedicineBatchRepository medicineBatchRepository;

    @Autowired
    private com.hospital.hms.billing.InvoiceRepository invoiceRepository;

    @Autowired
    private com.hospital.hms.opd.OpdQueueRepository opdQueueRepository;

    @Autowired
    private com.hospital.hms.inpatient.AdmissionRepository admissionRepository;

    @Autowired
    private com.hospital.hms.billing.PaymentRepository paymentRepository;

    @Autowired
    private com.hospital.hms.laboratory.LabRequestRepository labRequestRepository;

    @Autowired
    private com.hospital.hms.laboratory.LabResultRepository labResultRepository;

    @Autowired
    private com.hospital.hms.feedback.FeedbackRepository feedbackRepository;

    @Autowired
    private com.hospital.hms.inpatient.BedRepository bedRepository;

    @Autowired
    private com.hospital.hms.international.InternationalPatientRepository internationalPatientRepository;

    @Autowired
    private com.hospital.hms.inpatient.WardRepository wardRepository;

    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    @BeforeEach
    public void setup() {
        jdbcTemplate.execute("SET REFERENTIAL_INTEGRITY FALSE");

        labResultRepository.deleteAll();
        labRequestRepository.deleteAll();
        paymentRepository.deleteAll();
        opdQueueRepository.deleteAll();
        invoiceRepository.deleteAll();
        admissionRepository.deleteAll();
        prescriptionRepository.deleteAll();
        medicineBatchRepository.deleteAll();
        medicineRepository.deleteAll();
        bedRepository.deleteAll();
        feedbackRepository.deleteAll();
        internationalPatientRepository.deleteAll();
        patientRepository.deleteAll();
        doctorRepository.deleteAll();
        wardRepository.deleteAll();

        jdbcTemplate.execute("SET REFERENTIAL_INTEGRITY TRUE");

        Patient patient = new Patient("PAT-PERF-001", "123456789V", "Test Patient", 30, "MALE", "0771234567", "Test Address", "Colombo", "O+");
        patient = patientRepository.save(patient);

        Doctor doctor = new Doctor("DOC-PERF-001", "Dr. Test", "MBBS", "Cardiology", 1500.00, "101", "Mon", null);
        doctor = doctorRepository.save(doctor);

        Prescription rx = new Prescription("RX-2023-0001", patient, doctor, "Performance Test");

        int numItems = 200;
        List<Medicine> medicines = new ArrayList<>();
        for (int i = 0; i < numItems; i++) {
            Medicine med = new Medicine();
            med.setGenericName("GenMed " + i);
            med.setItemCode("MED-PERF-" + i);
            med.setTotalStock(100);
            med.setReorderLevel(10);
            med.setUnitPriceLkr(10.0);
            med.setCategory("Test");
            medicines.add(med);
        }
        medicineRepository.saveAll(medicines);

        for (Medicine med : medicines) {
            PrescriptionItem item = new PrescriptionItem(med, "1-0-1", 5, 2);
            rx.addItem(item);
        }

        rx = prescriptionRepository.save(rx);
        prescriptionId = rx.getId();
    }

    @Test
    @Transactional
    public void testDispensePerformance() {
        long startTime = System.currentTimeMillis();

        pharmacyController.dispensePrescription(prescriptionId);

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        System.out.println("============== PERFORMANCE MEASUREMENT ==============");
        System.out.println("Time taken to dispense prescription with 200 items:");
        System.out.println(duration + " ms");
        System.out.println("=====================================================");

        Prescription updatedRx = prescriptionRepository.findById(prescriptionId).orElse(null);
        assertNotNull(updatedRx);
        assertEquals(Prescription.PrescriptionStatus.DISPENSED, updatedRx.getStatus());

        Medicine firstMed = medicineRepository.findByItemCode("MED-PERF-0").orElse(null);
        assertNotNull(firstMed);
        assertEquals(98, firstMed.getTotalStock());
    }
}
