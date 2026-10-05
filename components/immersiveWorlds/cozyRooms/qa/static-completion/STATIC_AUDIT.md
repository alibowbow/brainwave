# Independent audit of the revised four-world completion contract

All four worlds pass the **revised bounded static-image completion contract**, with 104 completed check labels. The aggregate explicitly records `revisedContract: true` and `originalGateClaim: false`. This does not turn any historical original-contract failure into a pass. This audit was read-only: no browser, test, build, production edit, runner edit, or retry was performed by the auditor.

The [aggregate report](evidence/four-world/verification.json) has SHA-256 `ced2aa8282cc68f631250e1cd9a900e3b5559c66fd7f3f58c12f53322ddcd3bf`. Each world ran once in its own browser; all four execution statuses are successful, with no report failure, identity error, or cleanup error.

## Exact content identity

| Object | SHA-256 |
| --- | --- |
| Production source | `e3e7a278bad36a8d12f80403b03972728c11fa07436335346ff796d8f664edfa` |
| Original-entry browser bundle | `0b0c53ed7a574d44f301bbd6ccaf4f72b9410616eaebd46a299551b927e5e516` |
| Engine | `f9e6bc14c08ef5d125464fef8313eaa4539b9ea560ea87cb1ffca51f8e9e7c0a` |
| Unchanged original host | `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684` |

Every actual source file, built bundle file, and file named in each report's `binding.hashes` was independently rehashed and matches the recorded manifest. The four reports agree on runner/helper provenance. The original entry, engine, and host source-map binding was checked before root's run and is enforced by the revised harness. Build-time Git labels are preparation metadata; these exact content hashes identify the tested bytes.

| World | Raw verification report SHA-256 |
| --- | --- |
| [relax](evidence/four-world/relax/verification.json) | `6c0f429e8053e2f487ac31d5f7cdf8ae60fec402d00aa9c41215a033a5bb826d` |
| [sleep_prep](evidence/four-world/sleep_prep/verification.json) | `a58a29f5bbc70bf354a500ef8affb5160a91ba89b29500c7492b03d83bb5f30c` |
| [power_nap](evidence/four-world/power_nap/verification.json) | `c2e7659f3328fbcef3aaeb7ef0dd769e10337bd4a3a857da995259227d1a1631` |
| [nature:winter_lodge](evidence/four-world/nature-winter_lodge/verification.json) | `f3280b0d09cc2e1b436e0d85c6fcda52e7630b7b26301344118acb8e8039a182` |

## Completion and paused stability

These counts come from each world's actual `progress.jsonl`, including baseline acknowledgements that are intentionally not duplicated in the report's shorter `completions` array.

| World | Ack waits / stable windows | Persisted poll snapshots | Total helper polls reported by acknowledgements | Distinct acknowledged engine/revision pairs | Largest recorded request → GPU acknowledgement |
| --- | ---: | ---: | ---: | ---: | ---: |
| Relax | 23 / 23 | 38 | 466 | 15 | 3,834.9 ms, initial image |
| Sleep | 25 / 25 | 26 | 240 | 16 | 1,612.4 ms, initial image |
| Nap | 24 / 24 | 52 | 729 | 16 | 4,561.3 ms, initial image |
| Winter | 28 / 28 | 63 | 991 | 18 | 4,287.7 ms, active resize then stop |
| Total | **100 / 100** | **179** | **2,426** | **65**, scoped by world | **4,561.3 ms** |

The 491 persisted progress records comprise 100 starts, 179 poll snapshots, 100 acknowledgements, 100 stability records, and 12 lifecycle-boundary records. All 85 saved report completion snapshots exactly match corresponding `after` snapshots in the progress stream. No unexplained discrepancy was found between the reports and progress.

Every recorded acknowledgement has equal positive requested/submitted/completed image revisions, no dirty image or size, equal submitted/completed real-batch counts, zero incomplete work, no pending request/poll timer, and no failure. Across persisted wait samples, both `maxInFlight` and `submitted - completed` remain at most one. The harness checks that invariant and monotonic revision/accounting rules on every poll, and permits an additional paused submission only when it advances a required image revision.

