"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

const Background = () => {
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Throttle mousemove events
    let lastMove = 0;
    window.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastMove > 50) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMove = now;
      }
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.speedY = -Math.random() * 2 - 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 3 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.005;
        this.temperature = Math.random();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Simple mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = 1 - distance / 100;
          this.speedX -= Math.cos(angle) * force * 0.2;
          this.speedY -= Math.sin(angle) * force * 0.2;
        }

        this.speedY *= 0.99;
        this.life -= this.decay;

        if (
          this.life <= 0 ||
          this.y < -10 ||
          this.x < -10 ||
          this.x > canvas.width + 10
        ) {
          this.reset();
        }
      }

      draw(ctx) {
        const alpha = this.life * 0.8;
        const hue = this.temperature > 0.5 ? 30 : 15;
        const lightness = 50 + this.temperature * 20;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Dynamic particle count based on screen size
    const particleCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 20000)
    );
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      const activeParticles = particles.filter((p) => p.life > 0.2);
      for (let i = 0; i < activeParticles.length; i++) {
        for (let j = i + 1; j < activeParticles.length; j++) {
          const dx = activeParticles[i].x - activeParticles[j].x;
          const dy = activeParticles[i].y - activeParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            const alpha = (1 - distance / 50) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 140, 50, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(activeParticles[i].x, activeParticles[i].y);
            ctx.lineTo(activeParticles[j].x, activeParticles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // FPS limiting for better performance
    let lastFrame = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp) => {
      if (timestamp - lastFrame >= frameInterval) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawConnections();
        particles.forEach((particle) => {
          particle.update();
          particle.draw(ctx);
        });

        lastFrame = timestamp;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", null);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClient, windowSize]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 -z-50">
      <canvas ref={canvasRef} className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
    </div>
  );
};

export default Background;
