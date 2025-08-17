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
            <div className="space-y-12">
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
                  But numbers are only half the story. The real impact lies in the classroom where a child learns to read because a Mauka volunteer sat with her every evening. It lies in the confidence of a volunteer who realised their voice could actually make someone's day better. It lies in the conversations — messy, imperfect, but deeply human — that happen when students and communities come together.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Mauka, we've seen what happens when students are given the chance to serve. A quiet teenager becomes a mentor for younger children. A science enthusiast runs her first experiment with kids who've never entered a lab. A football player sets up a match in a village field, and for those kids, it's the first time they've played with proper gear.
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  In just a few months, Mauka has grown into a network of <strong>3,000+ volunteers</strong>, <strong>7,200 hours of service</strong>, and <strong>78 partner NGOs</strong>. But we're not counting hours for the sake of certificates. We're building stories. We're connecting people who would never have met otherwise. And we're proving that the smallest idea in the right hands can ripple outward into real change.
                </p>
              </div>
            </div>

            {/* Mission Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Target className="w-6 h-6 text-orange-500 mr-3" />
                Our Mission
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                To create a culture where every young person sees service not as an obligation, but as an opportunity — an opportunity to grow, to lead, and to transform someone else's life while transforming their own.
              </p>
            </div>

            {/* Vision Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-6 h-6 text-orange-500 mr-3" />
                Our Vision
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We imagine a future where service is as common as schooling — where every student graduates not only with grades, but with stories of lives they've touched. A future where every NGO, no matter how small, has access to the energy, ideas, and commitment of youth volunteers.
              </p>
            </div>
            
            {/* Values Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Heart className="w-6 h-6 text-orange-500 mr-3" />
                Our Values
              </h3>
              
              <ul className="space-y-4 text-lg text-gray-600">
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
            <div className="space-y-8">
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
      </div>
    </section>
  );
};

export default About;