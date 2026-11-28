# Water edge worlds — integration contract

This worker owns only `components/immersiveWorlds/waterEdge/` and `public/immersive-worlds/waterEdge/`. Built from main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including protected ocean PR #51. No common catalog, audio, app, package, CI or protected scene changes. The integration Work owns canonical routing, persisted settings and final merge.

| Canonical scene ID | Default entry |
|---|---|
| `amb:night_pond` | `components/immersiveWorlds/waterEdge/NightPondWorld.tsx` |
| `nature:summer_valley` | `components/immersiveWorlds/waterEdge/SummerValleyWorld.tsx` |
| `nature:pebble_shore` | `components/immersiveWorlds/waterEdge/PebbleShoreWorld.tsx` |

Each entry accepts `{ active: boolean; static3D?: boolean; onInteraction?: (event: WaterEdgeInteraction) => void }`. Only `active` is required. Lazy-import entries from the shared core. Supply a positioned parent with a nonzero height; the world fills it. Keep existing `data-scene-surface` / `data-scene-drag` hooks for chrome-overlay look/taps, and classify these IDs as live 3D centrally so shared overlays and touch-action follow the existing live-scene path. No extra audio context, media element, fetch dependency or external asset service is created. All geometry, textures and shaders are procedural original work. Public asset directory is intentionally empty of runtime assets.

Integration owner also needs to include these lazy scene chunks in the shared PWA on-demand cache policy rather than precaching every world. The isolated QA build imports all three only for verification; do not import its dev entry into production.

## Rendering and lifecycle

Each world has its own Three scene and camera; each same-world player/fullscreen holder shares one `LiveSceneHost` and one canvas. The newest holder wins, and release returns the canvas to the previous holder. Different worlds have independent hosts. All holders released => animation stops immediately, then the standard host schedules disposal after a 5-second retention period. Disposal requests release of geometry, instance buffers, material textures, shadow maps, environment targets and renderer; that delay does not establish completed GPU cleanup. The follow-up records failed clean valley disposal gates below. Static shadow maps are cached; the rolling pebble explicitly invalidates its map while moving. No package changes.

Normal view uses antialiasing, DPR up to 2, and requestAnimationFrame without an artificial frame cap. The owned runtime admits one complete GPU render batch at a time using nonblocking completion queries, including initialization and paused redraws. Busy animation does not accumulate elapsed simulation time. Identical holder/size requests reuse the current frame; a real pending resize or interaction preserves the latest final paused frame until it can render. Reduced-motion media query, existing `.reduce-motion` app setting, hidden document, `active=false` or `static3D=true` preserve a rendered first/current 3D frame and stop animation/interaction. Resize re-renders the still view. WebGL/fence failure displays a truthful localized unavailable state; it never claims a poster is live 3D.

### HDR image path (2026-11 upgrade)

When the context can render half-float targets, the engine creates the shared `HdrPipeline` (`../shared/render/hdrPipeline.ts`) right after the world factory runs: linear HDR scene radiance in a multisampled target, screen-space AO, a world-owned half-resolution volume pass, bloom, ACES tone curve and grade. It is never created in the constructor, so engine tests with mocked renderers stay on the direct path, and it is disposed with the engine. Without float colour buffers (or with the QA `targets=byte` mode) the previous direct renderer runs, and each world's `setPostActive(false)` restores fog and exposure for it. Worlds describe their image through optional `WorldScene` fields: `post` (exposure, bloom, AO, grade), `createVolume()` (night-pond moon mist ≤30 steps, valley canopy shafts ≤34 steps, shore sea haze ≤26 steps, all half resolution), `setPostActive()` and `setDrawingSize()` (the pond's half-resolution planar reflection). The canvas publishes `data-post` with the pipeline report. Each world uses one strong key light (moon, sun through a procedural canopy cookie, low dawn sun), a dim sky ambient from a radiance probe built from its own procedural sky, HDR emitters and code-generated geometry/materials from `render/` (stones, foliage sprig cards, trees, probe/reflection helpers). Device frame rate is not measured; SwiftShader captures grade appearance only.

### Night pond water (2026-11-28)

