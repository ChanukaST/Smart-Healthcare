import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <header className="bg-secondary-light py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-primary-dark tracking-tight mb-6">
              Compassionate Care, <br className="hidden sm:block" />
              <span className="text-secondary">Better Health</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Advanced healthcare services powered by intelligent analytics and expert Sri Lankan medical specialists. Providing enterprise-grade care for you and your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={isAuthenticated ? "/patient/book-appointment" : "/login"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-md transition-all duration-200"
              >
                Book Appointment
              </Link>
              <Link
                to="/doctors"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
              >
                Our Doctors
              </Link>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-4xl font-extrabold text-primary mb-2">50+</h2>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Specialist Doctors</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-4xl font-extrabold text-secondary mb-2">24/7</h2>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Emergency Support</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-4xl font-extrabold text-primary mb-2">10+</h2>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Specialized Depts</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-4xl font-extrabold text-secondary mb-2">100k+</h2>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Patients Served</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
