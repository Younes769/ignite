"use client";

import { useState } from "react";
import Countdown from "./Countdown";
import RegistrationForm from "./RegistrationForm";

const Hero = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="block text-white mb-4">Where</span>
            <span className="block text-orange-500 mb-4">Ideas</span>
            <span className="block text-white">Ignite Innovation</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ignite One - The New Event
          </p>

          {/* Countdown Timer */}
          <Countdown />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg text-lg hover:bg-orange-600 transition-colors w-full sm:w-auto"
            >
              Register Now
            </button>
            <a
              href="#about"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg text-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </section>
  );
};

export default Hero;
