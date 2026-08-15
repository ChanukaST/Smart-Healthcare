import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { FileText, Plus, Search, CheckCircle2, User, Stethoscope, Calendar } from 'lucide-react';

export const DoctorMedicalRecords = () => {
  const { user } = useAuth();
  const rawName = user?.fullName || user?.name || 'Doctor';
  const doctorName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}`;

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patient: 'Kamani Wijesinghe',
    patientId: 'PAT-2026-0042',
    diagnosis: 'Essential Hypertension (ICD-10 I10)',
    complaints: 'Mild morning headache and dizziness for past 3 days.',
    treatmentPlan: 'Maintain Losartan 50mg daily. Low-sodium diet and daily BP log.',
    followUp: '4 Weeks'
  });

  const [recordsList, setRecordsList] = useState([
    {
      id: 'REC-2026-001',
      date: 'May 12, 2026',
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      doctor: doctorName,
      department: 'Cardiology',
      diagnosis: 'Essential Hypertension (ICD-10 I10)',
      complaints: 'Routine blood pressure monitoring. BP recorded 128/82 mmHg.',
      treatment: 'Continue Losartan 50mg + Atorvastatin 10mg. Weight management.',
      status: 'CONFIRMED'
    },
    {
      id: 'REC-2026-002',
      date: 'May 10, 2026',
      patient: 'Johnathan Smith (UK)',
      patientId: 'INT-2026-0001',
      doctor: doctorName,
      department: 'Executive Cardiology',
      diagnosis: 'Pre-Travel Cardiac Assessment',
      complaints: 'Comprehensive executive screening before regional tour.',
      treatment: 'Normal ECG and stress profile. Atorvastatin 10mg bedtime maintained.',
      status: 'CONFIRMED'
    },
    {
      id: 'REC-2026-003',
      date: 'May 04, 2026',
      patient: 'Nimal Perera',
      patientId: 'PAT-2026-0089',
      doctor: doctorName,
      department: 'Cardiology',
      diagnosis: 'Chronic Stable Angina & Dysglycemia',
      complaints: 'Exertional substernal discomfort after climbing stairs.',
      treatment: 'Aspirin 75mg, Metformin 500mg bd. Advised 2D Echocardiogram.',
      status: 'CONFIRMED'
    }
  ]);

  const filteredRecords = recordsList.filter(rec => {
    return rec.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
           rec.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
           rec.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
           rec.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!newRecord.patient || !newRecord.diagnosis) return;

    const added = {
      id: `REC-2026-${String(recordsList.length + 10).padStart(3, '0')}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      patient: newRecord.patient,
      patientId: newRecord.patientId,
      doctor: doctorName,
      department: 'Cardiology',
      diagnosis: newRecord.diagnosis,
      complaints: newRecord.complaints,
      treatment: `${newRecord.treatmentPlan} (Follow-up: ${newRecord.followUp})`,
      status: 'CONFIRMED'
    };

    setRecordsList([added, ...recordsList]);
    setShowAddModal(false);
    setNewRecord({
      patient: 'Kamani Wijesinghe',
      patientId: 'PAT-2026-0042',
      diagnosis: 'Essential Hypertension (ICD-10 I10)',
      complaints: 'Mild morning headache and dizziness for past 3 days.',
      treatmentPlan: 'Maintain Losartan 50mg daily. Low-sodium diet and daily BP log.',
      followUp: '4 Weeks'
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
                Clinical Medical Records & EHR Registry
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Consultant: <strong>{doctorName}</strong> • Log and review patient diagnoses, notes, and treatment plans.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Log New Consultation Note
            </button>
          </div>

          {/* Add Record Modal */}
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
                Create Clinical Diagnosis & Consultation Record
              </h3>
              <form onSubmit={handleSaveRecord} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Select Patient</label>
                  <select
                    value={newRecord.patient}
                    onChange={(e) => {
                      const name = e.target.value;
                      let id = 'PAT-2026-0042';
                      if (name.includes('Nimal')) id = 'PAT-2026-0089';
                      if (name.includes('Johnathan')) id = 'INT-2026-0001';
                      if (name.includes('Ravindu')) id = 'PAT-2026-0104';
                      setNewRecord({ ...newRecord, patient: name, patientId: id });
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Clinical Diagnosis (ICD-10)</label>
                  <input
                    type="text"
                    required
                    value={newRecord.diagnosis}
                    onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Chief Complaints & Symptoms</label>
                  <textarea
                    rows={2}
                    required
                    value={newRecord.complaints}
                    onChange={(e) => setNewRecord({ ...newRecord, complaints: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Treatment & Care Plan</label>
                  <textarea
                    rows={2}
                    required
                    value={newRecord.treatmentPlan}
                    onChange={(e) => setNewRecord({ ...newRecord, treatmentPlan: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Follow-up Schedule</label>
                  <input
                    type="text"
                    value={newRecord.followUp}
                    onChange={(e) => setNewRecord({ ...newRecord, followUp: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save to Patient EMR</button>
                </div>
              </form>
            </div>
          )}

          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by patient, ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Medical Records Cards Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredRecords.map((rec) => (
              <div key={rec.id} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--primary-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                        {rec.diagnosis}
                      </h4>
                      <span className="badge badge-primary">{rec.id}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Patient: <strong>{rec.patient}</strong> ({rec.patientId}) • Attending: <strong>{rec.doctor}</strong>
                    </p>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-dark)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} color="var(--primary-blue)" /> {rec.date}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--bg-light)', padding: '0.85rem', borderRadius: '6px', fontSize: '0.88rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CHIEF COMPLAINTS:</strong>
                    <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-dark)' }}>{rec.complaints}</p>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MANAGEMENT & TREATMENT:</strong>
                    <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-dark)' }}>{rec.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
};

export default DoctorMedicalRecords;
