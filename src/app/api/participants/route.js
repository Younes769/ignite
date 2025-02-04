import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET all participants
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("ideathon_registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new participant
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      full_name,
      email,
      phone_number,
      university,
      field_of_study,
      study_year,
      why_join,
      expectations,
      has_team,
      team_name,
      team_role,
      team_formed,
      team_members,
      project_idea,
      hear_about,
      tshirt_size,
    } = body;

    const { data, error } = await supabase
      .from("ideathon_registrations")
      .insert([
        {
          full_name,
          email,
          phone_number,
          university,
          field_of_study,
          study_year,
          why_join,
          expectations,
          has_team,
          team_name,
          team_role,
          team_formed,
          team_members,
          project_idea,
          hear_about,
          tshirt_size,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE participant
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Participant ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("ideathon_registrations")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ message: "Participant deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
