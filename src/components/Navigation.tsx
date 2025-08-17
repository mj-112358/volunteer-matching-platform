import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-orange-100/50 shadow-lg shadow-orange-500/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center group">
            <div className="w-16 h-16 mr-3 overflow-hidden rounded-full transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
              <img 
                src="/op-image.jpg" 
                alt="Mauka Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105">
              About
            </a>
            <a href="#programs" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105">
              Programs
            </a>
            <a href="#impact" className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105">
              Impact
            </a>
            <a href="#volunteer-matching" className="text-sm font-medium text-violet-700 hover:text-violet-900 transition-all duration-300 hover:scale-105">
              AI Matching
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'contact';
                window.location.reload();
              }}
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 hover:scale-105"
            >
              Contact
            </a>
            <a 
              href="#donate"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = 'donate';
                window.location.reload();
              }}
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transform"
            >
              <span className="group-hover:scale-105 transition-transform duration-200 inline-block">
                Donate
              </span>
            </a>
          </div>

          <button className="md:hidden p-2 hover:bg-orange-50 rounded-lg transition-all duration-200">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;