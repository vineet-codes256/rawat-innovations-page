import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-blue-600 font-semibold">Loading Rawat Innovations...</p>
      </div>
    </div>
  );
}
