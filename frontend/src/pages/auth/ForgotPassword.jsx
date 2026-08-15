import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', padding: '2rem' }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>Forgot Password?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Enter your registered email or NIC / Passport to receive reset instructions.
          </p>

          {sent ? (
            <div style={{ padding: '1rem', backgroundColor: 'var(--secondary-teal-light)', borderRadius: '8px', color: 'var(--secondary-teal)', fontWeight: '600' }}>
              Reset link sent to your registered email!
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="text" 
                required 
                placeholder="Enter email or NIC / Passport" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Send Reset Link</button>
            </form>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/login" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
