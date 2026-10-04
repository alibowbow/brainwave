import {build} from 'vite';
import {copyFile} from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const outDir=fileURLToPath(new URL('../../../../public/immersive-worlds/cosmic/preview/',import.meta.url));
// Preserve already-published hashed assets; index.html selects the current build.
await build({configFile:false,root,base:'./',publicDir:false,plugins:[react()],build:{outDir,emptyOutDir:false,chunkSizeWarningLimit:1000,rollupOptions:{output:{entryFileNames:"assets/cosmic-harness-[hash].mjs",chunkFileNames:"assets/cosmic-[name]-[hash].mjs"}}}});

await copyFile(new URL('./Pretendard-OFL.txt',import.meta.url),outDir+'Pretendard-OFL.txt');
await copyFile(new URL('../../../../node_modules/three/LICENSE',import.meta.url),outDir+'Three-MIT.txt');
await copyFile(new URL('../../../../node_modules/react/LICENSE',import.meta.url),outDir+'React-MIT.txt');
