const stats = [
  { number: "+60", label: "Participants" },
  { number: "72", label: "Hours of Innovation" },
  { number: "15+", label: "Teams" },
  { number: "10+", label: "Mentors" }
];

const Stats = () => {
  return (
    <div className="mt-16 sm:mt-32 px-4 sm:px-0">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <div className="relative text-center p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
              <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats; 