import React from 'react';

export const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-auto py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-sm text-gray-500 font-medium">
        © {new Date().getFullYear()} Smart Sri Lankan Healthcare Management & Analytics Platform. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
