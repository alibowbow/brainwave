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

## HDR upgrade · 2026-11

The garden now renders through the shared HDR pipeline
(`../shared/render/hdrPipeline.ts`): half-float MSAA scene target, SSAO, a
half-resolution volume pass, bloom, ACES, grade, vignette and grain. Every
material outputs linear HDR radiance; on the direct fallback (no float colour
buffers, or `?post=off` in the harness) three's own ACES and sRGB conversion
apply to the same values, with exponential fog standing in for the dust volume.

- **Light rule.** One key: a distant star just outside the desktop frame (left),
  `COSMIC_SUN_DIRECTION` in `sky.ts`, with a 2048 shadow map over the terrace.
  Ambient is image-based light prefiltered from the baked nebula (PMREM), plus a
  dim warm directional bounce from the gas giant. The old hemisphere flood, rim
  and point fill lights are gone.
- **Sky (`sky.ts`).** The nebula is a 40-step emission/absorption march through a
  domain-warped 3D noise field (teal/rose gas, star-forming regions, dust lanes,
  warm reflection glow toward the star), baked once into a 512² half-float cube
  map; the dome then costs one cube fetch plus one detail fetch. Without float
  targets the dome evaluates a 10-step march live. 9,000 stars use black-body
  colour temperatures, a power-law brightness distribution and dust extinction
  read from the bake.
- **Gas giant.** Band albedo is baked once (1024×512, domain-warped belts,
  shear streaks, oval storms) and drifts with slow differential rotation. Soft,
  reddened terminator; ring shadow traced to the ring plane; aurora curtains,
  ringshine and faint nebula light on the night side; an analytic 8-sample
  single-scattering shell (Rayleigh-like limb plus a forward lobe). The planet
  spins about the ring normal so the rings are equatorial.
- **Rings.** Slab single scattering (reflection on the lit face, diffuse forward
  transmission on the unlit face that the seat sees), C/B/A rings, Cassini and
  Encke gaps, ringlets faded below pixel size, and the planet's umbra in world
  coordinates (`COSMIC_RING_SHADOW_EDGES`, shared with the test).
- **Islands and terrace (`garden.ts`).** Eroded island masses with lobed,
  asymmetric undersides, stepped strata ledges, erosion grooves and hanging
  crags, on the shared `rockSurface` material (strata, stains, moss on upward
  faces). The seat terrace is one such mass with a recessed pond basin. Rim and
  floor stones use the shared `rockGeometry` boulders with a wet band at the
  waterline. The old thin root tubes were removed (they read as dark wires);
  hanging ferns spill over island rims instead. Two islands carry small
  waterfalls that fade into mist (volume puffs, or sprites on the direct path).
- **Water.** The real `Reflector` pass is kept (RGBA16F/RGBA8 policy unchanged)
  with Fresnel reflectance, analytic ripple slopes, GGX star glints and a dark
  water body over the basin floor.
- **Plants (`botany.ts`).** One shared material set for the whole garden;
  translucent laminae lit by the real key direction (strongest when looking
  toward the star), restrained bioluminescence (a few fern tips, faint veins,
  petal hearts and near anthers, each breathing on its own and fading with
  distance), and terrace plants cast the baked shadow. Fern leaflets use fewer
  rows; the garden is about 0.67 M triangles (tested below 0.9 M).
- **Dust (`spaceDust.ts`).** Patchy drifting dust around the islands, clear air
  around the seat, two-lobe Henyey-Greenstein scattering of the star, analytic
  ellipsoid shadows from the islands and waterfall mist, at most 32 steps at
  half resolution (20 on the reduced tier).
- **Quality tiers.** `cosmicPostTier` in `qualityPolicy.ts`: full quality keeps
  AO and 32 dust steps; the measured 0.8 tier drops AO and uses 20 steps, along
  with the existing pixel-ratio and 768 reflection reductions.

Island foliage, island waterfalls and mist live on `COSMIC_DETAIL_LAYER`, which
the main camera and the touch raycaster include but the pond reflection skips.

Before/after evidence (BEFORE = the previous renderer, AFTER = this upgrade,
SwiftShader, DPR 1, reduced-motion stills at time 0) is in
[validation/evidence/hdr-upgrade](validation/evidence/hdr-upgrade):
`cosmic-compare-desktop.jpg` and `cosmic-compare-portrait.jpg` (1280×800 and
390×844), the full-size AFTER stills, `*-direct.jpg` for the direct fallback
(`?post=off`), `*-active.jpg` after animated frames, and the capture reports.
`node components/immersiveWorlds/cosmic/validation/capture-quality.mjs` builds
the isolated harness into a temporary folder and writes PNGs
(`COSMIC_QA_QUERY=post=off` for the direct path, `COSMIC_QA_ACTIVE=<frames>`
for animated frames, `COSMIC_QA_PORT`, default 4318). `verify-correction.mjs`
now renders the current source harness and records **fresh** compatibility
captures and hashes under `validation/evidence/hdr-upgrade/compatibility`;
the 2026-10-04 correction folder and its hashes are historical and are not
rewritten. With the pipeline active, the fresh run passed automatic RGBA16F
(desktop, portrait, landscape) and forced RGBA8 (desktop, portrait)
reflections plus the GPU state-restoration probe, with zero ring-shadow centre
error. `run-local.mjs` takes `COSMIC_PORT`, and `verify-cosmic.mjs` takes
`SCENE_TIMEOUT_MS` for heavily loaded software-GL machines. On the heavily
loaded upgrade machine the behaviour suite was stopped after its first four
checks (renders and advances, pause freezes, resume keeps the canvas, holder
move keeps the renderer), because each animated SwiftShader frame took tens of
seconds; the remaining lifecycle checks were not re-run for this upgrade. The published preview under `public/immersive-worlds/cosmic/preview`
was not rebuilt by this upgrade and still shows the previous renderer.

