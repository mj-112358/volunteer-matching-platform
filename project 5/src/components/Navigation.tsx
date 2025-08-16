import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 tracking-tight">Mauka</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
              About
            </a>
            <a href="#programs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Programs
            </a>
            <a href="#volunteer-matching" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
              AI Matching
            </a>
            <a href="#impact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Impact
            </a>
            <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105">
              Get Involved
            </button>
          </div>

          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;