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
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              IGNITE
            </span>{" "}
            - Spark Your Ideas, Light Up Tomorrow
          </p>

          {/* Countdown Timer */}
          <Countdown />

          {/* CTA Buttons */}
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="relative group w-full sm:w-auto">
              <button
                onClick={() => handleRegistrationClick("ideathon")}
                className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg text-lg hover:bg-orange-600 transition-colors w-full sm:w-auto"
              >
                Join Ideathon
              </button>
              
              <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                <div className="bg-orange-500/10 backdrop-blur-sm p-3 rounded-lg border border-orange-500/20">
                  <p className="text-sm text-white/80">
                    Join teams of innovators to brainstorm and pitch
                    groundbreaking ideas
                  </p>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 rotate-45 bg-orange-500/10 border-l border-b border-orange-500/20"></div>
              </div>
              {/* Mobile description */}
              <div className="text-sm text-white/60 mt-4 block sm:hidden relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-500/10 to-orange-500/5 rounded-lg"></div>
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg"></div>
                <div className="relative p-4 border border-orange-500/20 rounded-lg">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                  <p className="text-white/80">
                    Join teams of innovators to brainstorm and pitch
                    groundbreaking ideas
                  </p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="relative group w-full sm:w-auto">
              <button
                onClick={() => handleRegistrationClick("startup")}
                className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg text-lg hover:bg-orange-600 transition-colors w-full sm:w-auto"
              >
                Startup Track
              </button>
              {/* Desktop tooltip */}
              <div className="absolute top-1/2 -translate-y-1/2 left-full ml-4 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                <div className="bg-orange-500/10 backdrop-blur-sm p-3 rounded-lg border border-orange-500/20">
                  <p className="text-sm text-white/80">
                    Connect with leading companies and startups for exciting
                    career opportunities
                  </p>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 rotate-45 bg-orange-500/10 border-l border-b border-orange-500/20"></div>
              </div>
              {/* Mobile description */}
              <div className="text-sm text-white/60 mt-4 block sm:hidden relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-500/10 to-orange-500/5 rounded-lg"></div>
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg"></div>
                <div className="relative p-4 border border-orange-500/20 rounded-lg">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                  <p className="text-white/80">
                    Connect with leading companies and startups for exciting
                    career opportunities
                  </p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                </div>
              </div>
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
