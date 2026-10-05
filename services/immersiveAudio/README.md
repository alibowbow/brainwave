# Quiet support for 30 immersive worlds

An optional, original audio module for Brainwave's existing single engine. All changes, tests and evidence live in this directory. Production playback is unchanged until the core owner applies [INTEGRATION.md](./INTEGRATION.md). Both protected cards (`focus`, `amb:ocean_shore`) return no profile.

## What is implemented

- Exactly 30 typed, immutable profiles with unequal conservative UI layer levels, normalized X positions, intended/actual depth guidance, current source/fallback capabilities, explicit gaps and small per-scene touch allowlists.
- Pure `initialImmersivePresetMix`: only an explicit new built-in selection with `dirty:false` receives fresh recommendations. Every restored/custom/edited/unknown case returns the original layer array unchanged. Master, binaural, background volume and storage are not touched.
- `normalizeWorldTouch`: only normalized, allowlisted taps on a present, unmuted, nonzero source become cues. Source faders scale cues. No drag/cancel, raw world coordinate, generic click or unknown event conversion.
- `createSceneAccentController`: injected existing context and nature bus; five finite procedural cues; no context allocation/resume, media elements, fetch, animation loop, scheduler, automatic event generation or independent mixer. Default gate is closed.
- Fixed limits: two voices, three nodes per voice, 1.8-second global gap, 4.5–14-second per-kind gaps, pan limited to ±0.6, finite intensity clamped to 0–1. Pause/release fades out within 60 ms; mute/gate closure/dispose disconnect immediately. Context interruption discards tails and closes the gate.

The synthesis is intentionally restrained: soft water drop, leaf/cloth rustle, muted ceramic contact, faint ember texture and slow soft resonance. Each is an original finite PCM buffer with smooth attack/end. Up to five bounded buffers are cached per controller and cleared on disposal. They are small object cues, not new field recordings or production cafe/forest soundscapes.

## Public imports

```ts
import {
  resolveImmersiveAudioProfile,
  initialImmersivePresetMix,
  normalizeWorldTouch,
  createSceneAccentController,
} from './services/immersiveAudio';
```

See [the exact core bridge and state wiring](./INTEGRATION.md). Only the core owner can supply `ctx` and `bgBus` from inside the existing engine. Keep scene chunks lazy, and normalize each visual worker's verified event shape separately. A running context does not replace the existing autoplay gate.

## Validation and evidence

Run from the repository root using existing development dependencies:

```sh
npm test -- services/immersiveAudio
npm run typecheck
node services/immersiveAudio/qa/render-offline.mjs
```

The offline renderer uses an installed Chromium (see its usage instructions), constructs **QA-only OfflineAudioContexts**, bundles the same production synthesis/controller, and stores real PCM16 stereo WAVs and exact source/output hashes under [qa](./qa/). The production module never creates a context. These files are not imported by production or copied into `public`.

See [VALIDATION.md](./VALIDATION.md) for the completed checks and measured values. Measurements are sample peak/RMS/timing at a known bus gain; they are not LUFS, true-peak, acoustic SPL, physical-device or listening tests. No human audition was available for this change.

## Scope limits

The profiles reuse existing licensed and user-provided sources. They cannot change source-specific distance filters, event schedulers, loop edits, stereo content or room DSP through the current public API. Tent/window/rain still share Jun's recording; quiet storm defaults omit the current crack-capable thunder; deep sea uses a provisional low bed to avoid existing whale calls. See each profile and the integration guide for exact distinctions.

No existing engine/UI, shared types, package files, sample assets, CI or visual scene is modified. No reference-demo code/assets, external recordings, paid services, new credentials or permissions are used. No efficacy claims are made.
