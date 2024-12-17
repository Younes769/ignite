const stats = [
  { number: "72h", label: "Non-stop Innovation" },
  { number: "0", label: "Innovators" },
  { number: "15", label: "Mentors" },
  { number: "0", label: "Industry Partners" }
];

const Stats = () => {
  return (
    <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="relative group">
          <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
          <div className="relative text-center p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats; 