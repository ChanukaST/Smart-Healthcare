package com.hospital.hms.opd;

import com.hospital.hms.doctor.Doctor;
import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "queue_tokens")
public class QueueToken {

    public enum TokenStatus {
        WAITING,
        IN_CONSULTATION,
        COMPLETED,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String tokenNumber; // e.g. OPD-CAR-001 or TOKEN-014

    private Integer queueOrder; // 1, 2, 3...

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    private LocalDate tokenDate;

    @Enumerated(EnumType.STRING)
    private TokenStatus status = TokenStatus.WAITING;

    private LocalDateTime issuedAt;
    private LocalDateTime calledAt;
    private LocalDateTime completedAt;

    private String clinicalNotes;

    @PrePersist
    protected void onCreate() {
        this.tokenDate = LocalDate.now();
        this.issuedAt = LocalDateTime.now();
    }

    public QueueToken() {}

    public QueueToken(String tokenNumber, Integer queueOrder, Patient patient, Doctor doctor) {
        this.tokenNumber = tokenNumber;
        this.queueOrder = queueOrder;
        this.patient = patient;
        this.doctor = doctor;
        this.tokenDate = LocalDate.now();
        this.status = TokenStatus.WAITING;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTokenNumber() { return tokenNumber; }
    public void setTokenNumber(String tokenNumber) { this.tokenNumber = tokenNumber; }

    public Integer getQueueOrder() { return queueOrder; }
    public void setQueueOrder(Integer queueOrder) { this.queueOrder = queueOrder; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDate getTokenDate() { return tokenDate; }
    public void setTokenDate(LocalDate tokenDate) { this.tokenDate = tokenDate; }

    public TokenStatus getStatus() { return status; }
    public void setStatus(TokenStatus status) { this.status = status; }

    public LocalDateTime getIssuedAt() { return issuedAt; }
    public void setIssuedAt(LocalDateTime issuedAt) { this.issuedAt = issuedAt; }

    public LocalDateTime getCalledAt() { return calledAt; }
    public void setCalledAt(LocalDateTime calledAt) { this.calledAt = calledAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public String getClinicalNotes() { return clinicalNotes; }
    public void setClinicalNotes(String clinicalNotes) { this.clinicalNotes = clinicalNotes; }
}
