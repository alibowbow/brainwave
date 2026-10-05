# Old-context completion and fresh-context comparison

The covered diagnostic observed an old-context fence complete after **110,616.6 ms**, then recreated winter with a **684.9 ms** first synchronous `renderer.render`. The same browser probe without a drain completed its original 26 sequence checks, with **51,116.8 ms** in that first fresh render. Its overall diagnostic failed separately because browser cleanup exceeded 10 seconds. This is evidence consistent with outstanding old-context work contributing to later synchronous delays. It does not identify the internal driver/GPU cause or establish a production fix.

All three runs used production-source SHA256 `4d83102d72152dec1a831b592e3624d608197c2a9714d5a22a4ca2ea9807ee2c`. The complete measurements, phase sequence IDs, start/end times, actual evidence hashes and image comparisons are in [COMPARISON.json](COMPARISON.json). Existing evidence was read without modification.

| Run | Sequence result | Comparison/overall result |
|---|---|---|
| [First drain attempt](evidence/drain/diagnostic-sequence.json) | Stopped before final disposal/recreation; no partial check count inferred | Invalid coverage after a late paused draw; separate 10-second browser-cleanup failure |
| [Covered drain](evidence/covered-drain/diagnostic-sequence.json) | 26 checks completed | Altered diagnostic PASS; cleanup completed |
| [Undrained control](evidence/undrained-control/diagnostic-sequence.json) | Original 26-check sequence completed | Overall diagnostic FAIL solely on 10-second browser-cleanup deadline |

None is claimed as an unchanged original-gate pass. The covered runs insert a drain after all three rapid remounts and before the final unmount. The undrained control's full original try/for sequence is byte-identical: original and executed SHA256 are both `c6a541be6d7ade472d17b023e08bc3a79edb3206ca7e52418ac0df75bdc0c6f0`. Its observers still instrument production boundaries.

The covered and undrained runs have identical browser-bundle SHA256 `853c25e69ea20a411a5ebcbfd092c39d97e9f75bc9935b0d908bfe08b0d21ed4` and browser-entry SHA256 `cfb1f830480b0cafda5d6d9604e25f17966b05cb33c23c0e46c62057ea925b4b`. The control asserted both bindings before opening the page. Each run also verified unchanged source and bundle hashes at finalization. Version 1 used a different observation bundle, recorded in its retained [manifest](evidence/drain/instrumentation-manifest.json).

The installed dependency was Three **0.186.1**; `WebGLRenderer.js` SHA256 was `9e8740aad691246b31b3704014e8f3bbd38a8e7bf4b1b4d23868541b023cc63a`. The shared host SHA256 was `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684`. These are source-byte facts, not assumptions about another Three release.

The first attempt exposed a valid measurement problem: a same-size `setSize(960,700,1)` was followed by a successful paused `renderFrame(0)` about **2,614.4 ms after fence placement**. Frames/renderer returns advanced 51→52 while scene time stayed fixed; there were no backing writes. All 155 polls had returned `TIMEOUT_EXPIRED`. The probe deleted its one fence and ended at 2,812.2 ms, without final unmount or fresh-context comparison. The existing host's paused resize path is consistent with that pair, but callback identity was not traced. It was not active RAF animation.

Version 2 accepted only a contiguous, explicitly observed successful zero-dt call that advanced exactly one engine frame and one renderer entry/return, preserved time, remained paused and threw no error. It deleted the superseded sync once and placed one replacement. The absolute 120-second page budget and 125-second external ceiling never restarted. The latest fence covered frames/entries/returns **49/49/49**, returned `CONDITION_SATISFIED`, and was deleted once. Both owned syncs were deleted exactly once. There were **6,545 polls**, including **6,544 `TIMEOUT_EXPIRED`** observations; summed native wait-call time was approximately **100.0 ms**, maximum **2.2 ms**. The approximately 110.6-second elapsed wait consists chiefly of asynchronous observation intervals, not that much time inside `clientWaitSync`.

