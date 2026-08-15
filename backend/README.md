# Smart Sri Lankan Healthcare Backend (Spring Boot 3)

The REST API backend for the Smart Sri Lankan Healthcare Management & Analytics Platform.

## Features
- **Authentication**: JWT token-based authentication with role-based access control (ADMIN, DOCTOR, PATIENT, NURSE, PHARMACIST, LAB_TECHNICIAN, RECEPTIONIST).
- **Domain Modules**:
  - `auth`: User authentication, registration, password hashing.
  - `patient`: EMR, medical records, patient profiles.
  - `doctor`: Specialist doctor profiles, department assignments, OPD room allocations.
  - `opd`: Real-time OPD queue token issuance and consultation workflow.
  - `inpatient`: Wards, bed allocations, and admission tracking.
  - `pharmacy`: Medicine inventory, batch tracking, and e-prescriptions.
  - `laboratory`: Pathology test catalog, test request ordering, and results verification.
  - `billing`: Invoices, line items, and payment reconciliation.
  - `feedback`: Patient ratings and AI sentiment analysis tracking.
  - `international`: Foreign patient concierge and medical tourism journey.
  - `ml`: Python ML service integration client.

## Running Locally with MySQL (XAMPP)

1. Make sure **MySQL** is started in XAMPP on port `3306`.
2. Run the application:
```powershell
.\mvnw.cmd spring-boot:run
```
3. API endpoints are served at `http://localhost:8080/api`.
