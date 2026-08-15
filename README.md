# CarePlus — Sri Lankan Smart Healthcare Platform & Hospital Management System

An enterprise-grade, full-stack Sri Lankan Hospital Management System (HMS) with integrated **Python Machine Learning**, **Spring Boot 3 REST API**, and a modern **React 18** web portal.

---

## 🏗️ System Architecture & Technology Stack

| Layer | Technologies | Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web Portal** | React 18, Vite, React Router 6, Lucide React Icons | `3000` | Responsive multi-portal web app for Patients, Doctors, and Hospital Admins |
| **Backend REST API** | Java 21, Spring Boot 3.2, Spring Security, Spring Data JPA | `8080` | Core clinical logic, authentication, RBAC, billing, and ML proxy |
| **AI / ML Microservice** | Python 3, Flask, Scikit-Learn, Pandas, TextBlob | `5001` | No-show predictions, patient health risk scoring, and feedback sentiment analysis |
| **Database** | In-Memory H2 DB (Default) / MySQL 8.0 | `8080 / 3306`| Automated relational schema and sample clinical dataset initialization |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Java JDK** (v17 or v21)
- **Python** (v3.9+)

---

### Step 1: Start the Python ML Microservice (Port 5001)
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```
> The ML engine will start listening at `http://localhost:5001` for prediction requests.

---

### Step 2: Start the Spring Boot Backend API (Port 8080)

**Option A: Standalone H2 Database (Recommended - Zero Setup)**
```powershell
cd backend
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=h2"
```

**Option B: Production MySQL Database**
Ensure MySQL is running on `localhost:3306` with database `lanka_hms_db`, then run:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
> The API server will start at `http://localhost:8080`.

---

### Step 3: Start the React Frontend Application (Port 3000)
```bash
cd frontend
npm install
npm run dev
```
> Open your browser and navigate to **`http://localhost:3000`**.

---

## 🔑 Demonstration Accounts & Credentials

