// One-shot asset remaster: decode each CC0 recording in a real browser,
// apply makeup gain + a soft-knee peak limiter (ceiling -5 dBTP so the
// manifest's -3 dBTP @ max-fader budget holds), then encode a single
// universal MP3 via lamejs. Prints the new manifest numbers per asset.
//
// Usage: npm i --no-save lamejs && npm run dev (port 3000) && node scripts/remaster-samples.mjs
// Edit JOBS below (source file, output name, gain dB, MP3 kbps) per batch.
import { chromium } from 'playwright-core';
import { createRequire } from 'module';
import { writeFileSync } from 'fs';
import { createHash } from 'crypto';
const require = createRequire(import.meta.url);
const lamejs = require('lamejs');
// Known lamejs packaging bug: these classes are referenced as bare globals.
globalThis.MPEGMode = require('lamejs/src/js/MPEGMode');
globalThis.Lame = require('lamejs/src/js/Lame');
globalThis.BitStream = require('lamejs/src/js/BitStream');

const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = '/home/user/brainwave/public/audio/nature/';

// [srcFile, outName, gainDb, kbps]
const JOBS = [
  ['rain-rural-cc0-v1.ogg',            'rain-rural-cc0-v2.mp3',        10,   96],
  ['creek-brook-cc0-v1.ogg',           'creek-brook-cc0-v2.mp3',       9.5, 112],
  ['ocean-ribeira-cc0-v1.mp3',         'ocean-ribeira-cc0-v2.mp3',     3,   128],
  ['waterfall-caldeiroes-cc0-v1.mp3',  'waterfall-caldeiroes-cc0-v2.mp3', -1.5, 112],
  ['fireplace-hearth-cc0-v1.ogg',      'fireplace-hearth-cc0-v2.mp3',  8,  112],
  ['forest-field-cc0-v1.ogg',          'forest-field-cc0-v2.mp3',      18,  96],
  ['crickets-night-cc0-v1.ogg',        'crickets-night-cc0-v2.mp3',    18,  96],
  ['forest-birds-alishan-cc0-v1.mp3',  'forest-birds-alishan-cc0-v2.mp3', 8, 112],
  ['mountain-wind-cc0-v1.ogg',         'mountain-wind-cc0-v2.mp3',     11,  96],
  ['arctic-wind-cc0-v1.ogg',           'arctic-wind-cc0-v2.mp3',       1,  112],
  ['thunder-near-cc0-v1.ogg',          'thunder-near-cc0-v2.mp3',     -4.6, 112],
  ['thunder-distant-cc0-v1.ogg',       'thunder-distant-cc0-v2.mp3',  -4.8, 112],
  ['thunder-storm-cc0-v1.ogg',         'thunder-storm-cc0-v2.mp3',    -3.8, 112],
];

const CEIL = Math.pow(10, -5 / 20); // -5 dBFS ceiling
const KNEE = Math.pow(10, -9 / 20); // soft knee onset -9 dBFS

const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

const report = [];
for (const [src, outName, gainDb, kbps] of JOBS) {
  const res = await page.evaluate(async ({ src, gainDb, CEIL, KNEE }) => {
    const ctx = new AudioContext({ sampleRate: 48000 });
    const buf = await (await fetch('/audio/nature/' + src)).arrayBuffer();
    const audio = await ctx.decodeAudioData(buf);
    const g = Math.pow(10, gainDb / 20);
    const ch = audio.numberOfChannels;
    const out = [];
    let peak = 0, sumsq = 0, n = 0, limited = 0;
    for (let c = 0; c < ch; c++) {
      const d = audio.getChannelData(c);
      const o = new Float32Array(d.length);
      for (let i = 0; i < d.length; i++) {
        let s = d[i] * g;
        const a = Math.abs(s);
        if (a > KNEE) {
          // smooth tanh knee: KNEE..∞ → KNEE..CEIL
          const t = Math.tanh((a - KNEE) / (CEIL - KNEE));
          const na = KNEE + (CEIL - KNEE) * t;
          if (a > CEIL) limited++;
          s = Math.sign(s) * na;
        }
        o[i] = s;
        const oa = Math.abs(s);
        if (oa > peak) peak = oa;
        sumsq += s * s; n++;
      }
      out.push(Array.from(new Int16Array(o.map((v) => Math.max(-32768, Math.min(32767, Math.round(v * 32767)))))));
    }
    await ctx.close();
    return { ch, sampleRate: audio.sampleRate, duration: audio.duration, pcm: out, peak, rms: Math.sqrt(sumsq / n), limitedPct: (100 * limited / n) };
  }, { src, gainDb, CEIL, KNEE });

  // Encode MP3 via lamejs
  const enc = new lamejs.Mp3Encoder(res.ch, res.sampleRate, kbps);
  const L = Int16Array.from(res.pcm[0]);
  const R = res.ch === 2 ? Int16Array.from(res.pcm[1]) : null;
  const chunks = [];
  const BLK = 1152;
  for (let i = 0; i < L.length; i += BLK) {
    const l = L.subarray(i, i + BLK);
    const r = R ? R.subarray(i, i + BLK) : undefined;
    const d = res.ch === 2 ? enc.encodeBuffer(l, r) : enc.encodeBuffer(l);
    if (d.length) chunks.push(Buffer.from(d));
  }
  const tail = enc.flush();
  if (tail.length) chunks.push(Buffer.from(tail));
  const mp3 = Buffer.concat(chunks);
  writeFileSync(OUT + outName, mp3);
  const sha = createHash('sha256').update(mp3).digest('hex');
  const dbtp = (20 * Math.log10(res.peak)).toFixed(1);
  const lufs = (20 * Math.log10(res.rms) - 0.7).toFixed(1); // RMS-based approximation
  report.push({ outName, kbps, ch: res.ch, dur: +res.duration.toFixed(2), sizeKb: Math.round(mp3.length / 1024), sha256: sha, truePeakDbtp: +dbtp, integratedLufs: +lufs, limitedPct: +res.limitedPct.toFixed(2) });
  console.log(outName.padEnd(36), `${dbtp}dBTP`.padStart(9), `${lufs}LUFS~`.padStart(11), `${Math.round(mp3.length / 1024)}KB`, `lim ${res.limitedPct.toFixed(2)}%`);
}
writeFileSync('/tmp/claude-0/-home-user-brainwave/6fc6f380-527a-53f0-baf1-c6abd89318d1/scratchpad/remaster-report.json', JSON.stringify(report, null, 1));
await browser.close();
console.log('done');
