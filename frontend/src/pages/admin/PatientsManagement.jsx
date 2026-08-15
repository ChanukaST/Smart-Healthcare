import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Users, Search, Plus, Eye, FileText, CheckCircle2, UserPlus, RefreshCw } from 'lucide-react';

const INITIAL_PATIENTS = [
  { id: 'PAT-2026-0042', fullName: 'Kamani Wijesinghe', nic: '198471209341', age: 42, gender: 'FEMALE', bloodGroup: 'B+', phone: '+94 77 345 6789', district: 'Colombo', balance: '0.00', lastVisit: 'May 12, 2026', totalVisits: 4 },
  { id: 'PAT-2026-0089', fullName: 'Nimal Perera', nic: '197821094321', age: 48, gender: 'MALE', bloodGroup: 'O+', phone: '+94 71 892 4156', district: 'Gampaha', balance: '2,500.00', lastVisit: 'May 14, 2026', totalVisits: 6 },
  { id: 'PAT-2026-0104', fullName: 'Ravindu Silva', nic: '199514589210', age: 31, gender: 'MALE', bloodGroup: 'A+', phone: '+94 77 112 3344', district: 'Kalutara', balance: '0.00', lastVisit: 'Apr 28, 2026', totalVisits: 2 },
  { id: 'INT-2026-0001', fullName: 'Johnathan Smith (UK)', nic: 'N9821456', age: 48, gender: 'MALE', bloodGroup: 'O+', phone: '+44 7911 123456', district: 'International', balance: '0.00', lastVisit: 'May 10, 2026', totalVisits: 1 },
  { id: 'PAT-2026-0155', fullName: 'Sunethra Rajapaksha', nic: '196851209874', age: 58, gender: 'FEMALE', bloodGroup: 'AB+', phone: '+94 72 456 7890', district: 'Kandy', balance: '1,800.00', lastVisit: 'May 02, 2026', totalVisits: 8 }
];

