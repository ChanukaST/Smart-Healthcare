import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Pill, Plus, Search, CheckCircle2, Clock, Send } from 'lucide-react';

export const DoctorPrescriptions = () => {
  const { user } = useAuth();
  const rawName = user?.fullName || user?.name || 'Doctor';
  const doctorName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}`;

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRx, setNewRx] = useState({
    patient: 'Kamani Wijesinghe',
    patientId: 'PAT-2026-0042',
    medicine: 'Losartan Potassium 50mg',
    dosage: '1 Tablet daily in the morning',
    duration: '30 Days',
    instructions: 'Take after breakfast. Monitor BP regularly.'
  });

  const [prescriptionsList, setPrescriptionsList] = useState([
    {
      id: 'RX-2026-0042',
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      doctor: doctorName,
      date: 'May 12, 2026',
      medicine: 'Losartan Potassium 50mg',
      dosage: '1 Tablet Daily in morning',
      duration: '30 Days',
      instruction: 'Take with full glass of water. Low salt diet.',
      status: 'DISPENSED',
      pharmacyStatus: 'Fulfilled by Pharmacy Desk'
    },
    {
      id: 'RX-2026-0043',
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      doctor: doctorName,
      date: 'May 12, 2026',
      medicine: 'Atorvastatin 10mg',
      dosage: '1 Tablet Daily at bedtime',
      duration: '30 Days',
      instruction: 'Lipid management. Avoid grapefruit juice.',
      status: 'DISPENSED',
      pharmacyStatus: 'Fulfilled by Pharmacy Desk'
    },
    {
      id: 'RX-2026-0089',
      patient: 'Nimal Perera',
      patientId: 'PAT-2026-0089',
      doctor: doctorName,
      date: 'May 14, 2026',
      medicine: 'Metformin Hydrochloride 500mg',
      dosage: '1 Tablet Twice daily with meals',
      duration: '60 Days',
      instruction: 'Strict diabetic meal compliance.',
      status: 'SENT_TO_PHARMACY',
      pharmacyStatus: 'Pending Pharmacist Dispense'
    },
    {
      id: 'RX-INT-0001',
      patient: 'Johnathan Smith (UK)',
      patientId: 'INT-2026-0001',
      doctor: doctorName,
      date: 'May 10, 2026',
      medicine: 'Atorvastatin 20mg (Lipitor equivalent)',
      dosage: '1 Tablet Daily at night',
      duration: '30 Days',
      instruction: 'VIP international travel prescription pack.',
      status: 'DISPENSED',
      pharmacyStatus: 'Dispatched to Concierge'
    }
  ]);

  const filteredRx = prescriptionsList.filter(rx => {
    return rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
           rx.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
           rx.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleIssueRx = (e) => {
    e.preventDefault();
    if (!newRx.medicine || !newRx.patient) return;

    const added = {
      id: `RX-2026-${String(prescriptionsList.length + 100).padStart(4, '0')}`,
      patient: newRx.patient,
      patientId: newRx.patientId,
      doctor: doctorName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      medicine: newRx.medicine,
      dosage: newRx.dosage,
      duration: newRx.duration,
      instruction: newRx.instructions,
      status: 'SENT_TO_PHARMACY',
      pharmacyStatus: 'Sent to Hospital Pharmacy'
    };

    setPrescriptionsList([added, ...prescriptionsList]);
    setShowAddModal(false);
    setNewRx({
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      medicine: 'Losartan Potassium 50mg',
      dosage: '1 Tablet daily in the morning',
      duration: '30 Days',
      instructions: 'Take after breakfast. Monitor BP regularly.'
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
                Digital E-Prescriptions Desk
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Consultant: <strong>{doctorName}</strong> • Authorize and dispatch e-prescriptions directly to the Hospital Pharmacy.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Issue New Prescription
            </button>
          </div>

          {/* Issue Prescription Modal */}
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
                Issue Digital E-Prescription
              </h3>
              <form onSubmit={handleIssueRx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Select Patient</label>
                  <select
                    value={newRx.patient}
                    onChange={(e) => {
                      const name = e.target.value;
                      let id = 'PAT-2026-0042';
                      if (name.includes('Nimal')) id = 'PAT-2026-0089';
                      if (name.includes('Johnathan')) id = 'INT-2026-0001';
                      setNewRx({ ...newRx, patient: name, patientId: id });
                    }}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Kamani Wijesinghe">Kamani Wijesinghe (PAT-2026-0042)</option>
                    <option value="Nimal Perera">Nimal Perera (PAT-2026-0089)</option>
                    <option value="Johnathan Smith (UK)">Johnathan Smith (INT-2026-0001)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Medication & Strength</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Clopidogrel 75mg"
                    value={newRx.medicine}
                    onChange={(e) => setNewRx({ ...newRx, medicine: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Dosage & Frequency</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 Tablet once daily after food"
                    value={newRx.dosage}
                    onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Course Duration</label>
                  <select
                    value={newRx.duration}
                    onChange={(e) => setNewRx({ ...newRx, duration: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="7 Days">7 Days (Acute Course)</option>
                    <option value="14 Days">14 Days</option>
                    <option value="30 Days">30 Days (Monthly Maintenance)</option>
                    <option value="60 Days">60 Days (Bi-monthly)</option>
                    <option value="90 Days">90 Days (Quarterly)</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Pharmacy & Patient Directions</label>
                  <input
                    type="text"
                    value={newRx.instructions}
                    onChange={(e) => setNewRx({ ...newRx, instructions: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Send size={14} /> Transmit to Pharmacy
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search */}
          <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by medicine, patient, Rx #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Prescriptions Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Prescription #</th>
                  <th style={{ padding: '0.75rem' }}>Patient Name</th>
                  <th style={{ padding: '0.75rem' }}>Medication & Dosage</th>
                  <th style={{ padding: '0.75rem' }}>Course Duration</th>
                  <th style={{ padding: '0.75rem' }}>Pharmacy Dispense Status</th>
                  <th style={{ padding: '0.75rem' }}>Date Prescribed</th>
                </tr>
              </thead>
              <tbody>
                {filteredRx.map((rx) => (
                  <tr key={rx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {rx.id}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: '700' }}>{rx.patient}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rx.patientId}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Pill size={14} color="#0d9488" /> {rx.medicine}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{rx.dosage}</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>{rx.duration}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${rx.status === 'DISPENSED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>
                        {rx.pharmacyStatus}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{rx.date}</td>
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

export default DoctorPrescriptions;
