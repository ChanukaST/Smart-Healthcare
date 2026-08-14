import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, FileText, Pill, TestTube2, 
  MessageSquare, Star, Send, Smile, Frown, Meh 
} from 'lucide-react';

export const PatientPortalView = () => {
  const [patient, setPatient] = useState({
    fullName: 'Kamani Samarasinghe',
    nicPassport: '925143820V',
    patientId: 'PAT-2026-0001',
    age: 34,
    gender: 'FEMALE',
    phone: '+94 77 123 4567',
    bloodGroup: 'O+',
    medicalHistory: 'Mild asthma, penicillin allergy'
  });

  const [feedbackText, setFeedbackText] = useState('The doctor was extremely attentive and caring, fantastic hospital service!');
  const [rating, setRating] = useState(5);
  const [sentimentResult, setSentimentResult] = useState(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);

  const handleAnalyzeAndSubmit = async (e) => {
    e.preventDefault();
    setLoadingSentiment(true);
    try {
      const res = await fetch('/api/ml/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackText })
      });

      if (res.ok) {
        const data = await res.json();
        setSentimentResult(data);

        // Submit feedback to backend
        const token = localStorage.getItem('hms_token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        await fetch('/api/feedback', {
          method: 'POST',
          headers,
          body: JSON.stringify({ patientId: 1, rating, comment: feedbackText })
        });
      }
    } catch (e) {
      alert('Error analyzing sentiment');
    } finally {
      setLoadingSentiment(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Patient Self-Service Portal</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Personal EMR, Lab Reports, OPD Tickets & AI Sentiment Feedback</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Patient Profile Card */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
            <User color="#0d9488" size={20} /> Personal EMR Health Card
          </h2>

          <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #e0f2fe)', padding: '1.25rem', borderRadius: '12px', border: '1px solid #0d9488', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{patient.fullName}</h3>
            <p style={{ fontSize: '0.85rem', color: '#0f766e', fontWeight: 600 }}>Patient ID: {patient.patientId}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
              <p><strong>NIC:</strong> {patient.nicPassport}</p>
              <p><strong>Age/Gender:</strong> {patient.age} / {patient.gender}</p>
              <p><strong>Blood Group:</strong> <span className="badge badge-danger">{patient.bloodGroup}</span></p>
              <p><strong>Contact:</strong> {patient.phone}</p>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
              <strong>History:</strong> {patient.medicalHistory}
            </p>
          </div>

          <h3 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.5rem' }}>My Recent Lab Reports & Prescriptions</h3>
          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span><TestTube2 size={14} color="#7c3aed" /> <strong>Full Blood Count (FBC)</strong></span>
              <span className="badge badge-completed">NORMAL</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Hb: 14.2 g/dL | WBC: 6,800 /uL | Platelets: 245,000 /uL</p>
          </div>

          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span><Pill size={14} color="#d97706" /> <strong>Panadol 500mg & Cetrine 10mg</strong></span>
              <span className="badge badge-primary">DISPENSED</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Prescribed by Dr. Anura Perera (Cardiology)</p>
          </div>
        </div>

        {/* AI Feedback & Sentiment Analysis Form */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
            <MessageSquare color="#0284c7" size={20} /> Patient Feedback & AI Sentiment Analysis
          </h2>

          <form onSubmit={handleAnalyzeAndSubmit}>
            <div className="form-group">
              <label>Hospital Care Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={24} 
                    cursor="pointer" 
                    fill={star <= rating ? '#f59e0b' : 'none'} 
                    color={star <= rating ? '#f59e0b' : '#cbd5e1'}
                    onClick={() => setRating(star)} 
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Share Your Experience & Feedback</label>
              <textarea 
                className="form-control" 
                rows={4} 
                value={feedbackText} 
                onChange={e => setFeedbackText(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loadingSentiment}>
              {loadingSentiment ? 'Analyzing AI Sentiment...' : 'Submit Feedback & Analyze AI Sentiment'}
            </button>
          </form>

          {/* AI Sentiment Analysis Result */}
          {sentimentResult && (
            <div style={{ marginTop: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>
                🤖 Python AI Sentiment Classification Result
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {sentimentResult.sentiment === 'POSITIVE' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', background: '#dcfce7', padding: '0.4rem 0.85rem', borderRadius: '20px', fontWeight: 700 }}>
                    <Smile size={18} /> POSITIVE ({sentimentResult.confidencePercent}%)
                  </div>
                )}
                {sentimentResult.sentiment === 'NEUTRAL' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#854d0e', background: '#fef3c7', padding: '0.4rem 0.85rem', borderRadius: '20px', fontWeight: 700 }}>
                    <Meh size={18} /> NEUTRAL ({sentimentResult.confidencePercent}%)
                  </div>
                )}
                {sentimentResult.sentiment === 'NEGATIVE' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#991b1b', background: '#fee2e2', padding: '0.4rem 0.85rem', borderRadius: '20px', fontWeight: 700 }}>
                    <Frown size={18} /> NEGATIVE ({sentimentResult.confidencePercent}%)
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
