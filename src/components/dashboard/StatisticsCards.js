export default function StatisticsCards({ activeTab, statistics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-black/50 border border-orange-500/20 rounded-xl p-6">
        <h3 className="text-sm font-medium text-gray-400">
          Total Registrations
        </h3>
        <p className="mt-2 text-3xl font-bold text-orange-500">
          {statistics.total}
        </p>
      </div>

      {activeTab === "ideathon" && (
        <>
          <div className="bg-black/50 border border-orange-500/20 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-400">Teams</h3>
            <p className="mt-2 text-3xl font-bold text-orange-500">
              {statistics.teams}
            </p>
          </div>

          <div className="bg-black/50 border border-orange-500/20 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-400">
              Individual Participants
            </h3>
            <p className="mt-2 text-3xl font-bold text-orange-500">
              {statistics.individual}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
