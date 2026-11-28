# 카페 집중 · rainy evening café pilot

Card identity: **`amb:focus_cafe`**, name **카페 집중**, default **40 minutes**.
Base main: `1bb79ac572e8568676881bbc7b4404f1bac443e8` (verified remotely before branching).
Branch: `codex/cafe-focus-3d-pilot`; draft PR: https://github.com/alibowbow/brainwave/pull/50 .
The integration owner controls routing and merge. This branch does not modify any shared file.

## Minimal integration

```tsx
const CafeWorld = lazy(() => import('../immersiveWorlds/cafe/CafeWorld'));
// Resolve the exact public card ID amb:focus_cafe in the shared router.
// The underlying existing preset has id focus_cafe and durationMinutes: 40.
<Suspense fallback={null}>
  <CafeWorld active={isPlaying && !sceneCovered} />
</Suspense>
```

`active` is the only required prop. Optional `onInteraction?: (event: 'cup' | 'lamp' | 'window') => void` emits after a successful short tap/raycast while motion is allowed. Cup: tiny ceramic/steam response; lamp: smooth 22% brightness change; window: locally clear only inside condensation, leaving exterior rain intact. Dragging turns the view up to about 3° and release eases home over 1.35 s. A drag that returns to its origin is still not a tap.

Mount inside a positioned container with nonzero dimensions. This component fills its parent. For the existing player/fullscreen pattern, mount another instance in the fullscreen holder: the read-only shared `LiveSceneHost` moves the **same** canvas to the top holder and back. Do not retain a hidden top holder. `useSceneMotion` gates active, hidden, OS reduced motion and the app `reduce-motion` class. Paused resize redraws the frozen scene without advancing time. Last release removes the canvas immediately and disposes resources after the shared host's 5-second grace period.

Integration owner should include this variant in existing live-scene `touchAction`/overlay rules. Shared `[data-scene-drag]` permits look gestures over the chrome's empty area; direct object taps require the scene itself to be the pointer target. Buttons must retain their own pointer handling. No changes to those shared rules are included here.

## Audio handoff (proposal only)

Use the **existing single audio engine**. The current preset is pink noise 0.5 + rain 0.6; consider the existing `window` rain layer as the dominant bed, with much quieter pink/room noise, after listening in the complete mix. No thunder, music, or intelligible speech.

- Continuous: muffled window rain, restrained room air, distant nonspeech movement.
- Very sparse: small ceramic/cutlery contact, substantially below the rain bed, with long nonperiodic gaps. No new sound type or source is invented in this pilot; any new recording needs provenance/licensing review by the audio owner.
- `cup` callback: optional quiet dry ceramic touch using an existing engine event path; rate-limit it and honor user volume/mute. `lamp` and `window` can remain silent.
- No `AudioContext`, media player, audio fetch, timer, volume setting, or audio dependency exists in this scene.

## Review and reproduction

