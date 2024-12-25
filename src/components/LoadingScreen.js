"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading && progress >= 100) return null;

  return (
    <div className={`
      fixed inset-0 z-50 bg-black
      flex flex-col items-center justify-center
      transition-opacity duration-1000
      ${progress >= 100 ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 blur-3xl bg-emerald-500/20 rounded-full" />
        
        {/* Logo container with animations */}
        <div className={`
          relative w-32 h-32 md:w-40 md:h-40
          transform transition-all duration-1000
          ${progress >= 100 ? 'scale-110 rotate-180' : 'scale-100 rotate-0'}
        `}>
          {/* Logo image with pulse effect */}
          <div className="absolute inset-0 flex items-center justify-center animate-pulse-slow">
            <Image
              src="/logo.png"
              alt="DevIM Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>

          {/* Progress circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              className="text-white/5"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="50%"
              cy="50%"
            />
            <circle
              className="text-emerald-500 transition-all duration-300"
              strokeWidth="4"
              strokeDasharray={365}
              strokeDashoffset={365 - (progress * 3.65)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="50%"
              cy="50%"
            />
          </svg>
        </div>
      </div>

      {/* Loading text with gradient */}
      <div className="mt-12 relative text-center">
        <div className="text-sm font-mono">
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-transparent bg-clip-text">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Animated bars */}
        <div className="mt-4 flex gap-1 justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-6 rounded-full bg-emerald-500/30"
              style={{
                animation: `equalizer 1s infinite ${i * 0.15}s`,
                transformOrigin: 'bottom'
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading message */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-white/30 text-sm">
          {progress < 33 ? 'Initializing...' :
           progress < 66 ? 'Loading assets...' :
           'Preparing launch...'}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;