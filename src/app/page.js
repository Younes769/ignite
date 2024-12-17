"use client";

import { useState } from 'react';
import Logo from '@/components/Logo';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Schedule from '@/components/Schedule';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import RegistrationModal from '@/components/RegistrationModal';
import ParticlesBackground from '@/components/ParticlesBackground';
import Countdown from '@/components/Countdown';
import Sponsors from '@/components/Sponsors';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Interactive background */}
      <ParticlesBackground />
      
      {/* Countdown timer */}
      <Countdown />

      {/* Main content */}
      <div className="relative">
        <Logo />
        <Hero onRegisterClick={() => setIsModalOpen(true)} />
        <Stats />
        <About />
        <Schedule />
        <Sponsors />
        <FAQ />
        <Footer />
      </div>

      {/* Registration modal */}
      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
