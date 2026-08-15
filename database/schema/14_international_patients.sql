-- 14_international_patients.sql: International Patient Registration & Journey Management
CREATE TABLE IF NOT EXISTS international_patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    passport_number VARCHAR(50) NOT NULL UNIQUE,
    nationality VARCHAR(80) NOT NULL,
    country_of_residence VARCHAR(80) NOT NULL,
    email VARCHAR(150) NOT NULL,
    mobile VARCHAR(30) NOT NULL,
    journey_stage VARCHAR(50) DEFAULT 'ENQUIRY_SUBMITTED', -- ENQUIRY_SUBMITTED, DOCUMENT_UPLOADED, APPOINTMENT_CONFIRMED, ARRIVED, IN_TREATMENT, COMPLETED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
