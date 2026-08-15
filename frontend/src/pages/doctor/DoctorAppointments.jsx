import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Calendar, Clock, Search, CheckCircle2, User, Play, XCircle, AlertCircle } from 'lucide-react';

export const DoctorAppointments = () => {
  const { user } = useAuth();
  const rawName = user?.fullName || user?.name || 'Doctor';
  const doctorName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}`;

  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConsultation, setActiveConsultation] = useState(null);

  // Initialize with hospital-wide OPD queue and patient-booked appointments
  const [appointmentsList, setAppointmentsList] = useState([
    { id: 'APT-1001', token: 'CAR-001', patientName: 'Kamani Wijesinghe', nic: '198471209341', time: '08:30 AM', date: 'May 20, 2026', type: 'Follow-up Consultation', status: 'CHECKED_IN', notes: 'Routine hypertension and lipid evaluation' },
    { id: 'APT-1002', token: 'CAR-002', patientName: 'Nimal Perera', nic: '197821094321', time: '09:00 AM', date: 'May 20, 2026', type: 'Chest Pain Evaluation', status: 'CHECKED_IN', notes: 'Referred by OPD triage desk for ECG review' },
    { id: 'APT-1003', token: 'CAR-003', patientName: 'Ravindu Silva', nic: '199514589210', time: '09:30 AM', date: 'May 20, 2026', type: 'General Cardiac Screening', status: 'IN_PROGRESS', notes: 'Active in consultation room 101' },
    { id: 'APT-1004', token: 'INT-001', patientName: 'Johnathan Smith (UK)', nic: 'N9821456', time: '10:00 AM', date: 'May 22, 2026', type: 'Executive VIP Consultation', status: 'CONFIRMED', notes: 'International liaison medical clearance' },
    { id: 'APT-1005', token: 'CAR-004', patientName: 'Sunethra Rajapaksha', nic: '196851209874', time: '10:30 AM', date: 'May 20, 2026', type: 'Post-CABG Review', status: 'COMPLETED', notes: 'Medication tolerated well, next follow-up in 3 months' }
  ]);

  const filteredAppointments = appointmentsList.filter(apt => {
    const matchFilter = filter === 'ALL' || apt.status === filter;
    const matchSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        apt.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        apt.nic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleUpdateStatus = (id, newStatus) => {
    setAppointmentsList(appointmentsList.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: newStatus };
      }
      return apt;
    }));
    if (activeConsultation && activeConsultation.id === id) {
      if (newStatus === 'COMPLETED') setActiveConsultation(null);
    }
  };

  const handleStartConsultation = (apt) => {
    handleUpdateStatus(apt.id, 'IN_PROGRESS');
    setActiveConsultation(apt);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="doctor" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                Today's OPD Appointments & Clinic Queue
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Consultant: <strong>{doctorName}</strong> • Cardiology & OPD Block (Room 101)
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>CHECKED-IN:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                  {appointmentsList.filter(a => a.status === 'CHECKED_IN' || a.status === 'IN_PROGRESS').length}
                </span>
              </div>
              <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>COMPLETED:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#16a34a' }}>
                  {appointmentsList.filter(a => a.status === 'COMPLETED').length}
                </span>
              </div>
            </div>
          </div>

          {/* Active Consultation Banner */}
          {activeConsultation && (
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              border: '2px solid #86efac',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.75rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="badge badge-success" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                    Active Patient in Room 101
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#14532d', margin: 0 }}>
                    {activeConsultation.patientName} (Token: {activeConsultation.token})
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#166534', marginTop: '0.3rem' }}>
                    NIC: {activeConsultation.nic} • Type: {activeConsultation.type} • Reason: {activeConsultation.notes}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleUpdateStatus(activeConsultation.id, 'COMPLETED')}
                    className="btn btn-primary"
                    style={{ backgroundColor: '#16a34a', borderColor: '#16a34a', fontWeight: '700' }}
                  >
                    Complete Consultation
                  </button>
                  <button
                    onClick={() => setActiveConsultation(null)}
                    className="btn btn-outline"
                  >
                    Minimize
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '360px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search patient, token (e.g. CAR-001)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['ALL', 'CHECKED_IN', 'IN_PROGRESS', 'CONFIRMED', 'COMPLETED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`btn ${filter === st ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Queue Token</th>
                  <th style={{ padding: '0.75rem' }}>Patient Name & NIC</th>
                  <th style={{ padding: '0.75rem' }}>Scheduled Time</th>
                  <th style={{ padding: '0.75rem' }}>Consultation Purpose</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ fontWeight: '900', color: 'var(--primary-blue)', fontSize: '1rem' }}>
                        {apt.token}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: '800', color: 'var(--text-dark)' }}>{apt.patientName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>NIC: {apt.nic}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '700' }}>
                        <Clock size={14} color="var(--primary-blue)" /> {apt.time}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{apt.date}</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                      <strong>{apt.type}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{apt.notes}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${
                        apt.status === 'COMPLETED' ? 'badge-primary' :
                        apt.status === 'IN_PROGRESS' ? 'badge-warning' :
                        apt.status === 'CHECKED_IN' ? 'badge-success' : 'badge-outline'
                      }`} style={{ fontSize: '0.75rem' }}>
                        {apt.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {apt.status === 'CHECKED_IN' && (
                        <button
                          onClick={() => handleStartConsultation(apt)}
                          className="btn btn-primary"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <Play size={12} /> Call In
                        </button>
                      )}
                      {apt.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, 'COMPLETED')}
                          className="btn btn-primary"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem', backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                        >
                          Finish
                        </button>
                      )}
                      {apt.status === 'CONFIRMED' && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Upcoming</span>
                      )}
                      {apt.status === 'COMPLETED' && (
                        <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle2 size={13} /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default DoctorAppointments;
