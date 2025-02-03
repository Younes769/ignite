export default function RegistrationDetails({ registration, type, onClose }) {
  if (!registration) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 rounded-xl w-full max-w-2xl max-h-[90vh] border border-orange-500/20 flex flex-col">
        {/* Header - Fixed */}
        <div className="p-4 border-b border-orange-500/20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              Registration Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-3">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="text-white">{registration.full_name}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{registration.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Discord Tag</p>
                  <p className="text-white">{registration.discord_tag}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">University</p>
                  <p className="text-white">{registration.university}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Registration Date</p>
                  <p className="text-white">
                    {new Date(registration.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Ideathon-specific Information */}
            {type === "ideathon" && (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-3">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">Student ID</p>
                      <p className="text-white">{registration.student_id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Year of Study</p>
                      <p className="text-white">{registration.year_of_study}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Major</p>
                      <p className="text-white">{registration.major}</p>
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                {registration.has_team && (
                  <div>
                    <h3 className="text-lg font-semibold text-orange-500 mb-3">
                      Team Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-sm">Team Name</p>
                        <p className="text-white">{registration.team_name}</p>
                      </div>
                      {registration.team_member1 && (
                        <div>
                          <p className="text-gray-400 text-sm">Team Member 1</p>
                          <p className="text-white">
                            {registration.team_member1}
                          </p>
                        </div>
                      )}
                      {registration.team_member2 && (
                        <div>
                          <p className="text-gray-400 text-sm">Team Member 2</p>
                          <p className="text-white">
                            {registration.team_member2}
                          </p>
                        </div>
                      )}
                      {registration.team_member3 && (
                        <div>
                          <p className="text-gray-400 text-sm">Team Member 3</p>
                          <p className="text-white">
                            {registration.team_member3}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Expectations */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-3">
                Expectations
              </h3>
              <p className="text-white whitespace-pre-wrap">
                {registration.expectations}
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-4 border-t border-orange-500/20">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
