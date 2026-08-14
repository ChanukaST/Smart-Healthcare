package com.hospital.hms.inpatient;

import jakarta.persistence.*;

@Entity
@Table(name = "wards")
public class Ward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String wardCode; // WARD-M1, WARD-F1, ICU-01

    @Column(nullable = false)
    private String wardName; // Male Medical Ward, Intensive Care Unit

    private String category; // MALE, FEMALE, ICU, SURGICAL, MATERNITY
    private Integer totalBeds;
    private Double dailyRateLkr; // Bed charge per day in LKR e.g. 3500.00

    public Ward() {}

    public Ward(String wardCode, String wardName, String category, Integer totalBeds, Double dailyRateLkr) {
        this.wardCode = wardCode;
        this.wardName = wardName;
        this.category = category;
        this.totalBeds = totalBeds;
        this.dailyRateLkr = dailyRateLkr;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWardCode() { return wardCode; }
    public void setWardCode(String wardCode) { this.wardCode = wardCode; }

    public String getWardName() { return wardName; }
    public void setWardName(String wardName) { this.wardName = wardName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getTotalBeds() { return totalBeds; }
    public void setTotalBeds(Integer totalBeds) { this.totalBeds = totalBeds; }

    public Double getDailyRateLkr() { return dailyRateLkr; }
    public void setDailyRateLkr(Double dailyRateLkr) { this.dailyRateLkr = dailyRateLkr; }
}
