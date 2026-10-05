# Validation and delivery record

Baseline main: `14940149cc5c0fccb778b58d4d755a04aea55e53`. Read-only core contract: PR #48 at `7816e3b3b9704aed0ad94c87038acf50bfb43b21`. Branch: `codex/immersive-audio-20261004`. The exact delivery head is reported in the draft PR body and handoff; this file does not embed a self-referential commit hash.

## Completed checks

| Check | Observed result |
| --- | --- |
| Full `npm test` | 304/304 passed, zero failed/skipped; [machine-readable report](./qa/unit-results.json) |
| Owned module tests | 157 passed across profiles, event adapter, controller and synthesis |
| `npm run typecheck` | Passed after all production/test files were complete |
| `npm run build` | Passed; existing large three.js chunk advisory only |
| `npm run check:bundle` | Passed: initial JS 402.6/410 KiB, CSS 99.5/135 KiB; module is not wired to the app yet |
| Native offline Web Audio | 95/95 checks passed; 5 example renders and 19 comparison/control cases |
| Independent code review | No blocking defect identified; ownership, gates, lifecycle, cleanup, inputs and custom-mix preservation checked |
| Independent WAV integrity | All six production hashes, harness hash and five WAV hashes match; Python WAV decoding independently matched PCM16 peak/RMS statistics |
| Ownership | Only newly added `services/immersiveAudio/**`; existing engine, UI, types, packages, samples, CI and protected scenes unchanged |

The unchanged production build is a baseline regression check, not proof that the pending engine/UI bridge is integrated. No visual scene behavior changed, so no new screenshot/visual regression pass is claimed. Remote CI is separate from these local results. This worker does not merge or deploy to production.

## Actual audio measurements

Native `Chromium 153.0.8010.0` at 48 kHz stereo, intensity 1, center pan, injected output gain 1. PCM16 WAVs contain original cues only and were not normalized. Values below are float-render sample statistics before WAV quantization. Each file includes approximately 0.2 seconds of silence after the cue. All values are finite; clipping count is zero.

| Cue | WAV seconds | Sample peak dBFS | Full-file RMS dBFS | Example |
| --- | ---: | ---: | ---: | --- |
| `water-drop` | 1.05000 | -41.29 | -54.65 | [WAV](./qa/examples/water-drop.wav) |
| `soft-rustle` | 1.45000 | -46.53 | -63.94 | [WAV](./qa/examples/soft-rustle.wav) |
| `ceramic-touch` | 0.90000 | -42.35 | -57.17 | [WAV](./qa/examples/ceramic-touch.wav) |
| `ember-tick` | 0.75000 | -49.85 | -68.31 | [WAV](./qa/examples/ember-tick.wav) |
| `soft-resonance` | 3.40002 | -40.38 | -53.18 | [WAV](./qa/examples/soft-resonance.wav) |

[Exact metrics, per-channel statistics, timing, source/WAV SHA-256](./qa/metrics.json) and [reproduction instructions](./qa/README.md) provide the evidence boundary. Tests include silence under mute/gate/zero output, linear slider scaling, bounded stereo pan, maximum allowed overlap, smooth pause release and immediate final disconnect. There was no listening test, physical-device measurement, acoustic loudness or integrated LUFS measurement. Comfort, naturalness and final ambience balance still require audition after core integration.

## Remaining integration work

[INTEGRATION.md](./INTEGRATION.md) provides actual API snippets and exact lifecycle/state insertion points. Core must inject its existing `ctx`/`bgBus` after the existing gate, forward normalized callbacks lazily, apply new defaults through visible UI state, preserve saved/custom mixes and propagate source/global mute changes. Profile distance/material filtering and some ambient identities remain constrained by the existing engine; these are recorded explicitly per profile. Quiet default thunder, temple and deep-sea substitutions are not claims that new field recordings exist.

## Changed file list

All paths below are relative to `services/immersiveAudio/`:

- `INTEGRATION.md`
- `README.md`
- `REFERENCES.md`
- `VALIDATION.md`
- `controller.test.ts`
- `controller.ts`
- `index.ts`
- `interaction.test.ts`
- `interaction.ts`
- `profiles.test.ts`
- `profiles.ts`
- `qa/README.md`
- `qa/examples/ceramic-touch.wav`
- `qa/examples/ember-tick.wav`
- `qa/examples/soft-resonance.wav`
- `qa/examples/soft-rustle.wav`
- `qa/examples/water-drop.wav`
- `qa/metrics.json`
- `qa/render-offline.mjs`
- `qa/unit-results.json`
- `synthesis.test.ts`
- `synthesis.ts`
- `types.ts`