The system provides a unified login gateway on **[http://localhost:3000/login](http://localhost:3000/login)** that automatically directs users to their respective role-based portals:

| Portal | Username / Email | Password | Default Target Route |
| :--- | :--- | :--- | :--- |
| 🏦 **Hospital Administrator** | `admin@careplus.lk` *(or `admin`)* | `admin123` *(or `password123`)* | `/admin/dashboard` |
| 👨‍⚕️ **Consultant Cardiologist** | `dr_anura@careplus.lk` *(or `dr_anura`)* | `doctor123` *(or `password123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant Pediatrician** | `dr_sumudu@careplus.lk` *(or `dr_sumudu`)* | `doctor123` *(or `password123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant General OPD** | `dr_wickramasinghe@careplus.lk` | `doctor123` *(or `password123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant Dermatologist**| `dr_priyadarshani@careplus.lk` | `doctor123` *(or `password123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant Orthopedic** | `dr_rohan@careplus.lk` | `doctor123` *(or `password123`)* | `/doctor/dashboard` |
| 🧑‍⚕️ **Local Patient (Demo EMR)**| `patient_kamani@careplus.lk` *(or `patient_kamani`)* | `patient123` *(or `password123`)* | `/patient/dashboard` |
| ✈️ **Foreign Patient (VIP)** | `int_john@careplus.lk` *(or `int_john`)* | `patient123` *(or `password123`)* | `/patient/dashboard` |
| 🧪 **Pathology Lab Technician** | `lab_nimal@careplus.lk` *(or `lab_nimal`)* | `password123` | `/admin/laboratory` |
| 💊 **Hospital Pharmacist** | `pharm_saman@careplus.lk` *(or `pharmacist_kamal`)*| `password123` | `/admin/pharmacy` |

*Note: Newly registered patient accounts start with a clean profile without mock records.*

---

## 📱 System Modules & User Guide

### 1. 🌐 Public Pages
- **Home (`/`)**: Hospital hero overview, fast booking CTA, clinical services, emergency numbers.
- **Doctors Directory (`/doctors`)**: Search specialist doctors, filter by clinical department, check OPD schedules, room numbers, and consultation fees.
- **Clinical Departments (`/departments`)**: Full directory of hospital departments (Cardiology, Pediatrics, OPD, Dermatology, Orthopedics, Laboratory, Emergency).
- **International Patient Concierge (`/international-patients`)**: 4-step medical tourism treatment journey, visa assistance, and foreign patient enquiry form.

---

### 2. 🧑‍⚕️ Patient Portal
- **Patient Dashboard (`/patient/dashboard`)**: Overview of upcoming consultation tokens, personalized health risk indicators, quick actions.
- **Book Appointment (`/patient/book-appointment`)**: Interactive monthly calendar with date picker, time slot selector, consultant selection, and instant token generation.
- **My Appointments (`/patient/my-appointments`)**: Real-time view of Upcoming, Completed, and Cancelled clinic appointments.
- **Medical Records (`/patient/medical-records`)**: Personal Electronic Medical Records (EMR) and past diagnosis history.
- **Laboratory Reports (`/patient/medical-reports`)**: Verified pathology test results (FBC, Lipid Profile, Blood Sugar, Dengue NS1).
- **Active Prescriptions (`/patient/prescriptions`)**: E-prescriptions, dosage instructions, course durations, and pharmacy refill requests.
- **Billing & Payments (`/patient/payments`)**: Hospital invoices, outstanding balance tracker, settlement via Visa/Mastercard and LankaQR/FriMi with instant receipt generation.
- **Notification Stream (`/patient/notifications`)**: Real-time alerts for appointment confirmations, lab reports, and medication refills.
- **Clinical Feedback & Sentiment Analysis (`/patient/feedback`)**: Star rating review form with live Python ML sentiment analysis (Positive, Neutral, Negative).

---

### 3. 👨‍⚕️ Doctor Portal
- **Doctor Dashboard (`/doctor/dashboard`)**: OPD queue overview, daily patient counters, pending lab reports, and AI No-Show prediction distribution.
- **Today's Appointments (`/doctor/appointments`)**: Live token queue (`CAR-001`, `CAR-002`, etc.), patient call-in action, active in-room patient tracker, and consultation completion.
- **Patient Details Dossier (`/doctor/patient-details`)**: Search patient by ID/NIC, view vitals history (BP, HR, SpO2, BMI), chronic conditions, known allergies, active medications, and ML risk scores.
- **Medical Records & EHR (`/doctor/medical-records`)**: Create and log new clinical consultation notes, ICD-10 diagnoses, chief complaints, and treatment plans.
- **E-Prescriptions Desk (`/doctor/prescriptions`)**: Authorize digital prescriptions and transmit them directly to the Hospital Pharmacy.
- **Laboratory Requests (`/doctor/lab-requests`)**: Order pathology investigations (Routine vs. STAT / Emergency) and view verified test results.
- **Clinical Analytics (`/doctor/analytics`)**: Monthly patient visit trends, no-show rate analytics, and patient risk category distributions.

---

### 4. 🏦 Hospital Administrator Portal
- **Admin Dashboard (`/admin/dashboard`)**: Hospital operations, patient throughput, doctor staffing, and revenue overview.
- **User Management (`/admin/users`)**: Role-based access control (RBAC), account creation, role assignment, and activation/deactivation toggles.
- **Master Patient Registry (`/admin/patients`)**: Centralized patient directory with NIC, demographics, blood groups, districts, and outstanding balances.
- **Doctors & Specialists (`/admin/doctors`)**: Consultant roster, room allocations, consultation fee setting, and schedule management.
- **Clinical Departments (`/admin/departments`)**: Bed capacities, ward staffing, lead consultant assignments, and operating hours.
- **Pharmacy Inventory (`/admin/pharmacy`)**: Medicine stock tracking, unit pricing, batch numbers, and reorder levels.
- **Diagnostic Laboratory Desk (`/admin/laboratory`)**: Central pathology queue, sample collection status, result verification, and automated report publishing.
- **Billing & Cash Desk (`/admin/billing`)**: Revenue reconciliation, invoice generation, counter cash collection, and official receipt printing.

---

## 🤖 AI & Machine Learning Microservice Endpoints

| ML Endpoint | Method | Input Parameters | Output |
| :--- | :--- | :--- | :--- |
| `/analyze/sentiment` | `POST` | `{ "feedback_text": "..." }` | `{ "sentiment": "POSITIVE", "score": 0.85 }` |
| `/predict/noshow` | `POST` | `{ "age": 45, "lead_days": 3, "history_noshows": 0 }` | `{ "no_show_probability": 12, "risk_category": "LOW" }` |
| `/predict/risk` | `POST` | `{ "age": 52, "chronic_conditions": 2, "bp": "140/90" }` | `{ "health_risk": "MEDIUM", "confidence": 0.92 }` |

---

## 📁 Repository Structure

```
Smart-Healthcare/
├── backend/                  # Java 21 & Spring Boot 3 REST API
│   ├── src/main/java/com/hospital/hms/
│   │   ├── auth/             # JWT Authentication & User Entities
│   │   ├── common/           # SecurityConfig, CorsConfig, Global Handlers
│   │   ├── config/           # DataInitializer (Automated DB Seeding)
│   │   ├── doctor/           # Doctor & Department Controllers & Repositories
│   │   ├── patient/          # Patient EMR & Records Management
│   │   ├── billing/          # Invoices & Payments Processing
│   │   ├── laboratory/       # Pathology Orders & Test Results
│   │   ├── pharmacy/         # Medicine Inventory & Batches
│   │   └── ml/               # Python ML Proxy Controller
│   └── pom.xml
│
├── frontend/                 # React 18 & Vite Frontend
│   ├── src/
│   │   ├── components/       # Reusable Navbar, Sidebar, StatCard, PredictionCard
│   │   ├── context/          # AuthContext (State & Session Management)
│   │   ├── pages/
│   │   │   ├── public/       # Home, Doctors, Departments
│   │   │   ├── auth/         # Login, Register, ForgotPassword
│   │   │   ├── patient/      # Dashboard, BookAppointment, Payments, etc.
│   │   │   ├── doctor/       # Dashboard, Appointments, PatientDetails, Records, etc.
│   │   │   ├── admin/        # Users, Patients, Doctors, Billing, Laboratory, etc.
│   │   │   └── international/# InternationalPatientJourney
│   │   ├── routes/           # ProtectedRoute & AppRoutes
│   │   └── styles/           # Design System & Responsive Tokens
│   └── package.json
│
├── ml-service/               # Python ML Microservice
│   ├── app/                  # Prediction routes & Scikit-Learn pipelines
│   ├── app.py                # Flask entry point (Port 5001)
│   └── requirements.txt
└── README.md
```
