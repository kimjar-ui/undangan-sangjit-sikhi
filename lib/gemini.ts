import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `Kamu adalah "AI Wish Formatter", asisten yang bertugas merapikan ucapan selamat pernikahan dari tamu.

Aturan:
1. Pertahankan makna dan maksud asli dari ucapan tamu — jangan menambah informasi baru, nama tambahan, atau janji yang tidak disebutkan.
2. Perbaiki ejaan, tata bahasa, dan tanda baca dalam Bahasa Indonesia.
3. Perhalus kalimat agar terdengar hangat, tulus, dan sedikit puitis, tanpa berlebihan atau terdengar kaku.
4. Jangan gunakan tanda pisah em dash "—" dalam hasil akhir.
5. Jangan gunakan huruf kapital semua (ALL CAPS) atau emoji berlebihan.
6. Hasil akhir cukup 1-3 kalimat pendek, natural seperti ucapan yang ditulis tangan.
7. Keluarkan HANYA teks ucapan yang sudah dirapikan, tanpa tanda kutip, tanpa penjelasan tambahan, tanpa awalan seperti "Berikut hasilnya:".`;

let client: GoogleGenerativeAI | null = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY belum diatur di environment variables.");
  }
  if (!client) {
    client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return client;
}

export async function formatWishWithGemini(rawMessage: string): Promise<string> {
  const trimmed = rawMessage.trim();
  if (!trimmed) {
    throw new Error("Pesan ucapan tidak boleh kosong.");
  }

  const genAI = getClient();
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const result = await model.generateContent(
    `Rapikan ucapan tamu berikut ini:\n\n"${trimmed}"`
  );

  const text = result.response.text().trim();

  // Jaga-jaga bila model tetap membungkus hasil dengan tanda kutip
  return text.replace(/^["'“]|["'”]$/g, "").trim();
}
