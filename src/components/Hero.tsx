import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left Side - Text Content */}
          <div ref={textRef} className="space-y-8 lg:pr-8">
            {/* Main Headline with Stagger Animation */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.85] tracking-tighter drop-shadow-lg">
                <span className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent animate-slide-up-1 hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-lg">
                  Mauka
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-900 font-bold animate-slide-up-2">
                One Mauka Can Change a Life
              </h2>
          
              {/* Sub-headline */}
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold animate-fade-in-up-delayed">
                Mauka is more than a volunteering platform. It's a movement of young people who believe that service is not just something you do on weekends — it's something that shapes who you are.
              </p>
              
              {/* Body Content */}
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up-more-delayed">
                At Mauka, we've seen what happens when students are given the chance to serve. A quiet teenager becomes a mentor for younger children. A science enthusiast runs her first experiment with kids who've never entered a lab. A football player sets up a match in a village field, and for those kids, it's the first time they've played with proper gear.
              </p>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up-more-delayed">
                <strong className="text-orange-600">That is the power of a mauka — a chance.</strong>
              </p>
              
              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/50 animate-fade-in-up-more-delayed">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Belief:</h3>
                <p className="text-lg text-orange-700 font-semibold">
                  Young people aren't the leaders of tomorrow. They are leaders today.
                </p>
              </div>
            </div>
          
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-more-delayed">
              <a 
                href="#volunteer-matching"
                className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 transform magnetic-button"
              >
                <span className="relative z-10 flex items-center">
                  Become a Volunteer
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </a>
              
              <a 
                href="#volunteer-matching"
                className="group relative bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30 transform"
              >
                <span className="relative z-10 flex items-center">
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
                className="group relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50 transform magnetic-button"
              >
                <span className="relative z-10 flex items-center">
                  Support with a Donation
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
              </a>
            </div>
        
        {/* Right Side - Spline Animation */}
        <div className="relative h-[500px] lg:h-[600px] w-full">
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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.85] tracking-tighter drop-shadow-lg">
              <span className="inline-block animate-slide-up-1 drop-shadow-lg">Everyone</span>{' '}
              <span className="inline-block animate-slide-up-2 drop-shadow-lg">deserves</span>{' '}
              <span className="inline-block animate-slide-up-3 drop-shadow-lg">a</span>
                <br />
                <span className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent animate-slide-up-4 hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-lg">
                  Mauka
                </span>
                <span className="inline-block animate-slide-up-5 text-orange-600 drop-shadow-lg">.</span>
              </h1>