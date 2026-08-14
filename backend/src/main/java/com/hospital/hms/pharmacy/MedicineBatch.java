package com.hospital.hms.pharmacy;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "medicine_batches")
public class MedicineBatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String batchNumber; // BATCH-PAN-202601

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    private LocalDate manufactureDate;
    private LocalDate expiryDate;
    private Integer quantity;
    private Double unitCostLkr;

    public MedicineBatch() {}

    public MedicineBatch(String batchNumber, Medicine medicine, LocalDate manufactureDate, LocalDate expiryDate, Integer quantity, Double unitCostLkr) {
        this.batchNumber = batchNumber;
        this.medicine = medicine;
        this.manufactureDate = manufactureDate;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.unitCostLkr = unitCostLkr;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBatchNumber() { return batchNumber; }
    public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }

    public LocalDate getManufactureDate() { return manufactureDate; }
    public void setManufactureDate(LocalDate manufactureDate) { this.manufactureDate = manufactureDate; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getUnitCostLkr() { return unitCostLkr; }
    public void setUnitCostLkr(Double unitCostLkr) { this.unitCostLkr = unitCostLkr; }
}
