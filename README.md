# Undangan Pernikahan Digital — Amara & Bagas

Website undangan pernikahan satu halaman, dibangun dengan Next.js 14 (App Router), Tailwind CSS, dan Framer Motion. Skema warna maroon-ivory-gold.

## Fitur

- **Hero Section** — reveal terkoordinasi (monogram → nama → tanggal) dengan Framer Motion.
- **Countdown** — penghitung mundur real-time menuju hari-H.
- **Detail Acara** — informasi Akad & Resepsi lengkap dengan tautan peta.
- **Formulir RSVP** — konfirmasi kehadiran, jumlah tamu, dan ucapan.
- **AI Wish Formatter** — merapikan ucapan tamu menjadi lebih hangat dan puitis menggunakan Gemini API sebelum ditampilkan di halaman Ucapan & Doa.

## Menjalankan secara lokal

```bash
npm install
cp .env.local.example .env.local
# isi GEMINI_API_KEY di .env.local dengan kunci dari https://aistudio.google.com/app/apikey
npm run dev
```

Buka http://localhost:3000

## Struktur folder

```
app/
  api/format-wish/route.ts   # Endpoint AI Wish Formatter (Gemini)
  api/rsvp/route.ts          # Endpoint simpan & ambil data RSVP (in-memory demo)
  layout.tsx
  page.tsx
  globals.css
components/
  Hero.tsx
  Countdown.tsx
  EventDetails.tsx
  RSVPForm.tsx
  WishList.tsx
  Divider.tsx
lib/
  gemini.ts                  # Wrapper pemanggilan Gemini API
  types.ts
```

## Catatan produksi

- Data RSVP saat ini disimpan sementara di memori server (`app/api/rsvp/route.ts`). Untuk penggunaan nyata, ganti dengan database (Supabase/PlanetScale/Firebase, dll).
- Ubah nama mempelai, tanggal, dan lokasi acara langsung di `app/page.tsx` dan `components/EventDetails.tsx`.
- Model Gemini yang dipakai: `gemini-1.5-flash` — cepat dan cukup untuk tugas merapikan teks singkat. Bisa diganti ke `gemini-1.5-pro` di `lib/gemini.ts` bila ingin hasil lebih halus.
