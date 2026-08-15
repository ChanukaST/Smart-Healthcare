import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { FlaskConical } from 'lucide-react';

export const LabResults = () => {
  const { user } = useAuth();
  const labReports = user?.labReports || [];

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
              Laboratory Test Reports
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Verified clinical test results for {user?.fullName || user?.name || 'Patient'} ({user?.patientId || 'PAT-2026-0042'})
            </p>
          </div>

          <div className="card">
            {labReports.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Test Name</th>
                    <th style={{ padding: '0.75rem' }}>Date Sample Tested</th>
                    <th style={{ padding: '0.75rem' }}>Verified By</th>
                    <th style={{ padding: '0.75rem' }}>Result & Reference Range</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {labReports.map((lab, idx) => (
                    <tr key={lab.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FlaskConical size={16} /> {lab.testName}
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: '600' }}>{lab.date}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{lab.labTechnician || 'Pathology Desk'}</td>
                      <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                        <strong>{lab.result}</strong>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${lab.isNormal ? 'badge-success' : 'badge-warning'}`}>
                          {lab.status || 'REVIEWED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No laboratory reports found for this patient account.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LabResults;
