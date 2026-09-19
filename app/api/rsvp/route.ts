import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { formatWishWithGemini } from "@/lib/gemini";
import type { Wish } from "@/lib/types";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const WISHES_KEY = "wishes";

export async function GET() {
  try {
    const wishes = (await redis.get<Wish[]>(WISHES_KEY)) || [];
    return NextResponse.json({ wishes: wishes.slice().reverse() });
  } catch (err) {
    console.error("Gagal mengambil daftar ucapan:", err);
    return NextResponse.json({ wishes: [] });
  }
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

    const existing = (await redis.get<Wish[]>(WISHES_KEY)) || [];
    existing.push(wish);
    await redis.set(WISHES_KEY, existing);

    return NextResponse.json({ success: true, wish });
  } catch (err) {
    console.error("Gagal menyimpan RSVP:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyimpan RSVP." },
      { status: 500 }
    );
  }
}
