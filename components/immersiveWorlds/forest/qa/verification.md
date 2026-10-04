# Morning forest pilot verification

Date: 2026-10-04. Base: `1bb79ac572e8568676881bbc7b4404f1bac443e8`.
Branch: `codex/morning-forest-pilot`. Draft PR: <https://github.com/alibowbow/brainwave/pull/49>.
The separate integration owner controls routing and main merge. This branch does not merge itself.

## Scope and provenance

All changed files are under `components/immersiveWorlds/forest/` or
`public/immersive-worlds/forest/`. Shared App, SessionBackdrop, types, catalog,
audioEngine, package files, rainyWindow and oilSea are unchanged. The repository
and parent directories contained no applicable AGENTS.md or `.agents/skills` at
the start; README and the existing CI workflow were read before implementation.

The scene uses original procedural geometry and CanvasTexture materials. There
are no downloaded/generated images, external models, recordings, paid services,
new subscriptions or new permissions. Existing Three.js/React dependencies are
used. Bundled preview notices are in `public/immersive-worlds/forest/qa/LICENSES.txt`.
Source/bundle hashes are in its `build-manifest.json`.

## Quality iteration

The first successful actual Chromium captures are retained in `attempt-2/`.
They exposed empty side ground, oversized canopy leaves, opaque-looking dew and
faceted green stones. They were not accepted as the final quality gate.

The next source revision adds surrounding tree stands and uneven-age saplings,
smaller denser canopy leaves, rooted grass and fuller fern banks. Distant wood,
leaves and fern geometry are batched while retaining real three-dimensional
positions. Large wet stones now use continuous normals and coordinate-based
color, plus separate small moss tufts. Morning sun is warmer; wet foreground
leaves retain veins, clearcoat and attached droplets. A real planar reflection
retains the farther tree forms and adds gentler perspective-dependent distortion.

Both Sonnet and Opus source files and live visuals were inspected; exact files,
blob hashes, selected principles and rejected behavior are in `../references.md`.
No unlicensed source/assets were copied. The implementation does not claim an
articulated branch solver or spring-simulated grass: wind is a restrained
height/spatially varied approximation. The camera uses the shared spring.

## Verification method

The owned harness mounts the actual default component, using the existing shared
host and hooks. Interaction assertions dispatch PointerEvents through the real
DOM component, never directly invoking interaction methods. A ready state,
nonzero geometry, buffer sizes, advancing simulation and captured image hashes
distinguish the 3D renderer from its labeled fallback.

The managed local browser blocked localhost. The protected branch preview
redirected toward Vercel authentication, and automatic approval review rejected
that dashboard-origin access. No protection setting, share token or permission
was changed. Existing GitHub CI runs the isolated owned harness instead.

Earlier Chromium compositor screenshot attempts timed out. Those failed reports
remain in `attempt-1-ci.json` through `attempt-6-ci.json`. A stale per-test reset
initially overrode the direct-capture default; this was found and corrected.
The capture helper pauses through the actual active prop, keeps the original
native dimensions, and by default synchronously reads the same actual WebGL
render immediately after drawing. The bounded browser-view route is opt-in with
`FOREST_QA_COMPOSITOR_CAPTURE=1` for environments whose compositor works.
Reports distinguish `cdp-view` from `direct-webgl`;
the latter contains scene pixels, not DOM controls. Neither uses a substitute
image, another renderer, reduced resolution or a fixed FPS setting.

All three requested layouts are captured first. Motion image comparison and DOM
lifecycle checks then use the requested native 882×344 landscape layout, including
its actual responsive camera; this is not a downsampled desktop canvas. The
renderer still follows display RAF; nonblocking WebGL2 fences now keep at most two
live animation submissions queued ahead of a busy GPU. The analytic look spring
uses elapsed time instead of ambient-wind's conservative long-frame clamp. This
resolved the live-browser test failure without lowering geometry, materials,
shadow maps, reflection or pixel count. Test waits do not change runtime quality.
The last visual revision adds a surrounding
stand of real tapered trunks and branches to close the remaining wide side gaps.

The final harness also supports `?paused=1`, so the additional initial-active=false
check can capture three still 3D layouts before enabling the actual active prop
and performing motion/lifecycle assertions. This does not change the component's
minimum public props or its integration behavior.

## Local gates

