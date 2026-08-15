import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import PredictionCard from '../../components/dashboard/PredictionCard';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Pill, CreditCard, Clock, MapPin, Bell, CheckCircle2, ChevronRight } from 'lucide-react';

export const PatientDashboard = () => {
  const { user } = useAuth();
  
  const rawName = user?.fullName || user?.name || 'Patient';
  const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const upcoming = user?.upcomingAppointment;
  const records = user?.medicalRecords || [];
  const prescriptions = user?.prescriptions || [];
  const labReports = user?.labReports || [];
  const notifications = user?.notifications || [];
  const risk = user?.riskPrediction || {
    riskLevel: 'LOW',
    confidenceScore: 92,
    details: 'Attendance history and reminder responsiveness indicate low no-show probability.'
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          {/* Header & Patient Quick Badge */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                {getGreeting()}, {displayName}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.95rem' }}>
                Here is your health overview, personal medical records & appointment schedule.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span className="badge badge-success" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                Active Patient
              </span>
              <Link to="/patient/book-appointment" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}>
                Book Appointment
              </Link>
            </div>
          </div>

          {/* 4 Stat Overview Cards */}
          <div className="grid-cols-4" style={{ marginBottom: '1.75rem' }}>
            <StatCard 
              title="Upcoming Appointment" 
              value={upcoming ? upcoming.date : "None"} 
              change={upcoming ? `${upcoming.time} • ${upcoming.doctor}` : "No active bookings"} 
              icon={<Calendar size={22} />} 
            />
            <StatCard 
              title="Medical Records" 
              value={records.length.toString()} 
              change={records.length > 0 ? "View Consultation History" : "No past records"} 
              icon={<FileText size={22} />} 
            />
            <StatCard 
              title="Active Prescriptions" 
              value={prescriptions.length.toString()} 
              change={prescriptions.length > 0 ? "View Active Medications" : "No active medications"} 
              icon={<Pill size={22} />} 
            />
            <StatCard 
              title="Outstanding Payments" 
              value={`LKR ${user?.outstandingBalance || '0.00'}`} 
              change={user?.outstandingBalance && user?.outstandingBalance !== '0.00' ? "Invoice Pending" : "No Invoices Due"} 
              icon={<CreditCard size={22} />} 
            />
          </div>

          {/* Next Visit Banner or Schedule CTA Banner */}
          {upcoming ? (
            <div className="card" style={{
              background: 'linear-gradient(135deg, #0d9488, #0284c7)',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              borderRadius: '12px',
              marginBottom: '1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                  NEXT CLINIC VISIT
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginTop: '0.4rem', color: '#ffffff' }}>
                  {upcoming.department} with {upcoming.doctor}
                </h3>
                <div style={{ fontSize: '0.88rem', opacity: 0.9, marginTop: '0.35rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} /> {upcoming.date} at {upcoming.time}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} /> {upcoming.room || 'Room 101 (OPD)'}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>QUEUE TOKEN</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '900', letterSpacing: '1px' }}>{upcoming.token || 'CAR-008'}</div>
                <span style={{ background: '#22c55e', color: '#ffffff', padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
                  {upcoming.status || 'CONFIRMED'}
                </span>
              </div>
            </div>
          ) : (
            <div className="card" style={{
              background: 'linear-gradient(135deg, #f0fdfa, #f8fafc)',
              border: '1px dashed #0d9488',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                  No Upcoming Appointments Scheduled
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Need to see a specialist? Book a clinic consultation with our OPD doctors anytime.
                </p>
              </div>
              <Link to="/patient/book-appointment" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>
                Book Appointment &gt;
              </Link>
            </div>
          )}

          {/* 2-Column Section: Clinical Details + Notifications & ML Risk */}
          <div className="grid-cols-2" style={{ marginBottom: '1.75rem' }}>
            
            {/* Active Prescriptions */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary-blue)', margin: 0 }}>
                  Active Prescriptions ({prescriptions.length})
                </h4>
                <Link to="/patient/prescriptions" style={{ fontSize: '0.82rem', color: 'var(--secondary-teal)', fontWeight: '600' }}>
                  View All &gt;
                </Link>
              </div>

              {prescriptions.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {prescriptions.map((rx, idx) => (
                    <div key={rx.id || idx} style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-light)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-dark)' }}>{rx.medicineName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          {rx.dosage} • {rx.duration}
                        </div>
                        {rx.instruction && (
                          <div style={{ fontSize: '0.75rem', color: '#0d9488', marginTop: '0.2rem' }}>
                            Directions: {rx.instruction}
                          </div>
                        )}
                      </div>
                      <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{rx.status || 'ACTIVE'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No active prescriptions on record.</p>
              )}
            </div>

            {/* AI Health & Risk Prediction */}
            <div>
              <PredictionCard 
                title="AI Health & Appointment Risk Engine" 
                riskLevel={risk.riskLevel || "LOW"} 
                confidence={(risk.confidenceScore || 92) / 100}
                details={risk.details || "No-show risk is low. Prior attendance history and responsiveness remain consistent."} 
              />
            </div>
          </div>

          {/* Bottom Row: Recent Consultations & Notifications */}
          <div className="grid-cols-2">
            {/* Recent Medical Consultations */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary-blue)', margin: 0 }}>
                  Recent Consultations ({records.length})
                </h4>
                <Link to="/patient/medical-records" style={{ fontSize: '0.82rem', color: 'var(--secondary-teal)', fontWeight: '600' }}>
                  All Records &gt;
                </Link>
              </div>

              {records.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {records.slice(0, 3).map((rec, idx) => (
                    <div key={rec.id || idx} style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.88rem' }}>{rec.diagnosis}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {rec.doctor} • {rec.department}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{rec.status}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{rec.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No past records.</p>
              )}
            </div>

            {/* Personalized Notifications */}
            <div className="card">
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-blue)' }}>
                Patient Notifications
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
                {notifications.map((notif, idx) => (
                  <li key={notif.id || idx} style={{
                    padding: '0.75rem',
                    background: 'var(--bg-light)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    gap: '0.6rem',
                    alignItems: 'flex-start',
                    lineHeight: '1.4'
                  }}>
                    <Bell size={16} color="var(--primary-blue)" style={{ minWidth: '16px', marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-dark)' }}>{notif.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;

