package com.hospital.hms.laboratory;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.doctor.DoctorRepository;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/laboratory")
@SuppressWarnings("null")
public class LaboratoryController {

    private final LabTestRepository testRepository;
    private final LabRequestRepository requestRepository;
    private final LabResultRepository resultRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public LaboratoryController(LabTestRepository testRepository,
                                LabRequestRepository requestRepository,
                                LabResultRepository resultRepository,
                                PatientRepository patientRepository,
                                DoctorRepository doctorRepository) {
        this.testRepository = testRepository;
        this.requestRepository = requestRepository;
        this.resultRepository = resultRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/tests")
    public List<LabTest> getAllTests() {
        return testRepository.findAll();
    }

    @PostMapping("/tests")
    public ResponseEntity<?> addTest(@RequestBody LabTest test) {
        if (test.getTestCode() == null || test.getTestCode().isEmpty()) {
            test.setTestCode("LAB-" + String.format("%03d", testRepository.count() + 1));
        }
        LabTest saved = testRepository.save(test);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/requests")
    public List<LabRequest> getRequests(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            try {
                LabRequest.RequestStatus st = LabRequest.RequestStatus.valueOf(status.toUpperCase());
                return requestRepository.findByStatusOrderByRequestedDateDesc(st);
            } catch (IllegalArgumentException e) {
                // Return all if invalid status
            }
        }
        return requestRepository.findAll();
    }

    @PostMapping("/requests")
    public ResponseEntity<?> createRequest(@RequestBody Map<String, Object> reqData) {
        Long patientId = Long.valueOf(reqData.get("patientId").toString());
        Long doctorId = Long.valueOf(reqData.get("doctorId").toString());
        Long labTestId = Long.valueOf(reqData.get("labTestId").toString());
        String notes = (String) reqData.get("clinicalNotes");

        Optional<Patient> pOpt = patientRepository.findById(patientId);
        Optional<Doctor> dOpt = doctorRepository.findById(doctorId);
        Optional<LabTest> tOpt = testRepository.findById(labTestId);

        if (pOpt.isEmpty() || dOpt.isEmpty() || tOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid patient, doctor, or lab test ID"));
        }

        String reqCode = String.format("REQ-%d-%04d", java.time.Year.now().getValue(), requestRepository.count() + 1);
        LabRequest request = new LabRequest(reqCode, pOpt.get(), dOpt.get(), tOpt.get(), notes);
        LabRequest saved = requestRepository.save(request);

        return ResponseEntity.ok(saved);
    }

    @PutMapping("/requests/{id}/sample-collected")
    public ResponseEntity<?> collectSample(@PathVariable Long id) {
        return requestRepository.findById(id).map(req -> {
            req.setStatus(LabRequest.RequestStatus.SAMPLE_COLLECTED);
            req.setSampleCollectedAt(LocalDateTime.now());
            LabRequest saved = requestRepository.save(req);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/requests/{id}/results")
    public ResponseEntity<?> enterResult(@PathVariable Long id, @RequestBody Map<String, String> resultData) {
        String details = resultData.get("resultDetails");
        String techName = resultData.get("technicianName");
        String remarks = resultData.get("remarks");

        return requestRepository.findById(id).map(req -> {
            req.setStatus(LabRequest.RequestStatus.COMPLETED);
            req.setCompletedAt(LocalDateTime.now());
            requestRepository.save(req);

            LabResult result = new LabResult(req, details, techName, remarks);
            LabResult savedResult = resultRepository.save(result);

            return ResponseEntity.ok(savedResult);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/requests/{id}/results")
    public ResponseEntity<?> getResult(@PathVariable Long id) {
        return resultRepository.findByLabRequestId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
