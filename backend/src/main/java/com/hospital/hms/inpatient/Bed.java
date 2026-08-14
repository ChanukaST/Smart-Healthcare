package com.hospital.hms.inpatient;

import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

@Entity
@Table(name = "beds")
public class Bed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String bedCode; // e.g. M1-B01

    @ManyToOne
    @JoinColumn(name = "ward_id", nullable = false)
    private Ward ward;

    private boolean isOccupied = false;

    @ManyToOne
    @JoinColumn(name = "current_patient_id")
    private Patient currentPatient;

    public Bed() {}

    public Bed(String bedCode, Ward ward) {
        this.bedCode = bedCode;
        this.ward = ward;
        this.isOccupied = false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBedCode() { return bedCode; }
    public void setBedCode(String bedCode) { this.bedCode = bedCode; }

    public Ward getWard() { return ward; }
    public void setWard(Ward ward) { this.ward = ward; }

    public boolean isOccupied() { return isOccupied; }
    public void setOccupied(boolean occupied) { isOccupied = occupied; }

    public Patient getCurrentPatient() { return currentPatient; }
    public void setCurrentPatient(Patient currentPatient) { this.currentPatient = currentPatient; }
}
