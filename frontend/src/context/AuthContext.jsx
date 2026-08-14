import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hms_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('hms_token') || null);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('hms_user', JSON.stringify(userData));
    localStorage.setItem('hms_token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hms_user');
    localStorage.removeItem('hms_token');
  };

  const switchRole = async (roleName) => {
    try {
      const res = await fetch(`/api/auth/demo-login/${roleName}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        login({ username: data.username, fullName: data.fullName, role: data.role }, data.token);
      } else {
        const demoUsers = {
          ADMIN: { username: 'admin', fullName: 'System Administrator', role: 'ADMIN' },
          RECEPTIONIST: { username: 'receptionist', fullName: 'Kasun Perera', role: 'RECEPTIONIST' },
          DOCTOR: { username: 'dr_anura', fullName: 'Dr. Anura Perera', role: 'DOCTOR' },
          NURSE: { username: 'nurse_priyani', fullName: 'Priyani Jayasinghe', role: 'NURSE' },
          PHARMACIST: { username: 'pharmacist_kamal', fullName: 'Kamal Silva', role: 'PHARMACIST' },
          LAB_TECHNICIAN: { username: 'lab_nimal', fullName: 'Nimal Fernando', role: 'LAB_TECHNICIAN' },
          PATIENT: { username: 'patient_kamani', fullName: 'Kamani Samarasinghe', role: 'PATIENT' },
          INTERNATIONAL_PATIENT: { username: 'int_john', fullName: 'Johnathan Smith', role: 'INTERNATIONAL_PATIENT' },
        };
        const u = demoUsers[roleName.toUpperCase()] || demoUsers.ADMIN;
        login(u, 'demo-token-' + roleName);
      }
    } catch (e) {
      const demoUsers = {
        ADMIN: { username: 'admin', fullName: 'System Administrator', role: 'ADMIN' },
        RECEPTIONIST: { username: 'receptionist', fullName: 'Kasun Perera', role: 'RECEPTIONIST' },
        DOCTOR: { username: 'dr_anura', fullName: 'Dr. Anura Perera', role: 'DOCTOR' },
        NURSE: { username: 'nurse_priyani', fullName: 'Priyani Jayasinghe', role: 'NURSE' },
        PHARMACIST: { username: 'pharmacist_kamal', fullName: 'Kamal Silva', role: 'PHARMACIST' },
        LAB_TECHNICIAN: { username: 'lab_nimal', fullName: 'Nimal Fernando', role: 'LAB_TECHNICIAN' },
        PATIENT: { username: 'patient_kamani', fullName: 'Kamani Samarasinghe', role: 'PATIENT' },
        INTERNATIONAL_PATIENT: { username: 'int_john', fullName: 'Johnathan Smith', role: 'INTERNATIONAL_PATIENT' },
      };
      const u = demoUsers[roleName.toUpperCase()] || demoUsers.ADMIN;
      login(u, 'demo-token-' + roleName);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