| Gate | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm test` | 155 PASS; CI-only browser test skipped locally |
| `npm run build` | PASS |
| `npm run check:bundle` | PASS; initial JS 402.6 KiB / 410, CSS 100.1 KiB / 135 |
| Owned static preview build | PASS |
| Source/bundle SHA-256 and owned-path boundary | PASS |

## Browser evidence

The verified runtime is commit `11a83bd4c358dda6c90f717e236de4834442ccf8`.
[CI run 37229401306](https://github.com/alibowbow/brainwave/actions/runs/37229401306)
passed all 25 test files / 156 tests, typecheck, production build, bundle budget,
and the existing `verify:scenes`, `verify:focus`, `verify:sea`, `verify:links` gates.
The checked-in [browser report](browser-report.json) is from that exact run.
Later commits strengthen the owned test/harness and add evidence; the rendering
engine, geometry, materials and public component are unchanged from this run.

| Actual native WebGL capture | Size | Result |
| --- | --- | --- |
| [Desktop](forest-desktop.jpg) | 1280 × 800 | Inspected: near wet leaves/dew, bark, solid stones/moss, reflected trunks, depth-separated canopy |
| [Fold-like portrait](forest-fold-portrait.jpg) | 344 × 800 | Inspected: seated pool composition with foreground leaves and readable middle/far tree layers |
| [Fold-like landscape](forest-fold-landscape.jpg) | 882 × 344 | Inspected: surrounding trunks and bank geometry retained across wide framing |
| [Later motion frame](forest-motion.jpg) | 882 × 344 | Same native view, later simulation time; image SHA-256 differs from preceding landscape frame |

All image bytes, dimensions and SHA-256 values were verified against the CI log.
They are captures of the actual Three.js canvas, **not browser compositor/DOM
screenshots**. The labeled fallback did not render in these checks. They show
original procedural 3D materials, not photographic/photogrammetric reconstruction.

The browser report passes actual animated frame/time progression, leaf and water
raycast callbacks, drag without accidental taps, gradual view return, active
pause/resume with touch rejection, app reduced-motion and browser-emulated OS
reduced-motion, shared-canvas transfer with callback ownership, last-holder
unmount/dispose and fresh remount. No page/WebGL shader errors were recorded.

**Visibility boundary:** the explicit simulated `document.hidden` hook passed
freeze/resume. Native window minimization did not change `document.hidden` in
this headless run; the second-tab attempt also exposed a Playwright context
restriction. The test now uses an explicit browser context so it can actually
open a second tab. This report does **not** establish a real background-tab
pause/resume; do not count the simulation as native visibility evidence.

**Performance boundary:** this software-rendered CI sample was extremely slow:
one in-page observation advanced one frame in 7057 ms (reported 0.1 FPS). It is
functional and visual evidence, **not evidence of smooth physical-device
performance**. Hardware browser/Fold profiling remains an integration gate.
The scene deliberately retains full material/geometry quality and display RAF;
there is no fixed 24 FPS or blanket low-resolution mode.

## Additional initially inactive check

Commit `224549f7bcd5bb6a79151182b6b0d007254a2397` also passed the complete CI:
[run 37229877317](https://github.com/alibowbow/brainwave/actions/runs/37229877317).
Its [separate paused-start report](paused-start-report.json) verifies that the
component first mounts with `active=false`, renders actual 3D with simulation
time zero, and preserves that time through all three native layout captures.
Enabling the actual prop then advances motion and passes all interaction and
lifecycle checks. Its image hashes refer to that separate CI log; the four
checked-in final JPEGs above intentionally remain tied to the first green run.

## Limits and integration

These are software-rendered Chromium results, not physical Fold/mobile GPU
performance measurements. Narrow 344×800 and 882×344 layouts are simulations.
OS reduced motion uses browser media emulation. Actual visibility observations
and a separately labeled simulated hidden-hook test are distinguished in the
browser report. Synthetic PointerEvents do not claim physical touchscreen testing.

The scene is an independent 3D pilot with approximate thin-leaf scattering,
planar reflected water and soft ray geometry, not photogrammetry or physically
volumetric transport. Static canopy shadow maps do not follow every tiny flutter.
The fixed distant bird only turns slightly; it never approaches.

Integration: lazy import `ForestWorld.tsx`, supply `active`, optionally connect
`onInteraction`, and map `amb:morning_forest` / 아침 숲 / 30 minutes in the shared
router/catalog owned elsewhere. Audio is a proposal only: existing `birds`,
`stream`, `forest` and optional quiet `bamboo` layers. The callback supplies world
position and gentle strength; there is no independent player or audio context.
See `../integration.md` for exact engine limitations and layer asset IDs.
