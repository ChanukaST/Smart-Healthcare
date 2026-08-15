import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const buildNormalizedUserProfile = (userData) => {
  if (!userData) return null;

  const rawUsername = userData.username || (userData.email ? userData.email.split('@')[0] : 'patient');
  const rawName = userData.fullName || userData.name || (userData.email ? userData.email.split('@')[0] : 'Patient');
  const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const role = userData.role || 'ROLE_PATIENT';

  // Seeded defaults based on username / role
  if (rawUsername === 'patient_kamani' || rawName.toLowerCase().includes('kamani')) {
    return {
      ...userData,
      username: 'patient_kamani',
      fullName: 'Kamani Samarasinghe',
      name: 'Kamani',
      role: 'ROLE_PATIENT',
      patientId: 'PAT-2026-0001',
      nicPassport: '925143820V',
      age: 34,
      gender: 'FEMALE',
      bloodGroup: 'O+',
      phone: '+94 77 123 4567',
      address: 'No. 45, Galle Road, Bambalapitiya',
      district: 'Colombo',
      emergencyContactName: 'Sunil Samarasinghe',
      emergencyContactPhone: '+94 71 987 6543',
      medicalHistory: 'Mild asthma, penicillin allergy',
      upcomingAppointment: {
        id: 'APT-2026-01',
        date: 'May 20, 2026',
        time: '09:30 AM',
        doctor: 'Dr. Anura Perera',
        department: 'Cardiology',
        room: 'Room 101',
        token: 'CAR-001',
        status: 'CONFIRMED'
      },
      appointments: [
        { id: 'APT-2026-01', date: 'May 20, 2026', time: '09:30 AM', doctor: 'Dr. Anura Perera', department: 'Cardiology', room: 'Room 101', token: 'CAR-001', status: 'CONFIRMED' },
        { id: 'APT-2026-00', date: 'May 12, 2026', time: '10:00 AM', doctor: 'Dr. Anura Perera', department: 'Cardiology', room: 'Room 101', token: 'CAR-003', status: 'COMPLETED' },
        { id: 'APT-2025-99', date: 'Jan 15, 2026', time: '11:15 AM', doctor: 'Dr. Sumudu Bandara', department: 'General Medicine', room: 'Room 105', token: 'MED-012', status: 'COMPLETED' }
      ],
      medicalRecords: [
        { id: 'REC-2026-01', date: 'May 12, 2026', doctor: 'Dr. Anura Perera', department: 'Cardiology', diagnosis: 'Routine Cardiac Evaluation', notes: 'Blood pressure 125/80 mmHg, ECG sinus rhythm normal. Continue prescribed inhaler as needed.', status: 'COMPLETED' },
        { id: 'REC-2026-02', date: 'Jan 15, 2026', doctor: 'Dr. Sumudu Bandara', department: 'General Medicine', diagnosis: 'Mild Upper Respiratory Infection', notes: 'Prescribed Cetirizine 10mg & Paracetamol. Advised steam inhalation.', status: 'RESOLVED' }
      ],
      prescriptions: [
        { id: 'RX-2026-01', medicineName: 'Paracetamol 500mg (Panadol)', dosage: '1-2 Tablets every 6 hours', duration: '5 Days', doctor: 'Dr. Anura Perera', status: 'ACTIVE', instruction: 'Take after meals as needed' },
        { id: 'RX-2026-02', medicineName: 'Cetirizine 10mg (Cetrine)', dosage: '1 Tablet at bedtime', duration: '7 Days', doctor: 'Dr. Sumudu Bandara', status: 'ACTIVE', instruction: 'Take with warm water' }
      ],
      labReports: [
        { id: 'LAB-2026-01', testName: 'Full Blood Count (FBC)', date: 'May 12, 2026', labTechnician: 'Nimal Fernando', result: 'Hb: 14.2 g/dL, WBC: 6,800 /uL, Platelets: 245,000 /uL', status: 'REVIEWED', isNormal: true },
        { id: 'LAB-2026-02', testName: 'Lipid Profile', date: 'Apr 25, 2026', labTechnician: 'Nimal Fernando', result: 'Total Cholesterol: 185 mg/dL, HDL: 50 mg/dL, LDL: 110 mg/dL', status: 'REVIEWED', isNormal: true }
      ],
      invoices: [
        { id: 'INV-2026-0001', date: 'May 12, 2026', description: 'Consultation with Dr. Anura Perera + FBC Lab Test', amount: 4300.00, status: 'PAID', method: 'Cash (Receipt REC-09821)' }
      ],
      outstandingBalance: '0.00',
      riskPrediction: {
        riskLevel: 'LOW',
        noShowProbability: 14,
        confidenceScore: 91,
        attendanceScore: '96%',
        details: 'Attendance pattern is consistent with 0 prior unnotified absences. High appointment reliability.'
      },
      notifications: [
        { id: 1, type: 'appointment', text: 'Upcoming Cardiology consultation with Dr. Anura Perera on May 20 at 09:30 AM (Room 101, Token CAR-001).' },
        { id: 2, type: 'lab', text: 'Lab Results Ready: Full Blood Count (FBC) report uploaded and verified by Pathology Desk.' }
      ]
    };
  }

  if (rawUsername === 'int_john' || rawName.toLowerCase().includes('john')) {
    return {
      ...userData,
      username: 'int_john',
      fullName: 'Johnathan Smith',
      name: 'Johnathan',
      role: 'ROLE_PATIENT',
      patientId: 'INT-2026-0001',
      nicPassport: 'N9821456',
      age: 48,
      gender: 'MALE',
      bloodGroup: 'O+',
      nationality: 'British',
      country: 'United Kingdom',
      currency: 'GBP',
      phone: '+44 7911 123456',
      address: 'London, United Kingdom (Visiting Colombo)',
      district: 'International / Colombo Liaison',
      emergencyContactName: 'Emma Smith (UK)',
      emergencyContactPhone: '+44 7911 876543',
      medicalHistory: 'Cardiac checkup, travel coordination requested.',
      upcomingAppointment: {
        id: 'APT-INT-01',
        date: 'May 22, 2026',
        time: '10:00 AM',
        doctor: 'Dr. Anura Perera',
        department: 'Executive Cardiology',
        room: 'Executive Suite 202',
        token: 'INT-001',
        status: 'CONFIRMED'
      },
      appointments: [
        { id: 'APT-INT-01', date: 'May 22, 2026', time: '10:00 AM', doctor: 'Dr. Anura Perera', department: 'Executive Cardiology', room: 'Executive Suite 202', token: 'INT-001', status: 'CONFIRMED' }
      ],
      medicalRecords: [
        { id: 'REC-INT-01', date: 'May 10, 2026', doctor: 'Dr. Anura Perera', department: 'Cardiology', diagnosis: 'Pre-Travel Cardiac Assessment', notes: 'International patient transfer and medical concierge clearance.', status: 'COMPLETED' }
      ],
      prescriptions: [
        { id: 'RX-INT-01', medicineName: 'Atorvastatin 10mg', dosage: '1 Tablet daily at night', duration: '30 Days', doctor: 'Dr. Anura Perera', status: 'ACTIVE', instruction: 'Continue maintenance dose' }
      ],
      labReports: [
        { id: 'LAB-INT-01', testName: 'Lipid Profile & ECG', date: 'May 10, 2026', labTechnician: 'Nimal Fernando', result: 'Cardiac markers normal. Cholesterol optimal.', status: 'REVIEWED', isNormal: true }
      ],
      invoices: [
        { id: 'INV-INT-01', date: 'May 10, 2026', description: 'Executive International Health Screening Package', amount: 35000.00, status: 'PAID', method: 'International Card (GBP £87.50)' }
      ],
      outstandingBalance: '0.00',
      riskPrediction: {
        riskLevel: 'LOW',
        noShowProbability: 8,
        confidenceScore: 96,
        attendanceScore: '100%',
        details: 'VIP International Concierge service assigned. Verified confirmation.'
      },
      notifications: [
        { id: 1, type: 'appointment', text: 'Airport concierge & hospital suite coordination confirmed for May 22.' }
      ]
    };
  }

  // Dynamic clean profile for newly registered/logged-in patients (e.g. chanuka, new users)
  return {
    ...userData,
    username: rawUsername,
    fullName: formattedName,
    name: formattedName,
    role: role,
    patientId: userData.patientId || `PAT-2026-${(Math.abs(rawUsername.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) * 37) % 9000 + 1000)}`,
    nicPassport: userData.nic || userData.nicPassport || 'N/A',
    age: userData.age || (userData.nic ? (new Date().getFullYear() - 1998) : 26),
    gender: userData.gender || 'NOT SPECIFIED',
    bloodGroup: userData.bloodGroup || 'Not Recorded',
    phone: userData.phone || 'N/A',
    address: userData.address || 'Sri Lanka',
    district: userData.district || 'Western Province',
    emergencyContactName: userData.emergencyContactName || null,
    emergencyContactPhone: userData.emergencyContactPhone || null,
    medicalHistory: userData.medicalHistory || 'No past medical records logged yet.',
    upcomingAppointment: userData.upcomingAppointment || null,
    appointments: userData.appointments || [],
    medicalRecords: userData.medicalRecords || [],
    prescriptions: userData.prescriptions || [],
    labReports: userData.labReports || [],
    invoices: userData.invoices || [],
    outstandingBalance: userData.outstandingBalance || '0.00',
    riskPrediction: userData.riskPrediction || {
      riskLevel: 'NEW_PATIENT',
      confidenceScore: null,
      details: 'Welcome to CarePlus! Book your first consultation to generate personalized health & appointment analytics.'
    },
    notifications: userData.notifications || [
      { id: 1, type: 'welcome', text: `Welcome to CarePlus Health Portal, ${formattedName}! Click 'Book Appointment' to schedule your first clinic consultation.` }
    ]
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    const normalized = buildNormalizedUserProfile(userData);
    setUser(normalized);
    localStorage.setItem('user', JSON.stringify(normalized));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updatedFields) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  const addAppointment = (newAppointment) => {
    setUser(prev => {
      if (!prev) return prev;
      const existing = prev.appointments || [];
      const updatedAppointments = [newAppointment, ...existing];
      const updated = {
        ...prev,
        upcomingAppointment: newAppointment,
        appointments: updatedAppointments,
        notifications: [
          {
            id: Date.now(),
            type: 'appointment',
            text: `Appointment booked for ${newAppointment.date} at ${newAppointment.time} with ${newAppointment.doctor}.`
          },
          ...(prev.notifications || [])
        ]
      };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      addAppointment,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

