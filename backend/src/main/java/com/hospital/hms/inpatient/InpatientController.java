package com.hospital.hms.inpatient;

import com.hospital.hms.patient.Patient;
import com.hospital.hms.patient.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/inpatient")
@SuppressWarnings("null")
public class InpatientController {

    private final WardRepository wardRepository;
    private final BedRepository bedRepository;
    private final AdmissionRepository admissionRepository;
    private final PatientRepository patientRepository;

    public InpatientController(WardRepository wardRepository,
                               BedRepository bedRepository,
                               AdmissionRepository admissionRepository,
                               PatientRepository patientRepository) {
        this.wardRepository = wardRepository;
        this.bedRepository = bedRepository;
        this.admissionRepository = admissionRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping("/wards")
    public List<Ward> getWards() {
        return wardRepository.findAll();
    }

    @PostMapping("/wards")
    public ResponseEntity<?> createWard(@RequestBody Ward ward) {
        if (ward.getWardCode() == null || ward.getWardCode().isEmpty()) {
            ward.setWardCode("WRD-" + String.format("%02d", wardRepository.count() + 1));
        }
        Ward saved = wardRepository.save(ward);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/wards/{id}")
    public ResponseEntity<?> deleteWard(@PathVariable Long id) {
        if (!wardRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        wardRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Ward deleted successfully"));
    }

    @GetMapping("/beds")
    public List<Bed> getBeds(@RequestParam(required = false) Long wardId) {
        if (wardId != null) {
            return bedRepository.findByWardId(wardId);
        }
        return bedRepository.findAll();
    }

    @PostMapping("/beds")
    public ResponseEntity<?> createBed(@RequestBody Map<String, Object> req) {
        Long wardId = Long.valueOf(req.get("wardId").toString());
        String bedCode = (String) req.get("bedCode");

        Optional<Ward> wOpt = wardRepository.findById(wardId);
        if (wOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid ward ID"));
        }

        Bed bed = new Bed(bedCode, wOpt.get());
        Bed saved = bedRepository.save(bed);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/beds/{id}")
    public ResponseEntity<?> deleteBed(@PathVariable Long id) {
        Optional<Bed> bOpt = bedRepository.findById(id);
        if (bOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Bed bed = bOpt.get();
        if (bed.isOccupied()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Cannot delete occupied bed"));
        }
        bedRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Bed deleted successfully"));
    }

    @GetMapping("/admissions")
    public List<Admission> getAdmissions(@RequestParam(required = false) String status) {
        if ("ADMITTED".equalsIgnoreCase(status)) {
            return admissionRepository.findByStatus(Admission.AdmissionStatus.ADMITTED);
        }
        return admissionRepository.findAll();
    }

    @PostMapping("/admit")
    public ResponseEntity<?> admitPatient(@RequestBody Map<String, Object> request) {
        Long patientId = Long.valueOf(request.get("patientId").toString());
        Long bedId = Long.valueOf(request.get("bedId").toString());
        String reason = (String) request.get("admissionReason");
        String doctor = (String) request.get("attendingDoctor");

        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        Optional<Bed> bedOpt = bedRepository.findById(bedId);

        if (patientOpt.isEmpty() || bedOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid patient or bed ID"));
        }

        Bed bed = bedOpt.get();
        if (bed.isOccupied()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Bed " + bed.getBedCode() + " is already occupied"));
        }

        Patient patient = patientOpt.get();
        bed.setOccupied(true);
        bed.setCurrentPatient(patient);
        bedRepository.save(bed);

        String admCode = String.format("ADM-%d-%04d", java.time.Year.now().getValue(), admissionRepository.count() + 1);
        Admission admission = new Admission(admCode, patient, bed, reason, doctor);
        Admission saved = admissionRepository.save(admission);

        return ResponseEntity.ok(saved);
    }

    @PostMapping("/discharge/{admissionId}")
    public ResponseEntity<?> dischargePatient(@PathVariable Long admissionId, @RequestBody(required = false) Map<String, String> request) {
        String summary = (request != null && request.containsKey("dischargeSummary"))
                ? request.get("dischargeSummary")
                : "Patient recovered satisfactorily. Prescribed rest and follow-up.";

        return admissionRepository.findById(admissionId).map(admission -> {
            admission.setStatus(Admission.AdmissionStatus.DISCHARGED);
            admission.setDischargeDate(LocalDateTime.now());
            admission.setDischargeSummary(summary);

            Bed bed = admission.getBed();
            if (bed != null) {
                bed.setOccupied(false);
                bed.setCurrentPatient(null);
                bedRepository.save(bed);
            }

            Admission saved = admissionRepository.save(admission);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/discharge-bed/{bedId}")
    public ResponseEntity<?> dischargeBed(@PathVariable Long bedId, @RequestBody(required = false) Map<String, String> request) {
        String summary = (request != null && request.containsKey("dischargeSummary"))
                ? request.get("dischargeSummary")
                : "Discharged from bed and released.";

        Optional<Bed> bedOpt = bedRepository.findById(bedId);
        if (bedOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Bed bed = bedOpt.get();
        bed.setOccupied(false);
        bed.setCurrentPatient(null);
        bedRepository.save(bed);

        List<Admission> activeAdms = admissionRepository.findByBedIdAndStatus(bedId, Admission.AdmissionStatus.ADMITTED);
        for (Admission adm : activeAdms) {
            adm.setStatus(Admission.AdmissionStatus.DISCHARGED);
            adm.setDischargeDate(LocalDateTime.now());
            adm.setDischargeSummary(summary);
            admissionRepository.save(adm);
        }

        return ResponseEntity.ok(Map.of("message", "Bed discharged and released successfully", "bedId", bedId));
    }
}
