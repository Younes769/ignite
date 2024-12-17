"use client";

import { useEffect, useState } from 'react';

const events = [
  {
    day: "Day 1",
    date: "January 9",
    events: [
      { time: "09:00", title: "Opening Ceremony", description: "Welcome and kickoff" },
      { time: "10:00", title: "Team Formation", description: "Find your perfect team match" },
      { time: "12:00", title: "Hacking Begins", description: "Start your innovation journey" },
    ]
  },
  {
    day: "Day 2",
    date: "January 10",
    events: [
      { time: "10:00", title: "Mentor Sessions", description: "Get guidance from industry experts" },
      { time: "15:00", title: "Progress Check", description: "Share your progress and get feedback" },
      { time: "20:00", title: "Gaming Break", description: "Take a break and have some fun" },
    ]
  },
  {
    day: "Day 3",
    date: "January 11",
    events: [
      { time: "09:00", title: "Final Sprint", description: "Last push towards completion" },
      { time: "15:00", title: "Project Submission", description: "Submit your masterpiece" },
      { time: "17:00", title: "Closing Ceremony", description: "Celebrate achievements together" },
    ]
  }
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
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

    const element = document.getElementById('schedule-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="schedule-section" className="py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h2 
          className={`
            text-4xl md:text-5xl font-bold text-center mb-16
            transform transition-all duration-1000
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          <span className="text-white">Event </span>
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 inline-block text-transparent bg-clip-text">
            Timeline
          </span>
        </h2>

        {/* Day selector */}
        <div 
          className={`
            flex justify-center gap-4 mb-16
            transform transition-all duration-1000 delay-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          {events.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`
                relative px-6 py-3 rounded-xl transition-all duration-300
                ${activeDay === index 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'hover:bg-white/5 text-white/60 hover:text-white'}
              `}
            >
              <div className="font-semibold">{day.day}</div>
              <div className="text-sm opacity-60">{day.date}</div>
              {activeDay === index && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div 
          className={`
            relative
            transform transition-all duration-1000 delay-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent"></div>

          {/* Events */}
          {events[activeDay].events.map((event, index) => (
            <div
              key={index}
              className={`
                relative flex items-center gap-8 mb-12 last:mb-0
                animate-fadeIn animation-delay-${index * 200}
              `}
            >
              {/* Left side - Time */}
              <div className="w-1/2 text-right">
                <div className="text-emerald-400 font-semibold">{event.time}</div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0.5 bg-emerald-500 rounded-full"></div>
              </div>

              {/* Right side - Event details */}
              <div className="w-1/2 group">
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <div className="font-semibold text-lg text-white mb-2">{event.title}</div>
                  <div className="text-white/60">{event.description}</div>
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule; 