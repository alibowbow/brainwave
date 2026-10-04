/** Reproduce with SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/cafe/qa/bake-environment.mjs */
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { createServer } from 'vite';
import { DataUtils, HalfFloatType } from 'three';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const outputPath = resolve(root, 'public/immersive-worlds/cafe/room-environment.hdr');
const provenancePath = resolve(root, 'public/immersive-worlds/cafe/room-environment.provenance.json');
const maxBytes = 768 * 1024 * 4 * Float32Array.BYTES_PER_ELEMENT;
let rawPixels;

// Radiance scanline RLE: four planar channels, literal packets <=128 bytes,
// repeated packets <=127 bytes. Pixels use the standard 256-scale shared exponent.
function encodeRgbe(pixels, width, height) {
  if (width < 8 || width > 32767) throw new Error('Invalid Radiance RLE width.');
  const output = [];
  const row = new Uint8Array(width * 4);
  const emitChannel = (channel) => {
    let offset = 0;
    const runAt = (start) => {
      let count = 1;
      while (start + count < width && count < 127 && channel[start + count] === channel[start]) count++;
      return count;
    };
    while (offset < width) {
      const run = runAt(offset);
      if (run >= 4) {
        output.push(128 + run, channel[offset]);
        offset += run;
      } else {
        const start = offset++;
        while (offset < width && offset - start < 128 && runAt(offset) < 4) offset++;
        output.push(offset - start);
        for (let i = start; i < offset; i++) output.push(channel[i]);
      }
    }
  };
  for (let y = 0; y < height; y++) {
    row.fill(0);
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
      if (![r, g, b].every(Number.isFinite) || Math.min(r, g, b) < 0) throw new Error('Invalid HDR radiance.');
      const maximum = Math.max(r, g, b);
      if (maximum < 1e-32) continue;
      const exponent = Math.floor(Math.log2(maximum)) + 1;
      const scale = 256 / 2 ** exponent;
      row[x] = Math.floor(r * scale);
      row[width + x] = Math.floor(g * scale);
      row[width * 2 + x] = Math.floor(b * scale);
      row[width * 3 + x] = exponent + 128;
    }
    output.push(2, 2, width >> 8, width & 255);
    for (let channel = 0; channel < 4; channel++) emitChannel(row.subarray(channel * width, (channel + 1) * width));
  }
  const header = `#?RADIANCE\n# Three RoomEnvironment PMREM CubeUV atlas; preserve row order, flipY=false\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`;
  return Buffer.concat([Buffer.from(header, 'ascii'), Buffer.from(output)]);
}

function measureRoundtrip(pixels, hdr, width, height) {
  const arrayBuffer = hdr.buffer.slice(hdr.byteOffset, hdr.byteOffset + hdr.byteLength);
  const decoded = new HDRLoader().setDataType(HalfFloatType).parse(arrayBuffer);
  if (decoded.width !== width || decoded.height !== height) throw new Error('Roundtrip atlas dimensions differ.');
  let sourceMaximum = 0, absoluteMaximum = 0, relativeMaximum = 0, sumAbsolute = 0, sumSquare = 0;
  let nonzeroChannels = 0;
  for (let i = 0; i < pixels.length; i++) {
    if (i % 4 === 3) continue;
    const original = pixels[i];
    const actual = DataUtils.fromHalfFloat(decoded.data[i]);
    const absolute = Math.abs(actual - original);
    sourceMaximum = Math.max(sourceMaximum, original);
    absoluteMaximum = Math.max(absoluteMaximum, absolute);
    if (original > 0) {
      relativeMaximum = Math.max(relativeMaximum, absolute / original);
      nonzeroChannels++;
    }
    sumAbsolute += absolute;
    sumSquare += absolute * absolute;
  }
  const channelCount = width * height * 3;
  return { decoder: 'Three r186 HDRLoader, HalfFloatType; RGBE scale divisor 255, with float16 conversion',
    sourceMaximum, absoluteMaximum, relativeMaximum, meanAbsolute: sumAbsolute / channelCount,
    rootMeanSquare: Math.sqrt(sumSquare / channelCount), channelCount, nonzeroChannels };
}

