package com.hospital.hms.inpatient;

import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admissions")
public class Admission {

    public enum AdmissionStatus {
        ADMITTED,
        DISCHARGED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String admissionCode; // ADM-2026-001

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "bed_id", nullable = false)
    private Bed bed;

    private LocalDateTime admissionDate;
    private LocalDateTime dischargeDate;

    @Enumerated(EnumType.STRING)
    private AdmissionStatus status = AdmissionStatus.ADMITTED;

    private String admissionReason;
    private String dischargeSummary;
    private String attendingDoctor;

    @PrePersist
    protected void onCreate() {
        if (this.admissionDate == null) {
            this.admissionDate = LocalDateTime.now();
        }
    }

    public Admission() {}

    public Admission(String admissionCode, Patient patient, Bed bed, String admissionReason, String attendingDoctor) {
        this.admissionCode = admissionCode;
        this.patient = patient;
        this.bed = bed;
        this.admissionReason = admissionReason;
        this.attendingDoctor = attendingDoctor;
        this.status = AdmissionStatus.ADMITTED;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdmissionCode() { return admissionCode; }
    public void setAdmissionCode(String admissionCode) { this.admissionCode = admissionCode; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Bed getBed() { return bed; }
    public void setBed(Bed bed) { this.bed = bed; }

    public LocalDateTime getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(LocalDateTime admissionDate) { this.admissionDate = admissionDate; }

    public LocalDateTime getDischargeDate() { return dischargeDate; }
    public void setDischargeDate(LocalDateTime dischargeDate) { this.dischargeDate = dischargeDate; }

    public AdmissionStatus getStatus() { return status; }
    public void setStatus(AdmissionStatus status) { this.status = status; }

    public String getAdmissionReason() { return admissionReason; }
    public void setAdmissionReason(String admissionReason) { this.admissionReason = admissionReason; }

    public String getDischargeSummary() { return dischargeSummary; }
    public void setDischargeSummary(String dischargeSummary) { this.dischargeSummary = dischargeSummary; }

    public String getAttendingDoctor() { return attendingDoctor; }
    public void setAttendingDoctor(String attendingDoctor) { this.attendingDoctor = attendingDoctor; }
}
