import { useState } from "react";
import TeamManagement from "./TeamManagement";

export default function BulkActions({
  selectedItems,
  setSelectedItems,
  activeTab,
  onDownloadSelected,
  onDownloadAll,
  onDownloadTeams,
  existingTeams = [],
  onTeamUpdate,
}) {
  const [showTeamManagement, setShowTeamManagement] = useState(false);

  if (!selectedItems || selectedItems.size === 0) return null;

  return (
    <>
      <div className="relative group mb-6">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />

        <div className="relative bg-black/50 backdrop-blur-sm border border-orange-500/20 rounded-lg px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Selection Count */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="text-orange-400 font-medium">
                {selectedItems.size}{" "}
                {selectedItems.size === 1 ? "registration" : "registrations"}{" "}
                selected
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {activeTab === "ideathon" && (
                <button
                  onClick={() => setShowTeamManagement(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                  Manage Team
                </button>
              )}

              <button
                onClick={onDownloadSelected}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Selected
              </button>

              <button
                onClick={onDownloadAll}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download All
              </button>

              {onDownloadTeams && (
                <button
                  onClick={onDownloadTeams}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                  Download Teams
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Team Management Modal */}
      {showTeamManagement && (
        <TeamManagement
          selectedItems={selectedItems}
          existingTeams={existingTeams}
          onClose={() => setShowTeamManagement(false)}
          onUpdate={onTeamUpdate}
          setSelectedItems={setSelectedItems}
        />
      )}
    </>
  );
}
