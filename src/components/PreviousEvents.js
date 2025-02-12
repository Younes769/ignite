"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const events = [
  {
    name: "Enigma",
    type: "Ideathon + Startups Exhibition",
    description:
      "a startup exhibition and a ideathon challenging participants to think outside the box",
    year: "2024",
    stats: { participants: "60+", teams: "13+" },
    images: [
      "/events/enigma-1.jpg", // Hero image
      "/events/enigma-2.jpg", // Featured image
      "/events/enigma-3.jpg", // Featured image
      "/events/enigma-4.jpg",
      "/events/enigma-5.jpg",
      "/events/enigma-6.jpg",
      "/events/enigma-7.jpg",
      "/events/enigma-8.jpg",
      "/events/enigma-9.jpg",
    ],
    videos: [
      {
        url: "/events/participants_and_exhibitors_feeds.mp4",
        thumbnail: "/events/enigma-thumb1.jpg",
        title: "participants and exhibitors feeds",
      },
      {
        url: "/events/enigma-video2.mp4",
        thumbnail: "/events/enigma-thumb2.jpg",
        title: "Team Showcase",
      },
      {
        url: "/events/exhibition.mp4",
        thumbnail: "/events/enigma-thumb3.jpg",
        title: "startups exhibition",
      },
    ],
  },
  {
    name: "NCSHack",
    type: "Hackathon",
    description:
      "National-level hackathon focusing on solving real-world problems",
    year: "2024",
    stats: { participants: "60+", projects: "12+" },
    images: [
      "/events/ncshack-1.jpg", // Hero image
      "/events/ncshack-2.jpg", // Featured image
      "/events/ncshack-3.jpg", // Featured image
      "/events/ncshack-4.jpg",
      "/events/ncshack-5.jpg",
      "/events/ncshack-6.jpg",
      "/events/ncshack-7.jpg",
      "/events/ncshack-8.jpg",
      "/events/ncshack-9.jpg",
    ],
  },
  {
    name: "DevImpact",
    type: "Hackathon",
    description:
      "A 48-hour hackathon where developers turned innovative ideas into reality",
    year: "2025",
    stats: { participants: "50+", projects: "10+" },
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

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        // Close modal when clicking the backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video player */}
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            key={video.url} // Force video reload when source changes
            controls
            autoPlay
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain"
            onError={(e) => {
              console.error("Video playback error:", e);
              // You might want to show an error message to the user here
            }}
          >
            <source
              src={video.url}
              type={`video/${video.url.split(".").pop().toLowerCase()}`}
            />
            {/* Fallback message */}
            <p className="text-white text-center p-4">
              Your browser doesn't support this video format. Please try a
              different browser or download the video to watch it.
            </p>
          </video>
        </div>

        {/* Video title */}
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold text-white">{video.title}</h3>
        </div>
      </div>
    </div>
  );
};

const PreviousEvents = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
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

          {/* Event content */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Event details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {events[activeEvent].name}
                </h3>
                <p className="text-orange-400">{events[activeEvent].type}</p>
              </div>
              <p className="text-white/60">{events[activeEvent].description}</p>
              <div className="flex gap-8">
                {Object.entries(events[activeEvent].stats).map(
                  ([key, value]) => (
                    <div key={key}>
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

            {/* Image gallery */}
            <div className="grid grid-cols-6 gap-4">
              {events[activeEvent].images.map((image, index) => (
                <div
                  key={index}
                  className={`relative group overflow-hidden rounded-lg ${
                    events[activeEvent].name === "NCSHack"
                      ? index === 0 || index === 1
                        ? "col-span-3 row-span-2 aspect-[16/9]" // Two large images for NCSHack
                        : "col-span-2 aspect-square" // Rest of the images
                      : index === 0
                      ? "col-span-4 row-span-2 aspect-[16/9]" // First image large for other events
                      : index === 1 || index === 2
                      ? "col-span-2 row-span-1 aspect-square" // Second and third images medium
                      : "col-span-2 aspect-square" // Rest of the images
                  }`}
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <Image
                    src={image}
                    alt={`${events[activeEvent].name} event`}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
                      hoveredImage === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Videos section - Only for Enigma */}
            {events[activeEvent].name === "Enigma" &&
              events[activeEvent].videos && (
                <div className="col-span-1 md:col-span-2 mt-8">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Event Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events[activeEvent].videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <div
                          className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
                          onClick={() => setSelectedVideo(video)}
                        >
                          {/* Video thumbnail */}
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-orange-500/90 group-hover:bg-orange-500 flex items-center justify-center transition-colors">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-white/80 group-hover:text-orange-400 transition-colors">
                          {video.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};

export default PreviousEvents;
