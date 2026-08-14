import React, { useState, useEffect } from 'react';
import { Tv, Volume2, UserCheck, Stethoscope } from 'lucide-react';

export const OpdDisplayBoardView = () => {
  const [tokens, setTokens] = useState([]);

  const fetchQueue = async () => {
    try {
      const res = await fetch('/api/opd/queue');
      if (res.ok) setTokens(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 3000); // Live poll every 3 seconds for room calls
    return () => clearInterval(interval);
  }, []);

  const activeCalls = tokens.filter(t => t.status === 'IN_CONSULTATION');
  const waitingTokens = tokens.filter(t => t.status === 'WAITING');

  return (
    <div style={{ background: '#0f172a', minHeight: 'calc(100vh - 120px)', borderRadius: '16px', padding: '2rem', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1e293b', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Tv size={32} color="#0d9488" />
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>OPD CLINIC CALL BOARD</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Please proceed to your assigned clinic room when your token number is displayed.</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#0d9488', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 700 }}>
          <Volume2 size={20} /> LIVE BROADCAST
        </div>
      </div>

      {/* Currently Calling Tickets */}
      <h2 style={{ fontSize: '1.2rem', color: '#38bdf8', marginBottom: '1rem', letterSpacing: '0.05em' }}>
        NOW CALLING INTO CLINIC ROOMS
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {activeCalls.map(t => (
          <div key={t.id} style={{ background: 'linear-gradient(135deg, #0f766e, #0284c7)', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 8px 25px rgba(2,132,199,0.3)', border: '2px solid #38bdf8', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.9 }}>
              {t.doctor?.roomNumber} - {t.doctor?.name}
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', margin: '0.5rem 0' }}>
              {t.tokenNumber}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {t.patient?.fullName}
            </div>
          </div>
        ))}

        {activeCalls.length === 0 && (
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', textAlign: 'center', color: '#94a3b8', gridColumn: '1 / -1' }}>
            No tokens currently being called into rooms. Next patient will be announced shortly.
          </div>
        )}
      </div>

      {/* Waiting Queue List */}
      <h2 style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '1rem' }}>
        UPCOMING WAITING TOKENS FOR TODAY
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {waitingTokens.map(t => (
          <div key={t.id} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>{t.tokenNumber}</div>
            <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '0.2rem' }}>{t.patient?.fullName}</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>{t.doctor?.name}</div>
          </div>
        ))}

        {waitingTokens.length === 0 && (
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>All waiting patients have been attended to.</div>
        )}
      </div>
    </div>
  );
};
