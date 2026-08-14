import React, { useState, useEffect } from 'react';
import { 
  TestTube2, CheckCircle2, AlertCircle, FileText, 
  Send, User, Clock, X 
} from 'lucide-react';

export const LabTechView = () => {
  const [requests, setRequests] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const [resultForm, setResultForm] = useState({
    resultDetails: 'Hemoglobin: 14.2 g/dL (Normal: 12.0 - 16.0)\nWhite Blood Cells: 6,800 /uL (Normal: 4000 - 11000)\nPlatelets: 245,000 /uL',
    technicianName: 'Nimal Fernando (Senior Tech)',
    remarks: 'All parameters within normal clinical ranges.'
  });

  const token = localStorage.getItem('hms_token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [resR, resT] = await Promise.all([
        fetch('/api/laboratory/requests', { headers }),
        fetch('/api/laboratory/tests', { headers })
      ]);
      if (resR.ok) setRequests(await resR.json());
      if (resT.ok) setLabTests(await resT.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCollectSample = async (reqId) => {
    try {
      const res = await fetch(`/api/laboratory/requests/${reqId}/sample-collected`, {
        method: 'PUT',
        headers
      });
      if (res.ok) {
        alert('Sample marked as COLLECTED!');
        fetchData();
      }
    } catch (e) {
      alert('Error updating status');
    }
  };

  const handleEnterResult = async (e) => {
    e.preventDefault();
    if (!selectedReq) return;
    try {
      const res = await fetch(`/api/laboratory/requests/${selectedReq.id}/results`, {
        method: 'POST',
        headers,
        body: JSON.stringify(resultForm)
      });
      if (res.ok) {
        alert('Laboratory Test Result recorded and dispatched!');
        setShowResultModal(false);
        fetchData();
      }
    } catch (e) {
      alert('Error saving lab results');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Diagnostic Laboratory Console</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Test Requests Inbox, Sample Tracking, Laboratory Result Entry & Reports</p>
        </div>
      </div>

      <div className="grid-2">
        {/* Lab Request Feed */}
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TestTube2 color="#7c3aed" size={20} /> Doctor Laboratory Test Orders
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {requests.map(req => (
              <div key={req.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#0f172a' }}>{req.labTest?.testName}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Patient: <strong>{req.patient?.fullName}</strong> ({req.patient?.nicPassport})
                    </p>
                  </div>
                  <span className={`badge ${req.status === 'COMPLETED' ? 'badge-completed' : req.status === 'SAMPLE_COLLECTED' ? 'badge-consultation' : 'badge-waiting'}`}>
                    {req.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  <p>Ordered by: {req.doctor?.name} | Price: Rs. {req.labTest?.priceLkr?.toLocaleString()}</p>
                  {req.clinicalNotes && <p style={{ fontStyle: 'italic', marginTop: '0.2rem' }}>"Notes: {req.clinicalNotes}"</p>}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {req.status === 'PENDING' && (
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => handleCollectSample(req.id)}>
                      Mark Sample Collected
                    </button>
                  )}
                  {req.status !== 'COMPLETED' && (
                    <button 
                      className="btn btn-primary btn-sm" 
                      style={{ width: '100%' }}
                      onClick={() => {
                        setSelectedReq(req);
                        setShowResultModal(true);
                      }}
                    >
                      <FileText size={14} /> Enter Test Results
                    </button>
                  )}
                  {req.status === 'COMPLETED' && (
                    <span style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 600 }}>
                      ✓ Result Entered & Dispatched
                    </span>
                  )}
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                No active lab requests at the moment.
              </div>
            )}
          </div>
        </div>

        {/* Laboratory Test Catalog */}
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText color="#0284c7" size={20} /> Laboratory Test Catalog & Reference Ranges
          </h2>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Test Name</th>
                  <th>Sample</th>
                  <th>Price (LKR)</th>
                  <th>Normal Reference Range</th>
                </tr>
              </thead>
              <tbody>
                {labTests.map(t => (
                  <tr key={t.id}>
                    <td><strong>{t.testCode}</strong></td>
                    <td>{t.testName}</td>
                    <td><span className="badge badge-primary">{t.sampleType || 'Blood'}</span></td>
                    <td>Rs. {t.priceLkr?.toLocaleString()}</td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b' }}>{t.normalRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enter Result Modal */}
      {showResultModal && selectedReq && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '540px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Enter Lab Result: {selectedReq.labTest?.testName}</h2>
              <X cursor="pointer" onClick={() => setShowResultModal(false)} />
            </div>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>Patient: {selectedReq.patient?.fullName}</p>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Normal Range: {selectedReq.labTest?.normalRange}</p>
            </div>

            <form onSubmit={handleEnterResult}>
              <div className="form-group">
                <label>Test Findings & Measured Parameters</label>
                <textarea className="form-control" rows={5} value={resultForm.resultDetails} onChange={e => setResultForm({...resultForm, resultDetails: e.target.value})} required />
              </div>

              <div className="form-group">
                <label>Technician Name & Qualification</label>
                <input type="text" className="form-control" value={resultForm.technicianName} onChange={e => setResultForm({...resultForm, technicianName: e.target.value})} required />
              </div>

              <div className="form-group">
                <label>Remarks / Interpretation</label>
                <input type="text" className="form-control" value={resultForm.remarks} onChange={e => setResultForm({...resultForm, remarks: e.target.value})} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Dispatch Verified Lab Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
