"use client";

import { useState } from "react";
import Countdown from "./Countdown";
import RegistrationForm from "./RegistrationForm";

const Hero = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState("ideathon");

  const handleRegistrationClick = (type) => {
    setRegistrationType(type);
    setIsRegistrationOpen(true);
  };

  return (
    <section className="relative min-h-[120vh] sm:min-h-screen flex items-start sm:items-center justify-center py-24 sm:py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="block text-white mb-4">Where</span>
            <span className="block text-orange-500 mb-4">Ideas</span>
            <span className="block text-white">Ignite Innovation</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              IGNITE
            </span>{" "}
            - Spark Your Ideas, Light Up Tomorrow
          </p>

          {/* Countdown Timer */}
          <Countdown />

          {/* CTA Buttons */}
          <div className="space-y-8 mb-32 sm:mb-48">
            {/* Event Timeline Indicator */}
            <div className="flex justify-center items-center gap-2 text-sm text-white/60">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                Day 1
              </span>
              <span className="w-12 h-px bg-gradient-to-r from-orange-500/20 to-orange-500/10"></span>
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
                Day 2-3
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 justify-center items-center">
              <div className="relative group w-full sm:w-auto">
                <button
                  disabled
                  className="px-8 py-4 bg-gray-500/20 text-gray-400 font-semibold rounded-lg text-lg w-full sm:w-auto cursor-not-allowed"
                >
                  Register for Startup Track
                  <span className="block text-xs mt-1 text-gray-500">
                    Day 1 - Registrations Closed
                  </span>
                </button>
              </div>

              <div className="relative group w-full sm:w-auto">
                <button
                  disabled
                  className="px-8 py-4 bg-gray-500/20 text-gray-400 font-semibold rounded-lg text-lg w-full sm:w-auto cursor-not-allowed"
                >
                  Register for Ideathon Track
                  <span className="block text-xs mt-1 text-gray-500">
                    Day 2-3 - Registrations Closed
                  </span>
                </button>
              </div>
            </div>

            {/* Optional: Add a message about registrations being closed */}
            <div className="text-center text-gray-400 text-sm">
              <p>Registrations are now closed. Thank you for your interest!</p>
              <p className="text-xs mt-1">Stay tuned for future events.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        type={registrationType}
      />
    </section>
  );
};

export default Hero;
