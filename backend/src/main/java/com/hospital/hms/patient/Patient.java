package com.hospital.hms.patient;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String patientId; // e.g. PAT-2026-0001

    @Column(unique = true, nullable = false)
    private String nicPassport; // e.g. 921543820V or 199512345678

    @Column(nullable = false)
    private String fullName;

    private Integer age;
    private String gender; // MALE, FEMALE, OTHER
    private String phone; // +94 77 123 4567
    private String address;
    private String district; // Colombo, Kandy, Galle, etc.
    private String bloodGroup; // A+, B+, O+, AB+, etc.
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String medicalHistory;

    private LocalDateTime registeredAt;

    @PrePersist
    protected void onCreate() {
        this.registeredAt = LocalDateTime.now();
    }

    public Patient() {}

    public Patient(String patientId, String nicPassport, String fullName, Integer age, String gender, String phone, String address, String district, String bloodGroup) {
        this.patientId = patientId;
        this.nicPassport = nicPassport;
        this.fullName = fullName;
        this.age = age;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.district = district;
        this.bloodGroup = bloodGroup;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getNicPassport() { return nicPassport; }
    public void setNicPassport(String nicPassport) { this.nicPassport = nicPassport; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getEmergencyContactName() { return emergencyContactName; }
    public void setEmergencyContactName(String emergencyContactName) { this.emergencyContactName = emergencyContactName; }

    public String getEmergencyContactPhone() { return emergencyContactPhone; }
    public void setEmergencyContactPhone(String emergencyContactPhone) { this.emergencyContactPhone = emergencyContactPhone; }

    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }

    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; }
}
