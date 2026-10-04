# Prior environment compatibility runs — retained history

This report summarizes only the completed raw records in `environment-final/`, `environment-diagnostics/`, and `environment-verified/`. Directory names are historical labels: `environment-final` contains a failed run, and `environment-verified` contains one failed run. None is silently relabelled as passing. The frozen later source `cb0e122e6d7a5f9b65b60f0b0237440ba0ecf935` and its current `environment-retained` runs are outside this report; those partial outputs were not read.

**Observed totals:** two failed full Temple runs, three passing full runs, and seven passing diagnostic runs comprising fourteen passing disposal/remount cycles. Diagnostic passes do not replace full-regression failures. Preflight checks or preview captures, if cited elsewhere, are separate evidence and are not included in these totals.

## Source, bundle and dependency identity

| Source label | Repository HEAD | Source manifest SHA-256 | Built harness manifest SHA-256 |
| --- | --- | --- | --- |
| A | `7abe0da7409dc117359c2c9352f2803228f1ab68` | `b26349e4b55dea3fbff691aa05dd53267a7c146488f9942781950fdeb0b944a0` | `387e56ee07ac0b4814c24ccb20a45d1ab6d05a87b7c530a43502874ddc4dc0a8` |
| B | `de0af8d7c4a62accea7e27ade55887044f513f9c` | `58db794a528fa03c3ae9f4905cb0f04ac6ea8240fc4c2b452f066523b98efbba` | `66afc5ee907fb2c249fc0604cd95f38609965459a2bbf00cc0de138c5c80a54c` |

All twelve raw JSON records report unchanged scene source, dependency source and built bundle during their own run. Source B applies to all seven diagnostics and four `environment-verified` full runs. These recorded hashes bind each result to its own tested bytes; this report does not substitute the later source for them.

Installed dependency: `three@0.186.1`. Dependency manifest SHA-256: `b36cdb5da45b3a221db3e501ade49f8ec899d08c45ab56b961414b3cc9364023` (identical for A and B).

| Installed dependency file | SHA-256 |
| --- | --- |
| `node_modules/three/package.json` | `f9c474a27c920b9435353a6235968f4453436bee0444fac7e5fd289c8fa463de` |
| `node_modules/three/src/extras/PMREMGenerator.js` | `78f7cc24a9aa22852f4c46052f39e5fe5507bee6313a824851ba899ed2219ecc` |
| `node_modules/three/src/renderers/webgl/WebGLEnvironments.js` | `69d82f1752b3244682b480cdf31d88c508b4617c5035217061635a326601ff38` |

The twenty completed initial PNG captures listed in the five full-run JSON manifests were rehashed for this report: all twenty byte hashes match their recorded SHA-256. Each JSON contains image dimensions, source and bundle manifests and browser metadata. Failure/debug images are not counted as successful scene captures. All these runs used Chromium `153.0.8010.0` with ANGLE SwiftShader; none establishes physical Fold behavior, device FPS, thermal performance or GPU-driver memory reclamation latency.

## Full-run results

| Raw record | Source | Result | Exact failed gate or completed scope |
| --- | --- | --- | --- |
| [environment-final/normal/verification-temple.json](environment-final/normal/verification-temple.json) | A | FAIL | 20,000 ms wait for disposal completion/context-loss observation failed; eventual synchronous engine cleanup lasted 25,499.7 ms. |
| [environment-verified/forced-byte/verification-scops.json](environment-verified/forced-byte/verification-scops.json) | B | PASS | Full capture, real input, motion/policy, holder, disposal/remount, static-first-frame and environment-restoration checks passed. |
| [environment-verified/forced-byte/verification-temple.json](environment-verified/forced-byte/verification-temple.json) | B | PASS | Full capture, real input, motion/policy, holder, disposal/remount, static-first-frame and environment-restoration checks passed. |
| [environment-verified/normal/verification-scops.json](environment-verified/normal/verification-scops.json) | B | PASS | Full capture, real input, motion/policy, holder, disposal/remount, static-first-frame and environment-restoration checks passed. |
| [environment-verified/normal/verification-temple.json](environment-verified/normal/verification-temple.json) | B | FAIL | 60,000 ms Chromium composited screenshot gate failed after holder tests; reduced-motion stability was not completed. |

Source A Temple normal generated all four initial images and completed motion, input/cancellation/capture, trusted browser touch, three holder cycles, reduced/static and synthetic-hidden checks before its cleanup gate failed. The recorded engine cleanup began at `106596.8 ms`, returned at `132096.5 ms`, and the actual context-loss event was observed at `132097.3 ms` on that page clock. The checked-environment dispose event was observed at `106599.6 ms`, only `2.8 ms` after engine cleanup began. This localizes the unmeasured remainder to later cleanup work but does **not** identify which later function consumed it; source A did not yet have the separate renderer-method timing wrappers. The exact unmount-request timestamp was not retained in that incomplete lifecycle record, so no measured grace-plus-cleanup total is invented for it. Eventual cleanup does not reverse the failed 20-second gate.

