# PR64 disposal and submission follow-up

This report continues PR64 after the independently approved `c6cad439abbaae54884292c6cc6ea60c76587e32` material/compatibility checkpoint. No further material, geometry, lighting, water shader, camera, target-size or texture changes were made. The production correction is confined to the owned `runtime.ts` and new `gpuSubmission.ts`. All other new files are owned QA, instrumentation or handoff documentation. Shared core, wrappers, other scenes, dependencies, main and original PR58 are untouched.

The original PR58 guard remains `299a18911b2b7818149e4997dc2101b9c760bef5`. Publication updates only `codex/water-edge-material-compat` / draft PR64, without force or merge. Preserve main `14940149cc5c0fccb778b58d4d755a04aea55e53`, the entire sea PR51 and all later owner changes during integration.

## Historical failures remain failures

The prior [FOLLOWUP.md](FOLLOWUP.md), [followup-manifest.json](followup-manifest.json) and every byte under `followup-evidence/` are retained. Their two first-cycle valley failures are not replaced by later passing runs:

| c6 checkpoint | Host retention | Inside dispose | Detachment → actual context loss | Result |
| --- | ---: | ---: | ---: | --- |
| Valley normal | 5.0005 s | 31.8066 s | 36.8076 s | Failed fixed 20 s gate; second cycle/remount unrun |
| Valley byte | 5.0005 s | 40.4880 s | 45.4897 s | Failed fixed 20 s gate; second cycle/remount unrun |

Eventual zero live engines and trusted context loss did not make those checks pass. The five-second host retention is separate from synchronous disposal duration, context-loss observation and physical GPU memory reclamation. The last remains unmeasured.

## Diagnosis before the production change

All diagnostic runs used fresh, sequential Chromium/SwiftShader processes. Clean runs had no screenshots, `readPixels`, `toDataURL` or extra diagnostic completion fence. The dev-only observer counts actual draw submissions through Three's pass-through `renderer.info.update`, preserving its original call. It separates exclusive nested render counts, initialization cube/environment work, top-level frame requests and skipped requests. Renderer-call wall time includes compilation/driver stalls and nested work; it is neither pure JavaScript CPU time nor a GPU timer.

The unchanged c6 source submitted six time-zero top-level valley views: two initialization/attachment requests and four holder/observer redraws. Together with the six cube faces and one refraction pass this was 13 `renderer.render` calls / 358 draw submissions in both final baseline timelines. The byte pre-release snapshot caught five views / 319 draws, but a sixth observer frame completed before the unmount request; the complete timeline, not the earlier snapshot, establishes the actual submitted count. The cube is generated once, not repeatedly; time-dependent refraction inputs remain genuine work and were not disabled. The static dedup candidate reduced this to one initial view / eight renderer calls / 163 draws while retaining all initial cube/refraction/shadow work.

| Attempt in `followup-lifecycle-evidence/` | GPU drain before release | Synchronous dispose | Detachment → context loss | Raw result |
| --- | ---: | ---: | ---: | --- |
| `baseline-clean-normal` | None | 4.4181 s | 9.4188 s | Passed this isolated rerun |
| `baseline-clean-byte` | None | 4.0388 s | 9.0396 s | Passed this isolated rerun |
| `baseline-drained-normal` | Blocked: pending observer changed frame 5 → 6 | Unrun | Unrun | Blocked; retained |
| `baseline-drained-settled-normal` | 9.4129 s | 0.0632 s | 5.0638 s | Passed separate drained diagnostic |
| `baseline-drained-settled-byte` | 13.3151 s | 0.0375 s | 5.0381 s | Passed separate drained diagnostic |

The blocked first drain was not relabeled. The subsequent separately named drain waits for unchanged holder callbacks first and retains the strict unchanged-frame assertion. Zero-timeout asynchronous fence polling performs no draw/readback. The normal clean rerun spent 4.4161 s inside `forceContextLoss`; after an explicit pre-release drain it spent 0.0576 s there. This supports queued GPU/driver work as a cause of the synchronous stall. It does not establish physical hardware performance or reproduce the exact historical 31.8/40.5 s values; fresh-run timing varies.

The first minimal candidate only skipped identical sizes and unchanged paused views. Its normal/byte two-cycle clean tests passed, but its separate normal **two-real-RAF-frame** no-drain run failed: 5.0004 s retention, about 18.8299 s synchronous dispose, 23.8308 s to trusted loss, and 18.7866 s heartbeat lag. `forceContextLoss` accounted for 18.8279 s. This run had 315 actual draws; draw count alone cannot express the higher cost of additional full-size refraction passes. All three candidate reports remain under their original `final-*` names in `followup-lifecycle-evidence/`; that directory is an iteration archive, not the final verdict. Subsequent candidate checks were stopped, not assumed passed.

## Bounded production correction

The engine retains one complete batch in flight. Factory cube/PMREM work and the first visible full-quality view form the first batch. Every later active frame, paused resize, holder callback and interaction-driven final frame uses the same gate. A zero-timeout completion query accepts only `ALREADY_SIGNALED` or `CONDITION_SATISFIED`. `TIMEOUT_EXPIRED` defers work; null fences, `WAIT_FAILED`, unknown statuses, context loss and thrown queries are faults. No fake extensions, unsafe GL-state patch, `gl.finish`, busy wait, fixed frame cap or quality reduction is used.

