package com.hospital.hms.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPatientId(String patientId);
    Optional<Patient> findByNicPassport(String nicPassport);

    @Query("SELECT p FROM Patient p WHERE LOWER(p.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.nicPassport) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.patientId) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.phone) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Patient> searchPatients(@Param("query") String query);
}
