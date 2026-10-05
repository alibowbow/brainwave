# Draft pilot review — 2026-10-04

This record separates supplied evidence, actual image review, local integration checks and remote CI. Draft admission is not final artistic acceptance. Main merge remains held pending technical release gates.

## Exact source and integration state

| Item | Recorded state |
| --- | --- |
| Original core base | `1bb79ac572e8568676881bbc7b4404f1bac443e8`; retain its historical test record |
| Current local main baseline | `14940149cc5c0fccb778b58d4d755a04aea55e53`, preserving independently merged sea PR #51 |
| Protected renderer code | `components/rainyWindow/**` and `components/oilSea/**` exactly match current `origin/main`; no pilot integration edits |
| Current local forest source | `1925398f9c1eaf2319bf624d4f17e68e17d745dd`, reviewed and merged unchanged. Earlier `a2ff7f9` integration evidence remains scoped to forest `f4d24d6`; the newer owner evidence is appended below |
| Café PR #50 source | `8b9383b8086b99bec04eb2273a68ec9d2bd76f43`; reviewed owner files merged locally unchanged; renderer code `215c50f` |
| Cosmic PR #52 source | `a0178faaf919a07cd04bdf53a5efa476b58b8e5e`; reviewed owner files merged locally unchanged |
| Draft admission | All three pilot IDs are explicitly lazy-registered for draft testing. The latest local combination with forest `1925398` passed typecheck, 188 tests, build and a clean bundle check. Owner CI and shared browser evidence remain separate; no final quality acceptance |
| Recorded remote draft PR #48 | `a2ff7f99258de0a7fd9d8885b91dd31c45f5c245`; main `14940149`, forest `f4d24d6`, café `8b9383b`, cosmic `a0178fa`. CI37229018361 completed with failure; exact results are below |
| Remaining scope | The other 27 worlds are not implemented here. The final 30-world goal awaits their owners and quality decisions |

The `a2ff7f9` admissions are pushed for draft testing; the newer forest owner head is not certified by that run. At this checkpoint, all three admitted owned trees match the recorded source heads and protected renderer directories match main `14940149`. All pilots keep `active: boolean` as their only required prop, stay within owner paths, use the existing shared motion/look host and retain a configured five-second disposal grace period. Optional interaction callbacks remain unconnected. These admissions add no audio engine, sound assets or shared audio behavior change.

## Forest evidence and review

