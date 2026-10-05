# Static completion source and evidence review

This review compares the candidate with `2a8f9b97ba4982623da13ed6835a14c27ef7fae2`. The inspected checkout was `456ecde2cb70a67ccbad394c767de963dac97d53`, containing runtime commit `bfffa34` and the separate revised QA commit. The runtime is identified below by its exact bytes. This review used source reads, Git comparisons, and local hashing only; it did not execute tests, launch a browser, or modify runtime, harness, or test files.

The production change is confined to `engine.ts`: **31 added and 12 removed lines**, a net increase of 19 lines and 1,490 bytes (248 to 267 lines; 16,598 to 18,088 bytes). All 13 other Cozy Rooms production files and the shared host are byte-identical to the baseline. The change preserves required resized/static images until submission and acknowledgement. It also revises the acceptance boundary: stopped CPU animation and a fixed observation window are insufficient evidence that the latest image has completed on the GPU.

## Exact candidate binding

| Artifact | SHA-256 |
| --- | --- |
| Baseline `engine.ts` | `8401b0e80ef802d9f0c3d527aa91a271ea0b25e8c043d68d30a60491a3671bba` |
| Candidate `engine.ts` | `f9e6bc14c08ef5d125464fef8313eaa4539b9ea560ea87cb1ffca51f8e9e7c0a` |
| Current 14-file production source digest | `e3e7a278bad36a8d12f80403b03972728c11fa07436335346ff796d8f664edfa` |
| Current 18-file original-entry QA bundle digest | `0b0c53ed7a574d44f301bbd6ccaf4f72b9410616eaebd46a299551b927e5e516` |

The source and bundle digests were independently recomputed and matched `SOURCE_BUNDLE.json` and `/tmp/cozy-static-completion-bundle.manifest.json`. The manifest was created at `2026-10-05T00:06:54.696Z`, while Git HEAD was still the baseline and the candidate was a working-tree change. Its older `gitHead` is therefore not the candidate identity by itself; the matching source/bundle hashes identify the built bytes. The digest algorithm is the existing `qa/followup/common.mjs` algorithm: sorted relative filename, NUL, then file bytes for each included file, with no trailing separator between records.

## Runtime behavior and unchanged host dependency

The original shared host's active `ResizeObserver` path calls `setSize` but calls `renderFrame(0)` only when ready and paused. At the baseline, a busy fence could leave positive animation work pending after a real active resize. A subsequent `stop()` discarded that positive request without promoting the dirty size to a required zero-time image. No new resize event was guaranteed to arrive. The new test uses the real `LiveSceneHost` and its observer callback order to cover this sequence.

The candidate makes real size/DPR changes request a new image revision and pending zero-time work. `stop()` preserves an existing zero request and promotes any dirty revision or size to zero; it still discards unsubmitted positive time. The latest dimensions win. Backing-buffer changes, world update, and render remain behind the existing single-batch completion gate, so a blocked request does not advance the world clock.

Required images have separate requested, submitted, and completed revisions and timestamps. The engine captures the requested revision before applying size, updating the world, or entering the renderer. Successful rendering, fence creation, and flush associate that captured revision with the fence. A later action arriving inside the renderer cannot be acknowledged by the older frame's fence. Only an observed `ALREADY_SIGNALED` or `CONDITION_SATISFIED` advances completion; deleting a fence during failure or disposal does not.

Paused polling now continues for an outstanding fence even when `pending` is null. It can acknowledge the final submitted image without another update, clock advance, or render. An unfinished final batch remains subject to the existing 120,000 ms terminal deadline. Hidden or detached scenes suspend polling; visibility restoration resumes eligible work. Disposal cancels callbacks and clears handles without claiming completion. These completion counters describe per-engine admission and observed fence results, not physical GPU resource reclamation.