While busy, simulation time does not advance and animation delay is not accumulated. A latest pending size remains unapplied so the existing canvas buffer is not cleared. A real resize or successful interaction retains one dirty final frame through pause; reacquisition presents it. Repeated identical holder/observer requests neither resize nor draw. All later detached entry paths reject submissions; only initial creation intentionally draws before attachment. A partial throwing render is still fenced. Disposal cancels the single scheduling handle and deletes the owned sync once; deleting that handle is not claimed to drain the GPU.

The synchronous factory/first-view batch and a single full-quality frame can still be costly on a software renderer. This gate prevents multiple subsequent batches accumulating; it is not a claim of smooth continuous SwiftShader animation or nonblocking driver teardown.

The `submission.pending` diagnostic means an owned fence has not yet been retired by a completion query; it does not prove the GPU is still busy at the instant the field is inspected. Completed counts are observations, and deleting a fence at disposal never increments them.

## Compatibility verifier correction

`followup-target-assertions.mjs` judges the final selected target and all required framebuffer faces. An advertised HalfFloat extension permits a probe, but does not force that probe to succeed. A discarded incomplete HalfFloat cube or PMREM-format probe is accepted only when the legitimate selected byte path has complete targets; unresolved incomplete targets, wrong types, missing faces or unsupported HalfFloat selection fail. Eight fixtures cover these distinctions. Real frame rendering and shader/page-error checks remain additional mandatory gates. Current SwiftShader normal/forced-byte evidence is not invalidated or presented as actual absent-extension hardware.

## Final source-bound verification

Final production source checkpoint: local `3b372ec1b7ca7b0f04c57d5de120e50f4b2220ee`, published `e4a11dd135c7979b644d667755f6a68fa4ea529d`. Final harness/verifier capture checkout: local `d5f7530228d69664df42b3e4901ede6215aeba22`, published `8482c3fef3bcf0448a0ed92b39f931253b1146f5`. The GitHub connector changes commit metadata; each paired Git tree is identical. [lifecycle-publication.json](lifecycle-publication.json) maps every intermediate diagnostic/source checkpoint so failures can also be reproduced from their actual source. The final matrix is stored separately in `submission-evidence/`; no earlier evidence is overwritten. Exact source, harness, bundle, script, report and image hashes are recorded in `lifecycle-manifest.json` after the matrix completes.

Typecheck, the complete 204-test / 29-file unit suite, root build and root bundle budget passed. Initial root JavaScript is 402.6 / 410 KiB; CSS is 99.5 / 135 KiB. The separate production-entry harness is built for actual scene verification because the root app does not yet route these worlds. The GPU/runtime unit cases include deferred resize and final paused frames, direct/scheduled detach and reacquisition, initialization, partial throwing render, null/failed fence and disposal ownership.

The final finite browser matrix is **24 passed / 0 failed / 0 blocked**, with **28 real native PNGs**. This supersedes the clean-gate result only for the corrected source; it neither relabels historical failures nor certifies responsive software-driver cleanup. The manifest also preserves the five baseline attempts (four passed, one blocked), three dedup-only attempts (two passed, one failed), and both original failed reports. All 40 original evidence files are byte-identical to c6.

| Final check | Result |
| --- | --- |
| Actual still images | 10/10 passed: all three normal worlds plus shore/valley byte, desktop 1280×800 and portrait 390×844, DPR 1 |
| Native-input behavior | 5/5 passed: trusted mouse drag, emulated touch tap/cancel, HTML controls, genuine bounded subsequent RAF, static/reduced-motion and explicitly synthetic hidden/edge cases |
| Clean lifecycle | 5/5 passed, two release → actual trusted context loss → fresh remount cycles each; fixed 20 s actual elapsed gate |
| Valley active no-drain diagnostic | Normal/byte passed, exactly two additional real RAF submissions each, no capture or added diagnostic fence |
| Valley paused holder/resize | Normal/byte passed; three same-size holder roundtrips add no frame; real portrait and restored desktop views render at frozen time; returned PNGs are identical |

| Final valley run | Detachment → actual loss | Inside dispose | Maximum disposal heartbeat lag |
| --- | ---: | ---: | ---: |
| Normal clean cycle 1 | 16.2501 s | 11.2490 s | 11.2445 s |
| Normal clean cycle 2 | 7.7436 s | 2.7432 s | 2.6992 s |
| Byte clean cycle 1 | 5.0389 s | 0.0382 s | 0.0346 s |
| Byte clean cycle 2 | 5.3272 s | 0.3268 s | 0.3223 s |
| Normal active two-frame diagnostic | 5.0204 s | 0.0198 s | 0.0024 s |
| Byte active two-frame diagnostic | 5.0186 s | 0.0180 s | 0.0022 s |

