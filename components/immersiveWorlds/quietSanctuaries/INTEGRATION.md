# Quiet sanctuaries — independent group handoff

This group intentionally does not wire the shared catalog, player, audio engine or production bundle. The integration owner imports the following default React entries lazily. No dependencies or shared source files are changed.

| Canonical ID | Default component |
| --- | --- |
| `meditation` | `components/immersiveWorlds/quietSanctuaries/MeditationCourtWorld.tsx` |
| `nature:womb` | `components/immersiveWorlds/quietSanctuaries/WarmHeartWorld.tsx` |
| `amb:snowy_night` | `components/immersiveWorlds/quietSanctuaries/SnowVillageWorld.tsx` |

Only `active: boolean` is required. Optional `static3D` freezes the fully rendered spatial scene, including its first frame; optional `onInteraction` provides the event described below. Give the component a sized parent; it fills both axes and has a 220px minimum height. A parent marked `data-scene-surface` may contain controls above the scene. Buttons, links, inputs and role=button elements do not start scene gestures.

## Renderer and lifecycle

Each entry has one module-level `SanctuaryHost` extending the existing read-only `LiveSceneHost`. A second holder (fullscreen) moves the identical canvas and renderer to the top holder. Returning transfers it back. The final release stops motion immediately and inherits the shared host's five-second disposal grace. No independent animation runs outside the engine RAF; elapsed time freezes while paused/hidden/reduced-motion/static3D. The shared `useSceneMotion` handles document visibility, OS reduced motion and the app's `reduce-motion` class.

The same true 3D frame is shown on pause, first inactive mount and resize. WebGL failure displays an honest unavailable notice. No poster or screenshot substitutes for 3D. Rendering uses antialiasing, native CSS resolution with up to 2× device supersampling, ACES, soft shadows, and an uncapped RAF. There is no default low-resolution or 24fps mode.

The basin uses an actual planar reflection with an independently written analytic damped ripple shader, not a copied finite-difference solver. Warm Heart uses layered alpha-blended textiles, sheen and local emissive/back-light cues, not volumetric tissue simulation. Renderer diagnostics are descriptive counters; reflective recursive passes mean the last-pass draw-call counter is not total GPU work, and no device FPS or thermal claim is made.

Pointer gestures use an eight-pixel travel threshold, including out-and-back travel. Drag turns the camera by a bounded maximum (yaw 0.13 rad, pitch 0.055 rad) with a damped return. Pointer cancellation, lost focus, pause and unmount never produce taps. Touch events raycast intended geometry. Controls are excluded. A successful interaction is limited to one per 700ms and amplitude ≤0.45. Repeated misses have no audio effect.

## Optional audio bridge

The components do not instantiate AudioContext, play media, subscribe to audio or change existing mixer gains. The optional event is:

```ts
interface SanctuaryInteraction {
  world: 'meditation' | 'warm-heart' | 'snow-village';
  kind: 'water' | 'bowl' | 'warmth' | 'snow';
  strength: number; // bounded 0..0.45
  x: number;        // bounded -1..1, spatial cue only
}
```

Suggested existing-engine treatment, subject to the integrator's sound review:

- **Meditation:** very quiet water movement; a bowl event can use a soft attack and clean long decay, bounded by the user's mixer volume. Preserve substantial silence.
- **Warm heart:** a low steady brown-noise bed with very soft low-frequency rhythm. A warmth event may slowly shape that existing bed; no sharp transient or clinical monitor beep.
- **Snow:** softened winter air; a snow event can gently add a short, muffled brush texture. Sparse distant life should remain low contrast and never startling.

No actual sound-quality approval is claimed by this visual worker; audio integration belongs to the shared owner.

## Isolated QA

`qa/` is a development-only entry and evidence package; do not lazy import it into production or copy it into `public/`. It imports the real production scene entries, so no duplicate scene implementation can drift. See `qa/README.md` for reproducible build and browser commands. Committed screenshots and verification JSON are evidence, not production assets. `PROVENANCE.md` records observations from both JEV collections and original code/material authorship.

The initial base is `14940149cc5c0fccb778b58d4d755a04aea55e53`. This worker only commits the assigned directory roots, opens a draft PR and does not merge.