Interaction events, including zero intensity, request a revision. Holder/drag release requests a revision while preserving active camera easing; stopping then retains the required zero-time restoration. A first zero request after animation still updates the world. Same-size, same-DPR, unchanged zero requests remain eligible for the existing duplicate-frame skip.

The host remains unchanged and still has two relevant constraints:

- It marks ready immediately after its initial `renderFrame(0)` returns. The engine's existing initial failure path must throw into the host promise catch; a reentrant failure callback followed by a normal return could otherwise be overwritten with ready. The existing delayed-first-draw failure tests remain relevant when initial rendering was hidden.
- Final release stops the engine, detaches the canvas, and retains the existing 5,000 ms teardown grace. This patch does not equate that timer, disposal return, fence deletion, or detached-canvas collection with GPU completion. The revised browser runners retain the separate 30,000 ms disposal and 120,000 ms fresh-ready bounds.

## Unchanged production files

Each file below was compared byte-for-byte with the baseline. Paths are relative to `components/immersiveWorlds/cozyRooms/`.

| File | Unchanged SHA-256 |
| --- | --- |
| `CozyWorld.tsx` | `b7c92752ccbc0be952af4fc18d390068bc3231b69e5d34abb57c46d3b25edf45` |
| `HearthWorld.tsx` | `df5bd2f58715e20322723889d2ac929a74bdb841ce199b8e58e24e0a23a08e06` |
| `NapTerraceWorld.tsx` | `4a4dd1dbda3b06b5dbc950ac1a34c6c56f585f7691bbeeeae1a0644ec6fdc292` |
| `SleepRoomWorld.tsx` | `2929793bf7253a6a9278bd89af82c1d321997f99e7459effc2290019e4197d78` |
| `WinterLodgeWorld.tsx` | `fdfae5f274429cb1d6248a4ea37206c0a397ef6132f6c11bb36d68d0cf6aa248` |
| `contracts.ts` | `ca3b85aadd7087c6223e63140423048000c4caa58a91c016ad7d1cdaffa19ca6` |
| `cozyRooms.css` | `a183dc529a944beb80febd274e7c54ba7913b44c21d71a56f4ed1d706365501c` |
| `fireDetail.ts` | `797f47908f5f36630aa9b1627d690c7211b036e1670cffa06dc0c9b7e5ca7205` |
| `hearth.ts` | `03ba91cfd3ae4ccbc90f1c488aa9da25370a38f7e0dbac9c6d6c48943dcbba33` |
| `materials.ts` | `c4b269c21bde13aa3cecff36d76a5f267055e2292e837558fad211ed94dcb8ae` |
| `napTerrace.ts` | `5570239b6dce38f7299211bb15668f4e4208b55112ce7a58760fcf956c32f664` |
| `sleepRoom.ts` | `be04b438c4985649904b3919210ce1e819479bdbafa26b9219fe0071d4bbdb44` |
| `winterLodge.ts` | `9b7af50b63fc48577de1fef6bb2646c0cd8fb37515bcbfc3111de4e88557568f` |

The shared `components/liveScene/liveSceneHost.ts` is also unchanged: SHA-256 `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684`, 176 lines, 5,593 bytes. This source comparison establishes that scene geometry, materials, visual wrappers, and shared host bytes were preserved. It is not a substitute for candidate rendered-image validation.

## Original QA and report preservation

Of the **386 baseline-tracked Cozy Rooms QA files**, **385 remain byte-identical**. The sole changed existing QA file is `qa/backpressure/engine.test.ts`, with four added and two removed lines. Its stopped-fence test now requires completion polling and acknowledgement without an extra frame, reflecting the explicitly revised contract. The other existing assertions remain unchanged. The new test and revised browser runners are separate files under `qa/static-completion/`.

The preserved set includes all original browser harnesses, entry files, evidence images, reports, and historical logs. The following original harness hashes were independently checked:

