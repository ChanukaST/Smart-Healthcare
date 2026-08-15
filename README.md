# CarePlus — Sri Lankan Smart Healthcare Platform & Hospital Management System

An enterprise-grade, full-stack Sri Lankan Hospital Management System (HMS) with integrated **Python Machine Learning**, **Spring Boot 3 REST API**, **MySQL Database (XAMPP)**, and a modern **React 18 + Vite** web portal.

---

## 🏗️ System Architecture & Technology Stack

| Layer | Technologies | Port | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web Portal** | React 18, Vite, React Router 6, Lucide Icons | `5173` / `3000` | Responsive multi-portal web app for Patients, Doctors, International Patients, and Admins |
| **Backend REST API** | Java 21, Spring Boot 3.2, Spring Security, Spring Data JPA | `8080` | Core clinical logic, JWT auth, RBAC, billing, pharmacy, lab, and ML proxy |
| **AI / ML Microservice** | Python 3, FastAPI / Flask, Scikit-Learn, Pandas | `8000` / `5001` | No-show prediction, health risk scoring, feedback sentiment, and anomaly detection |
| **Database** | MySQL 8.0 / MariaDB (XAMPP) | `3306` | Persistent relational schema (`lanka_hms_db`) storing records permanently across runs |

---

## 🚀 Quick Start Guide

### Prerequisites
- **XAMPP** (with **Apache** and **MySQL** started)
- **Node.js** (v18+) & **npm**
- **Java JDK** (v17 or v21)
- **Python** (v3.9+)

---

### Step 1: Start XAMPP & Verify MySQL Database

1. Open **XAMPP Control Panel** and click **Start** for **Apache** and **MySQL**.
2. MySQL will run on port `3306` (default user `root`, no password).
3. Database `lanka_hms_db` is automatically created and updated by Spring Boot JPA.
   - *Optional manual import*: You can also run/import [`database/setup_database.sql`](database/setup_database.sql) directly via **phpMyAdmin** at `http://localhost/phpmyadmin` or via command line:
     ```bash
     mysql -u root < database/setup_database.sql
     ```

---

### Step 2: Start the Python ML Microservice

```bash
cd ml-service
pip install -r requirements.txt
python -m uvicorn app.main:app --port 8000 --reload
```
> The ML engine will start listening at `http://localhost:8000` (interactive API docs available at `http://localhost:8000/docs`).

---

### Step 3: Start the Spring Boot Backend API (Port 8080)

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
> The backend connects directly to MySQL (`lanka_hms_db`) with `ddl-auto: update`, ensuring all patient, doctor, appointment, and pharmacy records remain persistently saved across application restarts.

---

### Step 4: Start the React Frontend Application

```bash
cd frontend
npm install
npm run dev
```
> Open your browser and navigate to **`http://localhost:5173`** (or configured port).

---

## 🔑 Demonstration Accounts & Credentials

The system provides a unified login gateway on **`/login`** that automatically directs users to their respective role-based portals:

