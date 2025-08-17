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
    <section id="impact" ref={sectionRef} className="py-12 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/40 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-orange-300/30 to-transparent rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 opacity-0 translate-y-20 transition-all duration-1000 animate-in-trigger">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-medium mb-6 shadow-lg shadow-orange-500/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            Measuring Success
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Measuring
            <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Real Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every number tells a story. Every story changes a life. Every life transforms a community.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="group text-center p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
              3,000+
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              Active Volunteers
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Students creating change across India
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
              7,200
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              Service Hours
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hours of dedicated community service
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
              78
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              Partner NGOs
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Organizations we collaborate with
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-3">
              25+
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              Cities Reached
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Communities transformed nationwide
            </p>
          </div>
        </div>

        {/* Impact Story */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 shadow-2xl shadow-orange-500/10">
            <blockquote className="text-2xl md:text-3xl text-gray-800 font-light leading-relaxed mb-8 tracking-tight italic">
              "The real impact isn't in our numbers — it's in the spark we see in a child's eyes when they realize someone believes in them. It's in the confidence of a volunteer who discovers they can actually change the world. It's in the ripple effect that starts with one mauka and spreads infinitely outward."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-lg font-bold">PJ</span>
              </div>
              <div className="text-left">
                <cite className="text-lg font-bold text-gray-900 not-italic">
                  Parth Jain
                </cite>
                <p className="text-sm text-orange-600 font-medium">Founder, Mauka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;