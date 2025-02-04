import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ImportCSVModal({
  isOpen,
  onClose,
  onSuccess,
  activeTab,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [importType, setImportType] = useState("participants"); // "participants" or "teams"
  const supabase = createClientComponentClient();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }
    setFile(file);
    setError("");
  };

  const parseCSV = (text) => {
    const rows = text.split("\\n");
    const headers = rows[0].split(",").map((h) => h.trim());

    return rows
      .slice(1)
      .filter((row) => row.trim())
      .map((row) => {
        const values = row.split(",").map((v) => v.trim());
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] || "";
          return obj;
        }, {});
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const records = parseCSV(text);

      if (activeTab === "ideathon") {
        if (importType === "participants") {
          // Map CSV fields for ideathon participants
          const formattedRecords = records.map((record) => ({
            full_name: record.full_name || record.fullName || "",
            email: record.email || "",
            discord_tag: record.discord_tag || record.discordTag || "",
            student_id: record.student_id || record.studentId || "",
            university: record.university || "",
            year_of_study: record.year_of_study || record.yearOfStudy || "",
            major: record.major || "",
            has_team:
              record.has_team === "true" || record.hasTeam === "true" || false,
            team_name: record.team_name || record.teamName || null,
            expectations: record.expectations || "",
          }));

          const { error: insertError } = await supabase
            .from("ideathon_registrations")
            .insert(formattedRecords);

          if (insertError) throw insertError;
        } else {
          // Import teams
          const formattedTeams = records.map((record) => ({
            full_name: record.member_name || record.fullName || "",
            email: record.email || "",
            discord_tag: record.discord_tag || record.discordTag || "",
            student_id: record.student_id || record.studentId || "",
            university: record.university || "",
            year_of_study: record.year_of_study || record.yearOfStudy || "",
            major: record.major || "",
            has_team: true,
            team_name: record.team_name || "",
            expectations: record.expectations || "",
          }));

          const { error: insertError } = await supabase
            .from("ideathon_registrations")
            .insert(formattedTeams);

          if (insertError) throw insertError;
        }
      } else {
        // Map CSV fields for startup track
        const formattedRecords = records.map((record) => ({
          full_name: record.full_name || record.fullName || "",
          email: record.email || "",
          phone: record.phone || "",
          university: record.university || "",
          startup_name: record.startup_name || "",
          startup_description: record.startup_description || "",
          team_size: record.team_size || "",
          development_stage: record.development_stage || "",
          funding_status: record.funding_status || "",
          pitch_deck: record.pitch_deck || "",
        }));

        const { error: insertError } = await supabase
          .from("startup_track_registrations")
          .insert(formattedRecords);

        if (insertError) throw insertError;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error importing CSV:", error);
      setError(
        "Failed to import CSV. Please check the file format and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 border border-orange-500/20 rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Import CSV</h2>
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
            {activeTab === "ideathon" && (
              <div className="mb-4">
                <label className="block text-orange-200/80 mb-1">
                  Import Type
                </label>
                <select
                  value={importType}
                  onChange={(e) => setImportType(e.target.value)}
                  className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                >
                  <option value="participants">Individual Participants</option>
                  <option value="teams">Teams</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-orange-200/80 mb-1">
                Select CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
              />
              <p className="mt-2 text-sm text-gray-400">
                {activeTab === "ideathon"
                  ? importType === "participants"
                    ? "CSV should include: full_name, email, discord_tag, student_id, university, year_of_study, major, has_team, team_name, expectations"
                    : "CSV should include: team_name, member_name, email, discord_tag, student_id, university, year_of_study, major, expectations"
                  : "CSV should include: full_name, email, phone, university, startup_name, startup_description, team_size, development_stage, funding_status, pitch_deck"}
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-orange-200/60 hover:text-orange-200 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !file}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                    Importing...
                  </>
                ) : (
                  "Import"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
