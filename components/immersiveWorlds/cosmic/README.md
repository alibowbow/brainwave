# Cosmic floating garden · `amb:cosmic`

A self-contained, seated first-person Three.js pilot for **우주 명상 (20 minutes)**.
It adds no route, preset, dependency, audio player, or modification to either protected scene.

## Integration

```tsx
const CosmicWorld = lazy(() => import('./components/immersiveWorlds/cosmic/CosmicWorld'));

<CosmicWorld active={isPlaying} />
```

Mount in a positioned parent with a definite width/height. All other props are optional.
The integration owner should select this component for card ID `amb:cosmic` and leave
the existing duration/preset controls in charge. The component is absolute/inset:0.
Do not add a second renderer for fullscreen: mounting a second `CosmicWorld` moves
the same canvas into the newest holder; closing it returns that canvas to the prior holder.
Controls above the scene should remain outside its root so they do not begin a scene drag.

Optional existing-engine bridge (use the app's existing engine instance):

```tsx
<CosmicWorld
  active={isPlaying}
  subscribeEvents={(listener) => engine.onSoundEvent(listener)}
  onInteract={(event) => {
    // Optional coordinator hook. Never create an AudioContext here.
    // event = { kind: 'plant' | 'light' | 'water', position: [x, y, z], strength: 0.35 }
  }}
/>
```

`bowl` and `chimes` notifications cause a restrained local glow, with a 12-second
visual cooldown. They never emit another audio request. Accepted touches have a
1.2-second cooldown and an eight-second smooth local envelope. Drags, including
out-and-back gestures, do not emit touches. Inactive, hidden, offscreen and
reduced-motion states suppress all touch/audio reactions and freeze the scene.
The keyboard-accessible nearby-light button becomes visible on focus.

## Audio proposal — for the shared integration owner

Use the existing single engine and its current `drone`, `bowl`, `chimes` layers.
The current cosmic preset remains untouched. A quieter starting mix to audition is
`drone: 0.35`, `bowl: 0.20`, `chimes: 0.08` (layer-relative values, not loudness claims).
Aim for broad soft low-mid body, little sub-bass, warm filtered tails, and rare clear
notes about 15–30 seconds apart. A 4–6 second softly filtered reverberant decay is
a sound-design proposal, not an implemented new reverb API. Keep the existing
engine's master gain, fades, playback gate and user volume controls authoritative.
Do not increase volume just because a user touches a plant. If a future engine
one-shot hook is added, it should schedule a quiet note through the existing bus,
with a long attack and cooldown. This pilot contains no sound files, media element,
oscillator, AudioContext, autoplay attempt, or independent player.

## Original rendering

- Locally generated stone grain, pores and fissures; smoothed irregular stone
  geometry; stratified tapered hanging rock masses. Static rocks are batched by
  material and moving island parent.
- Curved jade leaves with shader veins and restrained backlighting, layered fern
  fronds, folded grasses and cupped flowers; tiny continuous wind.
- A recessed pool with a real mirrored-camera `Reflector` pass, subtle analytic
  ripple distortion, depth-tested shoreline and submerged pebbles. It reflects
  the actual garden and planets. It is not screen-space reflection or a photo.
- Real planetary sphere, independent thin cloud shell, side-lit terminator,
  atmospheric rim, inclined rings with light-consistent shadow, and companion.
- Two original direction-space procedural nebula shells, fine far stars and
  depth-tested nearby lights. **The nebula is layered analytic shading, not
  volumetric raymarching.** No painted/poster texture or painting filter is used.

The references, source/visual distinction and no-copy boundary are recorded in
[validation/REFERENCES.md](validation/REFERENCES.md). No image-generation assets
were necessary. All garden geometry, textures and scene code are original. The
only rendering helper is the existing MIT-licensed Three.js dependency (including
Reflector and geometry utilities). The isolated harness uses the repository's
existing Pretendard font (SIL OFL) and existing React/Vite dependencies. No new
repository dependencies or external asset/network requests are introduced.

## Motion, quality, lifecycle

Default rendering follows requestAnimationFrame; no fixed 24fps cap. DPR is at most
2 and raster allocation is bounded to3.6 million pixels. Only sustained measured
slow frames for8 seconds reduce the quality multiplier to0.8 and reflection target
from1024 to768. Sustained fast frames restore quality. Narrow portrait layouts retain foreground foliage and recenter the distant sky. The camera is seated, with
maximum yaw≈6° / pitch≈3.4°, a0.7-second follow and3.2-second settle.

The shared live-scene host cancels RAF and detaches the canvas immediately when
unmounted, then disposes GPU resources after5 seconds. A quick return reuses it.
Context loss shows an explicitly labeled failure state; it never masquerades as
successful3D. A later mount can initialize again. Reduced motion keeps a genuine
rendered still, including after resize.

## Harness and verification

All harness source and validation records are inside this owned directory; the
built standalone harness is inside `public/immersive-worlds/cosmic/preview/`; captures stay in `validation/screenshots/` to avoid adding them to the app precache.
The built harness is reviewable on an existing deployment at:
`/immersive-worlds/cosmic/preview/index.html` (`?clean` hides validation controls; `?clean&still` opens a rendered still).
It is not wired into the main application.

```bash
npm run typecheck
npm test
node components/immersiveWorlds/cosmic/validation/build-harness.mjs
npm run build
npm run check:bundle
SCENE_BROWSER_PATH=/path/to/chromium SCENE_SCREENSHOT_DIR=components/immersiveWorlds/cosmic/validation/screenshots node components/immersiveWorlds/cosmic/validation/run-local.mjs
```

`run-local.mjs` starts/stops Vite and browser verification in the same process
namespace, with hot reload disabled so saving evidence cannot reset the scene.
The generated harness must be rebuilt after scene edits. `verify-cosmic.mjs` can
also run against an already running Vite server via `SCENE_BASE_URL`.

See [validation/RESULTS.md](validation/RESULTS.md) for actual results and limits.

## Known limits

- Native mobile GPU frame rate, thermal load and a physical Galaxy Fold have not
  been measured. Software WebGL tests and Fold-shaped viewport captures are not
  equivalent to hardware performance certification.
- Shadow maps are baked on initialization; millimetre-scale foliage sway does
  not rerender dynamic leaf shadows every frame. Broad scene reflections remain live.
- The analytic nebula is distant layered scenery; the camera is intentionally not
  allowed to fly through it. Pool ripples are analytic, not a fluid simulation.
- Sound design is a documented integration proposal. This visual pilot is silent
  in its standalone harness and does not alter the shared audio engine.
