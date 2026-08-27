import React from 'react';

export const PredictionCard = ({ title, riskLevel, confidence, details }) => {
  const getBadgeClass = (risk) => {
    if (risk === 'HIGH' || risk === 'HIGH_RISK') return 'bg-red-100 text-red-800 border-red-200';
    if (risk === 'MEDIUM' || risk === 'MODERATE_RISK') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (risk === 'NEW_PATIENT') return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-secondary p-5">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-base font-bold text-gray-900">{title}</h4>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeClass(riskLevel)}`}>
          {riskLevel}
        </span>
      </div>
      <p className="text-sm text-gray-600">{details}</p>
      {confidence && (
        <div className="mt-3 text-xs text-gray-500">
          Model Confidence Score: <strong className="text-gray-700">{(confidence * 100).toFixed(0)}%</strong>
        </div>
      )}
    </div>
  );
};

export default PredictionCard;
