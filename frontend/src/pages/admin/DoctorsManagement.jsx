import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Search, Plus, UserCheck, Stethoscope } from 'lucide-react';

export const DoctorsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    specialization: 'Cardiology',
    qualifications: 'MBBS, MD',
    room: 'Room 101',
    fee: '2500.00',
    schedule: 'Mon - Fri (09:00 - 13:00)'
  });

  const [doctorsList, setDoctorsList] = useState([
    { id: 1, code: 'DOC-001', name: 'Dr. Anura Perera', specialization: 'Cardiology', qualifications: 'MBBS, MD (Cardiology)', room: 'Room 101', fee: '2,500.00', schedule: 'Mon, Wed, Fri (09:00 - 13:00)', status: 'ACTIVE' },
    { id: 2, code: 'DOC-002', name: 'Dr. Sumudu Bandara', specialization: 'Pediatrics', qualifications: 'MBBS, DCH (Pediatrics)', room: 'Room 105', fee: '2,200.00', schedule: 'Tue, Thu, Sat (10:00 - 14:00)', status: 'ACTIVE' },
    { id: 3, code: 'DOC-003', name: 'Dr. K. L. Wickramasinghe', specialization: 'General Medicine', qualifications: 'MBBS, MD (Internal Med)', room: 'Room 108', fee: '2,000.00', schedule: 'Daily Walk-in (08:30 - 16:00)', status: 'ACTIVE' },
    { id: 4, code: 'DOC-004', name: 'Dr. Priyadarshani Silva', specialization: 'Dermatology', qualifications: 'MBBS, MD (Dermatology)', room: 'Room 112', fee: '2,400.00', schedule: 'Mon, Thu (13:00 - 18:00)', status: 'ACTIVE' },
    { id: 5, code: 'DOC-005', name: 'Dr. Rohan Jayawardena', specialization: 'Orthopedics', qualifications: 'MBBS, MS, FRCS', room: 'Room 204', fee: '3,000.00', schedule: 'Tue, Fri (13:00 - 17:00)', status: 'ACTIVE' }
  ]);

  const departments = ['ALL', 'Cardiology', 'Pediatrics', 'General Medicine', 'Dermatology', 'Orthopedics'];

  const filteredDoctors = doctorsList.filter(d => {
    const matchDept = selectedDept === 'ALL' || d.specialization.toLowerCase() === selectedDept.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.room.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoc.name) return;

    const added = {
      id: Date.now(),
      code: `DOC-${String(doctorsList.length + 1).padStart(3, '0')}`,
      name: newDoc.name.startsWith('Dr.') ? newDoc.name : `Dr. ${newDoc.name}`,
      specialization: newDoc.specialization,
      qualifications: newDoc.qualifications,
      room: newDoc.room,
      fee: Number(newDoc.fee).toLocaleString(),
      schedule: newDoc.schedule,
      status: 'ACTIVE'
    };

    setDoctorsList([added, ...doctorsList]);
    setShowAddModal(false);
    setNewDoc({ name: '', specialization: 'Cardiology', qualifications: 'MBBS, MD', room: 'Room 101', fee: '2500.00', schedule: 'Mon - Fri (09:00 - 13:00)' });
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
                Doctor & Specialist Management
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Consultant rosters, clinic consultation fees, OPD room assignments, and clinical schedules.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Register New Doctor
            </button>
          </div>

          {/* Add Doctor Modal */}
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
                Register Hospital Consultant / Specialist
              </h3>
              <form onSubmit={handleAddDoctor} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Doctor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kasun Fernando"
                    value={newDoc.name}
                    onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Clinical Specialty</label>
                  <select
                    value={newDoc.specialization}
                    onChange={(e) => setNewDoc({ ...newDoc, specialization: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Qualifications</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBBS, MD, MRCP (UK)"
                    value={newDoc.qualifications}
                    onChange={(e) => setNewDoc({ ...newDoc, qualifications: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Clinic Room</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Room 104"
                    value={newDoc.room}
                    onChange={(e) => setNewDoc({ ...newDoc, room: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Consultation Fee (LKR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2500"
                    value={newDoc.fee}
                    onChange={(e) => setNewDoc({ ...newDoc, fee: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Schedule Hours</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mon, Wed, Fri (09:00 - 13:00)"
                    value={newDoc.schedule}
                    onChange={(e) => setNewDoc({ ...newDoc, schedule: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Doctor Profile</button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Department Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '360px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by code, doctor name, room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`btn ${selectedDept === dept ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Doctor Code</th>
                  <th style={{ padding: '0.75rem' }}>Full Name & Qualifications</th>
                  <th style={{ padding: '0.75rem' }}>Department</th>
                  <th style={{ padding: '0.75rem' }}>Clinic Room</th>
                  <th style={{ padding: '0.75rem' }}>Consultation Fee</th>
                  <th style={{ padding: '0.75rem' }}>Clinic Schedule</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {doc.code}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: '800', color: 'var(--text-dark)' }}>{doc.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{doc.qualifications}</div>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#0d9488' }}>
                      {doc.specialization}
                    </td>
                    <td style={{ padding: '0.75rem' }}>{doc.room}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '800' }}>LKR {doc.fee}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{doc.schedule}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{doc.status}</span>
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

export default DoctorsManagement;
