package com.hospital.hms.inpatient;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WardRepository extends JpaRepository<Ward, Long> {
    Optional<Ward> findByWardCode(String wardCode);
}
