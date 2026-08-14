import React, { useState } from 'react';
import { 
  Globe, Plane, DollarSign, FileText, CheckCircle2, 
  Send, HelpCircle, ShieldCheck, CreditCard 
} from 'lucide-react';

export const InternationalPatientView = () => {
  const [form, setForm] = useState({
    fullName: 'Johnathan Smith',
    passportNumber: 'N9821456',
    nationality: 'British',
    countryOfResidence: 'United Kingdom',
    phone: '+44 7911 123456',
    email: 'john.smith@uk-mail.com',
    preferredCurrency: 'USD',
    preferredLanguage: 'English',
    age: 48,
    gender: 'MALE',
    treatmentEnquiryNotes: 'Seeking specialized cardiac consultation & angioplasty evaluation in Colombo.'
  });

  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);

  // Foreign Currency Converter Estimator state
  const [lkrAmount, setLkrAmount] = useState(150000); // LKR 150,000
  const rates = { USD: 0.0033, EUR: 0.0030, GBP: 0.0026 }; // Informational conversion rates

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('hms_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/international-patients/register-enquiry', {
        method: 'POST',
        headers,
        body: JSON.stringify(form)
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedEnquiry(data);
      } else {
        alert('Failed to submit enquiry');
      }
    } catch (e) {
      alert('Error submitting enquiry');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>International Patient Pathway Portal</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Dedicated Treatment Coordination, Passport Registration & Foreign Currency Calculator</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#dbeafe', color: '#1d4ed8', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem' }}>
          <Globe size={18} /> Sri Lanka Global Healthcare Access
        </div>
      </div>

      <div className="grid-2">
        {/* Foreign Patient Registration & Enquiry Form */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
            <Plane color="#0284c7" size={20} /> Treatment Enquiry & Passport Registration
          </h2>

          {!submittedEnquiry ? (
            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" className="form-control" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Passport Number *</label>
                  <input type="text" className="form-control" value={form.passportNumber} onChange={e => setForm({...form, passportNumber: e.target.value})} required />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Nationality *</label>
                  <input type="text" className="form-control" value={form.nationality} onChange={e => setForm({...form, nationality: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Country of Residence *</label>
                  <input type="text" className="form-control" value={form.countryOfResidence} onChange={e => setForm({...form, countryOfResidence: e.target.value})} required />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>International Phone (+Country Code)</label>
                  <input type="text" className="form-control" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Preferred Currency Display</label>
                  <select className="form-control" value={form.preferredCurrency} onChange={e => setForm({...form, preferredCurrency: e.target.value})}>
                    <option value="USD">USD ($ - US Dollar)</option>
                    <option value="EUR">EUR (€ - Euro)</option>
                    <option value="GBP">GBP (£ - British Pound)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Language</label>
                  <select className="form-control" value={form.preferredLanguage} onChange={e => setForm({...form, preferredLanguage: e.target.value})}>
                    <option value="English">English</option>
                    <option value="German">German</option>
                    <option value="Dhivehi">Dhivehi</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Treatment Enquiry Details & Medical History</label>
                <textarea className="form-control" rows={3} value={form.treatmentEnquiryNotes} onChange={e => setForm({...form, treatmentEnquiryNotes: e.target.value})} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Send size={16} /> Submit International Treatment Enquiry
              </button>
            </form>
          ) : (
            <div style={{ background: '#f0fdf4', border: '2px solid #0d9488', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
              <CheckCircle2 size={48} color="#0d9488" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#0f766e', fontWeight: 800 }}>Enquiry Received!</h3>
              <p style={{ fontSize: '0.9rem', color: '#0f172a', marginTop: '0.5rem' }}>
                Ref: <strong>{submittedEnquiry.patient?.patientId}</strong> | Passport: {submittedEnquiry.passportNumber}
              </p>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.5rem' }}>
                Our International Patient Desk will review your medical notes and coordinate doctor availability & airport transfer.
              </p>
            </div>
          )}
        </div>

        {/* Foreign Currency Informational Estimator */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
            <DollarSign color="#059669" size={20} /> Foreign Currency Estimator (Informational)
          </h2>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label>Enter Hospital Cost in Sri Lankan Rupees (LKR)</label>
              <input 
                type="number" 
                className="form-control" 
                value={lkrAmount} 
                onChange={e => setLkrAmount(parseFloat(e.target.value) || 0)} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>USD ($)</span>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  ${(lkrAmount * rates.USD).toFixed(2)}
                </h4>
              </div>

              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>EUR (€)</span>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  €{(lkrAmount * rates.EUR).toFixed(2)}
                </h4>
              </div>

              <div style={{ background: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>GBP (£)</span>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800 }}>
                  £{(lkrAmount * rates.GBP).toFixed(2)}
                </h4>
              </div>
            </div>

            <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.75rem', textAlign: 'center' }}>
              * Official final invoice will be billed in Sri Lankan Rupees (LKR) as per Sri Lankan health regulations.
            </p>
          </div>

          <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '10px', border: '1px solid #bae6fd' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#0369a1', fontWeight: 700, marginBottom: '0.4rem' }}>
              ✈️ Travel & Suite Coordination Perks
            </h4>
            <ul style={{ fontSize: '0.8rem', color: '#0c4a6e', paddingLeft: '1.2rem', lineHeight: '1.5' }}>
              <li>Colombo International Airport (CMB) Pick-up Service</li>
              <li>Dedicated English & Multi-lingual Patient Liaison</li>
              <li>Pre-arrival Virtual Doctor Consultation Scheduling</li>
              <li>Executive Private Ward Suite Booking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
