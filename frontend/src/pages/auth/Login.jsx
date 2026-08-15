import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const matchedUser = registeredUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() || 
      u.nic.toLowerCase() === email.toLowerCase() ||
      u.fullName.toLowerCase() === email.toLowerCase()
    );

    let role = 'ROLE_PATIENT';
    if (email.includes('doctor') || email.startsWith('dr_')) role = 'ROLE_DOCTOR';
    if (email.includes('admin')) role = 'ROLE_ADMIN';

    let userPayload = {
      email,
      username: email.split('@')[0],
      name: email.split('@')[0],
      fullName: email.split('@')[0],
      role
    };

    if (matchedUser) {
      userPayload = {
        ...userPayload,
        fullName: matchedUser.fullName,
        name: matchedUser.fullName,
        nic: matchedUser.nic,
        nicPassport: matchedUser.nic,
        phone: matchedUser.phone,
        email: matchedUser.email
      };
    }

    login(userPayload, 'mock-jwt-token');
    
    if (role === 'ROLE_DOCTOR') navigate('/doctor/dashboard');
    else if (role === 'ROLE_ADMIN') navigate('/admin/dashboard');
    else navigate('/patient/dashboard');
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem' }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>Welcome Back!</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Sign in to your patient or doctor portal</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>Email or NIC / Passport</label>
              <input 
                type="text" 
                required 
                placeholder="Enter your email or NIC" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>Password</label>
              <input 
                type="password" 
                required 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary-blue)' }}>Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontWeight: '700' }}>
              Sign In
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
            New Patient? <Link to="/register" style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
