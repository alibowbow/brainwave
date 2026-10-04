# Draft pilot review — 2026-10-04

This record separates owner-supplied evidence, actual image review by the integration team, local integration checks and remote CI. Admission means available for draft testing, not final artistic approval. Final main merge remains on hold until the user's later instruction.

## Exact source and integration state

| Item | Recorded state |
| --- | --- |
| Original core base | `1bb79ac572e8568676881bbc7b4404f1bac443e8`; retain its historical test record |
| Current local main baseline | `14940149cc5c0fccb778b58d4d755a04aea55e53`, preserving independently merged sea PR #51 |
| Protected renderer code | `components/rainyWindow/**` and `components/oilSea/**` exactly match current `origin/main`; no pilot integration edits |
| Forest PR #49 source | `f4d24d60c92317f9bc158b1c00af217faa1d923d`; reviewed owner files merged locally unchanged |
| Café PR #50 source | `8b9383b8086b99bec04eb2273a68ec9d2bd76f43`; reviewed owner files merged locally unchanged; renderer code `215c50f` |
| Cosmic PR #52 source | `a0178faaf919a07cd04bdf53a5efa476b58b8e5e`; reviewed owner files merged locally unchanged |
| Draft admission | All three pilot IDs are explicitly lazy-registered for draft testing. Latest local typecheck, 188 tests across 28 files, build and bundle passed; no final quality acceptance |
| Remote draft PR #48 | `7816e3b3b9704aed0ad94c87038acf50bfb43b21`; includes main `14940149`, forest `6a58c25` and café `c0de2c4`, before the local cosmic admission |
| Remaining scope | The other 27 worlds are not implemented here. The final 30-world goal awaits their owners and quality decisions |

The latest local admissions are not yet pushed and are not certified by the older remote run. All three owned trees are byte-identical to the recorded heads; protected renderer directories remain byte-identical to main `14940149`. All pilots keep `active: boolean` as their only required prop, stay within owner paths, use the existing shared motion/look host and retain a five-second disposal grace period. Optional interaction callbacks remain unconnected. These admissions add no audio engine, sound assets or shared audio behavior change.

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

The public `/immersive-worlds/forest/qa/forest-qa.mjs` is still the **old `989186c` snapshot**, with unchanged blob `91b74a7849e327071554d10006cf7c6e833e970d`, including at `f4d24d6`. Do not label its renders as newer forest evidence. Shared CI uses the worker-owned Vite source entry via `SCENE_FOREST_HARNESS_URL` to pair exact source-harness captures with the built app without rewriting worker assets.

Latest `f4d24d6` changes only six forest-owned files. It adds varied stands/saplings and understory, batches distant trees and ferns, introduces smooth procedural wet stones with moss, revises dew/light/fog and narrows very wide landscape framing. These address prior review concerns in source; no new screenshots or result report are committed, so visual improvement remains to be established on this head.

The new isolated verifier supports native-size same-renderer readback, records capture methods/dimensions/hashes, continues independent lifecycle checks after capture failure and separately attempts real tab/window visibility before the synthetic hook. Production resolution and RAF policy are unchanged. Two owner follow-ups remain: `forest.browser.test.ts` resets `preferDirectCapture` to `false` at test start, overriding its configured default; and distant-tree batching uses an identity `modelMatrix`, collapsing the branch-wind phase that previously varied by tree position. The second is a source-level motion-variation concern, not an observed latest-render failure. Earlier `6a58c25` passes do not certify these changes.

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

