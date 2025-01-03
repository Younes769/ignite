"use client";

import { useEffect, useState } from 'react';
import AnimatedSVG from './AnimatedSVG';

const events = [
  {
    day: "Day 1",
    date: "January 9",
    events: [
      { time: "08:00", title: "Check In & Registration", description: "HR sitting in chairs, checking names, and clicking people in. Don't forget to smile for your badge photo! 📸", icon: "✍️", duration: 90 },
      { time: "10:15", title: "Opening Ceremony", description: "Time for some inspirational speeches that'll make you feel like you can hack NASA (please don't actually try that)", icon: "🎭", duration: 60 },
      { time: "11:30", title: "Lunch Break", description: "First power-up of the day! Time to fuel those brain cells", icon: "🍽️", duration: 60 },
      { time: "13:15", title: "Challenge Reveal", description: "The moment of truth! What impossible problems will you be solving in the next 72 hours?", icon: "🎯", duration: 45 },
      { time: "14:15", title: "Let the Hacking Begin!", description: "Fingers on keyboards! May the code be with you", icon: "⚡", duration: 285 },
      { time: "19:00", title: "Dinner Time", description: "Time to rest those typing fingers and feed that big brain of yours", icon: "🍕", duration: 60 },
      { time: "02:00", title: "Midnight Snacks", description: "For the night owls and the 'just one more bug' fixers", icon: "🌙", duration: 60 }
    ]
  },
  {
    day: "Day 2",
    date: "January 10",
    events: [
      { time: "08:00", title: "Breakfast", description: "Rise and shine, hackers! Coffee loading... ⌛", icon: "☕", duration: 60 },
      { time: "09:00", title: "Back to Hacking", description: "Where did we put that semicolon again?", icon: "💻", duration: 150 },
      { time: "11:30", title: "Lunch Break", description: "More fuel for the coding machine!", icon: "🍽️", duration: 60 },
      { time: "13:00", title: "Jum'ah Prayer", description: "Take a peaceful break from debugging", icon: "🕌", duration: 60 },
      { time: "14:15", title: "Fun Activities", description: "Time to stretch those legs! Yes, programmers need exercise too", icon: "🎮", duration: 90 },
      { time: "15:45", title: "Return to Hacking", description: "Back to turning coffee into code", icon: "⚡", duration: 195 },
      { time: "19:00", title: "Dinner Break", description: "Food.exe has started running", icon: "🍝", duration: 60 },
      { time: "02:00", title: "Late Night Snacks", description: "Debugging fuel available here!", icon: "🌙", duration: 60 }
    ]
  },
  {
    day: "Day 3",
    date: "January 11",
    events: [
      { time: "08:00", title: "Final Breakfast", description: "Last chance to caffeinate before the big finale!", icon: "☕", duration: 60 },
      { time: "09:00", title: "Final Sprint", description: "Panic coding intensifies! Just kidding... (not really)", icon: "⚡", duration: 180 },
      { time: "12:00", title: "Code Freeze", description: "STOP! Hammer time... I mean, coding time is up!", icon: "🥶", duration: 105 },
      { time: "13:45", title: "Project Presentations", description: "Show off your sleep-deprived masterpieces!", icon: "🎤", duration: 135 },
      { time: "16:30", title: "Closing Ceremony", description: "Time to find out who's taking home the glory (and the prizes)!", icon: "🏆", duration: 60 }
    ]
  }
];

const style = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

const additionalStyles = `
  @keyframes bounce-x {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(3px); }
  }
  
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translate(-50%, 20px); }
    100% { opacity: 1; transform: translate(-50%, 0); }
  }
  
  .animate-bounce-x {
    animation: bounce-x 1s infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
`;

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
};

