import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { Users, Search, Plus, ShieldCheck, UserX, CheckCircle2, RefreshCw } from 'lucide-react';

const INITIAL_USERS = [
  { id: 1, username: 'admin', fullName: 'System Administrator', email: 'admin@careplus.lk', role: 'ROLE_ADMIN', status: 'ACTIVE', createdDate: 'Jan 10, 2025' },
  { id: 2, username: 'dr_anura', fullName: 'Dr. Anura Perera (Cardiology)', email: 'dr_anura@careplus.lk', role: 'ROLE_DOCTOR', status: 'ACTIVE', createdDate: 'Feb 15, 2025' },
  { id: 3, username: 'dr_sumudu', fullName: 'Dr. Sumudu Bandara (Pediatrics)', email: 'dr_sumudu@careplus.lk', role: 'ROLE_DOCTOR', status: 'ACTIVE', createdDate: 'Mar 01, 2025' },
  { id: 4, username: 'dr_wickramasinghe', fullName: 'Dr. K. L. Wickramasinghe (General OPD)', email: 'wickramasinghe@careplus.lk', role: 'ROLE_DOCTOR', status: 'ACTIVE', createdDate: 'Mar 10, 2025' },
  { id: 5, username: 'dr_priyadarshani', fullName: 'Dr. Priyadarshani Silva (Dermatology)', email: 'priyadarshani@careplus.lk', role: 'ROLE_DOCTOR', status: 'ACTIVE', createdDate: 'Mar 15, 2025' },
  { id: 6, username: 'dr_rohan', fullName: 'Dr. Rohan Jayawardena (Orthopedics)', email: 'rohan@careplus.lk', role: 'ROLE_DOCTOR', status: 'ACTIVE', createdDate: 'Apr 02, 2025' },
  { id: 7, username: 'patient_kamani', fullName: 'Kamani Wijesinghe', email: 'patient_kamani@careplus.lk', role: 'ROLE_PATIENT', status: 'ACTIVE', createdDate: 'May 04, 2026' },
  { id: 8, username: 'int_john', fullName: 'Johnathan Smith', email: 'john@careplus.lk', role: 'ROLE_PATIENT', status: 'ACTIVE', createdDate: 'May 08, 2026' },
  { id: 9, username: 'lab_nimal', fullName: 'Nimal Fernando (Lab Tech)', email: 'lab_nimal@careplus.lk', role: 'ROLE_LAB_TECH', status: 'ACTIVE', createdDate: 'Feb 20, 2025' },
  { id: 10, username: 'pharm_saman', fullName: 'Saman Kumara (Pharmacist)', email: 'pharm_saman@careplus.lk', role: 'ROLE_PHARMACIST', status: 'ACTIVE', createdDate: 'Feb 22, 2025' },
  { id: 11, username: 'receptionist', fullName: 'Kasun Perera (Front Desk)', email: 'reception@careplus.lk', role: 'ROLE_RECEPTIONIST', status: 'ACTIVE', createdDate: 'Jan 15, 2025' },
  { id: 12, username: 'nurse_priyani', fullName: 'Priyani Jayasinghe (Head Nurse)', email: 'nurse@careplus.lk', role: 'ROLE_NURSE', status: 'ACTIVE', createdDate: 'Jan 18, 2025' }
];

export const UsersManagement = () => {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'ROLE_DOCTOR', fullName: '' });
  const [usersList, setUsersList] = useState([]);

  const loadAllUsers = () => {
    const localUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const formattedLocal = localUsers.map((u, idx) => ({
      id: u.id || (1000 + idx),
      username: u.username || u.email?.split('@')[0] || `user_${idx}`,
      fullName: u.fullName || u.name || u.email?.split('@')[0] || 'Registered User',
      email: u.email || 'N/A',
      role: u.role || 'ROLE_PATIENT',
      status: u.status || 'ACTIVE',
      createdDate: u.createdDate || 'Registered Today'
    }));

    const combined = [...INITIAL_USERS, ...formattedLocal];
    const seen = new Set();
    const unique = [];

    for (const u of combined) {
      const key = (u.email && u.email !== 'N/A') ? u.email.toLowerCase() : u.username.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(u);
      }
    }

    setUsersList(unique);
  };

  useEffect(() => {
    loadAllUsers();
  }, []);


  const filteredUsers = usersList.filter(u => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchSearch;
  });

  const handleToggleStatus = (id) => {
    setUsersList(usersList.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' };
      }
      return u;
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.email) return;

    const added = {
      id: Date.now(),
      username: newUser.username,
      fullName: newUser.fullName || newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: 'ACTIVE',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setUsersList([added, ...usersList]);
    setShowAddModal(false);
    setNewUser({ username: '', email: '', role: 'ROLE_DOCTOR', fullName: '' });
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
                User & Access Management
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                System-wide user accounts, role-based access control (RBAC), and security status.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Add System User
            </button>
          </div>

          {/* Add User Modal */}
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
                Create New System Account
              </h3>
              <form onSubmit={handleAddUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. dr_perera"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. K. Perera"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. perera@careplus.lk"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Role Assignment</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="ROLE_ADMIN">Administrator</option>
                    <option value="ROLE_DOCTOR">Consultant Doctor</option>
                    <option value="ROLE_PATIENT">Patient</option>
                    <option value="ROLE_LAB_TECH">Lab Technician</option>
                    <option value="ROLE_PHARMACIST">Pharmacist</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Account</button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flex: 1, maxWidth: '400px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search by username, name, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['ALL', 'ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_PATIENT', 'ROLE_LAB_TECH', 'ROLE_PHARMACIST'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`btn ${roleFilter === r ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {r.replace('ROLE_', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Users Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>User / Username</th>
                  <th style={{ padding: '0.75rem' }}>Email</th>
                  <th style={{ padding: '0.75rem' }}>Role</th>
                  <th style={{ padding: '0.75rem' }}>Registered Date</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ fontWeight: '800', color: 'var(--primary-blue)' }}>{u.fullName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>@{u.username}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${u.role === 'ROLE_ADMIN' ? 'badge-danger' : u.role === 'ROLE_DOCTOR' ? 'badge-warning' : 'badge-primary'}`}>
                        {u.role.replace('ROLE_', '')}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{u.createdDate}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className="btn btn-outline"
                        style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                      >
                        {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
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

export default UsersManagement;
