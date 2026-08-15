-- 06_opd.sql: OPD Queue & Visits
CREATE TABLE IF NOT EXISTS opd_visits (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    token_number INT NOT NULL,
    visit_date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'WAITING', -- WAITING, IN_PROGRESS, COMPLETED
    symptoms TEXT,
    diagnosis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
