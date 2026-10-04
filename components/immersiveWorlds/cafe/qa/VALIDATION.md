> Historical visual baseline at 215c50ff / 8b9383b8. Its source-unbound lifecycle JSON has been removed. The compatibility correction will publish newly executed source-bound reports for both target policies; this historical report is not evidence for the new code.

# Café pilot verification — 2026-10-04 visual revision

## Exact code and images

The four PNGs in `qa/screenshots/` render **code commit `215c50ff7bafd7e52a1593022a75a7a032cc3c4c`**. They replace the images reviewed at `c0de2c42bd803545cc1675587eda6ffc84aef9aa`. The later evidence commit changes only this report, PNGs, results and manifest; renderer source and compiled code remain identical.

Compiled pilot: `cafe-pilot-B1N9rsFn.mjs`, 820,441 bytes (approximately 226.70 kB gzip).
SHA-256: `6d64f3cf2b3771625edeeba4583dbeba8fa2c65a85dbd99351d7bd6172f2db3c`.
`screenshots/manifest.json` records the code SHA and each PNG's byte count and SHA-256.

| PNG | Native viewport |
| --- | --- |
| desktop.png | 1280 × 850 |
| fold-portrait.png | 412 × 915 |
| fold-inner-portrait.png | 673 × 841 |
| fold-landscape.png | 915 × 412 |

All images are actual WebGL2 framebuffer captures from the **compiled** review page, Chromium 153 / SwiftShader, DPR 1. Initial simulation is paused for repeatable stills; the suite then resumes and exercises real moving frames. No image replacement, compositor edits, painting filter or low-resolution rendering. The English QA caption accommodates the bare browser's fonts; public card identity remains `amb:focus_cafe`, 카페 집중, 40 minutes.

## Response to the four visual findings

1. **Quiet occupants:** move the two guests farther back, reduce scale and contrast, use different clothing/hair silhouettes, obscure them with plants/tables. A small side silhouette remains visible in desktop; landscape reveals the second partly behind a plant. Narrow portrait deliberately prioritizes the near window seat rather than forcing distant guests into view.
2. **Seated framing:** closer 43–50° aspect-dependent camera, responsive cup/saucer/steam/lamp positions, portrait aim toward the street. Portrait no longer dedicates large areas to ceiling and bare floor. Desktop retains the café room to the right.
3. **Street and shelf detail:** six receding addresses with varied façades, bays, curtains, blinds, unlit rooms, shop fronts and awnings; soft lamp halos and irregular converging wet-paving light strips. Asymmetrical shelf still life uses pitchers, grouped cups, jars, bags/books, muted glazing and gaps. Corrected the back wall protruding beyond the café envelope into the outside view.
4. **Material/light depth:** muted rough oak with finer grain/pores, subdued woven linen, smoother fine-speckle ceramic, lower ambient fill, local warm spotlights, darker floor and soft contact occlusion. Corrected tabletop item contact heights and cloth surface overlap. Real planar indoor reflections remain visible.

All four final images were opened and inspected after these fixes. These are implementation/inspection results, **not user approval**. PR #50 remains draft and is not merged.

## Executed checks

- Starting remote main: `1bb79ac572e8568676881bbc7b4404f1bac443e8`. No AGENTS.md or .agents/skills in checkout; README verification instructions followed.
- `npm run typecheck`: pass.
- `npm test`: **23 files, 147 tests passed**.
- `npm run build` and `npm run check:bundle`: pass; initial JS 402.6 KiB / 410 KiB, CSS 99.5 KiB / 135 KiB. Shared app entry remains unchanged. Existing large-chunk warning.
- `node components/immersiveWorlds/cafe/qa/build.mjs`: pass; final compiled pilot above. The optional .mjs renderer is excluded from the existing PWA .js precache; main build has 44 precache entries / 844.09 KiB.
- `qa/verify.mjs` against that compiled pilot: **23 checks passed, zero runtime/shader errors**. Machine-readable result: `screenshots/results.json`.

The browser checks cover real WebGL geometry (>30,000 rendered triangles), four native viewports, pause/resume, changed rain/steam pixels, drag and eased release, cup/lamp/window pointer callbacks, ignored paused taps, OS/app reduced motion, injected hidden/visible signals, same-canvas fullscreen-holder transfer, delayed dispose and fresh remount. New shelf InstancedMesh resources receive explicit disposal in addition to geometry/material/texture/renderer cleanup.

## Test synchronization and limits

The initial mixed dev-harness run's 20-second disposal timeout was investigated with a fresh focused check: after 7 seconds, canvas disposed, 0 holders and no engine. Final verification uses the built artifact without source hot reload, interval polling and a 120-second software-renderer allowance; disposal and remount pass.

One visual-revision run timed out taking a screenshot during continuous software rendering. The final verifier advances real frames, pauses only while sampling their pixels, advances again, then captures a second paused sample. Both captures have identical paused UI, so the comparison tests actual changing scene pixels. The renderer itself has no frame cap or reduced-quality test mode.

- Emulated viewport sizes are **not physical Fold hardware**; no phone GPU/frame-rate claim. SwiftShader rendering can be slow.
- Hidden verification injects document.hidden/visibilitychange, not actual OS backgrounding.
- Fullscreen verification transfers the canvas between the application's holder pattern, not an OS/browser fullscreen request.
- Integrated card routing, real app overlays/audio and target-device performance belong to the parallel integration owner. The main app does not yet import this component; the separate pilot build does.
- Code deployment `215c50ff…` is Vercel READY: https://brainwave-gmc1qfm9h-alibowbows-projects.vercel.app/immersive-worlds/cafe/pilot/index.html . Screenshots are local renderer evidence. Earlier cloud-browser navigation was rejected by automatic approval after a Vercel authentication/account redirect; no login, share/bypass token or protection change was attempted.
- Original procedural people/buildings and shader rain remain approximations. Window reflection is planar rendering; street light strips approximate wet reflection, not ray tracing. Droplets do not perform fluid collision/merging. All assets remain original procedural output; no generated or third-party images were added.
