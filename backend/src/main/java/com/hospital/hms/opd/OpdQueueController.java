package com.hospital.hms.opd;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.doctor.DoctorRepository;
import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/opd")
@SuppressWarnings("null")
public class OpdQueueController {

    private final OpdQueueRepository queueRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public OpdQueueController(OpdQueueRepository queueRepository, PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.queueRepository = queueRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/queue")
    public List<QueueToken> getTodayQueue(@RequestParam(required = false) Long doctorId) {
        LocalDate today = LocalDate.now();
        if (doctorId != null) {
            return queueRepository.findByDoctorIdAndTokenDateOrderByQueueOrderAsc(doctorId, today);
        }
        return queueRepository.findByTokenDateOrderByQueueOrderAsc(today);
    }

    @PostMapping("/issue-token")
    public ResponseEntity<?> issueToken(@RequestBody Map<String, Long> request) {
        Long patientId = request.get("patientId");
        Long doctorId = request.get("doctorId");

        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);

        if (patientOpt.isEmpty() || doctorOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid patient ID or doctor ID"));
        }

        Doctor doctor = doctorOpt.get();
        Patient patient = patientOpt.get();
        LocalDate today = LocalDate.now();

        long currentCount = queueRepository.countByDoctorIdAndTokenDate(doctorId, today);
        int nextOrder = (int) currentCount + 1;

        String deptPrefix = doctor.getDepartment() != null ? doctor.getDepartment().getName().substring(0, 3).toUpperCase() : "OPD";
        String tokenNum = String.format("%s-%03d", deptPrefix, nextOrder);

        QueueToken token = new QueueToken(tokenNum, nextOrder, patient, doctor);
        QueueToken saved = queueRepository.save(token);

        return ResponseEntity.ok(saved);
    }

    @PutMapping("/token/{id}/status")
    public ResponseEntity<?> updateTokenStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String statusStr = request.get("status");
        String notes = request.get("clinicalNotes");

        return queueRepository.findById(id).map(token -> {
            try {
                QueueToken.TokenStatus status = QueueToken.TokenStatus.valueOf(statusStr.toUpperCase());
                token.setStatus(status);

                if (status == QueueToken.TokenStatus.IN_CONSULTATION) {
                    token.setCalledAt(LocalDateTime.now());
                } else if (status == QueueToken.TokenStatus.COMPLETED) {
                    token.setCompletedAt(LocalDateTime.now());
                }

                if (notes != null) {
                    token.setClinicalNotes(notes);
                }

                QueueToken saved = queueRepository.save(token);
                return ResponseEntity.ok(saved);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid token status: " + statusStr));
            }
        }).orElse(ResponseEntity.notFound().build());
    }
}
