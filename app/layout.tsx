import type { Metadata } from "next";
import { Oswald, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HT Makina Taşlama | Delik, Silindirik ve Satıh Taşlama",
  description:
    "Batuhan Usta ve ekibi; delik taşlama, silindirik taşlama, satıh (yüzey) taşlama ve çapak alma hizmetlerinde mikron hassasiyetinde çözüm sunar. Teklif alın veya ön sipariş verin.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${oswald.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body bg-graphite text-metal antialiased">{children}</body>
    </html>
  );
}
