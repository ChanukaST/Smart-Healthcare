import React from 'react';

export const StatCard = ({ title, value, change, trend = 'up', icon }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <div className="text-sm text-gray-500 font-semibold mb-1 uppercase tracking-wider">{title}</div>
      <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">{value}</div>
      {change && (
        <div className={`text-xs font-bold mt-1 ${trend === 'up' ? 'text-primary' : 'text-red-500'}`}>
          {change}
        </div>
      )}
    </div>
    {icon && (
      <div className="p-3 bg-secondary-light text-secondary rounded-xl flex items-center justify-center">
        {icon}
      </div>
    )}
  </div>
);

export default StatCard;
