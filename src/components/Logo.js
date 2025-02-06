"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = ({
  size = "medium",
  withText = true,
  animated = true,
  className = "",
}) => {
  const sizes = {
    small: { width: 32, height: 32 },
    medium: { width: 48, height: 48 },
    large: { width: 64, height: 64 },
    xlarge: { width: 96, height: 96 },
  };

  const { width, height } = sizes[size] || sizes.medium;

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`relative ${animated ? "group" : ""}`}>
          {/* Background glow effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-xl animate-pulse"></div>
          )}

          {/* Logo image */}
          <div
            className={`relative ${
              animated
                ? "transform group-hover:scale-105 transition-transform duration-300"
                : ""
            }`}
          >
            <Image
              src="/IGNITE_LOGO.svg"
              alt="IGNITE Logo"
              width={width}
              height={height}
              className={`relative z-10 ${
                animated ? "drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" : ""
              }`}
            />
          </div>
        </div>

        {/* Optional text */}
        {withText && (
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              IGNITE
            </span>
            <span className="text-sm text-orange-200/60">2025</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
