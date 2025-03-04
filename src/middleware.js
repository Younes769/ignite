import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is not signed in and the current path is /hr/dashboard, redirect to /login
  if (!session && req.nextUrl.pathname === "/hr/dashboard") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and the current path is /login, redirect to /hr/dashboard
  if (session && req.nextUrl.pathname === "/login") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/hr/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/hr/dashboard", "/login"],
};
