import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Derive the GitHub Pages base path automatically when none is provided.
    // This also works for branch-based builds that expose GITHUB_REPOSITORY
    // without requiring a manual VITE_BASE_URL override.
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.at(1);
    const base = env.VITE_BASE_URL || (repoName ? `/${repoName}/` : '/');

    return {
      base,
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
