import React from 'react';
import { Users, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                Empowering the next generation through
                <span className="block text-violet-600">meaningful opportunities</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Mauka connects underserved youth with transformative opportunities in education, 
                  career development, and personal growth. We believe every young person deserves 
                  the chance to reach their full potential.
                </p>
                
                <p>
                  Through mentorship, scholarships, and skill-building programs, we're creating 
                  pathways to success for the next generation of leaders.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Stats Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-6">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100/50 hover:border-violet-200/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center group-hover:bg-violet-200 transition-colors duration-300">
                    <Users className="w-6 h-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Community First</h3>
                    <p className="text-sm text-gray-600">Building stronger connections</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 hover:border-blue-200/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Impact Driven</h3>
                    <p className="text-sm text-gray-600">Measurable positive change</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100/50 hover:border-emerald-200/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors duration-300">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Purpose Led</h3>
                    <p className="text-sm text-gray-600">Equity and access focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;