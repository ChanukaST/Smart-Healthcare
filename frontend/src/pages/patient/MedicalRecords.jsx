import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';

export const MedicalRecords = () => {
  const { user } = useAuth();
  const records = user?.medicalRecords || [];

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
              Personal Medical Records
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Electronic Medical Records (EMR) for {user?.fullName || user?.name || 'Patient'} ({user?.patientId || 'PAT-2026-0042'})
            </p>
          </div>

          <div className="card">
            {records.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Date</th>
                    <th style={{ padding: '0.75rem' }}>Consultant Doctor</th>
                    <th style={{ padding: '0.75rem' }}>Department</th>
                    <th style={{ padding: '0.75rem' }}>Diagnosis & Clinical Notes</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={rec.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '600' }}>{rec.date}</td>
                      <td style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--text-dark)' }}>{rec.doctor}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{rec.department}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <strong>{rec.diagnosis}</strong>
                        {rec.notes && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{rec.notes}</div>}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className="badge badge-success">{rec.status || 'COMPLETED'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No medical records available for this patient.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MedicalRecords;
