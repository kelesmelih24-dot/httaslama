"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register("/sw.js", { scope: "/yonetim" })
      .then((reg) => {
        // Kurulu eski bir service worker varsa güncellemeyi hemen kontrol et
        reg.update().catch(() => {});
      })
      .catch((err) => console.error("Service worker kaydı başarısız:", err));
  }, []);

  return null;
}
