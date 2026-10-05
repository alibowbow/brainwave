# Cosmic pilot verification · 2026-10-04

The bounded follow-up **COSMIC-CORRECTION-20261004** supersedes the original
counts below with 170 tests, 20 lifecycle checks, 7 compatibility/capture checks,
new normal/byte PNGs and exact source/bundle/image hashes. See
[the correction report](correction-20261004/README.md). The original pilot record
below is retained as history.

## Scope and baseline

Started from the verified remote main
`1bb79ac572e8568676881bbc7b4404f1bac443e8`, in a clean separate branch.
No AGENTS.md or .agents/skills exists in that checkout; README and CI instructions
were read first. During work, main advanced to `14940149cc5c0fccb778b58d4d755a04aea55e53`
through the separate oil-sea PR #51. Those protected changes were read only and
are not overwritten or included in this worker's diff.

Only `components/immersiveWorlds/cosmic/**` and
`public/immersive-worlds/cosmic/**` are changed. Shared routing, App, types, catalog,
audioEngine, package files and both protected scene directories remain untouched.
The main app has no cosmic route wiring from this worker. PR #52 stays draft.

## Executed checks

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm test` | Pass:151 tests /24 files, including4 new geometry/disposal/budget checks |
| Standalone production harness build | Pass, actual scene imported into the standalone Vite bundle |
| `npm run build` | Pass, including PWA generation |
| `npm run check:bundle` | Pass: initial JS402.6KiB /410KiB; CSS99.5KiB /135KiB |
| Browser renderer | Real Three.js r186, Chromium153, ANGLE Vulkan SwiftShader WebGL2; no poster/fallback substituted |
| Live behavior | Frame/time advancement, pause/resume, one canvas through two holders, bounded drag, out-and-back drag suppression, keyboard local-glow callback |
| Motion policy | Native reduced-motion emulation, app `.reduce-motion` class, offscreen intersection and document visibility handler stop/resume |
| Disposal | Three unmount →5-second idle disposal →remount cycles; retained old canvas marked disposed and frame counter remains stopped |
| Sizing |390×844 portrait,344×882 Fold-like portrait,882×344 landscape; correct buffer aspect and cap |
| High DPI | Separate reduced-motion DPR2 portrait; actual780×1688 buffer and real WebGL draw calls |
| Errors | No page or shader/WebGL errors in successful browser run; capture report also has no errors |

The machine-readable lifecycle record is
[screenshots/cosmic-validation.json](screenshots/cosmic-validation.json).
Behavior checks use800×500 to keep software rasterization practical; this is a
harness viewport, not a production resolution setting. Full-size clean captures
are separately rendered at1280×800,344×882 and882×344, with DPR1 and a genuine
reduced-motion still. Capture telemetry is in
[screenshots/capture-report.json](screenshots/capture-report.json).

## Visual review and iteration

The final JPEGs were opened and inspected, including both Fold orientations:

- [Desktop](screenshots/cosmic-desktop.jpg): close curved leaves and porous stone,
  recessed pool with the actual reflected planet and plants, separate hanging
  gardens, layered nebula and a ringed planet with a clear terminator.
- [Fold portrait](screenshots/cosmic-fold-portrait.jpg): responsive placement
  preserves close leaves, water, mid-distance silhouettes and the planet within
  the narrow view. This corrected the first portrait's missing foreground and
  severely cropped planet.
- [Fold landscape](screenshots/cosmic-fold-landscape.jpg): tactile foreground remains
  at the edges, the basin stays legible, and distant gardens remain separated.

Initial renders exposed faceted stones, sparse/wiry foliage, noisy planet bands
and nearly circular rings. These were corrected by shared-vertex stone normals,
procedural porous grain, more layered botanical geometry, coherent gas belts,
side lighting, a separate cloud shell and inclined rings. The Opus #066 surface
benchmark directly informed this improvement; #061 and #091 also informed depth,
light hierarchy and reflection review. See REFERENCES.md for actual source/live
review evidence and license boundaries. All scene code/textures remain original.

## Environment and limits

- Stock Playwright browser download returned a195-byte 'Site Unavailable' HTML
  page. A scratch-only npm `@sparticuz/chromium@153.0.0` package supplied Chromium;
  no repository dependency or account permission changed. The binary was
  decompressed without changing archive ownership. Existing SwiftShader flags
  were used; no browser web-security bypass flag was added.
- Earlier test attempts caught validation timing problems: a screenshot during
  the initial fade, a resize assertion before ResizeObserver completed, and a
  too-short disposal timeout on software rendering. The runner now disables HMR,
  waits for completed size/fade states and allows software GPU cleanup time.
  Evidence was moved out of public assets after the PWA2MiB precache limit caught
  an intermediate large screenshot. Shared PWA settings were not changed.
- Document visibility coverage is a **synthetic visibilitychange with overridden
  visibility**, not an actual operating-system background-tab switch.
- These tests do not establish native GPU frame rate, physical Galaxy Fold
  behavior, thermals or battery usage. Detailed botanical geometry and a live
  reflection pass still need hardware profiling during integration.
- The nebula is layered analytic shader scenery, not volumetric raymarching.
  Shadows are initialized and refreshed on resize; tiny foliage sway does not
  recompute leaf shadow maps every frame. Reflections remain live.
- The existing Vercel preview deployment is authentication-protected. The cloud
  browser reached its normal Vercel login screen, so no remote-preview visual
  pass is claimed. No share/bypass token or new permission was created. Actual
  visual verification used the isolated local harness, and Vercel deployment
  status/commit are checked separately.
- The audio proposal is documented only; this worker has no independent sound
  engine or production audio changes. Shared integration and merging are left
  to the designated owner.
