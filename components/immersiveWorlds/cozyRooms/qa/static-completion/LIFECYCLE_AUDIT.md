# Independent audit of revised lifecycle evidence

**PASS for the revised static-completion contract.** Both final lifecycle reports pass, including cleanup. This audit inspected the saved JSON, progress records, runner/helper code and source identities without launching a browser or rerunning tests. It does not retroactively pass the preserved original contract.

## Identity and completion contract

All 14 production files and 18 bundle files were independently rehashed against the recorded manifests, including their aggregate digests. Both reports bind the same bytes as the revised four-world run:

| Object | SHA-256 |
| --- | --- |
| Production source | `e3e7a278bad36a8d12f80403b03972728c11fa07436335346ff796d8f664edfa` |
| Original-entry browser bundle | `0b0c53ed7a574d44f301bbd6ccaf4f72b9410616eaebd46a299551b927e5e516` |
| Engine | `f9e6bc14c08ef5d125464fef8313eaa4539b9ea560ea87cb1ffca51f8e9e7c0a` |
| [Two-cycle report](evidence/cycles/recreation-cycle.json) | `ff919613765b1db9de9afaea1aeb551e5a9fa5d20219abfb09b30f3015ddcc46` |
| [Context-loss report](evidence/context-loss/context-loss.json) | `e5e9a7ba8daaec983a5b9ffc8536654403ebcf21c2a3c1bed9b83f74a933f326` |

Recorded original-runner, revised-runner, completion/provenance/common-helper, original-entry and unchanged shared-host hashes also match their actual files. Both reports explicitly record `revisedContract: true` and `originalGateClaim: false`.

For stopped-image/input assertions, the revised boundary waits for the same healthy engine/canvas to acknowledge the current image revision and every submitted batch, with no dirty size/image, pending request, retained fence or completion timer. It then checks the existing 180 ms frame/time stability window. Completion alone does not count as another frame. Source review confirms that only a signaled fence advances acknowledgment; disposal and context loss do not.

## Two disposal/recreation cycles

The report finished at **2026-10-05 00:14:41.322 UTC**, with no failure or cleanup error. Engine/canvas pairs are **1/1, 2/2 and 3/3**. The initial animation advances frames 2 → 5 and scene time 8.0079 → 8.1579 before acknowledged pause. Both subsequent fresh engines accept the original native cup action, then dispose; final lifetime is **3 created / 3 disposed**, with no attached canvas or holder.

Original ready-selector bounds remain 120,000 ms. Observed initial/fresh selector durations are **2406.2 / 1300.5 / 1335.1 ms**; image acknowledgment is a separately identified subsequent stage.

Normal unmount-to-disposed observations are **5030.0 / 5035.2 / 5034.3 ms** by the Node clock. They include the configured **5000 ms** host grace and observation overhead. Recorded synchronous disposal bodies are **7.4 / 6.0 / 4.7 ms**. None of these is a measurement of physical GPU reclamation.

## Actual running and paused context loss

The report finished at **2026-10-05 00:15:42.975 UTC**, with both cases passed, no errors, no cleanup error and no forced browser-cleanup flag. Four distinct engine/canvas pairs **1/1 through 4/4** are recorded. Ready-selector durations are **2579.6 / 1319.3 / 1481.6 / 1394.3 ms**, all within the unchanged 120,000 ms bound.

Each mode invokes `WEBGL_lose_context` on its existing context and records exactly one browser event with `isTrusted: true` and `contextLost: true`. The running/paused pre-loss states are respectively true/false. Both lost canvases remain at **frame 4**, detached, through post-loss observations separated by **254.4 / 254.9 ms**. Failed status is visible, input listeners are removed and actions disabled. The running case retains the DOM motion label `running` while its engine is stopped/disposed; the audit does not mislabel that DOM state as paused.

Both recoveries use fresh identities and pass native input before normal final disposal. Final lifetime is **4 created / 4 disposed**, with no attached canvas, holder or retained old-canvas reference. The running-loss engine correctly retains **one unconfirmed batch** (submitted 4, completed 3) after losing its context; deleting its sync is not reported as completion. Four inherited Three shadow-map fallback warnings remain recorded.

## Native input and acknowledged stability

Each of these four actions records one trusted Enter key activation, exactly one trusted click and one `cup` callback with intensity **0.12**. Frames advance **1 → 2**, scene time remains **8**, required revision advances **3 → 4**, and submitted/returned/completed batch counts all equal **2** after acknowledgment. No pending work, failure or completion timer remains.

| Native action | Request → GPU acknowledgment | Acknowledgment observation → final stable observation |
| --- | ---: | ---: |
| Cycle 1, engine 2 | 2073.2 ms | 185.9 ms |
| Cycle 2, engine 3 | 2244.4 ms | 187.3 ms |
| Running-loss recovery, engine 2 | 2424.5 ms | 187.5 ms |
| Paused-loss recovery, engine 4 | 2012.0 ms | 187.8 ms |

The final observations preserve the acknowledged frame, time, image revision and GPU accounting. These measurements establish roughly 2.0–2.4-second acknowledgments in this software-rendering run, followed by the 180 ms stability check. They do **not** establish a 180 ms input-response time or hardware performance.

## Preserved failures and limits

The earlier [cycle failure](../backpressure/evidence/winter-cycles/recreation-cycle.json) and [context-loss recovery-input failure](../backpressure/evidence/context-loss/context-loss.json) remain byte-identical to commit `2a8f9b97`. Both failed the native frame assertion with `1 !== 2` **after their original 180 ms stopped-observation window**. They are not reclassified as immediate-only checks or changed to passes. Their SHA-256 values remain `cefeaa2458770738fb65c2ef47285c3a17ce2ce6c426b13e3aeaebd4b8457c0f` and `7e2bf0adf7b90f5aa87f071598036c824276a85fdefccde353b9efb5c0d8a7b2`.

This evidence uses Chromium 153/SwiftShader. Trusted browser keyboard input and actual software WebGL context loss are distinct from physical input hardware or a physical GPU fault. Completion values are production-reported counters supported by source review, not an independent native-GL trace. Progress sampling does not observe every transition. Physical GPU-memory reclamation, hardware frame rate/thermals, real background-tab behavior and integrated-app routing/fullscreen/audio remain outside this audit.
