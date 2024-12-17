"use client";

import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;

    // Set canvas size with device pixel ratio for retina displays
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const numberOfParticles = Math.min(
        100,
        Math.floor((canvas.width * canvas.height) / 20000)
      );
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 2, // Small, consistent size
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          connections: [], // Track connected particles
        });
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
      
      // Update and draw particles
      particles.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Keep particle within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Reset connections
        particle.connections = [];
      });

      // Find connections and create shapes
      particles.current.forEach((particle, i) => {
        particles.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Connection distance threshold
            particle.connections.push(otherParticle);
            otherParticle.connections.push(particle);
          }
        });
      });

      // Draw connections first (lines behind dots)
      ctx.beginPath();
      particles.current.forEach(particle => {
        particle.connections.forEach(connected => {
          const distance = Math.hypot(particle.x - connected.x, particle.y - connected.y);
          const opacity = 1 - (distance / 150);
          
          ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(connected.x, connected.y);
        });
      });
      ctx.stroke();

      // Draw particles
      particles.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.fill();

        // Optional: Add a subtle glow to connection points
        if (particle.connections.length > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size + 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
          ctx.fill();
        }
      });

      // Find and draw triangles
      particles.current.forEach((p1, i) => {
        p1.connections.forEach((p2, j) => {
          p2.connections.forEach(p3 => {
            if (p3.connections.includes(p1)) {
              // We found a triangle
              const opacity = 0.03;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineTo(p3.x, p3.y);
              ctx.closePath();
              ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
              ctx.fill();
            }
          });
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Throttled event handlers
    let isThrottled = false;
    const throttleTime = 16;

    const handleMouseMove = (e) => {
      if (!isThrottled) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        mouse.current.x = (e.clientX - rect.left) * dpr;
        mouse.current.y = (e.clientY - rect.top) * dpr;
        
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleTime);
      }
    };

    const handleResize = () => {
      if (!isThrottled) {
        setCanvasSize();
        initParticles();
        
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleTime);
      }
    };

    // Initialize
    setCanvasSize();
    initParticles();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default ParticlesBackground; 