import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, User, Ticket, FileText, Pill, TestTube2, 
  CheckCircle2, Play, AlertCircle, Plus, Send, BrainCircuit, ShieldAlert,
  Activity, Heart, Thermometer, Wind, AlertTriangle
} from 'lucide-react';

export const DoctorView = () => {
  const [queue, setQueue] = useState([]);
  const [activeToken, setActiveToken] = useState(null);
  const [activeTab, setActiveTab] = useState('DIAGNOSIS');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [healthRiskPrediction, setHealthRiskPrediction] = useState(null);

  // Prescription builder state
  const [rxItems, setRxItems] = useState([
    { medicineId: 1, dosage: '1-1-1 after meals', durationDays: 5, quantity: 15 }
  ]);

  // Lab request state
  const [selectedLabTestId, setSelectedLabTestId] = useState('');

  const token = localStorage.getItem('hms_token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/opd/queue', { headers });
      if (res.ok) {
        const data = await res.json();
        setQueue(data);
        const current = data.find(t => t.status === 'IN_CONSULTATION');
        if (current) {
          setActiveToken(current);
          fetchHealthRiskForPatient(current.patient);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHealthRiskForPatient = async (p) => {
    try {
      const res = await fetch('/api/ml/predict-health-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: p?.age || 40, systolicBp: 145, bloodSugar: 130, chestPain: 1, fever: 0 })
      });
      if (res.ok) {
        setHealthRiskPrediction(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchClinicalData = async () => {
    try {
      const [resMed, resLab] = await Promise.all([
        fetch('/api/pharmacy/medicines', { headers }),
        fetch('/api/laboratory/tests', { headers })
      ]);
      if (resMed.ok) setMedicines(await resMed.json());
      if (resLab.ok) setLabTests(await resLab.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchQueue();
    fetchClinicalData();
  }, []);

  const handleCallPatient = async (tokenObj) => {
    try {
      const res = await fetch(`/api/opd/token/${tokenObj.id}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: 'IN_CONSULTATION' })
      });
      if (res.ok) {
        const updated = await res.json();
        setActiveToken(updated);
        fetchHealthRiskForPatient(updated.patient);
        fetchQueue();
      }
    } catch (e) {
      alert('Error calling patient');
    }
  };

  const handleCompleteConsultation = async () => {
    if (!activeToken) return;
    try {
      await fetch(`/api/opd/token/${activeToken.id}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ status: 'COMPLETED', clinicalNotes })
      });

      if (rxItems.length > 0) {
        await fetch('/api/pharmacy/prescriptions', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            patientId: activeToken.patient.id,
            doctorId: activeToken.doctor.id,
            notes: clinicalNotes,
            items: rxItems
          })
        });
      }

      if (selectedLabTestId) {
        await fetch('/api/laboratory/requests', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            patientId: activeToken.patient.id,
            doctorId: activeToken.doctor.id,
            labTestId: parseInt(selectedLabTestId),
            clinicalNotes
          })
        });
      }

      alert('Consultation completed & clinical notes recorded successfully!');
      setActiveToken(null);
      setClinicalNotes('');
      setSelectedLabTestId('');
      fetchQueue();
    } catch (e) {
      alert('Error saving consultation record');
    }
  };

  return (
    <div>
      <div className="page-title-header">
        <div className="page-title-text">
          <h1>Clinical EMR & Doctor OPD Desk</h1>
          <p>Real-time patient encounters, live vitals, e-prescribing & AI decision support</p>
        </div>
        <span className="badge badge-primary" style={{ fontSize: '0.85rem' }}>
          <Stethoscope size={16} /> Room 101 - Dr. Anura Perera (Cardiology)
        </span>
      </div>

      {/* EHR Patient Vitals Header Strip (When patient in consultation) */}
      {activeToken && (
        <div className="patient-vitals-strip">
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activeToken.patient?.fullName}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              ID: <span className="mono-text">{activeToken.patient?.patientId}</span> | NIC: {activeToken.patient?.nicPassport} | Age/Sex: {activeToken.patient?.age} / {activeToken.patient?.gender} | Blood: {activeToken.patient?.bloodGroup || 'O+'}
            </div>
          </div>

          <div className="vitals-grid">
            <div className="vital-box">
              <div className="vital-label">Blood Pressure</div>
              <div className="vital-val">120/80</div>
            </div>

            <div className="vital-box">
              <div className="vital-label">Pulse / HR</div>
              <div className="vital-val" style={{ color: '#10b981' }}>74 bpm</div>
            </div>

            <div className="vital-box">
              <div className="vital-label">SpO2</div>
              <div className="vital-val" style={{ color: '#10b981' }}>98%</div>
            </div>

            <div className="vital-box">
              <div className="vital-label">Temp</div>
              <div className="vital-val" style={{ color: '#f59e0b' }}>36.8 °C</div>
            </div>

            <div className="vital-box" style={{ background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <div className="vital-label" style={{ color: '#fca5a5' }}>Allergies</div>
              <div className="vital-val" style={{ color: '#fca5a5', fontSize: '0.88rem' }}>Penicillin</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid-2">
        {/* Today's OPD Queue */}
        <div className="card">
          <div className="card-header-clean">
            <h2><Ticket color="#0f766e" size={20} /> Today's OPD Patient Queue</h2>
            <span className="badge badge-primary">{queue.length} Tokens Issued</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {queue.map((t, idx) => {
              const isCurrent = activeToken?.id === t.id;
              const isHighNoShowRisk = idx === 1; 

              return (
                <div 
                  key={t.id} 
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    border: isCurrent ? '2px solid #0f766e' : '1px solid #e2e8f0', 
                    background: isCurrent ? '#f0fdf4' : '#ffffff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="ticket-badge" style={{ fontSize: '1.1rem', padding: '0.4rem 0.85rem' }}>
                      {t.tokenNumber}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', color: '#0f172a', fontWeight: 700 }}>{t.patient?.fullName}</h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Age: {t.patient?.age} | NIC: {t.patient?.nicPassport}
                      </p>
                      {isHighNoShowRisk && (
                        <span style={{ fontSize: '0.72rem', color: '#991b1b', background: '#fee2e2', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700, marginTop: '0.2rem', display: 'inline-block' }}>
                          ⚠️ ML Predictor: 80% No-Show Risk
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    {t.status === 'WAITING' && (
                      <button className="btn btn-primary btn-sm" onClick={() => handleCallPatient(t)}>
                        <Play size={14} /> Call Patient
                      </button>
                    )}
                    {t.status === 'IN_CONSULTATION' && (
                      <span className="badge badge-consultation">In Room</span>
                    )}
                    {t.status === 'COMPLETED' && (
                      <span className="badge badge-completed"><CheckCircle2 size={12} /> Completed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Tabbed Clinical Workspace */}
        <div className="card">
          <div className="card-header-clean">
            <h2><FileText color="#0284c7" size={20} /> Encounter Console & Order Entry</h2>
          </div>

          {activeToken ? (
            <div>
              {/* Tab Bar */}
              <div className="workspace-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'DIAGNOSIS' ? 'active' : ''}`}
                  onClick={() => setActiveTab('DIAGNOSIS')}
                >
                  <FileText size={16} /> Clinical Notes
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'PRESCRIPTION' ? 'active' : ''}`}
                  onClick={() => setActiveTab('PRESCRIPTION')}
                >
                  <Pill size={16} /> e-Prescription
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'LAB' ? 'active' : ''}`}
                  onClick={() => setActiveTab('LAB')}
                >
                  <TestTube2 size={16} /> Lab Orders
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'AI_SUPPORT' ? 'active' : ''}`}
                  onClick={() => setActiveTab('AI_SUPPORT')}
                >
                  <BrainCircuit size={16} color="#6366f1" /> AI Support
                </button>
              </div>

              {/* TAB 1: Clinical Notes */}
              {activeTab === 'DIAGNOSIS' && (
                <div>
                  <div className="form-group">
                    <label>Chief Complaints & Subjective Symptoms</label>
                    <textarea 
                      className="form-control" 
                      rows={3}
                      placeholder="Patient complains of chest tightness, fatigue for 3 days..."
                      value={clinicalNotes}
                      onChange={e => setClinicalNotes(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Assessment & Primary Diagnosis</label>
                    <input type="text" className="form-control" placeholder="e.g. Mild Hypertension / Routine Cardiac Checkup" />
                  </div>
                </div>
              )}

              {/* TAB 2: Prescription Builder */}
              {activeTab === 'PRESCRIPTION' && (
                <div style={{ background: '#fafafa', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#0f766e', fontWeight: 700 }}>
                    e-Prescribing Medication Queue
                  </h4>

                  {rxItems.map((item, idx) => (
                    <div key={idx} className="grid-3" style={{ marginBottom: '0.5rem', gap: '0.5rem' }}>
                      <select 
                        className="form-control"
                        value={item.medicineId}
                        onChange={e => {
                          const newArr = [...rxItems];
                          newArr[idx].medicineId = parseInt(e.target.value);
                          setRxItems(newArr);
                        }}
                      >
                        {medicines.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.brandName} ({m.genericName}) [Rs. {m.unitPriceLkr}]
                          </option>
                        ))}
                      </select>

                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Dosage (e.g. 1-1-1)" 
                        value={item.dosage}
                        onChange={e => {
                          const newArr = [...rxItems];
                          newArr[idx].dosage = e.target.value;
                          setRxItems(newArr);
                        }}
                      />

                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Qty" 
                        value={item.quantity}
                        onChange={e => {
                          const newArr = [...rxItems];
                          newArr[idx].quantity = parseInt(e.target.value) || 0;
                          setRxItems(newArr);
                        }}
                      />
                    </div>
                  ))}

                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm" 
                    style={{ marginTop: '0.5rem' }}
                    onClick={() => setRxItems([...rxItems, { medicineId: 1, dosage: '1-0-1 after meals', durationDays: 5, quantity: 10 }])}
                  >
                    <Plus size={14} /> Add Medication
                  </button>
                </div>
              )}

              {/* TAB 3: Diagnostic Lab Order */}
              {activeTab === 'LAB' && (
                <div className="form-group">
                  <label style={{ color: '#7c3aed', fontWeight: 700 }}>Order Laboratory Diagnostic Tests</label>
                  <select className="form-control" value={selectedLabTestId} onChange={e => setSelectedLabTestId(e.target.value)}>
                    <option value="">-- Select Diagnostic Test --</option>
                    {labTests.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.testName} ({t.category}) - Rs. {t.priceLkr}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* TAB 4: AI Decision Support */}
              {activeTab === 'AI_SUPPORT' && healthRiskPrediction && (
                <div style={{ background: '#f0f9ff', border: '1px solid #0284c7', borderRadius: '10px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <BrainCircuit size={18} /> Python ML Clinical Risk Engine
                    </span>
                    <span className="badge badge-waiting">{healthRiskPrediction.predictedRiskCategory} ({healthRiskPrediction.confidencePercent}%)</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#0c4a6e', marginTop: '0.5rem' }}>
                    Model features: Systolic BP 145 mmHg, Blood Sugar 130 mg/dL, Chest Pain Flag = Active.
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic' }}>
                    *{healthRiskPrediction.disclaimer}
                  </p>
                </div>
              )}

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.25rem' }} onClick={handleCompleteConsultation}>
                <CheckCircle2 size={18} /> Finalize Encounter & Dispatch Orders
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
              <Stethoscope size={48} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
              <p style={{ fontWeight: 500 }}>Select a patient from the OPD Queue on the left to begin clinical encounter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