The owner's isolated JSON reports **19 passed check groups** covering rendered movement, active pause/resume, same-canvas transfer, bounded look drag and tap guard, nearby glow, reduced motion, offscreen pause, an injected hidden-document signal, viewport buffers and three delayed-disposal/remount cycles. Behavior checks used an 800×500 software-WebGL viewport. The three clean JPGs were captured separately at DPR 1 with reduced motion; a separate 390×844 DPR-2 check produced a 780×1688 drawing buffer. These are owner-executed results, not coordinator-executed integrated browser tests. Owner typecheck, 151 tests, build and bundle results belong to the original `1bb79ac` base and must not be substituted for current integration results. Separate local checks and their exact pilot combination are recorded below; cosmic shared-app browser verification remains pending.

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
| Current remote draft `7816e3b`, [CI37227183207](https://github.com/alibowbow/brainwave/actions/runs/37227183207) | Completed with failure. Four original browser commands and all seven audio checks passed. Forest `6a58c25` source harness passed all nine checks; its app PNG timed out. Café `c0de2c4` app passed seven checks, then Back re-entry frozen-frame verification failed. Detailed scope follows |
| Latest local combination: forest `f4d24d6`, café `8b9383b`, cosmic `a0178fa` | Typecheck, 188 tests across 28 files, build and bundle passed. Entry JS 404.2/410 KiB; CSS 100.6/135 KiB. Owned trees match exact heads and protected trees match main `14940149`. Exact-head browser gates remain pending |

For `7c96d9c`, [artifact 11312183331](https://github.com/alibowbow/brainwave/actions/runs/37225839161/artifacts/11312183331) separates two source generations:

- The standalone **old public `989186c`** harness passed four viewport PNG captures, motion policies, same-canvas transfer, actual five-second disposal and fresh remount. These passes do not validate the later forest source.
- The actual **`531ecb2` app** passed its link/one-tap playback, visible and hidden player-chrome drag, and pause checks. Its 1440px desktop PNG then timed out after 120 seconds, leaving the later app viewport/fullscreen/lifecycle sequence incomplete.
- Recovery successfully saved `forest-failure.png` with ready real geometry and a paused renderer. The coordinator personally viewed that actual app image at `/workspace/scratch/ec736d2e8585/qa-integration-7c96d9c/qa/screenshots/worlds/forest-failure.png`. A successful recovery image is not a successful full world gate.

For `c58ba63`, [artifact 11312117214](https://github.com/alibowbow/brainwave/actions/runs/37226216749/artifacts/11312117214) uses the **`531ecb2` source harness**, not the older public bundle. Four viewport PNGs and motion policies passed. Its second-holder screenshot timed out after 120 seconds; later application verification was not run. The core four-command and seven-check audio passes are separate from this failed worlds gate.

For remote `7816e3b`, [artifact 11313141336](https://github.com/alibowbow/brainwave/actions/runs/37227183207/artifacts/11313141336) has archive SHA-256 `938325e7fa8f4e71f71d85c1f9929a24a95f407b365e7b95ac7edbd4728664a7`:

- Forest **`6a58c25` source harness** passed all nine checks: four viewport PNGs, motion policies, second-holder transfer, actual five-second disposal and remount. The app passed route/one-tap playback, drag and pause, then its native 1440px desktop PNG timed out after 120 seconds. No complete forest app gate is claimed.
- Café **`c0de2c4` app** passed seven checks, including four viewport PNGs, CSS fullscreen, reduced motion and simulated hidden state. Back re-entry then failed a frozen-frame assertion (`49 → 50`). Final disposal and standalone verification were not executed.
- The coordinator personally viewed the new focus, sea and café app desktop PNGs from this run. These are stills from this exact older integration, not latest `f4d24d6`/`8b9383b` evidence or continuous-motion/physical-device tests.

The shared host permits paused ResizeObserver redraws through `renderFrame(0)`. The earlier café failure did not capture initial simulation time, so the extra frame cannot be declared benign. The revised still helper anchors the simulation clock and canvas identity through 400ms of layout settling, then requires 500ms without frame, time or dimension changes. Its exact-head CI result is pending; it does not retroactively pass the failed assertion.

Shared screenshot capture uses direct CDP with fast **lossless PNG** encoding at the full native viewport. A single 120-second capture deadline now covers preparation through cleanup, with stage logs and report checkpoints. A stalled capture fails the visual gate; subsequent captures on that page are recorded not run. These changes preserve scene quality and resolution and await exact-head CI. The earlier forest timeout remains unresolved evidence.

CI retains scene-core, audio, forest, café and cosmic evidence as separate artifacts and bounds each pilot command with a 20-minute supervisor. The still helper's failure paths passed mock review; these workflow/helper changes still require actual browser CI.

The three pilots' screenshots use software WebGL and emulated viewports, not a physical Fold. Owner captures do not cover the integration gate's entire 1440×1000, 344×882, 768×1024 and 1024×768 matrix and do not replace those checks. Injected visibility signals are not native tab backgrounding. Two-holder canvas transfer is not browser/OS fullscreen. No device FPS, thermal, long-session stability or physical touchscreen claim is made.

Next evidence needed: remote exact-head browser checks, latest forest visual evidence, the unfinished three-pilot routing/fullscreen/lifecycle matrix, and owner responses to the visual, source and provenance findings. Preserve the approved 30-world plan and balanced Opus/Sonnet references without implementing the other 27 in this coordinator Work. No pilot has final quality acceptance; keep the PR draft until the user decides when to finish.
