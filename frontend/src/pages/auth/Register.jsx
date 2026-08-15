import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, User, Mail, CreditCard, Phone, Lock, Calendar, Heart, MapPin } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nic: '',
    phone: '',
    dateOfBirth: '',
    gender: 'MALE',
    bloodGroup: '',
    district: 'Colombo',
    password: ''
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nicHint, setNicHint] = useState('');

  // Helper to convert day-of-year to date string YYYY-MM-DD
  const dayOfYearToDate = (year, dayOfYear) => {
    try {
      const date = new Date(Date.UTC(year, 0)); // Jan 1 of that year
      date.setUTCDate(dayOfYear);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Helper to compute age in years from YYYY-MM-DD
  const getAgeFromDob = (dobStr) => {
    if (!dobStr) return null;
    const birth = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };

  // Auto-detect Date of Birth and Gender from Sri Lankan NIC
  const handleNicChange = (nicVal) => {
    const cleanNic = nicVal.trim();
    let detectedGender = null;
    let detectedDob = null;

    if (cleanNic.length === 10 && (cleanNic.endsWith('V') || cleanNic.endsWith('v') || cleanNic.endsWith('X') || cleanNic.endsWith('x'))) {
      const year = 1900 + parseInt(cleanNic.substring(0, 2), 10);
      let days = parseInt(cleanNic.substring(2, 5), 10);
      if (!isNaN(year) && !isNaN(days)) {
        if (days > 500) {
          detectedGender = 'FEMALE';
          days -= 500;
        } else {
          detectedGender = 'MALE';
        }
        detectedDob = dayOfYearToDate(year, days);
      }
    } else if (cleanNic.length === 12 && /^\d+$/.test(cleanNic)) {
      const year = parseInt(cleanNic.substring(0, 4), 10);
      let days = parseInt(cleanNic.substring(4, 7), 10);
      if (!isNaN(year) && !isNaN(days)) {
        if (days > 500) {
          detectedGender = 'FEMALE';
          days -= 500;
        } else {
          detectedGender = 'MALE';
        }
        detectedDob = dayOfYearToDate(year, days);
      }
    }

    setFormData(prev => ({
      ...prev,
      nic: nicVal,
      ...(detectedDob ? { dateOfBirth: detectedDob } : {}),
      ...(detectedGender ? { gender: detectedGender } : {})
    }));

    if (detectedDob && detectedGender) {
      const calculatedAge = getAgeFromDob(detectedDob);
      setNicHint(`Detected: Born ${detectedDob} (${calculatedAge} Yrs) • ${detectedGender}`);
    } else {
      setNicHint('');
    }
  };

  const calculatedAge = formData.dateOfBirth ? getAgeFromDob(formData.dateOfBirth) : null;
  const maxDate = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const patientId = `PAT-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const ageVal = calculatedAge !== null ? calculatedAge : 30;
    
    // 1. Try Backend Registration
    try {
      await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: ageVal,
          username: formData.email.split('@')[0],
          role: 'ROLE_PATIENT'
        })
      });
    } catch (err) {
      console.warn('Backend offline or unreachable, saving locally:', err);
    }

    // 2. Persist to Local Storage for instant frontend synchronization
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const userRecord = {
      ...formData,
      age: ageVal,
      id: patientId,
      patientId,
      role: 'ROLE_PATIENT',
      status: 'ACTIVE',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updatedUsers = [...existingUsers.filter(u => u.email !== formData.email && u.nic !== formData.nic), userRecord];
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));

    const existingPatients = JSON.parse(localStorage.getItem('registered_patients') || '[]');
    const patientRecord = {
      id: patientId,
      patientId,
      fullName: formData.fullName,
      email: formData.email,
      nic: formData.nic,
      nicPassport: formData.nic,
      dateOfBirth: formData.dateOfBirth,
      age: ageVal,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup || 'Unknown',
      phone: formData.phone,
      district: formData.district,
      balance: '0.00',
      lastVisit: 'Registered Today',
      totalVisits: 1
    };
    const updatedPatients = [...existingPatients.filter(p => p.nic !== formData.nic && p.email !== formData.email), patientRecord];
    localStorage.setItem('registered_patients', JSON.stringify(updatedPatients));

    setLoading(false);
    alert(`Registration successful! Your Patient ID is ${patientId}. Please login with your email or NIC.`);
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem 1rem' }}>
        <div className="card" style={{ width: '100%', maxWidth: '580px', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.4rem', color: 'var(--primary-blue)' }}>Create Patient Account</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Fill in your personal and medical profile for quick clinic onboarding</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Kasun Bandara" 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
              />
            </div>

            {/* Email & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Email Address *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="patient@example.com" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Mobile Phone *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+94 77 123 4567" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                />
              </div>
            </div>

            {/* NIC */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>NIC / Passport Number *</label>
                {nicHint && <span style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: '700' }}>{nicHint}</span>}
              </div>
              <input 
                type="text" 
                required 
                placeholder="e.g. 199412345678 or 941234567V" 
                value={formData.nic} 
                onChange={(e) => handleNicChange(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
              />
            </div>

            {/* Date of Birth & Gender */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>Date of Birth *</label>
                  {calculatedAge !== null && (
                    <span style={{ fontSize: '0.75rem', background: '#dbeafe', color: 'var(--primary-blue)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>
                      {calculatedAge} Yrs
                    </span>
                  )}
                </div>
                <input 
                  type="date" 
                  required 
                  max={maxDate}
                  value={formData.dateOfBirth} 
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Gender *</label>
                <select 
                  value={formData.gender} 
                  onChange={(e) => setFormData({...formData, gender: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            {/* Blood Group & District */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Blood Group (Optional)</label>
                <select 
                  value={formData.bloodGroup} 
                  onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
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
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>District</label>
                <select 
                  value={formData.district} 
                  onChange={(e) => setFormData({...formData, district: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Ratnapura">Ratnapura</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Create Password *</label>
              <input 
                type="password" 
                required 
                placeholder="Choose a secure password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem', fontWeight: '700' }}>
              {loading ? 'Creating Account...' : 'Complete Registration & Create EMR'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

