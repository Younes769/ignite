export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  activeTab,
  universities,
}) {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-orange-500"
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
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or university..."
          className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-orange-500/20 rounded-lg text-white placeholder-orange-200/40 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/40 transition-colors"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* University Filter */}
        <div className="relative group">
          <label className="block text-sm font-medium text-orange-200/60 mb-1.5">
            University
          </label>
          <div className="relative">
            <select
              value={filters.university}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, university: e.target.value }))
              }
              className="w-full pl-4 pr-10 py-2.5 bg-black/50 border border-orange-500/20 rounded-lg text-white appearance-none focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/40 transition-colors"
            >
              <option value="all">All Universities</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Year Filter - Only for Ideathon */}
        {activeTab === "ideathon" && (
          <div className="relative group">
            <label className="block text-sm font-medium text-orange-200/60 mb-1.5">
              Year of Study
            </label>
            <div className="relative">
              <select
                value={filters.year}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, year: e.target.value }))
                }
                className="w-full pl-4 pr-10 py-2.5 bg-black/50 border border-orange-500/20 rounded-lg text-white appearance-none focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/40 transition-colors"
              >
                <option value="all">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Team Filter - Only for Ideathon */}
        {activeTab === "ideathon" && (
          <div className="relative group">
            <label className="block text-sm font-medium text-orange-200/60 mb-1.5">
              Team Status
            </label>
            <div className="relative">
              <select
                value={filters.hasTeam}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, hasTeam: e.target.value }))
                }
                className="w-full pl-4 pr-10 py-2.5 bg-black/50 border border-orange-500/20 rounded-lg text-white appearance-none focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/40 transition-colors"
              >
                <option value="all">All</option>
                <option value="yes">Has Team</option>
                <option value="no">No Team</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
