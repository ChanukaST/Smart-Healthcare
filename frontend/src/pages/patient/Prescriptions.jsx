import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Pill, Info } from 'lucide-react';

export const Prescriptions = () => {
  const { user } = useAuth();
  const prescriptions = user?.prescriptions || [];

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
              Prescriptions & Medications
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Active e-prescriptions and medication instructions issued by hospital doctors.
            </p>
          </div>

          <div className="card">
            {prescriptions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {prescriptions.map((rx, idx) => (
                  <div 
                    key={rx.id || idx}
                    style={{
                      padding: '1.25rem',
                      background: 'var(--bg-light)',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Pill size={18} color="var(--primary-blue)" />
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-dark)', margin: 0 }}>
                          {rx.medicineName}
                        </h4>
                        <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{rx.status || 'ACTIVE'}</span>
                      </div>
                      
                      <div style={{ marginTop: '0.5rem', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                        <strong>Dosage:</strong> {rx.dosage} • <strong>Course:</strong> {rx.duration}
                      </div>

                      {rx.instruction && (
                        <div style={{ marginTop: '0.3rem', fontSize: '0.82rem', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Info size={13} /> Directions: {rx.instruction}
                        </div>
                      )}

                      <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Prescribed by: {rx.doctor || 'Attending Physician'}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => alert(`Prescription Refill Request submitted to Hospital Pharmacy for ${rx.medicineName}.`)}
                        className="btn btn-outline" 
                        style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
                      >
                        Request Pharmacy Refill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                  <Pill size={36} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>No Active Prescriptions</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Prescriptions issued during consultations will be automatically accessible here.
                </p>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Prescriptions;
