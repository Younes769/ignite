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
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
        <span className="text-orange-500">
          {selectedItems.size}{" "}
          {selectedItems.size === 1 ? "registration" : "registrations"} selected
        </span>
        <div className="flex gap-4">
          {activeTab === "ideathon" && (
            <button
              onClick={() => setShowTeamManagement(true)}
              className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2"
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
            className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              className="text-orange-500 hover:text-orange-400 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
