// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500"></div>
      <p className="ml-4 text-lg text-gray-700 font-medium">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;