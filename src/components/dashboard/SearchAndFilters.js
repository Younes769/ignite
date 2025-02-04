export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  activeTab,
  universities,
}) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or university..."
            className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
          />
        </div>

        {/* University Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            University
          </label>
          <select
            value={filters.university}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, university: e.target.value }))
            }
            className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
          >
            <option value="all">All Universities</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter - Only for Ideathon */}
        {activeTab === "ideathon" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Year of Study
            </label>
            <select
              value={filters.year}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, year: e.target.value }))
              }
              className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
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
          </div>
        )}

        {/* Team Filter - Only for Ideathon */}
        {activeTab === "ideathon" && (
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Team Status
            </label>
            <select
              value={filters.hasTeam}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, hasTeam: e.target.value }))
              }
              className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
            >
              <option value="all">All</option>
              <option value="yes">Has Team</option>
              <option value="no">No Team</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
