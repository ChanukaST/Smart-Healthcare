-- ==========================================================
-- SMART SRI LANKAN HEALTHCARE MANAGEMENT PLATFORM (CarePlus)
-- Complete Database Initialization & Seed Script for MySQL (XAMPP)
-- Database Name: lanka_hms_db
-- ==========================================================

CREATE DATABASE IF NOT EXISTS lanka_hms_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE lanka_hms_db;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB;

-- 3. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    qualification VARCHAR(150),
    specialization VARCHAR(100) NOT NULL,
    consultation_fee DECIMAL(10,2) DEFAULT 0.00,
    room_number VARCHAR(50),
    available_days VARCHAR(150),
    department_id BIGINT,
    user_id BIGINT UNIQUE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL UNIQUE,
    nic_passport VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    age INT,
    gender VARCHAR(20),
    phone VARCHAR(30),
    address TEXT,
    district VARCHAR(80),
    blood_group VARCHAR(10),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(30),
    medical_history TEXT,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. International Patient Details Table
CREATE TABLE IF NOT EXISTS international_patient_details (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT UNIQUE,
    passport_number VARCHAR(50) NOT NULL,
    nationality VARCHAR(80) NOT NULL,
    country_of_residence VARCHAR(80) NOT NULL,
    preferred_language VARCHAR(50) DEFAULT 'English',
    preferred_currency VARCHAR(10) DEFAULT 'USD',
    reason_for_visit TEXT,
    visa_status VARCHAR(50) DEFAULT 'VALID',
    travel_coordination_details TEXT,
    local_contact_person VARCHAR(100),
    local_contact_phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. OPD Queue Tokens Table
CREATE TABLE IF NOT EXISTS queue_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token_number VARCHAR(50) NOT NULL UNIQUE,
    queue_number INT NOT NULL,
    status VARCHAR(30) DEFAULT 'WAITING',
    symptoms TEXT,
    is_priority BOOLEAN DEFAULT FALSE,
    priority_reason VARCHAR(255),
    patient_id BIGINT,
    doctor_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    called_at DATETIME,
    completed_at DATETIME,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 7. Wards Table
CREATE TABLE IF NOT EXISTS wards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ward_number VARCHAR(50) NOT NULL UNIQUE,
    ward_name VARCHAR(100) NOT NULL,
    ward_type VARCHAR(50) NOT NULL,
    total_beds INT DEFAULT 0,
    available_beds INT DEFAULT 0,
    daily_charge_lkr DECIMAL(10,2) DEFAULT 0.00
) ENGINE=InnoDB;

