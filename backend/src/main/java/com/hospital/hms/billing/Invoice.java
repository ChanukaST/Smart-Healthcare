package com.hospital.hms.billing;

import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invoices")
public class Invoice {

    public enum InvoiceStatus {
        PENDING,
        PAID,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String invoiceNumber; // INV-2026-0001

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    private LocalDateTime createdAt;
    private LocalDateTime paidAt;

    private Double consultationChargesLkr = 0.0;
    private Double pharmacyChargesLkr = 0.0;
    private Double labChargesLkr = 0.0;
    private Double roomChargesLkr = 0.0;
    private Double additionalChargesLkr = 0.0;

    private Double totalAmountLkr = 0.0;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus status = InvoiceStatus.PENDING;

    private String paymentMethod; // CASH, CARD, INSURANCE

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceItem> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Invoice() {}

    public Invoice(String invoiceNumber, Patient patient) {
        this.invoiceNumber = invoiceNumber;
        this.patient = patient;
        this.status = InvoiceStatus.PENDING;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getPaidAt() { return paidAt; }
    public void setPaidAt(LocalDateTime paidAt) { this.paidAt = paidAt; }

    public Double getConsultationChargesLkr() { return consultationChargesLkr; }
    public void setConsultationChargesLkr(Double consultationChargesLkr) { this.consultationChargesLkr = consultationChargesLkr; }

    public Double getPharmacyChargesLkr() { return pharmacyChargesLkr; }
    public void setPharmacyChargesLkr(Double pharmacyChargesLkr) { this.pharmacyChargesLkr = pharmacyChargesLkr; }

    public Double getLabChargesLkr() { return labChargesLkr; }
    public void setLabChargesLkr(Double labChargesLkr) { this.labChargesLkr = labChargesLkr; }

    public Double getRoomChargesLkr() { return roomChargesLkr; }
    public void setRoomChargesLkr(Double roomChargesLkr) { this.roomChargesLkr = roomChargesLkr; }

    public Double getAdditionalChargesLkr() { return additionalChargesLkr; }
    public void setAdditionalChargesLkr(Double additionalChargesLkr) { this.additionalChargesLkr = additionalChargesLkr; }

    public Double getTotalAmountLkr() { return totalAmountLkr; }
    public void setTotalAmountLkr(Double totalAmountLkr) { this.totalAmountLkr = totalAmountLkr; }

    public InvoiceStatus getStatus() { return status; }
    public void setStatus(InvoiceStatus status) { this.status = status; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public List<InvoiceItem> getItems() { return items; }
    public void setItems(List<InvoiceItem> items) { this.items = items; }

    public void addItem(InvoiceItem item) {
        items.add(item);
        item.setInvoice(this);
    }
}