The checked-in standalone review page is `/immersive-worlds/cafe/pilot/index.html` on the PR's existing Vercel preview. It is not wired to production card routing. It includes a reproducible compiled bundle so reviewers can open the isolated scene before the integration branch exists.

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
node components/immersiveWorlds/cafe/qa/build.mjs
SCENE_BROWSER_PATH=/path/to/chromium CAFE_TARGETS=auto CAFE_OUTPUT=/tmp/cafe-supported node components/immersiveWorlds/cafe/qa/verify.mjs
SCENE_BROWSER_PATH=/path/to/chromium CAFE_TARGETS=byte CAFE_OUTPUT=/tmp/cafe-byte node components/immersiveWorlds/cafe/qa/verify.mjs
```

Commit the source and built pilot before final verification. `verify.mjs` refuses uncommitted runtime changes and records the exact source commit/tree, bundle/environment SHA-256, run ID/time and fresh screenshot hashes; it does not compare against historical images. For the HDR upgrade its contract checks changed intentionally: three scene targets (refraction, bokeh, reflection) plus three shadow maps, the generated café probe on the HDR path versus the baked atlas on the byte path, pipeline active versus direct, and tap points read from the engine camera's own projection (`cafeQA.interactionPoints()`) because the shot moved. It starts and closes its own server (`CAFE_PORT` or a free port) and browser and tests the **built** pilot. `capture.mjs` captures the source/dev harness; `capture-quality.mjs` writes before/after PNGs (`CAFE_QUALITY_QUERY=post=off` for the direct path, `CAFE_QUALITY_ACTIVE=<frames>` for motion); `dispose-check.mjs` is a focused resource-release diagnostic. No package.json or dependency lock change is required. The browser executable is test tooling, not a shipped dependency.

The pilot build uses `.mjs`, which is outside the application's existing `.js` service-worker precache glob; the 3D pilot is fetched only when its review page opens. The tiny HTML/CSS can appear in the broad static precache. Regenerate the pilot after source changes using the command above. This bundle duplicates React/Three for isolated review only; integrated routing should import `CafeWorld.tsx` and let the app share its Three chunk. The integration owner may later remove the compiled review route after acceptance.

## Implementation and boundaries

- `CafeWorld.tsx`, `cafeHost.ts`, `cafe.css`: component contract, motion/input policy, shared-canvas adapter.
- `CafeEngine.ts`: Three renderer, pass order (refraction → exterior bokeh → scene with glass through the shared HDR pipeline or directly), real planar reflection, camera, resource lifetime.
- `glass.ts`: original rain/refraction/condensation glass shader, the half-resolution exterior bokeh pass (depth-based circle of confusion, blue-hour haze, closed-form lamp halos) and the pipeline volume hook (far-field depth of field for the room, faint warm air light).
- `world.ts`: café geometry and joinery, practical lighting (shadowed table-lamp key, pendants, bounce and sconce fill), lathed cup/saucer/spoon with latte, pleated lamp, notebook, lit steam, quiet seated people with slow breathing and head drift.
- `exterior.ts`: varied street façades at blue hour, HDR shop fronts and windows, string lights, parked cars, a crossing signal, street lamps, wet paving and broken reflection strips.
- `shelves.ts`: asymmetrical service shelves, curved pitchers, small cup stacks, muted bags/books and a restrained still life.
- `renderTargets.ts`, `environment.ts`, `probe.ts`: verified render-target capability policy, the baked byte-path environment, and the code-generated café/street PMREM probes for the HDR path.
- `materials.ts`, `plant.ts`: procedural shader surfaces (shared wood, fabric, plaster and glaze plus café slab oak, brick, brass, coffee and wet asphalt), custom curved leaves and ceramic pot.
- `qa/**`: isolated entry, reproducible build, browser tests, evidence and handoff notes.
- `public/immersive-worlds/cafe/pilot/**`: compiled optional review page.

Native viewport resolution at DPR 1–2; no fixed 24fps cap, low-resolution replacement or flat image backdrop. Planar reflection alone uses 65% resolution while the main scene/refraction remains full resolution. Renderer uses requestAnimationFrame and freezes when inactive. Basic unsupported-device status is explicitly identified as failure, never described as rendered 3D.

## HDR upgrade (2026-11)

The user rated the procedural worlds as PS2-level and asked for PS4/PS5-era rendering from three.js code only. This revision rebuilds the look; it is not a new visual approval. Evidence lives in `qa/evidence/hdr-upgrade/`. In each comparison, BEFORE is the previous source and AFTER is this source, using the same harness, headless Chromium with SwiftShader at DPR 1, 1280×800 and 390×844, and `capture-quality.mjs`.

- `cafe-compare-desktop.jpg` and `cafe-compare-portrait.jpg` show BEFORE beside AFTER.
- `cafe-render-paths-desktop.jpg` shows the HDR pipeline, the direct path (`?post=off`) and forced byte targets (`?targets=byte`).
- `cafe-motion-portrait.jpg` shows t = 0 beside t = 12.2 s: beads, runners and steam move.
- `verify-auto.json` and `verify-byte.json` are `verify.mjs` runs against the committed built pilot. Each passed 29/29 checks with zero runtime or shader errors. The auto run used source `f34449a`. The byte run used `d89e557`, which changes only the verifier: it now waits for frames after Resume before the drag check, removing a race that showed up under slow software rendering. Both used the same pilot bundle.

The older screenshots under `qa/screenshots/` and `qa/VALIDATION.md` are historical evidence of the previous scene and were not changed.

- **Pipeline.** With complete half-float targets the final draw goes through `shared/render/hdrPipeline.ts`: MSAA HDR scene, SSAO, a café volume pass, bloom, fitted ACES, warm-highlight/cool-shadow split tone, vignette and grain. The refraction pass into `this.target` is unchanged in role and still wrapped by `withCafeTargetState`. The glass shader keeps the `tonemapping_fragment`/`colorspace_fragment` includes: three disables them on the pipeline's render target (linear HDR out) and applies them on the direct path. `?post=off` in the harness keeps the direct renderer for comparisons; the forced byte policy always renders directly.
- **Window.** Rain on the outside face: dense micro beads, larger lens drops and slow stick-slip runners with wet trails. Each drop samples the sharp refraction image with an inverted, magnified offset; rays that would land on the room fall back to the bokeh. Behind them, a half-resolution bokeh pass reconstructs world positions from the refraction depth, keeps only what lies beyond the glass, adds blue-hour haze by distance, then gathers a golden-angle disc whose radius follows a thin-lens circle of confusion, from a mip matched to the tap spacing so one-pixel bulbs still become discs. Street lamps add closed-form single scattering along the eye ray, a volumetric halo with no ray-march steps, clipped by geometry. Condensation sits on the inside face, heavier at the sill and frame, glowing where the lamp lights it. A tap clears it locally as before. Planar reflection is Fresnel weighted.
- **Interior.** One motivated key: the table lamp's shadowed spot, shaped by the shade hem. There are three pendants (two with static shadows) over the back tables, a low bounce from the lit table top and a dim sconce behind the seat. There is no hemisphere or flat fill. Emitters are HDR: bulbs about 30–36, the lamp shade and shelf strips above 1. On the HDR path, image-based light comes from a PMREM probe of a tiny emissive stand-in of this café (dark warm room, cold window band, lamp and pendants). The street materials use a second probe (blue-hour sky, lit façades).
- **Materials and geometry.** Shared procedural surfaces cover walnut joinery, floor boards, lime plaster, linen, velvet and glazed stoneware. Café-owned patches add varnished slab oak, running-bond brick, brushed brass, a flat white with a poured heart, and rain-wet asphalt with puddles. Rounded-box joinery, a lathed cup with foot ring and ear handle, a lathed saucer and spoon, a pleated drum shade, drapes with real folds, an open notebook and lathed chairs and tables replace the previous box and cylinder stand-ins.
- **Depth.** The back of the room gets a far-field depth of field in the pipeline's volume hook, gathering from the refraction image with scatter-as-gather weights. Glass pixels are left untouched, so the patrons read as soft silhouettes. The street is defocused independently in the bokeh pass.
- **Composition.** The seat moved closer to the window: the camera is about 2 m from the glass instead of 5 m, so the drops resolve. The props now have realistic scale: the cup is about 15 cm wide, where the old one was 30 cm. The room still opens to the right with patrons, pendants and the counter. Portrait framing keeps cup, steam and lamp together under the window.
- **Life.** Rain runners, steam wisps, puddle ripples and patrons' breathing and head drift all move slowly on unrelated periods. There are no flashes, no lightning, no camera motion beyond the existing look spring, and no one approaches the viewer.

Performance: three scene passes (refraction, planar reflection at 65 %, main), a 28-tap half-resolution bokeh pass, a 20-tap half-resolution volume pass, SSAO and bloom. Shadows are static (`autoUpdate = false`) and re-rendered only on resize. The densest view is about 190 k triangles including the reflection pass. Only SwiftShader in headless Chromium was available; frame rate on phones was **not measured**.

Known limits: customers and buildings are original procedural models, not scans. Street streaks approximate wet reflections, while the window's interior reflection is true planar rendering. Droplets are layered shader fields, not a fluid simulation. No image-generation assets were used. Actual phone GPU performance and the shared production route remain integration-stage checks. See `PROVENANCE.md` and `qa/VALIDATION.md` for older evidence.

## Render-target compatibility

WebGL2 entry no longer requires EXT_color_buffer_float. Auto policy enables either genuine EXT_color_buffer_float **or** EXT_color_buffer_half_float, then probes the exact RGBA16F framebuffer. Reflection, refraction and the exterior bokeh target use HalfFloat on a complete target; otherwise they select RGBA8/UnsignedByte before allocation. Explicit `?targets=byte` is confined to the review harness; it never alters or hides GL extension APIs. Real-size targets are checked after resize, with a byte retry if HDR storage is incomplete. Each PCF shadow target (table lamp 2048², two pendants 1024²) is RGBA8 plus an UnsignedInt depth texture, allocated and checked before drawing. If HalfFloat fails at real size, the HDR pipeline is dropped too and the frame is drawn directly.

`Reflector` in Three 0.186.1 creates a lazy HalfFloat target; this owner configures it before its first allocation. Both scene passes, framebuffer probes and Reflector callbacks restore target, active cube face and mip level, including exceptional exits.

Runtime PMREM runs **only on the HDR path**, after the RGBA16F probe proved complete: `probe.ts` prefilters two tiny code-generated emissive scenes, the café and its street (128 px faces). The byte path still never constructs a PMREMGenerator. It samples the bundled `room-environment.hdr` CubeUV atlas, baked from the previous RoomEnvironment(.035), as a dim fill (intensity .16), and HDRLoader creates it as a sample-only RGBA16F texture that is never attached to a framebuffer. If probe generation throws, the HDR path falls back to the same baked atlas. See the adjacent asset provenance JSON and `qa/bake-environment.mjs` for the bake.

The supported path retains HDR reflection/refraction/bokeh. The byte path has lower offscreen highlight range (the bokeh pass weights highlights more to compensate); it does not replace or lower the resolution of the 3D scene. A failed reflection FBO need not black the entire canvas. Shared routes/audio, packages and the protected scenes are unchanged.
