package com.hospital.hms.billing;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String paymentNumber; // PAY-2026-0001

    @OneToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    private LocalDateTime paymentDate;
    private Double amountPaidLkr;
    private String paymentMethod; // CASH, CARD, ONLINE
    private String referenceNumber; // Card Auth Code / Receipt #

    @PrePersist
    protected void onCreate() {
        this.paymentDate = LocalDateTime.now();
    }

    public Payment() {}

    public Payment(String paymentNumber, Invoice invoice, Double amountPaidLkr, String paymentMethod, String referenceNumber) {
        this.paymentNumber = paymentNumber;
        this.invoice = invoice;
        this.amountPaidLkr = amountPaidLkr;
        this.paymentMethod = paymentMethod;
        this.referenceNumber = referenceNumber;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPaymentNumber() { return paymentNumber; }
    public void setPaymentNumber(String paymentNumber) { this.paymentNumber = paymentNumber; }

    public Invoice getInvoice() { return invoice; }
    public void setInvoice(Invoice invoice) { this.invoice = invoice; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }

    public Double getAmountPaidLkr() { return amountPaidLkr; }
    public void setAmountPaidLkr(Double amountPaidLkr) { this.amountPaidLkr = amountPaidLkr; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }
}
