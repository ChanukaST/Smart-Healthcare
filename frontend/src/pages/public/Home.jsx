import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Navbar />
      <header style={{
        backgroundColor: 'var(--secondary-teal-light)',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
            Compassionate Care, Better Health
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Advanced healthcare services powered by intelligent analytics and expert Sri Lankan medical specialists.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link 
              to={isAuthenticated ? "/patient/book-appointment" : "/login"} 
              className="btn btn-primary" 
              style={{ padding: '0.8rem 2rem' }}
            >
              Book Appointment
            </Link>
            <Link to="/doctors" className="btn btn-outline" style={{ padding: '0.8rem 2rem' }}>
              Our Doctors
            </Link>
          </div>
        </div>
      </header>

      <section className="page-container" style={{ marginTop: '3rem' }}>
        <div className="grid-cols-4" style={{ textAlign: 'center' }}>
          <div className="card">
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-blue)', fontWeight: '800' }}>50+</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Specialist Doctors</p>
          </div>
          <div className="card">
            <h2 style={{ fontSize: '2rem', color: 'var(--secondary-teal)', fontWeight: '800' }}>24/7</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Emergency Support</p>
          </div>
          <div className="card">
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-blue)', fontWeight: '800' }}>10+</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Specialized Departments</p>
          </div>
          <div className="card">
            <h2 style={{ fontSize: '2rem', color: 'var(--secondary-teal)', fontWeight: '800' }}>100k+</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Patients Served</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