Every completion wait's persisted samples retain the same scene time while actually paused. All 100 post-acknowledgement windows preserve exact frames, scene time, image state, engine/canvas identity, dimensions, and submission/completion counts. Their measured browser-clock spans range from 182.1 to 187.9 ms, enclosing the requested 180 ms observation interval plus scheduling/inspection overhead. There is no fixed-sleep substitute for acknowledgement.

Request-to-acknowledgement durations use production `image.completedAt - image.requestedAt`, not the shorter helper wall time. The absolute wait budget is never reset by polling or a later coalesced revision. The observed maximum is comfortably within the declared 120,000 ms image-completion bound, but it is not a hardware latency guarantee or a controlled performance comparison with earlier runs.

## Active resize followed by stop

All four additional regressions retained engine 1 / canvas 1, acknowledged backing and CSS dimensions **980 × 720**, then restored **960 × 700**. Scene time stayed exactly fixed across the two acknowledged paused images:

| World | Resize / restored revision | Paused scene time |
| --- | --- | --- |
| Relax | 39 / 40 | `8.165299999995531` |
| Sleep | 40 / 41 | `8.166700000001493` |
| Nap | 56 / 57 | `8.164699999998515` |
| Winter | 47 / 48 | `8.162500000002982` |

These actions occur after the original fixed-pose screenshots. All ten actual fixed-pose PNGs were independently compared byte-for-byte with their approved files in `../followup/evidence/final`; every image matches. Root separately inspected all eleven rendered PNGs, including the additional chrome screenshot. That extra input/animation image is not claimed as an approved fixed-pose byte match.

## Fresh-ready and disposal boundaries

The original fresh-ready selector remains bounded at 120,000 ms. A separate image acknowledgement follows it; they are not combined into a relaxed ready gate.

| World | Original fresh-ready selector elapsed | Fresh synchronous first render | Old synchronous disposal phase | Unmount request → disposed observation |
| --- | ---: | ---: | ---: | ---: |
| Relax | 1,161.5 ms | 379.3 ms | 3.5 ms | 5,022.5 ms |
| Sleep | 511.4 ms | 292.6 ms | 3.7 ms | 5,024.7 ms |
| Nap | 690.9 ms | 302.6 ms | 9.2 ms | 5,027.0 ms |
| Winter | 1,412.3 ms | 746.0 ms | 6.5 ms | 5,029.7 ms |

At the final old-engine snapshot, submitted/returned/completed counts are respectively 24/24/24, 26/26/26, 26/26/26, and 28/28/28. All four have zero unconfirmed work before final unmount. The host still has its unchanged 5,000 ms retention period and 30,000 ms disposal-observation bound. Its grace, synchronous resource-disposer phase, actual fence acknowledgement, and physical GPU-memory reclamation remain distinct measurements. No physical reclamation result is established here.

## Preservation and limits

A read-only comparison against published checkpoint `2a8f9b97ba4982623da13ed6835a14c27ef7fae2` found no changes to the original full/group/chrome/motion runners, original main/index entry, original cycle/context-loss runners, or historical evidence under backpressure, GL-boundary, recreation, and followup. The [prior backpressure audit](../backpressure/INDEPENDENT_AUDIT.md) and its failed relax/sleep fixed-observation gates, failed native-input gates, unrun motion proof, and earlier winter 120-second failures remain preserved. This report only establishes the newly authorized revised four-world contract.

The harness samples the existing production diagnostics and adds CPU/IPC timing overhead. It makes no extra GL call, fence, renderer call, readback, or production scheduler replacement. The 179 poll snapshots are approximately once-per-second progress logging from 50 ms helper polling; not every one of the 2,426 reported helper polls is persisted as a separate raw snapshot. This is a report/progress consistency audit, not an in-page full-event-array reconciliation or an independent native-GL execution trace. A synchronously blocked page could prevent further samples; the external absolute deadline would fail rather than invent a completion.

The environment uses Chromium/SwiftShader software WebGL. Synthetic hidden-state and pointer/cancel/blur tests, native keyboard/button actions, and viewport emulation retain their explicit original distinctions. This audit does not establish real-device FPS/thermal behavior, physical GPU faults/reclamation, real tab backgrounding, or full-app routing/audio integration. Dedicated two-cycle, actual-context-loss, and motion-pixel results are separate gates and are not asserted by this four-world audit.
