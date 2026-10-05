# Immersive audio integration handoff

This directory supplies optional audio support for the 30 upgradeable worlds. It does not connect itself to production playback. The core owner applies the small engine/UI bridge below; this audio worker does not modify existing shared files or merge its draft PR.

Reviewed baseline: main `14940149cc5c0fccb778b58d4d755a04aea55e53`; core draft PR #48 at `7816e3b3b9704aed0ad94c87038acf50bfb43b21`. The engine implementation was identical between those revisions. Recheck the current core head before applying this handoff. No public context/output getter exists at that baseline.

## 1. Keep the existing engine in charge

The injected output must be the **existing `bgBus` inside `BinauralEngine`**. Its current path is `bgBus → masterGain → DC filter → compressor → limiter → soft clipper → outputGain → destination`. Consequently nature volume, master volume, nature mix compensation, master fade-out and the existing peak protection also affect accents. Binaural volume continues to affect only its own bus.

Do not connect to `destination`, `masterGain`, `reverbSend` or a newly constructed mixer. Do not read private fields from App or from this helper, use type assertions to bypass privacy, call `init()` to prepare an accent, or call `resume()` from an interaction. The module never changes the injected bus gain or context lifecycle.

The following is a **proposed addition inside the existing engine class**, using this directory's real API. It is not an assertion that the new methods already exist:

```ts
// services/audioEngine.ts imports (core owner only)
import { createSceneAccentController } from './immersiveAudio/controller';
import type {
  AccentPlaybackState,
  AccentRequest,
  SceneAccentController,
} from './immersiveAudio/types';

// Inside BinauralEngine:
private sceneAccents: SceneAccentController | null = null;

setImmersiveAccentState(state: AccentPlaybackState): void {
  if (!this.ctx || !this.bgBus || this.ctx.state !== 'running') {
    this.sceneAccents?.pause();
    return;
  }
  if (!this.sceneAccents && state.active && state.gateOpen && !state.muted) {
    this.sceneAccents = createSceneAccentController({
      context: this.ctx,
      output: this.bgBus,
    });
  }
  this.sceneAccents?.setState(state);
}

triggerImmersiveAccent(request: AccentRequest): boolean {
  return this.sceneAccents?.trigger(request) ?? false;
}

pauseImmersiveAccents(): void {
  this.sceneAccents?.pause();
}

releaseImmersiveAccents(): void {
  this.sceneAccents?.release();
}

private disposeImmersiveAccents(): void {
  this.sceneAccents?.dispose();
  this.sceneAccents = null;
}
```

Required lifecycle insertion points, also owned by core:

| Existing operation | Required bridge action |
| --- | --- |
| `start(config)` | Existing `stop()` first disposes the previous accent controller. Keep the new controller closed until successful transport/gate state is published. |
| `tryStart` returns `blocked`, `cancelled` or `error` | Keep `gateOpen:false`, no controller construction and no scheduled accent. Do not retry here. |
| Transport successfully starts | Publish one complete `{active, muted, gateOpen}` snapshot after the existing gate confirms playback. A running context alone is not permission to open this gate. |
| Pause, scene identity changes, active holder changes, or scene becomes inactive | Call `pauseImmersiveAccents()` synchronously before changing ownership. Reopen only for the newly active scene. |
| `fadeOutStop(seconds)` | Call `pauseImmersiveAccents()` at the start, before scheduling the existing master fade. No new accents during fade-out. |
| `stop()` / `dispose()` | Call `disposeImmersiveAccents()` before disconnecting `bgBus` or closing the context. |
| Existing context `statechange` listener | When state is not `running`, pause accents and close the UI bridge gate. On return, reopen only if current transport and scene state still allow it. Preserve the existing playback notification. |
| Immediate mute or master/nature volume becomes zero | Immediately publish `muted:true`. Do not wait for an effect after a touch event could fire. |
| Muting/removing a source layer or lowering its fader | Call `releaseImmersiveAccents()` synchronously so a currently sounding accent cannot retain the old source level. Update the event eligibility described below; never resurrect the layer to make an accent audible. |

