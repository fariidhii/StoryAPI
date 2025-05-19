self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open('storyapp-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        // tambahkan file statis lain jika perlu
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Push Notification
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'Notifikasi';
  const options = data.options || {
    body: 'Ada notifikasi baru!',
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
