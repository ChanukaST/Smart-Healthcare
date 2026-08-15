import React from 'react';

export const StatCard = ({ title, value, change, trend = 'up', icon }) => (
  <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem' }}>
    <div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.25rem' }}>{title}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-dark)' }}>{value}</div>
      {change && (
        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: trend === 'up' ? 'var(--primary-blue)' : 'var(--danger)', marginTop: '0.25rem' }}>
          {change}
        </div>
      )}
    </div>
    {icon && (
      <div style={{
        padding: '0.75rem',
        backgroundColor: 'var(--secondary-teal-light)',
        color: 'var(--secondary-teal)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
    )}
  </div>
);

export default StatCard;
