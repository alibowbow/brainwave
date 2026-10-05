# KoreanPlaces — bounded quality follow-up

Original PR: [#57](https://github.com/alibowbow/brainwave/pull/57), final [handoff](https://github.com/alibowbow/brainwave/pull/57#issuecomment-5983982007). Original branch `codex/korean-places-three-worlds` was verified at the required `0e09a28a175b0aab8a52443c14a506f54b6998ee` before work. The new branch is `codex/korean-places-quality-followup-20261004`, based on that exact commit, targeting the original branch rather than main. No original PR edits, merge, force push or manual deployment were performed.

**Final locally tested source: `bbc321dcf9fcaa107154c9802e6ef49e7021699c`. Published equivalent source: [`b72ed33ec990b7bf0e1414a381fb80437bb5d855`](https://github.com/alibowbow/brainwave/commit/b72ed33ec990b7bf0e1414a381fb80437bb5d855).** Both have the identical full Git tree `110123abdea8a90a481b3f886ced081a540cb375`. Local Git had no push credential, so the existing GitHub connection published the same blobs/tree with new commit metadata; no new token was obtained. The following evidence commit adds only reports, images and verification artifacts. Raw run records and comparison labels preserve the local tested commit IDs. See the [publication mapping](qa/evidence/final/publication-map.json). Implementation was frozen locally at `33dd03a383a77311f4aaf4d828f537301222fae9`; later local source commits refine only the isolated verifier. Shared input/runtime files are byte-identical to the original branch.

## Scope and review

- Production changes: `scenes/rural.ts`, `scenes/temple.ts`, `scenes/scops.ts` only. QA changes: `qa/main.tsx`, `qa/verify.mjs`, `qa/README.md`; all reports and evidence remain in this owned folder. No public asset changes were needed.
- Read the original INTEGRATION, PROVENANCE, REFERENCE_REVIEW, QA_REPORT and raw verification records. Directly inspected six baseline desktop/portrait PNGs and the approved `rural-ghibli-v9.webp` pixels. Its SHA-256 remains `aa5bf392be8e9d7a1ae7df45aa1c157b914d2fe4ec0ce7c62d7eee136fcb2295`.
- No repository/ancestor AGENTS.md or repository `.agents/skills` instructions were present in the pinned checkout. The available GameFactory validation workflow was read. Sonnet/Opus principles were reread from the existing reference review; no external code/assets were copied.
- Initial read-only concurrency scan inspected all 15 open PRs' changed paths and Korean branch records; only PR57 touched this ownership. GitHub cannot reveal unpublished changes in other Work sessions. [Publication recheck](qa/evidence/final/publication-guard.json) records the unchanged original head and separate all-author 17-open-PR check.
- Base history includes main `14940149cc5c0fccb778b58d4d755a04aea55e53` and protected PR51. No main/newer-user branch was written or merged into this continuation. Shared core, other worlds, rainyWindow/oilSea and protected settings remain untouched.

## The three corrections

**Rural:** the two tall banks are independently shaped continuous 3D cloud volumes, with unequal shoulders, irregular soft edges, cool undersides and restrained moonlight. The thin bands, stars and original slow drift remain. Independent geometry/transform comparison found that only the cloud root subtree changed; the camera and every other root subtree remained identical. The approved moon/house/path/pole/palette composition is preserved. The modified banks remain peripheral in portrait, as in the original framing.

**Temple:** deterministic bronze/verdigris colour, roughness, metalness and fine bump variation replace the uniform mottled green appearance. Existing borders and strike plate share worn casting tones; shallow low-contrast relief/engraving follows the bell surface. Three near beam sections receive original lotus/scroll paint and subtle surface depth. The first visual pass's too-dark relief was softened once. Camera, architectural geometry, lighting, interaction and landscape seed are unchanged.

**Scops:** the distal end of one foreground limb is lowered slightly to reveal the existing small face/ear silhouette in both views. The owl, eyes, perch, camera and animation are unchanged. Four nearby trunks receive bark-covered joins and tapered fork endings. Additional branch generation saves/restores the seed so later scenery is preserved. The owl stays small, distant and stationary.

All default entries still require only `active:boolean`. `KoreanWorld.tsx`, `WorldEngine.ts`, default entries, types, shared host/look/motion code are unchanged. Existing guarded chrome, holder ownership, cancellation and disposal behavior is preserved. No AudioContext/player/audio edits, quality/DPR reduction or production frame cap were introduced.

## Final actual images

Initial paused real Three.js captures; chrome PNGs explicitly show **initial visible chrome**, not post-interaction frames. Actual input outcomes are in the raw JSON. Comparisons preserve both source images pixel-for-pixel, without resampling, with labels outside the image regions.

| Scene | Desktop 1365×900 | Portrait 390×844 | Fold viewport 960×700 | Chrome 1365×900 | Before / after |
| --- | --- | --- | --- | --- | --- |
| 시골 여름밤 | [PNG](qa/evidence/final/rural-desktop.png) | [PNG](qa/evidence/final/rural-portrait.png) | [PNG](qa/evidence/final/rural-fold.png) | [PNG](qa/evidence/final/rural-chrome.png) | [desktop](qa/evidence/final/comparisons/rural-desktop-before-after.png) · [portrait](qa/evidence/final/comparisons/rural-portrait-before-after.png) |
| 산사의 아침 | [PNG](qa/evidence/final/temple-desktop.png) | [PNG](qa/evidence/final/temple-portrait.png) | [PNG](qa/evidence/final/temple-fold.png) | [PNG](qa/evidence/final/temple-chrome.png) | [desktop](qa/evidence/final/comparisons/temple-desktop-before-after.png) · [portrait](qa/evidence/final/comparisons/temple-portrait-before-after.png) |
| 소쩍새 밤 | [PNG](qa/evidence/final/scops-desktop.png) | [PNG](qa/evidence/final/scops-portrait.png) | [PNG](qa/evidence/final/scops-fold.png) | [PNG](qa/evidence/final/scops-chrome.png) | [desktop](qa/evidence/final/comparisons/scops-desktop-before-after.png) · [portrait](qa/evidence/final/comparisons/scops-portrait-before-after.png) |

Baseline source: `42cc8bd67e24d9bd029095c5278c01bae57edf37`, baseline evidence head: `0e09a28a175b0aab8a52443c14a506f54b6998ee`. Final art was directly reviewed in all six desktop/portrait images. [Comparison manifest](qa/evidence/final/comparisons/comparison-manifest.json) records baseline/final/comparison hashes, dimensions and exact pasted pixel bounds.

## Verification

All gates below ran successfully at final tested source `bbc321dcf9fcaa107154c9802e6ef49e7021699c`. [Gate log](qa/evidence/final/build-gates.log).

| Gate | Result |
| --- | --- |
| Typecheck | PASS |
| Vitest | PASS — 24 files, 150 tests, including KoreanPlaces retirement tests |
| Application build | PASS |
| Bundle gate | PASS — initial JS 402.6 / 410 KiB; CSS 99.5 / 135 KiB |
| Isolated real-entry harness build | PASS; exact unchanged bundle manifest below |
| Temple complete browser run | [PASS](qa/evidence/final/verification-temple.json) |
| Scops complete browser run | [PASS](qa/evidence/final/verification-scops.json) |
| Rural complete browser run | [PASS](qa/evidence/final/verification-rural.json) |

The existing >500 kB Three.js chunk advisory is a build warning, not a bundle-gate failure. The application build does not register these unintegrated entries; the isolated harness imports and renders all three real components.

Every scene passed native-RAF pixel-changing motion, stable pause/reduced-motion/static/synthetic-hidden states with zero pending scene RAF, static first frame, real raycast mouse tap/drag through visible sibling chrome, cooldown/bounded events, button/input/link and five interactive-role exclusions, trusted browser mouse/touch capture and release, labelled synthetic pointercancel/blur plus native lostpointercapture cancellation, three holder round trips with one canvas and one pointerdown listener per mounted surface, covered-holder tap/drag inactivity, three rapid remounts, observed delayed cleanup and new-canvas reentry, and zero new AudioContexts. Scops also passed the injected existing-engine event subscription contract.

The final screenshot path drains submitted real WebGL work through existing QA `gl.finish()` and uses Chromium `Page.captureScreenshot` for the exact composited viewport. It neither substitutes pixels nor changes scene state/render quality. Motion starts with native RAF. Later lifecycle/input steps use the existing explicitly labelled QA-only scheduler at 683×450, genuine native timestamps and actual renders. Full-sized image evidence remains at the dimensions above. Production never imports the QA scheduler.

**Source manifest SHA-256:** `6c2a3b97f5a94e804e92bd4b51405dd82d70b43e536d537fe01b66107250110e` (20 files).

**Built harness manifest SHA-256:** `b3184ce18ee3b176045328c9823d970e72876e2d892c05cf73db2f42f262d6f3` (6 files).

[Final verification summary](qa/evidence/final/verification-summary.json) contains every source/bundle file hash, all 12 actual PNG hashes, completed world records and raw-run hashes. All three independent processes used identical source and bundle; all hashes and PNG dimensions were independently rechecked after completion.

## Grace versus actual cleanup

Times are actual monotonic observations in this SwiftShader executor, in milliseconds from the unmount request. The QA wrapper observes the real synchronous dispose entry/return and the browser's actual detached-canvas context-loss event. It does not alter host timers or resource calls.

| Scene | Host grace setting | Dispose starts | Dispose returns | Context lost | Cleanup duration |
| --- | ---: | ---: | ---: | ---: | ---: |
| temple | 5000 | 5002.3 | 7458.5 | 7459.3 | 2456.2 |
| scops | 5000 | 5001.0 | 8191.2 | 8191.9 | 3190.2 |
| rural | 5000 | 5000.7 | 5274.6 | 5275.3 | 273.9 |

Thus a 5000 ms host grace is **not** a claim that cleanup was complete at 5000 ms. Exact raw performance timestamps, listener/subscriber/RAF cleanup and rebuilt canvas identity are retained in each run. These observations do not measure physical GPU-driver memory reclamation latency.

## Retained failed attempts

These are failed runs, not folded into a success claim. The final three complete runs above supersede them.

| Attempt | Failure | Resolution |
| --- | --- | --- |
| [33dd03a](qa/evidence/followup/verification-temple.json) | New lost-capture probe released pending capture before native capture was established; a legitimate tap remained | Probe now requires actual trusted gotpointercapture before release and trusted lostpointercapture afterward; runtime unchanged |
| [1c38204](qa/evidence/followup-final/verification-temple.json) | Playwright 45-second full-size chrome screenshot timeout after software-rendered input; completed input checks passed | Initial chrome capture moved before lifecycle workload, retaining full resolution |
| [c7ec34c](qa/evidence/followup-verified/verification-temple.json) | Playwright 45-second static-state screenshot readback timeout; completed input/transfer/reduced checks passed | Final screenshot path drains real GPU work and captures directly through Chromium CDP; all complete runs then passed |

## Explicit limits and integration handoff

- Physical Fold/phone testing, actual device FPS, thermals, battery and GPU-driver memory profiling: **not run**.
- Real tab hiding: **not observed** in headless Chromium; synthetic visibility-change pause passed. Pointercancel/blur injection is labelled; trusted browser touch is emulation, not a physical screen or OS blur test.
- Actual audio playback/listening/spatial quality: **not tested**. The existing audio contract and zero independent context behavior are verified.
- Shared production Player/catalog/fullscreen/audio integration and production app runtime: **not modified or certified here**. The harness reproduces the relevant sibling-layer structure with the real entries. Final integration belongs to the separate Work.
- No unresolved defect was found in the bounded corrections or final software regression suite. Keep this follow-up draft; merge and production release remain outside this worker's scope.
