"use client";

import { useState, useEffect } from "react";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("2025-02-20T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-12">
      <div className="inline-flex items-center bg-black/20 rounded-xl px-6 py-3">
        <TimeBlock value={timeLeft.days} label="D" />
        <Divider />
        <TimeBlock value={timeLeft.hours} label="H" />
        <Divider />
        <TimeBlock value={timeLeft.minutes} label="M" />
        <Divider />
        <TimeBlock value={timeLeft.seconds} label="S" />
      </div>
    </div>
  );
};

const TimeBlock = ({ value, label }) => (
  <div className="text-center w-16">
    <div className="text-2xl font-bold text-orange-500 tabular-nums">
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-xs text-gray-400 mt-1">{label}</div>
  </div>
);

const Divider = () => (
  <div className="mx-2 text-orange-500/40 text-xl font-light pb-5">:</div>
);

export default Countdown;
