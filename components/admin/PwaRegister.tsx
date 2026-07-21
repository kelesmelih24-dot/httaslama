"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/yonetim" })
        .catch((err) => console.error("Service worker kaydı başarısız:", err));
    }
  }, []);

  return null;
}
