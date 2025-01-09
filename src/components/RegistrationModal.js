"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    needsBus: "",
    busLocation: "",

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

  useEffect(() => {
    // Add Pageclip script
    const script = document.createElement("script");
    script.src = "https://s.pageclip.co/v1/pageclip.js";
    script.charset = "utf-8";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
        if (!formData.needsBus)
          newErrors.needsBus = "Please select if you need bus transportation";
        if (formData.needsBus === "yes" && !formData.busLocation.trim())
          newErrors.busLocation = "Please enter your pickup location";
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
        needsBus: formData.needsBus,
        busLocation: formData.needsBus === "yes" ? formData.busLocation : "N/A",
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

      // Use Pageclip's client library
      const Pageclip = window.Pageclip;
      if (!Pageclip) {
        throw new Error("Pageclip library not loaded");
      }

      await new Promise((resolve, reject) => {
        Pageclip.send(
          "2Vcs3gyKFYmUV8zVKT4CppKxGn18NVdb",
          "devimpact",
          formDataToSend,
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
      });

      setSubmitStatus("success");
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
        onClick={() => {
          if (showReview) {
            setShowReview(false);
          } else {
            setStep((prev) => Math.max(1, prev - 1));
          }
        }}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium
          ${
            step === 1 && !showReview
              ? "text-white/40 cursor-not-allowed"
              : "text-white hover:bg-white/5"
          }
          transition-colors
        `}
        disabled={(step === 1 && !showReview) || isSubmitting}
      >
        Previous
      </button>
      <button
        type="submit"
        disabled={isSubmitting || submitStatus === "success"}
        className={`
          px-6 py-2 bg-emerald-500/90 hover:bg-emerald-500 text-white text-sm font-medium 
          rounded-lg transition-all flex items-center gap-2
          ${
            isSubmitting || submitStatus === "success"
              ? "opacity-75 cursor-not-allowed"
              : ""
          }
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
          <span>{showReview ? "Submit" : "Next"}</span>
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
              <p className="text-white">
                Bus Transportation: {formData.needsBus === "yes" ? "Yes" : "No"}
              </p>
              {formData.needsBus === "yes" && (
                <p className="text-white">
                  Pickup Location: {formData.busLocation}
                </p>
              )}
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
    return (
      <div className="relative overflow-hidden">
        {/* Main content container */}
        <div className="relative z-10">
          <div className="flex flex-col items-center">
            {/* Logo and Icon Combined */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/0"></div>
              <Image
                src="/logo.png"
                alt="Logo"
                width={180}
                height={60}
                className="object-contain opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-emerald-500/10 p-4 backdrop-blur-sm border border-emerald-500/20">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 12l4 4m0-4l-4 4"
                      className="text-red-500"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400">
                Registration Period Has Ended
              </h3>
              <p className="text-white/70 max-w-md mx-auto">
                The journey begins soon! While registrations are closed, the
                excitement is just beginning.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>January 9-11, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Remove the floating notification
  const renderNotification = () => null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {renderNotification()}
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-black/60 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              DevImpact Registration
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
        </div>

        {/* Content */}
        <div className="p-6">{renderStep()}</div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/40 border-t border-white/10 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
