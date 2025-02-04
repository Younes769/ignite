"use client";

export default function RegistrationDetails({ registration, type, onClose }) {
  if (!registration) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 border border-orange-500/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Registration Details
            </h2>
            <button
              onClick={onClose}
              className="text-orange-200/60 hover:text-orange-200 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400">Full Name</label>
                  <p className="text-white">{registration.full_name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Email</label>
                  <p className="text-white">{registration.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Discord Tag</label>
                  <p className="text-white">{registration.discord_tag}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Student ID</label>
                  <p className="text-white">{registration.student_id}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-4">
                Academic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400">University</label>
                  <p className="text-white">{registration.university}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Major</label>
                  <p className="text-white">{registration.major}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400">Year of Study</label>
                  <p className="text-white">{registration.year_of_study}</p>
                </div>
              </div>
            </div>

            {/* Team Information */}
            {type === "ideathon" && (
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-4">
                  Team Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400">Team Status</label>
                    <p className="text-white">
                      {registration.has_team ? "Has Team" : "No Team"}
                    </p>
                  </div>
                  {registration.has_team && (
                    <>
                      <div>
                        <label className="block text-sm text-gray-400">Team Name</label>
                        <p className="text-white">{registration.team_name}</p>
                      </div>
                      {registration.team_member1 && (
                        <div>
                          <label className="block text-sm text-gray-400">Team Member 1</label>
                          <p className="text-white">{registration.team_member1}</p>
                        </div>
                      )}
                      {registration.team_member2 && (
                        <div>
                          <label className="block text-sm text-gray-400">Team Member 2</label>
                          <p className="text-white">{registration.team_member2}</p>
                        </div>
                      )}
                      {registration.team_member3 && (
                        <div>
                          <label className="block text-sm text-gray-400">Team Member 3</label>
                          <p className="text-white">{registration.team_member3}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500 mb-4">
                Additional Information
              </h3>
              <div>
                <label className="block text-sm text-gray-400">Expectations</label>
                <p className="text-white whitespace-pre-wrap">{registration.expectations}</p>
              </div>
            </div>

            {/* Registration Time */}
            <div>
              <label className="block text-sm text-gray-400">Registered At</label>
              <p className="text-white">
                {new Date(registration.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}