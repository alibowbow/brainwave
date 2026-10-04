# PR65 winter recreation follow-up — integration blocked

This continuation preserves the approved visual source and evidence at `6ba4eee62f490360decb1c51007e8d3e604a7315`. It changes **only `engine.ts` in production**, plus owned QA. The resize correction demonstrably removes redundant backing-buffer writes, but **does not resolve the original winter recreation gate**. Do not merge or mark lifecycle acceptance from this handoff.

The existing branch remains `codex/cozy-rooms-bounded-visual-correction`, draft PR #65, based on original PR #59 / `codex/cozy-rooms-four-worlds` at `7373c1eeb5372fa9bebf41889ff2960643f3990e`. No original-branch write, main merge, force-push, shared-core edit, other-owner edit, or further aesthetic change is included. Main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including sea PR #51, remains an ancestor.

## Minimal production change

The exact installed Three 0.186.1 renderer source was inspected before editing. Its `setPixelRatio` unconditionally calls `setSize`, and `setSize` writes both canvas backing dimensions even when equal. The owned engine now compares Three's actual pixel ratio and logical size before these calls. Real size/DPR changes, the existing DPR clamp 1–2, camera/world resize updates and the shared host's final static redraw remain intact. No cache of disposed resources, rendering-quality reduction, fixed FPS, shader/material/reflection change, scheduler, fence or new context policy is introduced.

Complete clean probes show backing writes **12 → 2 per mount**, while retaining two static draws and scene time 8. The original workload's first generation shows **76 → 8** writes and **68 → 0** same-value writes, retaining 28 static draws. Active-frame totals differ with wall timing, so these are not equal-workload performance measurements. The probes use DPR 1; preservation of real DPR changes is source-reviewed, not dynamically established by these runs.

## Diagnosis and remaining blocker

[DIAGNOSIS.md](DIAGNOSIS.md) and [comparison.json](comparison.json) contain first/second constructor, factory, init, first-render, actual host status, lifetime, canvas identity/dimensions/connection and context observations, with per-file source and evidence hashes.

- The unchanged-source clean recreation passed its phase assertions, but browser close separately exceeded a 10-second cleanup bound. This is not a uniformly clean execution result.
- The unchanged-source original workload passed under the probe. Its recreated first `renderer.render` call took **100.196 seconds synchronously**, then returned and allowed the host to publish ready. Constructor/context creation and initial backing-size calls also slowed. No caught failure or lost context appeared in that complete stream.
- The size-guard probe also passed. Its original-workload stream lacks events **386–396**. Factory-entry to first-render-return spans **49.7622 seconds**, but factory/init/render durations cannot be separated across that gap. Those values are unavailable, not estimated.
- These observations do not identify shader compilation, a previous GPU queue, resource reuse, a missed mount, a host failure or a driver-only limit as the confirmed cause. There is no basis for changing shared host code or adding speculative production scheduling.

The **final uninstrumented** original four-world run again failed at `qa/verify.mjs:75:45`, waiting 120 seconds for winter's recreated ready canvas after the disposal assertions passed. It completed relax/sleep/nap, 26 labels each, **78 total**. Its empty captured error array does not reveal the actual host status or caught exception at this timeout. The failed run has no phase instrumentation, so a successful probe cannot retroactively supply that missing state. See [new failure](evidence/final-original/failure.json), [raw log](evidence/final-original/execution.log) and [winter report](evidence/final-original/nature-winter_lodge/verification.json).

Both earlier failures and their motion-only UNRUN record remain byte-for-byte unchanged under [the approved visual handoff](../followup/HANDOFF.md). This is a third retained original-gate failure on the new source, not a replacement history or an isolated passing retry. No timeout or ready assertion was relaxed.

## Final source-bound results

| Check | Result |
| --- | --- |
| Original four-world suite, unchanged | **FAILED**: 78 completed labels; winter recreated-ready wait timed out at 120 seconds |
| Dedicated winter two consecutive dispose → fresh ready/canvas → input → dispose cycles | **PASS**: engines 1/2/3 and distinct canvas objects 1/2/3, two trusted keyboard cup actions, final created=disposed=3, browser cleanup completed |
| Original motion-only proof | **UNRUN pixels**: its unchanged prerequisite rejected the current failed winter verification before opening a browser; no bypass |
| Typecheck | **PASS** |
| Unit tests | **PASS**, 150 tests / 24 files |
| Application build and bundle budget | **PASS**, initial JS 402.6/410 KiB; CSS 99.5/135 KiB |
| Final real PNGs | **PASS**: all 11 inspected; all ten cold views are byte-identical to approved PR65 images |

