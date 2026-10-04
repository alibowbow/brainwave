# Deep water verification record

This section retains the verified PR56 baseline unchanged as historical evidence. The separate bounded correction and fresh final-source verification are recorded in `FOLLOWUP.md`; new images/results are under `qa/evidence/followup/`. Do not attribute these original 77 effective checks to the follow-up source.

Production scene source: **75a6121620937baef8a03a7bea985c2207e9a3b8**. Baseline main: **14940149cc5c0fccb778b58d4d755a04aea55e53**. Draft PR: https://github.com/alibowbow/brainwave/pull/56 . Branch: `codex/deep-water-worlds`. Integration and merge belong to the separate shared-core Work.

## Static and build gates

- `npm run typecheck`: passed.
- `npm test`: 26 files / 156 tests passed. The group adds 9 meaningful world tests (waterfall2, cave5, sea2), including real geometry/raycast checks, foreground occlusion, daylight aperture clearance, organism non-approach, pause determinism and reflection-target disposal.
- `npm run build`: passed; main application intentionally remains unwired to these new entries.
- `npm run check:bundle`: passed; initial JS402.6KiB/410KiB, CSS99.5KiB/135KiB. This is the preserved main-app budget, not an integration bundle claim.
- Separate QA production build: passed with the three actual scene chunks, shared environment, renderer and harness. Per-file SHA256 and byte counts are in each evidence run.
- Source commit697a1fd CI run37227876899 passed, including the repository's existing scene/focus/seaside/link browser regressions. That run predates the final isolated cave aperture polish; current source checks are separately recorded.

## Actual renderer evidence

`qa/evidence/results.json` is the final audited index. It combines the original complete77-check run (`results-before-aperture.json`) with the focused cave27-check run (`results-after-aperture.json`). The latter replaces the old cave observations; checks are not added together as104 unique checks. `qa/finalize-evidence.mjs` requires exactly77 effective checks, zero errors, all12 PNG hashes matching, and proof that **only `engine/cave.ts` changed in production runtime source** between the two bundles. The earlier cave screenshots are superseded; original waterfall/sea screenshots remain authoritative and keep their own original bundle hashes.

Chromium153.0.8010.0, real WebGL2 via SwiftShader, headless at DPR1. Screenshots are actual scene pixels, not posters. Every world is tested in1280×800 desktop,390×844 narrow portrait,884×1104 Fold-like inner portrait and1104×884 landscape. Those are viewport emulations, not physical Fold hardware.

Each scene's checks cover:

- Real static3D first frame, nonzero parent-filling canvas and geometry; active/pause simulation+render freeze.
- Actual advancing simulation and changed framebuffer pixels. Rendering runs between captures and pauses only for screenshot readback to avoid software-GPU queue contention.
- Pointer input reaching the real scene raycaster and bounded callback; drag turns camera; completed drag and pointer cancellation do not tap; paused input emits nothing.
- Exact same canvas identity in a second fullscreen-style holder and return to primary; three rapid mount/unmount reuse cycles.
- OS reduced-motion and application `.reduce-motion`; synthetic `document.hidden`/visibilitychange stop/resume.
- Last-holder cleanup: original canvas marked disposed **and host engine absent**; later mount creates a new working renderer.
- No JavaScript/shader errors; runtime source remained unchanged during each recorded run.

## Visual review and corrections

Actual desktop and portrait PNGs were inspected, not merely a `ready` flag. The first failed cave shader (duplicate variable name) was fixed. Initial faceted boulders were replaced with smoothed, independently eroded geometry. Detached waterfall outcrops and uniform circular strata were removed; fern/ledge foreground was composed for portrait. Cliff/right-bank winding and shadow bias corrected the visible grid-like shadow acne. Sea's floating right pillars were removed in favour of continuous near cliff and open blue depth; jellyfish touch response rises/decays slowly in place. Cave's repeated formations, thin floating shelf and missing portrait ledge were refined; a local irregular stone aperture rim and exterior sky backing removed a visibly stair-stepped opening.

## Practical limits

- No physical device FPS, thermals, battery or mobile GPU performance claim. Default display-rate RAF, native DPR up to2, no global24fps cap or low-resolution poster view.
- The existing host waits5 seconds before beginning teardown. On this shared CPU/SwiftShader environment the first complete run observed47.0s waterfall,28.4s cave and12.8s sea until teardown confirmation. The final post-aperture cave run observed40.1s. Host/canvas diagnostics prove release; those timings are recorded as software-renderer latency, not a5-second completion promise or target-device performance result. A preliminary20s test timeout was therefore replaced with the same120s browser budget as other renderer checks.
- Visibility was injected in the browser. A real background-tab switch was not tested. Second-holder ownership was tested; native Fullscreen API and the full integrated application were not wired by this worker.
- Audio recommendations/events only; no audio engine or actual sound mix was created or auditioned. Audio integration belongs to the shared owner.
- Water is a visual approximation: planar reflection, analytic four-slot ring response and modest blended absorption; no full refraction/fluid/volumetric physics claim.
- No production deployment or merge was performed by this worker. The PR's automatic Vercel preview still shows the preserved unwired main app; use the owned QA harness or wire entries in integration to view these worlds.

## Screenshot map

| World | Desktop | Narrow portrait | Fold inner | Landscape |
| --- | --- | --- | --- | --- |
| Waterfall | [PNG](qa/evidence/waterfall-desktop.png) | [PNG](qa/evidence/waterfall-portrait.png) | [PNG](qa/evidence/waterfall-fold-inner.png) | [PNG](qa/evidence/waterfall-landscape.png) |
| Cave | [PNG](qa/evidence/cave-desktop.png) | [PNG](qa/evidence/cave-portrait.png) | [PNG](qa/evidence/cave-fold-inner.png) | [PNG](qa/evidence/cave-landscape.png) |
| Deep sea | [PNG](qa/evidence/sea-desktop.png) | [PNG](qa/evidence/sea-portrait.png) | [PNG](qa/evidence/sea-fold-inner.png) | [PNG](qa/evidence/sea-landscape.png) |
