"use client";

import { useEffect, useState, useCallback, memo } from "react";
import AnimatedSVG from "./AnimatedSVG";
import { useWindowSize } from "@/hooks/useWindowSize";

const events = [
  {
    day: "Day 1",
    date: "February 20, 2024",
    events: [
      {
        time: "09:00",
        title: "Registration & Check-in",
        description: "Welcome to EGNITE! Get your badges and event materials",
        icon: "✍️",
        duration: 60,
      },
      {
        time: "10:00",
        title: "Opening Ceremony",
        description: "Welcome address and kickoff of EGNITE Startup Showcase",
        icon: "🎭",
        duration: 45,
      },
      {
        time: "11:00",
        title: "Startup Showcase Opens",
        description:
          "Explore innovative startups at their dedicated spaces, interact with founders and representatives",
        icon: "🚀",
        duration: 180,
      },
      {
        time: "12:30",
        title: "Lunch Break",
        description:
          "Network with startup representatives and fellow participants while enjoying lunch",
        icon: "🍽️",
        duration: 60,
      },
      {
        time: "13:30",
        title: "Startup Showcase Continues",
        description:
          "Continue exploring startup booths and engaging in discussions",
        icon: "💡",
        duration: 150,
      },
      {
        time: "16:00",
        title: "Networking Session",
        description:
          "Open networking with startup founders, representatives, and fellow participants",
        icon: "🤝",
        duration: 60,
      },
      {
        time: "17:00",
        title: "Ideathon Introduction",
        description: "Overview of the ideathon challenge and rules",
        icon: "📋",
        duration: 60,
      },
      {
        time: "18:00",
        title: "Day 1 Wrap-up",
        description:
          "Summary of the day and preparation for tomorrow's ideathon",
        icon: "🌅",
        duration: 30,
      },
    ],
  },
  {
    day: "Day 2",
    date: "February 21, 2024",
    events: [
      {
        time: "09:00",
        title: "Ideathon Kickoff",
        description: "Form teams and begin brainstorming innovative solutions",
        icon: "🚀",
        duration: 60,
      },
      {
        time: "10:00",
        title: "Ideation Phase",
        description: "Teams work on developing their innovative ideas",
        icon: "💭",
        duration: 120,
      },
      {
        time: "12:00",
        title: "Lunch Break",
        description: "Refuel and quick team discussions",
        icon: "🍽️",
        duration: 60,
      },
      {
        time: "13:00",
        title: "Mentorship Sessions",
        description: "One-on-one sessions with industry mentors",
        icon: "👥",
        duration: 180,
      },
      {
        time: "16:00",
        title: "Progress Check-in",
        description: "Teams present their progress and receive feedback",
        icon: "📊",
        duration: 90,
      },
      {
        time: "17:30",
        title: "Continue Working",
        description: "Teams refine their ideas based on feedback",
        icon: "⚡",
        duration: 90,
      },
      {
        time: "19:00",
        title: "Day 2 Wrap-up",
        description: "Review of progress and preparation for final day",
        icon: "🌅",
        duration: 30,
      },
    ],
  },
  {
    day: "Day 3",
    date: "February 22, 2024",
    events: [
      {
        time: "09:00",
        title: "Final Sprint",
        description: "Teams finalize their solutions and presentations",
        icon: "🏃",
        duration: 120,
      },
      {
        time: "11:00",
        title: "Presentation Prep",
        description: "Teams prepare their final pitches",
        icon: "🎯",
        duration: 60,
      },
      {
        time: "12:00",
        title: "Lunch Break",
        description: "Final break before presentations",
        icon: "🍽️",
        duration: 60,
      },
      {
        time: "13:00",
        title: "Final Presentations",
        description: "Teams present their innovative solutions to judges",
        icon: "🎤",
        duration: 180,
      },
      {
        time: "16:00",
        title: "Judging & Deliberation",
        description: "Judges evaluate presentations while teams network",
        icon: "⚖️",
        duration: 60,
      },
      {
        time: "17:00",
        title: "Awards Ceremony",
        description: "Announcement of winners and prize distribution",
        icon: "🏆",
        duration: 60,
      },
      {
        time: "18:00",
        title: "Closing Ceremony",
        description: "Farewell address and celebration of achievements",
        icon: "🎉",
        duration: 30,
      },
    ],
  },
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

// Memoized sub-components
const TimeIndicator = memo(({ hour, position }) => (
  <div
    className="absolute flex items-center"
    style={{
      top: `calc(${position}% + 48px)`,
      transform: "translateY(-50%)",
    }}
  >
    <div className="w-14 xs:w-16 md:w-24 text-right pr-2 md:pr-4 opacity-60">
      {`${hour.toString().padStart(2, "0")}:00`}
    </div>
    <div className="w-2 h-px bg-white/10"></div>
  </div>
));

const EventCard = memo(({ event, dimensions, isHovered, onHover }) => {
  const topPosition =
    ((parseInt(event.time.split(":")[0]) * 60 +
      parseInt(event.time.split(":")[1]) -
      480) /
      (18 * 60)) *
    100;
  const laneOffset =
    8 + event.lane * (dimensions.width + dimensions.laneSpacing);
  const markerWidth =
    dimensions.markerWidth +
    event.lane * (dimensions.width + dimensions.laneSpacing);

  return (
    <div
      className="absolute transform gpu-accelerated"
      style={{
        top: `calc(${topPosition}% + 48px)`,
        left: `${laneOffset}px`,
        width: `${dimensions.width}px`,
        transform: "translateY(-50%)",
        zIndex: isHovered ? 10 : 1,
      }}
    >
      <div
        className="group relative ml-4 xs:ml-6 md:ml-8 transform transition-transform duration-300 hover:translate-x-1 gpu-accelerated"
        onMouseEnter={() => onHover(event)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Time marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex items-center"
          style={{
            width: `${
              dimensions.markerWidth +
              event.lane * (dimensions.width + dimensions.laneSpacing)
            }px`,
            left: `-${
              dimensions.markerWidth +
              event.lane * (dimensions.width + dimensions.laneSpacing)
            }px`,
          }}
        >
          <div className="h-px w-full bg-gradient-to-r from-orange-500 via-orange-500/80 to-orange-500/50"></div>
        </div>

        {/* Event content */}
        <div
          className={`
            p-2 xs:p-2.5 md:p-3 rounded-lg
            ${
              isHovered
                ? "bg-white/10 border-orange-500/30 shadow-lg shadow-orange-500/10"
                : "bg-white/5 border-white/10"
            }
            border transition-all duration-300 backdrop-blur-sm
          `}
        >
          <div className="flex items-start gap-1.5 xs:gap-2">
            <div className="w-5 h-5 xs:w-6 xs:h-6 md:w-8 md:h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm xs:text-base md:text-lg">
                {event.icon}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-[10px] xs:text-xs md:text-sm text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                {event.title}
              </div>
              <div className="mt-1 text-[10px] xs:text-xs md:text-sm text-white/90 leading-relaxed line-clamp-2">
                {event.description}
              </div>
              <div className="mt-1.5 md:mt-2 flex items-center gap-1 md:gap-2 text-[8px] xs:text-[10px] md:text-xs text-white/40">
                <span>{event.time}</span>
                <span>•</span>
                <span>
                  {Math.floor(event.duration / 60)}h
                  {event.duration % 60 ? `${event.duration % 60}m` : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Move dimensions to a separate config
const DIMENSIONS = {
  mobile: {
    width: 260,
    markerWidth: 24,
    laneSpacing: 32,
  },
  desktop: {
    width: 320,
    markerWidth: 32,
    laneSpacing: 40,
  },
};

const Schedule = () => {
  const isClient = useIsClient();
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [viewMode, setViewMode] = useState("timeline");
  const [previewEvent, setPreviewEvent] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dimensions, setDimensions] = useState(DIMENSIONS.mobile);
  const windowSize = useWindowSize();

  // Update dimensions based on window size
  useEffect(() => {
    if (windowSize.width) {
      setDimensions(
        windowSize.width < 768 ? DIMENSIONS.mobile : DIMENSIONS.desktop
      );
    }
  }, [windowSize.width]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("schedule-section");
    if (element) {
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, []);

  const handleDayChange = useCallback((index) => {
    setActiveDay(index);
  }, []);

  // Calculate positions once for each event
  const getEventPositions = useCallback(
    (event, index, laneIndex) => {
      const [hours, minutes] = event.time.split(":").map(Number);
      const topPosition = ((hours * 60 + minutes - 480) / (18 * 60)) * 100;
      const laneOffset =
        8 + laneIndex * (dimensions.width + dimensions.laneSpacing);
      const markerWidth =
        dimensions.markerWidth +
        laneIndex * (dimensions.width + dimensions.laneSpacing);

      return {
        top: `calc(${topPosition.toFixed(6)}% + 48px)`,
        left: `${laneOffset}px`,
        width: `${dimensions.width}px`,
        markerWidth: `${markerWidth}px`,
        markerLeft: `-${markerWidth}px`,
      };
    },
    [dimensions]
  );

  // Render timeline with memoized calculations
  const renderTimeline = useCallback(() => {
    const sortedEvents = [...events[activeDay].events].sort((a, b) => {
      const [hoursA, minutesA] = a.time.split(":").map(Number);
      const [hoursB, minutesB] = b.time.split(":").map(Number);
      return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
    });

    // Calculate lanes
    const lanes = new Map();
    sortedEvents.forEach((event) => {
      const [hours, minutes] = event.time.split(":").map(Number);
      const startTime = hours * 60 + minutes;
      const endTime = startTime + event.duration;

      let laneIndex = 0;
      while (true) {
        const lane = lanes.get(laneIndex) || [];
        const canUseLane = lane.every((existing) => {
          const [existingHours, existingMinutes] = existing.time
            .split(":")
            .map(Number);
          const existingStart = existingHours * 60 + existingMinutes;
          const existingEnd = existingStart + existing.duration;
          return endTime + 30 <= existingStart || startTime >= existingEnd + 30;
        });

        if (canUseLane) {
          lane.push(event);
          lanes.set(laneIndex, lane);
          event.lane = laneIndex;
          break;
        }
        laneIndex++;
      }
    });

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
                  top: `calc(${position}% + 48px)`,
                  transform: "translateY(-50%)",
                }}
              >
                <div className="w-14 xs:w-16 md:w-24 text-right pr-2 md:pr-4 opacity-60">
                  {`${hour.toString().padStart(2, "0")}:00`}
                </div>
                <div className="w-2 h-px bg-orange-500/20"></div>
              </div>
            );
          })}
        </div>

        {/* Timeline container with optimized scrolling */}
        <div className="relative ml-16 xs:ml-20 md:ml-28 h-[600px] md:h-[700px] schedule-container">
          <div className="absolute inset-0 overflow-x-auto overflow-y-hidden schedule-timeline hide-scrollbar">
            <div className="relative min-w-[800px] w-full h-full pl-8 pt-12 schedule-content">
              {/* Vertical timeline */}
              <div className="absolute left-8 top-12 bottom-0 w-px bg-orange-500/20" />

              {/* Events */}
              {sortedEvents.map((event, index) => {
                const { top, left, width, markerWidth, markerLeft } =
                  getEventPositions(event, index, event.lane);

                return (
                  <div
                    key={`${event.time}-${index}`}
                    className="absolute schedule-event schedule-optimize"
                    style={{
                      top,
                      left,
                      width,
                      transform: "translateY(-50%)",
                      zIndex: hoveredEvent === event ? 10 : 1,
                    }}
                  >
                    <div
                      className="group relative ml-4 xs:ml-6 md:ml-8 schedule-animate"
                      onMouseEnter={() => setHoveredEvent(event)}
                      onMouseLeave={() => setHoveredEvent(null)}
                    >
                      {/* Time marker */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 flex items-center"
                        style={{
                          width: `${
                            dimensions.markerWidth +
                            event.lane *
                              (dimensions.width + dimensions.laneSpacing)
                          }px`,
                          left: `-${
                            dimensions.markerWidth +
                            event.lane *
                              (dimensions.width + dimensions.laneSpacing)
                          }px`,
                        }}
                      >
                        <div className="h-px w-full bg-gradient-to-r from-orange-500 via-orange-500/80 to-orange-500/50"></div>
                      </div>

                      {/* Event content */}
                      <div
                        className={`
                          p-2 xs:p-2.5 md:p-3 rounded-lg schedule-blur
                          ${
                            hoveredEvent === event
                              ? "bg-white/10 border-orange-500/30 shadow-lg shadow-orange-500/10"
                              : "bg-white/5 border-white/10"
                          }
                          border schedule-animate
                        `}
                      >
                        <div className="flex items-start gap-1.5 xs:gap-2">
                          <div className="w-5 h-5 xs:w-6 xs:h-6 md:w-8 md:h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm xs:text-base md:text-lg">
                              {event.icon}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-[10px] xs:text-xs md:text-sm text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                              {event.title}
                            </div>
                            <div className="mt-1 text-[10px] xs:text-xs md:text-sm text-white/90 leading-relaxed line-clamp-2">
                              {event.description}
                            </div>
                            <div className="mt-1.5 md:mt-2 flex items-center gap-1 md:gap-2 text-[8px] xs:text-[10px] md:text-xs text-white/40">
                              <span>{event.time}</span>
                              <span>•</span>
                              <span>
                                {Math.floor(event.duration / 60)}h
                                {event.duration % 60
                                  ? `${event.duration % 60}m`
                                  : ""}
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
        </div>
      </div>
    );
  }, [activeDay, dimensions, hoveredEvent, isVisible, getEventPositions]);

  const renderCalendar = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
      {events.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className={`
            relative p-6 rounded-xl bg-black/20 border border-white/10 backdrop-blur-sm
            transition-all duration-300 hover:bg-black/30 group
            ${
              activeDay === dayIndex
                ? "border-orange-500/30 shadow-lg shadow-orange-500/10"
                : ""
            }
          `}
        >
          {/* Date header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-lg font-semibold text-white">{day.date}</div>
              <div className="text-sm text-white/60">{day.day}</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <span className="text-2xl">
                {dayIndex === 0 ? "🎉" : dayIndex === 1 ? "💡" : "🏆"}
              </span>
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
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{event.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover/event:text-orange-400 transition-colors">
                        {event.title}
                      </div>
                      <div className="text-sm text-white/60 mt-1">
                        {event.time} ({event.duration} min)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-orange-500/5 rounded-lg opacity-0 group-hover/event:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Background glow */}
          <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="schedule-section"
      className="py-8 sm:py-16 md:py-24 relative overflow-hidden schedule-container art-texture"
    >
      {/* Artistic background elements */}
      <div className="absolute inset-0 art-ink bg-gradient-to-b from-orange-500/10 to-transparent"></div>
      <div className="absolute inset-0 art-brush opacity-20"></div>
      <AnimatedSVG />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 schedule-content relative">
        {/* Header with artistic text */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold art-text">
            Event Schedule
          </h2>

          {/* View toggle with artistic glass effect */}
          <div className="flex items-center gap-2 art-glass rounded-lg p-1.5">
            {["timeline", "calendar"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                  ${
                    viewMode === mode
                      ? "bg-orange-500/20 text-orange-400 art-glow"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Day selector with artistic effects */}
        <div className="flex justify-center gap-4 mb-8 overflow-x-auto hide-scrollbar">
          {events.map((day, index) => (
            <button
              key={index}
              onClick={() => handleDayChange(index)}
              className={`
                  px-6 py-3 rounded-xl schedule-animate flex-shrink-0 art-glass
                  ${
                    activeDay === index
                      ? "bg-orange-500/20 text-orange-400 art-glow"
                      : "text-white/60 hover:text-white"
                  }
                `}
            >
              <div className="font-semibold">{day.day}</div>
              <div className="text-sm opacity-60">{day.date}</div>
            </button>
          ))}
        </div>

        {/* Timeline view with artistic elements */}
        <div className="relative">
          {viewMode === "timeline" ? renderTimeline() : renderCalendar()}
        </div>

        {/* Event preview card - Hide on mobile */}
        {previewEvent && isClient && window.innerWidth >= 768 && (
          <div
            className={`
              fixed bottom-8 right-8 w-80 p-6 rounded-xl
              bg-black/80 border border-white/10 backdrop-blur-xl
              transform transition-all duration-300
              ${
                previewEvent
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }
            `}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{previewEvent.icon}</span>
              <div>
                <div className="font-semibold text-white">
                  {previewEvent.title}
                </div>
                <div className="text-sm text-white/60">{previewEvent.time}</div>
              </div>
            </div>
            <p className="text-sm text-white/80">{previewEvent.description}</p>
            <div className="absolute inset-0 bg-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Schedule);
