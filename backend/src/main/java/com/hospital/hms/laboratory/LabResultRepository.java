package com.hospital.hms.laboratory;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LabResultRepository extends JpaRepository<LabResult, Long> {
    Optional<LabResult> findByLabRequestId(Long labRequestId);
}
