"use client";

import { useEffect, useState } from "react";

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

    const element = document.getElementById("animated-svg");
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
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-orange-500"
            />
          </pattern>
          <linearGradient
            id="orangeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" className="text-orange-400" stopOpacity="0.3" />
            <stop offset="100%" className="text-orange-600" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Animated paths */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Wave patterns */}
        <path
          d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
          className={`
            fill-orange-500/5 transition-all duration-1000
            ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}
          `}
          style={{
            animation: isVisible ? "wave 8s ease-in-out infinite" : "none",
          }}
        />
        <path
          d="M0,60 Q25,50 50,60 T100,60 V100 H0 Z"
          className={`
            fill-orange-400/3 transition-all duration-1000 delay-200
            ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}
          `}
          style={{
            animation: isVisible
              ? "wave 7s ease-in-out infinite reverse"
              : "none",
          }}
        />

        {/* Curved lines */}
        <path
          d="M0,30 Q50,0 100,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          className={`
            text-orange-500/30 transition-all duration-1000
            ${
              isVisible
                ? "opacity-100 stroke-dashoffset-0"
                : "opacity-0 stroke-dashoffset-100"
            }
          `}
          style={{
            strokeDasharray: "100",
            strokeDashoffset: isVisible ? "0" : "100",
            animation: isVisible ? "dash 3s ease-out forwards" : "none",
          }}
        />
        <path
          d="M0,35 Q50,5 100,35"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.1"
          className={`
            text-orange-400/20 transition-all duration-1000 delay-300
            ${
              isVisible
                ? "opacity-100 stroke-dashoffset-0"
                : "opacity-0 stroke-dashoffset-100"
            }
          `}
          style={{
            strokeDasharray: "100",
            strokeDashoffset: isVisible ? "0" : "100",
            animation: isVisible ? "dash 2.5s ease-out forwards" : "none",
          }}
        />

        {/* Animated circles */}
        {[...Array(7)].map((_, i) => (
          <circle
            key={i}
            cx={15 + i * 12}
            cy="70"
            r="0.8"
            className={`
              fill-orange-500/50 transition-all duration-500
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
            `}
            style={{
              transitionDelay: `${i * 150}ms`,
              animation: isVisible
                ? `pulse 2s ease-in-out ${i * 0.15}s infinite`
                : "none",
            }}
          />
        ))}
      </svg>

      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div
          className={`
            absolute top-1/4 -left-20 w-96 h-96
            bg-gradient-to-br from-orange-500/10 to-orange-600/5
            rounded-full filter blur-3xl transition-all duration-1000
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        />
        <div
          className={`
            absolute bottom-1/4 -right-20 w-96 h-96
            bg-gradient-to-tl from-orange-400/10 to-orange-500/5
            rounded-full filter blur-3xl transition-all duration-1000 delay-500
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        />
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-24 h-24 bg-orange-500/5
              rounded-full filter blur-xl transition-all duration-1000
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
            `}
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 40}%`,
              transitionDelay: `${i * 200}ms`,
              animation: isVisible
                ? `float ${3 + i}s ease-in-out infinite`
                : "none",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5%);
          }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5%, -5%);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSVG;
