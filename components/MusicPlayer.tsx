"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

export default function MusicPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Sebagian besar browser mobile memblokir autoplay bersuara.
    // Jadi lagu baru mulai setelah tamu menekan tombol pertama kali.
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;
    return () => {
      audioRef.current?.pause();
    };
  }, [src]);

  function toggle() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Diamkan bila browser tetap menolak; tombol tetap bisa dicoba lagi
      });
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <button
      onClick={toggle}
      aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-maroon-deep text-ivory shadow-lg transition-transform hover:scale-105"
    >
      {isPlaying ? (
        <Music className="h-5 w-5 animate-pulse" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </button>
  );
}
