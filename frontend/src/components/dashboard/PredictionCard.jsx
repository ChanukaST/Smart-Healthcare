import React from 'react';

export const PredictionCard = ({ title, riskLevel, confidence, details }) => {
  const getBadgeClass = (risk) => {
    if (risk === 'HIGH' || risk === 'HIGH_RISK') return 'badge-danger';
    if (risk === 'MEDIUM' || risk === 'MODERATE_RISK') return 'badge-warning';
    if (risk === 'NEW_PATIENT') return 'badge-primary';
    return 'badge-success';
  };

  return (
    <div className="card" style={{ borderLeft: '5px solid var(--secondary-teal)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{title}</h4>
        <span className={`badge ${getBadgeClass(riskLevel)}`}>{riskLevel}</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{details}</p>
      {confidence && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Model Confidence Score: <strong>{(confidence * 100).toFixed(0)}%</strong>
        </div>
      )}
    </div>
  );
};

export default PredictionCard;
