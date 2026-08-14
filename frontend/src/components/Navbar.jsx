import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, UserCheck, Stethoscope, HeartPulse, 
  Pill, TestTube2, ShieldCheck, LogOut, Clock, Tv, 
  User, Globe, Sparkles, Activity, CheckCircle2, ChevronRight, Lock 
} from 'lucide-react';

export const Sidebar = ({ activeView, setActiveView }) => {
  const { user, switchRole } = useAuth();

  // Master navigation list
  const allNavItems = [
    { id: 'ADMIN', label: 'Executive Dashboard', icon: ShieldCheck, role: 'ADMIN' },
    { id: 'DOCTOR', label: 'Doctor OPD Desk', icon: Stethoscope, role: 'DOCTOR' },
    { id: 'RECEPTIONIST', label: 'Reception & Billing', icon: UserCheck, role: 'RECEPTIONIST' },
    { id: 'NURSE', label: 'Nurse Ward Matrix', icon: HeartPulse, role: 'NURSE' },
    { id: 'PHARMACIST', label: 'Pharmacy & Stock', icon: Pill, role: 'PHARMACIST' },
    { id: 'LAB_TECHNICIAN', label: 'Diagnostic Lab', icon: TestTube2, role: 'LAB_TECHNICIAN' },
    { id: 'PATIENT', label: 'Local Patient EMR', icon: User, role: 'PATIENT' },
    { id: 'INTERNATIONAL_PATIENT', label: 'Foreign Patient Pathway', icon: Globe, role: 'INTERNATIONAL_PATIENT' },
  ];

  // RBAC Permission Map - Only show authorized menu tabs per role
  const roleAllowedItems = {
    ADMIN: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE', 'PHARMACIST', 'LAB_TECHNICIAN', 'PATIENT', 'INTERNATIONAL_PATIENT'],
    RECEPTIONIST: ['RECEPTIONIST'],
    DOCTOR: ['DOCTOR'],
    NURSE: ['NURSE'],
    PHARMACIST: ['PHARMACIST'],
    LAB_TECHNICIAN: ['LAB_TECHNICIAN'],
    PATIENT: ['PATIENT'],
    INTERNATIONAL_PATIENT: ['INTERNATIONAL_PATIENT'],
  };

  const currentRole = user?.role || 'ADMIN';
  const allowedRoles = roleAllowedItems[currentRole] || [currentRole];
  const filteredNavItems = allNavItems.filter(item => allowedRoles.includes(item.role));

  const isAnalyticsAllowed = currentRole === 'ADMIN' || currentRole === 'DOCTOR';
  const isDisplayBoardAllowed = currentRole === 'ADMIN' || currentRole === 'RECEPTIONIST' || currentRole === 'DOCTOR';

  return (
    <aside className="hms-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Building2 color="#fff" size={24} />
        </div>
        <div className="sidebar-brand-text">
          <div className="sidebar-brand-title">LANKA CARE</div>
          <div className="sidebar-brand-subtitle">Smart Hospital Platform</div>
        </div>
      </div>

      <div className="sidebar-nav-section">
        <div className="sidebar-section-title">
          Authorized Role: <span style={{ color: '#0d9488' }}>{currentRole}</span>
        </div>
        <ul className="sidebar-menu">
          {filteredNavItems.map(item => {
            const Icon = item.icon;
            const isActive = user?.role === item.role && activeView === 'MAIN';
            return (
              <li 
                key={item.id} 
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  switchRole(item.role);
                  if (activeView !== 'MAIN') setActiveView('MAIN');
                }}
              >
                <Icon size={18} />
                <span className="sidebar-item-text">{item.label}</span>
                {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </li>
            );
          })}
        </ul>

        {(isAnalyticsAllowed || isDisplayBoardAllowed) && (
          <>
            <div className="sidebar-section-title" style={{ marginTop: '1.5rem' }}>Intelligence & Display</div>
            <ul className="sidebar-menu">
              {isAnalyticsAllowed && (
                <li 
                  className={`sidebar-item ${activeView === 'SMART_ANALYTICS' ? 'active' : ''}`}
                  onClick={() => setActiveView('SMART_ANALYTICS')}
                >
                  <Sparkles size={18} color="#38bdf8" />
                  <span className="sidebar-item-text">AI Healthcare Analytics</span>
                </li>
              )}
              {isDisplayBoardAllowed && (
                <li 
                  className={`sidebar-item ${activeView === 'DISPLAY_BOARD' ? 'active' : ''}`}
                  onClick={() => setActiveView('DISPLAY_BOARD')}
                >
                  <Tv size={18} color="#34d399" />
                  <span className="sidebar-item-text">OPD Waiting Call Board</span>
                </li>
              )}
            </ul>
          </>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span>RBAC Enforcement: Active</span>
        </div>
        <div className="status-indicator">
          <div className="status-dot" style={{ background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }}></div>
          <span>Spring Security & JWT</span>
        </div>
      </div>
    </aside>
  );
};

export const Header = ({ activeView, setActiveView }) => {
  const { user, logout, switchRole } = useAuth();
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const roles = [
    { id: 'RECEPTIONIST', label: 'Receptionist' },
    { id: 'DOCTOR', label: 'Doctor' },
    { id: 'NURSE', label: 'Nurse' },
    { id: 'PHARMACIST', label: 'Pharmacist' },
    { id: 'LAB_TECHNICIAN', label: 'Lab Tech' },
    { id: 'PATIENT', label: 'Patient' },
    { id: 'INTERNATIONAL_PATIENT', label: 'Foreign Patient' },
    { id: 'ADMIN', label: 'Admin (All Access)' },
  ];

  return (
    <header className="hms-top-bar">
      <div className="hospital-branch-badge">
        <Building2 size={16} color="#0f766e" />
        <span>Lanka Care International Hospital - Colombo</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Quick Role Switcher Bar */}
        <div className="role-pill-bar">
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', paddingLeft: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Lock size={12} /> Switch Role:
          </span>
          {roles.map(r => (
            <button
              key={r.id}
              className={`role-pill-btn ${user?.role === r.id ? 'active' : ''}`}
              onClick={() => {
                switchRole(r.id);
                if (activeView !== 'MAIN') setActiveView('MAIN');
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem' }}>
          <Clock size={16} color="#0f766e" />
          <span style={{ fontWeight: 700, color: '#0f172a' }}>{time}</span> (SLST)
        </div>

        {user && (
          <div className="user-profile-header">
            <div className="user-avatar">
              {user.fullName?.charAt(0) || 'U'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{user.fullName}</div>
              <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 700 }}>{user.role}</div>
            </div>
            <button 
              onClick={logout}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.4rem', borderRadius: '50%', width: '32px', height: '32px', border: '1px solid #cbd5e1' }}
              title="Logout"
            >
              <LogOut size={14} color="#ef4444" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
