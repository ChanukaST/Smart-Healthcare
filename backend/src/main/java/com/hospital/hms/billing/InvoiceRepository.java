package com.hospital.hms.billing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByPatientId(Long patientId);
    List<Invoice> findByStatus(Invoice.InvoiceStatus status);
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);

    @Query("SELECT COALESCE(SUM(i.totalAmountLkr), 0) FROM Invoice i WHERE i.status = :status")
    Double sumTotalAmountLkrByStatus(@Param("status") Invoice.InvoiceStatus status);
}
