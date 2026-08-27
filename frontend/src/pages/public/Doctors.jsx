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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <header className="bg-secondary-light py-14 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-3">
            Our Specialist Doctors
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Meet our team of renowned Sri Lankan medical consultants, surgeons, and healthcare specialists.
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto flex shadow-sm rounded-lg overflow-hidden border border-gray-300 bg-white">
            <div className="px-4 py-3 bg-gray-50 border-r border-gray-300 flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by doctor name, medical specialty, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-700 text-sm placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:border-primary transition-shadow"
            />
          </div>
        </div>
      </header>

      {/* Department Filter Chips */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 shadow-sm ${
                selectedDept === dept
                  ? 'bg-primary text-white border-transparent shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {dept === 'ALL' ? 'All Specialties' : dept}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary-light text-secondary flex items-center justify-center">
                    <User size={24} />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${doc.status === 'Available' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}`}>
                    {doc.status}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-primary-dark mb-1">
                  {doc.name}
                </h3>
                <div className="text-sm font-bold text-secondary mb-1">
                  {doc.department} • {doc.specialization}
                </div>
                <div className="text-xs text-gray-500 mb-4 font-medium line-clamp-1">
                  {doc.qualifications}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-2 mb-5 border border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin size={16} className="text-primary" />
                    <span><strong className="text-gray-900 font-semibold">Clinic:</strong> {doc.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock size={16} className="text-primary" />
                    <span><strong className="text-gray-900 font-semibold">Hours:</strong> {doc.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span><strong className="text-gray-900 font-semibold">Rating:</strong> {doc.rating} / 5.0 ({doc.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div>
                  <div className="text-[0.7rem] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Consultation Fee</div>
                  <div className="text-lg font-extrabold text-gray-900">{doc.fee}</div>
                </div>
                <Link 
                  to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No doctors found matching "{searchTerm}"</h3>
            <p className="text-gray-500">Try searching for a different specialty or clearing your department filter.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Doctors;
