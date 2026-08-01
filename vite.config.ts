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
            name: 'MC Brain Care',
            short_name: 'Brain Care',
            description: '바이노럴 비트와 자연음으로 집중·이완·수면을 돕는 뇌파 케어 앱',
            lang: 'ko',
            theme_color: '#6366f1',
            background_color: '#0f172a',
            display: 'standalone',
            orientation: 'portrait',
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
                // Cache the self-hosted Pretendard font on first load so it works
                // offline, without bloating the precache with a ~2MB file.
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
