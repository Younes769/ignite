"use client";

import { useState, useEffect } from "react";

const RegistrationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    email: "",
    yearOfStudy: "",

    // Team Info
    hasTeam: "",
    teamName: "",
    teamMember1: "",
    teamMember2: "",
    teamMember3: "",

    // Technical Background
    experience: "",
    skills: [],
    otherSkills: "",

    // Additional Info
    additionalNotes: "",
  });

  const yearOptions = ["L1", "L2", "L3"];
  const skillOptions = [
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
    "AI/Machine Learning",
    "Database Management",
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.yearOfStudy)
          newErrors.yearOfStudy = "Please select your year of study";
        break;
      case 2:
        if (!formData.hasTeam) newErrors.hasTeam = "Please select an option";
        if (formData.hasTeam === "yes") {
          if (!formData.teamName.trim())
            newErrors.teamName = "Team name is required";
          if (
            !formData.teamMember1.trim() &&
            !formData.teamMember2.trim() &&
            !formData.teamMember3.trim()
          ) {
            newErrors.teamMembers = "Please add at least one team member";
          }
        }
        break;
      case 3:
        if (!formData.experience)
          newErrors.experience = "Please select your experience level";
        if (formData.skills.length === 0)
          newErrors.skills = "Please select at least one skill";
        if (formData.skills.includes("Other") && !formData.otherSkills.trim()) {
          newErrors.otherSkills = "Please specify your other skills";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    if (step < 4) {
      setStep((prev) => prev + 1);
      return;
    }

    // Show review before submitting
    if (!showReview) {
      setShowReview(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const skillsString = formData.skills.join(", ");

      const formDataToSend = {
        fullName: formData.fullName,
        email: formData.email,
        yearOfStudy: formData.yearOfStudy,
        teamStatus: formData.hasTeam,
        teamName: formData.teamName || "N/A",
        teamMembers:
          [formData.teamMember1, formData.teamMember2, formData.teamMember3]
            .filter(Boolean)
            .join(", ") || "N/A",
        experience: formData.experience,
        skills: skillsString,
        otherSkills: formData.otherSkills || "N/A",
        additionalNotes: formData.additionalNotes || "N/A",
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("https://submit-form.com/nUuCIzQIi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
          setShowReview(false);
        }, 2000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }) =>
    error ? <p className="text-red-400 text-xs mt-1 ml-1">{error}</p> : null;

  const inputClasses = (error) => `
    w-full bg-white/5 border ${error ? "border-red-500/50" : "border-white/10"} 
    rounded-lg px-4 py-2.5 text-white 
    focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 
    transition-all
    [&>option]:bg-gray-900 [&>option]:text-white
  `;

  const selectClasses = (error) => `
    ${inputClasses(error)}
    appearance-none cursor-pointer
    hover:bg-white/10
    [&>option]:py-2 [&>option]:px-4 
    [&>option]:bg-gray-900/95 
    [&>option]:backdrop-blur-xl
    [&>option]:border-b [&>option]:border-white/10
    [&>option]:cursor-pointer
    [&>option:hover]:bg-emerald-500/20
  `;

  const renderFormButtons = () => (
    <div className="px-6 py-4 bg-black/40 border-t border-white/10 flex justify-between">
      <button
        type="button"
        onClick={() => setStep((prev) => Math.max(1, prev - 1))}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium
          ${
            step === 1
              ? "text-white/40 cursor-not-allowed"
              : "text-white hover:bg-white/5"
          }
          transition-colors
        `}
        disabled={step === 1 || isSubmitting}
      >
        Previous
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          px-6 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm font-medium 
          rounded-lg transition-all flex items-center gap-2
          ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}
        `}
      >
        {isSubmitting ? (
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
            <span>Submitting...</span>
          </>
        ) : (
          <span>{step === 4 ? "Submit" : "Next"}</span>
        )}
      </button>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">
        Review Your Information
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-white/60">
              Personal Information
            </h4>
            <div className="mt-2 space-y-1">
              <p className="text-white">{formData.fullName}</p>
              <p className="text-white">{formData.email}</p>
              <p className="text-white">{formData.yearOfStudy}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white/60">Team Status</h4>
            <div className="mt-2 space-y-1">
              <p className="text-white">
                {formData.hasTeam === "yes"
                  ? "Has Team"
                  : formData.hasTeam === "no"
                  ? "Looking for Team"
                  : "Want to Form Team"}
              </p>
              {formData.hasTeam === "yes" && (
                <>
                  <p className="text-white">Team: {formData.teamName}</p>
                  {[
                    formData.teamMember1,
                    formData.teamMember2,
                    formData.teamMember3,
                  ]
                    .filter(Boolean)
                    .map((member, i) => (
                      <p key={i} className="text-white">
                        {member}
                      </p>
                    ))}
                </>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white/60">
              Technical Background
            </h4>
            <div className="mt-2 space-y-1">
              <p className="text-white">Experience: {formData.experience}</p>
              <p className="text-white">Skills: {formData.skills.join(", ")}</p>
              {formData.skills.includes("Other") && (
                <p className="text-white">
                  Other Skills: {formData.otherSkills}
                </p>
              )}
            </div>
          </div>
          {formData.additionalNotes && (
            <div>
              <h4 className="text-sm font-medium text-white/60">
                Additional Notes
              </h4>
              <p className="mt-2 text-white">{formData.additionalNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    if (submitStatus === "success") {
      return (
        <div className="space-y-6 text-center py-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-500/20 p-3">
              <svg
                className="w-8 h-8 text-emerald-500"
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
          </div>
          <h3 className="text-xl font-semibold text-white">
            Registration Successful!
          </h3>
          <p className="text-white/60">
            Thank you for registering for DevImpact. We'll be in touch soon!
          </p>
        </div>
      );
    }

    if (showReview) {
      return renderReview();
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClasses(errors.fullName)}
                  placeholder="Enter your full name"
                  required
                />
                <ErrorMessage error={errors.fullName} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@mail.com"
                  className={inputClasses(errors.email)}
                  required
                />
                <ErrorMessage error={errors.email} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Year of Study
                </label>
                <div className="relative">
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className={selectClasses(errors.yearOfStudy)}
                    required
                  >
                    <option value="" className="text-white/60">
                      Select year
                    </option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year} className="text-white">
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <ErrorMessage error={errors.yearOfStudy} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Team Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Do you have a team?
                </label>
                <div className="relative">
                  <select
                    name="hasTeam"
                    value={formData.hasTeam}
                    onChange={handleChange}
                    className={selectClasses(errors.hasTeam)}
                    required
                  >
                    <option value="" className="text-white/60">
                      Select option
                    </option>
                    <option value="yes" className="text-white">
                      Yes, I have a team
                    </option>
                    <option value="no" className="text-white">
                      No, I want to join a team
                    </option>
                    <option value="form" className="text-white">
                      No, I want to form a new team
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <ErrorMessage error={errors.hasTeam} />
              </div>
              {formData.hasTeam === "yes" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1">
                      Team Name
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      className={inputClasses(errors.teamName)}
                      placeholder="Enter your team name"
                      required
                    />
                    <ErrorMessage error={errors.teamName} />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/60">
                      Team Members
                    </label>
                    <input
                      type="text"
                      name="teamMember1"
                      value={formData.teamMember1}
                      onChange={handleChange}
                      placeholder="Team member 1 full name"
                      className={inputClasses(errors.teamMember1)}
                    />
                    <input
                      type="text"
                      name="teamMember2"
                      value={formData.teamMember2}
                      onChange={handleChange}
                      placeholder="Team member 2 full name"
                      className={inputClasses(errors.teamMember2)}
                    />
                    <input
                      type="text"
                      name="teamMember3"
                      value={formData.teamMember3}
                      onChange={handleChange}
                      placeholder="Team member 3 full name"
                      className={inputClasses(errors.teamMember3)}
                    />
                  </div>
                  <ErrorMessage error={errors.teamMembers} />
                </>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Technical Background
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Programming Experience
                </label>
                <div className="relative">
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={selectClasses(errors.experience)}
                    required
                  >
                    <option value="" className="text-white/60">
                      Select experience
                    </option>
                    <option value="beginner" className="text-white">
                      Beginner ({"<"} 1 year)
                    </option>
                    <option value="intermediate" className="text-white">
                      Intermediate (1-2 years)
                    </option>
                    <option value="advanced" className="text-white">
                      Advanced (2+ years)
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <ErrorMessage error={errors.experience} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Skills (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {skillOptions.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        name="skills"
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={handleChange}
                        className="rounded border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
                      />
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                        {skill}
                      </span>
                    </label>
                  ))}
                </div>
                <ErrorMessage error={errors.skills} />
              </div>
              {formData.skills.includes("Other") && (
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-1">
                    Other Skills
                  </label>
                  <input
                    type="text"
                    name="otherSkills"
                    value={formData.otherSkills}
                    onChange={handleChange}
                    className={inputClasses(errors.otherSkills)}
                    placeholder="Please specify other skills"
                    required
                  />
                  <ErrorMessage error={errors.otherSkills} />
                </div>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">
              Additional Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className={inputClasses(errors.additionalNotes)}
                  placeholder="Tell us anything else you'd like us to know about you or your participation in the hackathon..."
                />
                <ErrorMessage error={errors.additionalNotes} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Remove the floating notification
  const renderNotification = () => null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {renderNotification()}
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-black/40 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Join the Challenge
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
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
          {/* Progress bar */}
          <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
            {renderStep()}
          </div>

          {/* Footer */}
          {renderFormButtons()}
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
