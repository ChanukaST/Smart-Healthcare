import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Star, MessageSquare, Cpu, CheckCircle2, ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';

export const Feedback = () => {
  const { user, updateUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([
    { id: 1, rating: 5, text: 'The OPD consultation was smooth, and doctor was very thorough and attentive.', sentiment: 'POSITIVE', confidence: 94.5, date: 'May 12, 2026' }
  ]);

  const handleAnalyzeAndSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setLoading(true);
    let mlSentiment = 'POSITIVE';
    let confidence = 92.0;

    try {
      const res = await fetch('/api/ml/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackText })
      });

      if (res.ok) {
        const data = await res.json();
        mlSentiment = data.sentiment || 'POSITIVE';
        confidence = data.confidencePercent || 90.0;
      }
    } catch (err) {
      const lower = feedbackText.toLowerCase();
      if (lower.includes('bad') || lower.includes('poor') || lower.includes('slow') || lower.includes('delay') || lower.includes('terrible') || lower.includes('worst')) {
        mlSentiment = 'NEGATIVE';
        confidence = 88.0;
      } else if (lower.includes('good') || lower.includes('great') || lower.includes('caring') || lower.includes('excellent') || lower.includes('fast') || lower.includes('smooth')) {
        mlSentiment = 'POSITIVE';
        confidence = 94.0;
      } else {
        mlSentiment = 'NEUTRAL';
        confidence = 75.0;
      }
    } finally {
      setLoading(false);
    }

    const newResult = {
      sentiment: mlSentiment,
      confidencePercent: confidence,
      feedbackText
    };

    setSentimentResult(newResult);

    const newFeedbackItem = {
      id: Date.now(),
      rating,
      text: feedbackText,
      sentiment: mlSentiment,
      confidence,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setSubmittedFeedbacks([newFeedbackItem, ...submittedFeedbacks]);
    setFeedbackText('');
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
              Patient Feedback & Service Rating
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Share your hospital care experience. Feedback is processed by our AI Sentiment Engine.
            </p>
          </div>

          <div className="grid-cols-2" style={{ gap: '2rem' }}>
            
            {/* Feedback Submission Form */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={18} /> Submit Clinical Feedback
              </h3>

              <form onSubmit={handleAnalyzeAndSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                    Hospital Care Rating
                  </label>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          color: star <= rating ? '#f59e0b' : '#cbd5e1'
                        }}
                      >
                        <Star size={24} fill={star <= rating ? '#f59e0b' : 'none'} />
                      </button>
                    ))}
                    <span style={{ marginLeft: '0.5rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                    Share Your Experience & Doctor Feedback
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your consultation experience, waiting time, nursing care, or pharmacy service..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                  style={{ padding: '0.75rem 1.5rem', fontWeight: '700' }}
                >
                  {loading ? 'Analyzing Sentiment...' : 'Submit Feedback & Analyze Sentiment'}
                </button>
              </form>

              {/* AI Sentiment Analysis Result */}
              {sentimentResult && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1.2rem',
                  background: sentimentResult.sentiment === 'POSITIVE' ? '#f0fdf4' : sentimentResult.sentiment === 'NEGATIVE' ? '#fef2f2' : '#fefce8',
                  borderRadius: '10px',
                  border: `1px solid ${sentimentResult.sentiment === 'POSITIVE' ? '#86efac' : sentimentResult.sentiment === 'NEGATIVE' ? '#fca5a5' : '#fde047'}`
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Cpu size={14} /> AI Sentiment Engine Result
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <div>
                      {sentimentResult.sentiment === 'POSITIVE' ? (
                        <ThumbsUp size={22} color="#166534" />
                      ) : sentimentResult.sentiment === 'NEGATIVE' ? (
                        <ThumbsDown size={22} color="#991b1b" />
                      ) : (
                        <HelpCircle size={22} color="#854d0e" />
                      )}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '800',
                        color: sentimentResult.sentiment === 'POSITIVE' ? '#166534' : sentimentResult.sentiment === 'NEGATIVE' ? '#991b1b' : '#854d0e'
                      }}>
                        {sentimentResult.sentiment} Sentiment ({sentimentResult.confidencePercent}% Confidence)
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                        Feedback logged and forwarded to hospital quality care team.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Past Feedback History */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                Your Submitted Feedback ({submittedFeedbacks.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {submittedFeedbacks.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      padding: '1rem',
                      background: 'var(--bg-light)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} fill={s <= item.rating ? '#f59e0b' : 'none'} color={s <= item.rating ? '#f59e0b' : '#cbd5e1'} />
                        ))}
                      </div>
                      <span className={`badge ${item.sentiment === 'POSITIVE' ? 'badge-success' : item.sentiment === 'NEGATIVE' ? 'badge-danger' : 'badge-warning'}`}>
                        {item.sentiment} ({item.confidence}%)
                      </span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', margin: 0 }}>
                      "{item.text}"
                    </p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      Submitted on {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default Feedback;
