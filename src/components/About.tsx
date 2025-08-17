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
          {/* Left Content - Fire Story */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100/80 backdrop-blur-sm border border-orange-200/50 text-orange-700 text-sm font-medium shadow-lg shadow-orange-500/10">
                <Zap className="w-4 h-4 mr-2" />
                The Revolution
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                This Is How
                <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Legends Begin
                </span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <div className="text-2xl font-black text-gray-900 leading-tight">
                  Mauka didn't start in a boardroom. It started in frustration.
                </div>
                
                <div className="text-lg leading-relaxed">
                  Picture this: thousands of students burning with the desire to serve, and thousands of NGOs desperately needing help. Yet they existed in parallel universes, never meeting. The bridge didn't exist. So we didn't wait for someone else to build it.
                </div>
                
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  We became the bridge.
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
                  But numbers are just the beginning. The real magic happens when a quiet teenager discovers their voice mentoring younger children. When a science enthusiast runs her first experiment with kids who've never seen a lab. When a football player organizes the first proper match in a village with real equipment.
                </div>
                
                <div className="text-2xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  That is the power of a mauka — a chance.
                </div>
                
                <div className="text-xl font-bold text-gray-900">
                  Young people aren't the leaders of tomorrow. They are leaders today.
                </div>
                
                <div className="text-lg leading-relaxed">
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
      </div>
    </div>
    </section>
  );
};

export default About;
  )
}