| Path relative to `qa/` | Unchanged SHA-256 |
| --- | --- |
| `verify.mjs` | `87d6993d9fe2ff1f122706f523c9d2e1ba3e3591c2ed2d781d26a7bb4d49bad8` |
| `verify-group.mjs` | `d27bb25d8e0fbe5b3cfa7e3c0403518bde8b8bba4c0df53798e807192f7319c9` |
| `chrome-checks.mjs` | `b1174b5cf89bb57f909377095c12ac57ebd77c134a2fa053b9cfa2ec5c41f864` |
| `motion-proof.mjs` | `e59372d22b411f232de2712093e9f6e452b5b6d4379b77dea48ecb0b8467cf38` |
| `main.tsx` | `993eb008caf0ccd05bfb39172274d6997e37bc990f7b177d744c66304de6ca15` |
| `index.html` | `78f9c1916bba94ce57d449a7da43ffb3f692732cffaca6a2aaa9e0fee1aca7e6` |
| `recreation-cycle/verify.mjs` | `9f76b4973f7267af59e2e5769e41e549ea64ac2a1ca606181c29a7988acb80dc` |
| `context-loss/verify.mjs` | `5c71bc8887e44037c455baa0b6e8b7cad85b7d407c6ded4e7549717057dfe44c` |

The aggregate SHA-256 of all 385 preserved baseline QA files is `9161eb90cf2dd7a1ba29154f80ed8b9be2571f7b810663ea39b004d4b43b1c92`. This audit digest uses `git ls-tree -r --name-only` baseline path order, excludes only `qa/backpressure/engine.test.ts`, and hashes each repository-relative path, NUL, file bytes, NUL. Within that set, all **180 historical report/log files** also match. That subset selects `.json`, `.jsonl`, or `.log` files under `/evidence/` or with `RESULT` or `verification` in the filename; its digest using the same algorithm is `4e66de02a89ea86d1cced03221fe6d41895563bfb0e677630442332c457fbed1`.

The original failures remain failures. `qa/backpressure/FINAL_RESULTS.json` is unchanged, SHA-256 `01e20443d18d999889ebe8be640c6b967fecfe59ccc29481f865f5baec52e22b`. It records the failed original four-world aggregate, failed dedicated recreation and context-loss gates, and unrun dependent motion proof. A revised-contract pass cannot retroactively change those results.

## Correction to the prior native-input characterization

The dedicated original recreation and context-loss native-input checks were **not instantaneous**. After native Enter and callback arrival, they waited for stopped state, sampled frame/time counters, waited **180 ms**, sampled again, and then asserted exactly one additional frame. The relevant code is `qa/recreation-cycle/verify.mjs` (`assertStopped` and `nativeInput`) and `qa/context-loss/verify.mjs` (`stopped` and its native-input sequence).

Those checks establish a stopped CPU frame/time observation over that window. They do not await a required-image revision, a cleared pending image, or GPU acknowledgement. In both preserved dedicated failures, trusted native input and one cup callback were observed but the fresh engine still had frame 1 where frame 2 was required:

| Preserved report | Failure stage | Unchanged SHA-256 |
| --- | --- | --- |
| `qa/backpressure/evidence/winter-cycles/recreation-cycle.json` | `generation-1-native-enter` | `cefeaa2458770738fb65c2ef47285c3a17ce2ce6c426b13e3aeaebd4b8457c0f` |
| `qa/backpressure/evidence/context-loss/context-loss.json` | `generation-1-native-input` | `7e2bf0adf7b90f5aa87f071598036c824276a85fdefccde353b9efb5c0d8a7b2` |

Those reports omit GPU/image diagnostics. They do not establish the exact fence or pending state at failure, or eventual completion after the failure. The historical native PNG supplement under `qa/followup/` is different: its capture helper explicitly waits on a real GPU fence before taking the screenshot. These evidence types must not be conflated.

