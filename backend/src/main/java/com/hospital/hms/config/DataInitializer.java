package com.hospital.hms.config;

import com.hospital.hms.auth.Role;
import com.hospital.hms.auth.User;
import com.hospital.hms.auth.UserRepository;
import com.hospital.hms.billing.Invoice;
import com.hospital.hms.billing.InvoiceItem;
import com.hospital.hms.billing.InvoiceRepository;
import com.hospital.hms.billing.Payment;
import com.hospital.hms.billing.PaymentRepository;
import com.hospital.hms.doctor.Department;
import com.hospital.hms.doctor.DepartmentRepository;
import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.doctor.DoctorRepository;
import com.hospital.hms.feedback.Feedback;
import com.hospital.hms.feedback.FeedbackRepository;
import com.hospital.hms.inpatient.Admission;
import com.hospital.hms.inpatient.AdmissionRepository;
import com.hospital.hms.inpatient.Bed;
import com.hospital.hms.inpatient.BedRepository;
import com.hospital.hms.inpatient.Ward;
import com.hospital.hms.inpatient.WardRepository;
import com.hospital.hms.international.InternationalPatientDetails;
import com.hospital.hms.international.InternationalPatientRepository;
import com.hospital.hms.laboratory.LabRequest;
import com.hospital.hms.laboratory.LabRequestRepository;
import com.hospital.hms.laboratory.LabTest;
import com.hospital.hms.laboratory.LabTestRepository;
import com.hospital.hms.opd.OpdQueueRepository;
import com.hospital.hms.opd.QueueToken;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import com.hospital.hms.pharmacy.Medicine;
import com.hospital.hms.pharmacy.MedicineBatch;
import com.hospital.hms.pharmacy.MedicineBatchRepository;
import com.hospital.hms.pharmacy.MedicineRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final OpdQueueRepository opdQueueRepository;
    private final WardRepository wardRepository;
    private final BedRepository bedRepository;
    private final AdmissionRepository admissionRepository;
    private final MedicineRepository medicineRepository;
    private final MedicineBatchRepository batchRepository;
    private final LabTestRepository labTestRepository;
    private final LabRequestRepository labRequestRepository;
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    private final InternationalPatientRepository internationalPatientRepository;
    private final FeedbackRepository feedbackRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           DoctorRepository doctorRepository,
                           PatientRepository patientRepository,
                           OpdQueueRepository opdQueueRepository,
                           WardRepository wardRepository,
                           BedRepository bedRepository,
                           AdmissionRepository admissionRepository,
                           MedicineRepository medicineRepository,
                           MedicineBatchRepository batchRepository,
                           LabTestRepository labTestRepository,
                           LabRequestRepository labRequestRepository,
                           InvoiceRepository invoiceRepository,
                           PaymentRepository paymentRepository,
                           InternationalPatientRepository internationalPatientRepository,
                           FeedbackRepository feedbackRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.opdQueueRepository = opdQueueRepository;
        this.wardRepository = wardRepository;
        this.bedRepository = bedRepository;
        this.admissionRepository = admissionRepository;
        this.medicineRepository = medicineRepository;
        this.batchRepository = batchRepository;
        this.labTestRepository = labTestRepository;
        this.labRequestRepository = labRequestRepository;
        this.invoiceRepository = invoiceRepository;
        this.paymentRepository = paymentRepository;
        this.internationalPatientRepository = internationalPatientRepository;
        this.feedbackRepository = feedbackRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Data already initialized
        }

        String defaultPassword = passwordEncoder.encode("password123");

        // 1. Users
        userRepository.save(new User("admin", defaultPassword, "System Administrator", "admin@careplus.lk", Role.ADMIN));
        userRepository.save(new User("receptionist", defaultPassword, "Kasun Perera", "reception@careplus.lk", Role.RECEPTIONIST));
        User doc1User = userRepository.save(new User("dr_anura", defaultPassword, "Dr. Anura Perera", "anura@careplus.lk", Role.DOCTOR));
        User doc2User = userRepository.save(new User("dr_sumudu", defaultPassword, "Dr. Sumudu Bandara", "sumudu@careplus.lk", Role.DOCTOR));
        User doc3User = userRepository.save(new User("dr_wickramasinghe", defaultPassword, "Dr. K. L. Wickramasinghe", "wickramasinghe@careplus.lk", Role.DOCTOR));
        User doc4User = userRepository.save(new User("dr_priyadarshani", defaultPassword, "Dr. Priyadarshani Silva", "priyadarshani@careplus.lk", Role.DOCTOR));
        User doc5User = userRepository.save(new User("dr_rohan", defaultPassword, "Dr. Rohan Jayawardena", "rohan@careplus.lk", Role.DOCTOR));
        userRepository.save(new User("nurse_priyani", defaultPassword, "Priyani Jayasinghe", "nurse@careplus.lk", Role.NURSE));
        userRepository.save(new User("pharmacist_kamal", defaultPassword, "Kamal Silva", "pharmacy@careplus.lk", Role.PHARMACIST));
        userRepository.save(new User("lab_nimal", defaultPassword, "Nimal Fernando", "lab@careplus.lk", Role.LAB_TECHNICIAN));
        userRepository.save(new User("patient_kamani", defaultPassword, "Kamani Samarasinghe", "kamani@careplus.lk", Role.PATIENT));
        userRepository.save(new User("int_john", defaultPassword, "Johnathan Smith", "john.smith@careplus.lk", Role.INTERNATIONAL_PATIENT));

        // 2. Departments
        Department depCardio = departmentRepository.save(new Department("Cardiology", "Heart & Cardiovascular Care"));
        Department depPedia = departmentRepository.save(new Department("Pediatrics", "Child Healthcare & Wellness"));
        Department depOPD = departmentRepository.save(new Department("General Medicine", "General OPD & Internal Medicine"));
        Department depDerma = departmentRepository.save(new Department("Dermatology", "Skin & Wellness Clinic"));
        Department depOrtho = departmentRepository.save(new Department("Orthopedics", "Bone & Joint Clinic"));

        // 3. Doctors
        Doctor doc1 = new Doctor("DOC-001", "Dr. Anura Perera", "MBBS, MD (Cardiology)", "Cardiology", 2500.00, "Room 101", "Mon, Wed, Fri (09:00 - 13:00)", depCardio);
        doc1.setUser(doc1User);
        doctorRepository.save(doc1);

        Doctor doc2 = new Doctor("DOC-002", "Dr. Sumudu Bandara", "MBBS, DCH (Pediatrics)", "Pediatrics", 2200.00, "Room 105", "Tue, Thu, Sat (10:00 - 14:00)", depPedia);
        doc2.setUser(doc2User);
        doctorRepository.save(doc2);

        Doctor doc3 = new Doctor("DOC-003", "Dr. K. L. Wickramasinghe", "MBBS, MD (Internal Med)", "General Medicine", 2000.00, "Room 108", "Daily Walk-in (08:30 - 16:00)", depOPD);
        doc3.setUser(doc3User);
        doctorRepository.save(doc3);

        Doctor doc4 = new Doctor("DOC-004", "Dr. Priyadarshani Silva", "MBBS, MD (Dermatology)", "Dermatology", 2400.00, "Room 112", "Mon, Thu (13:00 - 18:00)", depDerma);
        doc4.setUser(doc4User);
        doctorRepository.save(doc4);

        Doctor doc5 = new Doctor("DOC-005", "Dr. Rohan Jayawardena", "MBBS, MS, FRCS", "Orthopedics", 3000.00, "Room 204", "Tue, Fri (13:00 - 17:00)", depOrtho);
        doc5.setUser(doc5User);
        doctorRepository.save(doc5);

        // 4. Patients
        Patient p1 = new Patient("PAT-2026-0001", "925143820V", "Kamani Samarasinghe", 34, "FEMALE", "+94 77 123 4567", "No. 45, Galle Road, Bambalapitiya", "Colombo", "O+");
        p1.setEmergencyContactName("Sunil Samarasinghe");
        p1.setEmergencyContactPhone("+94 71 987 6543");
        p1.setMedicalHistory("Mild asthma, penicillin allergy");
        patientRepository.save(p1);

        Patient p2 = new Patient("PAT-2026-0002", "198512345678", "Chaminda Rathnayake", 41, "MALE", "+94 71 890 1234", "No. 12, Peradeniya Road", "Kandy", "A+");
        patientRepository.save(p2);

        Patient p3 = new Patient("PAT-2026-0003", "987654321V", "Sunethra Wickramasinghe", 28, "FEMALE", "+94 76 543 2109", "No. 88, Main Street", "Galle", "B+");
        patientRepository.save(p3);

        // International Patient
        Patient pInt = new Patient("INT-2026-0001", "N9821456", "Johnathan Smith", 48, "MALE", "+44 7911 123456", "London, United Kingdom", "International", "O+");
        patientRepository.save(pInt);

        InternationalPatientDetails intDetails = new InternationalPatientDetails(
                pInt, "N9821456", "British", "United Kingdom", "English", "GBP",
                "Seeking specialized cardiac evaluation and treatment in Colombo during stay."
        );
        intDetails.setTravelCoordinationDetails("Airport pick-up & executive hospital suite reservation arranged.");
        internationalPatientRepository.save(intDetails);

        // 5. OPD Tokens
        QueueToken t1 = new QueueToken("CAR-001", 1, p1, doc1);
        opdQueueRepository.save(t1);

        QueueToken t2 = new QueueToken("PED-001", 1, p2, doc2);
        opdQueueRepository.save(t2);

        // 6. Wards & Beds
        Ward maleWard = wardRepository.save(new Ward("WARD-M1", "Male Medical Ward", "MALE", 5, 3500.00));
        Ward femaleWard = wardRepository.save(new Ward("WARD-F1", "Female Medical Ward", "FEMALE", 5, 3500.00));
        Ward icuWard = wardRepository.save(new Ward("ICU-01", "Intensive Care Unit", "ICU", 3, 12500.00));

        Bed b1 = new Bed("M1-B01", maleWard);
        Bed b2 = new Bed("M1-B02", maleWard);
        b2.setOccupied(true);
        b2.setCurrentPatient(p2);
        bedRepository.save(b1);
        Bed savedB2 = bedRepository.save(b2);

        Admission adm1 = new Admission("ADM-2026-0001", p2, savedB2, "Acute Bronchitis & Respiratory Monitoring", "Dr. Anura Perera");
        admissionRepository.save(adm1);

        Bed fb1 = new Bed("F1-B01", femaleWard);
        bedRepository.save(fb1);

        Bed icu1 = new Bed("ICU-B01", icuWard);
        bedRepository.save(icu1);

        // 7. Pharmacy Medicines & Batches
        Medicine m1 = medicineRepository.save(new Medicine("MED-PAN-500", "Paracetamol 500mg", "Panadol", "Analgesic", 15.00, 100));
        m1.setTotalStock(500);
        medicineRepository.save(m1);
        batchRepository.save(new MedicineBatch("PAN-2026-01", m1, LocalDate.now().minusMonths(2), LocalDate.now().plusYears(2), 500, 8.50));

        Medicine m2 = medicineRepository.save(new Medicine("MED-AMX-250", "Amoxicillin 250mg", "Amoxil", "Antibiotic", 45.00, 50));
        m2.setTotalStock(35); // Trigger low stock alert!
        medicineRepository.save(m2);
        batchRepository.save(new MedicineBatch("AMX-2026-01", m2, LocalDate.now().minusMonths(1), LocalDate.now().plusMonths(8), 35, 28.00));

        Medicine m3 = medicineRepository.save(new Medicine("MED-CET-10", "Cetirizine 10mg", "Cetrine", "Antihistamine", 25.00, 80));
        m3.setTotalStock(250);
        medicineRepository.save(m3);

        Medicine m4 = medicineRepository.save(new Medicine("MED-OMP-20", "Omeprazole 20mg", "Omeprazole", "Antacid", 35.00, 100));
        m4.setTotalStock(300);
        medicineRepository.save(m4);

        // 8. Laboratory Tests
        LabTest lt1 = labTestRepository.save(new LabTest("LAB-FBC", "Full Blood Count (FBC)", "Hematology", 1800.00, "Hb: 12.0-16.0 g/dL, WBC: 4000-11000 /uL", "Blood"));
        labTestRepository.save(new LabTest("LAB-DENGUE", "Dengue NS1 Antigen", "Immunology", 2800.00, "Negative", "Blood"));
        labTestRepository.save(new LabTest("LAB-FBS", "Fasting Blood Sugar (FBS)", "Biochemistry", 750.00, "70 - 100 mg/dL", "Blood"));
        labTestRepository.save(new LabTest("LAB-LIPID", "Lipid Profile", "Biochemistry", 3200.00, "Total Cholesterol < 200 mg/dL", "Blood"));

        // 9. Sample Lab Request
        LabRequest lr1 = new LabRequest("REQ-2026-0001", p1, doc1, lt1, "Routine checkup for anemia");
        lr1.setStatus(LabRequest.RequestStatus.SAMPLE_COLLECTED);
        labRequestRepository.save(lr1);

        // 10. Sample Invoice
        Invoice inv1 = new Invoice("INV-2026-0001", p1);
        inv1.addItem(new InvoiceItem("Doctor Consultation (Dr. Anura Perera)", 2500.00, "CONSULTATION"));
        inv1.addItem(new InvoiceItem("Full Blood Count (FBC)", 1800.00, "LABORATORY"));
        inv1.setConsultationChargesLkr(2500.00);
        inv1.setLabChargesLkr(1800.00);
        inv1.setTotalAmountLkr(4300.00);
        inv1.setStatus(Invoice.InvoiceStatus.PAID);
        inv1.setPaymentMethod("CASH");
        Invoice savedInv = invoiceRepository.save(inv1);

        paymentRepository.save(new Payment("PAY-2026-0001", savedInv, 4300.00, "CASH", "REC-09821"));

        // 11. Sample Patient Feedback with AI Sentiment
        feedbackRepository.save(new Feedback(p1, 5, "The doctor was extremely attentive and caring, fantastic hospital service!", "POSITIVE", 96.5));
        feedbackRepository.save(new Feedback(p2, 4, "Smooth OPD queue process and clear prescription explanation.", "POSITIVE", 88.0));
    }
}
