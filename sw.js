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
  workbox.precaching.precacheAndRoute([
  {
    "url": "android-chrome-192x192.png",
    "revision": "456c583e00202be94a16d088e92ac704"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "9f4a0e904b4f7b3e94392a98057b5e49"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "ff8436dd7b6f77466d01ea5e9ab3fb39"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "a9e720c1b40d9f5ddd4ad0186faf0bf5"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "40219b86db232434de5295d6f53a2ede"
  },
  {
    "url": "favicon.ico",
    "revision": "41443886027e8756a004371a727d2771"
  },
  {
    "url": "index.html",
    "revision": "d7a7136eed68c55369c20a021ed89bc3"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "e3fda3356983c9ea222f7b44d681f8c8"
  },
  {
    "url": "static/css/main.5ecd60fb.chunk.css",
    "revision": "eac203985bdb019f84605aac04abb861"
  },
  {
    "url": "static/js/2.a441141e.chunk.js",
    "revision": "3b9633d419ca07803a0a9f4df0580ee4"
  },
  {
    "url": "static/js/2.a441141e.chunk.js.LICENSE.txt",
    "revision": "0749163b59fbee32225059cb60c18af6"
  },
  {
    "url": "static/js/main.e55a2bdd.chunk.js",
    "revision": "b22234a48dbb83f3b080c6845719b908"
  },
  {
    "url": "static/js/runtime-main.efee8712.js",
    "revision": "e1adc2e7ba7e8f5762570dcd347ef39b"
  }
]);

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
