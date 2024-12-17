"use client";

import { useEffect, useState } from 'react';

const AnimatedSVG = ({ className = "" }) => {
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

    const element = document.getElementById('animated-svg');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="animated-svg" className={`absolute inset-0 ${className}`}>
      {/* Background pattern */}
      <svg
        className="absolute w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-emerald-500"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Animated paths */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Wave pattern */}
        <path
          d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
          className={`
            fill-emerald-500/5 transition-all duration-1000
            ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}
          `}
          style={{
            animation: isVisible ? 'wave 8s ease-in-out infinite' : 'none',
          }}
        />

        {/* Curved line */}
        <path
          d="M0,30 Q50,0 100,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          className={`
            text-emerald-500/30 transition-all duration-1000
            ${isVisible ? 'opacity-100 stroke-dashoffset-0' : 'opacity-0 stroke-dashoffset-100'}
          `}
          style={{
            strokeDasharray: '100',
            strokeDashoffset: isVisible ? '0' : '100',
            animation: isVisible ? 'dash 3s ease-out forwards' : 'none',
          }}
        />

        {/* Animated circles */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={i}
            cx={20 + i * 15}
            cy="70"
            r="1"
            className={`
              fill-emerald-500/50 transition-all duration-500
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `}
            style={{
              transitionDelay: `${i * 200}ms`,
              animation: isVisible ? `pulse 2s ease-in-out ${i * 0.2}s infinite` : 'none',
            }}
          />
        ))}
      </svg>

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div
          className={`
            absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/5
            rounded-full filter blur-3xl transition-all duration-1000
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        />
        <div
          className={`
            absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/5
            rounded-full filter blur-3xl transition-all duration-1000 delay-500
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
        />
      </div>
    </div>
  );
};

export default AnimatedSVG; 