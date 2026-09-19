"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CoupleFeature from "@/components/CoupleFeature";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import PhotoBackdrop from "@/components/PhotoBackdrop";
import EventDetails from "@/components/EventDetails";
import RSVPForm from "@/components/RSVPForm";
import WishList from "@/components/WishList";
import MusicPlayer from "@/components/MusicPlayer";

const WEDDING_DATE = "2026-11-01T10:00:00+07:00";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main>
      <MusicPlayer src="/audio/wedding-song.mp3" />
      <Hero
        groomName="Sikhi Vessabhu"
        brideName="Yuniar Melania"
        eventDate="Minggu, 01 November 2026"
      />

      <CoupleFeature />

      <Countdown targetDate={WEDDING_DATE} />

      <Gallery />

      <EventDetails />

      <PhotoBackdrop />

      <section className="bg-ivory px-6 py-20">
        <RSVPForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
      </section>

      <WishList refreshKey={refreshKey} />

      <footer className="bg-maroon-deep px-6 py-10 text-center">
        <p className="font-script text-3xl text-gold-light">
          Yuniar &amp; Sikhi
        </p>
        <p className="mt-2 font-body text-xs text-ivory/50">
          Terima kasih telah menjadi bagian dari hari bahagia kami.
        </p>
      </footer>
    </main>
  );
}
