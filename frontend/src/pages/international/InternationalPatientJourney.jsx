import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { User, FileText, Calendar, Plane } from 'lucide-react';

export const InternationalPatientJourney = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    passportNumber: '',
    nationality: '',
    country: '',
    email: '',
    mobile: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('International Patient Treatment Enquiry Submitted!');
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>
          International & Foreign Patient Registration
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          Seamless healthcare concierge and specialist treatment journey in Sri Lanka
        </p>

        <div className="card" style={{ marginBottom: '3rem', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--secondary-teal)' }}>
            4-Step International Patient Journey
          </h3>
          <div className="grid-cols-4" style={{ textAlign: 'center', gap: '1rem' }}>
            <div style={{ padding: '1.25rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                <User size={26} />
              </div>
              <strong style={{ fontSize: '0.9rem' }}>1. Treatment Enquiry</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Submit medical query & passport</p>
            </div>
            <div style={{ padding: '1.25rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                <FileText size={26} />
              </div>
              <strong style={{ fontSize: '0.9rem' }}>2. Document Upload</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Send medical records & lab reports</p>
            </div>
            <div style={{ padding: '1.25rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                <Calendar size={26} />
              </div>
              <strong style={{ fontSize: '0.9rem' }}>3. Appointment & Visa</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Confirm specialist & get visa letter</p>
            </div>
            <div style={{ padding: '1.25rem 1rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                <Plane size={26} />
              </div>
              <strong style={{ fontSize: '0.9rem' }}>4. Travel & Treatment</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Airport pickup & in-hospital care</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '650px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--primary-blue)' }}>Register Foreign Patient Information</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>Full Name (as in Passport)</label>
              <input type="text" required value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>Passport Number</label>
                <input type="text" required value={formData.passportNumber} onChange={(e) => setFormData({...formData, passportNumber: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>Nationality</label>
                <input type="text" required value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem', marginTop: '0.5rem' }}>Submit Treatment Enquiry</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InternationalPatientJourney;
