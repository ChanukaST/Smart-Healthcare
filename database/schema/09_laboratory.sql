-- 09_laboratory.sql: Laboratory Requests and Reports
CREATE TABLE IF NOT EXISTS lab_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    test_name VARCHAR(150) NOT NULL,
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, COMPLETED, REVIEWED
    requested_date DATE NOT NULL,
    result_summary TEXT,
    report_file_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
