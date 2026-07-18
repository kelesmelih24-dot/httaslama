"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Logo from "@/components/site/Logo";

const primaryLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/blog", label: "Blog" },
];

const moreLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/on-siparis", label: "Ön Sipariş" },
  { href: "/yorumlar", label: "Yorumlar" },
  { href: "/sss", label: "SSS" },
];

export default function Navbar({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-spark bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-wide">
          <Logo className="h-9 w-9 shrink-0" />
          <span><span className="text-spark">HT</span> <span className="text-gray-900">MAKİNA TAŞLAMA</span></span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-sm font-medium uppercase tracking-wider text-gray-600 transition hover:text-spark"
            >
              {l.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button className="flex items-center gap-1 font-display text-sm font-medium uppercase tracking-wider text-gray-600 transition hover:text-spark">
              Kurumsal <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full w-52 border border-gray-200 bg-white py-2 shadow-lg">
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2.5 font-display text-xs font-medium uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-spark"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/iletisim"
            className="font-display text-sm font-medium uppercase tracking-wider text-gray-600 transition hover:text-spark"
          >
            İletişim
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm font-medium text-gray-900"
          >
            <Phone size={16} className="text-spark" /> {phone}
          </a>
          <Link
            href="/iletisim"
            className="bg-spark-gradient rounded-sm px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
          >
            Teklif Al
          </Link>
        </div>

        <button
          className="text-gray-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 px-5 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1 pt-4">
            {[...primaryLinks, ...moreLinks, { href: "/iletisim", label: "İletişim" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 font-display text-sm font-medium uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-spark"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/iletisim"
              onClick={() => setOpen(false)}
              className="bg-spark-gradient mt-3 rounded-sm px-5 py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-white"
            >
              Teklif Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
