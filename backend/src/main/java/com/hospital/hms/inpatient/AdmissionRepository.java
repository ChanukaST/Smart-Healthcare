package com.hospital.hms.inpatient;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {
    List<Admission> findByStatus(Admission.AdmissionStatus status);
    Optional<Admission> findByPatientIdAndStatus(Long patientId, Admission.AdmissionStatus status);
    List<Admission> findByBedIdAndStatus(Long bedId, Admission.AdmissionStatus status);
    Optional<Admission> findFirstByBedIdAndStatus(Long bedId, Admission.AdmissionStatus status);
}
