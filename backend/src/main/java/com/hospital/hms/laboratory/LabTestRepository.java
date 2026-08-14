package com.hospital.hms.laboratory;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {
    Optional<LabTest> findByTestCode(String testCode);
}
