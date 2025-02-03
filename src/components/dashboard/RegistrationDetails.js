export default function RegistrationDetails({ registration, type, onClose }) {
  if (!registration) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-black/80 rounded-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] border border-orange-500/20 flex flex-col">
        {/* Header - Fixed */}
        <div className="p-3 sm:p-4 border-b border-orange-500/20">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Registration Details
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-orange-500 mb-2 sm:mb-3">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-black/30 p-2 rounded-lg">
                  <p className="text-gray-400 text-xs sm:text-sm">Full Name</p>
                  <p className="text-white text-sm sm:text-base break-words">
                    {registration.full_name}
                  </p>
                </div>
                <div className="bg-black/30 p-2 rounded-lg">
                  <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                  <p className="text-white text-sm sm:text-base break-words">
                    {registration.email}
                  </p>
                </div>
                <div className="bg-black/30 p-2 rounded-lg">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Discord Tag
                  </p>
                  <p className="text-white text-sm sm:text-base break-words">
                    {registration.discord_tag}
                  </p>
                </div>
                <div className="bg-black/30 p-2 rounded-lg">
                  <p className="text-gray-400 text-xs sm:text-sm">University</p>
                  <p className="text-white text-sm sm:text-base break-words">
                    {registration.university}
                  </p>
                </div>
                <div className="bg-black/30 p-2 rounded-lg sm:col-span-2">
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Registration Date
                  </p>
                  <p className="text-white text-sm sm:text-base">
                    {new Date(registration.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Ideathon-specific Information */}
            {type === "ideathon" && (
              <>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-orange-500 mb-2 sm:mb-3">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Student ID
                      </p>
                      <p className="text-white text-sm sm:text-base break-words">
                        {registration.student_id}
                      </p>
                    </div>
                    <div className="bg-black/30 p-2 rounded-lg">
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Year of Study
                      </p>
                      <p className="text-white text-sm sm:text-base">
                        {registration.year_of_study}
                      </p>
                    </div>
                    <div className="bg-black/30 p-2 rounded-lg sm:col-span-2">
                      <p className="text-gray-400 text-xs sm:text-sm">Major</p>
                      <p className="text-white text-sm sm:text-base break-words">
                        {registration.major}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                {registration.has_team && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-orange-500 mb-2 sm:mb-3">
                      Team Information
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="bg-black/30 p-2 rounded-lg">
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Team Name
                        </p>
                        <p className="text-white text-sm sm:text-base break-words">
                          {registration.team_name}
                        </p>
                      </div>
                      {registration.team_member1 && (
                        <div className="bg-black/30 p-2 rounded-lg">
                          <p className="text-gray-400 text-xs sm:text-sm">
                            Team Member 1
                          </p>
                          <p className="text-white text-sm sm:text-base break-words">
                            {registration.team_member1}
                          </p>
                        </div>
                      )}
                      {registration.team_member2 && (
                        <div className="bg-black/30 p-2 rounded-lg">
                          <p className="text-gray-400 text-xs sm:text-sm">
                            Team Member 2
                          </p>
                          <p className="text-white text-sm sm:text-base break-words">
                            {registration.team_member2}
                          </p>
                        </div>
                      )}
                      {registration.team_member3 && (
                        <div className="bg-black/30 p-2 rounded-lg">
                          <p className="text-gray-400 text-xs sm:text-sm">
                            Team Member 3
                          </p>
                          <p className="text-white text-sm sm:text-base break-words">
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
              <h3 className="text-base sm:text-lg font-semibold text-orange-500 mb-2 sm:mb-3">
                Expectations
              </h3>
              <div className="bg-black/30 p-2 rounded-lg">
                <p className="text-white text-sm sm:text-base whitespace-pre-wrap break-words">
                  {registration.expectations}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="p-3 sm:p-4 border-t border-orange-500/20">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
