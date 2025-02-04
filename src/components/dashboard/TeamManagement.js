import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function TeamManagement({
  selectedItems,
  existingTeams = [],
  onClose,
  onUpdate,
  setSelectedItems,
}) {
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const supabase = createClientComponentClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) {
      setError("Please enter a team name");
      return;
    }

    setLoading(true);
    try {
      console.log("Updating team for IDs:", Array.from(selectedItems));
      console.log("New team name:", teamName);

      // Update all selected registrations with the new team name
      const { data, error } = await supabase
        .from("ideathon_registrations")
        .update({
          has_team: true,
          team_name: teamName,
        })
        .in("id", Array.from(selectedItems))
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Update successful:", data);

      // Clear selection and refresh data
      setSelectedItems(new Set());
      if (onUpdate) await onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating team:", error);
      setError("Failed to update team. Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromTeam = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("ideathon_registrations")
        .update({
          has_team: false,
          team_name: null,
        })
        .in("id", Array.from(selectedItems));

      if (error) throw error;

      // Clear selection and refresh data
      setSelectedItems(new Set());
      if (onUpdate) await onUpdate();
      onClose();
    } catch (error) {
      console.error("Error removing from team:", error);
      setError("Failed to remove from team. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 border border-orange-500/20 rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Manage Team</h2>
            <button
              onClick={onClose}
              className="text-orange-200/60 hover:text-orange-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-orange-200/80 mb-1">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
              />
              {existingTeams.length > 0 && (
                <div className="mt-2">
                  <label className="block text-sm text-orange-200/60 mb-1">
                    Existing Teams:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {existingTeams.map((team) => (
                      <button
                        key={team}
                        type="button"
                        onClick={() => setTeamName(team)}
                        className="px-2 py-1 text-sm bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded transition-colors"
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Team"
                )}
              </button>

              <button
                type="button"
                onClick={handleRemoveFromTeam}
                disabled={loading}
                className="w-full px-6 py-2 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove from Team
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full px-6 py-2 text-orange-200/60 hover:text-orange-200 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