After the final signal there were **zero old-engine renderer entries and zero backing writes** through release, disposal and final fresh-ready observation. The old counters remained 49/49. A signaled fence establishes completion of preceding commands on that old GL stream; it does not establish compositor presentation, physical memory reclamation, or completion of resource-deletion commands issued later by disposal. No `finish()`, positive-timeout GL wait, forced context loss, extra scene draw or production fence was introduced.

| Run / engine | Constructor | `getContext` | Init call / resolved | Factory | First `renderFrame(0)` | First renderer render | Constructor→host ready |
|---|---:|---:|---:|---:|---:|---:|---:|
| First attempt / 1 | 52.5 | 37.1 | 1,352.2 / 1,354.8 | 1,351.0 | 2,038.1 | 2,037.5 | 3,474.2 |
| Covered / 1 | 31.0 | 12.6 | 1,223.3 / 1,224.6 | 1,222.5 | 1,549.5 | 1,549.0 | 2,852.6 |
| Covered / 2 | 10.7 | 5.0 | 630.6 / 631.5 | 630.2 | 685.1 | 684.9 | 1,334.8 |
| Undrained / 1 | 14.1 | 6.6 | 691.2 / 693.0 | 690.3 | 1,007.2 | 1,006.7 | 1,725.7 |
| Undrained / 2 | 2,334.3 | 332.9 | 627.1 / 628.4 | 626.6 | 51,117.1 | 51,116.8 | 54,086.3 |

All table durations are milliseconds between recorded boundaries. They include observation overhead. Init “call” is entry→synchronous return of its original Promise; “resolved” is entry→observed resolution. The unchanged host invokes the first zero-dt render and then marks ready; its ready selector is a DOM state, not a GPU-completion gate. Both completed runs ended with the actual host and React DOM ready, a new engine/context/canvas, two fresh paused frames, and a 960×700 backing/CSS size. No host-caught exception, shader-error event, context-lost event or page error was recorded. Context loss was not forced and old disposal did not imply context loss.

The host retention delay and engine disposal were distinct:

| Run | Final release→dispose entry | Engine dispose entry→return |
|---|---:|---:|
| Covered | 5,001.2 ms | 6.0 ms |
| Undrained | 5,001.0 ms | 6.9 ms |

These observed disposal durations do not establish physical GPU cleanup completion. The first invalid attempt reached neither phase.

Only four native GL methods were timed. For every created context there were 38 `compileShader` calls, 19 `linkProgram` calls and 57 `getProgramParameter` calls; all returned, none threw, and none hit the 64-per-method detail cap. `getShaderParameter` was not called. Zero durations below reflect timer resolution, not proof of zero work.

| Context | Compile total | Link total | Program-parameter total / maximum |
|---|---:|---:|---:|
| First attempt / 1 | 0.0 ms | 0.1 ms | 42.2 / 10.7 ms |
| Covered / 1 | 0.0 ms | 0.1 ms | 45.3 / 14.6 ms |
| Covered / 2 | 0.1 ms | 0.0 ms | 11.8 / 5.4 ms |
| Undrained / 1 | 0.0 ms | 0.1 ms | 6.7 / 1.3 ms |
| Undrained / 2 | 0.1 ms | 0.2 ms | 8.4 / 1.3 ms |

The control's 51.1-second fresh render is therefore mostly outside these selected native-call durations. Its largest untraced inter-event interval was **28,029.3 ms**, between `linkProgram` call 13 returning (sequence 835) and `getProgramParameter` call 37 entering (sequence 836). Both endpoints are inside the first fresh synchronous renderer call. That interval could contain other GL calls, JavaScript and browser/driver work; this probe cannot name its blocking operation. Maximum observed one-second heartbeat lag was 53,775.5 ms in the control, versus 2,310.6 ms covered and 4,530.6 ms in the first attempt. Heartbeat lag measures event-loop delay, not GPU duration.

