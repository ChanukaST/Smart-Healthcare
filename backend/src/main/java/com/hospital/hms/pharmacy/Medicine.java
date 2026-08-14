package com.hospital.hms.pharmacy;

import jakarta.persistence.*;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String itemCode; // MED-PAN-500

    @Column(nullable = false)
    private String genericName; // Paracetamol

    private String brandName; // Panadol, Calpol
    private String category; // Analgesic, Antibiotic, Antihistamine, Antacid
    private Double unitPriceLkr; // LKR e.g. 15.00 per tablet
    private Integer totalStock = 0;
    private Integer reorderLevel = 100;

    public Medicine() {}

    public Medicine(String itemCode, String genericName, String brandName, String category, Double unitPriceLkr, Integer reorderLevel) {
        this.itemCode = itemCode;
        this.genericName = genericName;
        this.brandName = brandName;
        this.category = category;
        this.unitPriceLkr = unitPriceLkr;
        this.reorderLevel = reorderLevel;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemCode() { return itemCode; }
    public void setItemCode(String itemCode) { this.itemCode = itemCode; }

    public String getGenericName() { return genericName; }
    public void setGenericName(String genericName) { this.genericName = genericName; }

    public String getBrandName() { return brandName; }
    public void setBrandName(String brandName) { this.brandName = brandName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getUnitPriceLkr() { return unitPriceLkr; }
    public void setUnitPriceLkr(Double unitPriceLkr) { this.unitPriceLkr = unitPriceLkr; }

    public Integer getTotalStock() { return totalStock; }
    public void setTotalStock(Integer totalStock) { this.totalStock = totalStock; }

    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }
}
