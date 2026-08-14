package com.hospital.hms.doctor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@SuppressWarnings("null")
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;

    public DoctorController(DoctorRepository doctorRepository, DepartmentRepository departmentRepository) {
        this.doctorRepository = doctorRepository;
        this.departmentRepository = departmentRepository;
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody Doctor doctor) {
        if (doctor.getDoctorCode() == null || doctor.getDoctorCode().isEmpty()) {
            doctor.setDoctorCode("DOC-" + String.format("%03d", doctorRepository.count() + 1));
        }
        Doctor saved = doctorRepository.save(doctor);
        return ResponseEntity.ok(saved);
    }
}
