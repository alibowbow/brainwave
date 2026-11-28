# Night Fires verified handoff

Three independent first-person worlds are implemented. The coordinator's visible-chrome input issue is fixed inside this group. Only the two assigned nightFires roots change. Shared core, protected worlds, package files and CI remain untouched. PR #60 stays draft and must not be merged by this worker.

## Latest: 모닥불 밤 rebuilt as the poster's campfire by the sea (2026-11-28)

The home card for `amb:campfire_night` shows `campfire-loop-poster-v2.webp`: a campfire by a violet sea inlet at nightfall. Its world (id `mountain`, `MountainCampfireWorld`, same registry entry and bridge mapping) was a mountain clearing with no water. It is now recomposed after the poster, code only, on the shared HDR pipeline. The lakeside camp (`nature:campfire`) and the deep night are untouched; `scenery.ts` only exports three hearth helpers, and `nightEngine.ts` gains a QA-only clock offset (zero in the app).

| Part | Implementation |
| --- | --- |
| Sky (`coastSky.ts`) | Three-stop violet gradient with a rose afterglow, drifting stratocumulus whose edges catch the afterglow in pink (two-tap self-shadowing in the noise volume), and the first stars: hidden by cloud and by the bright lower sky, with the shared twinkle model (`twinkle` 0.7). The dome is baked into the radiance probe. |
| Water (`coastWater.ts`) | Eight wind-wave trains with deep-water dispersion, each filtered by its own footprint along its direction; drifting calm slicks; capillary ripples near the eye whose lost variance becomes glint roughness. Reflects the drawn sky (clouds included), the hills from a precomputed skyline seen through the same haze, and the pines, spruce and jetty from analytic shapes. A distant cabin's two lights stretch into wavering slope-space glint columns. One analytic shore is shared with the terrain mesh: a quick run-up and slow drain moves the waterline over the pebbles (two unsynchronised trains), with lace foam on the swash, the drain, around rocks and posts; shallow water is premultiplied so the firelit pebbles show through. |
| Land and trees | Low bank, pebble beach (drain-wet film in the ground shader), a cove and a pine point; layered hazy hills and an island of spruce; tall pines with tufted crowns (needle-tuft cards drawn in code) on the left; a spruce stand and a forested shore receding on the right. |
| Fire (`coastHearth.ts`) | Teepee of split wedges (pith at the apex, bark on the back, rings on the split faces via `woodSurface`), sooted and glowing at the base, two burnt chunks in the coal bed, rounded beach stones; the shared ray-marched flame, embers and flicker; soft-shadowed key light. |
| Props (`coastProps.ts`) | Weathered deck on posts out over the water with a rail (`woodSurface`, per-board frames), folding director's chair (`fabricSurface` canvas), stacked firewood with bark and end grain, slatted crate with kindling, hurricane lantern (tarnished brass, glowing globe, warm secondary light with small shadows), chipped enamel mug. |
| Plants (`coastFlora.ts`) | Lavender (silver-green leaves, stems, floret spikes drawn in code) and tussock grass sharing one slow, unsynchronised wind. Portrait moves the lantern, mug, firewood, crate and chair into a narrower semicircle and shows a few extra foreground clumps. |

Evidence (1280×800 and 390×844, DPR 1, SwiftShader with `hdr=force`): [desktop BEFORE/AFTER](qa/evidence/hdr-upgrade/mountain-compare-desktop.jpg) and [portrait](qa/evidence/hdr-upgrade/mountain-compare-portrait.jpg) keep the original pre-HDR BEFORE on the left; [poster beside the final desktop frame](qa/evidence/hdr-upgrade/mountain-vs-poster.jpg); [animated frame at t = 4.4 s](qa/evidence/hdr-upgrade/mountain-active.jpg).

Motion, share of pixels changing by more than 6/255 between the paused t = 0 frame and an animated frame at t = 4.4 s (`NIGHT_QA_QUERY=t=3.2 NIGHT_QA_ACTIVE=24`): mid-distance water 67 %, cove shore and swash 57 %, flame 29 %, lavender 28 %, sky 7 % (cloud drift, stars), ground 2 %. An earlier pair of animated frames 3.2 s apart (t = 1.3 s and 4.5 s) gave 72 % / 58 % / 32 % / 53 % for water, shore, flame and lavender.

Triangles per frame (renderer counter over the whole HDR frame): 0.84 M desktop / 0.83 M portrait on a layout frame that also re-renders every shadow map; 0.35 M on ordinary animated frames (shadow maps are static). The previous mountain clearing counted 1.87 M on its layout frame. These are SwiftShader counts only: no phone GPU, frame rate, thermal or battery measurement was made.

Reproduce: `NIGHT_QA_PORT=4323 NIGHT_QA_WORLDS=mountain NIGHT_QA_OUTPUT=/tmp/campfire node components/immersiveWorlds/nightFires/qa/capture-quality.mjs`.

## Deep night and lakeside rebuild (2026-11-28)

Both worlds were reworked in several critique, fix and re-capture rounds against a PS4/PS5 night scene. The campfire-by-the-sea world (`mountain`, `coast*.ts`) is untouched; the shared `atmosphere.ts` and `landscape.ts` options added here default to the previous behaviour.

