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
          registerType: 'autoUpdate',
          includeAssets: ['icon.svg', 'apple-touch-icon.png', 'favicon-32x32.png'],
          manifest: {
            name: 'Brainwave · Ritual Studio',
            short_name: 'Brainwave',
            description: '집중·이완·수면을 위한 로컬 퍼스트 뇌파 리듬 및 자연음 스튜디오',
            lang: 'ko',
            theme_color: '#080b13',
            background_color: '#080b13',
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
            // Audio is deliberately absent: nature recordings are fetched only
            // when their layer is selected, then retained by the runtime cache.
            globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,webmanifest}'],
            // Nature plates and cutouts are loaded per scene. Keeping them out
            // of the initial precache prevents the first visit from downloading
            // the entire illustration library.
            globIgnores: ['**/images/nature/**'],
            runtimeCaching: [
              {
                urlPattern: /\/audio\/nature\/.*\.(?:ogg|mp3)$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'nature-audio-v1',
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
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
