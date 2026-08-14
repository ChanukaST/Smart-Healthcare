package com.hospital.hms.pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicineBatchRepository extends JpaRepository<MedicineBatch, Long> {
    List<MedicineBatch> findByMedicineIdOrderByExpiryDateAsc(Long medicineId);
}
