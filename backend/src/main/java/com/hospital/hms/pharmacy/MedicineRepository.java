package com.hospital.hms.pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    Optional<Medicine> findByItemCode(String itemCode);
    List<Medicine> findByTotalStockLessThanEqual(Integer reorderLevel);

    @Query("SELECT m FROM Medicine m WHERE m.totalStock <= m.reorderLevel")
    List<Medicine> findLowStockMedicines();

    @Query("SELECT COUNT(m) FROM Medicine m WHERE m.totalStock <= m.reorderLevel")
    long countLowStockMedicines();
}
