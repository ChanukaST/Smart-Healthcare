import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { FlaskConical, Search, Plus, CheckCircle2, Clock } from 'lucide-react';

export const LaboratoryManagement = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLab, setNewLab] = useState({
    patientName: '',
    testName: 'Full Blood Count (FBC)',
    doctor: 'Dr. Anura Perera',
    priority: 'ROUTINE'
  });

  const [labTests, setLabTests] = useState([
    { id: 'LAB-2026-001', patient: 'Kamani Wijesinghe', test: 'Full Blood Count (FBC)', doctor: 'Dr. Sumudu Bandara', date: 'May 12, 2026', technician: 'Nimal Fernando', result: 'Hb: 14.8 g/dL, WBC: 6,500 /uL, Platelets: 260,000 /uL', status: 'COMPLETED' },
    { id: 'LAB-2026-002', patient: 'Nimal Perera', test: 'Lipid Profile', doctor: 'Dr. Anura Perera', date: 'May 12, 2026', technician: 'Nimal Fernando', result: 'Total Cholesterol: 178 mg/dL, HDL: 54 mg/dL', status: 'COMPLETED' },
    { id: 'LAB-2026-003', patient: 'Ravindu Silva', test: 'Dengue NS1 Antigen', doctor: 'Dr. K. L. Wickramasinghe', date: 'May 14, 2026', technician: 'Nimal Fernando', result: 'Negative (Non-Reactive)', status: 'COMPLETED' },
    { id: 'LAB-2026-004', patient: 'Sunethra Rajapaksha', test: 'Fasting Blood Sugar (FBS)', doctor: 'Dr. K. L. Wickramasinghe', date: 'May 15, 2026', technician: 'Unassigned', result: 'Sample collected, in analyzer', status: 'IN_PROGRESS' },
    { id: 'LAB-2026-005', patient: 'Kasun Jayatissa', test: 'Full Blood Count (FBC)', doctor: 'Dr. Anura Perera', date: 'May 15, 2026', technician: 'Unassigned', result: 'Awaiting phlebotomy collection', status: 'PENDING' }
  ]);

  const filteredTests = labTests.filter(t => {
    const matchFilter = filter === 'ALL' || t.status === filter;
    const matchSearch = t.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.test.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleUpdateStatus = (id, newStatus) => {
    setLabTests(labTests.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: newStatus,
          result: newStatus === 'COMPLETED' ? 'Verified: All baseline parameters within normal clinical limits.' : t.result,
          technician: 'Nimal Fernando (Senior Tech)'
        };
      }
      return t;
    }));
  };

  const handleAddLabOrder = (e) => {
    e.preventDefault();
    if (!newLab.patientName) return;

    const added = {
      id: `LAB-2026-${String(labTests.length + 1).padStart(3, '0')}`,
      patient: newLab.patientName,
      test: newLab.testName,
      doctor: newLab.doctor,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      technician: 'Pending Phlebotomy',
      result: 'Order queued for sample collection',
      status: 'PENDING'
    };

    setLabTests([added, ...labTests]);
    setShowAddModal(false);
    setNewLab({ patientName: '', testName: 'Full Blood Count (FBC)', doctor: 'Dr. Anura Perera', priority: 'ROUTINE' });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                Diagnostic Laboratory & Pathology Desk
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Manage pathology orders, sample accessioning, technician verification, and automated result publishing.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> New Lab Order
            </button>
          </div>

          {/* Add Lab Modal */}
          {showAddModal && (
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                Create Clinical Laboratory Order
              </h3>
              <form onSubmit={handleAddLabOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nimal Perera"
                    value={newLab.patientName}
                    onChange={(e) => setNewLab({ ...newLab, patientName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Laboratory Investigation</label>
                  <select
                    value={newLab.testName}
                    onChange={(e) => setNewLab({ ...newLab, testName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Full Blood Count (FBC)">Full Blood Count (FBC)</option>
                    <option value="Lipid Profile">Lipid Profile</option>
                    <option value="Fasting Blood Sugar (FBS)">Fasting Blood Sugar (FBS)</option>
                    <option value="Dengue NS1 Antigen">Dengue NS1 Antigen</option>
                    <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
                    <option value="Serum Creatinine / Renal">Serum Creatinine / Renal</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Ordering Physician</label>
                  <input
                    type="text"
                    required
                    value={newLab.doctor}
                    onChange={(e) => setNewLab({ ...newLab, doctor: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Priority</label>
                  <select
                    value={newLab.priority}
                    onChange={(e) => setNewLab({ ...newLab, priority: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="ROUTINE">Routine OPD (Within 4 hrs)</option>
                    <option value="URGENT">STAT / Urgent Emergency (Within 45 mins)</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Dispatch Lab Order</button>
                </div>
              </form>
            </div>
          )}

          {/* Filter & Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '360px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by Test ID, Patient, or Test..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((st) => (
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

          {/* Laboratory Tests Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Test Order #</th>
                  <th style={{ padding: '0.75rem' }}>Patient Name</th>
                  <th style={{ padding: '0.75rem' }}>Investigation Test</th>
                  <th style={{ padding: '0.75rem' }}>Ordering Doctor</th>
                  <th style={{ padding: '0.75rem' }}>Result Summary</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((lab) => (
                  <tr key={lab.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {lab.id}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '700' }}>{lab.patient}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <FlaskConical size={14} color="#0d9488" /> {lab.test}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{lab.doctor}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.82rem' }}>{lab.result}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${lab.status === 'COMPLETED' ? 'badge-success' : lab.status === 'IN_PROGRESS' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.75rem' }}>
                        {lab.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {lab.status === 'PENDING' && (
                        <button
                          onClick={() => handleUpdateStatus(lab.id, 'IN_PROGRESS')}
                          className="btn btn-primary"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          Collect Sample
                        </button>
                      )}
                      {lab.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleUpdateStatus(lab.id, 'COMPLETED')}
                          className="btn btn-primary"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', backgroundColor: '#16a34a' }}
                        >
                          Verify & Publish
                        </button>
                      )}
                      {lab.status === 'COMPLETED' && (
                        <button
                          onClick={() => alert(`Laboratory Report for ${lab.patient}\nTest: ${lab.test}\nResult: ${lab.result}\nVerified by: ${lab.technician}`)}
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          View Report
                        </button>
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

export default LaboratoryManagement;
