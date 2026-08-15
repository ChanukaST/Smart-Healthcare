import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import Home from '../pages/public/Home';
import Doctors from '../pages/public/Doctors';
import Departments from '../pages/public/Departments';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Patient Pages
import PatientDashboard from '../pages/patient/PatientDashboard';
import BookAppointment from '../pages/patient/BookAppointment';
import MyAppointments from '../pages/patient/MyAppointments';
import MedicalRecords from '../pages/patient/MedicalRecords';
import LabResults from '../pages/patient/LabResults';
import Prescriptions from '../pages/patient/Prescriptions';
import Payments from '../pages/patient/Payments';
import Notifications from '../pages/patient/Notifications';
import Feedback from '../pages/patient/Feedback';

// Doctor Pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorAppointments from '../pages/doctor/DoctorAppointments';
import DoctorPatientDetails from '../pages/doctor/DoctorPatientDetails';
import DoctorMedicalRecords from '../pages/doctor/DoctorMedicalRecords';
import DoctorPrescriptions from '../pages/doctor/DoctorPrescriptions';
import DoctorLabRequests from '../pages/doctor/DoctorLabRequests';
import AnalyticsDoctor from '../pages/doctor/AnalyticsDoctor';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import UsersManagement from '../pages/admin/UsersManagement';
import PatientsManagement from '../pages/admin/PatientsManagement';
import DoctorsManagement from '../pages/admin/DoctorsManagement';
import DepartmentsManagement from '../pages/admin/DepartmentsManagement';
import PharmacyInventory from '../pages/admin/PharmacyInventory';
import LaboratoryManagement from '../pages/admin/LaboratoryManagement';
import BillingManagement from '../pages/admin/BillingManagement';

// International Patient Pages
import InternationalPatientJourney from '../pages/international/InternationalPatientJourney';

import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/international-patients" element={<InternationalPatientJourney />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Patient Routes */}
      <Route path="/patient/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/book-appointment" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
      <Route path="/patient/my-appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />
      <Route path="/patient/medical-records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />
      <Route path="/patient/medical-reports" element={<ProtectedRoute><LabResults /></ProtectedRoute>} />
      <Route path="/patient/prescriptions" element={<ProtectedRoute><Prescriptions /></ProtectedRoute>} />
      <Route path="/patient/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
      <Route path="/patient/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/patient/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />

      {/* Doctor Routes */}
      <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/appointments" element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
      <Route path="/doctor/patient-details" element={<ProtectedRoute><DoctorPatientDetails /></ProtectedRoute>} />
      <Route path="/doctor/medical-records" element={<ProtectedRoute><DoctorMedicalRecords /></ProtectedRoute>} />
      <Route path="/doctor/prescriptions" element={<ProtectedRoute><DoctorPrescriptions /></ProtectedRoute>} />
      <Route path="/doctor/lab-requests" element={<ProtectedRoute><DoctorLabRequests /></ProtectedRoute>} />
      <Route path="/doctor/analytics" element={<ProtectedRoute><AnalyticsDoctor /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><UsersManagement /></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute><PatientsManagement /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute><DoctorsManagement /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<ProtectedRoute><DepartmentsManagement /></ProtectedRoute>} />
      <Route path="/admin/pharmacy" element={<ProtectedRoute><PharmacyInventory /></ProtectedRoute>} />
      <Route path="/admin/laboratory" element={<ProtectedRoute><LaboratoryManagement /></ProtectedRoute>} />
      <Route path="/admin/billing" element={<ProtectedRoute><BillingManagement /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
