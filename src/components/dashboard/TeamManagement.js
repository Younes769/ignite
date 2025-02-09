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
      const { error } = await supabase
        .from("ideathon_registrations")
        .update({
          has_team: true,
          team_name: teamName,
        })
        .in("id", Array.from(selectedItems));

      if (error) throw error;

      setSelectedItems(new Set());
      if (onUpdate) await onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating team:", error);
      setError("Failed to update team. " + error.message);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg transform scale-95 animate-scaleIn">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl blur opacity-75" />

          <div className="relative bg-black/80 border border-orange-500/20 rounded-xl overflow-hidden">
            {/* Gradient borders */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Manage Team
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-orange-200/60 hover:text-orange-200 hover:bg-orange-500/10 rounded-lg transition-colors"
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
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-orange-200/80">
                    Team Name
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter team name"
                      className="relative w-full px-4 py-2.5 bg-black/50 border border-orange-500/20 rounded-lg text-white placeholder-orange-200/40 focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                    />
                  </div>
                </div>

                {/* Existing Teams */}
                {existingTeams.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-orange-200/60">
                      Existing Teams:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {existingTeams.map((team) => (
                        <button
                          key={team}
                          type="button"
                          onClick={() => setTeamName(team)}
                          className="px-3 py-1.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors text-sm"
                        >
                          {team}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative group/button"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg blur opacity-75 group-hover/button:opacity-100 transition duration-300" />
                    <div className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg group-hover/button:from-orange-600 group-hover/button:to-amber-600 transition-all duration-200 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
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
                          <span>Updating...</span>
                        </>
                      ) : (
                        <span>Update Team</span>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveFromTeam}
                    disabled={loading}
                    className="px-6 py-3 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Remove from Team
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-orange-200/60 hover:text-orange-200 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