| Portal | Username / Email | Password | Default Target Route |
| :--- | :--- | :--- | :--- |
| 🏦 **Hospital Administrator** | `admin@careplus.lk` *(or `admin`)* | `password123` *(or `admin123`)* | `/admin/dashboard` |
| 👨‍⚕️ **Consultant Cardiologist** | `dr_anura@careplus.lk` *(or `dr_anura`)* | `password123` *(or `doctor123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant Pediatrician** | `dr_sumudu@careplus.lk` *(or `dr_sumudu`)* | `password123` *(or `doctor123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant General OPD** | `dr_wickramasinghe@careplus.lk` | `password123` *(or `doctor123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant Dermatologist**| `dr_priyadarshani@careplus.lk` | `password123` *(or `doctor123`)* | `/doctor/dashboard` |
| 👨‍⚕️ **Consultant Orthopedic** | `dr_rohan@careplus.lk` | `password123` *(or `doctor123`)* | `/doctor/dashboard` |
| 🧑‍⚕️ **Local Patient** | `patient_kamani@careplus.lk` *(or `patient_kamani`)* | `password123` *(or `patient123`)* | `/patient/dashboard` |
| ✈️ **Foreign Patient (VIP)** | `int_john@careplus.lk` *(or `int_john`)* | `password123` *(or `patient123`)* | `/patient/dashboard` |
| 🧪 **Pathology Lab Technician** | `lab_nimal@careplus.lk` *(or `lab_nimal`)* | `password123` | `/admin/laboratory` |
| 💊 **Hospital Pharmacist** | `pharmacist_kamal@careplus.lk` *(or `pharm_saman`)*| `password123` | `/admin/pharmacy` |
| 📋 **Reception Desk** | `reception@careplus.lk` *(or `receptionist`)* | `password123` | `/patient/dashboard` |

---

## 📱 System Modules Overview

### 1. 🌐 Public & Auth Pages
- **Home (`/`)**: Hospital hero overview, online booking CTA, specialist counters, 24/7 support.
- **Doctors Directory (`/doctors`)**: Search specialist doctors, consultation fees, and OPD schedules.
- **Clinical Departments (`/departments`)**: Directory of clinical departments (Cardiology, Pediatrics, General Medicine, Dermatology, Orthopedics).
- **International Patient Portal (`/international-patients`)**: 5-step medical tourism journey, concierge details, and foreign patient registration.
- **Auth (`/login`, `/register`, `/forgot-password`)**: Multi-role authentication & account setup.

### 2. 🧑‍⚕️ Patient Portal
- **Patient Dashboard (`/patient/dashboard`)**: Consultation schedules, AI no-show risk score, notifications, and balance summary.
- **Book Appointment (`/patient/book-appointment`)**: Step-by-step doctor, date, and time slot selection.
- **My Appointments (`/patient/my-appointments`)**: Tabs for Upcoming, Completed, and Cancelled appointments.
- **Medical Records (`/patient/medical-records`)**: Electronic health records, diagnoses, and allergies.
- **Laboratory Reports (`/patient/medical-reports`)**: View and download verified lab test results (FBC, Lipid Profile, Blood Sugar).
- **Active Prescriptions (`/patient/prescriptions`)**: E-prescriptions, dosage instructions, and duration.
- **Payments (`/patient/payments`)**: Invoices, payment settlement, and instant receipts.

### 3. 👨‍⚕️ Doctor Portal
- **Doctor Dashboard (`/doctor/dashboard`)**: Daily appointments, patient queue, pending lab results, and AI no-show analytics.
- **Today's Appointments (`/doctor/appointments`)**: Live token queue with Checked-in, In-Progress, and Waiting statuses.
- **Patient Details (`/doctor/patient-details`)**: Patient dossier with vitals, medical history, allergies, and prescription writer.
- **Clinical Analytics (`/doctor/analytics`)**: Monthly patient visit trends, no-show rates, and risk category distributions.

### 4. 🏦 Hospital Administrator Portal
- **Admin Dashboard (`/admin/dashboard`)**: Hospital operations, revenue metrics, and department OPD distributions.
- **User Management (`/admin/users`)**: Staff, Doctor, and Patient access control.
- **Pharmacy Inventory (`/admin/pharmacy`)**: Medicine stock tracking, batch numbers, expiry dates, and low-stock alerts.
- **Laboratory Management (`/admin/laboratory`)**: Diagnostic test requests and report publishing.
- **Billing & Financial Reports (`/admin/billing`)**: Invoice reconciliation and revenue reports.

---

## 🤖 AI & Machine Learning Microservice Endpoints

| ML Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/predict/no-show` | `POST` | Predicts appointment no-show probability and risk category (Low, Medium, High). |
| `/predict/health-risk`| `POST` | Evaluates patient vitals (BP, BMI, Glucose) to categorize cardiovascular/metabolic risk. |
| `/predict/sentiment` | `POST` | Analyzes patient feedback text to classify sentiment (Positive, Neutral, Negative). |
| `/health` | `GET` | Health check endpoint returning microservice uptime status. |

---

## 📁 Repository Structure

```
smart-healthcare-platform/
├── frontend/                     # React 18 + Vite Frontend Portal
│   ├── src/
│   │   ├── components/           # Common, Dashboard, Patient, Doctor, Pharmacy, Lab, Analytics components
│   │   ├── context/              # AuthContext (State & Session Management)
│   │   ├── hooks/                # useAuth, useApi custom hooks
│   │   ├── pages/                # Public, Auth, Patient, Doctor, Admin, International pages
│   │   ├── routes/               # AppRoutes & ProtectedRoute guards
│   │   ├── services/             # API services (auth, patient, doctor, billing, ml, etc.)
│   │   ├── styles/               # Global CSS, variables, and responsive stylesheets
│   │   └── utils/                # Validation, formatDate, formatCurrency, constants
│   └── package.json
│
├── backend/                      # Java 21 + Spring Boot 3 REST API
│   ├── src/main/java/com/hospital/hms/
│   │   ├── auth/                 # JWT Authentication, User Entity, Role, Repositories
│   │   ├── billing/              # Invoices, InvoiceItems, Payments
│   │   ├── common/               # SecurityFilter, CorsConfig, Global Exceptions
│   │   ├── config/               # DataInitializer (Auto DB Seeding)
│   │   ├── doctor/               # Doctor & Department Controllers & Entities
│   │   ├── feedback/             # Feedback Entity & AI Sentiment tracking
│   │   ├── inpatient/            # Wards, Beds, Admissions
│   │   ├── international/        # InternationalPatientDetails
│   │   ├── laboratory/           # LabTests, LabRequests, LabResults
│   │   ├── ml/                   # Python ML Proxy Client
│   │   ├── opd/                  # Live QueueTokens & OPD visits
│   │   ├── patient/              # Patient Entity, EMR & Medical History
│   │   └── pharmacy/             # Medicines, Batches, Prescriptions
│   ├── src/main/resources/       # application.yml (MySQL active profile)
│   └── pom.xml
│
├── ml-service/                   # Python ML Microservice (FastAPI / Scikit-Learn)
│   ├── app/                      # main.py, api/, models/, preprocessing/, services/, schemas/
│   ├── models/                   # Serialized ML model artifacts (.pkl)
│   ├── notebooks/                # Jupyter EDA & training notebooks (01-06)
│   ├── data/                     # Raw & processed training datasets
│   └── requirements.txt
│
├── database/                     # MySQL Relational Database
│   ├── schema/                   # Modular SQL schemas (01_users.sql to 14_international_patients.sql)
│   ├── seeds/                    # Seed scripts for roles, departments, doctors, medicines
│   ├── sample-data/              # Sample CSV datasets (appointments, health, feedback)
│   └── setup_database.sql        # Master database initialization & seed script for MySQL
│
├── docs/                         # Requirements, Architecture, API, and UML documentation
├── docker/                       # Dockerfiles for frontend, backend, and ml-service
├── docker-compose.yml            # Multi-container local deployment
└── README.md
```

---

## 💾 Database Persistence Guarantee

The Spring Boot backend is configured with:
```yaml
spring:
  profiles:
    active: mysql
  datasource:
    url: jdbc:mysql://localhost:3306/lanka_hms_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: root
    password:
  jpa:
    hibernate:
      ddl-auto: update
```
- **No data loss on restarts**: Hibernate `ddl-auto: update` applies non-destructive schema updates without dropping existing tables or records.
- **XAMPP Ready**: Automatically connects to local XAMPP MySQL without requiring manual credential overrides.
