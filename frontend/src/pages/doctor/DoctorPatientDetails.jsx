import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Search, User, FileText, Pill, FlaskConical, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';

export const DoctorPatientDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patientsDossier = [
    {
      id: 'PAT-2026-0042',
      name: 'Kamani Wijesinghe',
      nic: '198471209341',
      age: 42,
      gender: 'FEMALE',
      bloodGroup: 'B+',
      phone: '+94 77 345 6789',
      district: 'Colombo 03',
      allergies: 'Penicillin, NSAIDs',
      conditions: 'Essential Hypertension (Stage 1), Dyslipidemia',
      vitals: { bp: '128/82 mmHg', hr: '74 bpm', spo2: '98%', bmi: '23.4' },
      riskScore: 'LOW',
      noShowRisk: '14%',
      prescriptions: [
        { name: 'Losartan Potassium 50mg', dose: '1 Tablet Daily in morning', duration: '30 Days' },
        { name: 'Atorvastatin 10mg', dose: '1 Tablet Daily at bedtime', duration: '30 Days' }
      ],
      recentLabs: [
        { test: 'Lipid Profile', date: 'May 10, 2026', result: 'Total Cholesterol: 182 mg/dL, HDL: 52 mg/dL', status: 'Normal' },
        { test: 'Full Blood Count', date: 'May 10, 2026', result: 'Hb: 13.8 g/dL, WBC: 6,800 /uL', status: 'Normal' }
      ],
      consultationNotes: [
        { date: 'May 12, 2026', doctor: 'Dr. Anura Perera', notes: 'Blood pressure well-controlled on current ACE inhibitor regime. Advised 30 mins brisk walking.' },
        { date: 'Feb 15, 2026', doctor: 'Dr. K. L. Wickramasinghe', notes: 'Initial presentation of mild dizziness. Commenced anti-hypertensive titration.' }
      ]
    },
    {
      id: 'PAT-2026-0089',
      name: 'Nimal Perera',
      nic: '197821094321',
      age: 48,
      gender: 'MALE',
      bloodGroup: 'O+',
      phone: '+94 71 892 4156',
      district: 'Gampaha',
      allergies: 'No known drug allergies (NKDA)',
      conditions: 'Exertional Angina, Type 2 Diabetes Mellitus',
      vitals: { bp: '136/88 mmHg', hr: '82 bpm', spo2: '97%', bmi: '26.8' },
      riskScore: 'MEDIUM',
      noShowRisk: '28%',
      prescriptions: [
        { name: 'Metformin 500mg', dose: '1 Tablet twice daily after meals', duration: '60 Days' },
        { name: 'Aspirin 75mg', dose: '1 Tablet once daily after breakfast', duration: '60 Days' }
      ],
      recentLabs: [
        { test: 'Fasting Blood Sugar (FBS)', date: 'May 12, 2026', result: '118 mg/dL (Mild elevation)', status: 'Review' },
        { test: 'HbA1c', date: 'Apr 20, 2026', result: '6.8%', status: 'Target achieved' }
      ],
      consultationNotes: [
        { date: 'Apr 20, 2026', doctor: 'Dr. Anura Perera', notes: 'Cardiac stress test negative for acute ischemia. Diabetic diet reinforced.' }
      ]
    },
    {
      id: 'INT-2026-0001',
      name: 'Johnathan Smith',
      nic: 'N9821456',
      age: 48,
      gender: 'MALE',
      bloodGroup: 'O+',
      phone: '+44 7911 123456',
      district: 'London / International Concierge',
      allergies: 'Sulfa antibiotics',
      conditions: 'Executive Cardiac Screening, Borderline Hypercholesterolemia',
      vitals: { bp: '122/78 mmHg', hr: '68 bpm', spo2: '99%', bmi: '24.1' },
      riskScore: 'LOW',
      noShowRisk: '8%',
      prescriptions: [
        { name: 'Atorvastatin 10mg', dose: '1 Tablet daily at night', duration: '30 Days' }
      ],
      recentLabs: [
        { test: 'Lipid Profile & ECG', date: 'May 10, 2026', result: 'Cardiac markers normal. Cholesterol optimal.', status: 'Normal' }
      ],
      consultationNotes: [
        { date: 'May 10, 2026', doctor: 'Dr. Anura Perera', notes: 'Pre-travel comprehensive cardiac clearance provided. Fit for long-haul travel.' }
      ]
    }
  ];

  const [selectedPatient, setSelectedPatient] = useState(patientsDossier[0]);

  const filteredList = patientsDossier.filter(p => {
    return p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.nic.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="doctor" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
              Patient Electronic Medical Record (EMR) Dossier
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Comprehensive clinical profile, vitals history, active prescriptions, and diagnostic reports.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
            
            {/* Patient Search & List Column */}
            <div>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search by name, ID, NIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {filteredList.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPatient(p)}
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      border: `2px solid ${selectedPatient.id === p.id ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                      backgroundColor: selectedPatient.id === p.id ? 'var(--secondary-teal-light)' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>{p.name}</strong>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-blue)' }}>{p.id}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {p.gender} • {p.age} Yrs • {p.bloodGroup}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#0d9488', marginTop: '0.3rem', fontWeight: '600' }}>
                      {p.conditions}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Dossier Panel */}
            {selectedPatient && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Header Summary Card */}
                <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderTop: '4px solid var(--primary-blue)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary-blue)', margin: 0 }}>
                          {selectedPatient.name}
                        </h3>
                        <span className="badge badge-primary">{selectedPatient.id}</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                        NIC/Passport: <strong>{selectedPatient.nic}</strong> • Phone: <strong>{selectedPatient.phone}</strong> • Location: <strong>{selectedPatient.district}</strong>
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ textAlign: 'center', padding: '0.4rem 0.8rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontWeight: '800', fontSize: '0.85rem' }}>
                        Blood: {selectedPatient.bloodGroup}
                      </div>
                      <div style={{ textAlign: 'center', padding: '0.4rem 0.8rem', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem' }}>
                        AI Risk: {selectedPatient.riskScore}
                      </div>
                    </div>
                  </div>

                  {/* Vitals Ribbon */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.25rem', padding: '0.85rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>BLOOD PRESSURE</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>{selectedPatient.vitals.bp}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>HEART RATE</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0d9488' }}>{selectedPatient.vitals.hr}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>OXYGEN (SPO2)</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#16a34a' }}>{selectedPatient.vitals.spo2}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>BODY MASS INDEX</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-dark)' }}>{selectedPatient.vitals.bmi}</div>
                    </div>
                  </div>

                  {/* Allergies & Conditions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ padding: '0.75rem', border: '1px solid #fed7aa', backgroundColor: '#fff7ed', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '0.8rem', color: '#c2410c', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertTriangle size={14} /> Known Allergies
                      </strong>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.2rem', color: 'var(--text-dark)' }}>{selectedPatient.allergies}</p>
                    </div>
                    <div style={{ padding: '0.75rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-light)', borderRadius: '6px' }}>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--primary-blue)' }}>Chronic Medical Conditions</strong>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.2rem', color: 'var(--text-dark)' }}>{selectedPatient.conditions}</p>
                    </div>
                  </div>
                </div>

                {/* Active Prescriptions & Lab Results Side by Side */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  
                  {/* Prescriptions */}
                  <div className="card">
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Pill size={16} /> Active Prescriptions
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {selectedPatient.prescriptions.map((rx, idx) => (
                        <div key={idx} style={{ padding: '0.65rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#ffffff' }}>
                          <strong style={{ fontSize: '0.88rem' }}>{rx.name}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{rx.dose} • {rx.duration}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Labs */}
                  <div className="card">
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FlaskConical size={16} /> Diagnostic Lab Reports
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {selectedPatient.recentLabs.map((lab, idx) => (
                        <div key={idx} style={{ padding: '0.65rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: '#ffffff' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '0.88rem' }}>{lab.test}</strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lab.date}</span>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{lab.result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Consultation History */}
                <div className="card">
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={16} /> Clinical Consultation Notes History
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedPatient.consultationNotes.map((note, idx) => (
                      <div key={idx} style={{ padding: '0.75rem 1rem', borderLeft: '4px solid var(--primary-blue)', backgroundColor: 'var(--bg-light)', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                          <strong style={{ fontSize: '0.85rem', color: 'var(--primary-blue)' }}>{note.doctor}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.date}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', margin: 0 }}>{note.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;
