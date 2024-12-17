"use client";

import { useEffect, useState } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-01-09T09:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    setIsVisible(true);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'D' },
    { value: timeLeft.hours, label: 'H' },
    { value: timeLeft.minutes, label: 'M' },
    { value: timeLeft.seconds, label: 'S' }
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div 
        className={`
          relative group
          transform transition-all duration-1000
          ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}
        `}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-xl blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
        
        {/* Content container */}
        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 group-hover:border-emerald-500/20 transition-all duration-500">
          {/* Title */}
          <div className="text-center mb-2">
            <h3 className="text-sm font-medium text-white/80">Event Starts In</h3>
          </div>

          {/* Timer units */}
          <div className="flex gap-2">
            {timeUnits.map((unit, index) => (
              <div 
                key={unit.label}
                className={`
                  text-center transform transition-all duration-1000 delay-${index * 100}
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                `}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-md blur-sm"></div>
                  <div className="relative bg-black/60 rounded-md px-2 py-1">
                    <span className="text-xl font-bold text-white tabular-nums">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="mt-0.5 text-xs font-medium text-emerald-400/80">{unit.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom label */}
          <div className="mt-1 text-center">
            <span className="text-[10px] text-white/40">Jan 9, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown; 