The new `completion.mjs` first requires the same live engine/canvas, fixed scene time, positive matching requested/submitted/completed image revisions, matching actual submitted/completed batch counts, and no dirty size, pending work, incomplete fence, timer, or failure. It then performs the 180 ms exact stability observation. The absolute completion deadline is not restarted by polling or coalescing. Reports explicitly identify `revisedContract: true` and `originalGateClaim: false`; this is a revised asynchronous-completion gate, not a claimed pass of the original observation boundary.

## Unit coverage and recorded local gates

The new `qa/static-completion/engine.test.ts` contains **nine cases** (246 lines; SHA-256 `73a0b75de36b26211d2e84fac08ef734553ec9b671d3f2a43bd843e377d3d6b8`). They use real Three scene/camera math, the real shared host where host order matters, and a controlled renderer/completion protocol. They establish JavaScript scheduling and accounting behavior; they do not execute a browser or real GPU.

| Risk | Concrete assertion |
| --- | --- |
| Active resize while a positive request is blocked, then host stop | The real host observer requests two sizes; only the latest 673×841 at DPR 2 is submitted after the old fence signals, with backing size 1346×1682 and exactly zero scene-time advance. Its new fence must then signal before full settlement. |
| Last static batch has no further request | Initial submission remains unacknowledged until a signal; polling retires it without another render. |
| Several actions while blocked | Three callbacks, including zero intensity, occur once each while their latest visible state coalesces into one required image at fixed time. |
| Action arrives inside renderer callback | The first fence acknowledges only the admitted revision; the later action requires a second image and its own acknowledgement. |
| Hidden final image | Polling stops while hidden and visibility return acknowledges the same image without another draw. |
| Final batch never signals | Even with `pending=null`, 120,000 ms produces terminal failure; deleting the handle does not acknowledge the image. |
| Wait failure or context loss | Two cases verify cleared handles never become image completion. |
| Disposal with an unacknowledged image | Completion remains unchanged, cleanup is idempotent, and no callback or deferred render survives. |

The existing 26 backpressure cases remain, covering initial/active/static admission, deferred size/DPR, hidden/detached restoration, delayed first draw, initial host failure, context loss during size/render, reentrancy, null/throwing fences, flush/wait failures, finite timeout, cleanup exceptions, holder movement, and late initialization after disposal. The existing 13 static-redraw cases remain, covering duplicate zeros, real size/DPR changes, holder restoration, interaction invalidation, first zero after motion, nonzero look/aim, render failure, and stop/disposal behavior. Together these three files account for 48 focused engine cases.

Root's retained local pipeline logs in `results/` record the following. No gate was rerun for this source review.

| Log | Recorded result | SHA-256 |
| --- | --- | --- |
| `results/unit.log` | **198 tests passed in 27 files**, from this checkout; duration 2.91 s | `af3e661dbdb770001d168ea80fd689a000cf4405a600f1452c2436e8596197d0` |
| `results/typecheck.log` | `tsc --noEmit`; no errors printed. The log has no standalone exit-code field. | `f351d6cc7f837f6090b2d50736a5ed84cc07aee8c71a95acdbdeca9a31a22ceb` |
| `results/build.log` | Vite application build completed; 1,782 modules, 5.96 s | `f1cb26051cb519cbb7fd376c996d2f43601fc1ea69f125499d44db1e8485b9d6` |
| `results/budget.log` | Initial JS 402.6/410 KiB; compiled CSS 99.5/135 KiB | `641c2dd8d786742e25c33ce221f1f704e13febc42f4d77eb9c0d60f7cb8db2c8` |
| `results/qa-build.log` | Original-entry QA bundle built; recorded source/bundle digests match the independently checked bytes above | `cf9b9dbed4c77038e327f11c4037780b9f450d94cef62a84cfe8a191f92a6e24` |

These logs and source checks do not supply candidate browser acceptance by themselves. Revised four-world, recreation, actual extension-triggered context-loss, and motion results belong to their separate frozen-run evidence. No physical GPU fault, resource reclamation, hardware FPS, or thermal behavior is established here.
