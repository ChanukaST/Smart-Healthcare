import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Users, Search, Plus, Eye, FileText } from 'lucide-react';

export const PatientsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patientsList, setPatientsList] = useState([
    { id: 'PAT-2026-0042', fullName: 'Kamani Wijesinghe', nic: '198471209341', age: 42, gender: 'FEMALE', bloodGroup: 'B+', phone: '+94 77 345 6789', district: 'Colombo', balance: '0.00', lastVisit: 'May 12, 2026', totalVisits: 4 },
    { id: 'PAT-2026-0089', fullName: 'Nimal Perera', nic: '197821094321', age: 48, gender: 'MALE', bloodGroup: 'O+', phone: '+94 71 892 4156', district: 'Gampaha', balance: '2,500.00', lastVisit: 'May 14, 2026', totalVisits: 6 },
    { id: 'PAT-2026-0104', fullName: 'Ravindu Silva', nic: '199514589210', age: 31, gender: 'MALE', bloodGroup: 'A+', phone: '+94 77 112 3344', district: 'Kalutara', balance: '0.00', lastVisit: 'Apr 28, 2026', totalVisits: 2 },
    { id: 'INT-2026-0001', fullName: 'Johnathan Smith (UK)', nic: 'N9821456', age: 48, gender: 'MALE', bloodGroup: 'O+', phone: '+44 7911 123456', district: 'International', balance: '0.00', lastVisit: 'May 10, 2026', totalVisits: 1 },
    { id: 'PAT-2026-0155', fullName: 'Sunethra Rajapaksha', nic: '196851209874', age: 58, gender: 'FEMALE', bloodGroup: 'AB+', phone: '+94 72 456 7890', district: 'Kandy', balance: '1,800.00', lastVisit: 'May 02, 2026', totalVisits: 8 }
  ]);

  const filteredPatients = patientsList.filter(p => {
    return p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.district.toLowerCase().includes(searchTerm.toLowerCase());
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
                Centralized registry of admitted, OPD, and international healthcare patients.
              </p>
            </div>
            
            <div className="card" style={{ padding: '0.5rem 1rem', background: 'var(--bg-light)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL REGISTERED</span>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-blue)' }}>{patientsList.length} Patients</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by Patient ID, Name, NIC/Passport, District..."
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
                <div><strong>Blood Group:</strong> <span style={{ color: '#b91c1c', fontWeight: '800' }}>{selectedPatient.bloodGroup}</span></div>
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
                {filteredPatients.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {p.id}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '700' }}>{p.fullName}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.nic}</td>
                    <td style={{ padding: '0.75rem' }}>{p.age} Yrs • {p.gender}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '800', fontSize: '0.8rem' }}>
                        {p.bloodGroup}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PatientsManagement;
