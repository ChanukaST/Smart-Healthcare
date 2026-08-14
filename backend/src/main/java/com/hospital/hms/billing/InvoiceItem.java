package com.hospital.hms.billing;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "invoice_items")
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    @JsonIgnore
    private Invoice invoice;

    @Column(nullable = false)
    private String description; // e.g., "Doctor Consultation Fee (Dr. Anura Perera)"

    @Column(nullable = false)
    private Double amountLkr;

    private String category; // CONSULTATION, PHARMACY, LABORATORY, WARD, OTHER

    public InvoiceItem() {}

    public InvoiceItem(String description, Double amountLkr, String category) {
        this.description = description;
        this.amountLkr = amountLkr;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Invoice getInvoice() { return invoice; }
    public void setInvoice(Invoice invoice) { this.invoice = invoice; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmountLkr() { return amountLkr; }
    public void setAmountLkr(Double amountLkr) { this.amountLkr = amountLkr; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
