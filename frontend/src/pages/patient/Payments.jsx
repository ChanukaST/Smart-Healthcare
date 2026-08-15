import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export const Payments = () => {
  const { user, updateUser } = useAuth();
  const [filter, setFilter] = useState('ALL');
  const [payingInvoice, setPayingInvoice] = useState(null);
  const [paySuccess, setPaySuccess] = useState('');

  const invoices = user?.invoices || [];

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'PAID') return inv.status === 'PAID';
    if (filter === 'PENDING') return inv.status === 'PENDING' || inv.status === 'DUE';
    return true;
  });

  const handlePayNow = (inv) => {
    setPayingInvoice(inv);
    setPaySuccess('');
  };

  const handleConfirmPayment = (method) => {
    if (!payingInvoice) return;
    
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === payingInvoice.id) {
        return { ...inv, status: 'PAID', method: `${method} (Online)` };
      }
      return inv;
    });

    const remainingDue = updatedInvoices
      .filter(i => i.status !== 'PAID')
      .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

    updateUser({
      invoices: updatedInvoices,
      outstandingBalance: remainingDue.toFixed(2),
      notifications: [
        {
          id: Date.now(),
          type: 'payment',
          text: `Payment of LKR ${payingInvoice.amount.toLocaleString()} for ${payingInvoice.description} was successful.`
        },
        ...(user?.notifications || [])
      ]
    });

    setPaySuccess(`Payment of LKR ${payingInvoice.amount.toLocaleString()} received via ${method}! Receipt generated.`);
    setTimeout(() => {
      setPayingInvoice(null);
      setPaySuccess('');
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                Billing & Payments
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Manage hospital invoices, clinic consultation charges and digital payment receipts.
              </p>
            </div>
            
            <div className="card" style={{ padding: '0.75rem 1.25rem', background: '#f8fafc', border: '1px solid var(--border-color)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Total Outstanding Due</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: user?.outstandingBalance && user?.outstandingBalance !== '0.00' ? '#e11d48' : '#16a34a' }}>
                  LKR {user?.outstandingBalance || '0.00'}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            {[
              { id: 'ALL', label: `All Invoices (${invoices.length})` },
              { id: 'PENDING', label: `Pending Payment (${invoices.filter(i => i.status !== 'PAID').length})` },
              { id: 'PAID', label: `Paid Receipts (${invoices.filter(i => i.status === 'PAID').length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: filter === tab.id ? '700' : '500',
                  color: filter === tab.id ? 'var(--primary-blue)' : 'var(--text-muted)',
                  borderBottom: filter === tab.id ? '2px solid var(--primary-blue)' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Payment Modal */}
          {payingInvoice && (
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #86efac',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#166534', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} /> Settle Invoice: {payingInvoice.id}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#15803d', marginTop: '0.3rem' }}>
                {payingInvoice.description} — <strong>LKR {Number(payingInvoice.amount).toLocaleString()}</strong>
              </p>

              {paySuccess ? (
                <div style={{ marginTop: '1rem', fontWeight: '700', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={18} /> {paySuccess}
                </div>
              ) : (
                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => handleConfirmPayment('Visa / Master Card')} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                    Pay via Visa / Mastercard
                  </button>
                  <button onClick={() => handleConfirmPayment('LankaQR / Frimi')} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', backgroundColor: '#0d9488' }}>
                    Pay via LankaQR
                  </button>
                  <button onClick={() => setPayingInvoice(null)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Invoices List */}
          <div className="card">
            {filteredInvoices.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Invoice #</th>
                    <th style={{ padding: '0.75rem' }}>Date</th>
                    <th style={{ padding: '0.75rem' }}>Description</th>
                    <th style={{ padding: '0.75rem' }}>Amount (LKR)</th>
                    <th style={{ padding: '0.75rem' }}>Payment Method</th>
                    <th style={{ padding: '0.75rem' }}>Status</th>
                    <th style={{ padding: '0.75rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv, idx) => (
                    <tr key={inv.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                        {inv.id}
                      </td>
                      <td style={{ padding: '0.75rem', fontWeight: '600' }}>{inv.date}</td>
                      <td style={{ padding: '0.75rem' }}>{inv.description}</td>
                      <td style={{ padding: '0.75rem', fontWeight: '800' }}>
                        LKR {Number(inv.amount).toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {inv.method || 'Not Specified'}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span className={`badge ${inv.status === 'PAID' ? 'badge-success' : 'badge-danger'}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        {inv.status === 'PAID' ? (
                          <button 
                            onClick={() => alert(`Official Receipt for ${inv.id}\nAmount: LKR ${inv.amount}\nStatus: Settled`)} 
                            className="btn btn-outline" 
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                          >
                            Receipt
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePayNow(inv)} 
                            className="btn btn-primary" 
                            style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1rem', fontWeight: '600' }}>No {filter.toLowerCase()} invoices found for your account.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Hospital invoices generated from clinic visits or pharmacy bills will appear here automatically.</p>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Payments;
