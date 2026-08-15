import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import PredictionCard from '../../components/dashboard/PredictionCard';
import { useAuth } from '../../hooks/useAuth';
import { Calendar, Users, FlaskConical, Star } from 'lucide-react';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const rawName = user?.fullName || user?.name || 'Doctor';
  const displayName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}`;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="doctor" />
        <main className="page-container" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
              {getGreeting()}, {displayName}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>OPD Schedule & Clinical Analytics Overview</p>
          </div>

          <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
            <StatCard title="Today's Appointments" value="12" change="+2 vs yesterday" icon={<Calendar size={22} />} />
            <StatCard title="Patients Today" value="28" change="OPD Queue active" icon={<Users size={22} />} />
            <StatCard title="Pending Lab Results" value="8" change="Requires review" icon={<FlaskConical size={22} />} />
            <StatCard title="Average Rating" value="4.8 / 5.0" change="98% positive sentiment" icon={<Star size={22} />} />
          </div>

          <div className="grid-cols-2">
            <PredictionCard 
              title="Today's No-Show Predictions (ML Engine)" 
              riskLevel="MEDIUM" 
              confidence={0.91}
              details="Distribution: Low Risk (45%), Medium Risk (30%), High Risk (25%). 3 patients recommended for SMS reminder." 
            />
            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Patient Queue (OPD Cardiology)</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--secondary-teal-light)', borderRadius: '6px' }}>
                  <span>08:30 AM - Nimal Perera</span>
                  <span className="badge badge-success">Checked-in</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  <span>09:30 AM - Ravindu Silva</span>
                  <span className="badge badge-warning">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
