import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const { action, teamName, members } = await request.json();

    if (!members || members.length === 0) {
      return NextResponse.json(
        { error: "No members selected" },
        { status: 400 }
      );
    }

    if (action === "create") {
      // Check if team name already exists
      const { data: existingTeam } = await supabase
        .from("ideathon_registrations")
        .select("team_name")
        .eq("team_name", teamName)
        .limit(1);

      if (existingTeam?.length > 0) {
        return NextResponse.json(
          { error: "Team name already exists" },
          { status: 400 }
        );
      }

      // Update team members with new team
      const { error: updateError } = await supabase
        .from("ideathon_registrations")
        .update({
          has_team: true,
          team_name: teamName,
        })
        .in("id", members);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        message: "Team created successfully",
      });
    }

    if (action === "assign") {
      // Check if team exists
      const { data: existingTeam } = await supabase
        .from("ideathon_registrations")
        .select("team_name")
        .eq("team_name", teamName)
        .limit(1);

      if (!existingTeam?.length) {
        return NextResponse.json(
          { error: "Team does not exist" },
          { status: 400 }
        );
      }

      // Assign members to existing team
      const { error: updateError } = await supabase
        .from("ideathon_registrations")
        .update({
          has_team: true,
          team_name: teamName,
        })
        .in("id", members);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        message: "Members assigned to team successfully",
      });
    }

    if (action === "unassign") {
      // Unassign members from team
      const { error: updateError } = await supabase
        .from("ideathon_registrations")
        .update({
          has_team: false,
          team_name: null,
        })
        .in("id", members);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        message: "Members unassigned successfully",
      });
    }

    throw new Error("Invalid action");
  } catch (error) {
    console.error("Team management error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to manage team" },
      { status: 500 }
    );
  }
}
