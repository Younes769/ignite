"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const sponsors = [
      { name: "Sponsor 1", logo: "/sponsors/placeholder1.png" },
      { name: "Sponsor 2", logo: "/sponsors/placeholder2.png" },
      { name: "Sponsor 3", logo: "/sponsors/placeholder3.png" },
      { name: "Sponsor 4", logo: "/sponsors/placeholder4.png" },
      { name: "Sponsor 5", logo: "/sponsors/placeholder5.png" },
  { name: "Sponsor 6", logo: "/sponsors/placeholder6.png" }
];

const Sponsors = () => {
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

    const element = document.getElementById('sponsors-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="sponsors-section" className="py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05)_0%,_transparent_60%)]"></div>
        <div className="absolute w-full h-full opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(16,185,129,0.1) 20px, rgba(16,185,129,0.1) 40px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 
            className={`
              text-4xl md:text-5xl font-bold mb-6
              transform transition-all duration-1000
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <span className="text-white">Our </span>
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-emerald-500/20 blur-xl rounded-full"></span>
              <span className="relative bg-gradient-to-r from-emerald-400 to-emerald-300 text-transparent bg-clip-text">
                Sponsors
              </span>
            </span>
          </h2>
          <p 
            className={`
              text-xl text-white/60 max-w-3xl mx-auto
              transform transition-all duration-1000 delay-200
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            Thank you to our amazing partners who make this event possible
          </p>
        </div>

        {/* Sponsor logos grid */}
            <div 
              className={`
            grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 place-items-center
            transform transition-all duration-1000 delay-300
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
          {sponsors.map((sponsor, index) => (
                  <div 
                    key={sponsor.name}
                    className={`
                relative group w-full max-w-[200px] aspect-[3/2]
                      transform transition-all duration-500 delay-${index * 100}
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                    `}
                  >
                    {/* Logo container */}
                    <div className="relative w-full h-full">
                      {/* Hover effects */}
                      <div className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-emerald-500/20"></div>
                      
                      {/* Logo */}
                      <div className="absolute inset-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            className="object-contain filter brightness-0 invert opacity-60 group-hover:opacity-90 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors; 