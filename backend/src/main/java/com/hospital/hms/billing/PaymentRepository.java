package com.hospital.hms.billing;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByInvoiceId(Long invoiceId);
}
