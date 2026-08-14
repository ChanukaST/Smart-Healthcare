package com.hospital.hms.international;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InternationalPatientRepository extends JpaRepository<InternationalPatientDetails, Long> {
    Optional<InternationalPatientDetails> findByPatientId(Long patientId);
    Optional<InternationalPatientDetails> findByPassportNumber(String passportNumber);
}
