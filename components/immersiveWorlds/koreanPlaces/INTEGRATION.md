# Korean Places — integration contract

This branch implements only the three Korean worlds. It does not change the app catalog, player, audio engine, shared scene host, protected scenes, package files, or CI. Base: `14940149cc5c0fccb778b58d4d755a04aea55e53` (includes protected seaside PR #51). Merge belongs to the integration owner.

| Canonical ID | Default component |
| --- | --- |
| `nature:temple_dawn` | `components/immersiveWorlds/koreanPlaces/TempleWorld.tsx` |
| `nature:scops_night` | `components/immersiveWorlds/koreanPlaces/ScopsNightWorld.tsx` |
| `nature:rural_summer_night` | `components/immersiveWorlds/koreanPlaces/RuralSummerNightWorld.tsx` |

Each entry requires only `{ active: boolean }`. Put it in a positioned parent with a nonzero height. Optional props: `static3D`, `onInteraction`, `subscribeEvents`. `active=false`, hidden document, OS reduced motion, application `.reduce-motion`, and `static3D=true` keep a real rendered 3D frame while stopping simulation. A resize redraws that static frame. Unsupported WebGL displays an explicit status, not an illustration disguised as 3D.

Use the same component for the player and fullscreen. The existing read-only `LiveSceneHost` transports one canvas per world to the most recently acquired holder, returns it to the previous holder on release, and disposes it five seconds after the final release. Do not mount a different renderer for fullscreen. A top inactive holder pauses even if the lower holder is active.

The world geometries are independently authored and dynamically imported. Rural alone uses toon rendering. Default output uses antialiasing, native device pixel ratio up to 2, and a normal requestAnimationFrame loop; no blanket low-FPS mode. QA renderer counters are observations of this executor, not device FPS/thermal claims.

## Interactions and existing audio

Dragging turns the seated view at most about 4.9° horizontally / 2.6° vertically and eases back. A tap must stay within seven CSS pixels and complete within 700 ms; a cancelled pointer, long press, or drag does not emit an interaction. Only the active top holder can interact. Raycasting restricts interaction to the bell, lantern, or nearby rice. Events are rate-limited to one per 0.7 seconds of active scene time.

`onInteraction(event)` receives `{ scene, type, strength, position }`; `position` is a three-number scene-world coordinate, and `strength` is bounded by the scene. Types are `bell`, `lantern`, and `grass`. The callback is a recommendation to the integrator: it does not instantiate or directly manipulate an audio player.

`subscribeEvents` is directly compatible with the existing `BackgroundSoundType` callback signature. Pass a wrapper around the existing engine's `onSoundEvent` subscription. A `scops` event produces a subtle owl throat/head response; without the subscription it only blinks and rests. The world never schedules its own owl audio calls.

Audio recommendations for the shared engine:

- Temple: retain the `temple` bell's long soft decay, with low birds/tree wind. A user bell tap may request a gently bounded strike if the shared engine exposes an authorized one-shot API; do not create a competing oscillator/player here.
- Scops: retain `scops` rather than generic `owl`. Current engine has 15–30 second calling bouts and 20–60 second quiet intervals. Place the main source at the visible branch to the left, with a much quieter far answering source; adjust through the existing mixer only.
- Rural: preserve `ruralCrickets`, Jun's sample-only field recording. Its source is `rural-crickets-jun-v1.mp3`, SHA-256 `a4659b256c675494ae51090ae2c4e13dae9e8f5fab9267dba0949d4029f63f9c`, existing equal-power crossfade 1.25 s. Do not substitute generic synthetic insects or duplicate the loop out of phase. Near/far level and EQ improvements belong to the shared integration engine; this branch makes no audio-quality claim.

## QA separation

`qa/` contains the isolated harness, screenshot tests, evidence and build instructions. It is not a production asset directory or an application route. Do not import it into the app or copy its PNG evidence into the production public tree. App `build` alone cannot test these unintegrated entries; use the isolated harness build as well. See `qa/README.md` and the final evidence JSON for exact commands, source hashes and limitations.
