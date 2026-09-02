const CACHE_NAME = 'ngabret-v2';

// Install event - cache file penting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './index.html',
        './SR-FOOTWEAR-Creative-Control-Dashboard.html',
        './editphoto.html',
        './manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - ambil dari network dulu, fallback ke cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
