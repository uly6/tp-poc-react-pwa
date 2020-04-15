importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  workbox.core.setCacheNameDetails({
    prefix: 'tp-poc-react-pwa',
    suffix: 'v1',
  });

  workbox.core.clientsClaim();

  // injection point for manifest
  workbox.precaching.precacheAndRoute([]);

  // ############################
  // CUSTOM CACHE RULES
  // ############################

  workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL('index.html'),
    {
      blacklist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
    },
  );

  // other images not in the static folder
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );

  // fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com.*$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200, 404],
        }),
      ],
    }),
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
