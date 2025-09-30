const CACHE_NAME = 'cache-v1';
const URLs_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './index-CGzq8Xdl.js',
  './index-G8uQ5-P8.css',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLs_TO_CACHE))
      .catch(err => console.error('Error al cachear durante install:', err))
  );
  self.skipWaiting(); // Para activar inmediatamente
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // Para que el SW controle las páginas abiertas ya
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
      .catch(() => {
        // Opcional: puedes retornar una página offline o imagen fallback aquí
      })
  );
});