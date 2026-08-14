package com.hospital.hms.laboratory;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "lab_requests")
public class LabRequest {

    public enum RequestStatus {
        PENDING,
        SAMPLE_COLLECTED,
        COMPLETED,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String requestCode; // REQ-2026-0001

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "lab_test_id", nullable = false)
    private LabTest labTest;

    private LocalDateTime requestedDate;
    private LocalDateTime sampleCollectedAt;
    private LocalDateTime completedAt;

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;

    private String clinicalNotes;

    @PrePersist
    protected void onCreate() {
        this.requestedDate = LocalDateTime.now();
    }

    public LabRequest() {}

    public LabRequest(String requestCode, Patient patient, Doctor doctor, LabTest labTest, String clinicalNotes) {
        this.requestCode = requestCode;
        this.patient = patient;
        this.doctor = doctor;
        this.labTest = labTest;
        this.clinicalNotes = clinicalNotes;
        this.status = RequestStatus.PENDING;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRequestCode() { return requestCode; }
    public void setRequestCode(String requestCode) { this.requestCode = requestCode; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LabTest getLabTest() { return labTest; }
    public void setLabTest(LabTest labTest) { this.labTest = labTest; }

    public LocalDateTime getRequestedDate() { return requestedDate; }
    public void setRequestedDate(LocalDateTime requestedDate) { this.requestedDate = requestedDate; }

    public LocalDateTime getSampleCollectedAt() { return sampleCollectedAt; }
    public void setSampleCollectedAt(LocalDateTime sampleCollectedAt) { this.sampleCollectedAt = sampleCollectedAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    public String getClinicalNotes() { return clinicalNotes; }
    public void setClinicalNotes(String clinicalNotes) { this.clinicalNotes = clinicalNotes; }
}
