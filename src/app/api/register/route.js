import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    // Check for existing registration
    const table =
      type === "ideathon"
        ? "ideathon_registrations"
        : "startup_track_registrations";
    const { data: existingUser } = await supabase
      .from(table)
      .select("email")
      .eq("email", formData.email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Insert registration
    const { data: registration, error } = await supabase
      .from(table)
      .insert([formData])
      .select()
      .single();

    if (error) throw error;

    // Send confirmation email
    // TODO: Implement email sending logic here

    return NextResponse.json({
      message: "Registration successful",
      data: registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
