import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ role = 'patient' }) => {
  const location = useLocation();

  const patientLinks = [
    { label: 'Dashboard', path: '/patient/dashboard' },
    { label: 'Book Appointment', path: '/patient/book-appointment' },
    { label: 'My Appointments', path: '/patient/my-appointments' },
    { label: 'Medical Records', path: '/patient/medical-records' },
    { label: 'Medical Reports', path: '/patient/medical-reports' },
    { label: 'Prescriptions', path: '/patient/prescriptions' },
    { label: 'Payments', path: '/patient/payments' },
    { label: 'Notifications', path: '/patient/notifications' },
    { label: 'Feedback', path: '/patient/feedback' }
  ];

  const doctorLinks = [
    { label: 'Dashboard', path: '/doctor/dashboard' },
    { label: 'Today\'s Appointments', path: '/doctor/appointments' },
    { label: 'Patient Details', path: '/doctor/patient-details' },
    { label: 'Medical Records', path: '/doctor/medical-records' },
    { label: 'Prescriptions', path: '/doctor/prescriptions' },
    { label: 'Lab Requests', path: '/doctor/lab-requests' },
    { label: 'Analytics', path: '/doctor/analytics' }
  ];

  const adminLinks = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'User Management', path: '/admin/users' },
    { label: 'Patients List', path: '/admin/patients' },
    { label: 'Doctors List', path: '/admin/doctors' },
    { label: 'Departments', path: '/admin/departments' },
    { label: 'Pharmacy Inventory', path: '/admin/pharmacy' },
    { label: 'Laboratory', path: '/admin/laboratory' },
    { label: 'Billing & Reports', path: '/admin/billing' }
  ];

  const links = role === 'admin' ? adminLinks : role === 'doctor' ? doctorLinks : patientLinks;

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid var(--border-color)',
      minHeight: 'calc(100vh - 70px)',
      padding: '1.5rem 1rem'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: isActive ? 'var(--primary-blue)' : 'var(--text-dark)',
                backgroundColor: isActive ? 'var(--secondary-teal-light)' : 'transparent',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
