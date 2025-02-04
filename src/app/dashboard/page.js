"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect, useMemo } from "react";
import StatisticsCards from "@/components/dashboard/StatisticsCards";
import SearchAndFilters from "@/components/dashboard/SearchAndFilters";
import BulkActions from "@/components/dashboard/BulkActions";
import RegistrationDetails from "@/components/dashboard/RegistrationDetails";

const downloadCSV = (data, filename) => {
  const headers = Object.keys(data[0] || {}).filter(
    (key) => !["id"].includes(key)
  );

  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          let value = row[header];
          if (header === "created_at") {
            value = new Date(value).toLocaleDateString();
          }
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"') || value.includes("\n"))
          ) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    const selectedData = filteredData.filter((reg) =>
      selectedItems.has(reg.id)
    );
    downloadCSV(selectedData, `selected-${activeTab}-registrations.csv`);
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
    };

    const fetchData = async () => {
      // Fetch registrations
      const { data: ideathon } = await supabase
        .from("ideathon_registrations")
        .select("*")
        .order("created_at", { ascending: false });

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
    };

    checkSession();
    fetchData();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Download handlers
  const handleIdeathonDownload = () => {
    downloadCSV(ideathonRegistrations, "ideathon-registrations.csv");
  };

  const handleStartupDownload = () => {
    downloadCSV(startupRegistrations, "startup-registrations.csv");
  };

  const handleTeamsDownload = () => {
    // Format team data for CSV
    const teamData = Object.entries(teamGroups).flatMap(([teamName, members]) =>
      members.map((member, index) => ({
        team_name: teamName,
        member_number: index + 1,
        full_name: member.full_name,
        email: member.email,
        university: member.university,
        year_of_study: member.year_of_study,
        major: member.major,
        created_at: member.created_at,
      }))
    );

    downloadCSV(teamData, "ideathon-teams.csv");
  };

  // Add click handler function
  const handleRowClick = (registration, e) => {
    // Prevent row click when clicking checkbox
    if (e.target.type === "checkbox") return;
    setSelectedRegistration(registration);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            HR Dashboard - EGNITE 2025 Registrations
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-orange-500/20">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("ideathon")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === "ideathon"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-500/50"
                }`}
              >
                Ideathon Track ({ideathonRegistrations.length})
              </button>
              <button
                onClick={() => setActiveTab("startup")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === "startup"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-500/50"
                }`}
              >
                Startup Track ({startupRegistrations.length})
              </button>
            </nav>
          </div>
        </div>

        <StatisticsCards activeTab={activeTab} statistics={statistics} />

        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
          activeTab={activeTab}
          universities={universities}
        />

        <BulkActions
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          activeTab={activeTab}
          onDownloadSelected={handleDownloadSelected}
          existingTeams={existingTeams}
          onTeamUpdate={async () => {
            const { data: ideathon } = await supabase
              .from("ideathon_registrations")
              .select("*")
              .order("created_at", { ascending: false });

            const teams = new Set();
            ideathon?.forEach((reg) => {
              if (reg.team_name) teams.add(reg.team_name);
            });

            setIdeathonRegistrations(ideathon || []);
            setExistingTeams(Array.from(teams));
          }}
        />

        {/* Ideathon Track Content */}
        {activeTab === "ideathon" && (
          <div>
            {/* Download Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleIdeathonDownload}
                className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-colors flex items-center gap-2 border border-orange-500/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download All Registrations
              </button>
              <button
                onClick={handleTeamsDownload}
                className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-colors flex items-center gap-2 border border-orange-500/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Teams Data
              </button>
            </div>

            {/* Individual Registrations */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-orange-500">
                Individual Registrations
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-orange-500/20">
                  <thead>
                    <tr>
                      <th className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={
                            selectedItems.size === filteredData.length &&
                            filteredData.length > 0
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="rounded border-orange-500/20 text-orange-500 focus:ring-orange-500"
                        />
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-orange-500 transition-colors"
                        onClick={() => handleSort("full_name")}
                      >
                        <div className="flex items-center gap-2">
                          Name
                          {sortConfig.field === "full_name" && (
                            <span>
                              {sortConfig.direction === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Major
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Team Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Registered At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-500/20">
                    {filteredData.map((reg) => (
                      <tr
                        key={reg.id}
                        onClick={(e) => handleRowClick(reg, e)}
                        className="hover:bg-orange-500/5 cursor-pointer"
                      >
                        <td
                          className="px-4 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedItems.has(reg.id)}
                            onChange={(e) =>
                              handleSelectItem(reg.id, e.target.checked)
                            }
                            className="rounded border-orange-500/20 text-orange-500 focus:ring-orange-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reg.full_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reg.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reg.university}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reg.major}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reg.year_of_study}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {reg.has_team ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500">
                              Team: {reg.team_name}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400">
                              No Team
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Teams Overview */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-orange-500">
                Teams Overview ({Object.keys(teamGroups).length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(teamGroups).map(([teamName, members]) => (
                  <div
                    key={teamName}
                    className="bg-black/30 border border-orange-500/20 rounded-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-orange-500 mb-4">
                      {teamName}
                    </h3>
                    <div className="space-y-3">
                      {members.map((member, index) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{member.full_name}</p>
                            <p className="text-sm text-gray-400">
                              {member.university} - {member.year_of_study}
                            </p>
                          </div>
                          <span className="text-xs text-orange-500/80">
                            Member {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Startup Track Content */}
        {activeTab === "startup" && (
          <div>
            {/* Download Button */}
            <div className="mb-8">
              <button
                onClick={handleStartupDownload}
                className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-lg transition-colors flex items-center gap-2 border border-orange-500/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Registrations
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-orange-500/20">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      University
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Discord
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Expectations
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Registered At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-500/20">
                  {filteredData.map((reg) => (
                    <tr
                      key={reg.id}
                      onClick={(e) => handleRowClick(reg, e)}
                      className="hover:bg-orange-500/5 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {reg.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {reg.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {reg.university}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {reg.discord_tag}
                      </td>
                      <td className="px-6 py-4">
                        <p className="max-w-xs truncate">{reg.expectations}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
