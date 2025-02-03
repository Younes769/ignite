"use client";

import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let lastTime = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const createParticle = (x, y) => ({
      x: x || Math.random() * canvas.width,
      y: y || canvas.height + Math.random() * 20,
      size: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 1,
      speedY: -2 - Math.random() * 2,
      life: 1,
      decay: 0.0015 + Math.random() * 0.002,
      temperature: 0.6 + Math.random() * 0.4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.15 + Math.random() * 0.15,
    });

    const initParticles = () => {
      particles.current = [];
      const numberOfParticles = Math.min(
        200,
        Math.floor((canvas.width * canvas.height) / 12000)
      );

      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push(createParticle());
      }
    };

    const getParticleColor = (particle) => {
      const alpha = particle.life * 0.9;
      if (particle.temperature > 0.6) {
        // Hot particles (yellow/white)
        return `hsla(${15 + (1 - particle.temperature) * 15}, 100%, ${
          85 + particle.temperature * 15
        }%, ${alpha})`;
      } else if (particle.temperature > 0.3) {
        // Medium temperature (orange)
        return `hsla(${
          25 + (1 - particle.temperature) * 15
        }, 100%, 60%, ${alpha})`;
      } else {
        // Cooler particles (red)
        return `hsla(${5 + particle.temperature * 15}, 100%, 50%, ${alpha})`;
      }
    };

    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      if (deltaTime < 1000 / 30) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles more frequently
      if (Math.random() < 0.5) {
        const x =
          canvas.width * 0.5 + (Math.random() - 0.5) * canvas.width * 0.6;
        particles.current.push(createParticle(x));
      }

      particles.current = particles.current.filter((particle) => {
        // Update particle position with enhanced wobble
        particle.wobble += particle.wobbleSpeed;
        particle.x += particle.speedX + Math.sin(particle.wobble) * 0.5;
        particle.y += particle.speedY;

        // Simulate rising heat effect
        particle.speedY *= 0.98;
        particle.speedX *= 0.995;

        // Update life and temperature
        particle.life -= particle.decay;
        particle.temperature = Math.max(
          0,
          particle.temperature - particle.decay * 0.3
        );

        // Draw particle with enhanced glow effect
        const color = getParticleColor(particle);

        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.6, color.replace(", 0.9)", ", 0.3)"));
        gradient.addColorStop(1, "hsla(30, 100%, 50%, 0)");

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        return particle.life > 0;
      });

      // Enhanced mouse interaction
      particles.current.forEach((particle) => {
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          particle.speedX -= (dx / distance) * 0.05;
          particle.speedY -= (dy / distance) * 0.05;
          particle.life = Math.min(particle.life + 0.1, 1);
          particle.temperature = Math.min(particle.temperature + 0.2, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouse.current.x = (e.clientX - rect.left) * dpr;
      mouse.current.y = (e.clientY - rect.top) * dpr;
    };

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    setCanvasSize();
    initParticles();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
        mixBlendMode: "screen",
        opacity: 0.8,
      }}
    />
  );
};

export default ParticlesBackground;
