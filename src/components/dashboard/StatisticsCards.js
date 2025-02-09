export default function StatisticsCards({ activeTab, statistics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Registrations Card */}
      <div className="group relative">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />

        <div className="relative bg-black/50 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-orange-500/40 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-orange-200/60">
                Total Registrations
              </p>
              <p className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500">
                {statistics.total}
              </p>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-500"
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
          </div>
        </div>
      </div>

      {activeTab === "ideathon" ? (
        <>
          {/* Teams Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />

            <div className="relative bg-black/50 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-200/60">
                    Teams
                  </p>
                  <p className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500">
                    {statistics.teams}
                  </p>
                </div>
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-orange-500"
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
              </div>
            </div>
          </div>

          {/* Individual Participants Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />

            <div className="relative bg-black/50 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-200/60">
                    Individual Participants
                  </p>
                  <p className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500">
                    {statistics.individual}
                  </p>
                </div>
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-orange-500"
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Today's Registrations Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />

            <div className="relative bg-black/50 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-200/60">
                    Registered Today
                  </p>
                  <p className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500">
                    {statistics.todayCount || 0}
                  </p>
                </div>
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* This Week's Registrations Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />

            <div className="relative bg-black/50 border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-orange-500/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-200/60">
                    Registered This Week
                  </p>
                  <p className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500">
                    {statistics.weekCount || 0}
                  </p>
                </div>
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
