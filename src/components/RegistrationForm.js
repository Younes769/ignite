"use client";

import { useState } from "react";

const RegistrationForm = ({ isOpen, onClose, type = "ideathon" }) => {
  const [formData, setFormData] = useState(
    type === "ideathon"
      ? {
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
        }
      : {
          fullName: "",
          email: "",
          discordTag: "",
          university: "",
          expectations: "",
        }
  );

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setShowConfirmation(true);
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setFormData(
      type === "ideathon"
        ? {
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
          }
        : {
            fullName: "",
            email: "",
            discordTag: "",
            university: "",
            expectations: "",
          }
    );
    onClose();
  };

  if (!isOpen) return null;

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-black/80 rounded-xl max-w-md w-full p-6 border border-orange-500/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-400 mb-6">
              Thank you for registering. We'll be in touch soon!
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/80 rounded-xl max-w-md w-full border border-orange-500/20">
        <div className="p-6 overflow-y-auto max-h-[80vh] hide-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {type === "ideathon"
                ? "Ideathon Registration"
                : "Startup Track Registration"}
            </h2>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
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
                  <div>
                    <p className="text-red-400 font-medium">
                      Registration Error
                    </p>
                    <p className="text-red-300 mt-1 text-sm">{error}</p>
                    {error === "Email already registered" && (
                      <p className="text-red-300/80 mt-2 text-sm">
                        Please use a different email address or contact us if
                        you need to update your registration.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-6">
              {/* Common Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discord Name Tag *
                </label>
                <input
                  type="text"
                  name="discordTag"
                  required
                  value={formData.discordTag}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="username#0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Which university do you study in? *
                </label>
                <input
                  type="text"
                  name="university"
                  required
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="Your university"
                />
              </div>

              {/* Ideathon-specific fields */}
              {type === "ideathon" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Student ID *
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      required
                      value={formData.studentId}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="Your student ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Which year are you in? *
                    </label>
                    <select
                      name="yearOfStudy"
                      required
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    >
                      <option value="">Select Year</option>
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                      <option value="M1">M1</option>
                      <option value="M2">M2</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      What speciality (major) do you study? *
                    </label>
                    <input
                      type="text"
                      name="major"
                      required
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="Your major/speciality"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Do you have a team? *
                    </label>
                    <select
                      name="hasTeam"
                      required
                      value={formData.hasTeam}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>

                  {formData.hasTeam === "yes" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Team Name *
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          required
                          value={formData.teamName}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="Your team name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Team Member 1 *
                        </label>
                        <input
                          type="text"
                          name="teamMember1"
                          required
                          value={formData.teamMember1}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Team Member 2
                        </label>
                        <input
                          type="text"
                          name="teamMember2"
                          value={formData.teamMember2}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Team Member 3
                        </label>
                        <input
                          type="text"
                          name="teamMember3"
                          value={formData.teamMember3}
                          onChange={handleChange}
                          className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                          placeholder="Full name"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Expectations field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {type === "ideathon"
                    ? "What do you expect of this ideathon? *"
                    : "Do you expect anything of the event? *"}
                </label>
                <textarea
                  name="expectations"
                  required
                  value={formData.expectations}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  placeholder="Share your expectations..."
                />
              </div>

              {/* CV Note for Startup Track */}
              {type !== "ideathon" && (
                <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-orange-400 font-medium">
                      Please bring your CV with you if possible
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg transition-colors ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-600"
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
