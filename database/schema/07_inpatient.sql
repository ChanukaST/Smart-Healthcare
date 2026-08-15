-- 07_inpatient.sql: Inpatient Admissions & Ward Management
CREATE TABLE IF NOT EXISTS inpatient_admissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    ward_number VARCHAR(30) NOT NULL,
    bed_number VARCHAR(30) NOT NULL,
    admission_date DATETIME NOT NULL,
    discharge_date DATETIME,
    status VARCHAR(30) DEFAULT 'ADMITTED', -- ADMITTED, DISCHARGED, TRANSFERRED
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