Source B Temple normal completed all four initial captures, native motion/pause, actual input and touch, and three holder transfers before the subsequent screenshot readback timed out. Its JSON contains no completed reduced-motion record and no disposal observation. The timeout message says “possible software GPU backpressure”; that is a diagnostic hypothesis, not an established cause.

The three passing source B full runs are Scops normal, Temple forced-byte and Scops forced-byte. Both real PMREM output and ping-pong FBOs passed their recorded completeness/error checks; normal selected actual half-float and forced-byte selected actual unsigned-byte. The genuine cube-face/mip sentinel and real assigned scene-environment checks passed. Button/input/link/role exclusions, pointer capture/cancellation, covered holders and listener counts, pause/reduced/static/synthetic-hidden behavior, remount and disposal also passed. Actual tab hiding was not observed in headless Chromium and remains separate from synthetic-hidden evidence.

| Passing full run | Observed grace to cleanup entry (ms) | Engine synchronous cleanup (ms) | renderer.dispose (ms) | renderer.forceContextLoss (ms) | Unmount request → context lost (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| scops / forced-byte | 5001.2 | 1421.6 | 0.2 | 1416.4 | 6424.4 |
| temple / forced-byte | 5001.2 | 4476.9 | 0.2 | 4474.4 | 9478.7 |
| scops / normal | 5001.1 | 8517.3 | 0.2 | 8509.3 | 13519.0 |

## Seven diagnostic runs, fourteen passing cycles

All diagnostics use source B, a 683×450 initially paused real scene, no screenshots and no auxiliary environment sentinel. Each performs two real dispose/remount cycles with the unchanged 5,000 ms host grace and 20,000 ms observation gate. `clean` adds no rapid remounts; `rapid` adds three; `rapid-drained` adds those same remounts and one explicitly timed existing QA `gl.finish()` before unmount. Renderer timing wrappers call the real JavaScript methods unchanged. No GL method or extension is replaced.

Values below are cycle 1 / cycle 2 in milliseconds. Every diagnostic cycle and its actual-environment checks passed.

| Diagnostic | Engine synchronous cleanup | renderer.dispose | renderer.forceContextLoss | Unmount request → context lost |
| --- | ---: | ---: | ---: | ---: |
| [environment-diagnostics/forced-byte/clean/cleanup-clean-scops.json](environment-diagnostics/forced-byte/clean/cleanup-clean-scops.json) | 33.9 / 16.0 | 0.2 / 0.1 | 29.5 / 11.5 | 5035.2 / 5017.7 |
| [environment-diagnostics/forced-byte/clean/cleanup-clean-temple.json](environment-diagnostics/forced-byte/clean/cleanup-clean-temple.json) | 734.8 / 15.5 | 0.1 / 0.0 | 732.0 / 13.5 | 5741.5 / 5016.5 |
| [environment-diagnostics/forced-byte/rapid/cleanup-rapid-temple.json](environment-diagnostics/forced-byte/rapid/cleanup-rapid-temple.json) | 8152.9 / 6565.2 | 0.2 / 0.1 | 8150.3 / 6562.2 | 13156.7 / 11567.7 |
| [environment-diagnostics/normal/clean/cleanup-clean-scops.json](environment-diagnostics/normal/clean/cleanup-clean-scops.json) | 38.0 / 14.4 | 0.1 / 0.2 | 33.6 / 10.4 | 5039.9 / 5015.5 |
| [environment-diagnostics/normal/clean/cleanup-clean-temple.json](environment-diagnostics/normal/clean/cleanup-clean-temple.json) | 962.3 / 14.7 | 0.1 / 0.1 | 959.9 / 10.5 | 5968.8 / 5015.9 |
| [environment-diagnostics/normal/rapid/cleanup-rapid-temple.json](environment-diagnostics/normal/rapid/cleanup-rapid-temple.json) | 8654.2 / 4951.2 | 0.2 / 0.2 | 8650.8 / 4949.1 | 13655.7 / 9952.1 |
| [environment-diagnostics/normal/rapid-drained/cleanup-rapid-drained-temple.json](environment-diagnostics/normal/rapid-drained/cleanup-rapid-drained-temple.json) | 7613.5 / 7433.3 | 0.2 / 0.0 | 7610.8 / 7431.0 | 12615.0 / 12434.2 |

The diagnostic cleanup entries occurred 5000.5–5006.2 ms after unmount requests. This is the host grace. Additional synchronous cleanup time was separately observed, principally inside `renderer.forceContextLoss` in these instrumented runs; `renderer.dispose` itself took 0.0–0.2 ms. These observations describe this software-rendered executor, not physical GPU memory reclamation.

Clean runs recorded one rendered zero-dt frame before cleanup. Temple rapid cases recorded seven to nine zero-dt frames before cleanup after the three remounts. Some additional resize-triggered redraws can occur between a snapshot and teardown; the JSON preserves the final per-renderer counters as well. These are measured differences between diagnostic workloads, not proof that queued redraws caused the earlier 25.5-second cleanup.

### Explicit gl.finish counterevidence

In normal Temple `rapid-drained`, both cycles had eight rendered zero-dt frames and the recorded final counters stayed at eight. The explicit finish calls returned after `0.2 ms` and `0.1 ms`, yet subsequent engine cleanup still took `7613.5 ms` and `7433.3 ms`, including `7610.8 ms` and `7431.0 ms` inside `forceContextLoss`. The drain-plus-cleanup totals were `7613.7 ms` and `7433.4 ms`; drain-start-through-context-loss totals, including grace, were `12616.7 ms` and `12434.9 ms`.

This directly prevents claiming that the explicit finish eliminated the delay, or that moving a wait before unmount improved cleanup. Clean-vs-rapid measurements and the finish counterexample do not establish a single cause for the failed full run. The earlier proposed “unflushed redraw backlog” explanation remains unproven; no causal GPU/driver diagnosis is asserted.

## Raw JSON SHA-256 inventory

These hashes were computed directly from the preserved files while preparing this report. No raw record or image was modified.

| Raw JSON | SHA-256 |
| --- | --- |
| [environment-final/normal/verification-temple.json](environment-final/normal/verification-temple.json) | `f2583d52f692e663d618314c38805c6b9d9851dc41d676808faa95e9a90ec011` |
| [environment-diagnostics/forced-byte/clean/cleanup-clean-scops.json](environment-diagnostics/forced-byte/clean/cleanup-clean-scops.json) | `8777ed6178f7a8ce90691bc888fc8722b09a796ddc958a2496271a760127d202` |
| [environment-diagnostics/forced-byte/clean/cleanup-clean-temple.json](environment-diagnostics/forced-byte/clean/cleanup-clean-temple.json) | `27c1fecc7beed6e1bb74b4bb7803b2ef6627a41864d178523a5c46ada75dd60e` |
| [environment-diagnostics/forced-byte/rapid/cleanup-rapid-temple.json](environment-diagnostics/forced-byte/rapid/cleanup-rapid-temple.json) | `488293fbd91682bc2c29ec2ca98ec84e9bc3680f40ab3857d5da1de5d81dd528` |
| [environment-diagnostics/normal/clean/cleanup-clean-scops.json](environment-diagnostics/normal/clean/cleanup-clean-scops.json) | `c4a693137336d3dd37a4da709908469517cb448a2a8bec366cbe7287429ee649` |
| [environment-diagnostics/normal/clean/cleanup-clean-temple.json](environment-diagnostics/normal/clean/cleanup-clean-temple.json) | `fe249ab2937a921179b98ecbcf1f29d025888179a0c59aca9c5762e162b5da7a` |
| [environment-diagnostics/normal/rapid/cleanup-rapid-temple.json](environment-diagnostics/normal/rapid/cleanup-rapid-temple.json) | `1a647f9796581e8157fa8894338b16300991c0da5ff5a46c81068fb9bffa51cd` |
| [environment-diagnostics/normal/rapid-drained/cleanup-rapid-drained-temple.json](environment-diagnostics/normal/rapid-drained/cleanup-rapid-drained-temple.json) | `0b8c6860e761100a44539059de01ed7873214e30ac9435479177a3e2a9286557` |
| [environment-verified/forced-byte/verification-scops.json](environment-verified/forced-byte/verification-scops.json) | `6fe3545eaf422acac167245ed29aff448db8c98fb66dd4cf3f445109765ec5d7` |
| [environment-verified/forced-byte/verification-temple.json](environment-verified/forced-byte/verification-temple.json) | `e7aebe3a1f3895f7c81519dc9c8a444ac380637aea6c8373693059b468f30eac` |
| [environment-verified/normal/verification-scops.json](environment-verified/normal/verification-scops.json) | `254c53a12202d10aae5ccbab6fd8f4c229084e861a1f7a221c66fd3c8f056b3c` |
| [environment-verified/normal/verification-temple.json](environment-verified/normal/verification-temple.json) | `ca600b3c4cb1d677c131309500ec608829b6627d04b517c23b5c433d2550359a` |

No current `environment-retained` result, partial output, later preflight label or subsequent gate outcome is included above.
