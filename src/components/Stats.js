const stats = [
  { number: "20+", label: "Innovative Startups" },
  { number: "3", label: "Days of Innovation" },
  { number: "100+", label: "Expected Participants" },
  { number: "15+", label: "Industry Mentors" },
];

const Stats = () => {
  return (
    <div className="mt-16 sm:mt-32 px-4 sm:px-6 lg:px-8 relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-orange-500/5 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.15),_transparent_70%)]"></div>
      </div>

      {/* Stats grid with dramatic layout */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 transform md:rotate-[-2deg]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group transform transition-all duration-500 hover:rotate-2 hover:scale-110"
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* Dramatic glow effect */}
              <div className="absolute -inset-2 bg-orange-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

              {/* Fire border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-20 transition-all duration-500"></div>

              {/* Main card */}
              <div className="relative overflow-hidden rounded-lg bg-black/50 backdrop-blur-xl border border-white/10 p-6 transition-all duration-500">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Content */}
                <div className="relative">
                  {/* Number with dramatic styling */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
                    <div className="relative text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-br from-white via-orange-200 to-orange-500 bg-clip-text text-transparent transform transition-all duration-500 group-hover:scale-110">
                      {stat.number}
                    </div>
                  </div>

                  {/* Label with enhanced styling */}
                  <div className="text-sm md:text-base text-white/70 font-medium transition-all duration-500 group-hover:text-white">
                    {stat.label}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent transform rotate-45"></div>
                </div>

                {/* Bottom highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Floating particles */}
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-orange-500/60"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${i * 20}%`,
                      animation: `float${(i % 3) + 1} ${
                        2 + i * 0.5
                      }s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced background accents */}
        <div className="absolute -inset-20 -z-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-orange-500/40 blur-lg"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 4) * 25}%`,
                animation: `float${(i % 3) + 1} ${
                  4 + i * 0.5
                }s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
