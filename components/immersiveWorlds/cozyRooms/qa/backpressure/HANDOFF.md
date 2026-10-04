# CozyRooms one-batch checkpoint — integration blocked

Winter now passes its unchanged original fresh-ready 120,000 ms gate after disposal (disposal has a separate 30-second bound). **The overall four-world suite fails:** relax and sleep submit a deferred zero-time image after the existing pause assertion begins. The two-fresh-cycle and actual-context-loss suites also fail their stopped-input image assertions. Keep PR65 draft. Do not merge or waive these failures.

The authorized attempt is complete. No failed world was retried, no further production change was made after the browser failures, and no quality setting or assertion was reduced. The prior `024922a3` checkpoint, its CI success and all preceding original 120-second failures remain preserved.

## Exact source

| Item | Identity |
|---|---|
| Local production checkpoint | `56d3075eaf8cda076f7d25d53fac7b4026066bd9` |
| Runtime/QA checkpoint | `aa2d01f1a87a11dc208c48ada0ce157e6a595c81` |
| Production source SHA-256 | `c67f2b6e467841fbc3fe0897b6ff646db5dba968c3c5d54b896672c371e312a3` |
| Original-entry bundle SHA-256 | `597e78687fc1fc38eb317c6e4fb73ff41735d128c88804757d7135745980a947` |
| Engine SHA-256 | `8401b0e80ef802d9f0c3d527aa91a271ea0b25e8c043d68d30a60491a3671bba` |
| Unchanged shared host SHA-256 | `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684` |

[Frozen per-file identities](FROZEN_IDENTITY.json), [exact results](FINAL_RESULTS.json), [independent audit](INDEPENDENT_AUDIT.md), [PNG hashes](PNG_MANIFEST.json), and [all new artifact hashes](ARTIFACT_HASHES.json) bind the evidence. The bundle was first built with the uncommitted candidate at the recorded older Git HEAD; its exact bytes subsequently match all four original-world builds and both dedicated suites. The source hash, not that preparation-time Git label, identifies the tested code.

## Production delta

Only owned `engine.ts` changes in production relative to `024922a3`. Every real renderer call shares one retained WebGL2 completion fence. `clientWaitSync(sync, 0, 0)` admits another batch only after `ALREADY_SIGNALED` or `CONDITION_SATISFIED`; each accepted draw installs one fence and flushes. Null, failed/unknown waits, context loss and render errors are terminal. No `finish`, blocking wait, fixed FPS cap or automatic context loss is used.

While blocked, one latest image request and latest dimensions/DPR are retained. Backing-buffer writes and world/time updates wait for admission. Every interaction callback still runs once; only its resulting image demand coalesces. Active elapsed time retains the existing 50 ms step cap, and stop drops unapplied positive-time demand. Genuine zero-time resize/input/holder requests survive. An idle stopped fence is retained without polling; hidden/detached work suspends, disposal deletes the fence and clears owned scheduling/listeners. A requested completion has a finite 120-second failure deadline, separate from the original fresh-ready gate.

The currently unresolved contract is observable: retaining that final zero-time image can change `frames` after `running=false`, or leave an immediately checked native action without its image yet. Those are actual failed runtime expectations, not a reason to relabel polling as animation, invent a completed frame, drop the necessary final image or relax the tests.

Initial synchronous failures throw into this branch's unchanged host promise catch without an inline failed callback followed by false ready. Unit tests exercise the actual old host. The coordinator's newer shared core `693f495` adds its own post-render identity guard; it is **not present or tested as an integration here**. No shared-host patch was made, and no temporary newer-core comparison is used as acceptance evidence.

## Browser results

The original group ran once and stopped at relax. Each of the other three previously unrun worlds then ran once through the exact original `verify.mjs`; no world was retried. Test expressions, timeouts, original entry, shared host and source bundle are unchanged. A QA-only preload samples existing diagnostics/DOM at 1 Hz and records delegated original assertion failures. It issues no extra GL call/render/fence/readback, but has CPU/IPC/timing overhead and is not an uninstrumented execution.

