"use client";

import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
});

export const ClientBackground = () => {
  return (
    <>
      <ParticlesBackground />
      <Background />
    </>
  );
};
