package com.hospital.hms.pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Optional<Medicine> findByItemCode(String itemCode);
    List<Medicine> findByTotalStockLessThanEqual(Integer reorderLevel);
}
