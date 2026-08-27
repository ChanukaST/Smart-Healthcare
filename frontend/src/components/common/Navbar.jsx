import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Activity } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ROLE_DOCTOR' || user.role === 'DOCTOR') return '/doctor/dashboard';
    if (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN') return '/admin/dashboard';
    return '/patient/dashboard';
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={user ? getDashboardPath() : "/"} className="flex items-center gap-2 text-2xl font-extrabold text-primary-dark hover:text-primary transition-colors">
              <Activity className="h-8 w-8 text-secondary" />
              <span>CarePlus</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-8 items-center font-medium text-sm text-gray-700">
            <Link to="/" className="hover:text-primary-dark transition-colors">Home</Link>
            <Link to="/doctors" className="hover:text-primary-dark transition-colors">Doctors</Link>
            <Link to="/departments" className="hover:text-primary-dark transition-colors">Departments</Link>
            <Link to="/international-patients" className="hover:text-primary-dark transition-colors">International Patients</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-500">Welcome, <strong className="text-gray-900">{user.name || user.fullName || 'User'}</strong></span>
                <Link to={getDashboardPath()} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors">
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
            <Link to="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Doctors</Link>
            <Link to="/departments" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Departments</Link>
            <Link to="/international-patients" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">International Patients</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-5 space-y-3">
                <div className="text-base font-medium text-gray-800">Welcome, {user.name || user.fullName || 'User'}</div>
                <Link to={getDashboardPath()} className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full text-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5">
                <Link to="/login" className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
