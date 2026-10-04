import {build} from 'vite';
import {copyFile} from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const outDir=fileURLToPath(new URL('../../../../public/immersive-worlds/cosmic/preview/',import.meta.url));
await build({configFile:false,root,base:'./',publicDir:false,plugins:[react()],build:{outDir,emptyOutDir:true,chunkSizeWarningLimit:1000,rollupOptions:{output:{entryFileNames:"assets/cosmic-harness-[hash].mjs"}}}});

await copyFile(new URL('./Pretendard-OFL.txt',import.meta.url),outDir+'Pretendard-OFL.txt');
await copyFile(new URL('../../../../node_modules/three/LICENSE',import.meta.url),outDir+'Three-MIT.txt');
await copyFile(new URL('../../../../node_modules/react/LICENSE',import.meta.url),outDir+'React-MIT.txt');