## Original rendering (historical, superseded by the HDR upgrade)

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

Default rendering follows requestAnimationFrame; no fixed 24fps cap. A new engine
starts at quality multiplier 1 with a 1024-pixel reflection target. DPR is at most
2 and raster allocation is bounded to 3.6 million pixels before the multiplier.
The policy measures **accumulating/decaying frame pressure, not consecutive slow
frames**: intervals above 34 ms and below 500 ms add their duration to slow
pressure and clear the fast counter. Intervals above 0 and below 22 ms add to the
fast counter and subtract their duration from slow pressure (floored at zero).
Other intervals, including long scheduling gaps, leave both counters unchanged.
More than 8 seconds of slow pressure selects multiplier 0.8 and a 768-pixel
reflection target, clearing slow pressure. More than 24 accumulated fast seconds
restores multiplier 1 and a 1024-pixel target, clearing the fast counter.

Pause, hidden, offscreen and reduced-motion states stop RAF and retain the last
selected quality and pressure counters; they do **not** force full quality or
clear adaptation history. Resume's first frame has a zero time delta. A new
engine after disposal starts at full quality again. Narrow portrait layouts retain
foreground foliage and recenter the distant sky. The camera is seated, with
maximum yaw ≈ 6° / pitch ≈ 3.4°, a 0.7-second follow and 3.2-second settle.

The shared live-scene host cancels RAF and detaches the canvas immediately when
unmounted, then disposes GPU resources after5 seconds. A quick return reuses it.
Context loss shows an explicitly labeled failure state; it never masquerades as
successful 3D. A later mount can initialize again. Reduced motion keeps a genuine
rendered still at the retained quality, including after resize.

## Reflection compatibility correction · 2026-10-04

Before the first GPU allocation, the owned helper checks the real
`EXT_color_buffer_float` and `EXT_color_buffer_half_float` extensions. Either
permits this non-MSAA RGBA16F reflection. With neither extension, the same pool
uses RGBA8/UnsignedByte. The actual framebuffer is checked, and an incomplete
half allocation is disposed before retrying byte. Both initial allocation and
quality-driven resize are checked; the probe restores the previous render target,
cube face and mip level in `finally`. No GL extension result is fabricated.
Existing PCF shadow targets use byte color/depth and do not need float attachments.
(Historical: at the time the scene had no PMREM or other offscreen colour pass.
The HDR upgrade adds the shared pipeline, a half-float nebula bake and PMREM,
all of which are skipped when float colour buffers are unavailable.)

The isolated built harness accepts `?compatibility=auto` and
`?compatibility=byte` for full-quality, time-zero real-3D stills. `&probe` also
runs a small validation-only GPU state-restoration check. These controls are
not component props or production app routing. The production host always uses
automatic capability selection. Optional engine-level byte selection exists
only to exercise the exact fallback without spoofing unsupported hardware.

The ring-shadow center is refreshed with `planet.getWorldPosition()` before
rendering, so the portrait sky rotation and ring fragments share world coordinates.
Correction source/bundle SHA-256 bindings, native PNGs, functional checks and
limits are in [validation/correction-20261004](validation/correction-20261004).

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

- HDR upgrade: native phone GPU cost was not measured. The pipeline, a 1024
  reflection pass, half-resolution dust and roughly 1.3 M drawn triangles per
  frame (main view plus reflection) are plausible for recent phones but unproven;
  the measured quality tier is the only safety valve. Dust light shafts from the
  islands are subtle because the star sits outside the frame.

- Native mobile GPU frame rate, thermal load and a physical Galaxy Fold have not
  been measured. Software WebGL tests and Fold-shaped viewport captures are not
  equivalent to hardware performance certification.
- Shadow maps are baked on initialization; millimetre-scale foliage sway does
  not rerender dynamic leaf shadows every frame. Broad scene reflections remain live.
- The analytic nebula is distant layered scenery; the camera is intentionally not
  allowed to fly through it. Pool ripples are analytic, not a fluid simulation.
- Sound design is a documented integration proposal. This visual pilot is silent
  in its standalone harness and does not alter the shared audio engine.
