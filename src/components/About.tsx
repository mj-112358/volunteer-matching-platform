import React, { useEffect, useRef } from 'react';
import { Users, Target, Heart, Zap, Award, TrendingUp, Globe, Star } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
          {/* Left Content - Main Story */}
          <div className="lg:col-span-7 space-y-12 opacity-0 translate-y-20 transition-all duration-1000 delay-200 animate-in-trigger">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Our Journey
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                From Vision to
                <span className="block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  National Impact
                </span>
              </h2>
              
              <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                <p className="transform hover:scale-105 transition-transform duration-300 p-6 rounded-2xl hover:bg-white/50 hover:shadow-lg">
                  Since its inception, <strong className="text-orange-600">digital Mauka</strong> has seen remarkable growth, 
                  attracting <strong>200-300 volunteers</strong> and reaching over <strong>1,100 individuals</strong> through 
                  presentations and awareness campaigns. We earned recognition from organizations like the 
                  <strong className="text-orange-600"> Indian School of Leadership</strong>, led by Stanford graduates.
                </p>
              </div>
            </div>

            {/* How It Started Section */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                <Star className="w-8 h-8 text-orange-500 mr-3" />
                How It Started
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-orange-600 mb-2">$150</div>
                  <p className="text-gray-700">Zoom operations for weekly meetings with our 18-member team across various regions</p>
                </div>
                
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-orange-600 mb-2">$360</div>
                  <p className="text-gray-700">Digital marketing campaigns on Google and Meta to expand our NGO and volunteer network</p>
                </div>
                
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-orange-600 mb-2">$300</div>
                  <p className="text-gray-700">Website and app enhancements for improved functionality, security, and user experience</p>
                </div>
                
                <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-2xl font-bold text-orange-600 mb-2">$690</div>
                  <p className="text-gray-700">Expansion into Odisha, Chhattisgarh, Punjab, and Kashmir, building nationwide partnerships</p>
                </div>
              </div>
            </div>

            {/* Recognition Section */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                <Award className="w-8 h-8 text-orange-500 mr-3" />
                Recognition & Awards
              </h3>
              
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200/50 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">iVolunteer Youth Champion (Finalist)</h4>
                      <p className="text-gray-700">Founder Parth Jain was the youngest awardee at the IRA ceremony in Mumbai, recognized after a multi-round process including 30,000 poll votes.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200/50 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Pramerica Life Insurance Silver Medallion</h4>
                      <p className="text-gray-700">Selected as 1 of 25 out of 2,200+ social service projects across India. Parth Jain was the only Rajasthani awardee.</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/80 rounded-xl border border-orange-100/50 text-center hover:shadow-lg transition-all duration-300">
                    <div className="text-orange-600 font-bold">City Bhaskar</div>
                    <div className="text-sm text-gray-600">Newspaper Recognition</div>
                  </div>
                  <div className="p-4 bg-white/80 rounded-xl border border-orange-100/50 text-center hover:shadow-lg transition-all duration-300">
                    <div className="text-orange-600 font-bold">First India</div>
                    <div className="text-sm text-gray-600">Featured Article</div>
                  </div>
                  <div className="p-4 bg-white/80 rounded-xl border border-orange-100/50 text-center hover:shadow-lg transition-all duration-300">
                    <div className="text-orange-600 font-bold">JPIS Winner</div>
                    <div className="text-sm text-gray-600">Best Initiative 2022-23</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Impact Stats & Values */}
          <div ref={cardsRef} className="lg:col-span-5">
            <div className="space-y-8">
              {/* Growth Stats */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-orange-50/80 backdrop-blur-sm border border-orange-100/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform opacity-0 translate-x-20 animate-card-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 mr-3" />
                  Our Growth
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">NGO Network</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-orange-600">45</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-3xl font-bold text-orange-600">78</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Volunteers</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-orange-600">1,100</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-3xl font-bold text-orange-600">3,000</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Service Hours</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-orange-600">3,500</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-3xl font-bold text-orange-600">7,200</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-4">
                <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Community First</h3>
                      <p className="text-gray-600">Building stronger connections</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Impact Driven</h3>
                      <p className="text-gray-600">Measurable positive change</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Globe className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Nationwide Reach</h3>
                      <p className="text-gray-600">Expanding across India</p>
                    </div>
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