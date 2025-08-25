import React from 'react';

const Impact: React.FC = () => {
  const stats = [
    { 
      number: '500+', 
      label: 'Students Helped', 
      description: 'Young people empowered through our programs',
      color: 'text-violet-600'
    },
    { 
      number: '150', 
      label: 'Scholarships Granted', 
      description: 'Educational opportunities funded',
      color: 'text-blue-600'
    },
    { 
      number: '75%', 
      label: 'Success Rate', 
      description: 'Of participants achieve their goals',
      color: 'text-emerald-600'
    },
    { 
      number: '25+', 
      label: 'Partner Organizations', 
      description: 'Collaborative relationships built',
      color: 'text-orange-600'
    }
  ];

  return (
    <section id="impact" className="py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.05),transparent_50%)]"></div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Measuring success through the lives we've touched and the futures we've transformed
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center p-6 rounded-2xl bg-white border border-gray-200/50 hover:border-gray-300/50 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:scale-105">
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-base font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 text-center">
            <blockquote className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed mb-8 tracking-tight">
              "Mauka didn't just give me a scholarship—they gave me hope, mentorship, and a community that believed in my potential."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">SC</span>
              </div>
              <div className="text-left">
                <cite className="text-base font-semibold text-gray-900 not-italic">
                  Sarah Chen
                </cite>
                <p className="text-sm text-gray-600">Program Graduate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;