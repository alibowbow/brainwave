# Quiet sanctuaries — independent group handoff

This group intentionally does not wire the shared catalog, player, audio engine or production bundle. The integration owner imports the following default React entries lazily. No dependencies or shared source files are changed.

| Canonical ID | Default component |
| --- | --- |
| `meditation` | `components/immersiveWorlds/quietSanctuaries/MeditationCourtWorld.tsx` (hosts the Mosi Shadow Garden from `../mosi/`) |
| `nature:womb` | `components/immersiveWorlds/quietSanctuaries/WarmHeartWorld.tsx` |
| `amb:snowy_night` | `components/immersiveWorlds/quietSanctuaries/SnowVillageWorld.tsx` |

Only `active: boolean` is required. Optional `static3D` freezes the fully rendered spatial scene, including its first frame; optional `onInteraction` provides the event described below. Give the component a sized parent; it fills both axes and has a 220px minimum height. A parent marked `data-scene-surface` may contain controls above the scene. Buttons, links, inputs and role=button elements do not start scene gestures.

## Renderer and lifecycle

Each entry has one module-level `SanctuaryHost` extending the existing read-only `LiveSceneHost`. A second holder (fullscreen) moves the identical canvas and renderer to the top holder. Returning transfers it back. The final release stops motion immediately and inherits the shared host's five-second disposal grace. No independent animation runs outside the engine RAF; elapsed time freezes while paused/hidden/reduced-motion/static3D. The shared `useSceneMotion` handles document visibility, OS reduced motion and the app's `reduce-motion` class.

The same true 3D frame is shown on pause, first inactive mount and resize. WebGL failure displays an honest unavailable notice. No poster or screenshot substitutes for 3D. Rendering uses antialiasing, native CSS resolution with up to 2× device supersampling, ACES, soft shadows, and an uncapped RAF. There is no default low-resolution or 24fps mode.

The basin keeps its actual 1024×1024 planar reflection and independently written analytic damped ripple shader. Before any reflection draw, the meditation builder checks the actual RGBA/depth framebuffer. Extension availability selects the first candidate only: advertised HalfFloat must pass framebuffer completeness and GL-error checks; failure disposes its storage before a same-size checked UnsignedByte retry. A failed final byte target throws into the existing host error state.

Meditation indirect light is retained in both paths. The owner-local r186 PMREM adapter prepares and checks BOTH 336×256 CubeUV output and ping-pong targets before generation; a failed half-float pair is fully discarded before constructing a fresh byte pair. It runs the installed unmodified PMREM algorithm with that checked output, releases scratch storage and assigns the resulting CubeUV texture directly, bypassing implicit unchecked PMREM. The adapter deliberately guards Three revision186 and its private allocation surface; a Three upgrade requires revisiting this adapter, not removing the guard. Caller target/cube-face/mip, viewport/scissor, XR, autoClear, tone mapping and clear state are restored. Retained targets are disposed with the world.

Production `MeditationCourtWorld` still requires only `active:boolean` and always uses automatic full-quality selection. Explicit `force-byte` is selected only by the isolated QA builder. Native extensions/GL functions are never replaced in the new verifier. Canvas `targetCompatibility` diagnostics record every actual FBO check, selection and state restoration. See `qa/README.md` and `qa/compat-evidence/` for the new compatibility evidence; historical `qa/evidence/` describes the earlier extension-only implementation and is preserved unchanged.

Warm Heart and Snow Village render through the shared HDR pipeline (`../shared/render/hdrPipeline.ts`: MSAA half-float target, SSAO, a half-resolution volume pass, bloom, ACES grade) by declaring `post` on their `SanctuaryWorld`; worlds without it keep the direct renderer, and the direct path remains the fallback without float targets. Warm Heart is a shelter of living, translucent tissue: a tunnel of softly folded membrane narrows toward a glowing heart, and five iris folds arch over it one behind another. Each fold is a ring of overlapping lobes, alternately in front and behind, thick at the root and thin at the rim, gathered, wrinkled and cupped forward over the lobe behind; screen-space AO separates them where they overlap and where they meet the floor. Soft, branching vessels lie beneath the surface (trunks forking toward the thin rims; a sparse tree in the walls) and only darken the light passing through. A slow travelling wave deforms the folds and tilts their shading, so satin highlights move as the space breathes. Light from beyond the walls and from the heart crosses the tissue with a Beer–Lambert tint (`shared/render/translucentSurface.ts` plus `tThrough` in `warmHeart.ts`), so thin rims pass warm gold while roots, vessels and stacked layers deepen to rose and crimson; it drifts through the tissue in slow soft patches, gathers in the rolled rims, and pours through the openings as cones of light in the haze (`ringPass` and bud-gap shafts in `atmosphere.ts`). Plump velvet pillows (`shared/render/fabricSurface.ts`) rest on the floor with contact shading beneath; a rounded bud cups an amber heart; denser warm air softens the farther folds. A breathing vertex lift, additive drifting motes and a touch ring of light complete it. It is still an approximation, not volumetric subsurface transport. Snow Village uses settled snow with blue subsurface wrap and ice glints (`shared/render/snowSurface.ts`), normal-based snow cover on wood, stone and branches, per-house limewash (tint, rain streaks, rising damp, spalled patches over coursed rubble; `villageMaterials.ts`), hand-hewn slightly bowed timbers, proud rubble-stone plinths, deep bargeboards with knee braces and rafter tails, gabled door hoods on braces, chimney caps with clay pots, paired board shutters, sagging ridges under a thick snow load that creeps past the eaves into rounded cornices with icicles and rolls over the gable ends, a side wing, a woodshed lean-to, a low-railed balcony, planter boxes and a leaning sled. Snow-laden firs (`snowFir.ts`: drooping star-lobed branch tiers with needle mass, a modelled snow load and ragged needle edges) stand among the houses, close the lane's end and fill the far forest band. Door lanterns wash the facades and pool on the snow (four analytic lights evaluated only by the village plaster, timber and ground shaders), each lit window throws its own shape with mullion shadows onto the snow (lane-side windows put that light on open snow in view), and the lane carries footprints, sled runners and shovelled berms. GPU snowfall falls at four depths (`shared/render/snowFall.ts`); a broken cloud deck drifts over the twinkling stars, silvered near the moon; lamp halos, chimney smoke wisps and moonlit haze come from `atmosphere.ts`. Its moon shadow map renders once. Renderer diagnostics are descriptive counters; reflective recursive passes mean the last-pass draw-call counter is not total GPU work, and no device FPS or thermal claim is made.

Since the Mosi integration, `MeditationCourtWorld` renders the authored Blender Mosi Shadow Garden (`../mosi/MosiEngine.ts`: GLB geometry with baked Cycles colour projected from five responsive renders; see `design-source/mosi/README.md`). The procedural court in `meditation.ts` (basin reflection, PMREM checks below) now serves only the QA byte-target builder. Code adds only life to the baked look: the four ramie panels sway a centimetre or two at the hem with their colour locked to the cloth, leaves and twigs beyond stir, soft leaf shade drifts over the sunlit cloth, the daylight breathes by a few percent and motes drift in the dim room. The baked lighting, leaf shadows and panel art are unchanged.

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