| Old-engine workload | First attempt | Covered | Undrained |
|---|---:|---:|---:|
| Completed renderer returns | 52 | 49 | 51 |
| Cumulative reported draw calls | 32,926 | 31,029 | 32,285 |
| Cumulative reported triangles | 139,197,378 | 131,168,608 | 136,516,568 |
| Final scene time | 8.3744 | 8.3088 | 8.2869 |
| Last submission return, page clock | 75,081.2 ms | 56,585.2 ms | 33,654.2 ms |

These counters sum `renderer.info.render` after completed renderer calls. They are submission statistics, not measured executed GPU primitives. The control and covered runs did not have identical work counts or timing. There is one observation per mode, with a long added completion wait in covered mode; the pair is not a matched-workload performance benchmark. The wait moved measured completion earlier in the sequence and made the total covered run longer. It should not be presented as a production optimization.

Full in-page scalar events were reconciled against bytes read back from `phases.jsonl`, comparing identity, content and sequence through each snapshot watermark. Exact read-back bytes are retained separately. All comparisons passed without recovery, missing IDs, duplicates or conflicts:

| Run | Reconciled events / watermark | Read-back evidence |
|---|---:|---|
| First attempt | 668 / 668 | [reconciliation](evidence/drain/reconciliation.json), [persisted bytes](evidence/drain/phases-readback.jsonl) |
| Covered | 1,180 / 1,180 | [reconciliation](evidence/covered-drain/reconciliation.json), [persisted bytes](evidence/covered-drain/phases-readback.jsonl) |
| Undrained | 926 / 926 | [reconciliation](evidence/undrained-control/reconciliation.json), [persisted bytes](evidence/undrained-control/phases-readback.jsonl) |

The control's subsequent heartbeat 927 is outside its in-page watermark claim. Actual read-back hashes and compact event-array hashes were independently recomputed and match the retained reports. Browser cleanup failures remain separate from this successful reconciliation.

Desktop, portrait and landscape PNG files from **all three runs are byte-identical** to the approved [final cold winter images](../followup/evidence/final/). The verified hashes and byte sizes are recorded in `COMPARISON.json`; this equality covers these fixed-pose snapshots, not every animated/input state. No new visual difference is claimed.

Historical failures remain unchanged: [the original group winter report](../followup/evidence/final-original/nature-winter_lodge/verification.json) and [one unchanged isolated retry](../followup/evidence/final-winter-retry/verification.json) failed the same 120-second fresh-ready wait after disposal checks. The group completed the other three worlds' 78 checks; no winter partial total is invented. An additional [unchanged full-suite winter failure](../recreation/evidence/final-original/nature-winter_lodge/verification.json), with [group failure details](../recreation/evidence/final-original/failure.json), occurred on the size-guard source later carried by `f1540653283a09ddb91427a2e1692466275db2c7`: source `4d83102d…`, bundle `94d67a1b…`. Again, the other three worlds completed 78 checks and winter timed out at the unchanged 120-second fresh-ready gate after disposal assertions. That retained report records base HEAD `6ba4eee…` because the candidate was still a working-tree change when tested; the source digest identifies its actual bytes. Thus there are at least these **three preserved unchanged winter recreation failures**, not only the earlier two.

The corresponding historical [MOTION_STATUS.json](../recreation/MOTION_STATUS.json) records pixel motion proof **UNRUN**: the unchanged script rejected the failed verification prerequisite before opening a browser or capturing screenshots. No prerequisite was bypassed. Earlier instrumented baseline and size-guard runs both recreated successfully, as recorded in the [prior diagnosis](../recreation/DIAGNOSIS.md). These later successes do not erase any preserved failure or prove a deterministic correction.

Root has separately selected a bounded `staticFrameCurrent` candidate to avoid duplicate idempotent static submissions. That candidate is outside the production bytes measured here. Review and required original four-world, repeated winter lifecycle, actual context-loss and motion-proof gates remain separate and pending at this report's preparation. The diagnostics support investigating redundant submissions; they do not establish the candidate as a proven fix.
