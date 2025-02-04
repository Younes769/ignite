import { useState } from "react";

export default function TeamManagement({
  selectedItems,
  onClose,
  onSuccess,
  existingTeams,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [action, setAction] = useState("create"); // create, assign, unassign

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate team name for create action
      if (action === "create" && (!teamName || teamName.trim() === "")) {
        throw new Error("Team name is required");
      }

      // For assign action, use selected team name
      const finalTeamName =
        action === "create"
          ? teamName
          : action === "assign" && existingTeams.length > 0
          ? teamName || existingTeams[0]
          : null;

      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          teamName: finalTeamName,
          members: Array.from(selectedItems),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to manage team");
      }

      // Show success message
      console.log("Success:", data.message);

      // Call success callback
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Team management error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 rounded-xl max-w-md w-full border border-orange-500/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Team Management</h2>
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

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Action
              </label>
              <select
                value={action}
                onChange={(e) => {
                  setAction(e.target.value);
                  setTeamName(""); // Reset team name when changing action
                }}
                className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="create">Create New Team</option>
                {existingTeams.length > 0 && (
                  <option value="assign">Assign to Existing Team</option>
                )}
                <option value="unassign">Unassign from Team</option>
              </select>
            </div>

            {action === "create" && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter team name"
                />
              </div>
            )}

            {action === "assign" && existingTeams.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Team
                </label>
                <select
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  {existingTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg transition-colors ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-600"
                }`}
              >
                {isLoading
                  ? "Processing..."
                  : action === "create"
                  ? "Create Team"
                  : action === "assign"
                  ? "Assign to Team"
                  : "Unassign from Team"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
