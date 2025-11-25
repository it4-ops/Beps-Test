import React from 'react';
import { Activity, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">RetailPulse AI</h1>
              <p className="text-xs text-gray-500 font-medium">National Review Intelligence</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-blue-500" />
              Copertura Nazionale
            </span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};