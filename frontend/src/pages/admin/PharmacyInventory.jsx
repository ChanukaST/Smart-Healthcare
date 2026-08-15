import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';

export const PharmacyInventory = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <main className="page-container" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)' }}>Pharmacy Stock & Inventory</h2>
            <button className="btn btn-primary">+ Add Medicine Batch</button>
          </div>

          <div className="card">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Medicine Name</th>
                  <th style={{ padding: '0.75rem' }}>Batch No</th>
                  <th style={{ padding: '0.75rem' }}>Expiry Date</th>
                  <th style={{ padding: '0.75rem' }}>Stock</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>Paracetamol 500mg</td>
                  <td style={{ padding: '0.75rem' }}>B00123</td>
                  <td style={{ padding: '0.75rem' }}>2028-05-30</td>
                  <td style={{ padding: '0.75rem' }}>320</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-success">In Stock</span></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700' }}>Amlodipine 5mg</td>
                  <td style={{ padding: '0.75rem' }}>A00988</td>
                  <td style={{ padding: '0.75rem' }}>2027-03-15</td>
                  <td style={{ padding: '0.75rem' }}>89</td>
                  <td style={{ padding: '0.75rem' }}><span className="badge badge-warning">Low Stock</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PharmacyInventory;
