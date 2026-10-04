# Night Fires verified handoff

Three independent first-person worlds are implemented. The coordinator's visible-chrome input issue is fixed inside this group. Only the two assigned nightFires roots change. Shared core, protected worlds, package files and CI remain untouched. PR #60 stays draft and must not be merged by this worker.

## Latest: limited material refinement

Remote PR head `813b4ef7f468366e330893f13c27962249f1c3b5` was read before this follow-up. Final material source is `6623c083888e2baece9da11436fe35694a7fcebf`. This revision changes fire-only log/coal surfaces and geometry in `scenery.ts`, the Lakeside water fragment shader, and an initial paused-portrait capture in the QA runner. Independent source comparison confirms that DeepNight, guarded chrome input, holder ownership, scene cameras/lights, flame/spark animation and audio remain unchanged. The slower, broader water waves are intentional shader changes; the engine update loop is unchanged.

[MATERIAL_REFINEMENT.md](MATERIAL_REFINEMENT.md) records the actual visual iterations, before/after comparison, original PNG hashes and exact scope. The latest three-world browser run is [material-refinement/results.json](qa/evidence/material-refinement/results.json). Earlier images and reports below are retained as historical evidence, not the latest Mountain/Lakeside appearance.

| Latest validation | Result |
| --- | --- |
| Full frozen-source real-WebGL run | PASS; 67 checks (Mountain 21 / DeepNight 23 / Lakeside 23), 24 original PNGs |
| Typecheck and unit tests | PASS; 149 tests in 24 files |
| Main build and bundle budget | PASS; initial JS 402.6 KiB / 410, CSS 99.5 KiB / 135 |
| Separate production harness build | PASS; main combined JS 836.07 kB raw / 233.11 kB gzip |
| CI associated with material source | [Run 299 PASS](https://github.com/alibowbow/brainwave/actions/runs/37233051835) |

| Latest manifest | SHA256 |
| --- | --- |
| Source tree | `2957a9ed91177425953654a2fe0dc68ee554e60b7ffb6eb77a792dbcd9fbd371` |
| Complete isolated bundle tree | `25d34563c4211fbcee3a1e9ab417482f9d8cabfb7d9f9322d1be3736cd66ba0c` |
| Main isolated JS `index-BMIBpFoN.js` | `c91b8c23b685cd2b2aa9bf4eec2a3f666c7179cd4f46098450b8a4d5331469a3` |

The complete report includes every source/bundle file hash, loaded scripts, original PNG hashes and actual input/lifecycle measurements. The evidence commit after the tested source changes only documentation and captures. Initial desktop and portrait now share untouched simulation time zero, separately from the existing post-interaction portrait. The final DeepNight time-zero views are byte-identical to fresh same-view captures from the previously approved bundle; the approved bench, ridges, house lights and unobstructed lantern are preserved.

All 24 final PNGs were matched to their report SHA256; the six untouched views also match the visually reviewed material previews. Source and build fingerprints stayed unchanged throughout the complete run. All three worlds report zero browser/shader errors and final liveEngines 0, with two engines created and two disposed per lifecycle suite. Guarded chrome drag/tap, native/nested control exclusions, pointercancel/blur, covered and distinct holder transitions, reduced motion/static3D, actual moving pixels and delayed disposal all passed again. The two static lantern checks changed 79,113 / 161,222 rendered pixels without advancing simulation time. Report SHA256: `d7b00f9e9e77d2f1e9bd1266ac5b232ccc90877944e047f7a36ea248172ed744`.

| Latest actual view | Desktop 1440×900 | Initial portrait 390×844 | Chrome visible |
| --- | --- | --- | --- |
| Mountain | [PNG](qa/evidence/material-refinement/mountain-desktop.png) | [PNG](qa/evidence/material-refinement/mountain-portrait-initial.png) | [PNG](qa/evidence/material-refinement/mountain-chrome-overlay.png) |
| DeepNight, preserved | [PNG](qa/evidence/material-refinement/deep-desktop.png) | [PNG](qa/evidence/material-refinement/deep-portrait-initial.png) | [PNG](qa/evidence/material-refinement/deep-chrome-overlay.png) |
| Lakeside | [PNG](qa/evidence/material-refinement/lakeside-desktop.png) | [PNG](qa/evidence/material-refinement/lakeside-portrait-initial.png) | [PNG](qa/evidence/material-refinement/lakeside-chrome-overlay.png) |

Reproduce this final material run without overwriting the earlier evidence:

```sh
npx vite build --config components/immersiveWorlds/nightFires/qa/vite.config.ts
SCENE_SCREENSHOT_DIR=components/immersiveWorlds/nightFires/qa/evidence/material-refinement \
SCENE_BROWSER_PATH=/path/to/chromium \
node components/immersiveWorlds/nightFires/qa/verify-night-fires.mjs --serve
```

## Historical verified revisions

| Scope | Tested source commit | Result | Original report |
| --- | --- | --- | --- |
| All three worlds, including visible chrome and holder transitions | `7958644ffbca0951ec9d9e81fa3a3f45b82a7e0b` | 64 checks passed; 21 original PNGs | [Complete run](qa/evidence/results.json) |
| Deep night after the final portrait composition correction | `9fa421b6856756fb47dfb190d5303d2b565f0f9b` | 22 checks passed; 8 original PNGs | [Deep repeat](qa/evidence/deep-portrait-fix/results.json) |

Both runs report unchanged source/build fingerprints throughout verification, no browser/shader errors, and zero live engines after final unmount. Every recorded PNG was checked against its SHA256. The later runtime change is limited to DeepNight's portrait camera and lamp/shelf/bounce placement. Mountain, Lakeside, shared NightWorld input, engine, materials and fixture are byte-identical between those revisions; the other changed file adds explicit single-world selection to the QA runner. The final evidence-only commit does not change runtime source.

The original full-run deep portrait is retained as before-fix evidence: visual inspection found its lamp hidden behind an armrest despite passing functional checks. Use the **Deep repeat** images below for the final composition. The new portrait brings the camera forward and places the lamp within reach; widening explicitly restores the desktop/Fold placement. The repeated desktop PNG is byte-identical to the original desktop PNG.

| Manifest | Source tree SHA256 | Isolated bundle tree SHA256 |
| --- | --- | --- |
| Complete run | `13c62dc825c33bb6ceec148f8824dd97c206e84af5928c7f38c28fa4b8dbdd22` | `11c7d889bfb06f0db3aade74e15c0b515b1eedd1575828368582f752d3d5dfd0` |
| Deep repeat | `022af5676447dd72428c6aa5b1709a0cd3cc963de35c92fd95afa3e6c8b2d0c4` | `4524526bcfd7ef45eaa6af4da15022a781c3b141d32c15f393c6906b68cac81e` |

The JSON reports also contain individual source/bundle file hashes, loaded script URLs, PNG hashes, native hit-test surfaces, camera projection samples, frame counts, elapsed simulation time, pixel differences and lifecycle diagnostics. Complete-run JS: `index-BKtx9edC.js`; deep-repeat JS: `index-BYa97GcX.js`.

## Historical rendered views

| World | Desktop 1440×900 | Narrow portrait 390×844 | Chrome visible |
| --- | --- | --- | --- |
| Mountain campfire | [PNG](qa/evidence/mountain-desktop.png) | [PNG](qa/evidence/mountain-portrait.png) | [PNG](qa/evidence/mountain-chrome-overlay.png) |
| Deep night, final | [PNG](qa/evidence/deep-portrait-fix/deep-desktop.png) | [PNG](qa/evidence/deep-portrait-fix/deep-portrait.png) | [PNG](qa/evidence/deep-portrait-fix/deep-chrome-overlay.png) |
| Lakeside camp | [PNG](qa/evidence/lakeside-desktop.png) | [PNG](qa/evidence/lakeside-portrait.png) | [PNG](qa/evidence/lakeside-chrome-overlay.png) |

Additional inspected views: [Deep Fold-inner viewport, 900×720](qa/evidence/deep-portrait-fix/deep-fold-inner-viewport.png), [Lakeside landscape, 900×480](qa/evidence/lakeside-landscape-viewport.png). All desktop and portrait images were opened and visually reviewed. These are browser renders of the real geometry, lights, shaders and materials. The chrome images show deliberately simple QA controls, not a claim of final app UI integration.

Practical visual corrections included natural ground scale/litter, varied flattened fire-ring stones, charred log grain, restrained local fire lighting, deeper pine silhouettes, worn timber and chipped stone paving, a violet sky/water palette, softened water reflection bands, larger portrait foreground objects and the final unobstructed deep-night lantern. No whole-scene image backdrop, placeholder proxy render or blanket frame-rate cap is used.

## Historical validation and shared test coverage

- `npm run typecheck`: passed, including after the final portrait change.
- `npm test`: 149 tests in 24 files passed, including two new live/static lantern regressions.
- `npm run build` and `npm run check:bundle`: passed. Existing initial JS is 402.6 KiB / 410 KiB and CSS 99.5 KiB / 135 KiB. These are the unintegrated main-app budgets.
- Separate production harness build: passed; final combined React/Three/three-world JS is 832.03 kB raw, 231.43 kB gzip. The harness build is ignored and is not a production asset.
- Repository CI passed on [complete-run source](https://github.com/alibowbow/brainwave/actions/runs/37229672100) and [final runtime source](https://github.com/alibowbow/brainwave/actions/runs/37230713138).
- Actual browser: Chromium 153.0.8010.0, WebGL2 through ANGLE Vulkan SwiftShader, screenshot device scale factor 1.

The browser suites check a real first frame, paused-frame retention, actual moving pixels, active/pause/reduced-motion/static3D, synthetic hidden-state suspension, bounded raycast interactions, keyboard actions, drag not tap, pointer cancellation, visible chrome, duplicate-handler prevention, context/canvas reuse, three rapid mount cycles, delayed disposal after five seconds, clean recreation and final resource release. Deep and Lakeside also verify that a reduced-motion lamp action changes rendered pixels without advancing simulation time.

Visible chrome tests use native mouse input on an exact full-cover sibling `data-scene-drag` target. `elementFromPoint` must identify the intended surface. Held drag must move the same 3D target's camera projection by more than one pixel while remaining bounded; a tap must emit exactly one event. Native/nested buttons, a range input, link, ARIA button and chrome text cannot begin scene gestures; native controls remain usable. Synthetic pointercancel and window blur cannot become taps. Same-surface covered holders and distinct fullscreen-style holders share one canvas/context and preserve exactly-once input after returning.

During QA, the primary fixture needed `isolation:isolate`: actual Player has its own stacking context beneath ImmersiveMode, while the original fixture incorrectly allowed lower chrome to cover the upper holder. The correction preserves native hit-testing and all input assertions. A lantern comparison also now waits for verified real RAF advancement before reducing motion, preventing a three-step brightness cycle from returning to its initial value before the software renderer drew it. Pixel thresholds were not relaxed.

Reproduce the full suite after building:

```sh
npx vite build --config components/immersiveWorlds/nightFires/qa/vite.config.ts
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/nightFires/qa/verify-night-fires.mjs --serve
```

Reproduce the complete deep-only follow-up without overwriting the full-run evidence:

```sh
SCENE_SCREENSHOT_DIR=components/immersiveWorlds/nightFires/qa/evidence/deep-portrait-fix \
SCENE_BROWSER_PATH=/path/to/chromium \
node components/immersiveWorlds/nightFires/qa/verify-night-fires.mjs --serve --world=deep
```

## Integration boundary

[INTEGRATION.md](INTEGRATION.md) records exact canonical entries, `active:boolean` as the only required prop, optional static3D/events, one-canvas holder reuse and quiet audio recommendations. [REFERENCES.md](REFERENCES.md) records independently adopted/rejected techniques from both actual JEV galleries; code and materials are original.

The integration owner must wire the shared canonical routes and include these worlds in the outer live-scene/touch-action classification, preserving the details-open `pan-y` branch. This worker cannot change sibling chrome touch-action from scene CSS and has not modified shared core. Actual final Player/fullscreen UI, audio integration, physical Fold behavior, hardware-GPU FPS, battery/thermals and real browser-tab switching remain outside these isolated results. The hidden-state test is synthetic; Fold and landscape checks are viewport checks. Water reflects a procedural sky/ridge model rather than every near object through a planar mirror.
