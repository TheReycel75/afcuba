const CACHE_NAME = 'afcuba-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon-192.png',
  '/icon-512.png'
];


self.addEventListener('install', e => {
  e.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache => {
          return cache.AddAll(urlsToCache)
          .then(() => {
              self.skipWaiting()
          })
      })
      .catch((e) => {
          console.error("Error en el registro de la caché." + e)
      })
    )
});

self.addEventListener('activate', e => {
  const cacheWhiteList = [CACHE_NAME]
  
  e.waitUntil(
      caches.keys()
      .then(cachesName => {
          cachesName.map(cacheName => {
              if(cacheWhiteList.indexOf(cachesName) === -1) {
                return caches.delete(cacheName)
            }
          })
      })
      .then(() => {
          self.clients.claim()
      })
    )
});

self.addEventListener('fetch', e => {
  e.respondWith(
      caches.match(e.request)
      .then(res => {
          if(res) {
              return res
          }
          
          return fetch(e.request)
      })
      )
});

