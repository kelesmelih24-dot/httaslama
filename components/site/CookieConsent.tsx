"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "ht_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage erişilemezse banner'ı yine de göster
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // yut - kritik değil
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-steel2 bg-steel/98 backdrop-blur px-5 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-metalDim sm:items-center">
          <Cookie size={16} className="mt-0.5 shrink-0 text-spark sm:mt-0" />
          Sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. Devam ederek{" "}
          <Link href="/gizlilik-politikasi" className="underline hover:text-spark">
            Gizlilik Politikası
          </Link>
          &apos;nı kabul etmiş olursunuz.
        </p>
        <button
          onClick={accept}
          className="bg-spark-gradient shrink-0 rounded-sm px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider text-white"
        >
          Anladım
        </button>
      </div>
    </div>
  );
}
