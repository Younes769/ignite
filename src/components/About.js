"use client";

import { useEffect, useState } from "react";

const About = () => {
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

    const element = document.getElementById("about-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="about-section"
      className="py-16 sm:py-24 md:py-32 relative art-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2
            className={`
              text-4xl md:text-5xl font-bold mb-6
              transform transition-all duration-700
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }
            `}
          >
            About <span className="art-text">IGNITE</span>
          </h2>
          <p
            className={`
              text-xl text-white/70 max-w-3xl mx-auto
              transform transition-all duration-700 delay-100
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }
            `}
          >
            A unique platform where innovation meets opportunity, bringing
            together startups, mentors, and creative minds.
          </p>
        </div>

        {/* Event info */}
        <div
          className={`
            text-center mb-20
            transform transition-all duration-700 delay-200
            ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >
          <p className="text-xl text-white/80">
            A <span className="art-text font-semibold">Three-Day Journey</span>{" "}
            of Innovation
          </p>
          <p className="text-lg text-white/60 mt-2">February 20-22, 2024</p>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {[
            {
              icon: "🚀",
              title: "Day 1: Startup Showcase",
              description:
                "Explore innovative startups, interact with founders, and get inspired by their journeys in our interactive showcase.",
            },
            {
              icon: "💡",
              title: "Day 2-3: Ideathon",
              description:
                "Transform your innovative ideas into impactful solutions with guidance from industry mentors and experts.",
            },
            {
              icon: "🏆",
              title: "Amazing Prizes",
              description:
                "Win exciting prizes, gain recognition, and get opportunities to turn your ideas into reality.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`
                relative art-card rounded-xl
                transform transition-all duration-700
                ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
              `}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="p-6 sm:p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
