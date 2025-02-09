"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect, useMemo } from "react";
import Logo from "@/components/Logo";
import StatisticsCards from "@/components/dashboard/StatisticsCards";
import SearchAndFilters from "@/components/dashboard/SearchAndFilters";
import BulkActions from "@/components/dashboard/BulkActions";
import RegistrationDetails from "@/components/dashboard/RegistrationDetails";
import AddParticipantModal from "@/components/AddParticipantModal";
import ImportCSVModal from "@/components/dashboard/ImportCSVModal";
import TeamsOverview from "@/components/dashboard/TeamsOverview";
import Image from "next/image";

const downloadWithTemplate = async (data, defaultFilename) => {
  try {
    // Create file input for template selection
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";

    const processTemplate = async (templateFile) => {
      try {
        // Read the template file
        const text = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (e) =>
            reject(new Error("Failed to read template file"));
          reader.readAsText(templateFile);
        });

        // Parse template headers
        const headers = text
          .split("\n")[0]
          .split(",")
          .map((h) => h.trim());

        // Map data to template format
        const mappedData = data.map((item) => {
          const row = {};
          headers.forEach((header) => {
            // Try different key variations
            const variations = [
              header.toLowerCase().replace(/\s+/g, "_"), // "Full Name" -> "full_name"
              header.toLowerCase(), // "Full Name" -> "fullname"
              header, // Exact match
              header.replace(/\s+/g, ""), // "Full Name" -> "FullName"
            ];

            // Find first matching key
            const value =
              variations
                .map((key) => item[key])
                .find((val) => val !== undefined) || "";

            row[header] = value;
          });
          return row;
        });

        // Create CSV content with proper escaping
        const csvContent = [
          headers.join(","),
          ...mappedData.map((row) =>
            headers
              .map((h) => {
                const value = (row[h] || "").toString();
                // Escape quotes and wrap in quotes if needed
                return value.includes(",") ||
                  value.includes('"') ||
                  value.includes("\n")
                  ? `"${value.replace(/"/g, '""')}"`
                  : value;
              })
              .join(",")
          ),
        ].join("\n");

        // Download the file
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = defaultFilename;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error("Error processing template:", error);
        alert("Error processing the template file. Please try again.");
      }
    };

    // Handle file selection
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        processTemplate(file);
      }
    };

    // Trigger file selection
    input.click();
  } catch (error) {
    console.error("Error in download process:", error);
    alert("Error during download process. Please try again.");
  }
};

// Utility functions
const formatDate = (date) => new Date(date).toLocaleDateString();

const getUniqueValues = (data, field) => [
  ...new Set(data.map((item) => item[field])),
];

