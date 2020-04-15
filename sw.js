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
    "url": "favicon.ico",
    "revision": "631e844dab1488d0a81270eefb6ed9d8"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "5d2404de38b82331b8726d9af53fd238"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "751dd18f09191f43c8afd41fdf4daa4f"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "4b5cb4f1f5d59e917471a2470f51cb41"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "57ca57ab099569f207befb1cba4fc026"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "ee1374eab82a4589a1a3e3a8fc737c36"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "e4d2f10c87dabc916bd67d9f10959746"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "7c5d72e5eb8ceae6202cf286bcb24926"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "d757b3703f0171977ef1e9a072c74206"
  },
  {
    "url": "index.html",
    "revision": "2693a02b6a4c6dc85d2e15fbb53f5a35"
  },
  {
    "url": "static/css/main.5ecd60fb.chunk.css",
    "revision": "eac203985bdb019f84605aac04abb861"
  },
  {
    "url": "static/js/2.709bc133.chunk.js",
    "revision": "ff425414c16acdacdc60df1c87d5fe04"
  },
  {
    "url": "static/js/2.709bc133.chunk.js.LICENSE.txt",
    "revision": "0749163b59fbee32225059cb60c18af6"
  },
  {
    "url": "static/js/main.271d64fa.chunk.js",
    "revision": "2b12d45ddab3e0953b33ca051617336b"
  },
  {
    "url": "static/js/runtime-main.c69d12cd.js",
    "revision": "e7fc08724208e47e9871ad2dd2a8d551"
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