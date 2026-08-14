package com.hospital.hms.international;

import com.hospital.hms.patient.Patient;
import jakarta.persistence.*;

@Entity
@Table(name = "international_patient_details")
public class InternationalPatientDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Column(nullable = false)
    private String passportNumber; // N9821456

    private String nationality; // British, German, Maldivian
    private String countryOfResidence; // United Kingdom, Germany
    private String preferredLanguage; // English, German, Dhivehi
    private String preferredCurrency; // USD, EUR, GBP

    @Column(columnDefinition = "TEXT")
    private String treatmentEnquiryNotes;

    @Column(columnDefinition = "TEXT")
    private String travelCoordinationDetails;

    private String status = "ENQUIRY_SUBMITTED"; // ENQUIRY_SUBMITTED, REVIEWED, CONFIRMED, ARRIVED

    public InternationalPatientDetails() {}

    public InternationalPatientDetails(Patient patient, String passportNumber, String nationality, String countryOfResidence, String preferredLanguage, String preferredCurrency, String treatmentEnquiryNotes) {
        this.patient = patient;
        this.passportNumber = passportNumber;
        this.nationality = nationality;
        this.countryOfResidence = countryOfResidence;
        this.preferredLanguage = preferredLanguage;
        this.preferredCurrency = preferredCurrency;
        this.treatmentEnquiryNotes = treatmentEnquiryNotes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public String getPassportNumber() { return passportNumber; }
    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getCountryOfResidence() { return countryOfResidence; }
    public void setCountryOfResidence(String countryOfResidence) { this.countryOfResidence = countryOfResidence; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public String getPreferredCurrency() { return preferredCurrency; }
    public void setPreferredCurrency(String preferredCurrency) { this.preferredCurrency = preferredCurrency; }

    public String getTreatmentEnquiryNotes() { return treatmentEnquiryNotes; }
    public void setTreatmentEnquiryNotes(String treatmentEnquiryNotes) { this.treatmentEnquiryNotes = treatmentEnquiryNotes; }

    public String getTravelCoordinationDetails() { return travelCoordinationDetails; }
    public void setTravelCoordinationDetails(String travelCoordinationDetails) { this.travelCoordinationDetails = travelCoordinationDetails; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
