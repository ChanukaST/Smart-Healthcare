import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import { TrendingUp, Target, Star, Pill, PieChart } from 'lucide-react';

export const AnalyticsDoctor = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="doctor" />
        <main className="page-container" style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--primary-blue)' }}>Doctor Clinical Analytics</h2>

          <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
            <StatCard title="Patients This Month" value="124" change="+15% growth" icon={<TrendingUp size={22} />} />
            <StatCard title="No-Show Rate" value="18%" change="-5% improvement" icon={<Target size={22} />} />
            <StatCard title="Average Rating" value="4.7 / 5.0" change="+0.3 rating" icon={<Star size={22} />} />
            <StatCard title="Prescriptions Issued" value="98" change="Active tracking" icon={<Pill size={22} />} />
          </div>

          <div className="grid-cols-2">
            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={16} /> Patient Trend Over Time
              </h4>
              <div style={{ height: '180px', backgroundColor: 'var(--secondary-teal-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)', fontWeight: '700' }}>
                Patient Visits Trend (Monthly Growth: +15%)
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <PieChart size={16} /> Risk Category Distribution
              </h4>
              <div style={{ height: '180px', backgroundColor: 'var(--bg-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)', fontWeight: '700' }}>
                Low Risk (45%) • Moderate Risk (30%) • High Risk (25%)
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDoctor;
