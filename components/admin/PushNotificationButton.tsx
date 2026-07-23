"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing, BellOff } from "lucide-react";
import { subscribeToPush, unsubscribeFromPush } from "@/lib/actions/push";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

type Status = "unsupported" | "denied" | "off" | "on" | "loading";

export default function PushNotificationButton() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    try {
      const reg = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
      ]);
      const existing = await reg.pushManager.getSubscription();
      setStatus(existing ? "on" : "off");
    } catch {
      // service worker 5 saniyede hazır olmadıysa yine de butonu kullanılabilir yap
      setStatus("off");
    }
  }

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleEnable() {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus(permission === "denied" ? "denied" : "off");
        return;
      }
      const reg = await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<ServiceWorkerRegistration>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 8000)
        ),
      ]);
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        setErrorMsg("VAPID anahtarı tanımlı değil (site yeniden deploy edilmemiş olabilir).");
        setStatus("off");
        return;
      }
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      const json = sub.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } };
      const result = await subscribeToPush(json);
      if (!result?.ok) {
        setErrorMsg(
          `Abonelik tarayıcıda oluşturuldu ama sunucuya kaydedilemedi${
            result?.error ? `: ${result.error}` : ""
          }`
        );
        setStatus("off");
        return;
      }
      setStatus("on");
    } catch (err: any) {
      console.error("Bildirim aboneliği başarısız:", err);
      setErrorMsg(err?.message === "timeout" ? "Service worker hazır olmadı, sayfayı yenileyip tekrar deneyin." : "Bildirim aboneliği başarısız oldu.");
      setStatus("off");
    }
  }

  async function handleDisable() {
    setStatus("loading");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await unsubscribeFromPush(sub.endpoint);
        await sub.unsubscribe();
      }
    } finally {
      setStatus("off");
    }
  }

  if (status === "unsupported") return null;

  if (status === "denied") {
    return (
      <div className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-xs leading-snug text-metalDim">
        <BellOff size={17} className="shrink-0" /> Bildirimler tarayıcı ayarlarından
        engellenmiş, izin vermek için site ayarlarını kontrol edin.
      </div>
    );
  }

  if (status === "on") {
    return (
      <button
        onClick={handleDisable}
        className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-metalDim transition hover:bg-graphite hover:text-spark"
      >
        <BellRing size={17} className="text-spark" /> Bildirimler Açık
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleEnable}
        disabled={status === "loading"}
        className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-metalDim transition hover:bg-graphite hover:text-spark disabled:opacity-50"
      >
        <Bell size={17} /> Bildirimleri Etkinleştir
      </button>
      {errorMsg && (
        <p className="px-3 pb-2 text-xs leading-snug text-spark">{errorMsg}</p>
      )}
    </div>
  );
}
