"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

// Sponsor tier data
const sponsorTiers = {
  gold: {
    title: "Gold Partners",
    description: "Our premium partners who make innovation possible",
    gradient: "from-amber-500/20 via-amber-400/10 to-amber-500/5",
    borderGradient: "from-amber-500/30 via-amber-400/20 to-amber-500/10",
    glow: "amber",
    sponsors: [
      {
        name: "NIT",
        logo: "/logo_nit_.png",
        type: "gold",
      },
    ],
  },
  silver: {
    title: "Silver Partners",
    description: "Key supporters of our mission",
    gradient: "from-gray-400/20 via-gray-300/10 to-gray-400/5",
    borderGradient: "from-gray-400/30 via-gray-300/20 to-gray-400/10",
    glow: "gray",
    sponsors: [
      {
        name: "Sponsor 2",
        logo: "/logo_placeholder.png",
        type: "silver",
      },
      {
        name: "Sponsor 3",
        logo: "/logo_placeholder.png",
        type: "silver",
      },
    ],
  },
  bronze: {
    title: "Bronze Partners",
    description: "Valuable contributors to our community",
    gradient: "from-orange-700/20 via-orange-600/10 to-orange-700/5",
    borderGradient: "from-orange-700/30 via-orange-600/20 to-orange-700/10",
    glow: "orange",
    sponsors: [
      {
        name: "Sponsor 4",
        logo: "/logo_placeholder.png",
        type: "bronze",
      },
      {
        name: "Sponsor 5",
        logo: "/logo_placeholder.png",
        type: "bronze",
      },
    ],
  },
};

// Contact button component with hover effects
const ContactButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="group mt-8 px-8 py-3 bg-gradient-to-r from-orange-500/20 via-orange-400/20 to-orange-500/20 hover:from-orange-500/30 hover:via-orange-400/30 hover:to-orange-500/30 text-orange-400 rounded-lg border border-orange-500/30 transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    <div className="relative flex items-center gap-2">
      <span>Become a Partner</span>
      <svg
        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </div>
  </button>
);

// Sponsor card component with enhanced animations
const SponsorCard = ({ sponsor, tier }) => (
  <div
    className={`
      relative group p-4 rounded-lg transition-all duration-500 ease-in-out
      bg-gradient-to-b ${
        tier === "gold"
          ? "from-amber-500/10 via-amber-400/5 to-black/50 hover:from-amber-500/20"
          : tier === "silver"
          ? "from-gray-400/10 via-gray-300/5 to-black/50 hover:from-gray-400/20"
          : "from-orange-900/10 via-orange-800/5 to-black/50 hover:from-orange-900/20"
      }
      border ${
        tier === "gold"
          ? "border-amber-500/30"
          : tier === "silver"
          ? "border-gray-400/30"
          : "border-orange-900/30"
      }
      hover:scale-102 hover:shadow-lg backdrop-blur-sm
    `}
  >
    <div className="aspect-[4/3] relative flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        fill
        className="object-contain p-4 drop-shadow-md filter group-hover:brightness-110 transition-all duration-500"
      />
    </div>
    <div className="mt-2 text-center">
      <h4 className="text-sm font-medium text-white/80">{sponsor.name}</h4>
    </div>
  </div>
);

// Contact widget with enhanced design
const ContactWidget = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="relative w-full max-w-lg transform scale-95 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-black/90 border border-orange-500/20 rounded-xl overflow-hidden">
          {/* Subtle gradient borders */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

          <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Partner With Us
              </h3>
              <button
                onClick={onClose}
                className="text-orange-200/60 hover:text-orange-200 transition-colors p-2 hover:bg-orange-500/10 rounded-full"
              >
                ✕
              </button>
            </div>

            <button className="w-full group px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <a
                href="/sponsorship_package.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span className="transform group-hover:-translate-y-1 transition-transform duration-300">
                  Download Sponsorship File
                </span>
              </a>
            </button>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Contact Us
              </h4>

              <a
                href="mailto:numidiacomputersociety@gmail.com"
                className="group flex items-center gap-3 p-3 bg-orange-500/5 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-orange-500/10"
              >
                <FaEnvelope className="relative w-5 h-5 text-orange-500 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="relative text-white group-hover:text-orange-200 transition-colors duration-300">
                  numidiacomputersociety@gmail.com
                </span>
              </a>

              {["0553383984", "0562229663", "0791369238"].map((number) => (
                <a
                  key={number}
                  href={`tel:${number}`}
                  className="group flex items-center gap-3 p-3 bg-orange-500/5 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-orange-500/10"
                >
                  <FaPhone className="relative w-5 h-5 text-orange-500 transform group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative text-white group-hover:text-orange-200 transition-colors duration-300">
                    {number}
                  </span>
                </a>
              ))}

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <FaLinkedin className="w-5 h-5" />,
                    text: "LinkedIn",
                    href: "https://www.linkedin.com/company/numidia-computer-society/",
                  },
                  {
                    icon: <FaInstagram className="w-5 h-5" />,
                    text: "Instagram",
                    href: "https://www.instagram.com/ncs._club/",
                  },
                ].map((social) => (
                  <a
                    key={social.text}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 p-3 bg-orange-500/5 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-orange-500/10"
                  >
                    <span className="relative text-orange-500 transform group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="relative text-white group-hover:text-orange-200 transition-colors duration-300">
                      {social.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Sponsors component
const Sponsors = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContactWidget, setShowContactWidget] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("sponsors-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="sponsors-section" className="py-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 text-transparent bg-clip-text">
            Our Partners
          </h2>
          <p className="text-orange-200/60 max-w-2xl mx-auto">
            Join forces with leading organizations driving innovation and change
          </p>
          <ContactButton onClick={() => setShowContactWidget(true)} />
        </div>

        {/* Sponsor tiers */}
        <div className="space-y-12">
          {Object.entries(sponsorTiers).map(
            ([tier, { title, description, sponsors }]) => (
              <div key={tier} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-orange-200/60 text-sm max-w-2xl mx-auto">
                    {description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sponsors.map((sponsor, index) => (
                    <SponsorCard key={index} sponsor={sponsor} tier={tier} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Contact widget */}
      <ContactWidget
        isOpen={showContactWidget}
        onClose={() => setShowContactWidget(false)}
      />
    </section>
  );
};

export default Sponsors;
