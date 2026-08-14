# Sri Lankan Smart Healthcare Analytics & Hospital Management Platform

An enterprise-grade, modular Sri Lankan Hospital Management System (HMS) built with **Spring Boot 3**, **Python Machine Learning**, and **React.js**.

---

## 🛠️ System Architecture & Prerequisites

- **Frontend**: React.js + Vite (Port `3000`)
- **Backend API**: Java 21 + Spring Boot 3 + Spring Security + Spring Data JPA (Port `8080`)
- **ML Service**: Python 3.14 + Flask + Scikit-Learn + Pandas (Port `5001`)
- **Databases**: MySQL 8.0 (`jdbc:mysql://localhost:3306/lanka_hms_db`) or Standalone In-Memory H2 DB

---

## 🚀 How to Run locally

### 1️⃣ Start the Python ML Microservice (Port 5001)
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

### 2️⃣ Start the Spring Boot Backend Server (Port 8080)

**Option A: Standalone H2 Execution (Zero Configuration)**
```powershell
cd backend
.\mvnw spring-boot:run "-Dspring-boot.run.profiles=h2"
```

**Option B: Production MySQL Execution**
Ensure MySQL is running on `localhost:3306` with database `lanka_hms_db`, then run:
```powershell
cd backend
.\mvnw spring-boot:run
```

> *(Note: You can also use `& "C:\Program Files\NetBeans-25\netbeans\java\maven\bin\mvn.cmd" spring-boot:run`)*

### 3️⃣ Start the React Web Application (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 👥 Demo Logins & Role Switcher

Use the **Role Demonstration Switcher** at the top of the header, or log in manually:

| Role | Username | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin` | `password123` |
| **Receptionist** | `receptionist` | `password123` |
| **Doctor (OPD)** | `dr_anura` | `password123` |
| **Nurse (Ward)** | `nurse_priyani` | `password123` |
| **Pharmacist** | `pharmacist_kamal` | `password123` |
| **Lab Technician**| `lab_nimal` | `password123` |
| **Local Patient** | `patient_kamani`| `password123` |
| **Foreign Patient**| `int_john` | `password123` |
>>>>>>> b9de821 (Complete Sri Lankan Smart Healthcare Platform with full-stack implementation)