`scenes/nightPondWater.ts` owns the pond surface. A light air crosses the pond; five directional wave trains on the capillary-gravity dispersion relation, a baked 128² tileable pair of quadrature slope fields (read at two scales and directions and phase-rotated, so ripples travel instead of sliding) and drifting cat's-paw gusts from a baked 64² noise move the surface. A baked 160² pond map (distance to the bank and rock waterlines, shelter from wind fetch, banks and lily colonies) keeps the lees and lily colonies calm and drives a shore lap and meniscus. The half-resolution mirror is looked up along the true reflected ray at an estimated reflected distance, so reflections waver mostly in screen-vertical, then smeared along that direction by unresolved roughness (5 taps). The moon's glitter is a slope-distribution lobe spent as drifting, fading sparkles. The reflected path also crosses the same moonlit mist as the volume pass. Pond-life rings (insects, drops, rising fish) are scheduled on the CPU from hashed time slots as a pure function of scene time and share `uRings` with the four tap slots; lily pads and about 40 floating specks (pollen, petals, leaves) ride the same trains and rings. The water pass costs 9 texture reads (4 of them baked textures) plus ALU for five trains and the active rings, with no per-pixel gradient noise; bakes run once at world creation. No device timing was measured.

### Pebble shore rebuild (2026-11-28)

The strand is now mixed shingle rather than uniform basalt. About 3,000 instanced stones are packed by dart throwing (coarse cobbles at the berm, finer pebbles and grit down the swash face, sand and gravel drifts between) in five shape families and three levels of detail; only the near ones cast shadows. A per-instance `aStone` attribute selects one of nine rock types with their own colour, pattern and dry roughness. `scenes/pebbleShoreGlsl.ts` holds one analytic shore model shared by the sea, bed, stone and wrack shaders: shoaling wavelets that spill once their height reaches half the depth, a main train whose crests arrive as swash cycles (uprush, backwash, per-wave run-up with along-shore lobes) plus a shorter wind-chop train, and `swDryAge`, the seconds since the swash last covered a point, so stones and bed stay glassy for a few seconds after draining and damp for longer. The sea mesh is finest across the surf zone so crests have real height. `scenes/pebbleShoreLand.ts` builds the headland as walls around a noisy outline with strata beds that stand proud or recess, joints, a talus apron and a turf cap, plus a sea stack and an islet; shells and draped wrack strands (which sway with the swash) dress the strand. The sky has a lit cloud deck and cirrus. Added shader cost: the shore model (a few hashes and exponentials) in the sea, bed, stone and wrack shaders, two warped fBm lookups per sky pixel and one cheap one per sea reflection (two in the far field). SwiftShader counts: about 0.85M triangles per frame including the shadow pass (was 1.95M) and about 100 draw calls.

### Summer valley polish (2026-11-28)

Boulders use `streamBoulderGeometry` (crisp fracture faces, flattened exfoliated crown, a weathered joint groove). Moss is a lifted shell from `render/moss.ts` whose thickness tapers to a ragged, shader-cut border, with clump relief, velvet rim and backlit glow. Two hazed, crowned ridge strips close the valley's far end as extra depth layers; canopy shafts are slightly denser. Sixty-four seed-fluff sprites drift across the valley on a 130 s cycle and brighten in the canopy gaps; three dragonflies patrol slow, hovering loops over the water 6 to 14 m from the seat and never approach it. Cobbles drop their buried halves and use coarser shapes beyond 5 m; only near cobbles cast shadows.

Pointer look is limited to approximately ±8.6° yaw / ±5.2° pitch and eases back. Tap requires travel <=8 CSS px, duration <750 ms, primary pointer/button, and a true scene hit. Movement back to origin is still a drag. Cancel and blur never tap. No audio reaction while paused/reduced/hidden. Keyboard Enter/Space touches the lower-center view where valid geometry exists. Optional callbacks are bounded; they do not change global settings.

## Interaction/audio adapter

```ts
interface WaterEdgeInteraction {
  world: 'night-pond' | 'summer-valley' | 'pebble-shore';
  kind: 'ripple' | 'pebble-roll';
  strength: number; // scene-bounded visual cue, not a gain multiplier
  position: { x: number; z: number }; // metres in the scene's local water/ground plane
}
```

The host limits successful events to at least 0.65 seconds apart; pebble animation adds its own settling interval. Route the callback into the existing audio engine only if the integration owner implements a suitable quiet one-shot adapter. Do not instantiate another player or modify selected sound-layer volumes on tap.

Recommended existing-engine layers (not applied by this worker):

| World | Quiet bed and spatial hierarchy | Integration recommendation |
|---|---|---|
| Night pond | `ruralCrickets`/`night`, faint `stream`, very distant `owl` | Lower owl relative to insects, gentle water detail; reeds only if an existing suitable layer is available. No sudden close call. |
| Summer valley | Close `stream`, distant `cicadas`, occasional small drops | Existing preset includes `waterfall`; avoid a prominent waterfall bed because this place is a shallow stream. Integration owner may lower/remove it. |
| Pebble shore | `pebbles` is the main detail, separate quieter `wave`, sparse distant `seabirds` | Preserve existing engine's retreat-rattle timing. Visual swash is not claimed sample-synchronized with the current independent audio scheduler. |

