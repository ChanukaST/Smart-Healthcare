import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, Calendar, MapPin, Star, Clock, Search } from 'lucide-react';

export const Doctors = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const defaultDoctors = [
    {
      id: 1,
      code: 'DOC-001',
      name: 'Dr. Anura Perera',
      qualifications: 'MBBS, MD (Cardiology), MRCP (UK)',
      department: 'Cardiology',
      specialization: 'Interventional Cardiologist',
      room: 'Room 101 (OPD Block A)',
      schedule: 'Mon, Wed, Fri (09:00 - 13:00)',
      fee: 'LKR 2,500.00',
      rating: 4.9,
      reviewsCount: 48,
      status: 'Available'
    },
    {
      id: 2,
      code: 'DOC-002',
      name: 'Dr. Sumudu Bandara',
      qualifications: 'MBBS, DCH (Pediatrics), MD (Child Health)',
      department: 'Pediatrics',
      specialization: 'Senior Pediatrician',
      room: 'Room 105 (Children Wing)',
      schedule: 'Tue, Thu, Sat (10:00 - 14:00)',
      fee: 'LKR 2,200.00',
      rating: 4.8,
      reviewsCount: 36,
      status: 'Available'
    },
    {
      id: 3,
      code: 'DOC-003',
      name: 'Dr. K. L. Wickramasinghe',
      qualifications: 'MBBS, MD (Internal Medicine)',
      department: 'General Medicine',
      specialization: 'Consultant Physician',
      room: 'Room 108 (General OPD)',
      schedule: 'Daily Walk-in (08:30 - 16:00)',
      fee: 'LKR 2,000.00',
      rating: 4.7,
      reviewsCount: 52,
      status: 'Available'
    },
    {
      id: 4,
      code: 'DOC-004',
      name: 'Dr. Priyadarshani Silva',
      qualifications: 'MBBS, MD (Dermatology)',
      department: 'Dermatology',
      specialization: 'Consultant Dermatologist',
      room: 'Room 112 (Skin Clinic)',
      schedule: 'Mon, Thu (14:00 - 18:00)',
      fee: 'LKR 2,400.00',
      rating: 4.9,
      reviewsCount: 29,
      status: 'Available'
    },
    {
      id: 5,
      code: 'DOC-005',
      name: 'Dr. Rohan Jayawardena',
      qualifications: 'MBBS, MS (Orthopedics), FRCS',
      department: 'Orthopedics',
      specialization: 'Orthopedic & Joint Replacement Surgeon',
      room: 'Room 204 (Surgical Block)',
      schedule: 'Tue, Fri (13:00 - 17:00)',
      fee: 'LKR 3,000.00',
      rating: 4.8,
      reviewsCount: 41,
      status: 'In Clinic'
    },
    {
      id: 6,
      code: 'DOC-006',
      name: 'Dr. Nilmini Weerasinghe',
      qualifications: 'MBBS, MD (Neurology)',
      department: 'Neurology',
      specialization: 'Consultant Neurologist',
      room: 'Room 208 (Neuroscience Center)',
      schedule: 'Wed, Sat (09:00 - 13:00)',
      fee: 'LKR 3,200.00',
      rating: 4.9,
      reviewsCount: 33,
      status: 'Available'
    }
  ];

  const [doctorsList, setDoctorsList] = useState(defaultDoctors);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = data.map((d, i) => ({
            id: d.id || i + 1,
            code: d.doctorCode || `DOC-00${i+1}`,
            name: d.fullName || `Dr. ${d.specialization}`,
            qualifications: d.qualifications || 'MBBS, MD Specialist',
            department: d.specialization || (d.department ? d.department.name : 'General Medicine'),
            specialization: d.specialization || 'Clinical Specialist',
            room: d.roomNumber || `Room 10${i+1}`,
            schedule: d.scheduleDetails || 'Mon - Fri (09:00 - 13:00)',
            fee: d.consultationFee ? `LKR ${Number(d.consultationFee).toLocaleString()}` : 'LKR 2,500.00',
            rating: 4.8,
            reviewsCount: 30 + i * 5,
            status: 'Available'
          }));
          setDoctorsList(merged);
        }
      })
      .catch(() => {});
  }, []);

  const departments = ['ALL', 'Cardiology', 'Pediatrics', 'General Medicine', 'Dermatology', 'Orthopedics', 'Neurology'];

  const filtered = doctorsList.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'ALL' || doc.department.toLowerCase() === selectedDept.toLowerCase();
    return matchSearch && matchDept;
  });

  return (
    <div>
      <Navbar />

      {/* Hero Header */}
      <header style={{
        backgroundColor: 'var(--secondary-teal-light)',
        padding: '3.5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '0.75rem' }}>
            Our Specialist Doctors
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Meet our team of renowned Sri Lankan medical consultants, surgeons, and healthcare specialists.
          </p>

          {/* Search Input */}
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search by doctor name, medical specialty, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '0.85rem 1.25rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>
        </div>
      </header>

      {/* Department Filter Chips */}
      <section className="page-container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`btn ${selectedDept === dept ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', borderRadius: '20px' }}
            >
              {dept === 'ALL' ? 'All Specialties' : dept}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((doc) => (
            <div key={doc.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.5rem', borderRadius: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--secondary-teal-light)',
                    color: 'var(--secondary-teal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={24} />
                  </div>
                  <span className={`badge ${doc.status === 'Available' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>
                    {doc.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                  {doc.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#0d9488', fontWeight: '700', marginTop: '0.2rem' }}>
                  {doc.department} • {doc.specialization}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {doc.qualifications}
                </div>

                <div style={{ margin: '1rem 0', padding: '0.75rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dark)' }}>
                    <MapPin size={14} color="var(--primary-blue)" /> <span><strong>Clinic:</strong> {doc.room}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dark)' }}>
                    <Clock size={14} color="var(--primary-blue)" /> <span><strong>Hours:</strong> {doc.schedule}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dark)' }}>
                    <Star size={14} color="#f59e0b" fill="#f59e0b" /> <span><strong>Rating:</strong> {doc.rating} / 5.0 ({doc.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Consultation Fee</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-dark)' }}>{doc.fee}</div>
                </div>
                <Link 
                  to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
                  className="btn btn-primary" 
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <h3>No doctors found matching "{searchTerm}"</h3>
            <p>Try searching for a different specialty or clearing your department filter.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Doctors;
