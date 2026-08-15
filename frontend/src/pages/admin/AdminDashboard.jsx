import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, PieChart } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <main className="page-container" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-blue)' }}>Hospital Admin Dashboard</h2>
            <p style={{ color: 'var(--text-muted)' }}>Hospital Operations, Financials & Resource Allocation</p>
          </div>

          <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
            <StatCard title="Total Patients" value="12,458" change="+12% YoY" icon={<Users size={22} />} />
            <StatCard title="Total Doctors" value="156" change="Across 10 departments" icon={<UserCheck size={22} />} />
            <StatCard title="Appointments (Today)" value="286" change="OPD + Special" icon={<Calendar size={22} />} />
            <StatCard title="Today's Revenue" value="LKR 245,000" change="+8% vs target" icon={<DollarSign size={22} />} />
          </div>

          <div className="grid-cols-2">
            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={16} /> Monthly Revenue Overview
              </h4>
              <div style={{ height: '200px', backgroundColor: 'var(--secondary-teal-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--primary-blue)' }}>
                Monthly Revenue: LKR 2,145,000 Total
              </div>
            </div>

            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <PieChart size={16} /> Department-wise OPD Share
              </h4>
              <div style={{ height: '200px', backgroundColor: 'var(--bg-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                Cardiology (35%) • Medicine (30%) • Surgery (20%) • Others (15%)
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
