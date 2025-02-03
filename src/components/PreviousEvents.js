"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const events = [
  {
    name: "DevImpact",
    type: "Hackathon",
    description:
      "A 48-hour hackathon where developers turned innovative ideas into reality",
    year: "2025",
    stats: { participants: "50+", projects: "40+" },
    images: [
      "/events/devimpact-1.jpg",
      "/events/devimpact-2.jpg",
      "/events/devimpact-3.jpg",
      "/events/devimpact-4.jpg",
      "/events/devimpact-5.jpg",
      "/events/devimpact-6.jpg",
    ],
  },
  {
    name: "NCSHack",
    type: "Hackathon",
    description:
      "National-level hackathon focusing on solving real-world problems",
    year: "2024",
    stats: { participants: "70+", projects: "50+" },
    images: [
      "/events/ncshack-1.jpg",
      "/events/ncshack-2.jpg",
      "/events/ncshack-3.jpg",
      "/events/ncshack-4.jpg",
      "/events/ncshack-5.jpg",
      "/events/ncshack-6.jpg",
    ],
  },
  {
    name: "Enigma",
    type: "Ideathon",
    description:
      "Innovation-focused ideathon challenging participants to think outside the box",
    year: "2024",
    stats: { participants: "60+", teams: "30+" },
    images: [
      "/events/enigma-1.jpg",
      "/events/enigma-2.jpg",
      "/events/enigma-3.jpg",
      "/events/enigma-4.jpg",
      "/events/enigma-5.jpg",
      "/events/enigma-6.jpg",
    ],
  },
  {
    name: "Arena 1.0",
    type: "Problem Solving",
    description: "First edition of the competitive programming championship",
    year: "2024",
    stats: { participants: "60+", challenges: "11+" },
    images: [
      "/events/arena1-1.jpg",
      "/events/arena1-2.jpg",
      "/events/arena1-3.jpg",
      "/events/arena1-4.jpg",
      "/events/arena1-5.jpg",
      "/events/arena1-6.jpg",
    ],
  },
  {
    name: "Arena 2.0",
    type: "Problem Solving",
    description:
      "Enhanced competitive programming and problem-solving championship",
    year: "2024",
    stats: { participants: "60+", challenges: "10+" },
    images: [
      "/events/arena-1.jpg",
      "/events/arena-2.jpg",
      "/events/arena-3.jpg",
      "/events/arena-4.jpg",
      "/events/arena-5.jpg",
      "/events/arena-6.jpg",
    ],
  },
];

const PreviousEvents = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const windowSize = useWindowSize();

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      // minimum swipe distance
      if (diff > 0 && activeEvent < events.length - 1) {
        setActiveEvent((prev) => prev + 1);
      } else if (diff < 0 && activeEvent > 0) {
        setActiveEvent((prev) => prev - 1);
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const nextEvent = () => {
    if (activeEvent < events.length - 1) {
      setActiveEvent((prev) => prev + 1);
    }
  };

  const prevEvent = () => {
    if (activeEvent > 0) {
      setActiveEvent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("previous-events");
    if (element) {
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <section
      id="previous-events"
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Artistic background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-black to-black"></div>
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.15),_transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            Previous Events
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Explore our past events that have inspired innovation and creativity
          </p>
        </div>

        {/* Events showcase */}
        <div className="relative">
          {/* Mobile navigation arrows */}
          <div className="flex flex-col items-center gap-4 mb-6 sm:hidden">
            <div className="flex items-center justify-between w-full">
              <button
                onClick={prevEvent}
                className={`p-2 rounded-full bg-orange-500/10 text-orange-400 ${
                  activeEvent === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-500/20"
                }`}
                disabled={activeEvent === 0}
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveEvent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeEvent === index
                        ? "bg-orange-500 w-4"
                        : "bg-orange-500/20 hover:bg-orange-500/40"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextEvent}
                className={`p-2 rounded-full bg-orange-500/10 text-orange-400 ${
                  activeEvent === events.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-500/20"
                }`}
                disabled={activeEvent === events.length - 1}
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-white/40">
              Swipe or tap dots to navigate
            </p>
          </div>

          {/* Event navigation - visible on desktop */}
          <div className="hidden sm:flex justify-center gap-4 mb-16 overflow-x-auto hide-scrollbar">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveEvent(index)}
                className={`
                  px-6 py-3 rounded-xl transition-all duration-300
                  ${
                    activeEvent === index
                      ? "bg-orange-500/20 text-orange-400"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                <div className="font-semibold whitespace-nowrap">
                  {event.name}
                </div>
                <div className="text-sm opacity-60">{event.year}</div>
              </button>
            ))}
          </div>

          {/* Event details with touch handlers */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Event information */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-medium">
                {events[activeEvent].type}
              </div>
              <h3 className="text-3xl font-bold text-white">
                {events[activeEvent].name}
              </h3>
              <p className="text-lg text-white/70">
                {events[activeEvent].description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(events[activeEvent].stats).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-orange-400">
                        {value}
                      </div>
                      <div className="text-sm text-white/60 capitalize">
                        {key}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Event images - Artistic Grid */}
            <div className="relative group">
              <div className="grid grid-cols-3 gap-4 relative">
                {events[activeEvent].images.map((image, index) => (
                  <div
                    key={index}
                    className={`
                      relative rounded-lg overflow-hidden transform transition-all duration-500
                      hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-orange-500/20
                      ${index === 0 ? "col-span-2 row-span-2" : ""}
                      ${index === 5 ? "col-span-2" : ""}
                      ${index === 1 || index === 2 ? "hover:rotate-2" : ""}
                      ${index === 3 || index === 4 ? "hover:-rotate-2" : ""}
                    `}
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <div
                      className={`${
                        index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${events[activeEvent].name} event`}
                        fill
                        className={`
                          object-cover transition-all duration-500
                          ${hoveredImage === index ? "scale-110" : "scale-100"}
                        `}
                      />
                      <div
                        className={`
                          absolute inset-0 transition-opacity duration-300
                          bg-gradient-to-t from-black/50 via-black/30 to-transparent
                          ${
                            hoveredImage === index ? "opacity-100" : "opacity-0"
                          }
                        `}
                      />
                      <div
                        className={`
                          absolute inset-0 transition-opacity duration-300
                          bg-orange-500/10
                          ${
                            hoveredImage === index ? "opacity-100" : "opacity-0"
                          }
                        `}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Artistic overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(249,115,22,0.1)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviousEvents;
