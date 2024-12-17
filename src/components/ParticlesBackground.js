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

    // Initialize particles with optimized count
    const initParticles = () => {
      particles.current = [];
      const numberOfParticles = Math.min(
        50,
        Math.floor((canvas.width * canvas.height) / 25000)
      );
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Optimized animation
    const animate = (timestamp) => {
      const deltaTime = timestamp - lastTime;
      if (deltaTime < 1000 / 30) { // Cap at 30 FPS
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Update position with delta time
        particle.x += particle.speedX * (deltaTime / 16);
        particle.y += particle.speedY * (deltaTime / 16);

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate distance to mouse
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interactive effect with mouse
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
          particle.opacity = Math.min(0.8, particle.opacity + force * 0.2);
        } else {
          particle.opacity = Math.max(0.2, particle.opacity - 0.01);
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections (only to nearby particles)
        for (let j = index + 1; j < particles.current.length; j++) {
          const otherParticle = particles.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 0.15 * (1 - distance / 120);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Throttled event handlers
    let isThrottled = false;
    const throttleTime = 16; // ~60fps

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