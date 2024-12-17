"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const Logo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = (e.clientY - rect.top - rect.height / 2) / 10;
      setMousePosition({ x, y });
    };

    const rotateRing = () => {
      setRotation((prev) => (prev + 0.5) % 360);
      requestAnimationFrame(rotateRing);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animation = requestAnimationFrame(rotateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animation);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-[300px] aspect-square"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full group perspective-1000">
        {/* Energy field effect */}
        <div className="absolute inset-0 rounded-full opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(16, 185, 129, 0.15)",
                transform: `scale(${1 + i * 0.1}) rotate(${
                  rotation + i * 30
                }deg)`,
                animation: `pulse 3s ease-in-out ${i * 0.5}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Rotating energy rings */}
        <div
          className="absolute inset-8 rounded-full"
          style={{
            transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: "1px solid rgba(16, 185, 129, 0.2)",
                transform: `rotate(${rotation * (i % 2 ? -1 : 1)}deg) scale(${
                  1 + i * 0.05
                })`,
                filter: "blur(0.5px)",
                opacity: isHovered ? 0.6 : 0.3,
                transition: "opacity 0.3s ease-out",
              }}
            />
          ))}
        </div>

        {/* Energy particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(16, 185, 129, 0.8), transparent)",
                left: `${
                  50 + Math.cos((rotation * Math.PI) / 180 + i * 45) * 40
                }%`,
                top: `${
                  50 + Math.sin((rotation * Math.PI) / 180 + i * 45) * 40
                }%`,
                transform: `scale(${isHovered ? 1.2 : 0.8})`,
                opacity: isHovered ? 0.6 : 0.3,
                transition: "all 0.3s ease-out",
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        {/* Logo Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-40 h-40 transition-all duration-500"
            style={{
              transform: `
                rotateX(${mousePosition.y * 0.5}deg) 
                rotateY(${mousePosition.x * 0.5}deg)
                scale(${isHovered ? 1.05 : 1})
              `,
            }}
          >
            {/* Subtle glow effect */}
            <div
              className={`
              absolute inset-0 rounded-full transition-all duration-500
              ${isHovered ? "blur-2xl opacity-40" : "blur-xl opacity-20"}
            `}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(16, 185, 129, 0.5), transparent 70%)",
              }}
            />

            {/* Logo with glass effect */}
            <div className="relative w-full h-full rounded-full overflow-hidden backdrop-blur-sm bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.png"
                    alt="DevIM Logo"
                    fill
                    priority
                    className={`
                      object-contain transition-all duration-[2000ms]
                      ${isHovered ? "scale-105" : "scale-100"}
                    `}
                  />
                </div>
              </div>

              {/* Subtle energy wave effect */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    repeating-radial-gradient(
                      circle at center,
                      transparent,
                      transparent 15px,
                      rgba(16, 185, 129, 0.05) 15px,
                      rgba(16, 185, 129, 0.05) 30px
                    )
                  `,
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
