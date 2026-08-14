package com.hospital.hms.laboratory;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_results")
public class LabResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "lab_request_id", nullable = false)
    private LabRequest labRequest;

    @Column(columnDefinition = "TEXT")
    private String resultDetails; // e.g. "Hemoglobin: 14.2 g/dL, RBC: 4.8 million/uL, Platelets: 250,000 /uL"

    private String technicianName;
    private LocalDateTime resultDate;
    private String remarks; // "Normal parameters"

    @PrePersist
    protected void onCreate() {
        this.resultDate = LocalDateTime.now();
    }

    public LabResult() {}

    public LabResult(LabRequest labRequest, String resultDetails, String technicianName, String remarks) {
        this.labRequest = labRequest;
        this.resultDetails = resultDetails;
        this.technicianName = technicianName;
        this.remarks = remarks;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LabRequest getLabRequest() { return labRequest; }
    public void setLabRequest(LabRequest labRequest) { this.labRequest = labRequest; }

    public String getResultDetails() { return resultDetails; }
    public void setResultDetails(String resultDetails) { this.resultDetails = resultDetails; }

    public String getTechnicianName() { return technicianName; }
    public void setTechnicianName(String technicianName) { this.technicianName = technicianName; }

    public LocalDateTime getResultDate() { return resultDate; }
    public void setResultDate(LocalDateTime resultDate) { this.resultDate = resultDate; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
