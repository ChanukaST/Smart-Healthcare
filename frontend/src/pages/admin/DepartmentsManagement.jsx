import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Building2, Plus, Search, Users, BedDouble } from 'lucide-react';

export const DepartmentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDept, setNewDept] = useState({
    code: '',
    name: '',
    headDoctor: '',
    bedsCount: 10,
    staffCount: 8,
    operatingHours: '24/7'
  });

  const [departmentsList, setDepartmentsList] = useState([
    { id: 1, code: 'CARDIO', name: 'Cardiology & Heart Institute', headDoctor: 'Dr. Anura Perera', beds: 15, staff: 18, hours: '08:00 - 18:00', status: 'ACTIVE' },
    { id: 2, code: 'PEDIA', name: 'Pediatrics & Child Wellness', headDoctor: 'Dr. Sumudu Bandara', beds: 20, staff: 22, hours: '08:00 - 20:00', status: 'ACTIVE' },
    { id: 3, code: 'OPD', name: 'Outpatient Department (OPD)', headDoctor: 'Dr. K. L. Wickramasinghe', beds: 30, staff: 40, hours: '24/7 Service', status: 'ACTIVE' },
    { id: 4, code: 'DERMA', name: 'Dermatology & Skin Clinic', headDoctor: 'Dr. Priyadarshani Silva', beds: 6, staff: 10, hours: '13:00 - 18:00', status: 'ACTIVE' },
    { id: 5, code: 'ORTHO', name: 'Orthopedics & Joint Care', headDoctor: 'Dr. Rohan Jayawardena', beds: 12, staff: 14, hours: '09:00 - 17:00', status: 'ACTIVE' },
    { id: 6, code: 'LAB', name: 'Diagnostic Laboratory & Pathology', headDoctor: 'Nimal Fernando', beds: 0, staff: 12, hours: '24/7 Service', status: 'ACTIVE' },
    { id: 7, code: 'EMERG', name: 'Emergency & Trauma Resuscitation', headDoctor: 'Emergency Duty Officer', beds: 10, staff: 25, hours: '24/7 Emergency', status: 'ACTIVE' }
  ]);

  const filteredDepts = departmentsList.filter(d => {
    return d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
           d.headDoctor.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDept.name) return;

    const added = {
      id: Date.now(),
      code: newDept.code.toUpperCase() || `DEPT-${departmentsList.length + 1}`,
      name: newDept.name,
      headDoctor: newDept.headDoctor || 'Attending Head',
      beds: Number(newDept.bedsCount) || 0,
      staff: Number(newDept.staffCount) || 0,
      hours: newDept.operatingHours || '24/7',
      status: 'ACTIVE'
    };

    setDepartmentsList([...departmentsList, added]);
    setShowAddModal(false);
    setNewDept({ code: '', name: '', headDoctor: '', bedsCount: 10, staffCount: 8, operatingHours: '24/7' });
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
                Clinical Departments & Facilities
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Department configuration, bed allocations, medical staffing, and clinical capacity.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Add Department
            </button>
          </div>

          {/* Add Department Modal */}
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
                Add Hospital Clinical Department
              </h3>
              <form onSubmit={handleAddDepartment} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Department Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEURO"
                    value={newDept.code}
                    onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Department Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neurology & Brain Care"
                    value={newDept.name}
                    onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Lead Consultant</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. N. Weerasinghe"
                    value={newDept.headDoctor}
                    onChange={(e) => setNewDept({ ...newDept, headDoctor: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Allocated Beds</label>
                  <input
                    type="number"
                    required
                    value={newDept.bedsCount}
                    onChange={(e) => setNewDept({ ...newDept, bedsCount: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Department</button>
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
                placeholder="Search departments or lead consultants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          {/* Departments Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Code</th>
                  <th style={{ padding: '0.75rem' }}>Department Name</th>
                  <th style={{ padding: '0.75rem' }}>Head of Department</th>
                  <th style={{ padding: '0.75rem' }}>Bed Capacity</th>
                  <th style={{ padding: '0.75rem' }}>Assigned Staff</th>
                  <th style={{ padding: '0.75rem' }}>Operating Hours</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepts.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {d.code}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '700' }}>{d.name}</td>
                    <td style={{ padding: '0.75rem', color: '#0d9488', fontWeight: '600' }}>{d.headDoctor}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: '700' }}>
                        <BedDouble size={14} color="var(--primary-blue)" /> {d.beds} Beds
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Users size={14} color="var(--text-muted)" /> {d.staff} Staff
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{d.hours}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{d.status}</span>
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

export default DepartmentsManagement;