export default function Dashboard() {
  const [ideathonRegistrations, setIdeathonRegistrations] = useState([]);
  const [startupRegistrations, setStartupRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ideathon");

  // New state for features
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    university: "all",
    year: "all",
    hasTeam: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    field: "created_at",
    direction: "desc",
  });
  const [selectedItems, setSelectedItems] = useState(new Set());

  // Add new state for selected registration
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // Add to existing state declarations
  const [existingTeams, setExistingTeams] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showTeamManagement, setShowTeamManagement] = useState(false);

  // Add to state declarations
  const [showImportModal, setShowImportModal] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  // Calculate team groups
  const teamGroups = useMemo(() => {
    return ideathonRegistrations.reduce((groups, reg) => {
      if (reg.has_team && reg.team_name) {
        if (!groups[reg.team_name]) {
          groups[reg.team_name] = [];
        }
        groups[reg.team_name].push(reg);
      }
      return groups;
    }, {});
  }, [ideathonRegistrations]);

  // Statistics calculations
  const statistics = useMemo(() => {
    if (activeTab === "ideathon") {
      return {
        total: ideathonRegistrations.length,
        teams: Object.keys(teamGroups).length,
        individual: ideathonRegistrations.filter((reg) => !reg.has_team).length,
      };
    }
    return {
      total: startupRegistrations.length,
    };
  }, [activeTab, ideathonRegistrations, startupRegistrations, teamGroups]);

  // Get unique universities for filter
  const universities = useMemo(() => {
    const data =
      activeTab === "ideathon" ? ideathonRegistrations : startupRegistrations;
    return [...new Set(data.map((reg) => reg.university))].sort();
  }, [activeTab, ideathonRegistrations, startupRegistrations]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    const data =
      activeTab === "ideathon" ? ideathonRegistrations : startupRegistrations;

    return data
      .filter((reg) => {
        const matchesSearch =
          searchTerm === "" ||
          reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.university.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesUniversity =
          filters.university === "all" || reg.university === filters.university;

        const matchesYear =
          filters.year === "all" ||
          (activeTab === "ideathon" && reg.year_of_study === filters.year);

        const matchesTeam =
          filters.hasTeam === "all" ||
          (activeTab === "ideathon" &&
            (filters.hasTeam === "yes") === reg.has_team);

        return matchesSearch && matchesUniversity && matchesYear && matchesTeam;
      })
      .sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        const direction = sortConfig.direction === "asc" ? 1 : -1;

        if (typeof aValue === "string") {
          return direction * aValue.localeCompare(bValue);
        }
        return direction * (aValue - bValue);
      });
  }, [
    activeTab,
    ideathonRegistrations,
    startupRegistrations,
    searchTerm,
    filters,
    sortConfig,
  ]);

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (checked) => {
    setSelectedItems(
      checked ? new Set(filteredData.map((reg) => reg.id)) : new Set()
    );
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handleDownloadSelected = () => {
    if (selectedItems.size === 0) {
      alert("Please select items to download");
      return;
    }
    const selectedData = filteredData.filter((reg) =>
      selectedItems.has(reg.id)
    );
    downloadWithTemplate(
      selectedData,
      `selected_${activeTab}_registrations.csv`
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch registrations
      const { data: ideathon, error } = await supabase
        .from("ideathon_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const { data: startup } = await supabase
        .from("startup_track_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      // Get unique team names
      const teams = new Set();
      ideathon?.forEach((reg) => {
        if (reg.team_name) teams.add(reg.team_name);
      });

      setIdeathonRegistrations(ideathon || []);
      setStartupRegistrations(startup || []);
      setExistingTeams(Array.from(teams));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Download handlers
  const handleIdeathonDownload = () => {
    if (ideathonRegistrations.length === 0) {
      alert("No ideathon registrations to download");
      return;
    }
    downloadWithTemplate(ideathonRegistrations, "ideathon_registrations.csv");
  };

  const handleStartupDownload = () => {
    if (startupRegistrations.length === 0) {
      alert("No startup registrations to download");
      return;
    }
    downloadWithTemplate(startupRegistrations, "startup_registrations.csv");
  };

  const handleTeamsDownload = () => {
    const teamData = Object.values(teamGroups).flat();
    if (teamData.length === 0) {
      alert("No team data to download");
      return;
    }
    downloadWithTemplate(teamData, "team_registrations.csv");
  };

  // Add click handler function
  const handleRowClick = (registration, e) => {
    // Prevent row click when clicking checkbox
    if (e.target.type === "checkbox") return;
    setSelectedRegistration(registration);
  };

  const handleDelete = async (id, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!window.confirm("Are you sure you want to delete this participant?"))
      return;

    setDeleteLoading(true);
    try {
      const tableName =
        activeTab === "ideathon"
          ? "ideathon_registrations"
          : "startup_track_registrations";

      const { error } = await supabase.from(tableName).delete().eq("id", id);

      if (error) throw error;

      await fetchData();
    } catch (error) {
      console.error("Error deleting participant:", error);
      window.alert("Failed to delete participant. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddSuccess = async () => {
    await fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-black to-black" />
        <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.15),_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <Logo size="medium" withText={false} animated={true} />
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                HR Dashboard
              </h1>
              <p className="text-orange-200/60">
                Manage {activeTab === "ideathon" ? "Ideathon" : "Startup Track"}{" "}
                registrations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {activeTab === "ideathon" && (
              <button
                onClick={() => setShowImportModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors"
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
                Download Data
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg border border-orange-500/20 transition-colors"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("ideathon")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "ideathon"
                ? "bg-orange-500 text-white"
                : "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
            }`}
          >
            Ideathon
          </button>
          <button
            onClick={() => setActiveTab("startup")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "startup"
                ? "bg-orange-500 text-white"
                : "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
            }`}
          >
            Startup Track
          </button>
        </div>

        {/* Statistics Cards */}
        <StatisticsCards activeTab={activeTab} statistics={statistics} />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          activeTab={activeTab}
          universities={universities}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          activeTab={activeTab}
          onDownloadSelected={handleDownloadSelected}
          onDownloadAll={
            activeTab === "ideathon"
              ? handleIdeathonDownload
              : handleStartupDownload
          }
          onDownloadTeams={
            activeTab === "ideathon" ? handleTeamsDownload : undefined
          }
          existingTeams={existingTeams}
          onTeamUpdate={fetchData}
        />

        {/* Registrations Table */}
        <div className="bg-black/50 border border-orange-500/20 rounded-xl overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-500/20">
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === filteredData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-orange-500/20 text-orange-500 focus:ring-orange-500/40"
                  />
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-orange-200/60 cursor-pointer hover:text-orange-200"
                  onClick={() => handleSort("full_name")}
                >
                  Full Name
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-orange-200/60 cursor-pointer hover:text-orange-200"
                  onClick={() => handleSort("email")}
                >
                  Email
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-orange-200/60 cursor-pointer hover:text-orange-200"
                  onClick={() => handleSort("university")}
                >
                  University
                </th>
                {activeTab === "ideathon" && (
                  <>
                    <th
                      className="px-6 py-3 text-left text-sm font-medium text-orange-200/60 cursor-pointer hover:text-orange-200"
                      onClick={() => handleSort("year_of_study")}
                    >
                      Year
                    </th>
                    <th
                      className="px-6 py-3 text-left text-sm font-medium text-orange-200/60 cursor-pointer hover:text-orange-200"
                      onClick={() => handleSort("team_name")}
                    >
                      Team
                    </th>
                  </>
                )}
                <th
                  className="px-6 py-3 text-left text-sm font-medium text-orange-200/60 cursor-pointer hover:text-orange-200"
                  onClick={() => handleSort("created_at")}
                >
                  Registered
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-orange-200/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-500/10">
              {filteredData.map((registration) => (
                <tr
                  key={registration.id}
                  onClick={(e) => handleRowClick(registration, e)}
                  className="hover:bg-orange-500/5 cursor-pointer group"
                >
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.has(registration.id)}
                      onChange={(e) =>
                        handleSelectItem(registration.id, e.target.checked)
                      }
                      className="rounded border-orange-500/20 text-orange-500 focus:ring-orange-500/40"
                    />
                  </td>
                  <td className="px-6 py-4 text-white">
                    {registration.full_name}
                  </td>
                  <td className="px-6 py-4 text-orange-200/60">
                    {registration.email}
                  </td>
                  <td className="px-6 py-4 text-orange-200/60">
                    {registration.university}
                  </td>
                  {activeTab === "ideathon" && (
                    <>
                      <td className="px-6 py-4 text-orange-200/60">
                        {registration.year_of_study}
                      </td>
                      <td className="px-6 py-4">
                        {registration.team_name ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500">
                            {registration.team_name}
                          </span>
                        ) : (
                          <span className="text-orange-200/40">No Team</span>
                        )}
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 text-orange-200/60">
                    {formatDate(registration.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => handleDelete(registration.id, e)}
                      className="text-orange-200/40 hover:text-orange-500 transition-colors"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Teams Overview Section */}
        {activeTab === "ideathon" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Teams Overview
            </h2>
            <TeamsOverview teamGroups={teamGroups} />
          </div>
        )}

        {/* Import CSV Modal */}
        <ImportCSVModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          activeTab={activeTab}
          data={filteredData}
          selectedItems={selectedItems}
        />

        {/* Registration Details Modal */}
        {selectedRegistration && (
          <RegistrationDetails
            registration={selectedRegistration}
            type={activeTab}
            onClose={() => setSelectedRegistration(null)}
          />
        )}
      </div>
    </div>
  );
}
