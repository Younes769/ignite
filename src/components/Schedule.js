"use client";

import { useEffect, useState } from 'react';
import AnimatedSVG from './AnimatedSVG';

const events = [
  {
    day: "Day 1",
    date: "January 9",
    events: [
      { time: "09:00", title: "HR sitting in chair and speaking to people and CLICKING THEM IN", description: "Welcome and kickoff", icon: "🎉", duration: 60 },
      { time: "10:00", title: "people talking to people ig i hate people", description: "Find your perfect team match", icon: "👥", duration: 120 },
      { time: "12:00", title: "jo3t", description: "Start your innovation journey", icon: "💻", duration: 720 },
    ]
  },
  {
    day: "Day 2",
    date: "January 10",
    events: [
      { time: "10:00", title: "7anmot", description: "Get guidance from industry experts", icon: "🎯", duration: 300 },
      { time: "15:00", title: "is that tiramisu", description: "Share your progress and get feedback", icon: "📊", duration: 120 },
      { time: "20:00", title: "7anmot again", description: "Take a break and have some fun", icon: "🎮", duration: 180 },
    ]
  },
  {
    day: "Day 3",
    date: "January 11",
    events: [
      { time: "09:00", title: "ill go get some tiramisu", description: "Last push towards completion", icon: "🚀", duration: 360 },
      { time: "15:00", title: "people finished doing what people do i guess", description: "Submit your masterpiece", icon: "🎯", duration: 120 },
      { time: "17:00", title: "Closing Ceremony and the prize must be tiramisu right ? please ? sad me noises", description: "Celebrate achievements together", icon: "🏆", duration: 120 },
    ]
  }
];

const Schedule = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [viewMode, setViewMode] = useState('timeline');
  const [previewEvent, setPreviewEvent] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const handleDayChange = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveDay(index);
      setIsTransitioning(false);
    }, 300);
  };

  const getTimelinePosition = (time) => {
    const [hours] = time.split(':').map(Number);
    return (hours - 8) * (100 / 16); // Assuming 8 AM to midnight (16 hours) timeline
  };

  const getEventDuration = (duration) => {
    return (duration / 60) * (100 / 16); // Convert minutes to timeline percentage
  };

  const renderTimeline = () => (
    <div className="relative">
      {/* Time indicators */}
      <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between text-xs text-white/40">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="relative">
            <div className="absolute -right-4 w-2 h-px bg-white/10"></div>
            {`${(i + 8).toString().padStart(2, '0')}:00`}
          </div>
        ))}
      </div>

      {/* Events on timeline */}
      <div 
        className={`
          relative ml-16 h-[400px] transition-opacity duration-300
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        `}
      >
        {events[activeDay].events.map((event, index) => (
          <div
            key={index}
            className="absolute left-0 transform -translate-y-1/2 w-full"
            style={{ top: `${getTimelinePosition(event.time)}%` }}
            onMouseEnter={() => {
              setHoveredEvent(index);
              setPreviewEvent(event);
            }}
            onMouseLeave={() => {
              setHoveredEvent(null);
              setPreviewEvent(null);
            }}
          >
            <div 
              className={`
                relative h-8 bg-emerald-500/10 rounded-lg transition-all duration-300
                ${hoveredEvent === index ? 'bg-emerald-500/20 scale-y-110' : ''}
              `}
              style={{ width: `${getEventDuration(event.duration)}%` }}
            >
              <div className="absolute inset-y-0 left-2 flex items-center gap-2">
                <span className="text-lg">{event.icon}</span>
                <span className="text-sm font-medium text-white/80">{event.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
      {events.map((day, dayIndex) => (
        <div 
          key={dayIndex}
          className={`
            relative p-6 rounded-xl bg-black/20 border border-white/10 backdrop-blur-sm
            transition-all duration-300 hover:bg-black/30 group
            ${activeDay === dayIndex ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/10' : ''}
          `}
        >
          {/* Date header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-lg font-semibold text-white">{day.date}</div>
              <div className="text-sm text-white/60">{day.day}</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <span className="text-2xl">{dayIndex === 0 ? '🎉' : dayIndex === 1 ? '💡' : '🏆'}</span>
            </div>
          </div>

          {/* Events list */}
          <div className="space-y-4">
            {day.events.map((event, eventIndex) => (
              <div
                key={eventIndex}
                className="relative rounded-lg transition-all duration-300 group/event"
                onMouseEnter={() => setPreviewEvent(event)}
                onMouseLeave={() => setPreviewEvent(null)}
              >
                {/* Event card */}
                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{event.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover/event:text-emerald-400 transition-colors">
                        {event.title}
                      </div>
                      <div className="text-sm text-white/60 mt-1">
                        {event.time} ({event.duration} min)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-emerald-500/5 rounded-lg opacity-0 group-hover/event:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Background glow */}
          <div className="absolute inset-0 bg-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="schedule-section" className="py-16 sm:py-24 relative">
      {/* Background */}
      <AnimatedSVG />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 sm:mb-16">
          <h2 
            className={`
              text-3xl sm:text-4xl md:text-5xl font-bold
              transform transition-all duration-1000
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <span className="text-white">Event </span>
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-emerald-500/20 blur-xl rounded-full"></span>
              <span className="relative bg-gradient-to-r from-emerald-400 to-emerald-300 text-transparent bg-clip-text">
                Timeline
              </span>
            </span>
          </h2>

          {/* View toggle */}
          <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1.5 backdrop-blur-sm border border-white/10">
            <button
              onClick={() => setViewMode('timeline')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${viewMode === 'timeline' 
                  ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'}
              `}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                ${viewMode === 'calendar' 
                  ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'}
              `}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Day selector - Only show for timeline view */}
        {viewMode === 'timeline' && (
          <div 
            className={`
              flex flex-wrap justify-center gap-3 sm:gap-4 mb-12
              transform transition-all duration-1000 delay-300
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            {events.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayChange(index)}
                className={`
                  relative px-5 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300
                  ${activeDay === index 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'hover:bg-white/5 text-white/60 hover:text-white'}
                `}
              >
                <div className="font-semibold text-sm sm:text-base">{day.day}</div>
                <div className="text-xs sm:text-sm opacity-60">{day.date}</div>
                {activeDay === index && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main content */}
        <div 
          className={`
            relative
            transform transition-all duration-1000 delay-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          {viewMode === 'timeline' ? renderTimeline() : renderCalendar()}
        </div>

        {/* Event preview card */}
        {previewEvent && (
          <div 
            className={`
              fixed bottom-8 right-8 w-80 p-6 rounded-xl
              bg-black/80 border border-white/10 backdrop-blur-xl
              transform transition-all duration-300
              ${previewEvent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{previewEvent.icon}</span>
              <div>
                <div className="font-semibold text-white">{previewEvent.title}</div>
                <div className="text-sm text-white/60">{previewEvent.time}</div>
              </div>
            </div>
            <p className="text-sm text-white/80">{previewEvent.description}</p>
            <div className="absolute inset-0 bg-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Schedule; 