import React, { useState, useEffect } from 'react';
import { 
  Pill, AlertTriangle, CheckCircle2, Plus, 
  PackageCheck, Calendar, ShieldAlert, X 
} from 'lucide-react';

export const PharmacistView = () => {
  const [medicines, setMedicines] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [showBatchModal, setShowBatchModal] = useState(false);

  const [selectedMedId, setSelectedMedId] = useState('');
  const [batchForm, setBatchForm] = useState({
    batchNumber: 'BATCH-2026-' + Math.floor(100 + Math.random() * 900),
    expiryDate: '2027-12-31',
    quantity: 200,
    unitCostLkr: 12.0
  });

  const token = localStorage.getItem('hms_token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [resM, resP, resL] = await Promise.all([
        fetch('/api/pharmacy/medicines', { headers }),
        fetch('/api/pharmacy/prescriptions?status=PENDING', { headers }),
        fetch('/api/pharmacy/medicines/low-stock', { headers })
      ]);
      if (resM.ok) setMedicines(await resM.json());
      if (resP.ok) setPrescriptions(await resP.json());
      if (resL.ok) setLowStock(await resL.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDispense = async (rxId) => {
    try {
      const res = await fetch(`/api/pharmacy/prescriptions/${rxId}/dispense`, {
        method: 'POST',
        headers
      });
      if (res.ok) {
        alert('Prescription dispensed successfully! Medicine stock updated.');
        fetchData();
      }
    } catch (e) {
      alert('Error dispensing prescription');
    }
  };

  const handleAddBatch = async (e) => {
    e.preventDefault();
    if (!selectedMedId) return;
    try {
      const res = await fetch('/api/pharmacy/batches', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          medicineId: parseInt(selectedMedId),
          ...batchForm
        })
      });
      if (res.ok) {
        alert('Stock batch added successfully!');
        setShowBatchModal(false);
        fetchData();
      }
    } catch (e) {
      alert('Error adding batch');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Pharmacy & Drug Store Console</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Prescription Dispensing, Stock Inventory, Batch Expiry & Low-Stock Alerts</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowBatchModal(true)}>
          <Plus size={18} /> Add Stock Batch
        </button>
      </div>

      {/* Low Stock Warning Banner if any */}
      {lowStock.length > 0 && (
        <div style={{ background: '#fffbe3', border: '1px solid #fde047', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AlertTriangle size={24} color="#d97706" />
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#92400e', fontWeight: 700 }}>
              Low Stock Warning Alert ({lowStock.length} Item Need Replenishment)
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#b45309' }}>
              The following medicines have fallen below their reorder threshold: {lowStock.map(m => `${m.brandName} (${m.totalStock} left)`).join(', ')}
            </p>
          </div>
        </div>
      )}

      <div className="grid-2">
        {/* Prescription Queue */}
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Pill color="#d97706" size={20} /> Doctor Prescription Dispensing Queue
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {prescriptions.map(rx => (
              <div key={rx.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#0f172a' }}>{rx.patient?.fullName}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Prescribed by {rx.doctor?.name} | Code: <strong>{rx.prescriptionCode}</strong>
                    </p>
                  </div>
                  <span className="badge badge-waiting">PENDING</span>
                </div>

                <div style={{ borderTop: '1px dashed #e2e8f0', borderBottom: '1px dashed #e2e8f0', padding: '0.5rem 0', margin: '0.5rem 0' }}>
                  {rx.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', margin: '0.2rem 0' }}>
                      <span><strong>{item.medicine?.brandName}</strong> ({item.dosage})</span>
                      <span>Qty: {item.quantity} | Rs. {(item.medicine?.unitPriceLkr * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '0.4rem' }} onClick={() => handleDispense(rx.id)}>
                  <PackageCheck size={16} /> Dispense Medicine & Deduct Stock
                </button>
              </div>
            ))}

            {prescriptions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                No pending prescriptions in queue right now.
              </div>
            )}
          </div>
        </div>

        {/* Medicine Inventory Catalog */}
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PackageCheck color="#0d9488" size={20} /> Medicine Catalog & Stock Inventory
          </h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Brand (Generic)</th>
                  <th>Category</th>
                  <th>Price (LKR)</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(m => {
                  const isLow = m.totalStock <= m.reorderLevel;
                  return (
                    <tr key={m.id}>
                      <td><strong>{m.itemCode}</strong></td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{m.brandName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{m.genericName}</div>
                      </td>
                      <td>{m.category}</td>
                      <td>Rs. {m.unitPriceLkr?.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${isLow ? 'badge-danger' : 'badge-completed'}`}>
                          {m.totalStock} {isLow ? 'LOW' : 'OK'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Stock Batch Modal */}
      {showBatchModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Add Drug Stock Batch</h2>
              <X cursor="pointer" onClick={() => setShowBatchModal(false)} />
            </div>

            <form onSubmit={handleAddBatch}>
              <div className="form-group">
                <label>Select Medicine</label>
                <select className="form-control" value={selectedMedId} onChange={e => setSelectedMedId(e.target.value)} required>
                  <option value="">-- Choose Medicine --</option>
                  {medicines.map(m => (
                    <option key={m.id} value={m.id}>{m.brandName} ({m.genericName})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Batch Number</label>
                <input type="text" className="form-control" value={batchForm.batchNumber} onChange={e => setBatchForm({...batchForm, batchNumber: e.target.value})} required />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" className="form-control" value={batchForm.quantity} onChange={e => setBatchForm({...batchForm, quantity: parseInt(e.target.value) || 0})} required />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="date" className="form-control" value={batchForm.expiryDate} onChange={e => setBatchForm({...batchForm, expiryDate: e.target.value})} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Add Batch to Stock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
