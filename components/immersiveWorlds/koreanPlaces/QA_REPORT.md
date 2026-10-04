# Korean places verification

Browser-tested source revision: `42cc8bd67e24d9bd029095c5278c01bae57edf37`. Base main: `14940149cc5c0fccb778b58d4d755a04aea55e53`. The subsequent evidence commit adds only this report and captured evidence; production code is unchanged from the tested revision.

## Build and regression gates

Run in the isolated branch on 2026-10-04 at `6014a40`; subsequent changes only add isolated QA frame synchronization and its documentation. Typecheck also passed after those QA additions:

| Command | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm test` | Passed: 24 files, 150 tests |
| `npm run build` | Passed |
| `npm run check:bundle` | Passed: initial JS 402.6 KiB / 410 KiB; CSS 99.5 KiB / 135 KiB |

The three added regression tests cover live initialization failure, a retired engine's late failure, and the actual shared host preserving/reusing a successor canvas when an older initialization rejects. The shared host is consumed read-only.

The app build does not wire these new entries into the catalog. The owned isolated harness imports and builds all three entries separately. See `qa/README.md` for reproducible build/browser commands.

## Final browser evidence

All three worlds completed the required checks in Chromium `153.0.8010.0`. [Combined verification](qa/evidence/verification-all.json) has `pass: true` and explicitly records `mode: combined-full-world-runs`.

The [original all-world run](qa/evidence/verification-attempt-all.json) completed scops and temple, then exceeded the 45-second limit while saving rural's full-size chrome PNG. Rural's input assertions had passed. A [fresh-browser rural-only run](qa/evidence/verification-rural.json) at the **same source and bundle** completed every rural check and exited successfully. The combined result uses only completed world records and retains both raw runs. It does not claim the first process exited successfully. In this software-rendered executor, the existing `--scene=scops`, `--scene=temple`, and `--scene=rural` options allow separate browser processes for reproduction.

- Source manifest SHA-256: `fa33a364cd72ef8547cf3068c2ec6955278013c24e4ef35bc41de2e507b5f635`
- Built harness manifest SHA-256: `6f21bcadf7199ae365e845a3a5b168d221299ac07a207d5f389509047368d98b`
- Combined JSON SHA-256: `2e2427f84b24d482f0694284b1fe78a34eb5d0e87d601c1861069d7ded397398`

All individual source/bundle files and all 12 PNG bytes/dimensions were checked against their manifests. Both runs retained unchanged, identical source and bundle hashes.

| World | Desktop 1365×900 | Portrait 390×844 | Fold viewport 960×700 | Chrome 1365×900 |
| --- | --- | --- | --- | --- |
| 산사의 아침 | [PNG](qa/evidence/temple-desktop.png) | [PNG](qa/evidence/temple-portrait.png) | [PNG](qa/evidence/temple-fold.png) | [PNG](qa/evidence/temple-chrome.png) |
| 소쩍새 밤 | [PNG](qa/evidence/scops-desktop.png) | [PNG](qa/evidence/scops-portrait.png) | [PNG](qa/evidence/scops-fold.png) | [PNG](qa/evidence/scops-chrome.png) |
| 시골 여름밤 | [PNG](qa/evidence/rural-desktop.png) | [PNG](qa/evidence/rural-portrait.png) | [PNG](qa/evidence/rural-fold.png) | [PNG](qa/evidence/rural-chrome.png) |

Every world passed:

- Genuine native-RAF motion with changed pixels, then stable active pause, reduced motion, static 3D, static first frame, and labelled synthetic hidden-state pause. Stopped states have zero pending scene RAF callbacks.
- Real mouse raycast taps through the visible sibling `data-scene-drag` layer, bounded interaction events, cooldown, rendered drag, and drag-return-to-target without a tap. Synthetic pointer cancellation and window blur were tested over a previously verified tactile target after cooldown expired.
- Button, range input, and `role=button` probes placed over the known tactile target receive their own UI actions without scene events. Browser CDP touch reaches look, renders a real drag frame, and produces neither a tap nor native pointer cancellation. Surface `touch-action:none` and explicit inline `pan-y` precedence both pass.
- Three second-holder round trips retain one canvas and exactly one pointerdown listener per mounted surface. Covered holders remain inert. Three rapid remounts reuse that canvas; absence for 5.4 seconds disposes it and creates a new canvas on return.
- Zero new AudioContexts. Scops additionally passes the existing-engine event subscription/dispatch check.

Actual tab hiding was **not observed** when another headless tab was brought forward; the real tab-hide path remains unverified. This is separate from the passing synthetic hidden-state checks.

## Visual review

Actual rendered PNGs, including portrait compositions, were inspected during successive revisions. Temple corrections include an opaque roof underside, more distinct bronze/timber/tile surfaces, irregular foliage, layered mist, and a portrait tea setting. Scops corrections include a dark nonemissive lamp reservoir, restrained warm illumination, softer forest ridges, a continuous stream, branch/leaf structure, and a small foliage opening around the owl's existing perch. Rural corrections include darker blue-green rice, a mottled curving path, irregular cedar crowns, coherent clouds, and a portrait pole placement that keeps the warm farmhouse readable.

Each scene has independently authored spatial geometry and materials. Only rural uses the approved toon art direction. Its original reference image is not rendered as a backdrop. The exact reference asset hash and independent JEV visual review are in `PROVENANCE.md` and `REFERENCE_REVIEW.md`.

## Scope and limits

The chrome fixture reproduces the sibling-layer DOM relationship of Player/ImmersiveMode and uses the real world components. It does not import or change the shared Player/ImmersiveMode components. The executor's system fonts show missing Korean glyphs in the isolated fixture labels; the app's shared typography is not under test or changed. Production catalog/fullscreen/audio wiring remains with the integration owner.

Chromium uses ANGLE SwiftShader in this executor. Full-size PNGs and the smaller lifecycle test viewport are distinct evidence. They establish rendered content and browser behavior, not physical Fold hardware, device FPS, thermals, battery use, or GPU-memory measurements. The initial motion probe runs native RAF. Later input/lifecycle checks hold only the renderer's pending RAF between explicitly stepped real renders, using actual native timestamps and `gl.finish()` to drain the software GPU. No timestamp or world time is fabricated. Stopped-state checks also require zero pending renderer callbacks. Production quality/DPR/frame scheduling is unchanged; the app never imports the QA scheduler.

Hidden-state and pointer cancellation/blur injection are labelled as synthetic in the JSON. Browser CDP touch input is trusted browser emulation, not a physical touchscreen. Existing-engine scops event subscription is tested; no independent AudioContext is created, and no actual recording/listening/spatial-audio quality claim is made.

The PR remains a draft. This worker has not merged or changed common/protected scene code.
