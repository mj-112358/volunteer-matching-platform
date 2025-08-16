import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-violet-50 border border-violet-200/50 text-violet-700 text-sm font-medium">
            <span className="w-2 h-2 bg-violet-500 rounded-full mr-2 animate-pulse"></span>
            Creating opportunities for youth
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[0.9] tracking-tight">
            Everyone deserves a{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Mauka
            </span>
            .
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Creating access, impact and equity—one opportunity at a time.
          </p>
          
          {/* CTA */}
          <div className="pt-4">
            <button className="group inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md">
              Get Involved
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;