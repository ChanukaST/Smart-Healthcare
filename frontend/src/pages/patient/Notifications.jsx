import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Bell, BellOff } from 'lucide-react';

export const Notifications = () => {
  const { user, updateUser } = useAuth();
  const [filter, setFilter] = useState('ALL');

  const notifications = user?.notifications || [];

  const handleClearAll = () => {
    updateUser({ notifications: [] });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                Patient Notifications
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Real-time appointment alerts, laboratory test uploads, and pharmacy refill updates.
              </p>
            </div>

            {notifications.length > 0 && (
              <button onClick={handleClearAll} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                Clear All Notifications
              </button>
            )}
          </div>

          <div className="card" style={{ maxWidth: '850px' }}>
            {notifications.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {notifications.map((notif, idx) => (
                  <div 
                    key={notif.id || idx}
                    style={{
                      padding: '1.1rem 1.25rem',
                      background: 'var(--bg-light)',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem'
                    }}
                  >
                    <div style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      padding: '0.6rem',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '40px',
                      minHeight: '40px',
                      color: 'var(--primary-blue)'
                    }}>
                      <Bell size={20} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                        {notif.text}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                        {notif.time || 'Recently received'} • System Notification
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                  <BellOff size={40} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>No New Notifications</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  You are all caught up! New clinical updates, queue alerts, and lab reports will appear here.
                </p>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Notifications;