## Verification harness (QA only)

`dev/` imports these exact entries; no temporary App/SessionBackdrop patch is required. `dev/dist/` is ignored and is never production content. `qa/` evidence and scripts are excluded from scene imports.

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
npx vite build --config components/immersiveWorlds/waterEdge/dev/vite.config.ts
npx vite preview --config components/immersiveWorlds/waterEdge/dev/vite.config.ts --host 127.0.0.1 --port 4187
# The verifier can start its own server, useful for isolated execution environments:
CHROMIUM_PATH=/path/to/chromium node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve
```

Open `/?world=night-pond`, `/?world=summer-valley`, or `/?world=pebble-shore`; add `&controls=1` for QA controls, `&post=off` for the direct (pre-HDR) renderer and `&t=<seconds>` to start the scene clock at that time (harness only, via `configureWaterEdgeClock`), so motion can be captured as deterministic stills. `qa/capture-quality.mjs` builds the harness and writes PNGs of all worlds (`WATER_EDGE_PORT`, `WATER_EDGE_QUERY`, `WATER_EDGE_ACTIVE=<frames>` for animated captures); the before/after comparison of the HDR upgrade is in `qa/evidence/hdr-upgrade/`. See QA report for exact executed commands, browser/runtime, code/bundle digests and limitations. Root production build passing does not by itself prove the unintegrated scenes render: the separate harness build and actual WebGL checks provide that evidence.

## Scope limits

No real Fold hardware, mobile thermal or device FPS guarantee. Fold-inner coverage means viewport emulation. Hidden-state synthetic tests are labeled separately from real tab switching. Reflection/refraction techniques and approximations are documented in REFERENCES.md. No swimmer, underwater camera, free-roaming camera or fast viewpoint motion is exposed. No main merge or live production deployment is performed by this worker.

## Bounded follow-up to PR58

The follow-up branch `codex/water-edge-material-compat` starts at original final head `299a18911b2b7818149e4997dc2101b9c760bef5` and targets the original branch as a separate draft PR. Published production commit `8b906c4e23f18984804659e9213292b84204500b` changes only shore stone material and owned render-target/environment compatibility. It has the exact tree of local capture-source commit `9420bd71def5f8ec6de13006f6132e0ee09ff621`; the GitHub connector changed commit metadata, not source bytes. Entry paths, props, motion/input/audio contracts and geometry/composition are unchanged. Normal and real forced-byte renders are documented in [qa/FOLLOWUP.md](qa/FOLLOWUP.md), with raw source/bundle/image hashes, publication mapping and input/lifecycle reports.

The historical c6 clean valley failures remain preserved: normal/byte context loss occurred at 36.8076/45.4897 seconds; their second cycles/remounts remain unrun. The separately authorized disposal continuation adds only owned runtime submission control and its helper, with source-bound diagnostics in [qa/LIFECYCLE.md](qa/LIFECYCLE.md). Published production checkpoint `e4a11dd135c7979b644d667755f6a68fa4ea529d` and capture checkpoint `8482c3fef3bcf0448a0ed92b39f931253b1146f5` have exact local capture-tree counterparts recorded in [qa/lifecycle-publication.json](qa/lifecycle-publication.json).

On this corrected source, the unchanged 20-second clean gate passes both release → trusted context loss → fresh-remount cycles for valley normal (16.2501/7.7436 s) and byte (5.0389/5.3272 s). Separate two-real-RAF-frame no-drain checks pass normal/byte at 5.0204/5.0186 s. **Responsive software-driver teardown is still not established:** the first normal clean cycle spent 11.249 s synchronously inside dispose and blocked the event loop. The integration owner must explicitly assess that remaining software-renderer limitation; passing the finite lifecycle deadline is not continuous-performance or uniformly responsive-cleanup approval. Five-second retention is not GPU cleanup time.

Integrate PR58's exact original head first, then the bounded PR64 follow-up commits, preserving all newer main/user changes and the entire sea PR51. Use PR64's final published head, including evidence and handoff, rather than local capture IDs. The integrator still owns actual Player/ImmersiveMode route/chrome/native-fullscreen validation and exact integrated-head CI. Shared-host five-second retention is not a promise of five-second GPU reclamation; the follow-up measures dispose entry/exit/context-loss separately. Do not treat trusted browser touch emulation as physical touchscreen certification or the finite SwiftShader bursts as a sustained-performance pass. No merge or deployment is performed by this worker.
