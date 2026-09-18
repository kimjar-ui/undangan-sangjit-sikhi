"use client";

import { useEffect, useState } from "react";
import Divider from "./Divider";

type TimeLeft = {
  hari: number;
  jam: number;
  menit: number;
  detik: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
    jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
    menit: Math.floor((diff / (1000 * 60)) % 60),
    detik: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(target));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const units: { label: string; value: number }[] = timeLeft
    ? [
        { label: "Hari", value: timeLeft.hari },
        { label: "Jam", value: timeLeft.jam },
        { label: "Menit", value: timeLeft.menit },
        { label: "Detik", value: timeLeft.detik },
      ]
    : [
        { label: "Hari", value: 0 },
        { label: "Jam", value: 0 },
        { label: "Menit", value: 0 },
        { label: "Detik", value: 0 },
      ];

  return (
    <section className="bg-maroon-deep px-6 py-20 text-center">
      <p className="font-body text-xs tracking-wide2 text-gold">
        Menghitung Hari
      </p>
      <Divider className="my-6 opacity-80" />
      <div className="mx-auto grid max-w-content grid-cols-4 gap-3 sm:gap-6">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center rounded-sm border border-gold/30 py-5"
          >
            <span
              className="font-display text-3xl text-ivory sm:text-4xl"
              suppressHydrationWarning
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-2 font-body text-xs text-ivory/60">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
