package com.hospital.hms.pharmacy;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PharmacyRepository {

    interface MedicineRepository extends JpaRepository<Medicine, Long> {
        Optional<Medicine> findByItemCode(String itemCode);
        List<Medicine> findByTotalStockLessThanEqual(Integer reorderLevel);
    }

    interface MedicineBatchRepository extends JpaRepository<MedicineBatch, Long> {
        List<MedicineBatch> findByMedicineIdOrderByExpiryDateAsc(Long medicineId);
    }

    interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
        List<Prescription> findByStatusOrderByPrescribedDateDesc(Prescription.PrescriptionStatus status);
        List<Prescription> findByPatientIdOrderByPrescribedDateDesc(Long patientId);
    }
}
