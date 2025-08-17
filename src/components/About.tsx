import React, { useEffect, useRef } from 'react';
import { Users, Target, Heart, Zap, Award, TrendingUp, Globe, Star, Sparkles, ArrowRight } from 'lucide-react';

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
    <section id="about" className="py-24 bg-gradient-to-b from-white via-orange-25/20 to-orange-50/40 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-orange-200/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-orange-300/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/8 to-amber-100/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Content - Story */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-10">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100/80 to-amber-100/60 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-semibold shadow-lg shadow-orange-500/10">
                <Zap className="w-4 h-4 mr-2" />
                The Revolution
              </div>
              
              <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter">
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Empowering Youth Through Service
                </span>
              </h2>
              
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <div className="text-3xl font-black text-gray-900 leading-tight">
                  Mauka didn't start in a boardroom. It started in frustration.
                </div>
                
                <div className="text-xl leading-relaxed font-light">
                  Picture this: thousands of students burning with the desire to serve, and thousands of NGOs desperately needing help. Yet they existed in parallel universes, never meeting. The bridge didn't exist.
                </div>
                
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  So we became the bridge.
                </div>
                
                <div className="p-8 bg-gradient-to-r from-orange-50/80 to-amber-50/60 rounded-3xl border border-orange-200/30 backdrop-blur-sm shadow-lg shadow-orange-500/5">
                  <div className="text-xl font-bold text-orange-800 mb-6">In just a few months, we've achieved the impossible:</div>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-white/70 rounded-2xl border border-orange-100/50">
                      <div className="text-3xl font-black text-orange-600">3,000+</div>
                      <div className="text-sm text-gray-700 font-semibold">Volunteers</div>
                    </div>
                    <div className="p-4 bg-white/70 rounded-2xl border border-orange-100/50">
                      <div className="text-3xl font-black text-orange-600">7,200</div>
                      <div className="text-sm text-gray-700 font-semibold">Service Hours</div>
                    </div>
                    <div className="p-4 bg-white/70 rounded-2xl border border-orange-100/50">
                      <div className="text-3xl font-black text-orange-600">78</div>
                      <div className="text-sm text-gray-700 font-semibold">Partner NGOs</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xl leading-relaxed font-light">
                  But numbers are just the beginning. The real magic happens when a quiet teenager discovers their voice mentoring younger children. When a science enthusiast runs her first experiment with kids who've never seen a lab.
                </div>
                
                <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  That is the power of a mauka — a chance.
                </div>
                
                <div className="text-2xl font-bold text-gray-900">
                  Young people aren't the leaders of tomorrow. They are leaders today.
                </div>
                
                <div className="text-xl leading-relaxed font-light">
                  We're not counting hours for certificates. We're building stories. We're connecting souls who would never have met otherwise. We're proving that the smallest idea in the right hands can ripple outward into unstoppable change.
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6 p-8 bg-gradient-to-br from-white/90 to-orange-50/60 rounded-3xl border border-orange-200/30 backdrop-blur-sm shadow-lg shadow-orange-500/5">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Target className="w-7 h-7 text-orange-500 mr-3" />
                  Our Mission
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  To create a culture where every young person sees service not as an obligation, but as an opportunity — an opportunity to grow, to lead, and to transform someone else's life while transforming their own.
                </p>
              </div>

              <div className="space-y-6 p-8 bg-gradient-to-br from-white/90 to-amber-50/60 rounded-3xl border border-amber-200/30 backdrop-blur-sm shadow-lg shadow-amber-500/5">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Star className="w-7 h-7 text-amber-500 mr-3" />
                  Our Vision
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  We imagine a future where service is as natural as breathing — where every student graduates not only with grades, but with stories of lives they've touched.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Values Cards */}
          <div ref={cardsRef} className="lg:col-span-5">
            <div className="space-y-6">
              <div className="group p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-1">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/10">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Youth-Driven</h3>
                    <p className="text-gray-600 text-lg">We don't wait for permission. We lead now.</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-2">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/10">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Equity Focused</h3>
                    <p className="text-gray-600 text-lg">Every NGO, every child, every volunteer matters.</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-3">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/10">
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Sustainable Impact</h3>
                    <p className="text-gray-600 text-lg">Service should build something that lasts.</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 transform opacity-0 translate-x-20 animate-card-3 cursor-pointer">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Ready to Lead?</h3>
                  <p className="text-orange-100">Join thousands of students creating change across India</p>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('volunteer-matching');
                      if (element) {
                        const offset = 80;
                        const elementPosition = element.offsetTop - offset;
                        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 hover:scale-105"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
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