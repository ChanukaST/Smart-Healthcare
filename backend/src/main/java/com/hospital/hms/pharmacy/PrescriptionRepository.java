package com.hospital.hms.pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    List<Prescription> findByStatusOrderByPrescribedDateDesc(Prescription.PrescriptionStatus status);
    List<Prescription> findByPatientIdOrderByPrescribedDateDesc(Long patientId);
}
