# Winter recreation: bounded phase comparison

The probes establish redundant drawing-buffer writes and a long synchronous render call after the original workload. They do **not** establish the internal cause of the two historical 120-second recreation timeouts, and they do not prove that the size guard fixes every recurrence. Both instrumented original-sequence runs passed. Final uninstrumented regression, visual acceptance and repository gates are separate.

[comparison.json](comparison.json) contains the derived per-generation measurements, full hashes, input-artifact hashes, sequence coverage, and preserved historical failure references.

## Four single runs

| Run | Recorded outcome | Evidence |
| --- | --- | --- |
| Baseline clean | First mount, disposal and fresh mount assertions passed; **separate browser-close cleanup exceeded 10,000 ms** | [report](evidence/baseline-clean/diagnostic.json), [phases](evidence/baseline-clean/phases.jsonl) |
| Baseline original sequence | All 26 original winter check labels passed | [verification](evidence/baseline-original-sequence/verification.json), [phases](evidence/baseline-original-sequence/phases.jsonl), [runner provenance](evidence/baseline-original-sequence/runner-provenance.json) |
| Size-guard clean | First mount, disposal and fresh mount assertions passed; no recorded cleanup error | [report](evidence/size-guard-clean/diagnostic.json), [phases](evidence/size-guard-clean/phases.jsonl) |
| Size-guard original sequence | All 26 original winter check labels passed; **phase events 386–396 are missing** | [verification](evidence/size-guard-original-sequence/verification.json), [phases](evidence/size-guard-original-sequence/phases.jsonl), [runner provenance](evidence/size-guard-original-sequence/runner-provenance.json) |

The clean runs used a fresh Chromium 153.0.8010.0/SwiftShader browser and one document at 960×700/DPR 1, initially paused, followed by final-holder release and fresh mount. They performed no screenshots, GPU fences or animation. The original-sequence runs retained the existing desktop/portrait/landscape captures, motion, synthetic and keyboard input, chrome, motion-policy, holder-transfer and remount sequence. Its 30-second disposal wait and 120-second fresh-ready wait were unchanged. Neither path navigated or reloaded between disposal and recreation.

Both original-sequence runners contain the same 7,964-byte original `try/for` body, SHA-256 `c6a541be6d7ade472d17b023e08bc3a79edb3206ca7e52418ac0df75bdc0c6f0`. The original `verify.mjs` SHA-256 is `87d6993d9fe2ff1f122706f523c9d2e1ba3e3591c2ed2d781d26a7bb4d49bad8`. Setup and external failure-reporting substitutions are recorded in each provenance file. The baseline generated runner predates the later bounded failure-DOM observer; no such snapshot is claimed for it.

## Identity and installed dependency

All four reports identify base Git HEAD `6ba4eee62f490360decb1c51007e8d3e604a7315`. The candidate was a working-tree change at capture time, so **source bytes, not that shared HEAD alone, distinguish the versions**. Only `engine.ts` differs among the production files included in the source digest.

| Identity | Baseline | Size guard |
| --- | --- | --- |
| Production-source SHA-256 | `673d3f3dcf1e8659a6d2784435aac6e6601a6da592cb74ca4a3a38b217954bf9` | `4d83102d72152dec1a831b592e3624d608197c2a9714d5a22a4ca2ea9807ee2c` |
| Engine SHA-256 | `60ff86a05ac3a31074cc8fea9452c91b31c3a00023a91a06d2426f765be98f7f` | `20e8b1a9f161716087b9f6e15659e771381caa1f035aa8e6942102eba22f5674` |
| Instrumented bundle SHA-256 | `990417b07961d9a91d647dc42603a28323ba673cfbf01d92046fb817ba60961f` | `83a3d64864bf9edd9c610711999d27074eb600563467030f952711a8f4e5167e` |

Within each version, clean and original-sequence bundles are byte-identical. Across all four runs, the browser diagnostic entry is SHA-256 `47d5b50821c85ce28e1cf7ef1b085721dd0894c88d8e462e0af224ef8d6ca1ac`, and the Vite instrumentation plugin is `04fd0ec2ffab0965ebc233436cbd869dc9a06fbd7f6a750c28f2354b8409ddcf`. Aggregate script digests differ as generated runner artifacts and failure reporting were added; they are not evidence of a changed browser probe.

The shared host was unchanged: SHA-256 `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684`. Installed Three is **0.186.1**, with `src/renderers/WebGLRenderer.js` SHA-256 `9e8740aad691246b31b3704014e8f3bbd38a8e7bf4b1b4d23868541b023cc63a`. In those exact installed bytes, `setPixelRatio(value)` calls `setSize(_width, _height, false)`, and `setSize` writes `canvas.width` and `canvas.height` without an equality guard. These are installed-source observations, not assumptions about a different Three release.

## Second-generation phase timings

Values below are milliseconds measured between the recorded browser `performance.now()` boundaries. Constructor-to-ready ends at the host's `setStatus('ready')` return. React/DOM readiness is a separate observation: explicit clean-run snapshots and the original sequence's passing final visible-canvas wait.

| Run | Constructor | Factory | First synchronous `renderer.render` | Constructor → host ready |
| --- | ---: | ---: | ---: | ---: |
| Baseline clean | 17.8 | 1,026.2 | 2,053.9 | 3,111.6 |
| Baseline original sequence | 2,300.1 | 836.2 | 100,195.9 | 106,051.0 |
| Size-guard clean | 11.6 | 584.4 | 699.5 | 1,305.0 |
| Size-guard original sequence | 2,632.5 | Unavailable | Unavailable | 54,250.9 |