-- 8. Beds Table
CREATE TABLE IF NOT EXISTS beds (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bed_number VARCHAR(50) NOT NULL UNIQUE,
    is_occupied BOOLEAN DEFAULT FALSE,
    ward_id BIGINT,
    current_patient_id BIGINT,
    FOREIGN KEY (ward_id) REFERENCES wards(id) ON DELETE CASCADE,
    FOREIGN KEY (current_patient_id) REFERENCES patients(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 9. Inpatient Admissions Table
CREATE TABLE IF NOT EXISTS admissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admission_number VARCHAR(50) NOT NULL UNIQUE,
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    discharge_date DATETIME,
    admission_reason TEXT,
    attending_doctor VARCHAR(150),
    status VARCHAR(30) DEFAULT 'ADMITTED',
    patient_id BIGINT,
    bed_id BIGINT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (bed_id) REFERENCES beds(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 10. Pharmacy Medicines Table
CREATE TABLE IF NOT EXISTS medicines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_code VARCHAR(50) NOT NULL UNIQUE,
    generic_name VARCHAR(150) NOT NULL,
    brand_name VARCHAR(150),
    category VARCHAR(80),
    unit_price_lkr DECIMAL(10,2) NOT NULL,
    total_stock INT DEFAULT 0,
    reorder_level INT DEFAULT 50
) ENGINE=InnoDB;

-- 11. Medicine Batches Table
CREATE TABLE IF NOT EXISTS medicine_batches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_number VARCHAR(50) NOT NULL UNIQUE,
    medicine_id BIGINT,
    manufactured_date DATE,
    expiry_date DATE NOT NULL,
    quantity INT NOT NULL,
    purchase_cost_lkr DECIMAL(10,2),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 12. Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    prescription_number VARCHAR(50) NOT NULL UNIQUE,
    doctor_id BIGINT,
    patient_id BIGINT,
    diagnosis TEXT,
    notes TEXT,
    status VARCHAR(30) DEFAULT 'ISSUED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 13. Prescription Items Table
CREATE TABLE IF NOT EXISTS prescription_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    prescription_id BIGINT,
    medicine_name VARCHAR(150) NOT NULL,
    dosage VARCHAR(80) NOT NULL,
    frequency VARCHAR(80) NOT NULL,
    duration_days INT NOT NULL,
    instructions TEXT,
    quantity INT DEFAULT 1,
    is_dispensed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 14. Laboratory Tests Table
CREATE TABLE IF NOT EXISTS lab_tests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_code VARCHAR(50) NOT NULL UNIQUE,
    test_name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    price_lkr DECIMAL(10,2) NOT NULL,
    reference_range VARCHAR(255),
    sample_type VARCHAR(80)
) ENGINE=InnoDB;

-- 15. Laboratory Requests Table
CREATE TABLE IF NOT EXISTS lab_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_number VARCHAR(50) NOT NULL UNIQUE,
    patient_id BIGINT,
    doctor_id BIGINT,
    lab_test_id BIGINT,
    clinical_notes TEXT,
    status VARCHAR(50) DEFAULT 'REQUESTED',
    sample_type VARCHAR(80),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sample_collected_at DATETIME,
    completed_at DATETIME,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL,
    FOREIGN KEY (lab_test_id) REFERENCES lab_tests(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 16. Laboratory Results Table
CREATE TABLE IF NOT EXISTS lab_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lab_request_id BIGINT,
    test_parameter VARCHAR(150) NOT NULL,
    result_value VARCHAR(100) NOT NULL,
    reference_range VARCHAR(100),
    unit VARCHAR(50),
    status VARCHAR(50) DEFAULT 'NORMAL',
    remarks TEXT,
    entered_by VARCHAR(100),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lab_request_id) REFERENCES lab_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 17. Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    patient_id BIGINT,
    consultation_charges_lkr DECIMAL(10,2) DEFAULT 0.00,
    lab_charges_lkr DECIMAL(10,2) DEFAULT 0.00,
    pharmacy_charges_lkr DECIMAL(10,2) DEFAULT 0.00,
    room_charges_lkr DECIMAL(10,2) DEFAULT 0.00,
    other_charges_lkr DECIMAL(10,2) DEFAULT 0.00,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    total_amount_lkr DECIMAL(10,2) NOT NULL,
    paid_amount_lkr DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    payment_reference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at DATETIME,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 18. Invoice Items Table
CREATE TABLE IF NOT EXISTS invoice_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_id BIGINT,
    description VARCHAR(255) NOT NULL,
    amount_lkr DECIMAL(10,2) NOT NULL,
    item_type VARCHAR(50),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 19. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payment_number VARCHAR(50) NOT NULL UNIQUE,
    invoice_id BIGINT,
    amount_lkr DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    receipt_number VARCHAR(100),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 20. Feedback & Patient Sentiment Table
CREATE TABLE IF NOT EXISTS feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT,
    rating INT DEFAULT 5,
    comments TEXT,
    sentiment_label VARCHAR(30),
    sentiment_score DOUBLE,
    feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ==========================================================
-- SEED DATA (Users, Doctors, Patients, OPD, Wards, etc.)
-- ==========================================================

-- 1. Default Users (password is 'password123')
INSERT INTO users (id, username, password, full_name, email, role, active) VALUES
(1, 'admin', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'System Administrator', 'admin@careplus.lk', 'ADMIN', 1),
(2, 'receptionist', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Kasun Perera', 'reception@careplus.lk', 'RECEPTIONIST', 1),
(3, 'dr_anura', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Dr. Anura Perera', 'anura@careplus.lk', 'DOCTOR', 1),
(4, 'dr_sumudu', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Dr. Sumudu Bandara', 'sumudu@careplus.lk', 'DOCTOR', 1),
(5, 'dr_wickramasinghe', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Dr. K. L. Wickramasinghe', 'wickramasinghe@careplus.lk', 'DOCTOR', 1),
(6, 'dr_priyadarshani', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Dr. Priyadarshani Silva', 'priyadarshani@careplus.lk', 'DOCTOR', 1),
(7, 'dr_rohan', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Dr. Rohan Jayawardena', 'rohan@careplus.lk', 'DOCTOR', 1),
(8, 'nurse_priyani', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Priyani Jayasinghe', 'nurse@careplus.lk', 'NURSE', 1),
(9, 'pharmacist_kamal', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Kamal Silva', 'pharmacy@careplus.lk', 'PHARMACIST', 1),
(10, 'lab_nimal', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Nimal Fernando', 'lab@careplus.lk', 'LAB_TECHNICIAN', 1),
(11, 'patient_kamani', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Kamani Samarasinghe', 'kamani@careplus.lk', 'PATIENT', 1),
(12, 'int_john', '$2a$10$w9Fvhv410qM3q52kU.y5veVjEa14kE0lB7fOqfS5vL46l5.C7q1Iu', 'Johnathan Smith', 'john.smith@careplus.lk', 'INTERNATIONAL_PATIENT', 1)
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

-- 2. Departments
INSERT INTO departments (id, name, description) VALUES
(1, 'Cardiology', 'Heart & Cardiovascular Care'),
(2, 'Pediatrics', 'Child Healthcare & Wellness'),
(3, 'General Medicine', 'General OPD & Internal Medicine'),
(4, 'Dermatology', 'Skin & Wellness Clinic'),
(5, 'Orthopedics', 'Bone & Joint Clinic')
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- 3. Doctors
INSERT INTO doctors (id, doctor_code, name, qualification, specialization, consultation_fee, room_number, available_days, department_id, user_id) VALUES
(1, 'DOC-001', 'Dr. Anura Perera', 'MBBS, MD (Cardiology)', 'Cardiology', 2500.00, 'Room 101', 'Mon, Wed, Fri (09:00 - 13:00)', 1, 3),
(2, 'DOC-002', 'Dr. Sumudu Bandara', 'MBBS, DCH (Pediatrics)', 'Pediatrics', 2200.00, 'Room 105', 'Tue, Thu, Sat (10:00 - 14:00)', 2, 4),
(3, 'DOC-003', 'Dr. K. L. Wickramasinghe', 'MBBS, MD (Internal Med)', 'General Medicine', 2000.00, 'Room 108', 'Daily Walk-in (08:30 - 16:00)', 3, 5),
(4, 'DOC-004', 'Dr. Priyadarshani Silva', 'MBBS, MD (Dermatology)', 'Dermatology', 2400.00, 'Room 112', 'Mon, Thu (13:00 - 18:00)', 4, 6),
(5, 'DOC-005', 'Dr. Rohan Jayawardena', 'MBBS, MS, FRCS', 'Orthopedics', 3000.00, 'Room 204', 'Tue, Fri (13:00 - 17:00)', 5, 7)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 4. Patients
INSERT INTO patients (id, patient_id, nic_passport, full_name, age, gender, phone, address, district, blood_group, emergency_contact_name, emergency_contact_phone, medical_history) VALUES
(1, 'PAT-2026-0001', '925143820V', 'Kamani Samarasinghe', 34, 'FEMALE', '+94 77 123 4567', 'No. 45, Galle Road, Bambalapitiya', 'Colombo', 'O+', 'Sunil Samarasinghe', '+94 71 987 6543', 'Mild asthma, penicillin allergy'),
(2, 'PAT-2026-0002', '198512345678', 'Chaminda Rathnayake', 41, 'MALE', '+94 71 890 1234', 'No. 12, Peradeniya Road', 'Kandy', 'A+', 'Nirosha Rathnayake', '+94 77 234 5678', 'Hypertension under control'),
(3, 'PAT-2026-0003', '987654321V', 'Sunethra Wickramasinghe', 28, 'FEMALE', '+94 76 543 2109', 'No. 88, Main Street', 'Galle', 'B+', 'Bandula Wickramasinghe', '+94 71 345 6789', 'None'),
(4, 'INT-2026-0001', 'N9821456', 'Johnathan Smith', 48, 'MALE', '+44 7911 123456', 'London, United Kingdom', 'International', 'O+', 'Sarah Smith', '+44 7911 654321', 'Seeking cardiac checkup')
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

-- 5. International Details
INSERT INTO international_patient_details (id, patient_id, passport_number, nationality, country_of_residence, preferred_language, preferred_currency, reason_for_visit, visa_status, travel_coordination_details) VALUES
(1, 4, 'N9821456', 'British', 'United Kingdom', 'English', 'GBP', 'Seeking specialized cardiac evaluation and treatment in Colombo.', 'VALID', 'Airport pick-up & executive hospital suite reservation arranged.')
ON DUPLICATE KEY UPDATE passport_number=VALUES(passport_number);

-- 6. OPD Queue Tokens
INSERT INTO queue_tokens (id, token_number, queue_number, status, symptoms, is_priority, priority_reason, patient_id, doctor_id) VALUES
(1, 'CAR-001', 1, 'WAITING', 'Chest tightness and shortness of breath', 0, NULL, 1, 1),
(2, 'PED-001', 1, 'IN_CONSULTATION', 'Fever and recurrent cough', 0, NULL, 2, 2)
ON DUPLICATE KEY UPDATE token_number=VALUES(token_number);

-- 7. Wards & Beds
INSERT INTO wards (id, ward_number, ward_name, ward_type, total_beds, available_beds, daily_charge_lkr) VALUES
(1, 'WARD-M1', 'Male Medical Ward', 'MALE', 5, 4, 3500.00),
(2, 'WARD-F1', 'Female Medical Ward', 'FEMALE', 5, 5, 3500.00),
(3, 'ICU-01', 'Intensive Care Unit', 'ICU', 3, 3, 12500.00)
ON DUPLICATE KEY UPDATE ward_name=VALUES(ward_name);

INSERT INTO beds (id, bed_number, is_occupied, ward_id, current_patient_id) VALUES
(1, 'M1-B01', 0, 1, NULL),
(2, 'M1-B02', 1, 1, 2),
(3, 'F1-B01', 0, 2, NULL),
(4, 'ICU-B01', 0, 3, NULL)
ON DUPLICATE KEY UPDATE bed_number=VALUES(bed_number);

-- 8. Inpatient Admissions
INSERT INTO admissions (id, admission_number, patient_id, bed_id, admission_reason, attending_doctor, status) VALUES
(1, 'ADM-2026-0001', 2, 2, 'Acute Bronchitis & Respiratory Monitoring', 'Dr. Anura Perera', 'ADMITTED')
ON DUPLICATE KEY UPDATE admission_number=VALUES(admission_number);

-- 9. Medicines & Batches
INSERT INTO medicines (id, item_code, generic_name, brand_name, category, unit_price_lkr, total_stock, reorder_level) VALUES
(1, 'MED-PAN-500', 'Paracetamol 500mg', 'Panadol', 'Analgesic', 15.00, 500, 100),
(2, 'MED-AMX-250', 'Amoxicillin 250mg', 'Amoxil', 'Antibiotic', 45.00, 35, 50),
(3, 'MED-CET-10', 'Cetirizine 10mg', 'Cetrine', 'Antihistamine', 25.00, 250, 80),
(4, 'MED-OMP-20', 'Omeprazole 20mg', 'Omeprazole', 'Antacid', 35.00, 300, 100)
ON DUPLICATE KEY UPDATE generic_name=VALUES(generic_name);

INSERT INTO medicine_batches (id, batch_number, medicine_id, manufactured_date, expiry_date, quantity, purchase_cost_lkr) VALUES
(1, 'PAN-2026-01', 1, '2026-01-01', '2028-05-30', 500, 8.50),
(2, 'AMX-2026-01', 2, '2026-02-01', '2027-10-31', 35, 28.00)
ON DUPLICATE KEY UPDATE batch_number=VALUES(batch_number);

-- 10. Lab Tests & Requests
INSERT INTO lab_tests (id, test_code, test_name, category, price_lkr, reference_range, sample_type) VALUES
(1, 'LAB-FBC', 'Full Blood Count (FBC)', 'Hematology', 1800.00, 'Hb: 12.0-16.0 g/dL, WBC: 4000-11000 /uL', 'Blood'),
(2, 'LAB-DENGUE', 'Dengue NS1 Antigen', 'Immunology', 2800.00, 'Negative', 'Blood'),
(3, 'LAB-FBS', 'Fasting Blood Sugar (FBS)', 'Biochemistry', 750.00, '70 - 100 mg/dL', 'Blood'),
(4, 'LAB-LIPID', 'Lipid Profile', 'Biochemistry', 3200.00, 'Total Cholesterol < 200 mg/dL', 'Blood')
ON DUPLICATE KEY UPDATE test_name=VALUES(test_name);

INSERT INTO lab_requests (id, request_number, patient_id, doctor_id, lab_test_id, clinical_notes, status, sample_type) VALUES
(1, 'REQ-2026-0001', 1, 1, 1, 'Routine checkup for anemia symptoms', 'SAMPLE_COLLECTED', 'Blood')
ON DUPLICATE KEY UPDATE request_number=VALUES(request_number);

-- 11. Invoices & Payments
INSERT INTO invoices (id, invoice_number, patient_id, consultation_charges_lkr, lab_charges_lkr, pharmacy_charges_lkr, room_charges_lkr, other_charges_lkr, discount_percentage, total_amount_lkr, paid_amount_lkr, status, payment_method) VALUES
(1, 'INV-2026-0001', 1, 2500.00, 1800.00, 0.00, 0.00, 0.00, 0.00, 4300.00, 4300.00, 'PAID', 'CASH')
ON DUPLICATE KEY UPDATE invoice_number=VALUES(invoice_number);

INSERT INTO invoice_items (id, invoice_id, description, amount_lkr, item_type) VALUES
(1, 1, 'Doctor Consultation (Dr. Anura Perera)', 2500.00, 'CONSULTATION'),
(2, 1, 'Full Blood Count (FBC)', 1800.00, 'LABORATORY')
ON DUPLICATE KEY UPDATE description=VALUES(description);

INSERT INTO payments (id, payment_number, invoice_id, amount_lkr, payment_method, receipt_number) VALUES
(1, 'PAY-2026-0001', 1, 4300.00, 'CASH', 'REC-09821')
ON DUPLICATE KEY UPDATE payment_number=VALUES(payment_number);

-- 12. Feedback & AI Sentiment
INSERT INTO feedback (id, patient_id, rating, comments, sentiment_label, sentiment_score) VALUES
(1, 1, 5, 'The doctor was extremely attentive and caring, fantastic hospital service!', 'POSITIVE', 96.5),
(2, 2, 4, 'Smooth OPD queue process and clear prescription explanation.', 'POSITIVE', 88.0)
ON DUPLICATE KEY UPDATE comments=VALUES(comments);

SET FOREIGN_KEY_CHECKS = 1;