Historical owner run: [CI37225693631](https://github.com/alibowbow/brainwave/actions/runs/37225693631), source `6a58c25`. The following JPGs and observations describe that source, not the newer `f4d24d6` revision.

The report status is **failed**, at the second motion screenshot after a 90-second screenshot timeout. Its two completed assertions establish a ready engine and nonzero real geometry with a 1280×800 desktop drawing buffer. They do not establish the later interaction/lifecycle sequence. The report has zero captured page/shader errors, but that is not a completed-suite pass.

The owner's `6a58c25` change pauses the real `active` prop for a full-quality capture and then resumes; it does not reduce scene resolution or alter production rendering. Final cleanup retained three JPGs, each independently matched to its report byte count and SHA-256:

| Image | Viewport | SHA-256 |
| --- | --- | --- |
| `forest-desktop.jpg` | 1280×800 | `7bc3109e97706db4356963a03b7f61711dbfe2a4703e739a1740c4582c9bcf44` |
| `forest-fold-portrait.jpg` | 344×800 | `4aebc69ff2c0f0acec25bff8f886013c7467f9e7a29bc7a54d1c4e7b3efdc613` |
| `forest-fold-landscape.jpg` | 882×344 | `a01cff4ef976a3925b94ac2848159554bc9999618145aa475671475280659e01` |

Recovered evidence is in `/workspace/scratch/ec736d2e8585/qa-forest-6a58c25/`, including `forest-browser-report.json`. These local recovery paths identify the reviewed files; the failed CI log is the original run provenance.

The coordinator personally viewed the desktop and portrait JPGs. Spatial depth and water reflection are present. The following are quality-review observations for the forest owner, not coordinator changes or final acceptance:

- Tree placement and repeated trunk forms read as patterned; inspect composition and botanical variation.
- Rocks remain visibly faceted against the desired material/detail benchmark.
- Dew can read as flat white points; review volume, highlight and contact with leaves.
- Pale uniform haze weakens separation and light direction; assess depth-dependent atmosphere against the focus benchmark.

No continuous-motion judgment or physical-device performance result is inferred from these two stills. The landscape image's hash is verified; this record does not claim the coordinator visually reviewed it.

Through `f4d24d6`, public `/immersive-worlds/forest/qa/forest-qa.mjs` remained the **old `989186c` snapshot**, blob `91b74a7849e327071554d10006cf7c6e833e970d`. Those historical renders must not be labeled as newer source evidence. The `1925398` revision rebuilds that public bundle with a verified manifest, as recorded below. Shared CI uses the worker-owned Vite source entry via `SCENE_FOREST_HARNESS_URL` to pair exact source-harness captures with the built app without rewriting worker assets.

Earlier admission `f4d24d6` changed only six forest-owned files. It added varied stands/saplings and understory, batched distant trees and ferns, introduced smooth procedural wet stones with moss, revised dew/light/fog and narrowed very wide landscape framing. No new screenshots or result report were committed in that revision; recovered owner images and subsequent integration PNGs are recorded separately below. The later `1925398` review and local admission are appended separately.

The `f4d24d6` isolated verifier supports native-size same-renderer readback, records capture methods/dimensions/hashes, continues independent lifecycle checks after capture failure and separately attempts real tab/window visibility before the synthetic hook. Production resolution and RAF policy are unchanged. Source review of this head found two owner follow-ups: `forest.browser.test.ts` resets `preferDirectCapture` to `false` at test start, overriding its configured default; and distant-tree batching uses an identity `modelMatrix`, collapsing the branch-wind phase that previously varied by tree position. The second is a source-level motion-variation concern, not an observed motion failure. Earlier `6a58c25` passes do not certify these changes; the later `1925398` response is reviewed separately.

Owner [CI37228171157](https://github.com/alibowbow/brainwave/actions/runs/37228171157) tested `f4d24d6` through PR merge `bfd6a0724b717b0dd557c18b907f8a3f7ce1c2bb` onto main `14940149`. Typecheck and 155 tests passed; the isolated browser test failed and later build, bundle and scene-browser steps were skipped. Its browser report contains only two passed checks: ready engine and real geometry/native 1280×800 buffer. Initial CDP capture exceeded 30 seconds, direct WebGL fallback exceeded 30 seconds, resume lookup exceeded 45 seconds, and the fatal simulation-progress wait at `forest.browser.test.ts:259` exceeded 45 seconds. Motion comparison, interaction, lifecycle, reduced-motion and native-visibility checks were not reached. Zero reported page/shader errors does not turn this into a completed pass.

There were no uploaded artifacts. Numbered base64 chunks and JSON were recovered from job `111512060904` into `/workspace/scratch/ec736d2e8585/qa-forest-f4d24d6/`; declared byte counts, dimensions and SHA-256 values all matched. Recovery produced four direct-WebGL JPGs at the same simulation time `0.433198`, with desktop and failure images identical. These show the actual scene buffer without DOM/browser-compositor evidence:

| Recovered `f4d24d6` image | Dimensions | SHA-256 |
| --- | --- | --- |
| `forest-desktop.jpg` / identical `forest-failure.jpg` | 1280×800 | `4fab7fecc65b4beca46fae82770c35f09668cfbf25d9cafa0d03902fd417aeba` |
| `forest-fold-portrait.jpg` | 344×800 | `e8db80fbc38f00077eb55fb3aa6060396648e657d0e384a34bb032a9ad8486d6` |
| `forest-fold-landscape.jpg` | 882×344 | `f8f10feb9b349c2ff4889e423089ea9ad58453a508dc723ce0ee34bf75dc6250` |

The integration reviewer opened all three unique recovered views and the older `6a58c25` desktop for comparison. Stones are visibly smoother and understory is denser, while repeated trunks, flat-looking foreground leaves/dew, regular upright blades and pale exposed background edges remain quality-review points. The same-time stills establish neither continuous motion nor successful resume.

## Café evidence and review

Historical source: `c0de2c42bd803545cc1675587eda6ffc84aef9aa`. Its owner evidence lives at that commit under `components/immersiveWorlds/cafe/qa/screenshots/`: four PNGs, `manifest.json` and `results.json`; context and limitations are in the owner's `qa/VALIDATION.md`. The historical hashes and review below are retained separately from the replacement evidence in `8b9383b`.

The supplied isolated suite reports **23 checks and zero errors**: real WebGL rendering, native buffer dimensions, rendered movement, look drag/release, same-canvas holder transfer, active/reduced-motion pause, injected hidden/visible signal, cup/lamp/window callbacks, ignored paused taps, delayed disposal and fresh remount. These are owner-executed isolated results, not a completed integration run by the coordinator.

The manifest maps the evidence to initial source `051c5249` plus the maximum-drag-distance guard and English QA caption, all included in `c0de2c4`. Its compiled bundle is `cafe-pilot-C5hLuGho.mjs`, SHA-256 `7596e57bedad17f0fd5c1f9e71cfcb48fb41eb097089654a23a137d86fccbe6c`. Four PNG byte counts and hashes were checked against the manifest:

| Image | Viewport | SHA-256 |
| --- | --- | --- |
| `desktop.png` | 1280×850 | `bb8cef7e4c5f7e81c68b09fea343162605750e57554ae54c969ad6b84098dd7e` |
| `fold-portrait.png` | 412×915 | `500e7a07e00147b5869e9db9a98789d6e7c505cd7d1c6efdc7ec5cb864ca71cd` |
| `fold-inner-portrait.png` | 673×841 | `ac29d6d0549c2d662dfd3c98120ec055d12b297a74dfa14fa930aba3cfbe502c` |
| `fold-landscape.png` | 915×412 | `257f07236aa1249e2824a152c8e5d975b571aec1bb65d6958feea7eb015c5abd` |

The coordinator personally viewed the desktop and portrait PNGs. Real 3D cup, lamp, glass and room depth are present. Repeated exterior façade, patron proportions and comparatively flat materials warrant owner quality review against the protected focus benchmark. This is not final visual approval; the inner/landscape hashes do not imply those images were also visually reviewed here.

The former endpoint-only tap issue is resolved with a maximum-distance guard. The existing five-second release delay remains. Optional `cup | lamp | window` callbacks are deliberately unconnected in the shared integration; scene gestures must not introduce unreviewed sounds. Café final disposal uses `data-lifecycle="disposed"`, unlike forest's `data-disposed` marker.

Latest `8b9383b` includes renderer code `215c50ff7bafd7e52a1593022a75a7a032cc3c4c`, the rebuilt public `cafe-pilot-B1N9rsFn.mjs` and four replacement PNGs. Changes address distant occupants, seated framing, varied street/shelf detail and material/light depth. All changes remain within café ownership and preserve the component contract. The new bundle is 820,441 bytes, SHA-256 `6d64f3cf2b3771625edeeba4583dbeba8fa2c65a85dbd99351d7bd6172f2db3c`; its size/hash and all four PNGs match the new manifest:

| New image | Viewport | SHA-256 |
| --- | --- | --- |
| `desktop.png` | 1280×850 | `cb01e40cf5483078c10cfaa164484e894a56613a3e211d43538929cd7fbb916f` |
| `fold-portrait.png` | 412×915 | `f7ef88bb84d45a2880d6715840015899235c99efdb5687df59247abfe1cc83e4` |
| `fold-inner-portrait.png` | 673×841 | `6949d8e81157f5deafb59be9aa660222e0782863c7f89791ff6f5a7aa43070fb` |
| `fold-landscape.png` | 915×412 | `a9a15beaa37e5112fa94427e895d3439948ff85aadf39c71852c52347345b20a` |

The coordinator personally viewed the latest desktop and portrait PNGs. The owner reports viewing all four images and passing 23 checks with zero errors against this rebuilt revision. However, committed `results.json` is **byte-identical to `c0de2c4`**, blob `bd1337c1edf8fc4597e7451d13c3620b26b55b48`, and does not bind a new run to `215c50f` or `8b9383b`. The new manifest verifies image/bundle provenance; it does not independently establish a newly attributable machine-readable lifecycle run. Preserve the owner's claim and this evidence limitation separately. No final quality acceptance follows from the update.

## Cosmic evidence and review

Source: PR #52, `a0178faaf919a07cd04bdf53a5efa476b58b8e5e`. The change stays within the owner's `components/immersiveWorlds/cosmic/**` and `public/immersive-worlds/cosmic/**`. Within the component's `validation/` directory, evidence is recorded in `RESULTS.md`, `REFERENCES.md`, `screenshots/cosmic-validation.json` and `screenshots/capture-report.json`; the public directory also contains `PROVENANCE.md`. The public preview was rebuilt in this commit and points to `cosmic-harness-Co9CAj80.mjs`.

The three committed JPGs and both JSON reports were extracted to `/workspace/scratch/ec736d2e8585/qa-cosmic-a0178fa/`. Each extraction matches its committed Git blob. SHA-256 values below were independently computed; the owner supplied capture telemetry, but **no SHA-256 manifest was found**, so these are not claimed as owner-manifest matches.

| Image | Viewport | SHA-256 |
| --- | --- | --- |
| `cosmic-desktop.jpg` | 1280×800 | `f48bb49334eae1fbedca4a5b10897f5773765fe425ade4ec8bfa43ca3af1c8d4` |
| `cosmic-fold-portrait.jpg` | 344×882 | `c90fc440f859d5c42ab3e89a0e0cc05b5d30054b25f22701bcc4bdd905a693cf` |
| `cosmic-fold-landscape.jpg` | 882×344 | `06e36025cef09b22cbb997b4c91f8ea59b8f3c8edad834aed82e3df2a788a63e` |

The owner's isolated JSON reports **19 passed check groups** covering rendered movement, active pause/resume, same-canvas transfer, bounded look drag and tap guard, nearby glow, reduced motion, offscreen pause, an injected hidden-document signal, viewport buffers and three delayed-disposal/remount cycles. Behavior checks used an 800×500 software-WebGL viewport. The three clean JPGs were captured separately at DPR 1 with reduced motion; a separate 390×844 DPR-2 check produced a 780×1688 drawing buffer. These are owner-executed results, not coordinator-executed integrated browser tests. Owner typecheck, 151 tests, build and bundle results belong to the original `1bb79ac` base and must not be substituted for current integration results. The separate `a2ff7f9` shared-app functional pass and incomplete visual evidence are recorded below.

The integration evidence reviewer opened all three committed JPGs; the coordinator also personally viewed desktop and portrait. The garden has foreground plants, floating islands, a planet terminator and rings, nebula depth and a pond reflecting the planet. Quality issues for owner review remain: uniformly bright green leaves read as flat paper; repeated stacked island forms have hard dark undersides; the large planet dominates the composition; and portrait foreground foliage crowds the pond and resting area. These stills support draft admission, not focus-benchmark quality acceptance or a continuous-motion judgment.

Source review also identifies the following follow-up items; the stills do not establish their behavior on a physical device:

- Portrait layout rotates the sky group by `0.18` radians, while the ring-shadow shader compares world positions with the unchanged local planet-center uniform `(19, 24, -78)`. The owner should align those coordinate spaces and verify portrait shadow placement.
- The half-float reflection target has no explicit capability guard. The owner should establish a supported fallback and demonstrate behavior where half-float rendering is unavailable.
- Adaptation accumulates slow intervals and decays the counter during faster intervals; it does not require consecutive slow frames. Reduced quality can remain when paused. Reconcile the documented sustained-load and full-quality-still claims with the actual policy and validation.
- The agreed Opus `082` translucent-material reference is missing from the owner's apply/defer accounting.

The owner's source/render provenance distinguishes Sonnet `024` and `073` source plus separate live inspection, Sonnet `014`'s live fallback starfield, and Opus `066`, `061`, `091` source plus separate live inspection. Opus `022` and `100` are source-only references; `004` is additional source context. These are owner reports, not claims that this integration reviewer rendered the original demos. Opus `100` is correctly identified as a finite-difference ripple simulation; full numerical simulation is deferred in favor of independently implemented analytic ripples. The global addendum remains the authoritative balanced benchmark plan.

The owner declares the visual assets procedurally generated for this pilot, states that no reference code or assets were copied, and records Three.js/React MIT and Pretendard SIL OFL notices. Runtime source inspection found no remote asset fetch or scene-owned audio engine. Reference code/assets remain unlicensed for copying unless their rights are verified; owner provenance is not a new license grant. The silent harness provides no audio-audition evidence.

## Integration verification ledger

| Exact checkpoint | Outcome and boundary |
| --- | --- |
| Foundation `cdf746f`, [CI37224743626](https://github.com/alibowbow/brainwave/actions/runs/37224743626) | All four original browser commands passed. Historical core evidence predates pilot admission and current main. The coordinator viewed focus-player and sea-fullscreen PNGs from that run |
| Integration `7c96d9c`, [CI37225839161](https://github.com/alibowbow/brainwave/actions/runs/37225839161) | Completed with failure: four original browser commands passed; worlds failed at the app desktop 1440px PNG after 120 seconds. Earlier standalone and app checks below remain valid within their exact source scope |
| Historical draft `c58ba63`, [CI37226216749](https://github.com/alibowbow/brainwave/actions/runs/37226216749) | Completed with failure: four original browser commands and all seven `verify:audio` checks passed; worlds failed on the source harness second-holder screenshot after 120 seconds. Later app checks were not reached |
| Pre-cosmic integration with main `14940149`, forest `6a58c25`, café `c0de2c4` | Typecheck, 184 unit tests, build and bundle passed. Initial JS 404.2/410 KiB; CSS 100.6/135 KiB. This source combination is now included in remote PR #48; browser/visual gates remain separate |
| Earlier local three-pilot combination: forest `6a58c25`, café `c0de2c4`, cosmic `a0178fa` | Typecheck, 188 tests across 28 files, build and bundle passed. Entry JS 404.2/410 KiB; CSS 100.6/135 KiB. These are local code/build checks, not browser or visual acceptance |
| Historical draft `7816e3b`, [CI37227183207](https://github.com/alibowbow/brainwave/actions/runs/37227183207) | Completed with failure. Four original browser commands and all seven audio checks passed. Forest `6a58c25` source harness passed all nine checks; its app PNG timed out. Café `c0de2c4` app passed seven checks, then Back re-entry frozen-frame verification failed. Detailed scope follows |
| Local combination recorded in `a2ff7f9`: forest `f4d24d6`, café `8b9383b`, cosmic `a0178fa` | Typecheck, 188 tests across 28 files, build and bundle passed. Entry JS 404.2/410 KiB; CSS 100.6/135 KiB. Owned trees match exact heads and protected trees match main `14940149` |
| Draft `a2ff7f9`, [CI37229018361](https://github.com/alibowbow/brainwave/actions/runs/37229018361) | Completed with failure. Code/build, four existing browser commands and seven audio checks passed. All three pilot commands failed overall; successful functional checks and missing visual evidence are separated below |

For `7c96d9c`, [artifact 11312183331](https://github.com/alibowbow/brainwave/actions/runs/37225839161/artifacts/11312183331) separates two source generations:

- The standalone **old public `989186c`** harness passed four viewport PNG captures, motion policies, same-canvas transfer, actual five-second disposal and fresh remount. These passes do not validate the later forest source.
- The actual **`531ecb2` app** passed its link/one-tap playback, visible and hidden player-chrome drag, and pause checks. Its 1440px desktop PNG then timed out after 120 seconds, leaving the later app viewport/fullscreen/lifecycle sequence incomplete.
- Recovery successfully saved `forest-failure.png` with ready real geometry and a paused renderer. The coordinator personally viewed that actual app image at `/workspace/scratch/ec736d2e8585/qa-integration-7c96d9c/qa/screenshots/worlds/forest-failure.png`. A successful recovery image is not a successful full world gate.

For `c58ba63`, [artifact 11312117214](https://github.com/alibowbow/brainwave/actions/runs/37226216749/artifacts/11312117214) uses the **`531ecb2` source harness**, not the older public bundle. Four viewport PNGs and motion policies passed. Its second-holder screenshot timed out after 120 seconds; later application verification was not run. The core four-command and seven-check audio passes are separate from this failed worlds gate.

For remote `7816e3b`, [artifact 11313141336](https://github.com/alibowbow/brainwave/actions/runs/37227183207/artifacts/11313141336) has archive SHA-256 `938325e7fa8f4e71f71d85c1f9929a24a95f407b365e7b95ac7edbd4728664a7`:

- Forest **`6a58c25` source harness** passed all nine checks: four viewport PNGs, motion policies, second-holder transfer, actual five-second disposal and remount. The app passed route/one-tap playback, drag and pause, then its native 1440px desktop PNG timed out after 120 seconds. No complete forest app gate is claimed.
- Café **`c0de2c4` app** passed seven checks, including four viewport PNGs, CSS fullscreen, reduced motion and simulated hidden state. Back re-entry then failed a frozen-frame assertion (`49 → 50`). Final disposal and standalone verification were not executed.
- The coordinator personally viewed the new focus, sea and café app desktop PNGs from this run. These are stills from this exact older integration, not evidence for `f4d24d6`/`8b9383b` or continuous-motion/physical-device tests.

## `a2ff7f9` integrated browser evidence

This run uses forest `f4d24d6`, café `8b9383b` and cosmic `a0178fa`; it does not cover the later forest `1925398` head. Reports were read under `/workspace/scratch/ec736d2e8585/qa-integration-a2ff7f9/`. The integration reviewer opened all four forest harness PNGs plus café and cosmic standalone desktop PNGs. There are **no latest pilot application PNGs** in this run: forest never reached the app sequence, and café/cosmic app desktop capture timed out.

| Pilot | Passed evidence | Failed or not run |
| --- | --- | --- |
| Forest | Six completed checks: real initialization/frame advance, pause, four native viewport PNGs, simulated hidden policy and OS/app reduced motion. Second-holder evidence records `sameCanvas: true` | The combined second-holder check failed when its PNG exceeded 120 seconds. Subsequent actual-disposal waiting timed out after 15 seconds. Remount and all application checks were not reached; zero reported runtime errors does not establish disposal |
| Café | Eleven checks passed: app one-tap route, visible/hidden-chrome drag, pause, motion preferences, simulated visibility, Back, actual release/context loss; rebuilt standalone entry/PNG, holder identity, actual dispose/remount and error check | Two combined checks failed because required app viewport/immersive PNGs were absent. Desktop capture exceeded 120 seconds; the other app PNGs were explicitly not run. A separate browser-cleanup wait exceeded 10 seconds |
| Cosmic | Thirteen checks passed, including app one-tap route/drag/pause, motion preferences, simulated visibility, Back, actual context loss/fresh renderer; standalone entry/PNG, holder identity, dispose/remount, error check and browser-context cleanup. JSON records `functionalStatus: passed` | Two entries have incomplete visual evidence: app desktop PNG exceeded 120 seconds, and remaining app/immersive PNGs were not run. Overall status remains failed |

The successful disposal checks observed actual disposed markers and lost scene contexts, but wall-clock observations were much later than the configured grace period: café app/standalone approximately **66.7s / 30.6s**, cosmic app/standalone **66.1s / 34.4s**. These establish observed cleanup in this software-rendered run, not precise five-second completion or physical-device performance. Café's isolated owner report provenance limitation remains separate from these new shared-run checks.

| Retained artifact | Link |
| --- | --- |
| Protected/existing scene evidence | [scene-core 11313319667](https://github.com/alibowbow/brainwave/actions/runs/37229018361/artifacts/11313319667) |
| Audio evidence | [scene-audio 11313229893](https://github.com/alibowbow/brainwave/actions/runs/37229018361/artifacts/11313229893) |
| Forest evidence | [scene-forest 11313483790](https://github.com/alibowbow/brainwave/actions/runs/37229018361/artifacts/11313483790) |
| Café evidence | [scene-cafe 11313409237](https://github.com/alibowbow/brainwave/actions/runs/37229018361/artifacts/11313409237) |
| Cosmic evidence | [scene-cosmic 11313234893](https://github.com/alibowbow/brainwave/actions/runs/37229018361/artifacts/11313234893) |

Actual image observations remain consistent with the exact owner stills, allowing for different aspect ratios and harness controls:

- Forest's 1440×1000, 344×882, 768×1024 and 1024×768 PNGs retain the smoother stones, tree depth and reflective pond seen in the recovered `f4d24d6` JPGs. Repetitive trunk forms, flat foreground leaves/dew and pale distant openings remain visible. The QA control panel obscures part of the canopy, especially on the cover viewport; these are harness views, not app chrome evidence.
- Café's 1440×1000 standalone PNG matches the revised `8b9383b` owner scene: textured cup/lamp/table, rainy glazing and seated room depth are present. The building grid and simplified occupant/plant forms still need artistic review. This image cannot establish latest app overlays or mobile composition.
- Cosmic's 1440×1000 standalone PNG matches `a0178fa`'s ringed planet, floating garden and water reflection. Flat bright foliage, repeated stacked islands with dark undersides and the dominant planet remain visible. No new portrait/app PNG is available to resolve the previously identified cropping or ring-shadow concerns.

The shared host permits paused ResizeObserver redraws through `renderFrame(0)`. The earlier `7816e3b` café failure did not capture initial simulation time, so the extra frame cannot be declared benign. The revised helper anchors clock and canvas identity through 400ms of layout settling, then requires 500ms without frame, time or dimension changes. Those still assertions, including café/cosmic Back, passed in `a2ff7f9`; this does not retroactively pass the older failure or resolve the PNG stalls.

Shared screenshot capture uses direct CDP with fast **lossless PNG** encoding at the full native viewport. A single 120-second deadline covers preparation through cleanup, with stage logs and report checkpoints. A stalled capture fails the visual gate; subsequent captures on that page are recorded not run. `a2ff7f9` exercised this path and still encountered the stalls above, without reducing scene quality or resolution.

CI retained the five separate artifacts above and bounded each pilot command with a 20-minute supervisor. Mock checks and successful functional assertions do not replace the missing app PNGs or forest disposal evidence.

The three pilots' screenshots use software WebGL and emulated viewports, not a physical Fold. Owner captures do not cover the integration gate's entire 1440×1000, 344×882, 768×1024 and 1024×768 matrix and do not replace those checks. Injected visibility signals are not native tab backgrounding. Two-holder canvas transfer is not browser/OS fullscreen. No device FPS, thermal, long-session stability or physical touchscreen claim is made.

At the `a2ff7f9` checkpoint, the newer forest revision still required review. Its subsequent owner review/admission follows; successful latest app PNGs and a completed forest shared-app/disposal gate remain distinct requirements.

## Later forest owner admission — `1925398`

Forest `1925398f9c1eaf2319bf624d4f17e68e17d745dd` is now merged locally without changes to owner files. Required `active: boolean`, ownership and the shared audio boundary remain unchanged. The earlier pending-review wording applies to the `a2ff7f9` checkpoint only; that run's failures are preserved and do not certify this newer source.

The full `qa/browser-report.json`, `qa/paused-start-report.json`, `qa/verification.md` and public `qa/build-manifest.json` were inspected. All **eight listed source SHA-256 values** match the current files, and the rebuilt public `forest-qa.mjs` matches **822,705 bytes**, SHA-256 `51f7e29c5f488fe992441634e24cf3c6f564e547bf18b104105818a255572091`. This replaces the stale public `989186c` bundle. The seven renderer/component/material/runtime files are byte-identical between verified rendering commit `11a83bd4c358dda6c90f717e236de4834442ccf8` and `1925398`; later test/harness and evidence changes are separate.

The four committed JPGs all match `browser-report.json` in bytes, encoded dimensions and SHA-256:

| Current owner image | Dimensions | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `forest-desktop.jpg` | 1280×800 | 306,410 | `634bf9657b4338a8e1e2dd247a064ebe57ed79075b8dd658d14a4d75684058c0` |
| `forest-fold-portrait.jpg` | 344×800 | 97,755 | `489f591f757c2350aae53b01c5ecda441fb2e4d4a89d3b5984a62912f80c25b2` |
| `forest-fold-landscape.jpg` | 882×344 | 103,849 | `2fd6e35992ffd2bea80ddaea3ab1ebeb903351bcfa5903951249f147716fbc60` |
| `forest-motion.jpg` | 882×344 | 103,929 | `f45f7c54900b42dfe429caae514124f32e3e91c004ab2a05ccce1c1d730933c8` |

These are **native canvas JPEG readbacks**, excluding DOM controls and the browser compositor. They bind to the first green owner run [CI37229401306](https://github.com/alibowbow/brainwave/actions/runs/37229401306), rendering commit `11a83bd`. They are not the separate paused-start images: every paused-start hash differs, as expected and explicitly documented by the owner. The latter images remain referenced by their separate report/log; the four current JPGs must not be relabeled as paused-start evidence.

The first report records **12 top-level passed checks**, including a nested **12-check lifecycle sequence**, with no captured page/shader errors or capture failures. It covers real image/time progression, water/leaf raycasts, drag and eased return, paused touch rejection, app/OS reduced motion, callback ownership through same-canvas transfer, actual disposal and fresh remount. Motion and lifecycle checks run at the native **882×344** layout after desktop and portrait captures; they do not establish those interactions at all integration viewports. Landscape and motion JPEGs have different hashes and simulation times `0.284634 → 0.556334`.

The separate [CI37229877317](https://github.com/alibowbow/brainwave/actions/runs/37229877317) paused-start report binds to `224549f7bcd5bb6a79151182b6b0d007254a2397`. It records **14 top-level passes** plus the nested **12-check lifecycle sequence**: initial `active=false` draws real geometry and all three initial layout captures retain simulation time zero, then activation advances frames and completes the interaction/lifecycle sequence. Its evidence is distinct from the first report.

The final owner run [CI37230588364](https://github.com/alibowbow/brainwave/actions/runs/37230588364) is independently confirmed by GitHub run/jobs APIs as **completed/success** at exact head `1925398`: typecheck, Test, build, bundle budget and the existing scene-experience step succeeded. This is owner-branch validation, not the shared integration's latest three-pilot application PNG gate. The checked-in detailed reports remain tied to their two earlier exact runs.

Both committed reports explicitly record `actualTabVisibilityTested: false`: the second-tab attempt encountered a context restriction and window minimization did not change native hidden state. Simulated visibility passed; native tab backgrounding remains unverified. The final test changes its context setup, but a green job alone is not evidence that native visibility was observed. Synthetic pointer checks, emulated Fold-like viewports and slow SwiftShader execution provide no physical-device FPS, thermal or touchscreen claim.

The integration reviewer opened all four current JPGs; the coordinator also personally viewed the latest desktop and portrait. Compared with the `f4d24d6` recovery, added trunks fill more of the wide side openings; smooth wet stones, pool reflections and depth layers remain visible. Repetitive trunk/bark forms, sparse bare branch silhouettes at the far sides, flat-looking foreground leaves/dew and uniform pale distance still warrant artistic review. The landscape/motion pair supports a changed rendered frame, not a continuous-motion comfort judgment. No final quality acceptance follows from the green owner CI or these stills.

Remaining evidence: exact newer shared-integration checks with successful App PNGs, Forest lifecycle/disposal, native visibility boundaries and outstanding source/quality findings. Preserve the30-world design and isolated renderer ownership. Keep the PR draft until technical release gates are complete.