const server = await createServer({ root, configFile: false, server: { host: '127.0.0.1', port: 0 },
  optimizeDeps: { entries: ['components/immersiveWorlds/cafe/qa/bake-environment.html'] },
  plugins: [{ name: 'cafe-environment-bake-transfer', configureServer(vite) {
    vite.middlewares.use('/__cafe_environment_bake', (request, response) => {
      if (request.method !== 'POST') { response.writeHead(405).end(); return; }
      const chunks = [];
      let size = 0;
      request.on('data', (chunk) => {
        size += chunk.length;
        if (size > maxBytes) { response.writeHead(413).end(); request.destroy(); return; }
        chunks.push(chunk);
      });
      request.on('end', () => { rawPixels = Buffer.concat(chunks); response.writeHead(204).end(); });
    });
  } }] });
let browser;
let bakeTimeout;
try {
  await server.listen();
  const address = server.httpServer.address();
  if (!address || typeof address === 'string') throw new Error('Cannot determine local Vite port.');
  browser = await chromium.launch({ executablePath: process.env.SCENE_BROWSER_PATH, headless: true,
    args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(`http://127.0.0.1:${address.port}/components/immersiveWorlds/cafe/qa/bake-environment.html`);
  await page.waitForFunction(() => typeof window.bakeCafeEnvironment === 'function');
  const bake = await Promise.race([
    page.evaluate(() => window.bakeCafeEnvironment()),
    new Promise((_, reject) => { bakeTimeout = setTimeout(() => reject(new Error('Environment bake exceeded 120 seconds.')), 120000); }),
  ]);
  clearTimeout(bakeTimeout);
  if (errors.length) throw new Error(`Browser bake errors: ${errors.join('; ')}`);
  if (!rawPixels || rawPixels.byteLength !== bake.width * bake.height * 16) throw new Error('Invalid bake readback length.');
  const pixels = new Float32Array(rawPixels.buffer.slice(rawPixels.byteOffset, rawPixels.byteOffset + rawPixels.byteLength));
  const hdr = encodeRgbe(pixels, bake.width, bake.height);
  const quantization = measureRoundtrip(pixels, hdr, bake.width, bake.height);
  if (quantization.sourceMaximum <= 1 || quantization.relativeMaximum > .01) throw new Error('HDR range or roundtrip precision gate failed.');
  const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
  const sources = {};
  for (const path of ['node_modules/three/examples/jsm/environments/RoomEnvironment.js', 'node_modules/three/src/extras/PMREMGenerator.js']) sources[path] = hash(await readFile(resolve(root, path)));
  const metadata = {
    asset: 'room-environment.hdr', sha256: hash(hdr), bytes: hdr.byteLength,
    provenance: 'Generated locally from Three.js MIT-licensed built-in RoomEnvironment and PMREMGenerator; no third-party image downloaded.',
    threeVersion: JSON.parse(await readFile(resolve(root, 'node_modules/three/package.json'), 'utf8')).version,
    parameters: { sigma: .035, size: 256, near: .1, far: 100, position: [0, 0, 0], sceneEnvironmentIntensity: .27 },
    bake, quantization, sourceSha256: sources,
    runtime: { mapping: 'CubeUVReflectionMapping', type: 'HalfFloatType', internalFormat: 'RGBA16F', colorSpace: 'LinearSRGBColorSpace',
      flipY: false, generateMipmaps: false, minFilter: 'LinearFilter', magFilter: 'LinearFilter', usage: 'Sample-only texture; never attached to a framebuffer; bypass automatic PMREM.' },
    orientation: 'Radiance scanlines intentionally keep WebGL readPixels bottom-row-first order. Override HDRLoader default flipY=true to false. Do not reinterpret as an equirectangular environment.',
    encoding: 'Standard Radiance RGBE shared exponent (mantissa floor, scale 256), four-channel scanline RLE. Quantization measured using actual r186 HDRLoader HalfFloat decode.',
    reproduce: 'SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/cafe/qa/bake-environment.mjs',
  };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, hdr);
  await writeFile(provenancePath, JSON.stringify(metadata, null, 2) + '\n');
  console.log(JSON.stringify({ outputPath, bytes: hdr.byteLength, width: bake.width, height: bake.height, sha256: metadata.sha256, quantization }));
} finally {
  clearTimeout(bakeTimeout);
  await browser?.close();
  await server.close();
}
