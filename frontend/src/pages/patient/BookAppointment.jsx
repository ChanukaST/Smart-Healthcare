import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircle2, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export const BookAppointment = () => {
  const navigate = useNavigate();
  const { user, addAppointment } = useAuth();
  
  const [department, setDepartment] = useState('Cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState({
    name: 'Dr. Anura Perera',
    department: 'Cardiology',
    spec: 'Consultant Cardiologist',
    room: 'Room 101 (OPD Block A)',
    fee: 'LKR 2,500.00'
  });

  // Calendar State
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed (May = 4 or today's month)
  
  // Default selected date to 2 days ahead
  const defaultSelectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  const [selectedDateObj, setSelectedDateObj] = useState(defaultSelectedDate);
  const [selectedSlot, setSelectedSlot] = useState('09:30 AM');
  const [successMsg, setSuccessMsg] = useState('');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const doctorsList = [
    { name: 'Dr. Anura Perera', department: 'Cardiology', spec: 'Consultant Cardiologist', room: 'Room 101 (OPD Block A)', fee: 'LKR 2,500.00' },
    { name: 'Dr. Sumudu Bandara', department: 'Pediatrics', spec: 'Consultant Pediatrician', room: 'Room 105 (Children Wing)', fee: 'LKR 2,200.00' },
    { name: 'Dr. K. L. Wickramasinghe', department: 'General Medicine', spec: 'Consultant Physician', room: 'Room 108 (General OPD)', fee: 'LKR 2,000.00' },
    { name: 'Dr. Priyadarshani Silva', department: 'Dermatology', spec: 'Consultant Dermatologist', room: 'Room 112 (Skin Clinic)', fee: 'LKR 2,400.00' }
  ];

  // Calendar calculations
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon, ...

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (dayNumber) => {
    const clickedDate = new Date(currentYear, currentMonth, dayNumber);
    setSelectedDateObj(clickedDate);
  };

  const formattedSelectedDate = selectedDateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const fullDateDisplay = selectedDateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleNativeDateChange = (e) => {
    if (!e.target.value) return;
    const parts = e.target.value.split('-');
    const picked = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    setSelectedDateObj(picked);
    setCurrentYear(picked.getFullYear());
    setCurrentMonth(picked.getMonth());
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const tokenNum = `${selectedDoctor.department.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newApt = {
      id: `APT-${Date.now()}`,
      date: formattedSelectedDate,
      time: selectedSlot,
      doctor: selectedDoctor.name,
      department: selectedDoctor.department,
      room: selectedDoctor.room,
      token: tokenNum,
      status: 'CONFIRMED'
    };

    addAppointment(newApt);
    setSuccessMsg(`Appointment confirmed for ${formattedSelectedDate} at ${selectedSlot} with ${selectedDoctor.name} (Queue Token: ${tokenNum}).`);
    setTimeout(() => {
      navigate('/patient/my-appointments');
    }, 1600);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar role="patient" />
        <main className="page-container" style={{ flex: 1, padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-blue)', margin: 0 }}>
              Book an Appointment
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Booking for patient: <strong>{user?.fullName || user?.name || 'Patient'}</strong> (NIC: {user?.nicPassport || '199824510982'})
            </p>
          </div>
          
          <div className="card" style={{ maxWidth: '850px' }}>
            {successMsg ? (
              <div style={{ padding: '2.5rem', textAlign: 'center', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #86efac' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', color: '#166534' }}>
                  <CheckCircle2 size={48} />
                </div>
                <h3 style={{ color: '#166534', fontWeight: '800', fontSize: '1.3rem' }}>Booking Confirmed!</h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-dark)', fontSize: '0.95rem' }}>{successMsg}</p>
                <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Redirecting to your appointments schedule...
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                
                {/* 1. Select Department */}
                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    1. Select Medical Department
                  </label>
                  <select 
                    value={department} 
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      const match = doctorsList.find(d => d.department === e.target.value) || doctorsList[0];
                      setSelectedDoctor(match);
                    }}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                  >
                    <option value="Cardiology">Cardiology & Heart Care</option>
                    <option value="Pediatrics">Pediatrics & Child Wellness</option>
                    <option value="General Medicine">General Medicine (OPD)</option>
                    <option value="Dermatology">Dermatology & Skin Clinic</option>
                  </select>
                </div>

                {/* 2. Select Doctor */}
                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    2. Choose Consultant Specialist
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0.75rem' }}>
                    {doctorsList.filter(d => d.department === department).map((doc) => (
                      <div 
                        key={doc.name}
                        onClick={() => setSelectedDoctor(doc)}
                        style={{
                          padding: '1rem',
                          borderRadius: '8px',
                          border: `2px solid ${selectedDoctor.name === doc.name ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                          backgroundColor: selectedDoctor.name === doc.name ? 'var(--secondary-teal-light)' : 'transparent',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--primary-blue)' }}>{doc.name}</strong>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            {doc.spec} • {doc.room}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span className="badge badge-success" style={{ fontSize: '0.72rem' }}>Available</span>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-dark)', marginTop: '0.2rem' }}>
                            {doc.fee}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Interactive Calendar Date Picker */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <label style={{ fontWeight: '700', fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CalendarIcon size={16} color="var(--primary-blue)" /> 3. Select Consultation Date
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick Picker:</span>
                      <input 
                        type="date" 
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleNativeDateChange}
                        style={{ padding: '0.35rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.85rem', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  {/* Calendar Widget Container */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    boxShadow: 'var(--shadow-sm)',
                    maxWidth: '480px'
                  }}>
                    {/* Calendar Month/Year Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="btn btn-outline"
                        style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-blue)' }}>
                        {monthNames[currentMonth]} {currentYear}
                      </div>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="btn btn-outline"
                        style={{ padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Day-of-Week Names */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem'
                    }}>
                      <div>Su</div>
                      <div>Mo</div>
                      <div>Tu</div>
                      <div>We</div>
                      <div>Th</div>
                      <div>Fr</div>
                      <div>Sa</div>
                    </div>

                    {/* Days Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gap: '4px',
                      textAlign: 'center'
                    }}>
                      {/* Empty padding cells */}
                      {Array.from({ length: firstDayIndex }).map((_, i) => (
                        <div key={`empty-${i}`} style={{ height: '36px' }} />
                      ))}

                      {/* Day Cells */}
                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const dayNumber = idx + 1;
                        const thisDate = new Date(currentYear, currentMonth, dayNumber);
                        const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        const isSelected = 
                          selectedDateObj.getDate() === dayNumber &&
                          selectedDateObj.getMonth() === currentMonth &&
                          selectedDateObj.getFullYear() === currentYear;
                        const isToday = 
                          today.getDate() === dayNumber &&
                          today.getMonth() === currentMonth &&
                          today.getFullYear() === currentYear;

                        return (
                          <button
                            key={`day-${dayNumber}`}
                            type="button"
                            disabled={isPast}
                            onClick={() => handleDateClick(dayNumber)}
                            style={{
                              height: '36px',
                              borderRadius: '8px',
                              border: isToday && !isSelected ? '1px solid var(--primary-blue)' : 'none',
                              backgroundColor: isSelected ? 'var(--primary-blue)' : 'transparent',
                              color: isSelected ? '#ffffff' : isPast ? '#cbd5e1' : 'var(--text-dark)',
                              fontWeight: isSelected ? '800' : '600',
                              fontSize: '0.88rem',
                              cursor: isPast ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Date Summary Callout */}
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--secondary-teal-light)',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    color: 'var(--text-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <CalendarIcon size={16} color="var(--secondary-teal)" />
                    <span>Selected Date: <strong>{fullDateDisplay}</strong></span>
                  </div>
                </div>

                {/* 4. Select Time Slot */}
                <div>
                  <label style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Clock size={16} color="var(--primary-blue)" /> 4. Choose Available Consultation Slot
                  </label>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`btn ${selectedSlot === slot ? 'btn-primary' : 'btn-outline'}`}
                        style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <Clock size={13} /> {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <button type="button" onClick={() => navigate('/patient/dashboard')} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontWeight: '700' }}>
                    Confirm & Book Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookAppointment;