The baseline original workload's factory returned normally. Its first recreated renderer call occupied **100.196 seconds synchronously**, after which the engine incremented its frame counter and the host published ready. This locates a long application-visible blocking boundary. It does not separate JavaScript preparation, shader work, command submission, driver waits, previous queued work or other internal causes. Calling this “GPU completion time” or a proven shader-compilation defect would overstate the evidence.

In the candidate original sequence, event 385 records factory entry at **38,487.1 ms** and event 397 records the first renderer return at **88,249.3 ms**. The observed combined interval is **49,762.2 ms**. Missing events 386–396 include the boundaries needed to divide that interval into factory, init and first-render durations. Those individual values remain null in `comparison.json`; no first-render speedup ratio is claimed. Constructor-to-host-ready has both endpoints and remains measurable.

## Buffer writes and retained rendering

The descriptor observer delegates each native canvas setter and records actual setter invocations, including assignments of the already-current value. Counts below have complete event coverage.

| Workload / generation | Engine size calls | Renderer pixel-ratio calls | Renderer size calls | Actual backing writes | Same-value writes | Static renders |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Baseline clean, each generation | 3 | 3 | 6 | 12 | 10 | 2 |
| Size-guard clean, each generation | 3 | 0 | 1 | 2 | 0 | 2 |
| Baseline original sequence, first generation | 19 | 19 | 38 | 76 | 68 | 28 |
| Size-guard original sequence, first generation | 19 | 0 | 4 | 8 | 0 | 28 |

The candidate original sequence records two backing writes and no same-value write on its second generation, but its event gap makes these **observed counts, not certified totals**. The complete clean comparisons establish the no-op reduction without relying on that incomplete interval.

The guard preserves the host's static redraws. Both clean versions submit two static frames per generation at scene time 8. The full first-generation sequences each submit 28 static frames; total submissions are 52 baseline and 47 candidate because wall timing changes how many active RAF callbacks occur. They are not identical animation workloads or an FPS comparison. This correction is not a submission cap, frame-rate limit, lower-quality setting, or scheduler change.

All four probes reach a distinct engine 2/canvas 3 at 960×700 backing and CSS dimensions, scene time 8, and two submitted frames. The recreated first renderer return reports 19 programs and 632 draw calls. These counters concern renderer work submitted, not physical GPU completion. Clean snapshots show host engine/canvas null after disposal, then new engine/canvas and React DOM ready after remount.

## Hypotheses kept separate

| Question | Source and observed evidence | Limit |
| --- | --- | --- |
| Cancelled initialization or late async result | `init()` has an async signature but no await/network operation. Complete streams show factory return, init resolution and first render on the newly constructed engine. | No such failure was observed; the uninstrumented timeout cannot inherit another run's state. |
| Reuse of disposed resources | The host clears its engine/canvas after disposal. The next factory creates a distinct scene and engine/canvas identity; winter/fire/material resources are created per factory call. | No module-level disposed-resource reuse was found; physical driver memory reclamation is not measured. |
| Second context or compilation | Recreated context creation and constructor calls become slower after the original workload; the first render finishes with 19 programs. | GL compilation and command/driver waits were not separately traced. Program counts do not measure compilation time. |
| Repeated static redraw or buffer reset | Native dimension setters prove repeated equal-value backing writes; the guard removes them while preserving all 28 first-generation static draws. | The final uninstrumented gate can still fail, so duplicate writes are not the demonstrated sole cause. |
| Accumulated contexts from other worlds | Original group verification launches a separate browser per world; both instrumented original comparisons use winter alone. | Prior relax/sleep/nap contexts cannot explain the winter-only result. Same-world overlap or driver behavior remains unproven. |

## Errors, event preservation and historical failures

No caught exception, rejection, context-loss, page-error or console-error event is present in the persisted four streams. Both original sequences finish their original ready-canvas and new-instance assertions. The candidate gap prevents a blanket claim that every possible event was captured; subsequent recorded context states are not lost.

Sequence coverage is complete for baseline clean (1–166), baseline original (1–721) and size-guard clean (1–95). The candidate original retains 396 of the numbered events 1–407, missing only 386–396. All persisted numbered events arrived through the console path; no binding-delivered record or decode error was retained. Source inspection finds no intentional filtering of unique IDs: records are deduplicated by document/sequence and writes are serialized. However, the runner does not reconcile the in-page event array at successful completion, and binding rejection is ignored. The exact emission, transport or persistence loss mechanism cannot be determined after browser teardown. No record is invented or backfilled, and no additional browser retry was used to hide the gap.

The two earlier uninstrumented attempts remain unchanged: [first group failure](../followup/evidence/final-original/failure.json) and [isolated winter failure](../followup/evidence/final-winter-retry/failure.json). Each passed its preceding eventual-disposal assertion and then timed out at the 120-second fresh-ready wait. The first group completed 78 check labels in the other three worlds; winter partial checks are not assigned an invented count. Later instrumented passes do not erase either failure.

The strongest bounded conclusion is that redundant backing-buffer assignments were directly demonstrated and removed, while recreated readiness remained sensitive to the preceding workload in these software-browser runs. Four single observations, diagnostic overhead, differing active-frame counts, a cleanup timeout and the candidate event gap prevent a causal or performance-distribution claim. Full uninstrumented acceptance and integration follow-up must use their own final reports.
