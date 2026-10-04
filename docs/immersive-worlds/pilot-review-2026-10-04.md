# Draft pilot review — 2026-10-04

This record separates owner-supplied evidence, the coordinator's actual image review, local integration checks and remote CI. Admission means available for draft testing, not final artistic approval. No main merge is authorized at this checkpoint; wait for the user's later instruction.

## Exact source and integration state

| Item | Recorded state |
| --- | --- |
| Original core base | `1bb79ac572e8568676881bbc7b4404f1bac443e8`; retain its historical test record |
| Current local main baseline | `14940149cc5c0fccb778b58d4d755a04aea55e53`, preserving independently merged sea PR #51 |
| Protected renderer code | `components/rainyWindow/**` and `components/oilSea/**` exactly match current `origin/main`; no pilot integration edits |
| Forest PR #49 source | `6a58c254a8d8d4b36d34947527fad1f2daf3df45`; owner source/assets included unchanged |
| Café PR #50 source | `c0de2c42bd803545cc1675587eda6ffc84aef9aa`; owner source/assets included unchanged |
| Current local registry | Only `amb:morning_forest` and `amb:focus_cafe` admitted for draft QA |
| Remote draft PR #48 | `c58ba637aa1bebbd3bbb762403cb34b1f4f28059`; predates the new local main/forest/café integration |
| Remaining scope | Cosmic has no reviewed admission; the other 27 worlds are not implemented here. The final 30-world goal awaits their owners and quality decisions |

Do not describe the current local additions as pushed, previewed or deployed based on the older remote PR head. Both pilots keep `active: boolean` as their only required prop, the existing shared motion/look host and a five-second disposal grace period. Their optional interaction callbacks remain unconnected. This admission adds no audio engine, sound assets or shared audio behavior change.

## Forest evidence and review

Owner run: [CI37225693631](https://github.com/alibowbow/brainwave/actions/runs/37225693631), source `6a58c25`.

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

The public `/immersive-worlds/forest/qa/forest-qa.mjs` is still the **old `989186c` snapshot**, with unchanged blob `91b74a7849e327071554d10006cf7c6e833e970d`. Do not label its renders as latest `6a58c25` evidence. The shared CI uses the worker-owned Vite source entry via `SCENE_FOREST_HARNESS_URL` to pair current source-harness captures with the built app without rewriting worker assets.

## Café evidence and review

Source: `c0de2c42bd803545cc1675587eda6ffc84aef9aa`. Owner evidence lives under `components/immersiveWorlds/cafe/qa/screenshots/`: four PNGs, `manifest.json` and `results.json`; context and limitations are in the owner's `qa/VALIDATION.md`.

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

## Integration verification ledger

| Exact checkpoint | Outcome and boundary |
| --- | --- |
| Foundation `cdf746f`, [CI37224743626](https://github.com/alibowbow/brainwave/actions/runs/37224743626) | All four original browser commands passed. Historical core evidence predates pilot admission and current main. The coordinator viewed focus-player and sea-fullscreen PNGs from that run |
| Integration `7c96d9c`, [CI37225839161](https://github.com/alibowbow/brainwave/actions/runs/37225839161) | Completed with failure: four original browser commands passed; worlds failed at the app desktop 1440px PNG after 120 seconds. Earlier standalone and app checks below remain valid within their exact source scope |
| Remote draft `c58ba63`, [CI37226216749](https://github.com/alibowbow/brainwave/actions/runs/37226216749) | Completed with failure: four original browser commands and all seven `verify:audio` checks passed; worlds failed on the source harness second-holder screenshot after 120 seconds. Later app checks were not reached |
| Current local integration with main `14940149`, forest `6a58c25`, café `c0de2c4` | Typecheck, 184 unit tests, build and bundle passed. Initial JS 404.2/410 KiB; CSS 100.6/135 KiB. Browser/visual gates remain separate; these local additions are newer than remote PR #48 |

For `7c96d9c`, [artifact 11312183331](https://github.com/alibowbow/brainwave/actions/runs/37225839161/artifacts/11312183331) separates two source generations:

- The standalone **old public `989186c`** harness passed four viewport PNG captures, motion policies, same-canvas transfer, actual five-second disposal and fresh remount. These passes do not validate the later forest source.
- The actual **`531ecb2` app** passed its link/one-tap playback, visible and hidden player-chrome drag, and pause checks. Its 1440px desktop PNG then timed out after 120 seconds, leaving the later app viewport/fullscreen/lifecycle sequence incomplete.
- Recovery successfully saved `forest-failure.png` with ready real geometry and a paused renderer. The coordinator personally viewed that actual app image at `/workspace/scratch/ec736d2e8585/qa-integration-7c96d9c/qa/screenshots/worlds/forest-failure.png`. A successful recovery image is not a successful full world gate.

For `c58ba63`, [artifact 11312117214](https://github.com/alibowbow/brainwave/actions/runs/37226216749/artifacts/11312117214) uses the **`531ecb2` source harness**, not the older public bundle. Four viewport PNGs and motion policies passed. Its second-holder screenshot timed out after 120 seconds; later application verification was not run. The core four-command and seven-check audio passes are separate from this failed worlds gate.

The coordinator is changing shared screenshot capture to direct CDP with fast **lossless PNG** encoding, preserving full native viewport pixels and scene quality. This is a test-capture change, not a lower-resolution/quality rendering mode. It is **not yet verified**; no resolved-timeout or completed world-gate claim follows from the change alone.

The forest/café screenshots use software WebGL and emulated viewports, not a physical Fold. Owner viewport dimensions differ from the integration gate's 1440×1000, 344×882, 768×1024 and 1024×768 matrix; they do not replace those checks. Injected visibility signals are not native tab backgrounding. Two-holder canvas transfer is not browser/OS fullscreen. No device FPS, thermal, long-session stability or physical touchscreen claim is made.

Next evidence needed: exact integrated-head results with the revised capture path, protected regression after the current main merge, the unfinished integrated café and forest routing/fullscreen/lifecycle checks, owner responses to the visual observations and the remaining cosmic pilot. Preserve the approved 30-world plan and balanced Opus/Sonnet references without implementing the other 27 in this coordinator Work. Keep the PR draft until the user decides when to finish.
