/**
 * SERVICE WORKER OFFLINE-FIRST
 * Del valle a la mesa, de la mesa a las estrellas
 * Versión de caché: v3-elqui-experiencia
 */

const CACHE_NAME = 'elqui-experience-v3';

const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'admin.html',
  'recetario.html',
  'recetario/index.html',
  'recetario/Recetario-Elqui.pdf',
  'estilos/main.css',
  'scripts/accessibility.js',
  'scripts/games.js',
  'scripts/gallery.js',
  'scripts/chatbot.js',
  'scripts/forms.js',
  'scripts/main.js',
  'data/site.json',
  'fuentes/nunito-latin-400-normal.woff2',
  'fuentes/nunito-latin-600-normal.woff2',
  'fuentes/nunito-latin-700-normal.woff2',
  'fuentes/nunito-latin-800-normal.woff2',
  'imagenes/fauna/zorro-culpeo.jpg',
  'imagenes/fauna/zorro-culpeo.webp',
  'imagenes/fauna/vizcacha.jpg',
  'imagenes/fauna/vizcacha.webp',
  'imagenes/fauna/guanaco.jpg',
  'imagenes/fauna/guanaco.webp',
  'imagenes/fauna/puma.jpg',
  'imagenes/fauna/puma.webp',
  'imagenes/fauna/condor-andino.jpg',
  'imagenes/fauna/condor-andino.webp',
  'imagenes/fauna/aguila-mora.jpg',
  'imagenes/fauna/aguila-mora.webp',
  'imagenes/fauna/loro-tricahue.jpg',
  'imagenes/fauna/loro-tricahue.webp',
  'imagenes/fauna/picaflor-cordillerano.jpg',
  'imagenes/fauna/picaflor-cordillerano.webp',
  'imagenes/sol-cocina.svg',
  'imagenes/cactus-elqui.svg',
  'imagenes/constelaciones.svg',
  'imagenes/foto_01.jpg',
  'imagenes/foto_02.jpg',
  'imagenes/foto_04.jpg',
  'imagenes/foto_05.jpg',
  'imagenes/foto_06.jpg',
  'imagenes/foto_07.jpg',
  'imagenes/foto_08.jpg',
  'imagenes/foto_09.jpg',
  'imagenes/foto_10.jpg',
  'imagenes/foto_11.jpg',
  'imagenes/foto_12.jpg',
  'imagenes/foto_13.jpg',
  'imagenes/foto_14.jpg',
  'imagenes/foto_15.jpg',
  'imagenes/foto_16.jpg',
  'imagenes/foto_17.jpg',
  'imagenes/foto_18.jpg',
  'imagenes/foto_20.jpg',
  'imagenes/foto_21.jpg',
  'imagenes/foto_22.jpg',
  'imagenes/foto_23.jpg',
  'imagenes/foto_01.webp',
  'imagenes/foto_02.webp',
  'imagenes/foto_04.webp',
  'imagenes/foto_05.webp',
  'imagenes/foto_06.webp',
  'imagenes/foto_07.webp',
  'imagenes/foto_08.webp',
  'imagenes/foto_09.webp',
  'imagenes/foto_10.webp',
  'imagenes/foto_11.webp',
  'imagenes/foto_12.webp',
  'imagenes/foto_13.webp',
  'imagenes/foto_14.webp',
  'imagenes/foto_15.webp',
  'imagenes/foto_16.webp',
  'imagenes/foto_17.webp',
  'imagenes/foto_18.webp',
  'imagenes/foto_20.webp',
  'imagenes/foto_21.webp',
  'imagenes/foto_22.webp',
  'imagenes/foto_23.webp',
  'imagenes/logo_valle_a_las_estrellas.jpg',
  'imagenes/logo_valle_a_las_estrellas.webp',
  'imagenes/logo_valle_a_las_estrellas_thumb.webp',
  'imagenes/equipo_estudiantes.jpg',
  'imagenes/equipo_estudiantes.webp',
  'imagenes/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Precargando activos offline');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Service Worker: Limpiando caché antigua', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Ignorar peticiones a la API serverless para no cachear respuestas de correo
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Para documentos HTML / navegación: Network-First (con fallback a caché si está offline)
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request).then(cached => cached || caches.match('index.html'));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
