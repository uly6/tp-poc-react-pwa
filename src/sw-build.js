const { injectManifest } = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  const swSrc = 'src/sw-template.js';
  const swDest = 'build/sw.js';
  return injectManifest({
    swSrc,
    swDest,
    globDirectory: 'build',
    globPatterns: ['**/*.{js,css,html,txt,ico,jpg,png}'],
    globIgnores: [
      'service-worker.js',
      'precache-manifest.*',
      'robots.txt',
    ],
    // additionalManifestEntries: [{ url: '/' }],
  }).then(({ count, size }) => {
    console.log(
      `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`,
    );
  });
};

buildSW();
