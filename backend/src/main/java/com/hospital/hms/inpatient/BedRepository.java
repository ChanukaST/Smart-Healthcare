package com.hospital.hms.inpatient;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByWardId(Long wardId);
    List<Bed> findByIsOccupied(boolean isOccupied);
    long countByIsOccupied(boolean isOccupied);
}