The dedicated [cycle report](../recreation-cycle/evidence/final/recreation-cycle.json) uses the original uninstrumented entry and exact final bundle. It begins with actual animation, then pauses; each fresh generation accepts one native keyboard Enter through the original cup button, yielding one trusted click and one bounded callback (intensity 0.12), exactly one zero-time static redraw, and no ambient time advance. Final disposal follows the second input. This smaller workload does **not** clear the failing original workload.

Chrome controls, drag-versus-tap, returning drag, cancel, hidden/reduced-motion/static behavior and holder reuse remain in the unchanged original suite. Its PointerEvents and visibility change are explicitly synthetic; keyboard control activation is browser-native. The dedicated cycle's trusted keyboard events do not claim physical-device testing. Partial winter checks are not assigned an invented count.

The configured host retention remains **5000 ms**. The dedicated cycle observes unmount-to-disposed in approximately **5039–5041 ms**, including that grace and polling; it does not measure the disposal body. Separate phase probes measure synchronous disposal return. Neither timing measures physical GPU reclamation. No forced context loss, physical hardware FPS/thermal claim, real background-tab test or integrated-app acceptance is made.

## Exact identities and images

| Identity | SHA-256 |
| --- | --- |
| Approved visual production source | `673d3f3dcf1e8659a6d2784435aac6e6601a6da592cb74ca4a3a38b217954bf9` |
| Final production source | `4d83102d72152dec1a831b592e3624d608197c2a9714d5a22a4ca2ea9807ee2c` |
| Final original-entry bundle | `94d67a1b92ff2723ecd68620c2547ec8c036bb3f08907f2391cdde48067180be` |
| Final engine | `20e8b1a9f161716087b9f6e15659e771381caa1f035aa8e6942102eba22f5674` |
| Unchanged shared host | `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684` |
| Installed Three renderer | `9e8740aad691246b31b3704014e8f3bbd38a8e7bf4b1b4d23868541b023cc63a` |

[PNG_MANIFEST.json](PNG_MANIFEST.json) records dimensions, exact before/after image hashes and byte comparisons. For direct review: winter [approved portrait](../followup/evidence/final/nature-winter_lodge-portrait.png) / [current portrait](evidence/final-original/nature-winter_lodge/nature-winter_lodge-portrait.png), and [approved landscape](../followup/evidence/final/nature-winter_lodge-landscape-viewport.png) / [current landscape](evidence/final-original/nature-winter_lodge/nature-winter_lodge-landscape-viewport.png). The post-input chrome PNG differs with active timing; it is not included in cold-byte equality.

[FINAL_RESULTS.json](FINAL_RESULTS.json), [ARTIFACT_HASHES.json](ARTIFACT_HASHES.json), and [the bundle manifest](evidence/final-bundle-manifest.json) bind the final reports and bytes. Recorded `gitHead=6ba4eee…` identifies the base while the engine was a working-tree change; the full source digest distinguishes the tested candidate. Publication uses a commit whose complete tree must match the local validated tree, with the exact published commit recorded in PR65. No test result is inferred solely from a commit label.

## Coordinator decision required

Keep PR65 draft and main integration blocked. The independently verified no-op correction is suitable for review as a small delta; it is not a recreation fix or evidence that only a software driver limit remains. Further work should first choose a bounded hardware-backed reproduction of the same source and original harness, or a targeted GL-boundary investigation with reliable event reconciliation. The current evidence does not justify a shared-host patch or speculative fences/backpressure.

The integration owner must explicitly resolve or accept the remaining original-gate failure, then satisfy the original motion-only prerequisite and run that proof. Integrated application routing/fullscreen/audio, actual hidden-tab behavior, physical devices, hardware performance and GPU reclamation remain unrun/unmeasured. Preserve original PR59, the entire sea PR51/main baseline and the other active owners. This worker performs no merge.

The sole required prop remains `active:boolean`; callbacks stay bounded and there is no independent AudioContext. Approved compositions, all public assets, wrappers, registries, rainyWindow, oilSea and other scenes remain untouched. QA evidence is not a public production asset or precache input.
