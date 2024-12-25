"use client";

import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSchedule = (e) => {
    e.preventDefault();
    const scheduleSection = document.getElementById('schedule-section');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-center mt-24 sm:mt-44 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div 
        className={`
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tight">
          <span className="block text-white mb-2">Where</span>
          <span 
            className={`
              block transform transition-all duration-1000 delay-300 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 inline-block text-transparent bg-clip-text">
              Developers
            </span>
          </span>
          <span 
            className={`
              block transform transition-all duration-1000 delay-500 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <span className="text-white">Make an</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 inline-block text-transparent bg-clip-text">
              Impact
            </span>
          </span>
        </h1>
      </div>

      {/* Description */}
      <p 
        className={`
          text-lg sm:text-xl md:text-2xl text-white/60 mt-8 sm:mt-12 mb-12 sm:mb-16 leading-relaxed 
          max-w-2xl mx-auto px-4 sm:px-0 transform transition-all duration-1000 delay-700 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
        Join us for{" "}
        <span className="text-emerald-400/90 font-medium">three days</span> of creation, innovation,
        and breakthrough moments.
      </p>

      {/* Buttons */}
      <div 
        className={`
          flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 
          max-w-xl mx-auto transform transition-all duration-1000 delay-1000 ease-out
          px-4 sm:px-0
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
      >
        <button 
          className="group relative w-full sm:w-auto min-w-[200px] sm:min-w-[220px] hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="absolute inset-0 bg-emerald-500 rounded-xl blur-sm opacity-10 group-hover:opacity-20 transition-opacity"></span>
          <span className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 transition-all duration-300">
            <span className="font-semibold text-base sm:text-lg">Join the Challenge</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </span>
        </button>

        <button 
          onClick={scrollToSchedule}
          className="group relative w-full sm:w-auto min-w-[200px] sm:min-w-[220px] hover:-translate-y-0.5 transition-all duration-300"
        >
          <span className="absolute inset-0 bg-white/5 rounded-xl blur-sm opacity-10 group-hover:opacity-20 transition-opacity"></span>
          <span className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-xl border-2 border-white/10 hover:border-emerald-500/30 hover:text-emerald-400/90 transition-all duration-300">
            <span className="font-semibold text-base sm:text-lg">View Schedule</span>
            <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1.5 transition-all duration-300">→</span>
          </span>
        </button>
      </div>

      {/* Decorative elements - adjust size for mobile */}
      <div 
        className={`
          absolute top-1/3 left-0 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/5 rounded-full 
          filter blur-3xl mix-blend-overlay animate-blob
          transition-opacity duration-1000 delay-1000
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      ></div>
      <div 
        className={`
          absolute top-1/3 right-0 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-400/5 rounded-full 
          filter blur-3xl mix-blend-overlay animate-blob animation-delay-2000
          transition-opacity duration-1000 delay-1500
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      ></div>
    </div>
  );
};

export default Hero; 