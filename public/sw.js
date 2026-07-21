// HT Makina Taşlama — Yönetim Paneli PWA service worker
// Yüklenebilirlik + anlık bildirim (Web Push) + uygulama simgesi rozeti içindir.

const CACHE_NAME = "ht-yonetim-v1";
const PRECACHE_URLS = ["/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Sadece ikon gibi statik varlıkları önbellekten sun; geri kalan her şeyi
// (özellikle /yonetim sayfaları) doğrudan ağdan çek, admin panel her zaman
// güncel veriyle açılsın.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (PRECACHE_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
});

// ---------------- Anlık bildirim (Web Push) ----------------
self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "HT Yönetim", body: event.data ? event.data.text() : "" };
  }

  const title = data.title || "HT Yönetim";
  const options = {
    body: data.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: { url: data.url || "/yonetim" },
  };

  event.waitUntil(
    self.registration.showNotification(title, options).then(async () => {
      // Uygulama simgesindeki kırmızı rozet sayısını güncelle
      // (o an gösterilen bildirim sayısına göre, kaba bir tahmindir)
      try {
        if ("setAppBadge" in self.navigator) {
          const notifs = await self.registration.getNotifications();
          await self.navigator.setAppBadge(notifs.length);
        }
      } catch {
        // Badging API desteklenmiyorsa sessizce yut
      }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    (async () => {
      try {
        if ("clearAppBadge" in self.navigator) {
          await self.navigator.clearAppBadge();
        }
      } catch {
        // yut
      }

      const targetUrl = event.notification.data?.url || "/yonetim";
      const clientList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of clientList) {
        if (client.url.includes("/yonetim") && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })()
  );
});
