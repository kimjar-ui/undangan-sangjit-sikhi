import { NextRequest, NextResponse } from "next/server";
import { formatWishWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = body?.message ?? "";

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Field 'message' wajib diisi." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang. Maksimal 500 karakter." },
        { status: 400 }
      );
    }

    const formatted = await formatWishWithGemini(message);

    return NextResponse.json({ formatted });
  } catch (err) {
    console.error("Gagal memformat ucapan:", err);
    // Fallback: jika Gemini gagal/kuota habis, kembalikan pesan asli
    // supaya alur RSVP tetap berjalan bagi pengguna.
    return NextResponse.json(
      { error: "AI Wish Formatter sedang tidak tersedia. Pesan asli akan digunakan." },
      { status: 502 }
    );
  }
}
