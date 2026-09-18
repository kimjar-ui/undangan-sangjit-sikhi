"use client";

import { useEffect, useState, useCallback } from "react";
import type { Wish } from "@/lib/types";
import Divider from "./Divider";

const ATTENDANCE_LABEL: Record<Wish["attendance"], string> = {
  hadir: "Akan hadir",
  tidak_hadir: "Berhalangan hadir",
  ragu: "Belum pasti",
};

export default function WishList({ refreshKey }: { refreshKey: number }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp");
      const data = await res.json();
      setWishes(data.wishes ?? []);
    } catch {
      // Gagal memuat ucapan tidak menghentikan pengalaman utama
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes, refreshKey]);

  const wishesWithMessage = wishes.filter((w) => w.formattedMessage);

  return (
    <section className="bg-ivory px-6 py-20">
      <div className="mx-auto max-w-content text-center">
        <p className="font-body text-xs tracking-wide2 text-maroon/70">
          Ucapan &amp; Doa
        </p>
        <Divider className="my-6" />

        {loading && (
          <p className="font-body text-sm text-ink/50">Memuat ucapan...</p>
        )}

        {!loading && wishesWithMessage.length === 0 && (
          <p className="font-body text-sm text-ink/50">
            Jadilah yang pertama mengirimkan ucapan dan doa.
          </p>
        )}

        <div className="flex flex-col gap-6 text-left">
          {wishesWithMessage.map((wish) => (
            <div key={wish.id} className="border-b border-ink/10 pb-6">
              <p className="font-display text-lg italic text-maroon-deep">
                &ldquo;{wish.formattedMessage}&rdquo;
              </p>
              <p className="mt-2 font-body text-sm font-medium text-ink">
                {wish.name}
              </p>
              <p className="font-body text-xs text-ink/50">
                {ATTENDANCE_LABEL[wish.attendance]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
