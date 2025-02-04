export default function TeamsOverview({ teamGroups }) {
  if (!teamGroups || Object.keys(teamGroups).length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">No teams created yet</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(teamGroups).map(([teamName, members]) => (
        <div
          key={teamName}
          className="bg-black/50 border border-orange-500/20 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-orange-500">
              {teamName}
            </h3>
            <span className="px-2 py-1 text-sm bg-orange-500/10 text-orange-500 rounded">
              {members.length} members
            </span>
          </div>
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-start gap-3 p-3 bg-black/30 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{member.full_name}</p>
                  <p className="text-sm text-gray-400">{member.email}</p>
                  <p className="text-sm text-gray-400">
                    {member.university} • {member.year_of_study} Year
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
