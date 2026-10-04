import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const base = env.VITE_BASE_URL || '/';

    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          // Audio replacements must reach an already-installed PWA without
          // leaving the previous service worker in control of the old asset.
          registerType: 'autoUpdate',
          includeAssets: ['icon.svg', 'apple-touch-icon.png', 'favicon-32x32.png'],
          manifest: {
            name: 'Brainwave · Ritual Studio',
            short_name: 'Brainwave',
            description: '집중·이완·수면을 위한 로컬 퍼스트 뇌파 리듬 및 자연음 스튜디오',
            lang: 'ko',
            theme_color: '#4f46e5',
            background_color: '#0f172a',
            display: 'standalone',
            orientation: 'any',
            scope: base,
            start_url: base,
            icons: [
              { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
              { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
              { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
              { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
            ],
          },
          workbox: {
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true,
            // Audio is deliberately absent: nature recordings are fetched only
            // when their layer is selected, then retained by the runtime cache.
            globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,webmanifest}'],
            // Nature plates and cutouts are loaded per scene. Keeping them out
            // of the initial precache prevents the first visit from downloading
            // the entire illustration library.
            globIgnores: ['**/images/nature/**', '**/immersive-worlds/**', '**/assets/world-*.js', '**/assets/RainyWindowScene-*.js', '**/assets/OilSeaScene-*.js', '**/assets/three-*.js'],
            runtimeCaching: [
              {
                // Approved world chunks/assets are fetched on entry, never
                // all thirty worlds at PWA installation time.
                urlPattern: /\/(?:assets\/world-[\w-]+\.js|immersive-worlds\/.*\.(?:webp|png|jpe?g|avif|ktx2|glb|gltf|bin))$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'immersive-worlds-v1',
                  expiration: { maxEntries: 96, maxAgeSeconds: 60 * 60 * 24 * 90 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                // The real-time scenes (the rainy study, the painted seaside) and
                // three.js are fetched only when their routine plays, then kept
                // for offline sessions. (The cache keeps the name it had when it
                // held the study alone, so no stale copy is left behind.)
                urlPattern: /\/assets\/(?:RainyWindowScene|OilSeaScene|three)-[\w-]+\.js$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'focus-scene-v1',
                  expiration: { maxEntries: 6, maxAgeSeconds: 60 * 60 * 24 * 180 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                // Large scene loops are downloaded only after that scene opens.
                urlPattern: /\/video\/nature\/campfire-loop-v\d+\.mp4$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'nature-video-v1',
                  rangeRequests: true,
                  expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 180 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                urlPattern: /\/audio\/nature\/.*\.(?:ogg|mp3)$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'nature-audio-v2',
                  expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 180 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                urlPattern: /\/images\/nature\/.*\.(?:webp|png)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'nature-assets-v3',
                  expiration: { maxEntries: 48, maxAgeSeconds: 60 * 60 * 24 * 180 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
              {
                // Keep the self-hosted Pretendard face available after its first load.
                urlPattern: /\.woff2$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'fonts',
                  expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 365 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
            ],
          },
        }),
      ],
      build: {
        manifest: true,
        rollupOptions: {
          output: {
            // three.js is shared by the real-time scenes and split into a chunk
            // of its own; name it so the service worker can leave it to load
            // with the first scene that needs it.
            chunkFileNames: (chunk) => {
              if (!chunk.isDynamicEntry && chunk.moduleIds.some((id) => id.includes('/node_modules/three/'))) return 'assets/three-[hash].js';
              if (chunk.moduleIds.some((id) => /\/components\/immersiveWorlds\/[^/]+\//.test(id))) return 'assets/world-[name]-[hash].js';
              return 'assets/[name]-[hash].js';
            },
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
