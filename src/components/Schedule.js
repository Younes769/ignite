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

  const renderTimeline = () => {
    const getExactTimePosition = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const startMinutes = 8 * 60;
      const totalDayMinutes = 16 * 60;
      return ((totalMinutes - startMinutes) / totalDayMinutes) * 100;
    };

    const sortedEvents = [...events[activeDay].events].sort((a, b) => {
      const timeA = getExactTimePosition(a.time);
      const timeB = getExactTimePosition(b.time);
      return timeA - timeB;
    });

    // Enhanced lane assignment with dynamic height calculation
    const assignLanesAndHeights = (events) => {
      const lanes = [];
      const eventHeights = new Map();
      const MIN_GAP = 6.25; // Minimum gap percentage (one hour = 6.25% of timeline)
      const BASE_HEIGHT = 80;

      events.forEach((event, index) => {
        const eventStart = getExactTimePosition(event.time);
        const eventEnd = eventStart + (event.duration / (16 * 60)) * 100;

        // Check proximity to previous and next events
        const prevEvent = events[index - 1];
        const nextEvent = events[index + 1];
        
        let heightReduction = 0;
        let verticalOffset = 0;
        
        // Calculate gap to previous event
        if (prevEvent) {
          const prevStart = getExactTimePosition(prevEvent.time);
          const gap = Math.abs(eventStart - prevStart);
          
          // Adjust height and position based on gap size
          if (gap <= MIN_GAP) { // One hour or less difference
            heightReduction = BASE_HEIGHT * 0.5;
            if (eventStart > prevStart) {
              verticalOffset = 3; // Push down current event
            } else {
              verticalOffset = -3; // Push up current event
            }
          } else if (gap <= MIN_GAP * 1.5) { // 1.5 hours difference
            heightReduction = BASE_HEIGHT * 0.3;
            if (eventStart > prevStart) {
              verticalOffset = 2;
            } else {
              verticalOffset = -2;
            }
          }
        }

        // Calculate gap to next event
        if (nextEvent) {
          const nextStart = getExactTimePosition(nextEvent.time);
          const gap = Math.abs(nextStart - eventStart);
          
          // Adjust height based on gap to next event
          if (gap <= MIN_GAP) {
            heightReduction = Math.max(heightReduction, BASE_HEIGHT * 0.5);
          } else if (gap <= MIN_GAP * 1.5) {
            heightReduction = Math.max(heightReduction, BASE_HEIGHT * 0.3);
          }
        }

        // Calculate final height and store vertical offset
        const finalHeight = Math.max(BASE_HEIGHT - heightReduction, 45);
        eventHeights.set(event, finalHeight);
        event.verticalOffset = verticalOffset;

        // Find first available lane with increased spacing
        let laneIndex = 0;
        while (true) {
          if (!lanes[laneIndex]) {
            lanes[laneIndex] = [{ event, start: eventStart, end: eventEnd }];
            event.lane = laneIndex;
            break;
          }

          const canUseLane = lanes[laneIndex].every(
            occupyingEvent =>
              eventEnd <= occupyingEvent.start - MIN_GAP/2 || 
              eventStart >= occupyingEvent.end + MIN_GAP/2
          );

          if (canUseLane) {
            lanes[laneIndex].push({ event, start: eventStart, end: eventEnd });
            event.lane = laneIndex;
            break;
          }

          laneIndex++;
        }
      });

      return { totalLanes: lanes.length, eventHeights };
    };

    const { totalLanes, eventHeights } = assignLanesAndHeights(sortedEvents);

    return (
      <div className="relative">
        {/* Time indicators - Made responsive */}
        <div className="absolute left-0 top-0 h-full w-12 sm:w-20 flex flex-col justify-between text-[10px] sm:text-xs text-white/40">
          {[...Array(17)].map((_, i) => (
            <div key={i} className="relative">
              <div className="absolute -right-2 sm:-right-4 w-1 sm:w-2 h-px bg-white/10"></div>
              {`${(i + 8).toString().padStart(2, '0')}:00`}
            </div>
          ))}
        </div>

        {/* Events on timeline - Made responsive */}
        <div 
          className={`
            relative ml-16 sm:ml-24 h-[600px] sm:h-[800px] transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}
        >
          <div className="absolute left-0 top-0 bottom-0 w-px bg-emerald-500/20" />

          {sortedEvents.map((event, index) => {
            const topPosition = getExactTimePosition(event.time);
            
            return (
              <div
                key={index}
                className="absolute w-full"
                style={{
                  top: `${topPosition}%`,
                  transform: `translateY(-${event.verticalOffset || 0}rem)`
                }}
              >
                {/* Event card - Made responsive */}
                <div 
                  className={`
                    group relative ml-4 sm:ml-8
                    transform transition-all duration-300
                    hover:translate-x-1
                  `}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {/* Time marker */}
                  <div className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 flex items-center">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-emerald-500"></div>
                    <div className="h-px w-2 sm:w-4 bg-emerald-500/50"></div>
                  </div>

                  {/* Event content */}
                  <div 
                    className={`
                      relative inline-block max-w-[calc(100%-2rem)] sm:max-w-md
                      p-3 sm:p-4 rounded-lg
                      bg-white/5 hover:bg-white/10
                      border border-white/10 hover:border-emerald-500/30
                      transition-all duration-300
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon - Made responsive */}
                      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-base sm:text-xl">{event.icon}</span>
                      </div>

                      {/* Text content - Made responsive */}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {event.title}
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-white/60 line-clamp-2">
                          {event.description}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs text-white/40">
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

          {/* Hour grid lines */}
          <div className="absolute inset-0 grid grid-cols-1 gap-[6.25%] -z-10">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="border-l border-white/5" />
            ))}
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