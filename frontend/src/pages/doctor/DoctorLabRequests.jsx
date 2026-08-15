import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { FlaskConical, Plus, Search, CheckCircle2, Clock, Eye, AlertCircle } from 'lucide-react';

export const DoctorLabRequests = () => {
  const { user } = useAuth();
  const rawName = user?.fullName || user?.name || 'Doctor';
  const doctorName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}`;

  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [newOrder, setNewOrder] = useState({
    patient: 'Kamani Wijesinghe',
    patientId: 'PAT-2026-0042',
    test: 'Lipid Profile & Serum Cholesterol',
    priority: 'ROUTINE',
    indications: 'Assess response to Atorvastatin therapy.'
  });

  const [labOrdersList, setLabOrdersList] = useState([
    {
      id: 'LAB-2026-0042',
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      test: 'Full Blood Count (FBC)',
      date: 'May 12, 2026',
      priority: 'ROUTINE',
      status: 'COMPLETED',
      technician: 'Nimal Fernando (Pathology Lab)',
      findings: 'Hb: 14.8 g/dL (Normal: 12.0-16.0), WBC: 6,500 /uL (Normal: 4000-11000), Platelets: 260,000 /uL (Normal: 150000-450000). Parameters within optimal range.'
    },
    {
      id: 'LAB-2026-0089',
      patient: 'Nimal Perera',
      patientId: 'PAT-2026-0089',
      test: 'Lipid Profile & Serum Electrolytes',
      date: 'May 14, 2026',
      priority: 'ROUTINE',
      status: 'COMPLETED',
      technician: 'Nimal Fernando (Pathology Lab)',
      findings: 'Total Cholesterol: 178 mg/dL (Desirable: <200), HDL: 54 mg/dL (>40), Triglycerides: 145 mg/dL (<150). Good lipid control.'
    },
    {
      id: 'LAB-2026-0095',
      patient: 'Ravindu Silva',
      patientId: 'PAT-2026-0104',
      test: 'Dengue NS1 Antigen & Platelet Count',
      date: 'May 15, 2026',
      priority: 'URGENT_STAT',
      status: 'PROCESSING',
      technician: 'Assigned to Bio-Analyzer #2',
      findings: 'Sample accessioned at 11:20 AM. Analyzer in progress.'
    },
    {
      id: 'LAB-INT-0001',
      patient: 'Johnathan Smith (UK)',
      patientId: 'INT-2026-0001',
      test: 'Executive Cardiac Enzyme Biomarkers (Troponin I, CK-MB)',
      date: 'May 10, 2026',
      priority: 'ROUTINE',
      status: 'COMPLETED',
      technician: 'Nimal Fernando (Pathology Lab)',
      findings: 'Troponin I: <0.01 ng/mL (Negative/Normal). CK-MB: 12 U/L. No active myocardial injury detected.'
    }
  ]);

  const filteredOrders = labOrdersList.filter(o => {
    const matchFilter = filter === 'ALL' || o.status === filter;
    const matchSearch = o.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        o.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleOrderLab = (e) => {
    e.preventDefault();
    if (!newOrder.patient || !newOrder.test) return;

    const added = {
      id: `LAB-2026-${String(labOrdersList.length + 100).padStart(4, '0')}`,
      patient: newOrder.patient,
      patientId: newOrder.patientId,
      test: newOrder.test,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: newOrder.priority,
      status: 'PROCESSING',
      technician: 'Queued at Central Pathology Desk',
      findings: `Sample requested for: ${newOrder.indications}`
    };

    setLabOrdersList([added, ...labOrdersList]);
    setShowAddModal(false);
    setNewOrder({
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      test: 'Lipid Profile & Serum Cholesterol',
      priority: 'ROUTINE',
      indications: 'Assess response to Atorvastatin therapy.'
    });
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
                Diagnostic Laboratory & Pathology Orders
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Consultant: <strong>{doctorName}</strong> • Order diagnostic investigations and view verified pathology reports.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Order Diagnostic Test
            </button>
          </div>

          {/* Result Viewer Modal */}
          {selectedReport && (
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-success" style={{ marginBottom: '0.3rem', display: 'inline-block' }}>
                    Verified Clinical Report
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                    {selectedReport.test} — {selectedReport.patient} ({selectedReport.patientId})
                  </h3>
                </div>
                <button onClick={() => setSelectedReport(null)} className="btn btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}>
                  Close
                </button>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <div style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Verified By: <strong>{selectedReport.technician}</strong> • Date Tested: <strong>{selectedReport.date}</strong>
                </div>
                <strong style={{ display: 'block', marginBottom: '0.3rem', color: 'var(--primary-blue)' }}>Pathology Values & Reference Analysis:</strong>
                <p style={{ margin: 0, color: 'var(--text-dark)', lineHeight: '1.5' }}>{selectedReport.findings}</p>
              </div>
            </div>
          )}

          {/* Order Test Modal */}
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
                Request Diagnostic Pathology Investigation
              </h3>
              <form onSubmit={handleOrderLab} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Patient Name</label>
                  <select
                    value={newOrder.patient}
                    onChange={(e) => {
                      const name = e.target.value;
                      let id = 'PAT-2026-0042';
                      if (name.includes('Nimal')) id = 'PAT-2026-0089';
                      if (name.includes('Johnathan')) id = 'INT-2026-0001';
                      if (name.includes('Ravindu')) id = 'PAT-2026-0104';
                      setNewOrder({ ...newOrder, patient: name, patientId: id });
                    }}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Kamani Wijesinghe">Kamani Wijesinghe (PAT-2026-0042)</option>
                    <option value="Nimal Perera">Nimal Perera (PAT-2026-0089)</option>
                    <option value="Johnathan Smith (UK)">Johnathan Smith (INT-2026-0001)</option>
                    <option value="Ravindu Silva">Ravindu Silva (PAT-2026-0104)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Diagnostic Test</label>
                  <select
                    value={newOrder.test}
                    onChange={(e) => setNewOrder({ ...newOrder, test: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Lipid Profile & Serum Cholesterol">Lipid Profile & Serum Cholesterol</option>
                    <option value="Full Blood Count (FBC)">Full Blood Count (FBC)</option>
                    <option value="Dengue NS1 Antigen & Platelet Count">Dengue NS1 Antigen & Platelet Count</option>
                    <option value="Fasting Blood Sugar (FBS) & HbA1c">Fasting Blood Sugar (FBS) & HbA1c</option>
                    <option value="Cardiac Biomarkers (Troponin I, CK-MB)">Cardiac Biomarkers (Troponin I, CK-MB)</option>
                    <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
                    <option value="Serum Creatinine / Renal Panel">Serum Creatinine / Renal Panel</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Clinical Urgency</label>
                  <select
                    value={newOrder.priority}
                    onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="ROUTINE">Routine OPD (Within 4 Hours)</option>
                    <option value="URGENT_STAT">STAT / Emergency (Within 45 Minutes)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Clinical Indication</label>
                  <input
                    type="text"
                    required
                    value={newOrder.indications}
                    onChange={(e) => setNewOrder({ ...newOrder, indications: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Dispatch to Pathology Lab</button>
                </div>
              </form>
            </div>
          )}

          {/* Filters & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '360px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by test, patient, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['ALL', 'PROCESSING', 'COMPLETED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`btn ${filter === st ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {st === 'ALL' ? 'All Orders' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Lab Orders Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Lab Order #</th>
                  <th style={{ padding: '0.75rem' }}>Patient Name</th>
                  <th style={{ padding: '0.75rem' }}>Diagnostic Test</th>
                  <th style={{ padding: '0.75rem' }}>Date Ordered</th>
                  <th style={{ padding: '0.75rem' }}>Priority</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {ord.id}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: '700' }}>{ord.patient}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ord.patientId}</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <FlaskConical size={14} color="#0d9488" /> {ord.test}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ord.date}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        color: ord.priority === 'URGENT_STAT' ? '#e11d48' : '#0284c7',
                        backgroundColor: ord.priority === 'URGENT_STAT' ? '#ffe4e6' : '#e0f2fe',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px'
                      }}>
                        {ord.priority}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${ord.status === 'COMPLETED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>
                        {ord.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {ord.status === 'COMPLETED' ? (
                        <button
                          onClick={() => setSelectedReport(ord)}
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <Eye size={12} /> View Results
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>In Analyzer</span>
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

export default DoctorLabRequests;
