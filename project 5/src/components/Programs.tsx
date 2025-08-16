import React from 'react';
import { GraduationCap, Briefcase, Users, BookOpen, ArrowUpRight } from 'lucide-react';

const Programs: React.FC = () => {
  const programs = [
    {
      icon: GraduationCap,
      title: 'Education Access',
      description: 'Scholarships and academic support to help students pursue higher education.',
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-50',
      borderColor: 'border-violet-200/50 hover:border-violet-300/50'
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Professional mentorship and job placement assistance for career success.',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200/50 hover:border-blue-300/50'
    },
    {
      icon: Users,
      title: 'Leadership Training',
      description: 'Comprehensive programs developing leadership skills for community impact.',
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200/50 hover:border-emerald-300/50'
    },
    {
      icon: BookOpen,
      title: 'Skill Building',
      description: 'Workshops in technology, entrepreneurship, and essential life skills.',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200/50 hover:border-orange-300/50'
    }
  ];

  return (
    <section id="programs" className="py-32 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive initiatives designed to create lasting impact and open doors to success
          </p>
        </div>
        
        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className={`group p-8 rounded-3xl bg-gradient-to-br ${program.bgGradient} border ${program.borderColor} hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {program.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  <span className="text-sm font-medium mr-2">Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;