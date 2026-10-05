import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
const root=new URL('../',import.meta.url);
const assets=JSON.parse(await readFile(new URL('design-source/mosi/encoded-assets.json',root),'utf8'));
const output=new URL('public/immersive-worlds/mosi/',root);await mkdir(output,{recursive:true});
for(const [name,value] of Object.entries(assets)){
 if(!/^(mosi-room\.glb|(?:phone_1x2|tablet_3x4|fold_square|desktop_16x9|wide_2x1)\.webp)$/.test(name))throw new Error('Unexpected asset filename');
 await writeFile(new URL(name,output),gunzipSync(Buffer.from(value,'base64')));
}
