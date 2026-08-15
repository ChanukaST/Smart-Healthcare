-- 04_departments.sql: Hospital Departments
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    head_doctor_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
