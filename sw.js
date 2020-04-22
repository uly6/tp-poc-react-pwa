// import { setCacheNameDetails } from 'workbox-core';
// import { registerRoute } from 'workbox-routing';
// import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { precacheAndRoute } from 'workbox-precaching';

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);

const { setCacheNameDetails } = workbox.core;
const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute } = workbox.precaching;

self.__WB_DISABLE_DEV_LOGS = false;

// cache names
setCacheNameDetails({
  prefix: 'my-work',
  suffix: 'v1',
});

// injection point for generated precache
precacheAndRoute([{"revision":"456c583e00202be94a16d088e92ac704","url":"android-chrome-192x192.png"},{"revision":"9f4a0e904b4f7b3e94392a98057b5e49","url":"android-chrome-512x512.png"},{"revision":"9a44bc47067b95b642305598551fb87e","url":"apple-touch-icon-128x128.png"},{"revision":"4ee2c5a64a4ab4a4edcfa6d3fd2f258f","url":"apple-touch-icon-144x144.png"},{"revision":"3055062c7792b9e17a185bb3866d0cb8","url":"apple-touch-icon-152x152.png"},{"revision":"84dfc328022f024cd7dfaf5c390e2884","url":"apple-touch-icon-192x192.png"},{"revision":"c04c875a1c7155d32f079a7ccf8953d1","url":"apple-touch-icon-384x384.png"},{"revision":"f044ae4e2be34c65598f661c59de274e","url":"apple-touch-icon-512x512.png"},{"revision":"a8302b0a004a04ccd0878701612f0f11","url":"apple-touch-icon-72x72.png"},{"revision":"b55e2c90ce6a3e8bd890ec5028433686","url":"apple-touch-icon-96x96.png"},{"revision":"ff8436dd7b6f77466d01ea5e9ab3fb39","url":"apple-touch-icon.png"},{"revision":"a9e720c1b40d9f5ddd4ad0186faf0bf5","url":"favicon-16x16.png"},{"revision":"40219b86db232434de5295d6f53a2ede","url":"favicon-32x32.png"},{"revision":"41443886027e8756a004371a727d2771","url":"favicon.ico"},{"revision":"8079095affbe909138bbcbb120783688","url":"index.html"},{"revision":"e3fda3356983c9ea222f7b44d681f8c8","url":"mstile-150x150.png"},{"revision":"eac203985bdb019f84605aac04abb861","url":"static/css/main.5ecd60fb.chunk.css"},{"revision":"fdf41a5507069160bef58953645be210","url":"static/js/2.f42324d0.chunk.js"},{"revision":"0749163b59fbee32225059cb60c18af6","url":"static/js/2.f42324d0.chunk.js.LICENSE.txt"},{"revision":"2b8d6662e14a27ed356700b931b67ae8","url":"static/js/main.525bb2b4.chunk.js"},{"revision":"cd43afb07b066ddc41e7a0fd8fb59859","url":"static/js/runtime-main.13f3d6df.js"}]);

// cache the Google Fonts stylesheets
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// cache the underlying font files
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-webfonts',
  }),
);

// cache images
registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        // Keep at most 50 entries.
        maxEntries: 50,
        // Don't keep any entries for more than 30 days.
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true,
      }),
    ],
  }),
);

// skip waiting if user accept the prompt for update
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
