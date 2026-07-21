// HT Makina Taşlama — Yönetim Paneli PWA service worker
// Basit tutuldu: asıl amaç "yüklenebilirlik" şartını sağlamak.
// Ağır offline önbellekleme yapmıyor, admin panelinin her zaman güncel
// verilerle açılmasını istediğimiz için sayfaları önbelleklemiyoruz.

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