const Schedule = () => {
  const isClient = useIsClient();
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [viewMode, setViewMode] = useState('timeline');
  const [previewEvent, setPreviewEvent] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 260,
    markerWidth: 24,
    laneSpacing: 32
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        width: isMobile ? 260 : 320,
        markerWidth: isMobile ? 24 : 32,
        laneSpacing: isMobile ? 32 : 40
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = style + additionalStyles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const handleDayChange = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveDay(index);
      setIsTransitioning(false);
    }, 300);
  };

  const getTimelinePosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    const startMinutes = 8 * 60; // 8:00 AM
    
    // Handle times after midnight
    if (hours < 8) {
      totalMinutes = (hours + 24) * 60 + minutes;
    }
    
    const totalDayMinutes = (26 - 8) * 60; // 18 hours (8:00 AM to 2:00 AM next day)
    const position = ((totalMinutes - startMinutes) / totalDayMinutes) * 100;
    return Math.max(0, Math.min(100, position));
  };

  const getEventDuration = (duration) => {
    return (duration / 60) * (100 / 16); // Convert minutes to timeline percentage
  };

  const renderTimeline = () => {
    const sortedEvents = [...events[activeDay].events].sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(':').map(Number);
      const [hoursB, minutesB] = b.time.split(':').map(Number);
      const timeA = hoursA * 60 + minutesA;
      const timeB = hoursB * 60 + minutesB;
      return timeA - timeB;
    });

    // Assign lanes first
    const assignLanes = (events) => {
      const lanes = [];
      events.forEach(event => {
        const [hours, minutes] = event.time.split(':').map(Number);
        const startTime = hours * 60 + minutes;
        const endTime = startTime + event.duration;

        let laneIndex = 0;
        let foundLane = false;

        while (!foundLane) {
          if (!lanes[laneIndex]) {
            lanes[laneIndex] = [];
            foundLane = true;
          } else {
            const canUseLane = lanes[laneIndex].every(existingEvent => {
              const [existingHours, existingMinutes] = existingEvent.time.split(':').map(Number);
              const existingStart = existingHours * 60 + existingMinutes;
              const existingEnd = existingStart + existingEvent.duration;
              return endTime + 30 <= existingStart || startTime >= existingEnd + 30;
            });

            if (canUseLane) {
              foundLane = true;
            } else {
              laneIndex++;
            }
          }

          if (foundLane) {
            lanes[laneIndex].push(event);
            event.lane = laneIndex;
          }
        }
      });
      return lanes.length;
    };

    assignLanes(sortedEvents);

    return (
      <div className="relative">
        {/* Time indicators */}
        <div className="absolute left-0 top-0 h-full w-14 xs:w-16 md:w-24 flex flex-col text-[10px] md:text-xs text-white/40">
          {Array.from({ length: 19 }, (_, i) => {
            const hour = (i + 8) % 24;
            const position = (i / 18) * 100;
            return (
              <div 
                key={i} 
                className="absolute flex items-center"
                style={{ 
                  top: `${position}%`,
                  transform: 'translateY(-50%)'
                }}
              >
                <div className="w-14 xs:w-16 md:w-24 text-right pr-2 md:pr-4 opacity-60">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </div>
                <div className="w-2 h-px bg-white/10"></div>
              </div>
            );
          })}
        </div>

        {/* Timeline container */}
        <div 
          className={`
            relative ml-16 xs:ml-20 md:ml-28 h-[500px] xs:h-[600px] sm:h-[700px] md:h-[800px] 
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <div className="absolute inset-0 overflow-x-auto md:overflow-x-visible hide-scrollbar">
            <div className="absolute min-w-[800px] w-full h-full pl-8 xs:pl-8 md:pl-8 pt-12">
              {/* Vertical timeline line */}
              <div className="absolute left-8 xs:left-8 md:left-8 top-12 bottom-0 w-px bg-emerald-500/20" />

              {/* Hour grid lines */}
              <div className="absolute inset-0 -z-10 left-8 xs:left-8 md:left-8 top-12">
                {Array.from({ length: 19 }, (_, i) => {
                  const position = (i / 18) * 100;
                  return (
                    <div 
                      key={i} 
                      className="absolute w-full h-px bg-white/5"
                      style={{ top: `${position}%` }}
                    />
                  );
                })}
              </div>

              {/* Events */}
              {sortedEvents.map((event, index) => {
                const topPosition = getTimelinePosition(event.time);
                const laneOffset = 8 + event.lane * (dimensions.width + dimensions.laneSpacing);
                const markerWidth = dimensions.markerWidth + (event.lane * (dimensions.width + dimensions.laneSpacing));

                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      top: `calc(${topPosition}% + 48px)`,
                      left: `${laneOffset}px`,
                      width: `${dimensions.width}px`,
                      transform: 'translateY(-50%)',
                      zIndex: hoveredEvent === event ? 10 : 1
                    }}
                  >
                    {/* Event card */}
                    <div 
                      className={`
                        group relative ml-4 xs:ml-6 md:ml-8
                        transform transition-all duration-300
                        hover:translate-x-1
                      `}
                      onMouseEnter={() => setHoveredEvent(event)}
                      onMouseLeave={() => setHoveredEvent(null)}
                    >
                      {/* Time marker */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 flex items-center"
                        style={{
                          width: `${markerWidth}px`,
                          left: `-${markerWidth}px`
                        }}
                      >
                        <div className="absolute left-0 w-2 md:w-3 h-2 md:h-3 rounded-full bg-emerald-500 relative">
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm"></div>
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-emerald-500 via-emerald-500/80 to-emerald-500/50"></div>
                      </div>

                      {/* Event content */}
                      <div 
                        className={`
                          p-2 xs:p-2.5 md:p-3 rounded-lg
                          ${hoveredEvent === event 
                            ? 'bg-white/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
                            : 'bg-white/5 border-white/10'
                          }
                          border hover:border-emerald-500/30
                          transition-all duration-300
                          backdrop-blur-sm
                          hover:shadow-xl hover:shadow-emerald-500/10
                        `}
                      >
                        <div className="flex items-start gap-1.5 xs:gap-2">
                          <div className="w-5 h-5 xs:w-6 xs:h-6 md:w-8 md:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm xs:text-base md:text-lg">{event.icon}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-[10px] xs:text-xs md:text-sm text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                              {event.title}
                            </div>
                            <div className="mt-0.5 text-[8px] xs:text-[10px] md:text-xs text-white/60 line-clamp-2">
                              {event.description}
                            </div>
                            <div className="mt-1 md:mt-1.5 flex items-center gap-1 md:gap-2 text-[8px] xs:text-[10px] md:text-xs text-white/40">
                              <span>{event.time}</span>
                              <span>•</span>
                              <span>
                                {Math.floor(event.duration / 60)}h
                                {event.duration % 60 ? `${event.duration % 60}m` : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile scroll indicator */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden animate-fade-in-up">
            <div 
              className="
                px-4 py-2.5 rounded-full 
                bg-gradient-to-r from-black/60 to-black/40 
                backdrop-blur-md border border-emerald-500/30 
                shadow-lg shadow-emerald-500/20
                transform transition-all duration-500
                hover:scale-105 hover:border-emerald-500/50
              "
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-emerald-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400/90 text-sm font-medium">Swipe right to view all events</span>
                  <div className="flex items-center">
                    <span className="block w-2 h-2 rounded-full bg-emerald-500/60 animate-ping"></span>
                    <span className="block w-2 h-2 rounded-full bg-emerald-500/60 animate-ping" style={{ animationDelay: '0.2s' }}></span>
                    <span className="block w-2 h-2 rounded-full bg-emerald-500/60 animate-ping" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-emerald-400/80 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <section id="schedule-section" className="py-8 sm:py-16 md:py-24 relative">
      {/* Background */}
      <AnimatedSVG />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          <h2 
            className={`
              text-2xl sm:text-3xl md:text-5xl font-bold
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
          <div className="flex items-center gap-1 sm:gap-2 bg-black/20 rounded-lg p-1 sm:p-1.5 backdrop-blur-sm border border-white/10">
            <button
              onClick={() => setViewMode('timeline')}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300
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
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300
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
              flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12
              transform transition-all duration-1000 delay-300
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            {events.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayChange(index)}
                className={`
                  relative px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-xl transition-all duration-300
                  ${activeDay === index 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'hover:bg-white/5 text-white/60 hover:text-white'}
                `}
              >
                <div className="font-semibold text-xs sm:text-sm md:text-base">{day.day}</div>
                <div className="text-[10px] sm:text-xs md:text-sm opacity-60">{day.date}</div>
                {activeDay === index && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-emerald-500 rounded-full"></div>
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

        {/* Event preview card - Hide on mobile */}
        {previewEvent && isClient && window.innerWidth >= 768 && (
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