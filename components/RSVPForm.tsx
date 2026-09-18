"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check } from "lucide-react";
import Divider from "./Divider";

type Attendance = "hadir" | "tidak_hadir" | "ragu";

export default function RSVPForm({
  onSubmitted,
}: {
  onSubmitted?: () => void;
}) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [formattedPreview, setFormattedPreview] = useState<string | null>(null);
  const [isFormatting, setIsFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleFormatWithAI() {
    if (!message.trim()) return;
    setIsFormatting(true);
    setFormatError(null);
    setFormattedPreview(null);
    try {
      const res = await fetch("/api/format-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Gagal merapikan ucapan.");
      }
      setFormattedPreview(data.formatted);
    } catch (err) {
      setFormatError(
        err instanceof Error ? err.message : "Terjadi kesalahan tak terduga."
      );
    } finally {
      setIsFormatting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attendance,
          guestCount,
          message: formattedPreview ?? message,
        }),
      });
      if (!res.ok) throw new Error("Gagal mengirim RSVP.");
      setSubmitted(true);
      onSubmitted?.();
    } catch (err) {
      setFormatError(
        err instanceof Error ? err.message : "Gagal mengirim, coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-content flex-col items-center py-12 text-center">
        <Check className="h-8 w-8 text-maroon" />
        <p className="mt-4 font-display text-xl italic text-maroon-deep">
          Terima kasih, {name}.
        </p>
        <p className="mt-2 font-body text-sm text-ink/70">
          Konfirmasi kehadiran dan ucapan Anda telah kami terima dengan penuh
          syukur.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content">
      <p className="text-center font-body text-xs tracking-wide2 text-maroon/70">
        Konfirmasi Kehadiran
      </p>
      <Divider className="my-6" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-body text-sm text-ink/80">
            Nama
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap Anda"
            className="border-b border-ink/20 bg-transparent py-2 font-body text-sm text-ink placeholder:text-ink/40 focus:border-maroon"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="attendance" className="font-body text-sm text-ink/80">
            Konfirmasi kehadiran
          </label>
          <select
            id="attendance"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value as Attendance)}
            className="border-b border-ink/20 bg-transparent py-2 font-body text-sm text-ink focus:border-maroon"
          >
            <option value="hadir">Ya, saya akan hadir</option>
            <option value="ragu">Masih belum pasti</option>
            <option value="tidak_hadir">Mohon maaf, berhalangan</option>
          </select>
        </div>

        {attendance === "hadir" && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="guestCount" className="font-body text-sm text-ink/80">
              Jumlah tamu
            </label>
            <input
              id="guestCount"
              type="number"
              min={1}
              max={5}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-24 border-b border-ink/20 bg-transparent py-2 font-body text-sm text-ink focus:border-maroon"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="font-body text-sm text-ink/80">
            Ucapan &amp; doa untuk mempelai
          </label>
          <textarea
            id="message"
            rows={4}
            maxLength={500}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setFormattedPreview(null);
            }}
            placeholder="Tuliskan ucapan Anda di sini..."
            className="resize-none rounded-sm border border-ink/20 bg-white/40 p-3 font-body text-sm text-ink placeholder:text-ink/40 focus:border-maroon"
          />

          <button
            type="button"
            onClick={handleFormatWithAI}
            disabled={!message.trim() || isFormatting}
            className="mt-1 inline-flex w-fit items-center gap-2 font-body text-sm text-maroon transition-colors hover:text-maroon-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isFormatting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Rapikan ucapan dengan AI
          </button>

          {formatError && (
            <p className="font-body text-xs text-maroon-deep">{formatError}</p>
          )}

          {formattedPreview && (
            <div className="mt-2 rounded-sm border border-gold/40 bg-blush/50 p-4">
              <p className="font-body text-[11px] text-maroon/70">
                Saran dari AI Wish Formatter
              </p>
              <p className="mt-2 font-display text-base italic text-maroon-deep">
                &ldquo;{formattedPreview}&rdquo;
              </p>
              <div className="mt-3 flex gap-4">
                <button
                  type="button"
                  onClick={() => setMessage(formattedPreview)}
                  className="font-body text-xs text-maroon underline underline-offset-4 hover:text-maroon-deep"
                >
                  Gunakan versi ini
                </button>
                <button
                  type="button"
                  onClick={() => setFormattedPreview(null)}
                  className="font-body text-xs text-ink/60 underline underline-offset-4 hover:text-ink"
                >
                  Simpan ucapan asli
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim()}
          className="mt-2 rounded-sm bg-maroon py-3 font-body text-sm text-ivory transition-colors hover:bg-maroon-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Konfirmasi"}
        </button>
      </form>
    </div>
  );
}
