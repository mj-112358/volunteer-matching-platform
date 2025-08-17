import React from 'react';
import { Mail, User, Briefcase } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

const Contact: React.FC = () => {
  const teamMembers = [
    {
      name: 'Aadarsh Tripathy',
      role: 'Head of Mauka',
      email: 'atripathy@jpischool.com',
      grade: '12F'
    },
    {
      name: 'Arsh Choudhary',
      role: 'Head of Mauka',
      email: 'arshchoudhary009@gmail.com'
    },
    {
      name: 'Siddharth Sharma',
      role: 'Head of Operations',
      email: 'ssharma28@jpischool.com'
    },
    {
      name: 'Yashvi Singh',
      role: 'Head of Operations',
      email: 'ysingh4@jpischool.com'
    },
    {
      name: 'Mrityunjay Gupta',
      role: 'Head of Technology',
      email: 'mgupta1@jpischool.com'
    },
    {
      name: 'Veer Gupta',
      role: 'Head of Technology',
      email: 'vgupta15@jpischool.com'
    },
    {
      name: 'Aarush Gupta',
      role: 'Head of Finance',
      email: 'agupta41@jpischool.com'
    },
    {
      name: 'Vivaan Patni',
      role: 'Head of Outreach',
      email: 'vpatni@jpischool.com'
    },
    {
      name: 'Deeva Choudhary',
      role: 'Head of Outreach',
      email: 'dchoudhary2@jpischool.com'
    },
    {
      name: 'Aahvana Kapuria',
      role: 'Head of Outreach',
      email: 'akapuria@jpischool.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <section id="contact" className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden pt-32">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with the passionate leaders driving Mauka's mission across India
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 transform">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <User className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="flex items-center justify-center text-orange-600 mb-3">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{member.role}</span>
                  </div>
                  
                  {member.grade && (
                    <p className="text-sm text-gray-500 mb-3">Grade: {member.grade}</p>
                  )}
                  
                  <a 
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-300 text-sm"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-20">
            <div className="p-12 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-200/50 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Make a Difference?
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whether you're a student looking to volunteer, an NGO seeking support, or someone who wants to contribute to our mission, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#volunteer-matching"
                  onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); setTimeout(() => { const element = document.getElementById('volunteer-matching'); if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start Volunteering
                </a>
                <a 
                  href="#volunteer-matching"
                  onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload(); setTimeout(() => { const element = document.getElementById('volunteer-matching'); if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }}
                  className="bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Partner with Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;