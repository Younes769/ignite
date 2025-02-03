import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Schedule from "@/components/Schedule";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Sponsors from "@/components/Sponsors";
import PreviousEvents from "@/components/PreviousEvents";

const BackgroundEffects = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundEffects />
      <div className="relative">
        <Hero />
        <Stats />
        <About />
        <PreviousEvents />
        <Schedule />
        <Sponsors />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
