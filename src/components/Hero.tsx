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
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Text Content */}
          <div ref={textRef} className="space-y-8 lg:pr-8">
            {/* Main Headline with Stagger Animation */}
            <div className="space-y-4">
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
            </div>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium animate-fade-in-up-delayed drop-shadow-sm">
              Creating access, impact and equity—one opportunity at a time.
            </p>
            
            {/* CTA Button with Magnetic Effect */}
            <div className="pt-8 animate-fade-in-up-more-delayed">
              <button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 transform magnetic-button">
                <span className="relative z-10 flex items-center">
                  Get Involved
                  <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
          
          {/* Right Side - Spline Animation */}
          <div className="relative h-[600px] lg:h-[700px] w-full">
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