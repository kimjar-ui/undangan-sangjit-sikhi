import { NextRequest, NextResponse } from "next/server";
import { formatWishWithGemini } from "@/lib/gemini";
import type { Wish } from "@/lib/types";

// Catatan: penyimpanan dalam memori ini hanya untuk demo.
// Untuk produksi, ganti dengan database (mis. Supabase, PlanetScale, dsb).
const wishes: Wish[] = [];

export async function GET() {
  return NextResponse.json({ wishes: wishes.slice().reverse() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, attendance, guestCount, message } = body ?? {};

    if (!name || !attendance) {
      return NextResponse.json(
        { error: "Nama dan status kehadiran wajib diisi." },
        { status: 400 }
      );
    }

    let formattedMessage = message?.trim() || "";
    if (formattedMessage) {
      try {
        formattedMessage = await formatWishWithGemini(formattedMessage);
      } catch {
        // Jika Gemini gagal, gunakan pesan asli sebagai fallback
      }
    }

    const wish: Wish = {
      id: crypto.randomUUID(),
      name,
      attendance,
      originalMessage: message?.trim() || "",
      formattedMessage,
      createdAt: new Date().toISOString(),
    };

    wishes.push(wish);

    return NextResponse.json({ success: true, wish });
  } catch (err) {
    console.error("Gagal menyimpan RSVP:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan RSVP." },
      { status: 500 }
    );
  }
}
