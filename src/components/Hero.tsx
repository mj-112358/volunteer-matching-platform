import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && textRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const opacity = 1 - scrolled / window.innerHeight;
        
        textRef.current.style.transform = `translateY(${rate}px)`;
        textRef.current.style.opacity = Math.max(0, opacity).toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div ref={textRef} className="space-y-6">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter">
                <span className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default">
                  Mauka
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl text-gray-900 font-bold">
                One Mauka Can Change a Life
              </h2>
            </div>
          
            {/* Body Content - Engaging Format */}
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <div className="font-semibold text-xl text-gray-900">
                Mauka is more than a volunteering platform. It's a movement of young people who believe that service is not just something you do on weekends — it's something that shapes who you are.
              </div>
              
              <div>
                At Mauka, we've seen what happens when students are given the chance to serve:
              </div>
              
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  A quiet teenager becomes a mentor for younger children
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  A science enthusiast runs her first experiment with kids who've never entered a lab
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  A football player sets up a match in a village field with proper gear for the first time
                </li>
              </ul>
              
              <div className="text-xl font-bold text-orange-600">
                That is the power of a mauka — a chance.
              </div>
              
              <div className="text-xl font-bold text-gray-900">
                Young people aren't the leaders of tomorrow. They are leaders today.
              </div>
            </div>
          
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#volunteer-matching"
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 transform"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Become a Volunteer
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </a>
              
              <a 
                href="#volunteer-matching"
                className="group relative bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 transform"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Partner as an NGO
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </a>
              
              <a 
                href="#donate"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = 'donate';
                  window.location.reload();
                }}
                className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50 transform"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Support with a Donation
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </a>
            </div>
          </div>
        
          {/* Right Side - Spline Animation */}
          <div className="relative h-[500px] w-full">
            <div className="w-full h-full bg-white rounded-lg overflow-hidden">
              <Spline
                scene="https://prod.spline.design/AcYRTcXVvLwcRDdr/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;