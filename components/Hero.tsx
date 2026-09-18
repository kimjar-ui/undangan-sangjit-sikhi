"use client";

import { motion } from "framer-motion";
import { CloudBorder, CraneMotif, PlumBlossomCorner } from "./motifs";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const scriptReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({
  groomName,
  brideName,
  eventDate,
}: {
  groomName: string;
  brideName: string;
  eventDate: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-maroon-deep px-6 py-24 text-center">
      <CloudBorder className="absolute inset-x-0 top-0 h-14 w-full text-gold-light/70" />

      <PlumBlossomCorner className="absolute left-2 top-16 h-24 w-24 text-gold-light/40 sm:h-32 sm:w-32" />
      <PlumBlossomCorner className="absolute bottom-16 right-2 h-24 w-24 -scale-x-100 text-gold-light/40 sm:h-32 sm:w-32" />

      <CraneMotif className="absolute left-4 top-1/3 h-16 w-20 text-gold-light/50 sm:h-20 sm:w-28" />
      <CraneMotif flip className="absolute right-4 top-1/3 h-16 w-20 text-gold-light/50 sm:h-20 sm:w-28" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p variants={item} className="font-body text-xs tracking-wide2 text-gold-light/90">
          Undangan Sangjit
        </motion.p>

        <motion.div variants={scriptReveal} className="my-6">
          <h1 className="font-script text-6xl leading-none text-gold-light sm:text-7xl">
            {brideName}
          </h1>
          <p className="my-2 font-display text-xl italic text-ivory/80">&amp;</p>
          <h1 className="font-script text-6xl leading-none text-gold-light sm:text-7xl">
            {groomName}
          </h1>
        </motion.div>

        <motion.div
          variants={item}
          className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-light to-transparent"
        />

        <motion.p variants={item} className="max-w-content font-body text-sm leading-relaxed text-ivory/85">
          Dengan penuh syukur, kami mengundang Bapak/Ibu/Saudara/i untuk
          berkenan hadir dalam acara Sangjit kami.
        </motion.p>

        <motion.p variants={item} className="mt-5 font-body text-sm tracking-wide text-gold-light">
          {eventDate}
        </motion.p>
      </motion.div>

      <CloudBorder className="absolute inset-x-0 bottom-0 h-14 w-full rotate-180 text-gold-light/70" />
    </section>
  );
}
