package com.hospital.hms.feedback;

import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "patient_feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    private Integer rating; // 1 to 5 stars

    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;

    private String sentimentLabel = "POSITIVE"; // POSITIVE, NEUTRAL, NEGATIVE
    private Double sentimentConfidence = 85.0;

    private LocalDateTime submittedAt;

    @PrePersist
    protected void onCreate() {
        this.submittedAt = LocalDateTime.now();
    }

    public Feedback() {}

    public Feedback(Patient patient, Integer rating, String comment, String sentimentLabel, Double sentimentConfidence) {
        this.patient = patient;
        this.rating = rating;
        this.comment = comment;
        this.sentimentLabel = sentimentLabel;
        this.sentimentConfidence = sentimentConfidence;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getSentimentLabel() { return sentimentLabel; }
    public void setSentimentLabel(String sentimentLabel) { this.sentimentLabel = sentimentLabel; }

    public Double getSentimentConfidence() { return sentimentConfidence; }
    public void setSentimentConfidence(Double sentimentConfidence) { this.sentimentConfidence = sentimentConfidence; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
