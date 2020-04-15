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
    "url": "apple-touch-icon-128x128.png",
    "revision": "9a44bc47067b95b642305598551fb87e"
  },
  {
    "url": "apple-touch-icon-144x144.png",
    "revision": "4ee2c5a64a4ab4a4edcfa6d3fd2f258f"
  },
  {
    "url": "apple-touch-icon-152x152.png",
    "revision": "3055062c7792b9e17a185bb3866d0cb8"
  },
  {
    "url": "apple-touch-icon-192x192.png",
    "revision": "2e551402654d5cb449eadf6e37135197"
  },
  {
    "url": "apple-touch-icon-384x384.png",
    "revision": "2e551402654d5cb449eadf6e37135197"
  },
  {
    "url": "apple-touch-icon-512x512.png",
    "revision": "2e551402654d5cb449eadf6e37135197"
  },
  {
    "url": "apple-touch-icon-72x72.png",
    "revision": "a8302b0a004a04ccd0878701612f0f11"
  },
  {
    "url": "apple-touch-icon-96x96.png",
    "revision": "b55e2c90ce6a3e8bd890ec5028433686"
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
    "revision": "fbffb1280b6ffc5955964d169a3bc17b"
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
    "url": "static/js/2.93183817.chunk.js",
    "revision": "9c68355e31ce0c90872af250805e52ce"
  },
  {
    "url": "static/js/2.93183817.chunk.js.LICENSE.txt",
    "revision": "0749163b59fbee32225059cb60c18af6"
  },
  {
    "url": "static/js/main.926a1922.chunk.js",
    "revision": "7cba7427b09859424f47cdc3f5cdf3b2"
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
