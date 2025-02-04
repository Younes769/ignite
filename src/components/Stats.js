"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    id: 1,
    title: "Participants",
    value: 70,
    suffix: "+",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    description: "Expected attendees from various universities",
    gradient: "from-orange-500 via-amber-400 to-orange-500",
  },
  {
    id: 2,
    title: "Universities",
    value: 15,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 016.824-2.998 12.078 12.078 0 00-.665-6.479L12 14z"
      />
    ),
    description: "Participating institutions across Algeria",
    gradient: "from-orange-500 via-red-400 to-orange-500",
  },
  {
    id: 3,
    title: "Awards",
    value: 100000,
    suffix: "DA",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    ),
    description: "Total awards pool for winners",
    gradient: "from-orange-500 via-yellow-400 to-orange-500",
  },
  {
    id: 4,
    title: "Days",
    value: 3,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    description: "Action-packed days of innovation",
    gradient: "from-orange-500 via-rose-400 to-orange-500",
  },
];

const Spark = ({ className }) => (
  <div
    className={`absolute w-1.5 h-1.5 rounded-full opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></div>
    <div className="absolute inset-0 rounded-full bg-orange-400 blur-sm"></div>
    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500 to-amber-300"></div>
  </div>
);

const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="font-bold text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 animate-gradient-x"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default function Stats() {
  return (
    <section className="py-12 sm:py-16 md:py-20 mt-16 sm:mt-24 md:mt-32 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black via-black to-orange-950/20">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="hidden sm:block absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-red-500/5 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="hidden sm:block absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 relative">
          <div className="absolute -top-6 sm:-top-10 left-1/2 -translate-x-1/2 w-20 sm:w-40 h-20 sm:h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 mb-2 sm:mb-4 relative">
            Event Statistics
          </h2>
          <p className="text-orange-200/60 max-w-2xl mx-auto text-base sm:text-lg relative">
            Join innovative minds at IGNITE 2025, where ideas transform into
            impactful solutions
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="relative group perspective">
              {/* Spark Particles Container */}
              <div className="absolute -inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Top Row */}
                <Spark className="top-0 right-4 group-hover:animate-spark-1" />
                <Spark className="top-2 right-8 group-hover:animate-spark-2 delay-[50ms]" />
                <Spark className="top-1 right-12 group-hover:animate-spark-3 delay-[100ms]" />
                <Spark className="top-3 right-16 group-hover:animate-spark-4 delay-[75ms]" />

                {/* Left Side */}
                <Spark className="top-0 left-4 group-hover:animate-spark-2 delay-[100ms]" />
                <Spark className="top-2 left-8 group-hover:animate-spark-3 delay-[150ms]" />
                <Spark className="top-1 left-12 group-hover:animate-spark-4 delay-[200ms]" />
                <Spark className="top-3 left-16 group-hover:animate-spark-1 delay-[125ms]" />

                {/* Bottom Row */}
                <Spark className="bottom-1 right-6 group-hover:animate-spark-3 delay-[75ms]" />
                <Spark className="bottom-2 right-12 group-hover:animate-spark-4 delay-[150ms]" />
                <Spark className="bottom-0 left-6 group-hover:animate-spark-2 delay-[100ms]" />
                <Spark className="bottom-2 left-12 group-hover:animate-spark-1 delay-[175ms]" />
              </div>

              {/* Flame Effect Container */}
              <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/0 via-orange-500/5 to-orange-500/10 animate-flame"></div>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-orange-500/10 via-orange-500/5 to-transparent blur-sm transform group-hover:translate-y-1 transition-transform duration-1000 ease-in-out"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-orange-500/10 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-500 group-hover:border-orange-500/30 group-hover:bg-black/50 transform group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:shadow-[0_0_50px_-12px] group-hover:shadow-orange-500/20">
                {/* Glow Effects */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-glow"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon with enhanced glow */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 sm:mb-4 md:mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse-slow"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-orange-500/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-full h-full text-orange-500 transition-colors duration-300 group-hover:text-orange-400"
                    >
                      {stat.icon}
                    </svg>
                  </div>
                </div>

                {/* Counter */}
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />

                {/* Title with gradient hover */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-2 sm:mt-3 md:mt-4 mb-1 sm:mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-orange-300 group-hover:to-orange-400">
                  {stat.title}
                </h3>

                {/* Description */}
                <p className="text-orange-200/60 text-xs sm:text-sm md:text-base group-hover:text-orange-200/80 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
