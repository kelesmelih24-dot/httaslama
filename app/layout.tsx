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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.htmakinataslama.com"),
  title: {
    default: "HT Makina Taşlama | Ankara Delik, Silindirik ve Satıh Taşlama Atölyesi",
    template: "%s | HT Makina Taşlama Ankara",
  },
  description:
    "Ankara Yenimahalle'de hizmet veren HT Makina Taşlama; delik taşlama, silindirik taşlama, satıh (yüzey) taşlama, puntalı/puntasız taşlama ve çapak alma hizmetlerinde mikron hassasiyetinde çözüm sunar. Teklif alın veya ön sipariş verin.",
  keywords: [
    "taşlama Ankara",
    "silindirik taşlama Ankara",
    "yüzey taşlama Ankara",
    "delik taşlama Ankara",
    "puntasız taşlama",
    "puntalı taşlama",
    "İvedik OSB taşlama atölyesi",
    "Yenimahalle taşlama",
  ],
  openGraph: {
    title: "HT Makina Taşlama | Ankara Taşlama Atölyesi",
    description: "Ankara Yenimahalle'de mikron hassasiyetinde delik, silindirik ve satıh taşlama hizmetleri.",
    locale: "tr_TR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HT Makina Taşlama" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HT Makina Taşlama | Ankara Taşlama Atölyesi",
    description: "Ankara Yenimahalle'de mikron hassasiyetinde delik, silindirik ve satıh taşlama hizmetleri.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "qnH6Ry4naMZ3R5KiyFX_ViPeSS2vneWK65IHfUBDGc0",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${oswald.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body bg-graphite text-metal antialiased">{children}</body>
    </html>
  );
}
