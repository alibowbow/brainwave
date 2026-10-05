# PR65 GL-boundary continuation — integration blocked

**The original winter recreation gate still fails. Keep PR65 draft; do not merge or waive its 120-second ready-canvas requirement.** This continuation completed the requested GL comparison, made one small owned correction, and retained the failed final acceptance run. Smaller lifecycle passes and cold PNGs do not replace that failure.

Branch: `codex/cozy-rooms-bounded-visual-correction`, [draft PR65](https://github.com/alibowbow/brainwave/pull/65), based on original PR59 branch `codex/cozy-rooms-four-worlds` at `7373c1eeb5372fa9bebf41889ff2960643f3990e`. The remote continuation started at `f1540653283a09ddb91427a2e1692466275db2c7`. Publication commit/tree and required CI status are recorded in the PR after the final remote-head guard; the published tree must equal the locally reviewed tree.

## What changed

Only `cozyRooms/engine.ts` changed in production since f154. It skips an exact-zero-time request only after a successful zero-time frame, with unchanged state and exactly centered look/aim. Initialization, real size/DPR changes, every `releaseDrag()` and every returned interaction invalidate the saved state. The first zero update after animation always executes, preserving sleep's settling behavior. The guard precedes world updates/uploads and counts only actual successful renderer calls.

The correction adds no deferred draw, fence, timer, fixed FPS limit, resolution reduction or material/reflection change. It does not bound all outstanding GPU work. All other changes are owned QA/evidence. Shared host/core, wrappers, registries, other scenes, assets and approved aesthetics are unchanged in this continuation. The prior resize correction remains intact.

## Measured GL comparison

The [diagnosis](../gl-boundary/DIAGNOSIS.md) and [comparison](../gl-boundary/COMPARISON.json) bind the **earlier** production source `4d83102d…`, not the final candidate below.

- First drain attempt: a late successful static redraw invalidated fence coverage. It stopped before final disposal/recreation. Its separate browser-cleanup timeout remains recorded.
- Corrected bounded drain: one verified zero-delta redraw required a replacement fence within the same absolute 120-second budget. The latest fence signaled at **110,616.6 ms**, approximately **108,310.1 ms after the last old submission**. Both syncs were deleted once. No later old submission/backing write occurred through disposal. Fresh synchronous render took **684.9 ms**; this altered diagnostic passed.
- One same-bundle undrained control: original 26-check sequence completed; fresh synchronous render took **51,116.8 ms**. Its overall diagnostic failed separately on browser cleanup exceeding 10 seconds.

Old submission counts differed: covered **49 / 31,029** versus control **51 / 32,285** renderer returns / summed `info.render.calls`. These are CPU submission statistics. Added wait/flush time, unequal work and instrumentation prevent an exact causal or performance claim. The control's selected native compile/link/parameter calls totaled only about 8.7 ms; its largest untraced interval was 28,029.3 ms between `linkProgram` return and `getProgramParameter` entry. Other GL calls and driver work remain unlocalized. Neither a compile defect nor a driver-only cause is established.

All three in-page phase arrays match persisted read-back bytes through their declared watermarks: **668, 1,180 and 926 events**, with no gaps or content conflicts. The historical missing-phase problem is not hidden. Five-second host grace, 6.0/6.9 ms synchronous dispose bodies, pre-disposal fence completion and physical GPU reclamation are distinct; physical reclamation was not measured.

## Final source-bound validation

| Gate | Result |
|---|---|
| Unchanged original four-world suite | **FAILED:** relax/sleep/nap completed 78 labels; winter again timed out at `verify.mjs:75:45` after disposal assertions, waiting 120,000 ms for fresh ready canvas. Exit 1 surfaced naturally; outer 600-second watchdog did not fire. |
| Two consecutive winter recreation/input/dispose cycles | **PASS:** engines/canvases 1/2/3; two trusted native Enter cup actions; final created=disposed=3; cleanup finished. |
| Actual running and paused context loss | **PASS:** `WEBGL_lose_context`, trusted loss events and `isContextLost`; failed-state cleanup, fresh native input and final disposal; four distinct identities, created=disposed=4. |
| Original motion-only pixel proof | **UNRUN:** original prerequisite rejected failed lifecycle verification before browser creation. No bypass or pixel-motion pass. |
| Typecheck / unit tests | **PASS:** 163 tests in 25 files, including 13 new behavioral unit tests. |
| App build / bundle budget | **PASS:** 402.6/410 KiB initial JS; 99.5/135 KiB CSS. |
| Real final PNGs | **PASS:** all 11 inspected; all ten cold views byte-identical to approved PR65. Dynamic chrome timing differs. |

See [FINAL_RESULTS.json](FINAL_RESULTS.json), [original failure log](evidence/final-original/execution.log), [cycle report](evidence/winter-cycles/recreation-cycle.json), [context-loss report](evidence/context-loss/context-loss.json), [motion status](MOTION_STATUS.json), and [PNG hashes](PNG_MANIFEST.json).

The final failed original run is uninstrumented: its old submission count, caught host status/error and precise first-draw boundary cannot be reconstructed from `results: []`. Earlier-source measurements must not be substituted. Its original thrown stack does identify the fresh-ready wait. All three preceding unchanged-gate failures and their earlier motion-unrun records remain untouched.

Native browser keyboard/button input is distinguished from the original synthetic PointerEvent, visibility, cancellation and blur checks. Loss testing exercises a real SwiftShader context, not a physical GPU fault. Its failed DOM retains `data-motion=running` while the engine is stopped; no claim of a paused DOM attribute is made. Inherited Three shadow fallback warnings remain recorded. Hardware FPS/thermal performance, physical reclamation, real tab hiding, hardware DPR changes and integrated-app routing/fullscreen/audio were not tested here.

## Exact identity and coordinator handoff

```text
Final production source SHA-256
588e2d1aa9721bae82c9b5de3fcc48a8d01955c47bba8f9a02398aa7be40a297
Original-entry bundle SHA-256
3a3888b3703fda1d03bf0198cbccaa022acb0d1c480da9a77a313eb91632f376
engine.ts SHA-256
556388ddf4fe7034d05cc4d5fcfc08e39aa72207079c1c68710c6d29d574dc30
Shared host SHA-256, unchanged
a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684
```

[FINAL_IDENTITY.json](FINAL_IDENTITY.json) includes individual source/bundle hashes, verified again after the final run. [ARTIFACT_HASHES.json](ARTIFACT_HASHES.json) inventories this continuation's artifacts. Local production commit `15e8d80eb3e6982858a8ef8fa24f40b388642cb7` and test HEADs describe checkpoints; exact source bytes bind every test. The publication API may assign a different commit ID while preserving the complete validated tree.

The duplicate-static correction is reviewable, but **it did not resolve winter recreation**. Stop this bounded attempt without further speculative scheduling or retries. The coordinator's next diagnosis should localize the retained untraced GL boundary on the final source; this evidence does not justify modifying shared host or declaring a software-driver-only limitation. Lifecycle and main integration remain blocked until the original gate is resolved.

Preserve main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including the entire sea PR51. Integrate the original PR59 dependency and this bounded follow-up only under the coordinator's ownership after the blocker is resolved, then rerun integrated checks against their current shared core. No main/other-branch merge, original-branch write, force-push or merge is authorized by this handoff. Required remote CI is tracked in PR65 and cannot erase the owned gate failure.
