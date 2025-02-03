"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const sponsors = [
  {
    name: "Sponsor 1",
    logo: "/logo_placeholder.png",
    type: "gold",
  },
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
];

const Sponsors = () => {
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

    const element = document.getElementById("sponsors-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="sponsors" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Sponsors
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Proud partners who make this event possible
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {/* Add your sponsor logos here */}
          {[1, 2, 3, 4].map((sponsor) => (
            <div
              key={sponsor}
              className="w-full max-w-[200px] aspect-[3/2] bg-white/5 rounded-lg flex items-center justify-center p-6 hover:bg-white/10 transition-colors"
            >
              <div className="text-white/30 text-sm">Sponsor Logo</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
