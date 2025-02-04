import { useState } from "react";
import TeamManagement from "./TeamManagement";

export default function BulkActions({
  selectedItems,
  setSelectedItems,
  activeTab,
  onDownloadSelected,
  existingTeams = [],
  onTeamUpdate,
}) {
  const [showTeamManagement, setShowTeamManagement] = useState(false);

  if (selectedItems.size === 0) return null;

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
            onClick={() => setSelectedItems(new Set())}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Selection
          </button>
        </div>
      </div>

      {/* Team Management Modal */}
      {showTeamManagement && (
        <TeamManagement
          selectedItems={selectedItems}
          onClose={() => setShowTeamManagement(false)}
          onSuccess={() => {
            setSelectedItems(new Set());
            if (onTeamUpdate) onTeamUpdate();
          }}
          existingTeams={existingTeams}
        />
      )}
    </>
  );
}
