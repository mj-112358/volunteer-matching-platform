import React from 'react';
import { Heart, Users, ArrowRight } from 'lucide-react';

const GetInvolved: React.FC = () => {
  return (
    <section id="get-involved" className="py-32 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Get Involved
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join us in creating opportunities and making a lasting difference in young people's lives
          </p>
        </div>
        
        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 hover:scale-[1.02] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Volunteer
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              Share your skills, time, and passion to mentor young people and help them discover their potential.
            </p>
            
            <button className="group/btn inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Start Volunteering
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
          
          <div className="group p-8 rounded-3xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/50 hover:border-violet-300/50 hover:shadow-xl hover:shadow-violet-200/50 transition-all duration-300 hover:scale-[1.02] text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Donate
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              Your contribution directly funds scholarships, programs, and resources that transform lives.
            </p>
            
            <button className="group/btn inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Make a Donation
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Have questions or want to learn more about our work?
          </p>
          <button className="group inline-flex items-center text-violet-600 hover:text-violet-700 font-semibold text-lg transition-colors duration-200">
            Contact Us
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;