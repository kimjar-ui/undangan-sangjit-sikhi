import type { Metadata } from "next";
import { Fraunces, Manrope, Alex_Brush } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sikhi & Yuniar — The Sangjit Of",
  description: "Dengan penuh syukur, kami mengundang Anda untuk hadir dalam acara Sangjit kami.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${manrope.variable} ${alexBrush.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
