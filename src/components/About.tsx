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
    <section id="about" className="py-20 bg-gradient-to-b from-orange-25 to-orange-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Content - Main Story */}
          <div className="lg:col-span-7 space-y-8 opacity-0 translate-y-20 transition-all duration-1000 delay-200 animate-in-trigger">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Our Story
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                Our Story
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Mauka began with a simple frustration: too many students wanted to serve, and too many NGOs needed help, but the bridge between them didn't exist. So we built it.
                </p>
                
                <p>
                  What started as a student-led initiative inside JPIS has now grown far beyond one school. Today, Mauka stands as one of the largest student-driven volunteering networks in India, connecting thousands of volunteers to NGOs working in education, healthcare, sustainability, arts, and more.
                </p>
                
                <p>
                  In just a few months, Mauka has grown into a network of <strong>3,000+ volunteers</strong>, <strong>7,200 hours of service</strong>, and <strong>78 partner NGOs</strong>. But we're not counting hours for the sake of certificates. We're building stories. We're connecting people who would never have met otherwise. And we're proving that the smallest idea in the right hands can ripple outward into real change.
                </p>
                
                <p>
                  But numbers are only half the story. The real impact lies in the classroom where a child learns to read because a Mauka volunteer sat with her every evening. It lies in the confidence of a volunteer who realised their voice could actually make someone's day better. It lies in the conversations — messy, imperfect, but deeply human — that happen when students and communities come together.
                </p>
              </div>
            </div>

            {/* Mission Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Target className="w-6 h-6 text-orange-500 mr-3" />
                Our Mission
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                To create a culture where every young person sees service not as an obligation, but as an opportunity — an opportunity to grow, to lead, and to transform someone else's life while transforming their own.
              </p>
            </div>

            {/* Vision Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 text-orange-500 mr-3" />
                Our Vision
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We imagine a future where service is as common as schooling — where every student graduates not only with grades, but with stories of lives they've touched. A future where every NGO, no matter how small, has access to the energy, ideas, and commitment of youth volunteers.
              </p>
            </div>
            
            {/* Values Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Heart className="w-6 h-6 text-orange-500 mr-3" />
                Our Values
              </h3>
              
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">Youth-driven:</strong> We don't wait for adults to give us permission. We lead now.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">Equity:</strong> Every NGO, every child, every volunteer matters.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">Sustainability:</strong> Service should build something that lasts — not just tick a box.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <div>
                    <strong className="text-gray-900">Collaboration:</strong> Mauka is not about one hero. It's about creating networks of change.
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Content - Values Cards */}
          <div ref={cardsRef} className="lg:col-span-5">
            <div className="space-y-6">
              {/* Values Cards */}
              <div className="space-y-4">
                <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Youth-Driven</h3>
                      <p className="text-gray-600">Leading change today, not tomorrow</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Heart className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Equity Focused</h3>
                      <p className="text-gray-600">Every voice matters equally</p>
                    </div>
                  </div>
                </div>
                
                <div className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-100/50 hover:border-orange-200 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 transform opacity-0 translate-x-20 animate-card-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Sustainable Impact</h3>
                      <p className="text-gray-600">Building lasting change</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recognition Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Recognition & Awards</h3>
            <p className="text-gray-600">Mauka's impact has been recognized by leading organizations across India</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Media Recognition */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/10 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <div className="relative p-8 bg-white/90 backdrop-blur-sm border border-orange-100/50 rounded-3xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">Media Recognition</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-orange-50/50 rounded-xl hover:bg-orange-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">Featured in City Bhaskar newspaper</span>
                  </div>
                  <div className="flex items-center p-3 bg-orange-50/50 rounded-xl hover:bg-orange-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">Featured in First India Newspaper</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* National Awards */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-600/10 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500"></div>
              <div className="relative p-8 bg-white/90 backdrop-blur-sm border border-amber-100/50 rounded-3xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">National Awards</h4>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Indian Achiever's Forum Recognition</span>
                  </div>
                  <div className="flex items-start p-3 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">iVolunteer Youth Champion Finalist</span>
                  </div>
                  <div className="flex items-start p-3 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Pramerica Life Insurance Silver Medallion</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Institutional Recognition */}
            <div className="group relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/10 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
              <div className="relative p-8 bg-white/90 backdrop-blur-sm border border-emerald-100/50 rounded-3xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">Institutional Recognition</h4>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Best Initiative at JPIS (2022-2023)</span>
                  </div>
                  <div className="flex items-start p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Selected from 2,200+ projects nationwide</span>
                  </div>
                  <div className="flex items-start p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors duration-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">Only Rajasthani awardee in category</span>
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