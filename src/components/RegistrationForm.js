"use client";

import { useState } from "react";

const RegistrationForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    yearOfStudy: "",
    needsBus: "no",
    busLocation: "",
    hasTeam: "no",
    teamName: "",
    teamMember1: "",
    teamMember2: "",
    teamMember3: "",
    additionalInfo: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setFormData({
      fullName: "",
      email: "",
      yearOfStudy: "",
      needsBus: "no",
      busLocation: "",
      hasTeam: "no",
      teamName: "",
      teamMember1: "",
      teamMember2: "",
      teamMember3: "",
      additionalInfo: "",
    });
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
            <h2 className="text-2xl font-bold text-white">Register Now</h2>
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
            {/* Form Fields */}
            <div className="space-y-6">
              {/* Full Name */}
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

              {/* Email */}
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

              {/* Year of Study */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year of Study *
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
                </select>
              </div>

              {/* Need Bus */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Need NIT Bus? *
                </label>
                <select
                  name="needsBus"
                  required
                  value={formData.needsBus}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {/* Bus Location (conditional) */}
              {formData.needsBus === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bus Location *
                  </label>
                  <input
                    type="text"
                    name="busLocation"
                    required
                    value={formData.busLocation}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    placeholder="Your pickup location"
                  />
                </div>
              )}

              {/* Team */}
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

              {/* Team Details (conditional) */}
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
                      Team Member 2 *
                    </label>
                    <input
                      type="text"
                      name="teamMember2"
                      required
                      value={formData.teamMember2}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Member 3 *
                    </label>
                    <input
                      type="text"
                      name="teamMember3"
                      required
                      value={formData.teamMember3}
                      onChange={handleChange}
                      className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="Full name"
                    />
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Anything to add?
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-black/30 border border-orange-500/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                  placeholder="Any additional information..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all transform hover:scale-[1.02] focus:scale-[0.98]"
              >
                Register
              </button>
            </div>
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