export const PatientsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newPatient, setNewPatient] = useState({
    fullName: '',
    nic: '',
    dateOfBirth: '',
    gender: 'MALE',
    bloodGroup: 'O+',
    phone: '',
    district: 'Colombo'
  });

  const getAgeFromDob = (dobStr) => {
    if (!dobStr) return 30;
    const birth = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };

  const loadAllPatients = async () => {
    setLoading(true);
    let backendPatients = [];

    // 1. Fetch from Spring Boot backend if available
    try {
      const res = await fetch('http://localhost:8080/api/patients');
      if (res.ok) {
        const data = await res.json();
        backendPatients = data.map(p => ({
          id: p.patientId || `PAT-2026-00${p.id}`,
          fullName: p.fullName,
          nic: p.nicPassport || 'N/A',
          age: p.age || 35,
          gender: p.gender || 'OTHER',
          bloodGroup: p.bloodGroup || 'O+',
          phone: p.phone || '+94 77 000 0000',
          district: p.district || 'Colombo',
          balance: '0.00',
          lastVisit: 'Registered Patient',
          totalVisits: 1
        }));
      }
    } catch (e) {
      console.warn('Backend API not reachable, using local storage:', e);
    }

    // 2. Fetch from LocalStorage (registered patients & registered users)
    const localPatients = JSON.parse(localStorage.getItem('registered_patients') || '[]');
    const localUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');

    const userAsPatients = localUsers.map((u, idx) => ({
      id: u.patientId || `PAT-2026-0${200 + idx}`,
      fullName: u.fullName,
      nic: u.nic || u.nicPassport || 'N/A',
      age: u.age || 32,
      gender: u.gender || 'MALE',
      bloodGroup: u.bloodGroup || 'O+',
      phone: u.phone || '+94 77 123 4567',
      district: u.district || 'Colombo',
      balance: '0.00',
      lastVisit: 'Registered User',
      totalVisits: 1
    }));

    // 3. Deduplicate and merge all patients
    const combined = [...INITIAL_PATIENTS, ...localPatients, ...userAsPatients, ...backendPatients];
    const seen = new Set();
    const uniquePatients = [];

    for (const p of combined) {
      const key = (p.nic && p.nic !== 'N/A') ? p.nic.toLowerCase() : (p.id || p.fullName);
      if (!seen.has(key)) {
        seen.add(key);
        uniquePatients.push(p);
      }
    }

    setPatientsList(uniquePatients);
    setLoading(false);
  };

  useEffect(() => {
    loadAllPatients();
  }, []);

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if (!newPatient.fullName || !newPatient.nic) return;

    const patientId = `PAT-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const calculatedAge = getAgeFromDob(newPatient.dateOfBirth);

    const patientObj = {
      id: patientId,
      patientId: patientId,
      fullName: newPatient.fullName,
      nic: newPatient.nic,
      nicPassport: newPatient.nic,
      dateOfBirth: newPatient.dateOfBirth,
      age: calculatedAge,
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      phone: newPatient.phone || '+94 77 123 4567',
      district: newPatient.district || 'Colombo',
      balance: '0.00',
      lastVisit: 'Today',
      totalVisits: 1
    };

    // Save to Backend if reachable
    try {
      await fetch('http://localhost:8080/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: patientId,
          nicPassport: newPatient.nic,
          fullName: newPatient.fullName,
          dateOfBirth: newPatient.dateOfBirth,
          age: calculatedAge,
          gender: newPatient.gender,
          phone: newPatient.phone,
          district: newPatient.district,
          bloodGroup: newPatient.bloodGroup
        })
      });
    } catch (err) {
      console.warn('Backend offline, saving patient locally:', err);
    }

    // Save to LocalStorage
    const existing = JSON.parse(localStorage.getItem('registered_patients') || '[]');
    localStorage.setItem('registered_patients', JSON.stringify([patientObj, ...existing]));

    setPatientsList([patientObj, ...patientsList]);
    setShowAddModal(false);
    setNewPatient({ fullName: '', nic: '', dateOfBirth: '', gender: 'MALE', bloodGroup: 'O+', phone: '', district: 'Colombo' });
  };

  const filteredPatients = patientsList.filter(p => {
    const q = searchTerm.toLowerCase();
    return (p.fullName && p.fullName.toLowerCase().includes(q)) ||
           (p.id && p.id.toLowerCase().includes(q)) ||
           (p.nic && p.nic.toLowerCase().includes(q)) ||
           (p.district && p.district.toLowerCase().includes(q)) ||
           (p.phone && p.phone.toLowerCase().includes(q));
  });

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                Master Patient Directory (EMR)
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Centralized registry of admitted, OPD, and registered healthcare patients.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                onClick={loadAllPatients} 
                className="btn btn-outline" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}
                title="Refresh Patient Directory"
              >
                <RefreshCw size={15} className={loading ? 'spin' : ''} /> Refresh
              </button>

              <button 
                onClick={() => setShowAddModal(true)} 
                className="btn btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
              >
                <Plus size={16} /> Add Patient
              </button>

              <div className="card" style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Users size={18} color="var(--primary-blue)" />
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', display: 'block' }}>TOTAL REGISTERED</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-blue)', lineHeight: 1 }}>{patientsList.length} Patients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Patient Modal */}
          {showAddModal && (
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                Register New Hospital Patient
              </h3>
              <form onSubmit={handleAddPatient} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Bandara"
                    value={newPatient.fullName}
                    onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>NIC / Passport *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 199412345678"
                    value={newPatient.nic}
                    onChange={(e) => setNewPatient({ ...newPatient, nic: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Date of Birth</label>
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Blood Group (Optional)</label>
                  <select
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="">Unknown / Not Sure</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>Mobile Phone</label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.3rem' }}>District</label>
                  <input
                    type="text"
                    placeholder="e.g. Colombo, Kandy, Galle"
                    value={newPatient.district}
                    onChange={(e) => setNewPatient({ ...newPatient, district: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save & Register Patient</button>
                </div>
              </form>
            </div>
          )}

          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by Patient ID, Name, NIC/Passport, District, Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Patient Details Modal */}
          {selectedPatient && (
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                  EMR Overview: {selectedPatient.fullName} ({selectedPatient.id})
                </h3>
                <button onClick={() => setSelectedPatient(null)} className="btn btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}>
                  Close
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px', fontSize: '0.88rem' }}>
                <div><strong>NIC / Passport:</strong> {selectedPatient.nic}</div>
                <div><strong>Age & Gender:</strong> {selectedPatient.age} Yrs • {selectedPatient.gender}</div>
                <div><strong>Blood Group:</strong> <span style={{ color: (!selectedPatient.bloodGroup || selectedPatient.bloodGroup === 'Unknown') ? '#64748b' : '#b91c1c', fontWeight: '800' }}>{selectedPatient.bloodGroup || 'Unknown'}</span></div>
                <div><strong>Phone:</strong> {selectedPatient.phone}</div>
                <div><strong>District:</strong> {selectedPatient.district}</div>
                <div><strong>Total Clinic Visits:</strong> {selectedPatient.totalVisits}</div>
                <div><strong>Outstanding Balance:</strong> LKR {selectedPatient.balance}</div>
                <div><strong>Last Consultation:</strong> {selectedPatient.lastVisit}</div>
              </div>
            </div>
          )}

          {/* Patients Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Patient ID</th>
                  <th style={{ padding: '0.75rem' }}>Full Name</th>
                  <th style={{ padding: '0.75rem' }}>NIC / Passport</th>
                  <th style={{ padding: '0.75rem' }}>Age / Gender</th>
                  <th style={{ padding: '0.75rem' }}>Blood Group</th>
                  <th style={{ padding: '0.75rem' }}>District</th>
                  <th style={{ padding: '0.75rem' }}>Balance (LKR)</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No patients found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                        {p.id}
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: '700' }}>{p.fullName}</td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.nic}</td>
                      <td style={{ padding: '0.75rem' }}>{p.age} Yrs • {p.gender}</td>
                      <td style={{ padding: '0.75rem' }}>
                        {(!p.bloodGroup || p.bloodGroup === 'Unknown') ? (
                          <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700', fontSize: '0.8rem' }}>
                            Unknown
                          </span>
                        ) : (
                          <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '800', fontSize: '0.8rem' }}>
                            {p.bloodGroup}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem' }}>{p.district}</td>
                      <td style={{ padding: '0.75rem', fontWeight: '700', color: p.balance !== '0.00' ? '#e11d48' : '#16a34a' }}>
                        LKR {p.balance}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <button
                          onClick={() => setSelectedPatient(p)}
                          className="btn btn-outline"
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <Eye size={13} /> View EMR
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PatientsManagement;

