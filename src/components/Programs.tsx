import React, { useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Users, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';

const Programs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      icon: GraduationCap,
      title: 'Education Access',
      description: 'Scholarships and academic support to help students pursue higher education and unlock their potential.',
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100/50',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-1'
    },
    {
      icon: Briefcase,
      title: 'Career Development',
      description: 'Professional mentorship and job placement assistance for sustainable career success.',
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-100/50 to-orange-50',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-2'
    },
    {
      icon: Users,
      title: 'Leadership Training',
      description: 'Comprehensive programs developing leadership skills for meaningful community impact.',
      gradient: 'from-orange-600 to-orange-800',
      bgGradient: 'from-orange-50 to-orange-100/50',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-3'
    },
    {
      icon: BookOpen,
      title: 'Skill Building',
      description: 'Workshops in technology, entrepreneurship, and essential life skills for the modern world.',
      gradient: 'from-orange-500 to-orange-700',
      bgGradient: 'from-orange-100/50 to-orange-50',
      borderColor: 'border-orange-200/50 hover:border-orange-300',
      delay: 'animate-program-4'
    }
  ];

  return (
    <section id="programs" ref={sectionRef} className="py-32 bg-gradient-to-b from-orange-50 to-orange-25 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-200/30 to-orange-300/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-orange-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 translate-y-20 transition-all duration-1000 animate-in-trigger">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-medium mb-6 shadow-lg shadow-orange-500/10">
            <Sparkles className="w-4 h-4 mr-2 animate-spin-slow" />
            What We Offer
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Our Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive initiatives designed to create lasting impact and open doors to success
          </p>
        </div>
        
        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className={`group p-10 rounded-3xl bg-gradient-to-br ${program.bgGradient} border ${program.borderColor} hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 cursor-pointer transform opacity-0 translate-y-20 ${program.delay}`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/20`}>
                <program.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {program.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {program.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors duration-200 pt-4">
                  <span className="text-base font-semibold mr-3">Learn More</span>
                  <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-300" />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;