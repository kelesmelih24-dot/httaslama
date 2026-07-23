"use client";

import { useEffect, useState } from "react";
import { Download, Check } from "lucide-react";

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setInstalled(isStandalone);

    // Sayfa hidrate olmadan önce yakalanmış bir sinyal varsa onu kullan
    const early = (window as any).__deferredInstallPrompt;
    if (early) {
      setDeferredPrompt(early);
    }

    function handleBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e);
    }
    function handleInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleClick() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      return;
    }
    // Otomatik yükleme desteklenmiyorsa (örn. iOS Safari) manuel talimat göster
    setShowHelp((v) => !v);
  }

  if (installed) {
    return (
      <div className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-metalDim">
        <Check size={17} className="text-spark" /> Uygulama yüklü
      </div>
    );
  }

  const isIOS = typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent);

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-metalDim transition hover:bg-graphite hover:text-spark"
      >
        <Download size={17} /> Uygulamayı Yükle
      </button>
      {showHelp && (
        <div className="absolute bottom-full left-0 mb-2 w-64 rounded-sm border border-steel2 bg-graphite p-3 text-xs leading-relaxed text-metalDim shadow-lg">
          {isIOS ? (
            <>
              Bu tarayıcıda otomatik yükleme desteklenmiyor. iPhone/iPad&apos;de:
              Paylaş ikonuna dokunun → &quot;Ana Ekrana Ekle&quot;yi seçin.
            </>
          ) : (
            <>
              Otomatik yükleme penceresi şu an açılamadı. Tarayıcının adres
              çubuğundaki yükleme simgesine (⊕ veya bilgisayar ikonu) tıklayıp
              deneyebilir, ya da tarayıcı menüsünden &quot;Uygulamayı Yükle&quot; /
              &quot;Ana ekrana ekle&quot; seçeneğini arayabilirsiniz. Uygulama zaten
              yüklüyse bu buton gerekmez.
            </>
          )}
        </div>
      )}
    </div>
  );
}
