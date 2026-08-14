import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar, Header } from './components/Navbar';
import { LoginView } from './views/LoginView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { ReceptionistView } from './views/ReceptionistView';
import { DoctorView } from './views/DoctorView';
import { NurseView } from './views/NurseView';
import { PharmacistView } from './views/PharmacistView';
import { LabTechView } from './views/LabTechView';
import { PatientPortalView } from './views/PatientPortalView';
import { InternationalPatientView } from './views/InternationalPatientView';
import { SmartAnalyticsView } from './views/SmartAnalyticsView';
import { OpdDisplayBoardView } from './views/OpdDisplayBoardView';

const MainLayout = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('MAIN');

  if (!user && activeView === 'MAIN') {
    return (
      <div style={{ background: '#f1f5f9', minHeight: '100vh' }}>
        <Header activeView={activeView} setActiveView={setActiveView} />
        <main className="hms-page-container">
          <LoginView />
        </main>
      </div>
    );
  }

  const renderRoleView = () => {
    if (activeView === 'SMART_ANALYTICS') {
      return <SmartAnalyticsView />;
    }
    if (activeView === 'DISPLAY_BOARD') {
      return <OpdDisplayBoardView />;
    }

    switch (user?.role) {
      case 'RECEPTIONIST':
        return <ReceptionistView />;
      case 'DOCTOR':
        return <DoctorView />;
      case 'NURSE':
        return <NurseView />;
      case 'PHARMACIST':
        return <PharmacistView />;
      case 'LAB_TECHNICIAN':
        return <LabTechView />;
      case 'PATIENT':
        return <PatientPortalView />;
      case 'INTERNATIONAL_PATIENT':
        return <InternationalPatientView />;
      case 'ADMIN':
      default:
        return <AdminDashboardView />;
    }
  };

  return (
    <div className="hms-layout">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="hms-main-wrapper">
        <Header activeView={activeView} setActiveView={setActiveView} />
        <main className="hms-page-container">
          {renderRoleView()}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default App;
