import React, { useState, useEffect } from 'react';
import { 
  Activity, TrendingUp, AlertTriangle, Smile, 
  DollarSign, Users, RefreshCw, Sparkles 
} from 'lucide-react';

export const SmartAnalyticsView = () => {
  const [trends, setTrends] = useState(null);

  const fetchTrends = async () => {
    try {
      const res = await fetch('/api/ml/trends');
      if (res.ok) setTrends(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Smart Healthcare Analytics & ML Dashboard</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Python Machine Learning Insights, Operational Predictions & Anomaly Detection</p>
        </div>

        <button className="btn btn-secondary btn-sm" onClick={fetchTrends}>
          <RefreshCw size={16} /> Refresh Analytics
        </button>
      </div>

      {/* AI Key Insights Bar */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p>Monthly OPD Patient Volume</p>
            <h2>890 Patients</h2>
            <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>↑ +9.8% vs last month</span>
          </div>
          <div className="stat-icon icon-teal">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Predictive No-Show Rate</p>
            <h2>10.2%</h2>
            <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>↓ Reduced via AI reminders</span>
          </div>
          <div className="stat-icon icon-blue">
            <Activity size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Monthly LKR Revenue</p>
            <h2>Rs. 6.8 Million</h2>
            <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>↑ +11.4% growth</span>
          </div>
          <div className="stat-icon icon-emerald">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p>Positive Feedback Sentiment</p>
            <h2>72%</h2>
            <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>Based on NLP Classification</span>
          </div>
          <div className="stat-icon icon-amber">
            <Smile size={24} />
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Monthly OPD & Revenue Bar Chart Visualizer */}
        <div className="card">
          <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
            <TrendingUp color="#0d9488" size={20} /> 2026 OPD Volume & Revenue Growth (Million LKR)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {trends?.months?.map((m, idx) => {
              const rev = trends.revenueMillionLkr[idx];
              const vol = trends.opdVolumeTrend[idx];
              const barWidth = (vol / 1000) * 100;
              return (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ width: '40px', fontWeight: 600, fontSize: '0.85rem', color: '#64748b' }}>{m}</span>
                  <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '8px', height: '24px', overflow: 'hidden', position: 'relative' }}>
                    <div 
                      style={{ 
                        width: `${barWidth}%`, 
                        background: 'linear-gradient(90deg, #0d9488, #0284c7)', 
                        height: '100%',
                        borderRadius: '8px',
                        transition: 'width 0.5s ease'
                      }} 
                    />
                  </div>
                  <span style={{ width: '130px', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>
                    {vol} pts / Rs.{rev}M
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Anomaly Detection & Feedback Sentiment */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
              <AlertTriangle color="#d97706" size={20} /> AI Anomaly Detection Logs
            </h2>

            {trends?.anomaliesDetected?.map((anom, idx) => (
              <div key={idx} style={{ background: '#fffbe3', border: '1px solid #fde047', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#92400e', fontWeight: 700 }}>{anom.type}</h4>
                  <span className="badge badge-waiting">{anom.severity}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#b45309' }}>{anom.description}</p>
                <span style={{ fontSize: '0.72rem', color: '#a16207', display: 'block', marginTop: '0.4rem' }}>
                  Detected Date: {anom.date}
                </span>
              </div>
            ))}
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
              <Sparkles color="#7c3aed" size={20} /> Patient Feedback NLP Sentiment Breakdown
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
              <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '10px', border: '1px solid #86efac' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803d' }}>72%</h3>
                <p style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>POSITIVE</p>
              </div>

              <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '10px', border: '1px solid #fde047' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a16207' }}>18%</h3>
                <p style={{ fontSize: '0.78rem', color: '#854d0e', fontWeight: 600 }}>NEUTRAL</p>
              </div>

              <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '10px', border: '1px solid #fca5a5' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#b91c1c' }}>10%</h3>
                <p style={{ fontSize: '0.78rem', color: '#991b1b', fontWeight: 600 }}>NEGATIVE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
