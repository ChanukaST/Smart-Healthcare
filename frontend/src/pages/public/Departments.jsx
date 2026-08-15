import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Heart, Baby, Building2, Activity, Sparkles, Brain, FlaskConical, ShieldAlert, Clock } from 'lucide-react';

export const Departments = () => {
  const { isAuthenticated } = useAuth();

  const departmentsList = [
    {
      id: 'cardio',
      icon: <Heart size={26} color="var(--primary-blue)" />,
      name: 'Cardiology & Heart Institute',
      head: 'Dr. Anura Perera',
      description: 'Comprehensive adult & pediatric cardiovascular diagnostics, ECG, echocardiography, hypertension management, and coronary care.',
      services: ['ECG & Stress Testing', 'Echocardiogram', 'Holter Blood Pressure Monitoring', 'Cardiac Consultation & Rehabilitation'],
      hours: 'Mon - Sat (08:00 - 18:00)',
      beds: '15 Dedicated CCU Beds'
    },
    {
      id: 'pedia',
      icon: <Baby size={26} color="var(--primary-blue)" />,
      name: 'Pediatrics & Child Wellness',
      head: 'Dr. Sumudu Bandara',
      description: 'Expert medical care for infants, children, and adolescents, including national immunization tracking, growth monitoring, and pediatric OPD.',
      services: ['National Immunization Program', 'Newborn & Infant Care', 'Pediatric Acute Care', 'Developmental Assessments'],
      hours: 'Daily (08:00 - 20:00)',
      beds: '20 Pediatric Ward Beds'
    },
    {
      id: 'opd',
      icon: <Building2 size={26} color="var(--primary-blue)" />,
      name: 'Outpatient Department (OPD)',
      head: 'Dr. K. L. Wickramasinghe',
      description: 'Walk-in general consultation clinics with digital queue token management, rapid triage, and streamlined pharmacy dispensing.',
      services: ['General Medical Consultations', 'Digital Queue Token Calling', 'Triage & Vital Checks', 'Preventative Screenings'],
      hours: '24/7 Service Available',
      beds: 'OPD Observation Bays'
    },
    {
      id: 'ortho',
      icon: <Activity size={26} color="var(--primary-blue)" />,
      name: 'Orthopedics & Joint Care',
      head: 'Dr. Rohan Jayawardena',
      description: 'Advanced diagnosis and treatment for bone fractures, joint arthritis, sports injuries, and post-operative rehabilitation physiotherapy.',
      services: ['Fracture Management & Casting', 'Joint Injections & Arthroscopy', 'Sports Injury Rehabilitation', 'Physiotherapy Center'],
      hours: 'Mon - Fri (09:00 - 17:00)',
      beds: '12 Orthopedic Beds'
    },
    {
      id: 'derma',
      icon: <Sparkles size={26} color="var(--primary-blue)" />,
      name: 'Dermatology & Skin Clinic',
      head: 'Dr. Priyadarshani Silva',
      description: 'Clinical dermatology services specializing in skin allergy evaluations, eczema treatment, acne therapies, and dermatopathology.',
      services: ['Allergy Patch Testing', 'Skin Biopsy & Evaluation', 'Cryotherapy', 'Cosmetic Dermatology'],
      hours: 'Mon, Wed, Thu (13:00 - 18:00)',
      beds: 'Day Care Unit'
    },
    {
      id: 'neuro',
      icon: <Brain size={26} color="var(--primary-blue)" />,
      name: 'Neurology & Brain Sciences',
      head: 'Dr. Nilmini Weerasinghe',
      description: 'Specialized neurological diagnostic evaluations for headaches, stroke recovery management, neuropathy, epilepsy, and cognitive wellness.',
      services: ['EEG & Nerve Conduction Studies', 'Stroke Rehabilitation Support', 'Migraine Clinic', 'Neuropathic Pain Management'],
      hours: 'Tue, Thu, Sat (09:00 - 14:00)',
      beds: '8 Neuro Care Beds'
    },
    {
      id: 'lab',
      icon: <FlaskConical size={26} color="var(--primary-blue)" />,
      name: 'Diagnostic Laboratory & Pathology',
      head: 'Nimal Fernando (Senior Lab Tech)',
      description: 'Fully automated diagnostic lab offering Hematology (FBC), Immunology (Dengue NS1), Biochemistry (FBS, Lipid Profile), and rapid PCR testing.',
      services: ['Full Blood Count (FBC)', 'Dengue NS1 Antigen Test', 'Fasting Blood Sugar (FBS)', 'Lipid Profile & Liver Functions'],
      hours: '24/7 Sample Collection & Reporting',
      beds: 'Central Clinical Laboratory'
    },
    {
      id: 'emergency',
      icon: <ShieldAlert size={26} color="var(--primary-blue)" />,
      name: 'Emergency & Trauma Center',
      head: 'Emergency Duty Officer',
      description: 'Round-the-clock emergency medical response unit with trauma resuscitation bays, advanced life support ambulances, and ICU triage.',
      services: ['24/7 Ambulance Dispatch', 'Trauma Resuscitation', 'Acute Cardiac Emergency Triage', 'Minor Surgical Procedures'],
      hours: '24/7 Immediate Response',
      beds: '10 Resuscitation Bays'
    }
  ];

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
            Clinical Departments & Centers
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Explore our specialized clinical departments equipped with cutting-edge medical technologies and dedicated healthcare teams.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/doctors" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem', backgroundColor: '#ffffff' }}>
              View All Doctors
            </Link>
            <Link 
              to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
              className="btn btn-primary" 
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </header>

      {/* Departments Grid */}
      <section className="page-container" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.75rem' }}>
          {departmentsList.map((dept) => (
            <div key={dept.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1.75rem', borderRadius: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--secondary-teal-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {dept.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
                      {dept.name}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: '700' }}>
                      Lead: {dept.head}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1rem' }}>
                  {dept.description}
                </p>

                <div style={{ backgroundColor: 'var(--bg-light)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Key Clinical Services
                  </div>
                  <ul style={{ paddingLeft: '1.1rem', margin: 0, fontSize: '0.82rem', color: 'var(--text-dark)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {dept.services.map((svc, idx) => (
                      <li key={idx}>{svc}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>⏰ <strong>Hours:</strong> {dept.hours}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <Link to="/doctors" style={{ fontSize: '0.85rem', color: 'var(--secondary-teal)', fontWeight: '700' }}>
                  View Specialists &gt;
                </Link>
                <Link 
                  to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
                  className="btn btn-primary" 
                  style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}
                >
                  Book Clinic
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Departments;
