import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Validate environment variables
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
    const data = await request.json();
    const { type, ...formData } = data;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Format data for database
    const dbData = {
      full_name: formData.fullName,
      email: formData.email.toLowerCase(),
      discord_tag: formData.discordTag,
      university: formData.university,
      expectations: formData.expectations,
    };

    if (type === "ideathon") {
      Object.assign(dbData, {
        student_id: formData.studentId,
        year_of_study: formData.yearOfStudy,
        major: formData.major,
        has_team: formData.hasTeam === "yes",
        team_name: formData.hasTeam === "yes" ? formData.teamName : null,
        team_member1: formData.hasTeam === "yes" ? formData.teamMember1 : null,
        team_member2: formData.hasTeam === "yes" ? formData.teamMember2 : null,
        team_member3: formData.hasTeam === "yes" ? formData.teamMember3 : null,
      });
    }

    // Determine which table to use
    const table =
      type === "ideathon"
        ? "ideathon_registrations"
        : "startup_track_registrations";

    // Check for existing registration
    const { data: existingUser, error: checkError } = await supabase
      .from(table)
      .select("email")
      .eq("email", dbData.email)
      .single();

    if (checkError) {
      // PGRST116 means no rows returned, which is what we want
      if (checkError.code !== "PGRST116") {
        console.error("Error checking existing user:", checkError);
        return NextResponse.json(
          {
            error: "Failed to check existing registration",
            details: checkError.message,
            code: "CHECK_ERROR",
          },
          { status: 500 }
        );
      }
    } else if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already registered",
          code: "EMAIL_EXISTS",
          email: dbData.email,
        },
        { status: 400 }
      );
    }

    // Insert registration
    const { data: registration, error: insertError } = await supabase
      .from(table)
      .insert([dbData])
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting registration:", insertError);
      return NextResponse.json(
        {
          error: "Failed to save registration",
          details: insertError.message,
          code: "INSERT_ERROR",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Registration successful",
      data: registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "Registration failed",
        details: error.message,
        code: "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}
