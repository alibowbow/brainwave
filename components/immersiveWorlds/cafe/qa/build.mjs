import {build} from 'vite';
import {fileURLToPath} from 'node:url';
// Deliberately isolated from the application entry and PWA plugin.
// .mjs avoids the application's broad .js precache: this optional review page
// must not add the café renderer to every user's first-visit download.
await build({configFile:false,root:fileURLToPath(new URL('.',import.meta.url)),base:'./',esbuild:{jsx:'automatic'},build:{outDir:fileURLToPath(new URL('../../../../public/immersive-worlds/cafe/pilot/',import.meta.url)),emptyOutDir:true,rollupOptions:{output:{entryFileNames:'cafe-pilot-[hash].mjs'}}}});
