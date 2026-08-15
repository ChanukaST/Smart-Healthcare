-- 02_patients.sql: Patients Profile Schema
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE,
    patient_code VARCHAR(20) NOT NULL UNIQUE,
    dob DATE,
    gender VARCHAR(15),
    blood_group VARCHAR(5),
    address TEXT,
    emergency_contact VARCHAR(20),
    allergies TEXT,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