| World | What changed |
| --- | --- |
| Deep night (`amb:deep_night`) | The foreground is now a lookout: laid paving behind a curved rubble parapet (three rough courses proud of a lime-mortar core, chipped flat coping with moss and weeds) and a timber seat on stone piers where the lantern stands. The lantern is the warm key, with soft point shadows of its own frame (re-rendered only on layout changes) and a bounce light, so the stone and wood read as material. The first-person armrests and the rock shelf are gone. A clumped mixed forest (`forest.ts`: spruce, fir, old pine, young trees, snags in groves and clearings, per-tree tint and lean) replaces the comb rows. Two needle-card spruces on rock ledges below the parapet frame the view and sway slowly. The moon halo, sky glow and haze forward scattering were cut so the sky stays dark and the twinkling stars read; the valley mist drifts visibly and a second, higher mist band lies between the far ridges. Village lights sit in small clusters on the lower slopes. |
| Lakeside (`nature:campfire`) | The lake shader was rewritten: six small wind-wave trains plus capillary ripples, filtered by pixel footprint, with the unresolved slope variance driving Beckmann glints, so the crescent (moved over the open water) lays a wavering glitter path and a far cabin's lit window a warm column; calm slicks drift across; firelight wavers over the clear shallows by the beach. The skyline the water reflects now includes the crowns on the headlands. The tent uses the shared plain weave with felled seams, hem, ridge tape and grime; its ridge sags, its panels billow between pegged corners and mid-eave pullouts with stress folds, and the lamp inside glows through the cloth (less through doubled seams); guy lines run to wooden pegs. The camp floor carries fallen needles (new `needles` ground option), grass tufts, half-buried stones, twigs and cones, a chopping stump and roots. Shore sedge, a beached clinker rowboat with its painter rope, mixed conifers on the headlands, low haze and a drifting mist layer between them, and thin cloud streaks lit by the afterglow complete it. |

Budget (SwiftShader harness, renderer counters for a whole HDR frame): steady frames deep 0.50M triangles in 80 draw calls (was 0.65M in 66), lakeside 0.51M in 195 (was 0.83M in 167); a layout-change frame that also re-renders the shadow maps deep 0.90M, lakeside 0.98M (was 0.80M and 1.76M). Shadow maps still render only on layout changes; the small shingle and camp stones no longer cast. The compare sheets in `qa/evidence/hdr-upgrade/` keep the original BEFORE panels and show this rebuild as AFTER (t = 20 s). New shader cost: the needle litter (two 3×3 cell searches on the ground), the lake's wave and glint terms, and the cloud dome (two noise fetches per sky pixel). No new full-screen pass.

## HDR night upgrade (2026-11-27)

Goal: lift the three worlds from "PS2" toward console-era night rendering with code only (no external models, textures or HDRIs). The engine now renders through the shared HDR pipeline (half-float MSAA, SSAO, half-resolution volume pass, bloom, ACES grade); without float targets, or with `?post=off`, it keeps the direct renderer with simple fog.

| World | What changed |
| --- | --- |
| Mountain (`amb:campfire_night`) | Ray-marched HDR flame with log occlusion, GPU embers, glowing coals and alligator-charred logs, sooted faceted ring stones; flickering shadowed fire key plus a low bounce light; crescent-moon key, Milky Way with dust rift and star grain, power-law star field; eroded ranges with forest/rock/snow shading and aerial haze, valley mist, smoke plume, heat shimmer over ridges and stars; card-based spruce, world-space ground, twigs and litter. |
| Deep night (`amb:deep_night`) | Gibbous moon over four eroded ridge layers with forward-scattering haze and valley mist; HDR house windows; dry-stone masonry wall, laid paving, world-space wood bench; lantern as warm local key with an air glow. |
| Lakeside (`nature:campfire`) | Violet afterglow and setting crescent; lake shader reflecting the same sky plus a precomputed skyline of eroded, forested headlands, with moon glints; tent canvas glowing from inside; the same fire system; merged faceted shingle; fabric and wood shaders; leaf-card birches. |

BEFORE/AFTER (1280×800 and 390×844, deviceScaleFactor 1, SwiftShader, paused time zero): [mountain](qa/evidence/hdr-upgrade/mountain-compare-desktop.jpg) / [portrait](qa/evidence/hdr-upgrade/mountain-compare-portrait.jpg), [deep](qa/evidence/hdr-upgrade/deep-compare-desktop.jpg) / [portrait](qa/evidence/hdr-upgrade/deep-compare-portrait.jpg), [lakeside](qa/evidence/hdr-upgrade/lakeside-compare-desktop.jpg) / [portrait](qa/evidence/hdr-upgrade/lakeside-compare-portrait.jpg). Animated frames: `qa/evidence/hdr-upgrade/*-active.jpg`.

Reproduce: `NIGHT_QA_OUTPUT=/tmp/night node components/immersiveWorlds/nightFires/qa/capture-quality.mjs` (builds the isolated harness, serves it on 127.0.0.1:4312, fails on any page/shader error). `NIGHT_QA_ACTIVE=<frames>` captures after animation, `NIGHT_QA_QUERY=post=off` the direct path. SwiftShader grades appearance only: no phone GPU, FPS, thermal or battery measurement was made. Shadow maps re-render only on layout changes; the volume pass marches 34 steps at half resolution.

## Material refinement (earlier)

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
