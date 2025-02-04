"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const INITIAL_IDEATHON_STATE = {
  fullName: "",
  email: "",
  discordTag: "",
  studentId: "",
  university: "",
  yearOfStudy: "",
  major: "",
  hasTeam: "no",
  teamName: "",
  teamMember1: "",
  teamMember2: "",
  teamMember3: "",
  expectations: "",
};

const INITIAL_STARTUP_STATE = {
  fullName: "",
  email: "",
  discordTag: "",
  university: "",
  expectations: "",
};

export default function AddParticipantModal({
  isOpen,
  onClose,
  onSuccess,
  fetchData,
  activeTab = "ideathon",
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(
    activeTab === "ideathon" ? INITIAL_IDEATHON_STATE : INITIAL_STARTUP_STATE
  );
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (isOpen) {
      setFormData(
        activeTab === "ideathon"
          ? INITIAL_IDEATHON_STATE
          : INITIAL_STARTUP_STATE
      );
    }
  }, [isOpen, activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (activeTab === "ideathon") {
        // Insert into ideathon_registrations table
        const { data, error: insertError } = await supabase
          .from("ideathon_registrations")
          .insert([
            {
              full_name: formData.fullName,
              email: formData.email,
              discord_tag: formData.discordTag,
              student_id: formData.studentId,
              university: formData.university,
              year_of_study: formData.yearOfStudy,
              major: formData.major,
              has_team: formData.hasTeam === "yes",
              team_name: formData.hasTeam === "yes" ? formData.teamName : null,
              team_member1:
                formData.hasTeam === "yes" ? formData.teamMember1 : null,
              team_member2:
                formData.hasTeam === "yes" ? formData.teamMember2 : null,
              team_member3:
                formData.hasTeam === "yes" ? formData.teamMember3 : null,
              expectations: formData.expectations,
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
      } else {
        // Insert into startup_track_registrations table
        const { data, error: insertError } = await supabase
          .from("startup_track_registrations")
          .insert([
            {
              full_name: formData.fullName,
              email: formData.email,
              discord_tag: formData.discordTag,
              university: formData.university,
              expectations: formData.expectations,
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
      }

      // Call both onSuccess and fetchData
      if (onSuccess) onSuccess();
      if (fetchData) await fetchData();

      onClose();
      setFormData(
        activeTab === "ideathon"
          ? INITIAL_IDEATHON_STATE
          : INITIAL_STARTUP_STATE
      );
    } catch (error) {
      console.error("Error adding participant:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "hasTeam" && value === "no"
        ? {
            teamName: "",
            teamMember1: "",
            teamMember2: "",
            teamMember3: "",
          }
        : {}),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 border border-orange-500/20 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Add New Participant
            </h2>
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
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-orange-200/80 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>
              <div>
                <label className="block text-orange-200/80 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>
              <div>
                <label className="block text-orange-200/80 mb-1">
                  Discord Tag *
                </label>
                <input
                  type="text"
                  name="discordTag"
                  value={formData.discordTag || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>
              <div>
                <label className="block text-orange-200/80 mb-1">
                  University *
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                />
              </div>
            </div>

            {/* Ideathon-specific fields */}
            {activeTab === "ideathon" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-orange-200/80 mb-1">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId || ""}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-orange-200/80 mb-1">
                      Year of Study *
                    </label>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy || ""}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                      <option value="Master">Master</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-orange-200/80 mb-1">
                      Major *
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major || ""}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                    />
                  </div>
                </div>

                {/* Team Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-orange-200/80 mb-1">
                      Has Team *
                    </label>
                    <select
                      name="hasTeam"
                      value={formData.hasTeam || "no"}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  {formData.hasTeam === "yes" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-orange-200/80 mb-1">
                          Team Name
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          value={formData.teamName || ""}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-200/80 mb-1">
                          Team Member 1
                        </label>
                        <input
                          type="text"
                          name="teamMember1"
                          value={formData.teamMember1 || ""}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-200/80 mb-1">
                          Team Member 2
                        </label>
                        <input
                          type="text"
                          name="teamMember2"
                          value={formData.teamMember2 || ""}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-200/80 mb-1">
                          Team Member 3
                        </label>
                        <input
                          type="text"
                          name="teamMember3"
                          value={formData.teamMember3 || ""}
                          onChange={handleChange}
                          className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Additional Information */}
            <div>
              <label className="block text-orange-200/80 mb-1">
                Expectations *
              </label>
              <textarea
                name="expectations"
                value={formData.expectations || ""}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500/40"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
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
                disabled={loading}
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
                    Adding...
                  </>
                ) : (
                  "Add Participant"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
