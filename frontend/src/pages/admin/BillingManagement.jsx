import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { DollarSign, Search, Plus, CreditCard, CheckCircle2, FileText, Printer } from 'lucide-react';

export const BillingManagement = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInv, setNewInv] = useState({
    patient: '',
    description: 'General OPD Consultation & Pharmacy Dispensing',
    amount: '3500.00',
    method: 'Cash Counter'
  });

  const [invoicesList, setInvoicesList] = useState([
    { id: 'INV-2026-0042', patient: 'Kamani Wijesinghe', date: 'May 12, 2026', description: 'General Consultation + FBC Lab Test', amount: 3300.00, method: 'Online Card Payment', status: 'PAID' },
    { id: 'INV-2026-0089', patient: 'Nimal Perera', date: 'May 20, 2026', description: 'Advance OPD Consultation Token Booking (CAR-008)', amount: 2500.00, method: 'Counter Cash', status: 'PENDING' },
    { id: 'INV-2026-0091', patient: 'Sunethra Rajapaksha', date: 'May 14, 2026', description: 'Cardiology ECG & Lipid Profile Test', amount: 4800.00, method: 'Visa Card POS', status: 'PAID' },
    { id: 'INV-INT-0001', patient: 'Johnathan Smith (UK)', date: 'May 10, 2026', description: 'Executive International Health Screening Package', amount: 35000.00, method: 'International Card (GBP £87.50)', status: 'PAID' },
    { id: 'INV-2026-0105', patient: 'Ravindu Silva', date: 'May 15, 2026', description: 'Emergency OPD Triage & Nebulization', amount: 1800.00, method: 'LankaQR', status: 'PAID' }
  ]);

  const totalCollected = invoicesList
    .filter(i => i.status === 'PAID')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPending = invoicesList
    .filter(i => i.status === 'PENDING')
    .reduce((sum, i) => sum + i.amount, 0);

  const filteredInvoices = invoicesList.filter(inv => {
    const matchFilter = filter === 'ALL' || inv.status === filter;
    const matchSearch = inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        inv.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleMarkAsPaid = (id) => {
    setInvoicesList(invoicesList.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: 'PAID', method: 'Counter Cash (Settled)' };
      }
      return inv;
    }));
  };

  const handleAddInvoice = (e) => {
    e.preventDefault();
    if (!newInv.patient) return;

    const added = {
      id: `INV-2026-${String(invoicesList.length + 100).padStart(4, '0')}`,
      patient: newInv.patient,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: newInv.description,
      amount: Number(newInv.amount) || 0,
      method: newInv.method,
      status: 'PAID'
    };

    setInvoicesList([added, ...invoicesList]);
    setShowAddModal(false);
    setNewInv({ patient: '', description: 'General OPD Consultation & Pharmacy Dispensing', amount: '3500.00', method: 'Cash Counter' });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                Hospital Master Billing & Financials
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Cashier collections, patient invoicing, counter settlements, and revenue reconciliation.
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)} 
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Create New Invoice
            </button>
          </div>

          {/* Financial Summary Stat Cards */}
          <div className="grid-cols-3" style={{ marginBottom: '1.75rem' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Total Revenue Settled</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#16a34a', marginTop: '0.2rem' }}>
                  LKR {totalCollected.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{invoicesList.filter(i => i.status === 'PAID').length} Invoices Cleared</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '12px' }}>
                <CheckCircle2 size={24} />
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Pending Receivables</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#e11d48', marginTop: '0.2rem' }}>
                  LKR {totalPending.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{invoicesList.filter(i => i.status === 'PENDING').length} Invoices Due</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#e11d48', borderRadius: '12px' }}>
                <CreditCard size={24} />
              </div>
            </div>

            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Total Invoices Generated</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary-blue)', marginTop: '0.2rem' }}>
                  {invoicesList.length} Invoices
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Active Billing Cycle</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--secondary-teal-light)', color: 'var(--primary-blue)', borderRadius: '12px' }}>
                <DollarSign size={24} />
              </div>
            </div>
          </div>

          {/* Add Invoice Modal */}
          {showAddModal && (
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary-blue)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                Issue Hospital Tax Invoice
              </h3>
              <form onSubmit={handleAddInvoice} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Patient Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Silva"
                    value={newInv.patient}
                    onChange={(e) => setNewInv({ ...newInv, patient: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Amount (LKR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3500"
                    value={newInv.amount}
                    onChange={(e) => setNewInv({ ...newInv, amount: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Description of Service</label>
                  <input
                    type="text"
                    required
                    value={newInv.description}
                    onChange={(e) => setNewInv({ ...newInv, description: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem' }}>Payment Method</label>
                  <select
                    value={newInv.method}
                    onChange={(e) => setNewInv({ ...newInv, method: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Cash Counter">Cash Counter</option>
                    <option value="Visa / Master Card POS">Visa / Master Card POS</option>
                    <option value="LankaQR">LankaQR</option>
                    <option value="Online Portal">Online Portal</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Generate Invoice</button>
                </div>
              </form>
            </div>
          )}

          {/* Filter & Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '360px' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                placeholder="Search by Invoice #, Patient Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.65rem 0.65rem 0.65rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['ALL', 'PAID', 'PENDING'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`btn ${filter === st ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {st === 'ALL' ? 'All Invoices' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Table */}
          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Invoice #</th>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                  <th style={{ padding: '0.75rem' }}>Patient Name</th>
                  <th style={{ padding: '0.75rem' }}>Service Description</th>
                  <th style={{ padding: '0.75rem' }}>Amount (LKR)</th>
                  <th style={{ padding: '0.75rem' }}>Payment Method</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                      {inv.id}
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{inv.date}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '700' }}>{inv.patient}</td>
                    <td style={{ padding: '0.75rem' }}>{inv.description}</td>
                    <td style={{ padding: '0.75rem', fontWeight: '800' }}>
                      LKR {Number(inv.amount).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{inv.method}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${inv.status === 'PAID' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.75rem' }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {inv.status === 'PENDING' ? (
                        <button
                          onClick={() => handleMarkAsPaid(inv.id)}
                          className="btn btn-primary"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem' }}
                        >
                          Collect Cash
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Official Receipt for ${inv.id}\nPatient: ${inv.patient}\nAmount: LKR ${inv.amount}\nStatus: Settled`)}
                          className="btn btn-outline"
                          style={{ padding: '0.25rem 0.65rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          <Printer size={12} /> Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default BillingManagement;