| Check | Result |
|---|---|
| Relax original sequence | **FAIL:** final freeze at `verify.mjs:72`, frames `8 !== 7` during 180 ms paused assertion. Scene time remained `8.150000000000002`. Disposal/fresh gate not reached. |
| Sleep original sequence | **FAIL:** freeze at `verify.mjs:63`, frames `7 !== 6`; sampled time remained `8.100000000000001`. Later lifecycle checks not reached. |
| Nap original sequence | **PASS:** all 26 checks including disposal/fresh canvas. |
| Winter original sequence | **PASS:** all 26 checks, including the unchanged fresh-ready 120-second gate. |
| Winter two fresh cycles | **FAIL:** first dispose and fresh engine/canvas 2 succeed; trusted native Enter/click emits exactly one cup event (`.12`), but required paused frame is still `1`, expected `2`. Second cycle/final disposal are **UNRUN**. |
| Actual context loss | **FAIL overall:** trusted running `WEBGL_lose_context` event and `isContextLost=true`, old frame 4 stops, failed UI and disposal 1/1, fresh engine/canvas 2 ready. Subsequent native-input frame is `1`, expected `2`. Paused-loss case/final disposal are **UNRUN**. |
| Original motion-only proof | **UNRUN pixels:** unchanged prerequisite rejects the same-source failed lifecycle report at line 12 before launching a browser. Zero pixel checks; no partial passed-world report substituted. |
| Ten fixed-pose PNGs | **PASS:** byte-identical to the approved `6ba4eee` views; all 11 real PNGs including dynamic chrome inspected. |
| Typecheck / unit tests / app build / budget | **PASS:** 189 tests in 26 files, including 26 new protocol tests. Initial JS 402.6/410 KiB; CSS 99.5/135 KiB. |
| Published CI / preview | Preparation-time pending; exact published commit outcome is recorded in PR65 after publication. Local tests do not imply remote success. |

Only nap and winter contribute completed check labels (52). Failed reports retain `results: []`; partial progress logs are not converted into additional completed labels. The cycle/context-loss failure snapshots omit GPU diagnostics, so their exact pending/fence state cannot be reconstructed from another run. They do retain actual trusted input and callback evidence.

## Measured boundary and cleanup

All 65 in-page observer records reconcile exactly with externally persisted disk readback: relax 11, sleep 7, nap 22, winter 25. There are no gaps, conflicts, inspect errors or original-browser-close failures. Every sampled live/retired production counter has `maxInFlight <= 1` and `submitted - completed <= 1`. Protocol tests independently model unfinished batches and explicitly ensure deleting a sync does not complete it. These are per-engine admission measurements, not a native GPU execution trace or a cross-context global limit.

Winter's old engine entered/returned `renderer.render` **7/7** times; **6** fences were observed signaled. At disposal it still records **1 unconfirmed batch**, even though its retained sync count becomes zero. Its last observed wait is `TIMEOUT_EXPIRED`, with 488 nonblocking polls/482 timeouts overall. Deleting that last sync is not counted as completion.

On that exact original winter run, old synchronous disposal body was **5.7 ms**, fresh constructor **12.6 ms**, factory **579.5 ms**, first render **716.8 ms**, and constructor through first render return **1,321.5 ms**. These durations do not measure physical GPU resource reclamation. The shared host still retains a detached engine for **5,000 ms** before disposal; that grace is not GPU cleanup time.

The separate context-loss test's actual extension call took about **4,999 ms**, followed by its trusted event at about **5,007.3 ms** from the request. This is a driver context-loss boundary with a mounted holder, not the host's five-second grace. The failed UI retains `data-motion='running'` while the actual engine is stopped/disposed; no claim that the DOM motion label changed is made.

The evidence supports a remaining paused/static response contract conflict. It does not identify a shader/compile defect, prove a driver-only cause, or justify bypassing the original tests. No physical GPU leak/reclamation, real tab backgrounding, hardware DPR transition, hardware FPS/thermal result or full-app routing/fullscreen/audio integration was established. Original synthetic pointer/visibility/cancel/blur stimuli remain labeled synthetic; actual keyboard and chrome-button stimuli remain native.

## Coordinator action

Retain the measured one-batch candidate and its failures for review, but block integration. Decide explicitly how the required final static image can be delivered while preserving the existing immediate paused/input expectations; this checkpoint does not supply a passing solution to that boundary. There is no evidence here requiring a shared-host edit, and none is proposed as proven necessary. Do not replace the missing gates with CI, ten successful stills, the winter-only pass, clean disposal-body timing or prior-source drained diagnostics.

Publish only to `codex/cozy-rooms-bounded-visual-correction` / draft PR65 after guarding remote original `7373c1eeb5372fa9bebf41889ff2960643f3990e` and previous follow-up `024922a3a14db4b7e0d3a4f085d598e7fa3df715`. The final guard/published commit/tree belong in PR65, outside these immutable preparation-time results. Preserve main `14940149cc5c0fccb778b58d4d755a04aea55e53`, the full sea PR51, PR59, all other owners and the newer shared-core work. No merge, force push, manual deployment, settings/billing/permissions change or deployment deletion is authorized or performed here.
