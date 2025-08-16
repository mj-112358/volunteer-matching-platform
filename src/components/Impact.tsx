import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';

const Impact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  const stats = [
    { 
      number: 500, 
      suffix: '+',
      label: 'Students Helped', 
      description: 'Young people empowered through our programs',
      color: 'text-orange-600',
      delay: 'animate-stat-1'
    },
    { 
      number: 150, 
      suffix: '',
      label: 'Scholarships Granted', 
      description: 'Educational opportunities funded',
      color: 'text-orange-700',
      delay: 'animate-stat-2'
    },
    { 
      number: 75, 
      suffix: '%',
      label: 'Success Rate', 
      description: 'Of participants achieve their goals',
      color: 'text-orange-600',
      delay: 'animate-stat-3'
    },
    { 
      number: 25, 
      suffix: '+',
      label: 'Partner Organizations', 
      description: 'Collaborative relationships built',
      color: 'text-orange-700',
      delay: 'animate-stat-4'
    }
  ];

  const [displayNumbers, setDisplayNumbers] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            entry.target.classList.add('animate-in');
            
            // Animate counters
            stats.forEach((stat, index) => {
              let current = 0;
              const increment = stat.number / 100;
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.number) {
                  current = stat.number;
                  clearInterval(timer);
                }
                setDisplayNumbers(prev => {
                  const newNumbers = [...prev];
                  newNumbers[index] = Math.floor(current);
                  return newNumbers;
                });
              }, 20);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  return (
    <section id="impact" ref={sectionRef} className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/40 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-orange-300/30 to-transparent rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 translate-y-20 transition-all duration-1000 animate-in-trigger">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-medium mb-6 shadow-lg shadow-orange-500/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            Measuring Success
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Measuring success through the lives we've touched and the futures we've transformed
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className={`group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-110 transform opacity-0 translate-y-20 ${stat.delay}`}>
              <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {displayNumbers[index]}{stat.suffix}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {stat.label}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="max-w-5xl mx-auto opacity-0 translate-y-20 transition-all duration-1000 delay-500 animate-in-trigger">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 text-center shadow-2xl shadow-orange-500/10 hover:scale-105 transition-all duration-500">
            <blockquote className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed mb-8 tracking-tight">
              "Mauka didn't just give me a scholarship—they gave me hope, mentorship, and a community that believed in my potential."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-lg font-bold">SC</span>
              </div>
              <div className="text-left">
                <cite className="text-lg font-bold text-gray-900 not-italic">
                  Sarah Chen
                </cite>
                <p className="text-orange-600 font-medium">Program Graduate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;