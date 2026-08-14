import React, { useState, useEffect } from 'react';
import { 
  Search, UserPlus, Ticket, Receipt, CheckCircle2, 
  CreditCard, DollarSign, Printer, X, Plus, User, FileText 
} from 'lucide-react';

export const ReceptionistView = () => {
  const [activeTab, setActiveTab] = useState('SEARCH');
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [issuedToken, setIssuedToken] = useState(null);
  const [paidReceipt, setPaidReceipt] = useState(null);

  // New Patient Form
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    nicPassport: '',
    age: '',
    gender: 'MALE',
    phone: '+94 77 ',
    address: '',
    district: 'Colombo',
    bloodGroup: 'O+',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalHistory: ''
  });

  // Billing items
  const [billItems, setBillItems] = useState([
    { description: 'Doctor OPD Consultation Fee', amountLkr: 2500, category: 'CONSULTATION' }
  ]);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [referenceNum, setReferenceNum] = useState('');

  const token = localStorage.getItem('hms_token');
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const fetchPatients = async () => {
    try {
      const res = await fetch(`/api/patients?search=${encodeURIComponent(searchQuery)}`, { headers });
      if (res.ok) setPatients(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors', { headers });
      if (res.ok) setDoctors(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPatients();
  };

  const handleRegisterPatient = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers,
        body: JSON.stringify(newPatient)
      });
      if (res.ok) {
        const saved = await res.json();
        alert(`Patient ${saved.fullName} registered successfully! (ID: ${saved.patientId})`);
        setShowRegModal(false);
        fetchPatients();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to register patient');
      }
    } catch (e) {
      alert('Error connecting to backend');
    }
  };

  const handleIssueToken = async () => {
    if (!selectedPatient || !selectedDoctorId) {
      alert('Please select a patient and a doctor');
      return;
    }
    try {
      const res = await fetch('/api/opd/issue-token', {
        method: 'POST',
        headers,
        body: JSON.stringify({ patientId: selectedPatient.id, doctorId: parseInt(selectedDoctorId) })
      });
      if (res.ok) {
        const data = await res.json();
        setIssuedToken(data);
        setShowTokenModal(false);
      } else {
        alert('Failed to issue token');
      }
    } catch (e) {
      alert('Error issuing token');
    }
  };

  const handleCreateAndPayInvoice = async () => {
    if (!selectedPatient) return;
    try {
      const resInv = await fetch('/api/billing/invoices', {
        method: 'POST',
        headers,
        body: JSON.stringify({ patientId: selectedPatient.id, items: billItems })
      });

      if (!resInv.ok) {
        alert('Failed to generate invoice');
        return;
      }
      const inv = await resInv.json();

      const resPay = await fetch(`/api/billing/invoices/${inv.id}/pay`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ paymentMethod, referenceNumber: referenceNum || 'REC-' + Math.floor(10000 + Math.random() * 90000) })
      });

      if (resPay.ok) {
        const payData = await resPay.json();
        setPaidReceipt({ invoice: inv, payment: payData, patient: selectedPatient });
        setShowBillingModal(false);
        setShowReceiptModal(true);
      }
    } catch (e) {
      alert('Error processing payment');
    }
  };

  const slDistricts = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Moneragala", "Ratnapura", "Kegalle"];

  return (
    <div>
      <div className="page-title-header">
        <div className="page-title-text">
          <h1>Front-Desk & Patient Registration Portal</h1>
          <p>Sri Lankan NIC/Passport verification, OPD Ticket Dispenser & Cashier Billing</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowRegModal(true)}>
          <UserPlus size={18} /> Register New Patient
        </button>
      </div>

      {/* Tabbed Workspace Bar */}
      <div className="workspace-tabs">
        <button 
          className={`tab-btn ${activeTab === 'SEARCH' ? 'active' : ''}`}
          onClick={() => setActiveTab('SEARCH')}
        >
          <Search size={16} /> Patient Search & NIC Registry
        </button>
        <button 
          className={`tab-btn ${activeTab === 'BILLING' ? 'active' : ''}`}
          onClick={() => setActiveTab('BILLING')}
        >
          <Receipt size={16} /> Cashier Billing & LKR Invoicing
        </button>
      </div>

      {/* TAB 1: Search & Patient Registry */}
      {activeTab === 'SEARCH' && (
        <div className="card">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input 
                type="text" 
                className="form-control" 
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="Search by Patient Name, SL NIC (e.g. 921543820V), Patient ID or Phone..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-secondary">Search Registry</button>
          </form>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>NIC / Passport</th>
                  <th>Full Name</th>
                  <th>Age / Gender</th>
                  <th>Phone Number</th>
                  <th>District</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.patientId}</strong></td>
                    <td><span className="badge badge-primary">{p.nicPassport}</span></td>
                    <td><strong style={{ color: '#0f172a' }}>{p.fullName}</strong></td>
                    <td>{p.age} yrs / {p.gender}</td>
                    <td>{p.phone}</td>
                    <td>{p.district || 'Colombo'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            setSelectedPatient(p);
                            setShowTokenModal(true);
                          }}
                        >
                          <Ticket size={14} /> OPD Token
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setSelectedPatient(p);
                            setShowBillingModal(true);
                          }}
                        >
                          <Receipt size={14} /> Cashier Billing
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Cashier Billing Overview */}
      {activeTab === 'BILLING' && (
        <div className="card">
          <div className="card-header-clean">
            <h2><Receipt color="#0f766e" size={20} /> Active Cashier Counter</h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Select any patient from the Patient Registry tab to calculate itemized charges (Consultation, Pharmacy, Lab) and issue official LKR receipts.
          </p>
        </div>
      )}

      {/* Issued Token Display */}
      {issuedToken && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #f0fdf4, #e0f2fe)', border: '2px solid #0d9488', textAlign: 'center', padding: '2rem' }}>
          <h3 style={{ fontSize: '1rem', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            OPD Queue Token Successfully Issued!
          </h3>
          <div className="ticket-badge" style={{ margin: '1rem 0', fontSize: '2.5rem', padding: '0.75rem 2rem' }}>
            {issuedToken.tokenNumber}
          </div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            Patient: {issuedToken.patient?.fullName} ({issuedToken.patient?.nicPassport})
          </p>
          <p style={{ color: '#64748b' }}>
            Doctor: {issuedToken.doctor?.name} | {issuedToken.doctor?.roomNumber} | Queue Position: #{issuedToken.queueOrder}
          </p>
        </div>
      )}

      {/* Registration Modal */}
      {showRegModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Sri Lankan Patient Registration</h2>
              <X cursor="pointer" onClick={() => setShowRegModal(false)} />
            </div>

            <form onSubmit={handleRegisterPatient}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" className="form-control" value={newPatient.fullName} onChange={e => setNewPatient({...newPatient, fullName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>NIC / Passport Number *</label>
                  <input type="text" className="form-control" placeholder="e.g. 921543820V or 199512345678" value={newPatient.nicPassport} onChange={e => setNewPatient({...newPatient, nicPassport: e.target.value})} required />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" className="form-control" value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select className="form-control" value={newPatient.gender} onChange={e => setNewPatient({...newPatient, gender: e.target.value})}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select className="form-control" value={newPatient.bloodGroup} onChange={e => setNewPatient({...newPatient, bloodGroup: e.target.value})}>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Phone Number (+94)</label>
                  <input type="text" className="form-control" value={newPatient.phone} onChange={e => setNewPatient({...newPatient, phone: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>District</label>
                  <select className="form-control" value={newPatient.district} onChange={e => setNewPatient({...newPatient, district: e.target.value})}>
                    {slDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" value={newPatient.address} onChange={e => setNewPatient({...newPatient, address: e.target.value})} required />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* OPD Token Generator Modal */}
      {showTokenModal && selectedPatient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '480px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Issue OPD Queue Token</h2>
              <X cursor="pointer" onClick={() => setShowTokenModal(false)} />
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>{selectedPatient.fullName}</p>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>NIC: {selectedPatient.nicPassport} | ID: {selectedPatient.patientId}</p>
            </div>

            <div className="form-group">
              <label>Select Consulting Doctor & Room</label>
              <select className="form-control" value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
                <option value="">-- Choose Doctor --</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialization}) - {d.roomNumber} [Rs. {d.consultationFee}]
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleIssueToken}>
              Generate Queue Token
            </button>
          </div>
        </div>
      )}

      {/* Cashier Billing Modal */}
      {showBillingModal && selectedPatient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>Cashier Billing & Invoice Generator</h2>
              <X cursor="pointer" onClick={() => setShowBillingModal(false)} />
            </div>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>Patient: {selectedPatient.fullName}</p>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>NIC: {selectedPatient.nicPassport}</p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600 }}>Line Items (LKR)</label>
              {billItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input type="text" className="form-control" style={{ flex: 2 }} value={item.description} onChange={e => {
                    const newArr = [...billItems];
                    newArr[idx].description = e.target.value;
                    setBillItems(newArr);
                  }} />
                  <input type="number" className="form-control" style={{ width: '120px' }} value={item.amountLkr} onChange={e => {
                    const newArr = [...billItems];
                    newArr[idx].amountLkr = parseFloat(e.target.value) || 0;
                    setBillItems(newArr);
                  }} />
                </div>
              ))}
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                style={{ marginTop: '0.5rem' }}
                onClick={() => setBillItems([...billItems, { description: 'Laboratory / Pharmacy Charge', amountLkr: 1500, category: 'LABORATORY' }])}
              >
                <Plus size={14} /> Add Line Item
              </button>
            </div>

            <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#0f766e' }}>Total Amount Payable:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f766e' }}>
                Rs. {billItems.reduce((acc, i) => acc + (i.amountLkr || 0), 0).toLocaleString()}
              </span>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Payment Method</label>
                <select className="form-control" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                  <option value="CASH">Cash</option>
                  <option value="CARD">Visa / Mastercard</option>
                  <option value="INSURANCE">Private Health Insurance</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ref / Auth Code</label>
                <input type="text" className="form-control" placeholder="Receipt / Approval #" value={referenceNum} onChange={e => setReferenceNum(e.target.value)} />
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleCreateAndPayInvoice}>
              Process Payment & Issue Receipt
            </button>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {showReceiptModal && paidReceipt && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '520px', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Payment Receipt</h3>
              <X cursor="pointer" onClick={() => setShowReceiptModal(false)} />
            </div>

            <div className="receipt-box">
              <div className="receipt-header">
                <h2 style={{ fontSize: '1.4rem', color: '#0d9488', fontWeight: 800 }}>LANKA CARE HOSPITAL</h2>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Private Medical Center - Colombo, Sri Lanka</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tel: +94 11 234 5678 | Reg: LKH-2026</p>
              </div>

              <div style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>
                <p><strong>Receipt No:</strong> {paidReceipt.payment.paymentNumber}</p>
                <p><strong>Invoice No:</strong> {paidReceipt.invoice.invoiceNumber}</p>
                <p><strong>Patient Name:</strong> {paidReceipt.patient.fullName}</p>
                <p><strong>NIC / Passport:</strong> {paidReceipt.patient.nicPassport}</p>
                <p><strong>Payment Method:</strong> {paidReceipt.payment.paymentMethod}</p>
              </div>

              <div style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '0.75rem 0', marginBottom: '1rem' }}>
                {paidReceipt.invoice.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span>{item.description}</span>
                    <strong>Rs. {item.amountLkr?.toLocaleString()}</strong>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#0f766e' }}>
                <span>TOTAL PAID:</span>
                <span>Rs. {paidReceipt.invoice.totalAmountLkr?.toLocaleString()}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1.25rem' }}
              onClick={() => {
                window.print();
              }}
            >
              <Printer size={16} /> Print Official Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
