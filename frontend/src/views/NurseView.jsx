import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, Bed as BedIcon, UserPlus, LogOut, 
  CheckCircle2, AlertCircle, Building2, X 
} from 'lucide-react';

export const NurseView = () => {
  const [activeTab, setActiveTab] = useState('BED_MAP');
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [showDischargeModal, setShowDischargeModal] = useState(false);

  const [selectedBed, setSelectedBed] = useState(null);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const [admitForm, setAdmitForm] = useState({
    patientId: '',
    admissionReason: 'Severe fever and monitoring',
    attendingDoctor: 'Dr. Anura Perera'
  });

  const [dischargeSummary, setDischargeSummary] = useState('Patient recovered satisfactorily. Prescribed rest and follow-up in 1 week.');

  const token = localStorage.getItem('hms_token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [resW, resB, resA, resP] = await Promise.all([
        fetch('/api/inpatient/wards', { headers }),
        fetch('/api/inpatient/beds', { headers }),
        fetch('/api/inpatient/admissions?status=ADMITTED', { headers }),
        fetch('/api/patients', { headers })
      ]);
      if (resW.ok) setWards(await resW.json());
      if (resB.ok) setBeds(await resB.json());
      if (resA.ok) setAdmissions(await resA.json());
      if (resP.ok) setPatients(await resP.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdmit = async (e) => {
    e.preventDefault();
    if (!selectedBed || !admitForm.patientId) return;
    try {
      const res = await fetch('/api/inpatient/admit', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          patientId: parseInt(admitForm.patientId),
          bedId: selectedBed.id,
          admissionReason: admitForm.admissionReason,
          attendingDoctor: admitForm.attendingDoctor
        })
      });

      if (res.ok) {
        alert(`Patient admitted to Bed ${selectedBed.bedCode} successfully!`);
        setShowAdmitModal(false);
        fetchData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to admit patient');
      }
    } catch (e) {
      alert('Error connecting to backend');
    }
  };

  const handleDischarge = async () => {
    if (!selectedAdmission && !selectedBed) return;
    try {
      let res;
      if (selectedAdmission && selectedAdmission.id) {
        res = await fetch(`/api/inpatient/discharge/${selectedAdmission.id}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ dischargeSummary })
        });
      } else if (selectedBed && selectedBed.id) {
        res = await fetch(`/api/inpatient/discharge-bed/${selectedBed.id}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ dischargeSummary })
        });
      }

      if (res && res.ok) {
        const patientName = selectedAdmission?.patient?.fullName || selectedBed?.currentPatient?.fullName || 'Patient';
        alert(`Patient ${patientName} discharged successfully! Bed freed.`);
        setShowDischargeModal(false);
        setSelectedAdmission(null);
        setSelectedBed(null);
        fetchData();
      } else {
        const err = await res?.json().catch(() => ({}));
        alert(err.message || 'Failed to discharge patient.');
      }
    } catch (e) {
      console.error(e);
      alert('Error discharging patient. Please check backend server connection.');
    }
  };

  return (
    <div>
      <div className="page-title-header">
        <div className="page-title-text">
          <h1>Inpatient Ward & Bed Matrix Desk</h1>
          <p>Real-time ward capacity tracking, patient bed allocation & inpatient admissions</p>
        </div>
      </div>

      {/* Tabbed Workspace Bar */}
      <div className="workspace-tabs">
        <button 
          className={`tab-btn ${activeTab === 'BED_MAP' ? 'active' : ''}`}
          onClick={() => setActiveTab('BED_MAP')}
        >
          <BedIcon size={16} /> Interactive Bed Map Matrix
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ADMISSIONS' ? 'active' : ''}`}
          onClick={() => setActiveTab('ADMISSIONS')}
        >
          <HeartPulse size={16} /> Active Inpatient Admissions ({admissions.length})
        </button>
      </div>

      {/* TAB 1: Ward Bed Matrix */}
      {activeTab === 'BED_MAP' && (
        <div>
          {wards.map(ward => {
            const wardBeds = beds.filter(b => b.ward?.id === ward.id);
            return (
              <div key={ward.id} className="card">
                <div className="card-header-clean">
                  <div>
                    <h2><Building2 color="#0f766e" size={20} /> {ward.wardName} ({ward.wardCode})</h2>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Category: {ward.category} | Daily Bed Rate: Rs. {ward.dailyRateLkr?.toLocaleString()}
                    </p>
                  </div>
                  <span className="badge badge-primary">Capacity: {wardBeds.length} Beds</span>
                </div>

                <div className="bed-grid">
                  {wardBeds.map(bed => (
                    <div 
                      key={bed.id} 
                      className={`bed-card ${bed.occupied ? 'occupied' : 'vacant'}`}
                      onClick={() => {
                        if (bed.occupied) {
                          const adm = admissions.find(a => a.bed?.id === bed.id);
                          setSelectedBed(bed);
                          setSelectedAdmission(adm || null);
                          setShowDischargeModal(true);
                        } else {
                          setSelectedBed(bed);
                          setShowAdmitModal(true);
                        }
                      }}
                    >
                      <BedIcon size={24} color={bed.occupied ? '#e11d48' : '#10b981'} style={{ margin: '0 auto 0.5rem auto' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{bed.bedCode}</h4>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.25rem', color: bed.occupied ? '#be123c' : '#047857' }}>
                        {bed.occupied ? (bed.currentPatient?.fullName || 'OCCUPIED') : 'VACANT'}
                      </p>
                      <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginTop: '0.2rem' }}>
                        {bed.occupied ? 'Click for Discharge' : 'Click to Admit'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Active Admissions Registry */}
      {activeTab === 'ADMISSIONS' && (
        <div className="card">
          <div className="card-header-clean">
            <h2><HeartPulse color="#e11d48" size={20} /> Active Inpatient Admissions</h2>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Admission Code</th>
                  <th>Patient Name</th>
                  <th>NIC / Passport</th>
                  <th>Assigned Bed</th>
                  <th>Attending Doctor</th>
                  <th>Admission Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map(adm => (
                  <tr key={adm.id}>
                    <td><strong>{adm.admissionCode}</strong></td>
                    <td><strong style={{ color: '#0f172a' }}>{adm.patient?.fullName}</strong></td>
                    <td><span className="badge badge-primary">{adm.patient?.nicPassport}</span></td>
                    <td><span className="badge badge-danger">{adm.bed?.bedCode} ({adm.bed?.ward?.wardName})</span></td>
                    <td>{adm.attendingDoctor || 'Dr. Anura Perera'}</td>
                    <td>{adm.admissionReason}</td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedAdmission(adm);
                          setSelectedBed(adm.bed || null);
                          setShowDischargeModal(true);
                        }}
                      >
                        <LogOut size={14} /> Discharge Summary
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admission Modal */}
      {showAdmitModal && selectedBed && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Admit Patient to Bed {selectedBed.bedCode}</h2>
              <X cursor="pointer" onClick={() => setShowAdmitModal(false)} />
            </div>

            <form onSubmit={handleAdmit}>
              <div className="form-group">
                <label>Select Registered Patient</label>
                <select className="form-control" value={admitForm.patientId} onChange={e => setAdmitForm({...admitForm, patientId: e.target.value})} required>
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.fullName} (NIC: {p.nicPassport})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Attending Doctor</label>
                <input type="text" className="form-control" value={admitForm.attendingDoctor} onChange={e => setAdmitForm({...admitForm, attendingDoctor: e.target.value})} required />
              </div>

              <div className="form-group">
                <label>Admission Reason & Clinical Observations</label>
                <textarea className="form-control" rows={3} value={admitForm.admissionReason} onChange={e => setAdmitForm({...admitForm, admissionReason: e.target.value})} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Confirm Admission
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Discharge Summary Modal */}
      {showDischargeModal && (selectedAdmission || selectedBed) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Process Patient Discharge</h2>
              <X cursor="pointer" onClick={() => {
                setShowDischargeModal(false);
                setSelectedAdmission(null);
                setSelectedBed(null);
              }} />
            </div>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ fontWeight: 600 }}>
                {selectedAdmission?.patient?.fullName || selectedBed?.currentPatient?.fullName || 'Occupied Patient'}
              </p>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Bed: {selectedAdmission?.bed?.bedCode || selectedBed?.bedCode} | Adm Code: {selectedAdmission?.admissionCode || 'Direct Bed Assignment'}
              </p>
            </div>

            <div className="form-group">
              <label>Discharge Summary Notes</label>
              <textarea className="form-control" rows={4} value={dischargeSummary} onChange={e => setDischargeSummary(e.target.value)} required />
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleDischarge}>
              Confirm Discharge & Release Bed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
