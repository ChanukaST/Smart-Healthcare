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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <header className="bg-secondary-light py-14 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-4">
            Clinical Departments & Centers
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our specialized clinical departments equipped with cutting-edge medical technologies and dedicated healthcare teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              to="/doctors"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 text-sm font-bold rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors"
            >
              View All Doctors
            </Link>
          </div>
        </div>
      </header>

      {/* Departments Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {departmentsList.map((dept) => (
            <div key={dept.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-light text-secondary flex items-center justify-center flex-shrink-0">
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-primary-dark leading-tight">
                      {dept.name}
                    </h3>
                    <span className="text-sm font-bold text-secondary">
                      Lead: {dept.head}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 h-16 line-clamp-3">
                  {dept.description}
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-5">
                  <div className="text-[0.75rem] font-bold text-primary uppercase tracking-wider mb-2">
                    Key Clinical Services
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {dept.services.map((svc, idx) => (
                      <li key={idx} className="truncate">{svc}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-700 flex items-center gap-2 mb-5">
                  <Clock size={16} className="text-primary" />
                  <span><strong className="font-semibold text-gray-900">Hours:</strong> {dept.hours}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <Link to="/doctors" className="text-sm font-bold text-secondary hover:text-secondary-dark transition-colors">
                  View Specialists &gt;
                </Link>
                <Link 
                  to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors"
                >
                  Book Clinic
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Departments;
