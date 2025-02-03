"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

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

export default function Dashboard() {
  const [ideathonRegistrations, setIdeathonRegistrations] = useState([]);
  const [startupRegistrations, setStartupRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ideathon");
  const router = useRouter();
  const supabase = createClientComponentClient();

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
      const { data: ideathon } = await supabase
        .from("ideathon_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: startup } = await supabase
        .from("startup_track_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      setIdeathonRegistrations(ideathon || []);
      setStartupRegistrations(startup || []);
      setLoading(false);
    };

    checkSession();
    fetchData();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Group ideathon registrations by team
  const teamGroups = ideathonRegistrations.reduce((groups, reg) => {
    if (reg.has_team && reg.team_name) {
      if (!groups[reg.team_name]) {
        groups[reg.team_name] = [];
      }
      groups[reg.team_name].push(reg);
    }
    return groups;
  }, {});

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
                    {ideathonRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-orange-500/5">
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
                  {startupRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-orange-500/5">
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
      </div>
    </div>
  );
}
