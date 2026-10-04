/** Native-browser, non-audition QA only. No runtime dependency or production context. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdtemp, rm, mkdir, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { chromium } from 'playwright-core';

const qaDir = path.dirname(fileURLToPath(import.meta.url));
const moduleDir = path.dirname(qaDir);
const repoDir = path.resolve(moduleDir, '..', '..');
const sourcePaths = ['types.ts', 'synthesis.ts', 'controller.ts', 'profiles.ts', 'interaction.ts', 'index.ts'];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceSha256 = Object.fromEntries(await Promise.all(sourcePaths.map(async file => [file, sha256(await readFile(path.join(moduleDir, file)))])));
const tempDir = await mkdtemp(path.join(os.tmpdir(), 'brainwave-offline-'));
let browser;
try {
  const executablePath = process.env.BRAINWAVE_CHROMIUM_PATH;
  if (executablePath) assert.ok((await stat(executablePath)).size > 0, 'BRAINWAVE_CHROMIUM_PATH must be a nonempty installed browser executable');
  const bundle = await build({
    stdin: { contents: "export { createSceneAccentController, ACCENT_LIMITS } from './controller'; export { ACCENT_SPECS } from './synthesis'; export { ACCENT_KINDS } from './types';", resolveDir: moduleDir, sourcefile: 'offline-entry.ts', loader: 'ts' },
    bundle: true, format: 'iife', globalName: 'ImmersiveAudioQA', platform: 'browser', write: false,
  });
  const bundlePath = path.join(tempDir, 'production-bundle.js');
  await writeFile(bundlePath, bundle.outputFiles[0].contents);
  browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.addScriptTag({ path: bundlePath });
  const browserVersion = browser.version();
  const result = await page.evaluate(async () => {
    const { createSceneAccentController, ACCENT_KINDS, ACCENT_SPECS, ACCENT_LIMITS } = globalThis.ImmersiveAudioQA;
    const sampleRate = 48000;
    const active = { active: true, muted: false, gateOpen: true };
    const pendingChecks = [];
    const check = (name, pass, details = {}) => {
      pendingChecks.push({ name, pass: Boolean(pass), ...details });
      if (!pass) throw new Error(`Offline audio check failed: ${name} ${JSON.stringify(details)}`);
    };
    const stats = channels => {
      let peak = 0, sumSquares = 0, nonfinite = 0, clipping = 0, largestAdjacentStep = 0;
      let firstNonzeroFrame = null, lastNonzeroFrame = null;
      const perChannel = channels.map(samples => {
        let energy = 0, channelPeak = 0;
        for (let i = 0; i < samples.length; i++) {
          const v = samples[i];
          if (!Number.isFinite(v)) nonfinite++;
          if (Math.abs(v) >= 1) clipping++;
          channelPeak = Math.max(channelPeak, Math.abs(v));
          energy += v * v;
          if (i > 0) largestAdjacentStep = Math.max(largestAdjacentStep, Math.abs(v - samples[i - 1]));
          if (v !== 0) { firstNonzeroFrame = Math.min(firstNonzeroFrame ?? i, i); lastNonzeroFrame = Math.max(lastNonzeroFrame ?? i, i); }
        }
        peak = Math.max(peak, channelPeak); sumSquares += energy;
        return { peak: channelPeak, rms: Math.sqrt(energy / samples.length), firstSample: samples[0], lastSample: samples.at(-1) };
      });
      const rms = Math.sqrt(sumSquares / (channels.length * channels[0].length));
      return { sampleRate, channels: channels.length, frames: channels[0].length, durationSeconds: channels[0].length / sampleRate,
        peak, peakDbfs: peak === 0 ? null : 20 * Math.log10(peak), rms, rmsDbfs: rms === 0 ? null : 20 * Math.log10(rms),
        nonfiniteSamples: nonfinite, allSamplesFinite: nonfinite === 0, clippingSamples: clipping,
        largestAdjacentStep, firstNonzeroFrame, lastNonzeroFrame, perChannel };
    };
    const render = async ({ name, kind = 'water-drop', intensity = 1, pan = 0, busGain = 1, state = active, duration = 4, events = [], initiallyDisposed = false, initiallyPaused = false }) => {
      const context = new OfflineAudioContext(2, Math.ceil(duration * sampleRate), sampleRate);
      const output = context.createGain(); output.gain.value = busGain; output.connect(context.destination);
      const controller = createSceneAccentController({ context, output });
      controller.setState(state);
      if (initiallyPaused) controller.pause();
      if (initiallyDisposed) controller.dispose();
      const eventLog = []; let maxVoices = 0;
      let accepted; let triggerTime;
      let scheduler; let silentInput;
      {
        // QA-only scheduler: a silent native ScriptProcessor keeps offline rendering and
        // JS event controls synchronized at known 256-frame blocks. It emits only zero.
        scheduler = context.createScriptProcessor(256, 1, 1);
        silentInput = context.createConstantSource(); silentInput.offset.value = 0;
        silentInput.connect(scheduler); scheduler.connect(context.destination); silentInput.start(0);
        const queue = [...events].sort((a, b) => a.at - b.at);
        scheduler.onaudioprocess = () => {
          if (accepted === undefined) {
            triggerTime = context.currentTime;
            accepted = controller.trigger({ kind, intensity, pan });
            maxVoices = Math.max(maxVoices, controller.voiceCount);
          }
          while (queue.length && context.currentTime >= queue[0].at) {
            const event = queue.shift(); let accepted;
            if (event.action === 'trigger') accepted = controller.trigger({ kind: event.kind, intensity: event.intensity ?? 1, pan: event.pan ?? 0 });
            else if (event.action === 'pause') controller.pause();
            else if (event.action === 'release') controller.release();
            else if (event.action === 'dispose') controller.dispose();
            else if (event.action === 'state') controller.setState(event.state);
            eventLog.push({ ...event, actualTime: context.currentTime, accepted, voiceCount: controller.voiceCount });
            maxVoices = Math.max(maxVoices, controller.voiceCount);
          }
        };
      }
      // The first silent scheduler callback holds the render thread while the real
      // controller builds its first buffer. Native context state/time are untouched.
      const buffer = await context.startRendering();
      const finalVoiceCount = controller.voiceCount;
      controller.dispose(); controller.dispose();
      if (scheduler) { scheduler.onaudioprocess = null; scheduler.disconnect(); silentInput.disconnect(); }
      output.disconnect();
      const channels = Array.from({ length: buffer.numberOfChannels }, (_, channel) => buffer.getChannelData(channel).slice());
      const measurements = stats(channels);
      check(`${name}: finite and unclipped`, measurements.allSamplesFinite && measurements.clippingSamples === 0);
      check(`${name}: final voices released`, finalVoiceCount === 0, { finalVoiceCount });
      return { name, accepted, triggerTime, maxVoices, eventLog, measurements, channels };
    };
    const examples = [];
    for (const kind of ACCENT_KINDS) {
      const r = await render({ name: kind, kind, duration: ACCENT_SPECS[kind].seconds + 0.2 });
      check(`${kind}: accepted in first native scheduler block`, r.accepted && r.triggerTime <= 256 / sampleRate, { triggerTime: r.triggerTime });
      check(`${kind}: audible digital signal bounded below 0.024`, r.measurements.peak > 0 && r.measurements.peak <= 0.024);
      check(`${kind}: exact silent edges`, r.measurements.perChannel.every(c => c.firstSample === 0 && c.lastSample === 0));
      check(`${kind}: short opening attack has no sample jump`, r.measurements.largestAdjacentStep < 0.003, { largestAdjacentStep: r.measurements.largestAdjacentStep });
      examples.push(r);
    }
    const cases = [];
    const baseline = await render({ name: 'unity-baseline' }); cases.push(baseline);
    const lowIntensity = await render({ name: 'intensity-quarter', intensity: 0.25 }); cases.push(lowIntensity);
    const lowBus = await render({ name: 'output-gain-quarter', busGain: 0.25 }); cases.push(lowBus);
    const maxDiff = (a, b, ratio = 1) => Math.max(...a.channels.map((samples, channel) => {
      let error = 0; for (let i = 0; i < samples.length; i++) error = Math.max(error, Math.abs(samples[i] - b.channels[channel][i] * ratio)); return error;
    }));
    check('intensity scales actual waveform linearly', maxDiff(lowIntensity, baseline, 0.25) < 1e-9, { maxError: maxDiff(lowIntensity, baseline, 0.25) });
    check('injected output gain scales actual waveform linearly', maxDiff(lowBus, baseline, 0.25) < 1e-9, { maxError: maxDiff(lowBus, baseline, 0.25) });
    for (const config of [
      { name: 'output-gain-zero', busGain: 0 }, { name: 'zero-intensity', intensity: 0 },
      { name: 'muted', state: { ...active, muted: true } }, { name: 'gate-closed', state: { ...active, gateOpen: false } },
      { name: 'inactive', state: { ...active, active: false } }, { name: 'paused-before-trigger', initiallyPaused: true },
      { name: 'disposed-before-trigger', initiallyDisposed: true },
    ]) {
      const r = await render(config); cases.push(r);
      check(`${r.name}: exact digital silence`, r.measurements.peak === 0);
      if (r.name !== 'output-gain-zero') check(`${r.name}: request rejected`, !r.accepted);
    }
    const left = await render({ name: 'pan-left', pan: -0.6 }); cases.push(left);
    const right = await render({ name: 'pan-right', pan: 0.6 }); cases.push(right);
    const clamped = await render({ name: 'pan-out-of-range-clamped', pan: 100 }); cases.push(clamped);
    check('pan keeps rightward energy on right', right.measurements.perChannel[1].rms > right.measurements.perChannel[0].rms * 2.5);
    check('pan keeps leftward energy on left', left.measurements.perChannel[0].rms > left.measurements.perChannel[1].rms * 2.5);
    check('pan out of range matches bounded pan waveform', maxDiff(clamped, right) < 1e-9);
    check('left/right energy mirror symmetry', Math.abs(left.measurements.perChannel[0].rms - right.measurements.perChannel[1].rms) < 1e-9);
    const overlap = await render({ name: 'maximum-allowed-overlap', kind: 'soft-resonance', events: [
      { at: 1.85, action: 'trigger', kind: 'soft-rustle' }, { at: 1.85, action: 'trigger', kind: 'water-drop' },
    ] }); cases.push(overlap);
    check('two voices overlap and third request rejected', overlap.maxVoices === ACCENT_LIMITS.maxVoices && overlap.eventLog[0].accepted === true && overlap.eventLog[0].voiceCount === 2 && overlap.eventLog[1].accepted === false);
    check('maximum-allowed overlap remains quiet and unclipped', overlap.measurements.peak < 0.048 && overlap.measurements.clippingSamples === 0, { peak: overlap.measurements.peak });
    const paused = await render({ name: 'pause-smooth-release', kind: 'soft-resonance', events: [{ at: 0.8, action: 'pause' }] }); cases.push(paused);
    const longBaseline = await render({ name: 'resonance-comparison', kind: 'soft-resonance' }); cases.push(longBaseline);
    const pauseTime = paused.eventLog[0].actualTime;
    const releaseFrames = Math.round(ACCENT_LIMITS.releaseSeconds * sampleRate);
    const releaseStart = Math.round(pauseTime * sampleRate);
    // The QA ScriptProcessor callback can reach AudioParam processing at this
    // or the next native 128-frame quantum. Fit only those two specified starts;
    // the requested release endpoint and the entire waveform stay constrained.
    const fits = [0, 128].map(latencyFrames => {
      let maxError = 0;
      const effectiveStart = releaseStart + latencyFrames;
      for (let ch = 0; ch < 2; ch++) for (let i = releaseStart; i < paused.channels[ch].length; i++) {
        const expectedGain = Math.max(0, Math.min(1, 1 - (i - effectiveStart) / (releaseFrames - latencyFrames)));
        maxError = Math.max(maxError, Math.abs(paused.channels[ch][i] - longBaseline.channels[ch][i] * expectedGain));
      }
      return { latencyFrames, maxError };
    });
    const fit = fits.sort((a, b) => a.maxError - b.maxError)[0];
    let tailPeak = 0;
    for (const channel of paused.channels) for (let i = releaseStart + releaseFrames + 128; i < channel.length; i++) tailPeak = Math.max(tailPeak, Math.abs(channel[i]));
    check('pause release follows native linear ramp ending at 60 ms', fit.maxError < 2e-6, { pauseTime, releaseError: fit.maxError, requestedReleaseSeconds: ACCENT_LIMITS.releaseSeconds, schedulerControlLatencyFrames: fit.latencyFrames, measuredRampSeconds: (releaseFrames - fit.latencyFrames) / sampleRate });
    check('pause tail becomes exact silence', tailPeak === 0, { tailPeak });
    for (const [name, action] of [['mid-voice-mute', 'mute'], ['mid-voice-gate-close', 'gate'], ['mid-voice-dispose', 'dispose']]) {
      const event = action === 'dispose' ? { at: 0.8, action: 'dispose' } : { at: 0.8, action: 'state', state: { ...active, muted: action === 'mute', gateOpen: action !== 'gate' } };
      const r = await render({ name, kind: 'soft-resonance', events: [event] }); cases.push(r);
      const stopAfter = Math.ceil(r.eventLog[0].actualTime * sampleRate) + 128;
      let peakAfter = 0;
      for (const channel of r.channels) for (let i = stopAfter; i < channel.length; i++) peakAfter = Math.max(peakAfter, Math.abs(channel[i]));
      check(`${name}: voice disconnected immediately`, r.eventLog[0].voiceCount === 0 && peakAfter === 0, { peakAfter, quantumAllowanceFrames: 128 });
    }
    const suspended = new OfflineAudioContext(2, 4800, sampleRate);
    const suspendedOutput = suspended.createGain();
    const blockedController = createSceneAccentController({ context: suspended, output: suspendedOutput });
    blockedController.setState(active);
    check('native suspended context rejects before playback', !blockedController.trigger({ kind: 'water-drop', intensity: 1, pan: 0 }) && blockedController.voiceCount === 0);
    blockedController.dispose();
    return {
      sampleRate, checks: pendingChecks,
      examples: examples.map(({ channels, ...r }) => ({ ...r, pcm: channels.map(channel => Array.from(channel)) })),
      cases: cases.map(({ channels, ...r }) => r),
    };
  });
  await mkdir(path.join(qaDir, 'examples'), { recursive: true });
  const wavExamples = [];
  for (const example of result.examples) {
    const { pcm, ...details } = example;
    const frames = pcm[0].length;
    const wav = Buffer.alloc(44 + frames * 4);
    wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
    wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
    wav.writeUInt32LE(result.sampleRate, 24); wav.writeUInt32LE(result.sampleRate * 4, 28);
    wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(frames * 4, 40);
    let quantizedPeak = 0, quantizedSumSquares = 0;
    for (let i = 0; i < frames; i++) for (let ch = 0; ch < 2; ch++) {
      const n = Math.round(Math.max(-1, Math.min(1, pcm[ch][i])) * 32767);
      wav.writeInt16LE(n, 44 + (i * 2 + ch) * 2);
      quantizedPeak = Math.max(quantizedPeak, Math.abs(n / 32768)); quantizedSumSquares += (n / 32768) ** 2;
    }
    const file = `examples/${details.name}.wav`;
    await writeFile(path.join(qaDir, file), wav);
    wavExamples.push({ ...details, file, sha256: sha256(wav), bytes: wav.length,
      wavEncoding: { format: 'PCM signed 16-bit little endian', channels: 2, sampleRate: result.sampleRate, normalization: 'none', quantizedPeak, quantizedRms: Math.sqrt(quantizedSumSquares / (frames * 2)) } });
  }
  const sourceSha256After = Object.fromEntries(await Promise.all(sourcePaths.map(async file => [file, sha256(await readFile(path.join(moduleDir, file)))])));
  assert.deepEqual(sourceSha256After, sourceSha256, 'Production source changed during rendering; rerun for consistent evidence');
  const report = {
    schemaVersion: 1, generatedAt: new Date().toISOString(), sourceSha256,
    harnessSha256: sha256(await readFile(fileURLToPath(import.meta.url))),
    environment: { browser: `Chromium ${browserVersion}`, node: process.version, rendering: 'native OfflineAudioContext; injected gain output; no network/server', sampleRate: result.sampleRate, channels: 2, scheduledControlBlockFrames: 256 },
    evidenceBoundary: [
      'Original procedural touch accents only, not production ambience recordings or completed scene mixes.',
      'WAVs render the production controller at intensity 1, centered pan, output gain 1; no normalization or external recordings.',
      'Measurements are digital full-scale sample statistics, not LUFS, listening-test, physical SPL, device, speaker or headphone measurements.',
      'No listening or perceptual naturalness test was performed. Real-device audition and engine/UI integration remain core responsibilities.',
      'Native ScriptProcessor is used only as a silent QA event scheduler. Production code contains no ScriptProcessor or standalone context.',
      'Mute/gate/dispose intentionally disconnect immediately; only pause/release has the smooth 60 ms ramp.',
    ],
    examples: wavExamples, cases: result.cases, checks: result.checks,
    summary: { checksPassed: result.checks.filter(c => c.pass).length, checksFailed: result.checks.filter(c => !c.pass).length, exampleCount: wavExamples.length, comparisonCaseCount: result.cases.length },
  };
  await writeFile(path.join(qaDir, 'metrics.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ...report.summary, examples: wavExamples.map(e => ({ file: e.file, peak: e.measurements.peak, rms: e.measurements.rms, durationSeconds: e.measurements.durationSeconds })), metrics: path.relative(repoDir, path.join(qaDir, 'metrics.json')) }, null, 2));
} finally {
  if (browser) await browser.close();
  await rm(tempDir, { recursive: true, force: true });
}
