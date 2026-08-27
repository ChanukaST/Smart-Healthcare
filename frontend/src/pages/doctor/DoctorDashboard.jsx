import React from 'react';
import Navbar from '../../components/common/Navbar';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/dashboard/StatCard';
import PredictionCard from '../../components/dashboard/PredictionCard';
import { useAuth } from '../../hooks/useAuth';
import { Calendar, Users, FlaskConical, Star } from 'lucide-react';

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const rawName = user?.fullName || user?.name || 'Doctor';
  const displayName = rawName.startsWith('Dr.') ? rawName : `Dr. ${rawName.charAt(0).toUpperCase() + rawName.slice(1)}`;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        <Sidebar role="doctor" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-2">
              {getGreeting()}, {displayName}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 font-medium">OPD Schedule & Clinical Analytics Overview</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Today's Appointments" value="12" change="+2 vs yesterday" icon={<Calendar className="w-6 h-6" />} />
            <StatCard title="Patients Today" value="28" change="OPD Queue active" icon={<Users className="w-6 h-6" />} />
            <StatCard title="Pending Lab Results" value="8" change="Requires review" icon={<FlaskConical className="w-6 h-6" />} trend="down" />
            <StatCard title="Average Rating" value="4.8 / 5.0" change="98% positive sentiment" icon={<Star className="w-6 h-6" />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PredictionCard 
              title="Today's No-Show Predictions (ML Engine)" 
              riskLevel="MEDIUM" 
              confidence={0.91}
              details="Distribution: Low Risk (45%), Medium Risk (30%), High Risk (25%). 3 patients recommended for SMS reminder." 
            />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base font-bold text-gray-900">Patient Queue (OPD Cardiology)</h4>
                <button className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">View All</button>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-secondary-light/30 rounded-lg border border-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-gray-800">08:30 AM - Nimal Perera</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                    Checked-in
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-sm font-semibold text-gray-800">09:30 AM - Ravindu Silva</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
