import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Activity } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ROLE_DOCTOR' || user.role === 'DOCTOR') return '/doctor/dashboard';
    if (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN') return '/admin/dashboard';
    return '/patient/dashboard';
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to={user ? getDashboardPath() : "/"} style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={24} color="var(--secondary-teal)" /> CarePlus
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: '600', fontSize: '0.95rem' }}>
        <Link to="/" style={{ color: 'var(--text-dark)' }}>Home</Link>
        <Link to="/doctors" style={{ color: 'var(--text-dark)' }}>Doctors</Link>
        <Link to="/departments" style={{ color: 'var(--text-dark)' }}>Departments</Link>
        <Link to="/international-patients" style={{ color: 'var(--text-dark)' }}>International Patients</Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Welcome, <strong>{user.name || user.fullName || 'User'}</strong></span>
            <Link to={getDashboardPath()} className="btn btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}>
              Dashboard
            </Link>
            <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}>
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
