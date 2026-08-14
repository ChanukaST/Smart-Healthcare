package com.hospital.hms.doctor;

import com.hospital.hms.auth.User;
import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String doctorCode; // DOC-001

    @Column(nullable = false)
    private String name; // Dr. Anura Perera

    private String qualification; // MBBS, MD (Cardiology)
    private String specialization; // Cardiology

    private Double consultationFee; // LKR e.g. 2500.00
    private String roomNumber; // Clinic Room 102
    private String availableDays; // Mon, Wed, Fri (09:00 - 13:00)

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Doctor() {}

    public Doctor(String doctorCode, String name, String qualification, String specialization, Double consultationFee, String roomNumber, String availableDays, Department department) {
        this.doctorCode = doctorCode;
        this.name = name;
        this.qualification = qualification;
        this.specialization = specialization;
        this.consultationFee = consultationFee;
        this.roomNumber = roomNumber;
        this.availableDays = availableDays;
        this.department = department;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDoctorCode() { return doctorCode; }
    public void setDoctorCode(String doctorCode) { this.doctorCode = doctorCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public Double getConsultationFee() { return consultationFee; }
    public void setConsultationFee(Double consultationFee) { this.consultationFee = consultationFee; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

    public String getAvailableDays() { return availableDays; }
    public void setAvailableDays(String availableDays) { this.availableDays = availableDays; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
