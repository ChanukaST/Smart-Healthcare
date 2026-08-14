package com.hospital.hms.pharmacy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "prescription_items")
public class PrescriptionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prescription_id", nullable = false)
    @JsonIgnore
    private Prescription prescription;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    private String dosage; // e.g., "1-1-1 after meals"
    private Integer durationDays; // e.g., 5
    private Integer quantity; // total count e.g., 15 tablets

    public PrescriptionItem() {}

    public PrescriptionItem(Medicine medicine, String dosage, Integer durationDays, Integer quantity) {
        this.medicine = medicine;
        this.dosage = dosage;
        this.durationDays = durationDays;
        this.quantity = quantity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Prescription getPrescription() { return prescription; }
    public void setPrescription(Prescription prescription) { this.prescription = prescription; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