`setState` replaces all flags; a partial/invalid state fails closed. Initial state is inactive, muted and gate-closed. `pause()` also makes the controller inactive; `release()` releases current voices without reopening or closing the gate. Neither resets rate limits. `dispose()` is final and idempotent. Do not recreate the controller per tap, because that would discard its rate-limit history.

For normal sessions, master/nature silence is based on `volumes.master` and `volumes.bg`. Nature studio currently passes `natureVol` as master, binaural `0`, and background `1`; use those actual values rather than the session sliders. Respect a future explicit mute flag as well. Closed/suspended contexts and malformed requests are rejected again inside the controller.

## 2. Initialize only genuinely new built-in selections

Keep profile data and event normalization in a lazy session/setup bridge; do not statically import the barrel from startup `App`. Standalone minified esbuild measurements are 4,139 bytes for the controller (1,922 gzip), 34,973 bytes for profiles (10,718 gzip), and 39,885 bytes for the full barrel (12,924 gzip). These are reference sizes, not the integrated Rollup result. The existing initial JS budget is tight. The direct controller import above avoids evaluating profile/source metadata during engine startup; load profiles/normalizer with a dynamic import or from an already lazy session chunk. The UI snippets below belong inside that loaded bridge. Re-run core's bundle gate after wiring; no visual chunks need eager imports.

Resolve by the canonical explicit world ID, never by layer names, translated display text or the current mixer. The module returns no override for `focus`, `amb:ocean_shore`, unknown IDs, aliases or malformed IDs.

Apply recommendations only at the point the user starts or configures a **new built-in preset**. Feed the same resulting layer array to UI state, the session snapshot and the existing engine. Do not silently call `setSoundVolume` behind sliders. Keep master/binaural/nature volumes, duration, tone settings and user mute state under their existing owners.

At the reviewed core head, the relevant creation flows are `configurePreset`, `quickStartPresetNow`, `loadAmbience`, `quickStartAmbienceNow`, `loadNatureMix`, `selectNatureMix`, `quickStartNature`, and the built-in branch of link resolution. Core should centralize this once rather than reapply the defaults in several render effects.

The pure initializer requires explicit origin and edit state. Adapt this at the new-selection boundary; `currentLayers` is the candidate new preset's existing default array, not an instruction to replace whichever session currently plays:

```ts
import { initialImmersivePresetMix } from './services/immersiveAudio';

const nextLayers = initialImmersivePresetMix({
  sceneId: selectedWorldId,  // exact canonical ID from core's world catalog
  origin: 'new-preset',     // set only for an explicit fresh built-in selection
  dirty: false,            // never use false for a restored or edited draft
  currentLayers: candidateLayers,
});
const layers = nextLayers.map(layer => ({ ...layer }));
setActiveLayers(layers);   // nature studio uses setNatureLayers(layers)
// Use this same `layers` value in the new snapshot and existing start/gate path.
// Do not change `volumes`, `natureVol`, or any saved/custom record here.
```

For a shared initializer, pass the true origin (for example `restored`, `saved`, `custom`) and true dirty state. Only literal `origin:'new-preset'` plus `dirty:false` can apply defaults. Every other case, including protected/unknown IDs, returns the exact `currentLayers` reference without mutation. Mark layer, mute and fader edits dirty; do not guess origin from a retained built-in world ID.

Do **not** apply defaults in `engine.start`, `prepareSession`, play/resume, `useEffect([worldId])`, fullscreen transitions or a generic restore path. Those also receive custom/saved/last-session mixes. Loading a saved preset, a backup, an existing draft, a last session, or stored nature state must preserve its layers and volumes even if it retains a built-in `worldId`. Merely changing which visual world is displayed is not a request to reset the mix.

## 3. Spatial guidance and existing API boundaries

