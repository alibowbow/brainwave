# PR #60: bounded campfire and water material refinement

This follow-up starts from remote PR head `813b4ef7f468366e330893f13c27962249f1c3b5`. The approved DeepNight portrait correction is preserved. Tested material source: `6623c083888e2baece9da11436fe35694a7fcebf`. The later evidence commit contains only documentation and original browser captures.

## Scope and visual decisions

Only two runtime files changed: `scenery.ts` inside the fire helpers, and the water fragment shader in `lakesideScene.ts`. The QA runner additionally records an untouched, paused time-zero portrait before interactions, then restores the desktop view. Existing tests and the later post-interaction portrait remain in place.

The five burning logs retain their positions, rotations and overall scale. Their cut faces now have recessed, uneven geometry, radial splits, growth grain and mottled gray ash. Separate albedo and relief maps let the existing small local fire light reveal those surfaces; multiplying a dark map by a second dark material tint had crushed the original ends. The first refinement looked like bright regular bark tiles in real renders, so it was rejected. The final bark uses darker, irregular longitudinal fissures with short, interrupted cross cracks. No new light, exposure increase or bloom was added. Existing local light/shadow placement and contact remain intact.

The original 31 coals keep their positions but have dark outer shells and patchy fissure emission instead of uniformly glowing orange surfaces. Low, overlapping cooled fragments add depth between them in one merged mesh. Flame geometry, spark count, random sequence, timing, stoke behavior and calm light modulation remain unchanged. Audio is untouched.

Lakeside's reflected ridges previously broke into bright repeating bands because steep, repeated normal slopes crossed narrow reflected-silhouette edges, with a separate high-frequency highlight mask. The final fragment shader uses gently warped broader waves, a world-pixel footprint to filter unresolved detail, softer reflected ridge transitions, and restrained moon/fire reflection contrast. An initially over-smoothed render was rejected; the final version restores visible broad, shallow ripples. The water mesh, vertex displacement, spatial extent, camera, objects and lights are unchanged. It remains animated real 3D water reflecting the existing procedural sky/ridge model. No image plane, planar-mirror claim, toon shader or scene redesign was introduced.

## Same-view image comparison

All images below are original PNGs from Chromium's actual WebGL canvas, at device scale factor 1. Both before and after use paused simulation time zero and the same viewport. The baseline was rendered from the previously approved bundle; its complete bundle manifest is in [before/capture.json](qa/evidence/material-refinement/before/capture.json). The final captures and complete regression details are in [results.json](qa/evidence/material-refinement/results.json).

| World / viewport | Before, remote head `813b4ef` | After, source `6623c08` |
| --- | --- | --- |
| Mountain desktop 1440×900 | [PNG](qa/evidence/material-refinement/before/mountain-desktop.png) | [PNG](qa/evidence/material-refinement/mountain-desktop.png) |
| Mountain portrait 390×844 | [PNG](qa/evidence/material-refinement/before/mountain-portrait.png) | [PNG](qa/evidence/material-refinement/mountain-portrait-initial.png) |
| Lakeside desktop 1440×900 | [PNG](qa/evidence/material-refinement/before/lakeside-desktop.png) | [PNG](qa/evidence/material-refinement/lakeside-desktop.png) |
| Lakeside portrait 390×844 | [PNG](qa/evidence/material-refinement/before/lakeside-portrait.png) | [PNG](qa/evidence/material-refinement/lakeside-portrait-initial.png) |
| DeepNight desktop control | [PNG](qa/evidence/material-refinement/before/deep-desktop.png) | [PNG](qa/evidence/material-refinement/deep-desktop.png) |
| DeepNight portrait control | [PNG](qa/evidence/material-refinement/before/deep-portrait.png) | [PNG](qa/evidence/material-refinement/deep-portrait-initial.png) |

The final DeepNight time-zero desktop and portrait are byte-identical to the approved baseline captures. The bench viewpoint, overlapping ridges, distant house lights and entire lantern are therefore preserved at both exact sampled views, in addition to unchanged scene source. Later post-interaction images can differ because the test has deliberately advanced time and changed lamp brightness.

| Original final PNG | SHA256 |
| --- | --- |
| `mountain-desktop.png` | `4916159a2c6cbf7a40dd5a31069e33004b045822dfc5a68be381804564c6c86a` |
| `mountain-portrait-initial.png` | `d06c271c130f27e95f29a023907ba70a4b0aef0b52a46c09f29c2f4860ce8488` |
| `lakeside-desktop.png` | `3c15e1c40de08bcbadf24b37310375caa8ba50b126bca734ae0e4c8ca6481645` |
| `lakeside-portrait-initial.png` | `3e0a653ab934b1f5fff04c101ac9205e9f7d11ec40cd7d39e0353039b7e1bca9` |
| `deep-desktop.png` | `969403ba2d208e0c847b2b1dcc32d82c2839b82d3c43ec7a04f03089390706c9` |
| `deep-portrait-initial.png` | `2ef99242bbdf76fe78e107fb3dbac8144a0f1f68a14b8a0e0a043e4ebc1b358b` |

The lake-only desktop sample `[580,437,770,530]` has a mean absolute vertical luminance difference of 5.030 before and 1.628 after (0–255 RGB-derived luminance). This local measure describes the reduced fine contrast in that sample, not a general visual-quality score. Broader waves remain visible in the original PNG; no sharpening, color grading or screenshot editing is used. [comparison.json](qa/evidence/material-refinement/comparison.json) records the sample bounds and exact before/after hashes.

## Reproduction and integration boundary

```sh
npx vite build --config components/immersiveWorlds/nightFires/qa/vite.config.ts
SCENE_SCREENSHOT_DIR=components/immersiveWorlds/nightFires/qa/evidence/material-refinement \
SCENE_BROWSER_PATH=/path/to/chromium \
node components/immersiveWorlds/nightFires/qa/verify-night-fires.mjs --serve
```

The tested main isolated JS is `assets/index-BMIBpFoN.js`, SHA256 `c91b8c23b685cd2b2aa9bf4eec2a3f666c7179cd4f46098450b8a4d5331469a3`. The complete isolated bundle tree SHA256 is `25d34563c4211fbcee3a1e9ab417482f9d8cabfb7d9f9322d1be3736cd66ba0c`. These are build-content hashes, distinct from Git commit identifiers; individual source and all bundle file hashes are recorded by the regression report.

The guarded chrome input, holder ownership, drag/tap distinction and cancel/blur behavior are exercised again by the complete three-world suite. See [QA.md](QA.md) for results and limits. Runtime contracts remain in [INTEGRATION.md](INTEGRATION.md). Changes stay within the two assigned nightFires roots; shared core, protected scenes and audio engine are unchanged. PR #60 remains draft and is not merged. Final integrated app, physical-device performance and audio integration remain the coordinator's work.
