"use client";

import { useState } from "react";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";

const tiers = {
  gold: {
    title: "Gold",
    gradient: "from-yellow-300 via-amber-400 to-yellow-300",
    borderGlow:
      "group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-amber-500/30",
    borderColor: "border-amber-500/30",
    glowColor: "from-amber-500/40 via-yellow-500/40 to-amber-500/40",
    size: "col-span-2",
  },
  silver: {
    title: "Silver",
    gradient: "from-gray-200 via-gray-100 to-gray-200",
    borderGlow:
      "group-hover:shadow-[0_0_25px_-5px] group-hover:shadow-gray-400/30",
    borderColor: "border-gray-400/30",
    glowColor: "from-gray-400/40 via-gray-300/40 to-gray-400/40",
    size: "col-span-1",
  },
  bronze: {
    title: "Bronze",
    gradient: "from-amber-700 via-amber-600 to-amber-700",
    borderGlow:
      "group-hover:shadow-[0_0_20px_-5px] group-hover:shadow-amber-800/30",
    borderColor: "border-amber-700/30",
    glowColor: "from-amber-800/40 via-amber-700/40 to-amber-800/40",
    size: "col-span-1",
  },
};

const SponsorCard = ({ name, logo, tier }) => {
  const style = tiers[tier];

  return (
    <div className={`group relative ${style.size}`}>
      <div
        className={`absolute -inset-[1px] bg-gradient-to-r ${style.glowColor} rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`}
      />
      <div
        className={`relative h-24 bg-black/40 backdrop-blur-sm overflow-hidden border ${style.borderColor} rounded-lg p-3 transition-all duration-500 ${style.borderGlow} hover:scale-[1.02] hover:-translate-y-0.5`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${style.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />
          <span
            className={`text-sm bg-gradient-to-r ${style.gradient} bg-clip-text text-transparent font-medium`}
          >
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

const TierSection = ({ title, gradient, sponsors, tier }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <div className="relative h-6 flex items-center">
        <span
          className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent relative z-10`}
        >
          {title}
        </span>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-5 blur-sm`}
        />
      </div>
      <div className="relative h-px flex-grow bg-gradient-to-r from-orange-500/30 to-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-orange-500/30 animate-shine" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sponsors.map((sponsor, index) => (
        <SponsorCard key={index} {...sponsor} tier={tier} />
      ))}
    </div>
  </div>
);

const ContactModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-md transform transition-all">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur" />
      <div className="relative bg-black/80 border border-orange-500/20 rounded-xl p-4 sm:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Let's Connect
          </h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Phone Numbers */}
          <div className="group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur" />
              <div className="relative block w-full p-3 sm:p-4 bg-black/50 hover:bg-black/40 border border-orange-500/20 rounded-lg transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60 mb-2">Contact us at:</p>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="tel:0553383984"
                          className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-orange-400 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          0553383984
                        </a>
                      </li>
                      <li>
                        <a
                          href="tel:0562229663"
                          className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-orange-400 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          0562229663
                        </a>
                      </li>
                      <li>
                        <a
                          href="tel:0791369238"
                          className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-orange-400 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          0791369238
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur" />
              <a
                href="mailto:numidiacomputersociety@gmail.com"
                className="relative block w-full p-3 sm:p-4 bg-black/50 hover:bg-black/40 border border-orange-500/20 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60 mb-1">Email us at:</p>
                    <p className="text-sm sm:text-base text-white break-all sm:break-normal hover:text-orange-400 transition-colors">
                      numidiacomputersociety@gmail.com
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Download Button */}
          <div className="group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity blur" />
              <a
                href="IGNITE_Sponsoring_Prop.pdf"
                download
                className="relative block w-full p-3 sm:p-4 bg-black/50 hover:bg-black/40 border border-orange-500/20 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg shrink-0">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/60">Download our</p>
                    <p className="text-sm sm:text-base text-white">
                      Sponsorship Package
                    </p>
                  </div>
                  <div className="text-orange-500">
                    <svg
                      className="w-5 h-5 transform group-hover:translate-y-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 sm:gap-4 pt-2">
            <a
              href="https://discord.gg/DGDBBa6n8d"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-black/30 border border-orange-500/20 hover:border-orange-500/40 rounded-lg text-orange-500 hover:text-orange-400 transition-colors"
            >
              <FaDiscord className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.instagram.com/ncs._club/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-black/30 border border-orange-500/20 hover:border-orange-500/40 rounded-lg text-orange-500 hover:text-orange-400 transition-colors"
            >
              <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/numidia-computer-society/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 bg-black/30 border border-orange-500/20 hover:border-orange-500/40 rounded-lg text-orange-500 hover:text-orange-400 transition-colors"
            >
              <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Sponsors = () => {
  const [showContact, setShowContact] = useState(false);

  const sponsorsByTier = {
    gold: [{ name: "Gold Sponsor 1", logo: "/logo_placeholder.png" }],
    silver: [
      { name: "Silver Sponsor 1", logo: "/logo_placeholder.png" },
      { name: "Silver Sponsor 2", logo: "/logo_placeholder.png" },
    ],
    bronze: [
      { name: "Bronze Sponsor 1", logo: "/logo_placeholder.png" },
      { name: "Bronze Sponsor 2", logo: "/logo_placeholder.png" },
      { name: "Bronze Sponsor 3", logo: "/logo_placeholder.png" },
    ],
  };

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-red-500/5 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-amber-500/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold inline-flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <span className="relative">
              <span className="absolute -inset-1 bg-orange-500/20 blur-sm rounded-lg" />
              <span className="relative bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                our sponsors
              </span>
            </span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          </h2>
        </div>

        <div className="space-y-8">
          {Object.entries(tiers).map(
            ([key, tier]) =>
              sponsorsByTier[key].length > 0 && (
                <TierSection
                  key={key}
                  title={tier.title}
                  gradient={tier.gradient}
                  sponsors={sponsorsByTier[key]}
                  tier={key}
                />
              )
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setShowContact(true)}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 bg-black/30 border border-orange-500/30 hover:border-orange-500/50 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_-5px] hover:shadow-orange-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-sm bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent font-medium">
              Become a Partner
            </span>
            <svg
              className="w-4 h-4 text-orange-500 group-hover:text-orange-400 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </section>
  );
};

export default Sponsors;