`setScenePositions(positions)` already exists. Its values are normalized **screen X from 0 to 1**, with `0.5` at center. The existing engine maps these to pan with `(x - 0.5) * 1.3`, clamps to ±0.6, and keeps `SPATIAL[type].wide` layers centered. Do not pass pan values, NDC coordinates or world-space X into this API. The helper validates recommended positions; any future geometry projection must also reject nonfinite/out-of-range values before calling this existing method.

Apply positions after voices exist, and again when a reviewed source anchor actually changes. Audio layer edits must not infer a different world ID. The default mapping should not be recomputed on every animation frame.

```ts
import { resolveImmersiveAudioProfile } from './services/immersiveAudio';

const profile = resolveImmersiveAudioProfile(explicitWorldId);
if (profile) engine.setScenePositions({ ...profile.positions });
// Existing custom layers without an explicit anchor keep engine defaults.
// No profile means no position override, including both protected cards.
```

Profile near/mid/far descriptions are **guidance**, not implemented per-world distance DSP. Current distance trim, air filter and reverb send come from global `sceneLayout.ts:SPATIAL`/`DEPTH_MIX` when each voice is created; the public engine API cannot override them. Outer layer panning also does not eliminate any source's internal panners or stereo field recording. This module adds neither HRTF positioning nor occlusion, entrance filtering, separate rain material recordings or acoustic room simulation.

## 4. World touch adapters: fail closed

Keep scene imports lazy. Add an optional `onInteraction?: (event: unknown) => void` to the core-owned `ImmersiveWorldProps`, then forward it through the existing backdrop/slot paths. `active:boolean` remains the only required scene prop. The core adapter switches on an already resolved exact world ID and produces the module's normalized touch shape. It does not import all 30 renderers to inspect their event types at runtime.

At the reviewed PR #48 head the two available pilots use different payloads:

| World | Actual emitted payload | Reviewed audio conversion |
| --- | --- | --- |
| `amb:morning_forest` | `{kind:'water'\|'leaf', position:[x,y,z], strength:number}` after a tap raycast | Convert only those two kinds. Check finite strength. Ignore `position` for audio until the visual owner provides projected screen X; a fixed center anchor is conservative. Never use raw world X. |
| `amb:focus_cafe` | String `'cup'\|'lamp'\|'window'` after a tap raycast | `cup` may produce one muted ceramic accent. Leave `lamp` and `window` silent. The string contains no location, so use a fixed center anchor. |
| Other worlds | Contract must be reviewed from the exact visual PR | Leave events silent until that specific payload is adapted. Similar names are not proof of equivalent gestures. |

Both pilots already distinguish a short tap from a drag and cancel. The adapter must preserve that condition. Do not turn a pointer-up, drag-end, generic state change, recurring animation, ambient bird event or callback with unknown phase into a touch accent. Unknown kinds, raw positions, missing fields, drag/cancel and nonfinite input all remain silent.

This minimal core adapter handles only those reviewed pilots. It deliberately uses `screenX:0.5` because their payloads do not provide a normalized projected X. A later per-scene bridge can pass an actual validated projection without changing the audio contract.

```ts
import {
  normalizeWorldTouch,
  type NormalizedWorldTouch,
} from './services/immersiveAudio';

function reviewedPilotTouch(worldId: unknown, event: unknown): NormalizedWorldTouch | null {
  if (worldId === 'amb:focus_cafe') {
    return event === 'cup'
      ? { phase: 'tap', kind: 'cup-touch', screenX: 0.5, intensity: 1 }
      : null;
  }
  if (worldId !== 'amb:morning_forest' || !event || typeof event !== 'object') return null;
  const hit = event as { kind?: unknown; strength?: unknown };
  if (typeof hit.strength !== 'number' || !Number.isFinite(hit.strength)
    || hit.strength <= 0 || hit.strength > 1) return null;
  const kind = hit.kind === 'water' ? 'water-touch'
    : hit.kind === 'leaf' ? 'leaf-touch' : null;
  return kind ? { phase: 'tap', kind, screenX: 0.5, intensity: hit.strength } : null;
}

// Called only by the active world's reviewed onInteraction callback.
const touch = reviewedPilotTouch(explicitWorldId, rawEvent);
if (touch) {
  // Current UI layer state, preserving per-layer mute and volume. Existing
  // playback snapshots also exclude loading/failed sources from eligibility.
  const eligibleLayers = currentUiLayers.filter(
    layer => playbackStates[layer.type] === 'playing',
  );
  const request = normalizeWorldTouch(explicitWorldId, touch, eligibleLayers);
  if (request) engine.triggerImmersiveAccent(request);
}
```

