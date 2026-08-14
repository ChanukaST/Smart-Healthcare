package com.hospital.hms.inpatient;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InpatientRepository {
    interface WardRepository extends JpaRepository<Ward, Long> {
        Optional<Ward> findByWardCode(String wardCode);
    }

    interface BedRepository extends JpaRepository<Bed, Long> {
        List<Bed> findByWardId(Long wardId);
        List<Bed> findByIsOccupied(boolean isOccupied);
    }

    interface AdmissionRepository extends JpaRepository<Admission, Long> {
        List<Admission> findByStatus(Admission.AdmissionStatus status);
        Optional<Admission> findByPatientIdAndStatus(Long patientId, Admission.AdmissionStatus status);
    }
}
