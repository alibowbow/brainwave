# PR65 static completion handoff

The narrow active-resize defect is fixed, and all requested **revised asynchronous static-completion gates pass** on the same frozen production source. Original failed reports remain failed and unchanged. PR65 stays draft; no merge was performed.

Only owned `engine.ts` changes in production. A real resize now retains a required zero-time image when an active, GPU-blocked engine stops. Required images carry requested/submitted/completed revisions; each fence acknowledges only its admitted revision. Paused polling observes the final fence even with no further redraw, then stops. It does not advance scene time or render another frame to manufacture completion. The existing single-batch bound, nonblocking waits, null/WAIT_FAILED/loss failure handling, hidden suspension and disposal cleanup remain.

All13 other production files, original shared host, scene assets and approved compositions are unchanged. There is no DPR/quality/material/geometry/reflection reduction, fixed FPS cap, extra AudioContext or ordinary-disposal forced context loss.

## Validated result

| Gate on frozen source | Result |
| --- | --- |
| Revised full4-world sequence | **PASS:**104 completed labels;100 required-image acknowledgements and100 exact180ms stable windows. Same healthy canvas, fixed paused time through waiting, real signaled batch accounting, no dirty/pending/poll work at completion. |
| Active resize → busy completion → stop | **PASS:** real-host unit regression; browser sequence in all4worlds acknowledges980×720, then960×700 on the same canvas with unchanged paused time. |
| Original Winter fresh-ready condition | **PASS:**unchanged120,000ms selector, observed1,412.3ms after disposal in the revised sequence. Its later GPU/image acknowledgement is a separate gate. |
| Dedicated Winter two fresh cycles | **PASS:**3distinct engines/canvases,2native Enter actions, exactly1callback and1actual image per action, final lifetime3created/3disposed. |
| Actual driver context loss/recovery | **PASS:**trusted `WEBGL_lose_context` while running and paused, failed UI/old canvas stopped, fresh identities, native input and final lifetime4/4. Running loss retains1unconfirmed batch; deletion is not recorded as completion. |
| Previously unrun motion-only proof | **PASS:**all4worlds;12actual scene frames each, time advances and native PNG pixels change; no camera input or UI/focus change between captures. |
| Normal images | **PASS:**11real PNGs inspected;10fixed poses are byte-identical to approved6ba images. Dynamic chrome timing differs. |
| Typecheck / unit / app build / bundle | **PASS:**198tests/27files, including48focused engine tests; initialJS402.6/410KiB, CSS99.5/135KiB. All tool processes exit0. |
| Published CI / automatic preview | Preparation snapshot: results belong to the exact remote commit and are recorded in PR65 after the single publication. No manual deployment. |

The new contract observes information the previous fixed-window assertions did not: a required revision, its actual submission and its successful fence acknowledgement. It uses an absolute120s completion deadline, then the original180ms stability observation. Additional static submissions must advance a required revision. A missing acknowledgement, changed clock/canvas, extra frame after completion, or terminal GL state fails. No enlarged arbitrary sleep, deleted assertion, synthetic completion, blocking wait or `gl.finish` is used.

**Correction to earlier wording:**the old dedicated native-input failures were already observed after180ms stopped observation, not instantaneous reads. Their frame1≠2 failures and missing GPU diagnostics remain preserved. Relax8≠7/Sleep7≠6, earlier Winter120s failures and the previously unrun motion proof are not retroactively passed. New reports explicitly set `revisedContract:true` and `originalGateClaim:false`. The old harnesses are unchanged; only one existing unit expectation is adapted to final-fence polling without another draw.

## Measurements and limits

The largest required-image request→ack in the revised four-world run is4,561.3ms on SwiftShader. Dedicated native request→ack times are2,073.2/2,244.4ms; recovered-input times are2,424.5/2,012.0ms. These pass the declared bounded contract and are **not physical-device response-speed claims**. Completion diagnostics report actual production fence results; they are not an independent complete native-GL trace. Polling/IPC affects timing, and another owner's workload was present at preparation. No repeated failed gate or performance retry was run.

Winter's synchronous old disposal body is6.5ms in the full sequence; the unchanged host grace is5,000ms, with unmount→disposed observed at5,029.7ms. New synchronous first render returns in746.0ms. Resource disposer return, listener/RAF/fence cleanup, successful GPU completion and physical GPU-memory reclamation are distinct. Physical reclamation is unmeasured. Ordinary disposal still does not force context loss.

Synthetic pointer/cancel/blur/hidden stimuli remain labeled. Native keyboard/click has trusted event evidence; actual extension context loss is distinct from physical GPU failure. Hardware/Fold FPS/thermal behavior, real-tab backgrounding, full-app routing/audio and latest-core integration remain unrun. The production120s unsignaled check pauses while hidden/detached; it is not an absolute background wall-clock guarantee. The visible QA contract supplies its own absolute deadline.

## Exact source and evidence

```text
Baseline: 2a8f9b97ba4982623da13ed6835a14c27ef7fae2
Local source checkpoint: bfffa3461b2e625b53ba87d82d52ef0ea0a0d366
Local harness checkpoint: 456ecde2cb70a67ccbad394c767de963dac97d53
Production source SHA-256:
e3e7a278bad36a8d12f80403b03972728c11fa07436335346ff796d8f664edfa
Original-entry bundle SHA-256:
0b0c53ed7a574d44f301bbd6ccaf4f72b9410616eaebd46a299551b927e5e516
Engine SHA-256:
f9e6bc14c08ef5d125464fef8313eaa4539b9ea560ea87cb1ffca51f8e9e7c0a
FINAL_RESULTS.json SHA-256:
1b30994c251ffeaf2152a4dbef5dac867165a25134ca00acf8ca427d1f952126
```

[Exact results](FINAL_RESULTS.json), [source/bundle file hashes](SOURCE_BUNDLE.json), [normal PNG hashes](PNG_MANIFEST.json), [motion pixels](MOTION_PIXELS.json), [execution status](EXECUTIONS.json), [source review](SOURCE_REVIEW.md), [four-world audit](STATIC_AUDIT.md), [lifecycle audit](LIFECYCLE_AUDIT.md) and [artifact manifest](ARTIFACT_HASHES.json) retain the evidence. Root viewed all11normal PNGs and relax/winter motion pairs; the independent QA reviewer viewed sleep/nap motion pairs. Numerical pixel differences corroborate visible scene changes. The build manifest's older GitHEAD is preparation metadata; exact source-map/file digests bind the built working-tree bytes to the source checkpoint and final publication.

## Coordinator integration

Use the bounded owned delta from PR65 after reviewing the published exact commit/tree and CI recorded there. Preserve original PR59/head7373c1ee, main14940149cc5c0fccb778b58d4d755a04aea55e53, the entire sea PR51, shared core and every other owner. No main/other-branch merge, original-branch write or force push occurred.

This branch deliberately tests its unchanged old host. It lacks the newer shared-core693f495 identity guard after initial `renderFrame(0)`; the engine retains the tested initial throw-to-host-catch adaptation. Do not substitute a latest-core comparison for this branch's pass. The coordinator owns final integration with the current shared host and app routing/audio; no shared patch is proposed by this scoped result. Keep the PR draft until that integration decision, and never auto-merge.
