import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MapPin, Clock } from 'lucide-react';

export const MyAppointments = () => {
  const [tab, setTab] = useState('upcoming');
  const { user } = useAuth();
  const appointments = user?.appointments || [];

  const filteredAppointments = appointments.filter(apt => {
    if (tab === 'upcoming') return apt.status === 'CONFIRMED' || apt.status === 'PENDING';
    if (tab === 'completed') return apt.status === 'COMPLETED' || apt.status === 'RESOLVED';
    if (tab === 'cancelled') return apt.status === 'CANCELLED';
    return true;
  });

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                My Appointments
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Appointments for {user?.fullName || user?.name || 'Patient'} ({user?.patientId || 'PAT-2026-0042'})
              </p>
            </div>
            <Link to="/patient/book-appointment" className="btn btn-primary">+ Book New</Link>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            {['upcoming', 'completed', 'cancelled'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: tab === t ? '700' : '500',
                  color: tab === t ? 'var(--primary-blue)' : 'var(--text-muted)',
                  borderBottom: tab === t ? '2px solid var(--primary-blue)' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {t} ({appointments.filter(a => {
                  if (t === 'upcoming') return a.status === 'CONFIRMED' || a.status === 'PENDING';
                  if (t === 'completed') return a.status === 'COMPLETED' || a.status === 'RESOLVED';
                  if (t === 'cancelled') return a.status === 'CANCELLED';
                  return true;
                }).length})
              </button>
            ))}
          </div>

          <div className="card">
            {filteredAppointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredAppointments.map((apt, idx) => {
                  const dateParts = apt.date ? apt.date.split(' ') : ['20', 'MAY', '2026'];
                  const day = dateParts[1] ? dateParts[1].replace(',', '') : '20';
                  const month = dateParts[0] ? dateParts[0].toUpperCase().slice(0, 3) : 'MAY';

                  return (
                    <div key={apt.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center', padding: '0.5rem 1rem', backgroundColor: 'var(--secondary-teal-light)', borderRadius: '8px', minWidth: '70px' }}>
                          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--secondary-teal)' }}>{day}</div>
                          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>{month}</div>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>{apt.doctor}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <span>{apt.department}</span> • <MapPin size={13} /> {apt.room || 'OPD Clinic Room 101'}
                          </p>
                          {apt.token && (
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0d9488' }}>
                              Token: {apt.token}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge ${apt.status === 'CONFIRMED' ? 'badge-success' : apt.status === 'COMPLETED' ? 'badge-primary' : 'badge-danger'}`}>
                          {apt.status}
                        </span>
                        <div style={{ marginTop: '0.3rem', fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.3rem' }}>
                          <Clock size={14} /> {apt.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                <p>No {tab} appointments found for your account.</p>
                {tab === 'upcoming' && (
                  <Link to="/patient/book-appointment" className="btn btn-primary" style={{ marginTop: '0.75rem', display: 'inline-block' }}>
                    Book an Appointment
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAppointments;
