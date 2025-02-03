export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  activeTab,
  universities,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/30 border border-orange-500/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <select
        value={filters.university}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, university: e.target.value }))
        }
        className="bg-black/30 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
      >
        <option value="all">All Universities</option>
        {universities.map((uni) => (
          <option key={uni} value={uni}>
            {uni}
          </option>
        ))}
      </select>

      {activeTab === "ideathon" && (
        <>
          <select
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, year: e.target.value }))
            }
            className="bg-black/30 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="all">All Years</option>
            {["L1", "L2", "L3", "M1", "M2"].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={filters.hasTeam}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, hasTeam: e.target.value }))
            }
            className="bg-black/30 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
          >
            <option value="all">All Team Status</option>
            <option value="yes">Has Team</option>
            <option value="no">No Team</option>
          </select>
        </>
      )}
    </div>
  );
}
