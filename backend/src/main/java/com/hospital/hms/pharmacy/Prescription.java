package com.hospital.hms.pharmacy;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    public enum PrescriptionStatus {
        PENDING,
        DISPENSED,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String prescriptionCode; // RX-2026-0001

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    private LocalDateTime prescribedDate;

    @Enumerated(EnumType.STRING)
    private PrescriptionStatus status = PrescriptionStatus.PENDING;

    private String notes;

    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrescriptionItem> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.prescribedDate = LocalDateTime.now();
    }

    public Prescription() {}

    public Prescription(String prescriptionCode, Patient patient, Doctor doctor, String notes) {
        this.prescriptionCode = prescriptionCode;
        this.patient = patient;
        this.doctor = doctor;
        this.notes = notes;
        this.status = PrescriptionStatus.PENDING;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPrescriptionCode() { return prescriptionCode; }
    public void setPrescriptionCode(String prescriptionCode) { this.prescriptionCode = prescriptionCode; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDateTime getPrescribedDate() { return prescribedDate; }
    public void setPrescribedDate(LocalDateTime prescribedDate) { this.prescribedDate = prescribedDate; }

    public PrescriptionStatus getStatus() { return status; }
    public void setStatus(PrescriptionStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<PrescriptionItem> getItems() { return items; }
    public void setItems(List<PrescriptionItem> items) { this.items = items; }

    public void addItem(PrescriptionItem item) {
        items.add(item);
        item.setPrescription(this);
    }
}
