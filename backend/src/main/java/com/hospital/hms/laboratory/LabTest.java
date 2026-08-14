package com.hospital.hms.laboratory;

import jakarta.persistence.*;

@Entity
@Table(name = "lab_tests")
public class LabTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String testCode; // LAB-FBC, LAB-LIPID, LAB-DENGUE

    @Column(nullable = false)
    private String testName; // Full Blood Count, Dengue NS1 Antigen

    private String category; // Hematology, Biochemistry, Immunology
    private Double priceLkr; // LKR e.g. 1800.00
    private String normalRange; // Hb: 12.0 - 16.0 g/dL, WBC: 4000 - 11000 /uL
    private String sampleType; // Blood, Urine, Serum

    public LabTest() {}

    public LabTest(String testCode, String testName, String category, Double priceLkr, String normalRange, String sampleType) {
        this.testCode = testCode;
        this.testName = testName;
        this.category = category;
        this.priceLkr = priceLkr;
        this.normalRange = normalRange;
        this.sampleType = sampleType;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTestCode() { return testCode; }
    public void setTestCode(String testCode) { this.testCode = testCode; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPriceLkr() { return priceLkr; }
    public void setPriceLkr(Double priceLkr) { this.priceLkr = priceLkr; }

    public String getNormalRange() { return normalRange; }
    public void setNormalRange(String normalRange) { this.normalRange = normalRange; }

    public String getSampleType() { return sampleType; }
    public void setSampleType(String sampleType) { this.sampleType = sampleType; }
}
