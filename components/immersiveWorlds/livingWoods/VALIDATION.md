# Living Woods implementation and validation

Four independently built first-person worlds are ready for the separate integration Work to wire into the shared registry. The branch is `codex/living-woods-four-worlds`; [draft PR #54](https://github.com/alibowbow/brainwave/pull/54) must remain unmerged by this worker. The fetched main base was `14940149cc5c0fccb778b58d4d755a04aea55e53`.

Only `components/immersiveWorlds/livingWoods/**` is changed. Assets are original procedural geometry/materials; no external textures or models are required. Shared code, audio, package/CI files and the protected scenes are unchanged. Exact entry paths, optional event fields, lifetime policy and existing audio-layer recommendations are in [INTEGRATION.md](INTEGRATION.md). Both JEV collections, concrete adopted/rejected techniques and rights restrictions are recorded in [REFERENCE_REVIEW.md](REFERENCE_REVIEW.md).

## Exact rendering provenance

- Rendered scene and harness revision: `e29bcf6bb17c5852178a3060584195121543c109`.
- Original source-inventory SHA-256: `446d3952662a8e81e86ad7d594e528e04f9c45a81aba4441938f3978b3648cff`.
- Production-bundle inventory SHA-256: `6ae6a8f3f184102e8ac49bfa2595480c77bc85cb3cdf9765bbc66be49947e9d0`.
- Successful verification runner SHA-256: `d3b22a063fbb3bc208a5c4441b667293ddfdb2f5afa6e77d71c25f683311cecb`.

The final evidence commit adds documentation, PNGs/JSON and a QA-runner-only readback adjustment. It does not change the rendered production scene code or harness. The original production bundle was built fresh, then reused with its hash checked exactly after removing redundant optional readbacks that stalled software Chromium. All rendered TS/TSX/CSS/HTML files were also compared with the original inventory. The source inventory includes the earlier runner and documentation; the separate runner hash identifies the code that actually completed verification.

## Actual pixels

Every image below is an actual WebGL canvas PNG, rendered at the listed pixel dimensions, not a poster or concept image. The desktop and portrait files of every world were directly inspected; composition and material fixes were made before this frozen capture. PNG hashes and per-check metrics are in [qa/evidence/report.json](qa/evidence/report.json).

| World / exact entry | Desktop 1280×800 | Portrait 390×844 | Fold-like 882×768 |
|---|---|---|---|
| `country_morning` / `MorningPorchWorld.tsx` | [PNG](qa/evidence/morning-desktop.png) | [PNG](qa/evidence/morning-portrait.png) | [PNG](qa/evidence/morning-fold-inner-viewport.png) |
| `amb:rainy_forest` / `RainyForestWorld.tsx` | [PNG](qa/evidence/rainy-desktop.png) | [PNG](qa/evidence/rainy-portrait.png) | [PNG](qa/evidence/rainy-fold-inner-viewport.png) |
| `amb:deep_forest` / `AncientForestWorld.tsx` | [PNG](qa/evidence/ancient-desktop.png) | [PNG](qa/evidence/ancient-portrait.png) | [PNG](qa/evidence/ancient-fold-inner-viewport.png) |
| `nature:bamboo_grove` / `BambooWorld.tsx` | [PNG](qa/evidence/bamboo-desktop.png) | [PNG](qa/evidence/bamboo-portrait.png) | [PNG](qa/evidence/bamboo-fold-inner-viewport.png) |

The worlds have different geometry, compositions and materials: a porch with tea and garden; wet broad-leaf shelter and ferns; an old-growth trunk with buttress roots and moss; and segmented bamboo with a reflective stream. They are not recolored copies of one landscape.

## Checks

The full browser runner exited 0. `qa/evidence/report.json` records `passed: true` for all four worlds.

| World | Browser checks | JavaScript/WebGL errors | PNGs |
|---|---:|---:|---:|
| `morning` | 17 passed | 0 | 3 |
| `rainy` | 17 passed | 0 | 3 |
| `ancient` | 17 passed | 0 | 3 |
| `bamboo` | 17 passed | 0 | 3 |


Each full world run checks the cold inactive first frame; visible pixel changes during actual animation; inactive, OS reduced-motion, app reduced-motion class, static3D and synthetic hidden pauses; real desktop and portrait raycast taps; drag-not-tap and pointer cancellation; identical canvas/engine through a second holder; three quick remounts; and delayed disposal followed by a fresh inactive engine with matching resource counts. Pause intervals require unchanged frame and simulation-time counters. Initial cold and desktop PNGs are also compared. Optional interaction PNGs are not retained: interactions are evidenced by pointer hits, bounded events and subsequent rendered frames.

| Repository gate | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm test -- --reporter=dot` | 149 passed, 1 skipped; 24 files passed, 1 skipped |
| `npm run build` | Pass |
| `npm run check:bundle` | Pass; initial JS 402.6 KiB / 410 KiB, CSS 99.5 KiB / 135 KiB |

The skipped Vitest wrapper is opt-in because the current CI installs Chromium after unit tests. The browser contract is run explicitly through `qa/run.mjs`. The existing app build/budget covers the existing shared app, not a claim that these isolated entries are already integrated. [build-results.json](qa/evidence/build-results.json) records the gate results and scope audit.

## What changed after looking at the first renders

- Morning: corrected multiply-darkened foliage, sky output, cloth/table overlap, tree branching and foreground shrub scale; lowered the portrait aim so the tea stays meaningful. [Before](qa/evidence/before-morning.png) and [final](qa/evidence/morning-desktop.png) have recorded provenance.
- Rainy: fixed trunk surface winding and leaf shading, supported the canopy with branches, made wet leaf veins/undersides readable, refined soil/puddles/ferns, and kept attached beads moving with the leaf before release. Distant leaf tessellation was reduced while retaining near detail.
- Ancient: curved the near leaf surfaces, rounded fern leaflets, added moss crust and small curved shoots, varied trunks/understory, and reframed portrait around the old trunk, roots and reachable sprig.
- Bamboo: fixed an initial leaf shader define, downward-facing ground/stream-bed surfaces and a texture byte overflow; refined stones, culm nodes, leaf sprays and the floor. The stream uses a real planar reflection with animated surface detail.

The visual result is procedural real-time 3D. Remaining simplifications are visible in the distant vegetation, regularity of some grove structure and bright fern lighting; these PNGs should be judged directly rather than described as photographic realism. No empty scene, broken shader, missing hero surface or offscreen portrait interaction target remained in the reviewed final captures.

## Reproduction and limits

See [qa/README.md](qa/README.md) for the fresh-build command and optional diagnostic flags. No additional browser download, new permission, paid service or deployment bypass token was used.

- Chromium 153.0.8010.0 with SwiftShader, device scale factor 1. Native image sizes are unchanged. Repeated motion/lifetime checks use 640×400; actual portrait taps use 390×844. Production DPR remains capped at 2 with no blanket FPS cap.
- Capture uses a QA-only synchronous `renderFrame(0)` plus `canvas.toDataURL()`. These are real scene pixels, not browser-compositor or fullscreen UI screenshots. Both standard and single-process headless browser diagnostics reproduced a post-motion compositor timeout; historical failures are retained and distinguished in [the evidence index](qa/evidence/README.md).
- `document.hidden`/`visibilityState` and the visibility event were overridden for the hidden check. This is synthetic hidden-state testing, not real tab switching. Pointer cancellation is also a synthetic event sequence; raycast taps and drag use actual browser pointer input.
- Same-scene second-holder reuse proves one engine and the identical canvas through the test overlay. Shared app fullscreen routing and persistence remain with the integration owner.
- No physical phone/Fold, device FPS, thermal, audio-mix, or long-duration production-session claim is made. Resource counters plus explicit disposal/remount checks are evidence of cleanup behavior, not a browser GPU-memory profiler.

The integration owner can import the four default entries using only `active: boolean`, connect optional bounded interaction events to the existing audio engine, and perform its shared application and real-device checks. This worker does not merge the PR.
