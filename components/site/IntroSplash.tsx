"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/site/Logo";

const SESSION_KEY = "ht_intro_seen";

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // localStorage/sessionStorage erişilemezse yine de göster
    }
    setVisible(true);

    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // kritik değil
      }
    }, 3700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite transition-opacity duration-500 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="intro-logo">
        <Logo className="h-20 w-20 sm:h-24 sm:w-24" />
      </div>
      <p className="intro-text mt-6 font-display text-lg font-bold uppercase tracking-widest text-white sm:text-xl">
        <span className="text-spark">HT</span> Makina Taşlama
      </p>
      <div className="mt-5 h-0.5 w-28 overflow-hidden rounded-full bg-steel2">
        <div className="intro-bar h-full w-0 bg-spark-gradient" />
      </div>
    </div>
  );
}
