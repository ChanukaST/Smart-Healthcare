package com.hospital.hms.pharmacy;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.doctor.DoctorRepository;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/pharmacy")
@SuppressWarnings({"null", "unchecked"})
public class PharmacyController {

    private final MedicineRepository medicineRepository;
    private final MedicineBatchRepository batchRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public PharmacyController(MedicineRepository medicineRepository,
                              MedicineBatchRepository batchRepository,
                              PrescriptionRepository prescriptionRepository,
                              PatientRepository patientRepository,
                              DoctorRepository doctorRepository) {
        this.medicineRepository = medicineRepository;
        this.batchRepository = batchRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/medicines")
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @GetMapping("/medicines/low-stock")
    public List<Medicine> getLowStockMedicines() {
        return medicineRepository.findAll().stream()
                .filter(m -> m.getTotalStock() <= m.getReorderLevel())
                .toList();
    }

    @PostMapping("/medicines")
    public ResponseEntity<?> addMedicine(@RequestBody Medicine medicine) {
        if (medicine.getItemCode() == null || medicine.getItemCode().isEmpty()) {
            medicine.setItemCode("MED-" + String.format("%04d", medicineRepository.count() + 1));
        }
        Medicine saved = medicineRepository.save(medicine);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/batches")
    public ResponseEntity<?> addBatch(@RequestBody Map<String, Object> request) {
        Long medicineId = Long.valueOf(request.get("medicineId").toString());
        String batchNumber = (String) request.get("batchNumber");
        LocalDate expDate = LocalDate.parse((String) request.get("expiryDate"));
        Integer qty = Integer.valueOf(request.get("quantity").toString());
        Double cost = Double.valueOf(request.get("unitCostLkr").toString());

        Optional<Medicine> medOpt = medicineRepository.findById(medicineId);
        if (medOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Medicine not found"));
        }

        Medicine medicine = medOpt.get();
        MedicineBatch batch = new MedicineBatch(batchNumber, medicine, LocalDate.now(), expDate, qty, cost);
        MedicineBatch savedBatch = batchRepository.save(batch);

        // Update medicine stock
        medicine.setTotalStock(medicine.getTotalStock() + qty);
        medicineRepository.save(medicine);

        return ResponseEntity.ok(savedBatch);
    }

    @GetMapping("/prescriptions")
    public List<Prescription> getPrescriptions(@RequestParam(required = false) String status) {
        if ("PENDING".equalsIgnoreCase(status)) {
            return prescriptionRepository.findByStatusOrderByPrescribedDateDesc(Prescription.PrescriptionStatus.PENDING);
        }
        return prescriptionRepository.findAll();
    }

    @PostMapping("/prescriptions")
    public ResponseEntity<?> createPrescription(@RequestBody Map<String, Object> request) {
        Long patientId = Long.valueOf(request.get("patientId").toString());
        Long doctorId = Long.valueOf(request.get("doctorId").toString());
        String notes = (String) request.get("notes");
        List<Map<String, Object>> itemsList = (List<Map<String, Object>>) request.get("items");

        Optional<Patient> pOpt = patientRepository.findById(patientId);
        Optional<Doctor> dOpt = doctorRepository.findById(doctorId);

        if (pOpt.isEmpty() || dOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid patient or doctor ID"));
        }

        String rxCode = String.format("RX-%d-%04d", java.time.Year.now().getValue(), prescriptionRepository.count() + 1);
        Prescription rx = new Prescription(rxCode, pOpt.get(), dOpt.get(), notes);

        if (itemsList != null) {
            for (Map<String, Object> itemData : itemsList) {
                Long medId = Long.valueOf(itemData.get("medicineId").toString());
                String dosage = (String) itemData.get("dosage");
                Integer duration = itemData.get("durationDays") != null ? Integer.valueOf(itemData.get("durationDays").toString()) : 5;
                Integer qty = Integer.valueOf(itemData.get("quantity").toString());

                medicineRepository.findById(medId).ifPresent(med -> {
                    PrescriptionItem item = new PrescriptionItem(med, dosage, duration, qty);
                    rx.addItem(item);
                });
            }
        }

        Prescription saved = prescriptionRepository.save(rx);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/prescriptions/{id}/dispense")
    public ResponseEntity<?> dispensePrescription(@PathVariable Long id) {
        return prescriptionRepository.findById(id).map(rx -> {
            rx.setStatus(Prescription.PrescriptionStatus.DISPENSED);

            // Deduct stock for items
            for (PrescriptionItem item : rx.getItems()) {
                Medicine med = item.getMedicine();
                if (med != null) {
                    int newStock = Math.max(0, med.getTotalStock() - item.getQuantity());
                    med.setTotalStock(newStock);
                    medicineRepository.save(med);
                }
            }

            Prescription saved = prescriptionRepository.save(rx);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }
}
