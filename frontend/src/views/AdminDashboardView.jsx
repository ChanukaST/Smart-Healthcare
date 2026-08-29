import React, { useState, useEffect } from 'react';
import { 
  Users, Stethoscope, DollarSign, Activity, AlertTriangle, 
  Building2, UserPlus, RefreshCw, CheckCircle2, X, ShieldCheck, 
  Trash2, Edit, Bed as BedIcon, Plus, Shield 
} from 'lucide-react';

export const AdminDashboardView = () => {
  const [activeTab, setActiveTab] = useState('USERS');
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);

  // Modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showAddWardModal, setShowAddWardModal] = useState(false);
  const [showAddBedModal, setShowAddBedModal] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({ username: '', fullName: '', role: 'NURSE', password: 'password123' });
  const [newDoctor, setNewDoctor] = useState({ name: 'Dr. Chaminda Silva', specialization: 'Neurology', qualification: 'MBBS, MD', roomNumber: 'Room 108', consultationFee: 3000, phone: '+94 71 234 5678', departmentId: '' });
  const [newWard, setNewWard] = useState({ wardName: 'Pediatric Care Unit', wardCode: 'WRD-PCU', category: 'Pediatrics', dailyRateLkr: 6000 });
  const [newBed, setNewBed] = useState({ wardId: '', bedCode: 'PCU-01' });

  const token = localStorage.getItem('hms_token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchAllData = async () => {
    try {
      const [resStats, resDoctors, resDepts, resUsers, resWards, resBeds] = await Promise.all([
        fetch('/api/reporting/dashboard-stats', { headers }),
        fetch('/api/doctors', { headers }),
        fetch('/api/doctors/departments', { headers }),
        fetch('/api/users', { headers }),
        fetch('/api/inpatient/wards', { headers }),
        fetch('/api/inpatient/beds', { headers })
      ]);

      if (resStats.ok) setStats(await resStats.json());
      if (resDoctors.ok) setDoctors(await resDoctors.json());
      if (resDepts.ok) setDepartments(await resDepts.json());
      if (resUsers.ok) setUsers(await resUsers.json());
      if (resWards.ok) setWards(await resWards.json());
      if (resBeds.ok) setBeds(await resBeds.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- Handlers for User / Role Management ---
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', { method: 'POST', headers, body: JSON.stringify(newUser) });
      if (res.ok) {
        alert(`User ${newUser.username} (${newUser.role}) created successfully!`);
        setShowAddUserModal(false);
        setNewUser({ username: '', fullName: '', role: 'NURSE', password: 'password123' });
        fetchAllData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create user');
      }
    } catch (e) {
      alert('Error creating user');
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/users/${userId}/role`, { method: 'PUT', headers, body: JSON.stringify({ role: newRole }) });
      if (res.ok) {
        alert(`User role updated to ${newRole}`);
        fetchAllData();
      }
    } catch (e) {
      alert('Error updating role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this user account?')) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE', headers });
      if (res.ok) {
        alert('User account removed');
        fetchAllData();
      }
    } catch (e) {
      alert('Error removing user');
    }
  };

  // --- Handlers for Doctor Management ---
  const handleRegisterDoctor = async (e) => {
    e.preventDefault();
    try {
      let deptObj = newDoctor.departmentId ? departments.find(d => d.id === parseInt(newDoctor.departmentId)) : null;
      const payload = { ...newDoctor, consultationFee: parseFloat(newDoctor.consultationFee) || 2500, department: deptObj };
      const res = await fetch('/api/doctors', { method: 'POST', headers, body: JSON.stringify(payload) });
      if (res.ok) {
        alert('Consultant Doctor registered successfully!');
        setShowAddDoctorModal(false);
        fetchAllData();
      }
    } catch (e) {
      alert('Error registering doctor');
    }
  };

  // --- Handlers for Ward & Bed Management ---
  const handleCreateWard = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inpatient/wards', { method: 'POST', headers, body: JSON.stringify(newWard) });
      if (res.ok) {
        alert(`Ward ${newWard.wardName} created successfully!`);
        setShowAddWardModal(false);
        setNewWard({ wardName: '', wardCode: '', category: '', dailyRateLkr: 0 });
        fetchAllData();
      }
    } catch (e) {
      alert('Error creating ward');
    }
  };

  const handleCreateBed = async (e) => {
    e.preventDefault();
    if (!newBed.wardId) return alert('Select a ward');
    try {
      const res = await fetch('/api/inpatient/beds', { method: 'POST', headers, body: JSON.stringify(newBed) });
      if (res.ok) {
        alert(`Bed ${newBed.bedCode} added successfully!`);
        setShowAddBedModal(false);
        fetchAllData();
      }
    } catch (e) {
      alert('Error adding bed');
    }
  };

  const handleDeleteBed = async (bedId) => {
    if (!window.confirm('Delete this vacant bed?')) return;
    try {
      const res = await fetch(`/api/inpatient/beds/${bedId}`, { method: 'DELETE', headers });
      if (res.ok) {
        alert('Bed deleted');
        fetchAllData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to delete bed');
      }
    } catch (e) {
      alert('Error deleting bed');
    }
  };

  const rolesList = ['ADMIN', 'RECEPTIONIST', 'DOCTOR', 'NURSE', 'PHARMACIST', 'LAB_TECHNICIAN', 'PATIENT', 'INTERNATIONAL_PATIENT'];

  return (
    <div>
      <div className="page-title-header">
        <div className="page-title-text">
          <h1>System Administrator Console</h1>
          <p>Full control over System Roles, Staff Accounts, Doctors, Wards & Bed Configurations</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={fetchAllData}>
          <RefreshCw size={14} /> Refresh System Data
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-meta">
            <p>Active Staff Users</p>
            <h3>{users.length} Users</h3>
            <span style={{ color: '#10b981' }}>Across 8 RBAC Roles</span>
          </div>
          <div className="kpi-icon-wrapper bg-teal">
            <Users size={26} />
          </div>
        </div>

        <div className="kpi-card kpi-blue">
          <div className="kpi-meta">
            <p>Consultant Doctors</p>
            <h3>{doctors.length} Doctors</h3>
            <span style={{ color: '#0284c7' }}>Across {departments.length} Departments</span>
          </div>
          <div className="kpi-icon-wrapper bg-blue">
            <Stethoscope size={26} />
          </div>
        </div>

        <div className="kpi-card kpi-indigo">
          <div className="kpi-meta">
            <p>Hospital Wards & Beds</p>
            <h3>{beds.length} Total Beds</h3>
            <span style={{ color: '#6366f1' }}>{wards.length} Wards Configured</span>
          </div>
          <div className="kpi-icon-wrapper bg-indigo">
            <BedIcon size={26} />
          </div>
        </div>

        <div className="kpi-card kpi-amber">
          <div className="kpi-meta">
            <p>Total Revenue (LKR)</p>
            <h3>Rs. {stats ? stats.totalRevenueLkr?.toLocaleString('en-LK') : '6,800'}</h3>
            <span style={{ color: '#d97706' }}>Financial Aggregation</span>
          </div>
          <div className="kpi-icon-wrapper bg-amber">
            <DollarSign size={26} />
          </div>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="workspace-tabs">
        <button className={`tab-btn ${activeTab === 'USERS' ? 'active' : ''}`} onClick={() => setActiveTab('USERS')}>
          <Shield size={16} /> Staff User Accounts & System Roles ({users.length})
        </button>
        <button className={`tab-btn ${activeTab === 'DOCTORS' ? 'active' : ''}`} onClick={() => setActiveTab('DOCTORS')}>
          <Stethoscope size={16} /> Consultant Doctors ({doctors.length})
        </button>
        <button className={`tab-btn ${activeTab === 'WARDS_BEDS' ? 'active' : ''}`} onClick={() => setActiveTab('WARDS_BEDS')}>
          <BedIcon size={16} /> Wards & Bed Configuration ({beds.length} Beds)
        </button>
      </div>

      {/* TAB 1: User & Role Management */}
      {activeTab === 'USERS' && (
        <div className="card">
          <div className="card-header-clean">
            <h2><Shield color="#0f766e" size={20} /> System Staff User Accounts & Role Permissions</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddUserModal(true)}>
              <UserPlus size={16} /> Add New Staff User
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Assigned System Role</th>
                  <th>Change System Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td><strong>#{u.id}</strong></td>
                    <td><span className="badge badge-primary">{u.username}</span></td>
                    <td><strong style={{ color: '#0f172a' }}>{u.fullName}</strong></td>
                    <td><span className="badge badge-completed">{u.role}</span></td>
                    <td>
                      <select 
                        className="form-control" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                        value={u.role}
                        onChange={e => handleChangeRole(u.id, e.target.value)}
                      >
                        {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary btn-sm" 
                        style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        <Trash2 size={14} /> Remove User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Doctor Directory Management */}
      {activeTab === 'DOCTORS' && (
        <div className="card">
          <div className="card-header-clean">
            <h2><Stethoscope color="#0284c7" size={20} /> Consultant Doctors & Consultation Rooms</h2>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddDoctorModal(true)}>
              <UserPlus size={16} /> Register New Doctor
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Doctor Name</th>
                  <th>Specialization & Qualification</th>
                  <th>Assigned Room</th>
                  <th>Fee (LKR)</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc.id}>
                    <td><strong>{doc.doctorCode}</strong></td>
                    <td><strong style={{ color: '#0f172a' }}>{doc.name}</strong></td>
                    <td>{doc.specialization} ({doc.qualification})</td>
                    <td><span className="badge badge-consultation">{doc.roomNumber}</span></td>
                    <td><strong>Rs. {doc.consultationFee?.toLocaleString()}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Ward & Bed Management */}
      {activeTab === 'WARDS_BEDS' && (
        <div>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddWardModal(true)}>
              <Plus size={16} /> Create New Ward
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowAddBedModal(true)}>
              <Plus size={16} /> Add Bed to Ward
            </button>
          </div>

          {wards.map(ward => {
            const wardBeds = beds.filter(b => b.ward?.id === ward.id);
            return (
              <div key={ward.id} className="card">
                <div className="card-header-clean">
                  <div>
                    <h2><Building2 color="#0f766e" size={20} /> {ward.wardName} ({ward.wardCode})</h2>
                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Category: {ward.category} | Rate: Rs. {ward.dailyRateLkr?.toLocaleString()}/day</p>
                  </div>
                  <span className="badge badge-primary">{wardBeds.length} Beds</span>
                </div>

                <div className="bed-grid">
                  {wardBeds.map(bed => (
                    <div key={bed.id} className={`bed-card ${bed.occupied ? 'occupied' : 'vacant'}`}>
                      <BedIcon size={24} color={bed.occupied ? '#e11d48' : '#10b981'} style={{ margin: '0 auto 0.5rem auto' }} />
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{bed.bedCode}</h4>
                      <span className={`badge ${bed.occupied ? 'badge-danger' : 'badge-completed'}`} style={{ marginTop: '0.4rem' }}>
                        {bed.occupied ? 'Occupied' : 'Vacant'}
                      </span>
                      {!bed.occupied && (
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ marginTop: '0.5rem', width: '100%', fontSize: '0.72rem', color: '#ef4444' }}
                          onClick={() => handleDeleteBed(bed.id)}
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Add User */}
      {showAddUserModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>Add New Staff User & Assign Role</h2>
              <X cursor="pointer" onClick={() => setShowAddUserModal(false)} />
            </div>

            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label>Username *</label>
                <input type="text" className="form-control" placeholder="e.g. nurse_kamani" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Full Staff Name *</label>
                <input type="text" className="form-control" placeholder="e.g. Kamani Perera" value={newUser.fullName} onChange={e => setNewUser({...newUser, fullName: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>System Role *</label>
                <select className="form-control" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input type="password" className="form-control" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Create Staff Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Doctor */}
      {showAddDoctorModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '540px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>Register Consultant Doctor</h2>
              <X cursor="pointer" onClick={() => setShowAddDoctorModal(false)} />
            </div>

            <form onSubmit={handleRegisterDoctor}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Doctor Name *</label>
                  <input type="text" className="form-control" value={newDoctor.name} onChange={e => setNewDoctor({...newDoctor, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Specialization *</label>
                  <input type="text" className="form-control" value={newDoctor.specialization} onChange={e => setNewDoctor({...newDoctor, specialization: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Qualifications</label>
                <input type="text" className="form-control" value={newDoctor.qualification} onChange={e => setNewDoctor({...newDoctor, qualification: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Room Number</label>
                  <input type="text" className="form-control" value={newDoctor.roomNumber} onChange={e => setNewDoctor({...newDoctor, roomNumber: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Fee (LKR)</label>
                  <input type="number" className="form-control" value={newDoctor.consultationFee} onChange={e => setNewDoctor({...newDoctor, consultationFee: e.target.value})} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Save Doctor
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Ward */}
      {showAddWardModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>Create New Hospital Ward</h2>
              <X cursor="pointer" onClick={() => setShowAddWardModal(false)} />
            </div>

            <form onSubmit={handleCreateWard}>
              <div className="form-group">
                <label>Ward Name *</label>
                <input type="text" className="form-control" value={newWard.wardName} onChange={e => setNewWard({...newWard, wardName: e.target.value})} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Ward Code *</label>
                  <input type="text" className="form-control" value={newWard.wardCode} onChange={e => setNewWard({...newWard, wardCode: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" className="form-control" value={newWard.category} onChange={e => setNewWard({...newWard, category: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Daily Bed Rate (LKR)</label>
                <input type="number" className="form-control" value={newWard.dailyRateLkr} onChange={e => setNewWard({...newWard, dailyRateLkr: parseFloat(e.target.value) || 0})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Create Ward
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Add Bed */}
      {showAddBedModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem' }}>Add Bed to Ward</h2>
              <X cursor="pointer" onClick={() => setShowAddBedModal(false)} />
            </div>

            <form onSubmit={handleCreateBed}>
              <div className="form-group">
                <label>Select Target Ward *</label>
                <select className="form-control" value={newBed.wardId} onChange={e => setNewBed({...newBed, wardId: e.target.value})} required>
                  <option value="">-- Choose Ward --</option>
                  {wards.map(w => <option key={w.id} value={w.id}>{w.wardName} ({w.wardCode})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Bed Code *</label>
                <input type="text" className="form-control" placeholder="e.g. ICU-03 or PCU-02" value={newBed.bedCode} onChange={e => setNewBed({...newBed, bedCode: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Add Bed
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
