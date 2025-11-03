// Service Worker for Rawat Innovations
// Implements caching strategies for optimal performance

const STATIC_CACHE = 'rawat-innovations-static-v1.0.1';
const DYNAMIC_CACHE = 'rawat-innovations-dynamic-v1.0.1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png',
  '/next.svg',
  '/vercel.svg',
  '/window.svg',
  '/globe.svg',
  '/file.svg',
  '/offline.html',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Let Next.js handle its own assets for best compatibility
  if (url.pathname.startsWith('/_next/')) return;

  // Handle different resource types
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)) {
    // Cache-first strategy for images
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (url.pathname.match(/\.(css|js)$/)) {
    // Stale-while-revalidate for CSS/JS
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else if (
    url.pathname === '/' ||
    url.pathname.match(/\/(about|services|portfolio|blog|contact)/)
  ) {
    // Network-first for pages
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else {
    // Cache-first for other static assets
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  }
});

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    // Return offline fallback if available
    if (request.destination === 'document') {
      return (
        caches.match('/offline.html') ||
        new Response('Offline', { status: 503 })
      );
    }
    return new Response('', { status: 404 });
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network-first strategy failed:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline fallback for pages
    if (request.destination === 'document') {
      return (
        caches.match('/offline.html') ||
        new Response('Offline', { status: 503 })
      );
    }
    return new Response('', { status: 404 });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return cachedResponse || fetchPromise;
}

// Background sync for forms
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Implementation for syncing forms when back online
  // This would typically involve IndexedDB operations
  console.log('Background sync triggered');
}
