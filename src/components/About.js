"use client";

import { useEffect, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="about-section" className="py-32 relative">
      {/* Creative background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-emerald-950/20 to-black/0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.08)_0%,_transparent_50%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Main content */}
        <div className="relative">
          {/* Header */}
          <div 
            className={`
              text-center mb-16
              transform transition-all duration-1000
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <h2 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">Welcome to </span>
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-emerald-500/20 blur-xl rounded-full"></span>
                <span className="relative bg-gradient-to-r from-emerald-400 to-emerald-300 text-transparent bg-clip-text">
                  DevImpact
                </span>
              </span>
            </h2>
          </div>

          {/* Organizer info */}
          <div 
            className={`
              text-center mb-20
              transform transition-all duration-1000 delay-200
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <p className="text-xl text-white/80">
              Organized by <span className="text-emerald-400 font-semibold">NCS Club</span>
            </p>
            <p className="text-lg text-white/60 mt-2">
              Numidia Institute of Technology, Rahmania
            </p>
          </div>

          {/* Three-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* What */}
            <div 
              className={`
                relative group
                transform transition-all duration-1000 delay-400
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
              <div className="absolute -inset-2 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              <div className="relative space-y-4 text-center p-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-semibold text-white">What</h3>
                <p className="text-white/60 leading-relaxed">
                  A 72-hour hackathon where innovation meets impact, bringing together the brightest minds in tech.
                </p>
              </div>
            </div>

            {/* Why */}
            <div 
              className={`
                relative group
                transform transition-all duration-1000 delay-600
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
              <div className="absolute -inset-2 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              <div className="relative space-y-4 text-center p-6">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-2xl font-semibold text-white">Why</h3>
                <p className="text-white/60 leading-relaxed">
                  To foster innovation, build connections, and create solutions that make a real difference in our community.
                </p>
              </div>
            </div>

            {/* Where */}
            <div 
              className={`
                relative group
                transform transition-all duration-1000 delay-800
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
              <div className="absolute -inset-2 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              <div className="relative space-y-4 text-center p-6">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-2xl font-semibold text-white">Where</h3>
                <p className="text-white/60 leading-relaxed">
                  At NIT's vibrant campus in Rahmania, where technology and creativity converge.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom tagline */}
          <div 
            className={`
              text-center mt-20
              transform transition-all duration-1000 delay-1000
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <a 
              href="https://maps.app.goo.gl/qb9FvtxgdrSf5NVG8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>View Location</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 