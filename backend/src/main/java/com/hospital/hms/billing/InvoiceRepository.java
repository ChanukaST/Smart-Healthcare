package com.hospital.hms.billing;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByPatientId(Long patientId);
    List<Invoice> findByStatus(Invoice.InvoiceStatus status);
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
}
