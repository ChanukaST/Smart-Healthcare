import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, KeyRound, User, UserCheck, Stethoscope, HeartPulse, Pill, TestTube2, ShieldCheck } from 'lucide-react';

export const LoginView = () => {
  const { login, switchRole } = useAuth();
  const [username, setUsername] = useState('receptionist');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        login({ username: data.username, fullName: data.fullName, role: data.role }, data.token);
      } else {
        const errData = await res.json().catch(() => ({}));
        setError(errData.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error to backend');
    } finally {
      setLoading(false);
    }
  };

  const demoRoles = [
    { id: 'RECEPTIONIST', title: 'Receptionist Desk', desc: 'Patient Registration, NIC Search, OPD Tickets, Billing', icon: UserCheck, color: '#0d9488' },
    { id: 'DOCTOR', title: 'Doctor Desk (OPD)', titleDesc: 'Dr. Anura Perera', desc: 'Clinic Queue, Consultation Notes, e-Prescriptions, Lab Requests', icon: Stethoscope, color: '#0284c7' },
    { id: 'NURSE', title: 'Nurse Ward Portal', titleDesc: 'Priyani Jayasinghe', desc: 'Inpatient Ward Map, Bed Allocation, Observations, Admissions', icon: HeartPulse, color: '#e11d48' },
    { id: 'PHARMACIST', title: 'Pharmacy Desk', titleDesc: 'Kamal Silva', desc: 'Prescription Queue, Drug Stock, Batch & Expiry Alerts, Dispensing', icon: Pill, color: '#d97706' },
    { id: 'LAB_TECHNICIAN', title: 'Laboratory Portal', titleDesc: 'Nimal Fernando', desc: 'Test Catalog, Sample Collection, Result Entry, Reports', icon: TestTube2, color: '#7c3aed' },
    { id: 'ADMIN', title: 'Admin & Analytics', titleDesc: 'Executive Board', desc: 'Hospital Dashboard, Revenue Metrics (LKR), Staff Management', icon: ShieldCheck, color: '#059669' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #0d9488, #0284c7)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', boxShadow: '0 8px 20px rgba(13,148,136,0.3)' }}>
          <Building2 color="#fff" size={36} />
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a' }}>Sri Lankan Hospital Management System</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.25rem' }}>Modular Monolith Technical Reference & Working Demonstration</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2rem' }}>
        {/* JWT Credentials Form */}
        <div className="card" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
            JWT User Login
          </h2>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ paddingLeft: '36px', width: '100%' }}
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <KeyRound size={18} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                <input 
                  type="password" 
                  className="form-control" 
                  style={{ paddingLeft: '36px', width: '100%' }}
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to HMS'}
            </button>
          </form>
        </div>

        {/* One-Click Role Selector */}
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>
            Instant Role Demonstration
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {demoRoles.map(role => {
              const Icon = role.icon;
              return (
                <div 
                  key={role.id} 
                  className="card" 
                  onClick={() => switchRole(role.id)}
                  style={{ cursor: 'pointer', borderLeft: `4px solid ${role.color}` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <div style={{ background: `${role.color}15`, color: role.color, padding: '8px', borderRadius: '8px' }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{role.title}</h3>
                      {role.titleDesc && <span style={{ fontSize: '0.72rem', color: role.color, fontWeight: 600 }}>{role.titleDesc}</span>}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: '1.3' }}>{role.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