**Remaining limitation:** normal's first clean cycle still blocked the event loop for about 11.24 seconds, almost entirely inside `forceContextLoss`. One outstanding full-quality initialization batch can itself be costly on this SwiftShader driver. The 20-second deadline now passes, but consistently responsive teardown and continuous performance remain unproven. The integration owner must explicitly assess this measured limitation; no timeout was raised, no extra clean-path diagnostic drain was added, and no repeated attempts were used to select a faster final result.

Pond normal context loss occurred at 5.0174/5.0085 s, shore normal at 5.0221/5.0119 s and shore byte at 5.0223/5.0108 s. Every tested disposal reached zero live engines/canvases and trusted context loss before its fresh remount created exactly one new engine/canvas. The final report state intentionally includes the second fresh remount (created=3, disposed=2, live=1); a third release cycle is not claimed. Three's resource counters are JS bookkeeping: for example the baseline valley moved from geometries/textures/programs 14/6/30 to 0/1/3 before renderer teardown. Residual numbers are not evidence of retained VRAM, and context loss is not a measurement of physical memory-release duration.

All ten final still PNGs are **SHA-256 file-identical and RGBA pixel-identical** to the accepted c6 stills. All eight valley static-transfer/resize PNGs and five initial-with-controls PNGs also exactly match their corresponding accepted views. The primary reviewer inspected the ten final stills; an independent reviewer inspected all eight static and ten behavior PNGs. Post-input views preserve geometry, shore material and water depth with bounded interaction changes. Every PNG is native HTML+WebGL output at the stated full viewport, not an image substitute. Page/render error arrays are empty; the existing Three PCFSoftShadowMap → PCFShadowMap warning remains recorded.

| Scene/mode | Final desktop | Final portrait |
| --- | --- | --- |
| Pond normal | [PNG](submission-evidence/final-night-pond-normal-desktop-visual-initial.png) | [PNG](submission-evidence/final-night-pond-normal-portrait-visual-initial.png) |
| Valley normal | [PNG](submission-evidence/final-summer-valley-normal-desktop-visual-initial.png) | [PNG](submission-evidence/final-summer-valley-normal-portrait-visual-initial.png) |
| Valley byte | [PNG](submission-evidence/final-summer-valley-byte-desktop-visual-initial.png) | [PNG](submission-evidence/final-summer-valley-byte-portrait-visual-initial.png) |
| Shore normal | [PNG](submission-evidence/final-pebble-shore-normal-desktop-visual-initial.png) | [PNG](submission-evidence/final-pebble-shore-normal-portrait-visual-initial.png) |
| Shore byte | [PNG](submission-evidence/final-pebble-shore-byte-desktop-visual-initial.png) | [PNG](submission-evidence/final-pebble-shore-byte-portrait-visual-initial.png) |

Exact source SHA-256: `27794d8a365d0c32d3396f06849aa8b557908963f7a093495943c42dbd10b9da`; harness: `5a8c9e998bb6332fa0691d89c369de40c468bfff41f8db8893bc8c8a39371f42`; built harness tree: `789f1cf31ce3840e71a9a50a283f1d811dc4f2f888124ebd10d5768e7eb4d91b`; verifier: `93af8cef0201bf870f2546d20165ef2be12ff8f93305f207514213c9a4e9d963`. [lifecycle-manifest.json](lifecycle-manifest.json) retains every report/image hash, actual draw count, disposal phase, completion/readback timing and before/after pixel comparison. Its SHA-256 is `23ab398c71283330eecd9437369becb39c67f9acc682fe2974b4f800a3224f83`.

## Reproduction and interpretation

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
npx vite build --config components/immersiveWorlds/waterEdge/dev/vite.config.ts
node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=lifecycle --world=summer-valley --mode=normal --viewport=desktop --evidence=submission-evidence --tag=review
node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=diagnostic --world=summer-valley --mode=byte --viewport=desktop --evidence=submission-evidence --tag=review-active --active-frames=2
node components/immersiveWorlds/waterEdge/qa/followup-verify.mjs --serve --stage=static --world=summer-valley --mode=normal --viewport=desktop --evidence=submission-evidence --tag=review
```

Use a new evidence directory/tag for independent attempts: the verifier refuses to overwrite an existing report. Lifecycle performs two release → trusted actual context loss → fresh-remount cycles. Its fixed 20 s gate checks observed event timestamps, so event-loop blockage cannot turn a late callback into a pass. The extra post-loss heartbeat observation records late callbacks without extending the gate. Production fences are intrinsic to this source; clean stages add no diagnostic drain. Capture stages separately record GPU completion observation and native PNG readback; their timings are not substituted for clean teardown measurements.

Trusted browser mouse/touch input is browser automation with touch emulation, not physical touchscreen certification. Synthetic cancel/outside/blur/hidden-state cases stay labeled. Harness controls are real DOM but are not the final Player/ImmersiveMode chrome. Unrun: physical mobile/Fold, absent-extension hardware, actual OS background/foreground, sustained throughput/thermals/long-session memory, physical VRAM release, auditory quality, full integrated chrome/native Fullscreen/Escape and exact integrated-head CI. Shared-owner integration must still validate those routes; this worker never merges or deploys.