The normalizer requires `{phase:'tap', kind, screenX:0..1, intensity:0..1}` plus current layer state. It allowlists the kind **within that exact scene**, requires exactly one present/unmuted/nonzero associated `source`, and scales intensity by that source's fader (capped at 1). Missing or duplicate sources fail closed. Short nearby cues derive pan from screen X; long resonance retains its stationary profile pan. This normalized request still has to pass the controller's transport, context, mute and rate gates.

Keep both volume/mute checks: the injected bus follows overall controls, while the normalizer suppresses a source-specific accent when the user muted or removed the related source. For example a fire tap does not bypass a muted `fire` layer merely because `night` remains audible. If every nature layer is muted or zero, suppress all accents. The playback-state filter above also prevents sample-only loading/error from leaving a touch cue alone against a missing bed. No accent operation adds a sound layer, alters its fader or replaces a recording.

The normalizer checks **new** events; it cannot change a cue already sounding. Release existing accents when an associated source is muted/removed or its volume decreases, before applying that UI change. Releasing all current accents is conservative and sufficient; it preserves the controller's gate and cooldowns. Master/background zero or explicit global mute uses `setState({..., muted:true})` for immediate silence. Optional `bowl-touch` mappings depend on `bowl`, and campsite `fabric-touch` depends on `tent`; those sources are intentionally absent from the relevant quiet initial mixes. Such touches remain silent unless the user independently chooses those sources. Never auto-add a looping layer merely to unlock a touch cue.

## 5. Known source limitations at the pinned baseline

These are source-inspection findings, not listening claims:

| Capability | Verified implementation and conservative behavior |
| --- | --- |
| Rain / tent / window | All three use the same user-recorded `rainJun`, sample-only, at scales `1`, `0.82`, `0.72`. They are not three independent glass/fabric/leaf recordings. Preserve the existing sample/failure path; no generic synthetic replacement. |
| Rural summer night | `ruralCrickets` is the user's sample-only recording; preserve its identity. No generic `night` substitute on failure. |
| Distant thunder | `dthunder` samples choose `thunderDistant` or `thunderStorm`, not `thunderNear`. However its procedural implementation can add a near-crack with 30% probability and a 12 ms attack. A low default fader cannot guarantee crack-free output; quiet profiles omit this layer until core provides a reviewed roll-only option. |
| Deep sea | Existing `deepsea` includes whale-like calls and answers. A soft brown bed/optional quiet resonance can avoid those calls; a new whale-free underwater recording is not implemented. |
| Scops night | Existing `scops` has fixed internal main/answer panners at `+0.5`/`−0.7`. It calls every 2.5–4 seconds within 15–30-second bouts, then leaves 20–60 seconds of silence. A profile's outer pan cannot turn this into one independently controlled perch or change its timing. |
| Continuous ambience | This directory recommends balances and positions for existing sources. It does not replace their synthesis, sample gain calibration, loop editing or licensing. |
| Touch accents | Original bounded procedural cues, not new field recordings. WAV measurements establish finite signal bounds and timing, not physical-device loudness, naturalness or listening approval. |

All new QA audio stays under `services/immersiveAudio/`; do not copy examples into `public` or preload them in production. Existing source provenance remains in `audioSamples.ts` and `THIRD_PARTY_AUDIO.md`. Reference demos informed broad principles only; no reference code or assets were copied.
