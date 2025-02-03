export default function StatisticsCards({ activeTab, statistics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-black/30 border border-orange-500/20 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400 text-sm font-medium">
            Total Registrations
          </h3>
          <svg
            className="w-8 h-8 text-orange-500/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-3xl font-bold text-orange-500 mt-2">
          {statistics.total}
        </p>
        <p className="text-sm text-gray-400 mt-1">Total participants</p>
      </div>

      {activeTab === "ideathon" && (
        <>
          <div className="bg-black/30 border border-orange-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm font-medium">Teams</h3>
              <svg
                className="w-8 h-8 text-orange-500/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {statistics.teams}
            </p>
            <p className="text-sm text-gray-400 mt-1">Active teams</p>
          </div>

          <div className="bg-black/30 border border-orange-500/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm font-medium">Individual</h3>
              <svg
                className="w-8 h-8 text-orange-500/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {statistics.individual}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Individual participants
            </p>
          </div>
        </>
      )}
    </div>
  );
}
