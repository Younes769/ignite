"use client";

import { useState, useEffect, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Reset login attempts after 1 hour
  useEffect(() => {
    const resetTime = localStorage.getItem("loginResetTime");
    if (resetTime && Date.now() - Number(resetTime) >= 3600000) {
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("loginResetTime");
      setLoginAttempts(0);
    }
  }, []);

  // Handle cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error && !cooldown) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, cooldown]);

  // Debounced login function
  const debouncedLogin = useCallback(async () => {
    if (loading) return; // Prevent multiple simultaneous attempts

    // Check stored login attempts
    const storedAttempts = Number(localStorage.getItem("loginAttempts") || "0");
    if (storedAttempts >= 5) {
      setCooldown(300); // 5 minutes cooldown after 5 attempts
      setError("Too many login attempts. Please try again in 5 minutes.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Update login attempts
        const newAttempts = storedAttempts + 1;
        localStorage.setItem("loginAttempts", String(newAttempts));
        if (!localStorage.getItem("loginResetTime")) {
          localStorage.setItem("loginResetTime", String(Date.now()));
        }
        setLoginAttempts(newAttempts);

        if (
          signInError.message.includes("rate limit") ||
          signInError.message === "Request rate limit reached"
        ) {
          setCooldown(60);
          throw new Error(
            "Too many login attempts. Please wait 60 seconds before trying again."
          );
        }
        throw signInError;
      }

      // Success - clear attempts
      localStorage.removeItem("loginAttempts");
      localStorage.removeItem("loginResetTime");
      router.push("/hr/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.message.includes("rate limit")) {
        setCooldown(60);
        setError(
          "Too many login attempts. Please wait 60 seconds before trying again."
        );
      } else if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email or password");
        setCooldown(30);
      } else {
        setError(error.message || "An error occurred during login");
        setCooldown(30);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, loading, router, supabase.auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Check if in cooldown
    if (cooldown > 0) {
      setError(`Please wait ${cooldown} seconds before trying again`);
      return;
    }

    // Execute debounced login
    debouncedLogin();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[100px] animate-pulse delay-300" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Logo size="xlarge" withText={true} animated={true} />
        </div>

        <div className="relative group">
          {/* Card Glow Effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-orange-500/20 to-orange-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500" />
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-orange-500/40 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Main Card */}
          <div className="bg-black/40 backdrop-blur-xl border border-orange-500/20 rounded-xl p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />

            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              HR Dashboard Login
            </h1>

            {/* Cooldown Timer */}
            {cooldown > 0 && (
              <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg backdrop-blur-sm animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-orange-400">Cooldown Period</span>
                  <span className="text-orange-400 font-mono">{cooldown}s</span>
                </div>
                <div className="mt-2 h-1 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${(cooldown / 60) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm animate-fade-in">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-400">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-orange-200/80 text-sm font-medium">
                  Email Address
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg blur opacity-75 group-hover/input:opacity-100 transition duration-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading || cooldown > 0}
                    className="relative w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed placeholder-white/30"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-orange-200/80 text-sm font-medium">
                  Password
                </label>
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg blur opacity-75 group-hover/input:opacity-100 transition duration-300" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading || cooldown > 0}
                    className="relative w-full bg-black/50 border border-orange-500/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed placeholder-white/30"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || cooldown > 0}
                className="relative w-full group/button"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg blur opacity-75 group-hover/button:opacity-100 transition duration-300" />
                <div className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg group-hover/button:from-orange-600 group-hover/button:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                      <span>Logging in...</span>
                    </>
                  ) : cooldown > 0 ? (
                    <span>Wait {cooldown}s</span>
                  ) : (
                    <span>Login</span>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
