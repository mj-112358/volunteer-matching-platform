import React, { useEffect, useRef } from 'react';
import { Users, Target, Heart, Zap, Award, TrendingUp, Globe, Star, Sparkles } from 'lucide-react';

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
    <section id="about" className="py-16 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/5 to-amber-100/3 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Content - Main Story */}
          <div className="lg:col-span-7 space-y-8 opacity-0 translate-y-20 transition-all duration-1000 delay-200 animate-in-trigger">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-medium shadow-lg shadow-orange-500/10">
                <Zap className="w-4 h-4 mr-2" />
                Our Story
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                The Revolution
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Started Here
                </span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <div className="text-xl font-bold text-gray-900 leading-relaxed">
                  Mauka began with a simple frustration: too many students wanted to serve, and too many NGOs needed help, but the bridge between them didn't exist. So we built it.
                </div>
                
                <div className="text-lg leading-relaxed">
                  What started as a student-led initiative inside JPIS has exploded into something extraordinary. Today, Mauka stands as one of the largest student-driven volunteering networks in India, connecting thousands of passionate young people to NGOs working in education, healthcare, sustainability, arts, and beyond.
                </div>
                
                <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/50 backdrop-blur-sm">
                  <div className="text-lg font-bold text-orange-800 mb-3">In just a few months, we've achieved the impossible:</div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white/60 rounded-xl">
                      <div className="text-2xl font-black text-orange-600">3,000+</div>
                      <div className="text-sm text-gray-700 font-medium">Volunteers</div>
                    </div>
                    <div className="p-3 bg-white/60 rounded-xl">
                      <div className="text-2xl font-black text-orange-600">7,200</div>
                      <div className="text-sm text-gray-700 font-medium">Service Hours</div>
                    </div>
                    <div className="p-3 bg-white/60 rounded-xl">
                      <div className="text-2xl font-black text-orange-600">78</div>
                      <div className="text-sm text-gray-700 font-medium">Partner NGOs</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-lg leading-relaxed">
                  But numbers are just the beginning. The real magic happens in the classroom where a child learns to read because a Mauka volunteer sat with her every evening. It lives in the confidence of a volunteer who realized their voice could actually change someone's day. It thrives in the messy, imperfect, but deeply human conversations that happen when students and communities collide.
                </div>
                
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  We're not counting hours for certificates. We're building stories. We're connecting souls who would never have met otherwise. We're proving that the smallest idea in the right hands can ripple outward into unstoppable change.
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="space-y-4 p-6 bg-gradient-to-br from-white/80 to-orange-50/60 rounded-2xl border border-orange-200/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Target className="w-6 h-6 text-orange-500 mr-3" />
                Our Mission
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                To create a culture where every young person sees service not as an obligation, but as an opportunity — an opportunity to grow, to lead, and to transform someone else's life while transforming their own.
              </p>
            </div>

            {/* Vision Section */}
            <div className="space-y-4 p-6 bg-gradient-to-br from-white/80 to-amber-50/60 rounded-2xl border border-amber-200/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 text-amber-500 mr-3" />
                Our Vision
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                We imagine a future where service is as natural as breathing — where every student graduates not only with grades, but with stories of lives they've touched. A future where every NGO, no matter how small, has access to the boundless energy, fresh ideas, and unwavering commitment of youth volunteers.
              </p>
            </div>
          </div>
          
          {/* Right Content - Values Cards */}
          <div ref={cardsRef} className="lg:col-span-5">
            <div className="space-y-4">
              {/* Values Cards */}
              <div className="space-y-4">
                <div className="group p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Youth-Driven</h3>
                      <p className="text-gray-600">We don't wait for permission. We lead now.</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Heart className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Equity Focused</h3>
                      <p className="text-gray-600">Every NGO, every child, every volunteer matters.</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Sustainable Impact</h3>
                      <p className="text-gray-600">Service should build something that lasts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recognition Section - World-Class Design */}
        <div className="mt-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200/50 text-orange-700 text-sm font-medium mb-6 shadow-lg shadow-orange-500/10">
              <Award className="w-4 h-4 mr-2" />
              Recognition & Awards
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Recognized
              <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">Mauka's impact has been celebrated by leading organizations across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Media Recognition */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-700"></div>
              <div className="relative p-8 bg-white/95 backdrop-blur-sm border border-orange-100/50 rounded-3xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-2xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-orange-500/30 relative z-10">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300 relative z-10">Media Recognition</h4>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center p-4 bg-gradient-to-r from-orange-50/80 to-orange-100/40 rounded-xl hover:from-orange-100/60 hover:to-orange-50/80 transition-all duration-300 border border-orange-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-gray-800 font-semibold">Featured in City Bhaskar newspaper</span>
                  </div>
                  <div className="flex items-center p-4 bg-gradient-to-r from-orange-50/80 to-orange-100/40 rounded-xl hover:from-orange-100/60 hover:to-orange-50/80 transition-all duration-300 border border-orange-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-gray-800 font-semibold">Featured in First India Newspaper</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* National Awards */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-600/5 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-700"></div>
              <div className="relative p-8 bg-white/95 backdrop-blur-sm border border-amber-100/50 rounded-3xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-2xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-amber-500/30 relative z-10">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-amber-600 transition-colors duration-300 relative z-10">National Awards</h4>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-start p-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/40 rounded-xl hover:from-amber-100/60 hover:to-yellow-50/80 transition-all duration-300 border border-amber-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0 animate-pulse"></div>
                    <span className="text-gray-800 font-semibold">Indian Achiever's Forum Recognition</span>
                  </div>
                  <div className="flex items-start p-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/40 rounded-xl hover:from-amber-100/60 hover:to-yellow-50/80 transition-all duration-300 border border-amber-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <span className="text-gray-800 font-semibold">iVolunteer Youth Champion Finalist - Youngest awardee in Mumbai ceremony</span>
                  </div>
                  <div className="flex items-start p-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/40 rounded-xl hover:from-amber-100/60 hover:to-yellow-50/80 transition-all duration-300 border border-amber-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    <span className="text-gray-800 font-semibold">Pramerica Life Insurance Silver Medallion - Selected from 2,200+ projects</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Institutional Recognition */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/5 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-700"></div>
              <div className="relative p-8 bg-white/95 backdrop-blur-sm border border-emerald-100/50 rounded-3xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-2xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-emerald-500/30 relative z-10">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-emerald-600 transition-colors duration-300 relative z-10">Institutional Excellence</h4>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-start p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/40 rounded-xl hover:from-emerald-100/60 hover:to-green-50/80 transition-all duration-300 border border-emerald-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-3 mt-2 flex-shrink-0 animate-pulse"></div>
                    <span className="text-gray-800 font-semibold">Best Initiative at JPIS (2022-2023)</span>
                  </div>
                  <div className="flex items-start p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/40 rounded-xl hover:from-emerald-100/60 hover:to-green-50/80 transition-all duration-300 border border-emerald-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-3 mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-gray-800 font-semibold">Only Rajasthani awardee in national category</span>
                  </div>
                  <div className="flex items-start p-4 bg-gradient-to-r from-emerald-50/80 to-green-50/40 rounded-xl hover:from-emerald-100/60 hover:to-green-50/80 transition-all duration-300 border border-emerald-200/30">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-3 mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                    <span className="text-gray-800 font-semibold">Multi-round selection from 30,000+ applicants</span>
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