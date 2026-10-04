# CozyRooms bounded follow-up

This continuation starts at original draft PR #59, `codex/cozy-rooms-four-worlds`, exactly `7373c1eeb5372fa9bebf41889ff2960643f3990e`. It uses the new branch `codex/cozy-rooms-bounded-visual-correction`. The original branch is never written. This worker does not merge.

Final tested local production-source commit: `eff612d8ea6ba63d2cc41a11d834e5fa11518461`. Subsequent handoff/evidence changes do not change production source. GitHub publication uses the connected Git Data API because the local Git transport has no write credential. The published commit must match the complete local tree SHA; report `gitHead` values identify local test checkpoints, while production bytes are tied by the source and bundle hashes below. The draft PR records the exact published commit.

| Identity | SHA-256 |
| --- | --- |
| Original production source | `86c8383a3720ffa60cecbfd022d5234945af17bf88ad8edb14741202b3ee645c` |
| Original QA bundle | `503b5400075a16a2562d8177e90159980553e5113b1ca47ccec7e62901d50d90` |
| Final production source | `673d3f3dcf1e8659a6d2784435aac6e6601a6da592cb74ca4a3a38b217954bf9` |
| Final original-entry QA bundle | `293e1467d2c6c919f61a3afb8db8e5a64bbd5b710263973953afc7ef28238bd0` |

The original eleven real PNGs were inspected before edits, and their bytes and original source digest independently matched the original evidence. [Before manifest](before-manifest.json) records the hashes. Every final capture report includes individual source, bundle and image hashes, actual browser/backend, DPR, native backing dimensions and completion diagnostics.

## Bounded changes

Only four production files change: `hearth.ts`, `winterLodge.ts`, `napTerrace.ts`, and new `fireDetail.ts`.

- Winter portrait brings the right-hand fire and stone jamb into the seated view, retaining the window, lamp, cup and blanket. The wider camera and prop coordinates remain unchanged.
- Hearth/lodge keep their fuel placement and use irregular charred log sections, original procedural charcoal/end-grain maps, a deeper ash/ember bed, varied spatial flames and a low-intensity short-range fuel light. No exposure filter, new shadow target or resolution reduction is introduced. Hearth's downstream seeded composition is preserved.
- Four prominent terrace trees receive bent continuing leaders, staggered limbs and cupped leaves in connected sprays. Four prominent winter trees receive individual crown gaps, unequal limb reach, supported uneven snow caps and small depth offsets. Remaining trees and overall layouts are retained.
- Sleep source is untouched; final desktop and portrait PNGs are byte-identical to the original evidence.

All added geometry, GLSL and CanvasTexture pixels are independently authored. No JEV code/assets, generated service, paid service, new credential, dependency or public asset is added. The original [reference and licensing record](../../REFERENCES.md) remains applicable.

## Before and after

These are unedited real browser PNGs, not posters or generated images.

| View | Original | Final |
| --- | --- | --- |
| Hearth desktop | [Before](../evidence/relax-desktop.png) | [After](evidence/final/relax-desktop.png) |
| Hearth portrait | [Before](../evidence/relax-portrait.png) | [After](evidence/final/relax-portrait.png) |
| Terrace desktop | [Before](../evidence/power_nap-desktop.png) | [After](evidence/final/power_nap-desktop.png) |
| Terrace portrait | [Before](../evidence/power_nap-portrait.png) | [After](evidence/final/power_nap-portrait.png) |
| Terrace Fold-inner viewport | [Before](../evidence/power_nap-fold-inner-viewport.png) | [After](evidence/final/power_nap-fold-inner-viewport.png) |
| Lodge desktop | [Before](../evidence/nature-winter_lodge-desktop.png) | [After](evidence/final/nature-winter_lodge-desktop.png) |
| Lodge portrait | [Before](../evidence/nature-winter_lodge-portrait.png) | [After](evidence/final/nature-winter_lodge-portrait.png) |
| Lodge landscape viewport | [Before](../evidence/nature-winter_lodge-landscape-viewport.png) | [After](evidence/final/nature-winter_lodge-landscape-viewport.png) |
| Sleep desktop | [Before](../evidence/sleep_prep-desktop.png) | [After](evidence/final/sleep_prep-desktop.png) |
| Sleep portrait | [Before](../evidence/sleep_prep-portrait.png) | [After](evidence/final/sleep_prep-portrait.png) |

Initial visual attempts are retained separately: `intermediate-a738aea` was rejected for pale smoke-like fire and tan tiled logs; `intermediate-ccc0595` resolved those but lacked visible buried ember heat. Neither is final visual approval. The final ember-only change addresses that explicit defect without another scene redesign.

## Verification

Final verification summary and report hashes are in [FINAL_RESULTS.json](FINAL_RESULTS.json); all new PNG byte identities are in [PNG_MANIFEST.json](PNG_MANIFEST.json). Reproduction is in [README.md](README.md), with an independent [visual/source review](VISUAL_REVIEW.md). Original browser assertions and timeouts are unchanged. The capture and clean lifecycle bundles are separately identified; only the latter adds QA instrumentation.

| Check | Final result |
| --- | --- |
| Typecheck, application build, bundle budget | **PASS**; initial JS 402.6/410 KiB, CSS 99.5/135 KiB |
| Unit tests | **PASS**, 150 tests in 24 files, including three deterministic host-contract checks |
| Real PNGs and visual review | **PASS**, 10 cold views and four post-input chrome views; original 11 PNG hashes also verified |
| Browser-native input supplement | **PASS**, 16 checks; trusted hit-tested mouse/touch, animated mouse drag and chrome button action |
| Nonblocking fence diagnostic fault checks | **PASS**, seven controlled cases; these test diagnostic control flow, not production GPU scheduling |
| Unchanged original browser suite | **FAILED** at winter recreation; relax, sleep and nap fully completed 26 labels each, **78 total** |
| Unchanged isolated winter retry | **FAILED**, same recreation wait; no third retry, timeout increase or assertion change |
| Separate clean lifecycle timing | **PASS**, four fresh browsers; actual animation, pause, same-canvas holder transfer and final disposal |
| Original no-input motion-only PNG proof | **UNRUN**: its complete passing-verification prerequisite was not met; no bypass or inferred pixel-motion pass |

Both winter failures occurred after the original `disposed=true` wait and equal created/disposed counters passed, while waiting 120 seconds for a recreated ready canvas. They are neither screenshot timeouts nor failures of the existing 30-second eventual-disposal assertion. The [first failure](evidence/final-original/failure.json) and [isolated retry](evidence/final-winter-retry/failure.json), raw reports and logs are retained. The unchanged runner's empty `errors` array covers only captured page/console errors and does not negate a thrown test exception. Partial winter assertions are not given an invented count. Cause remains undetermined; a similar original-branch timeout was already documented, which does not prove this recurrence is driver-only or exclude a regression.

Original cancellation/drag PointerEvents and `document.hidden`/`visibilitychange` checks are explicitly synthetic. Native input coverage is additional browser-generated trusted input, not physical touch-device testing. Actual clock/frame advancement is exercised, but the final motion-only pixel comparison remains unrun.

The final cold captures signal completion through the existing WebGL2 context before a native PNG: drain durations were approximately 0.02–15.54 s, followed by 0.12–0.50 s PNG captures. After native input, nap's drain took 50.95 s followed by a 0.19 s PNG; lodge's drain took 28.87 s. This is consistent with preceding GPU work affecting readiness. It does not prove a compositor-only defect, establish the cause of recreation failure, or establish a production in-flight submission bound. No forest scheduler was copied or test timeout widened.

Clean lifecycle timing uses the same production source and separate instrumentation bundle `77b568410b8e9b7d580f123f7fb021d7355baaf81874ac9196a829470846f831`. It performs no screenshots, fences or readbacks. Configured retention is **5000 ms**, distinct from actual timer firing and synchronous `dispose()` return:

| World | Timer delay | Canvas detach → dispose entry | Dispose duration | Canvas detach → dispose return |
| --- | ---: | ---: | ---: | ---: |
| relax | 5000.5 ms | 5000.6 ms | 3.5 ms | 5004.1 ms |
| sleep_prep | 5000.2 ms | 5000.5 ms | 4.2 ms | 5004.7 ms |
| power_nap | 5000.4 ms | 5007.9 ms | 4.4 ms | 5012.3 ms |
| winter_lodge | 5000.3 ms | 5000.6 ms | 6.7 ms | 5007.3 ms |

The [clean lifecycle report](evidence/final-lifecycle/clean-lifecycle.json) records actual connected ancestor detachment via React's delegated `Node.removeChild`. An initial measurement attempt missed this path because its observer only watched connected-canvas `Element.remove`; that failed QA instrumentation run is retained separately. The observer was corrected without changing production code, timing bounds or phase assertions. This clean scenario stops at disposal and does **not** retest recreation or clear the two winter failures.

The unchanged engine does not force `WEBGL_lose_context`. No context-loss event was observed. Physical GPU reclamation remains **unmeasured**, not a five-second guarantee. Whole-run heartbeat maxima include startup work and are not disposal-duration measurements.

## Integration owner

This is a draft follow-up **based on the original CozyRooms branch**, exposing only this bounded delta. Integrate original PR #59 plus this follow-up through the sole main coordinator; do not merge the old main into this branch or replay unrelated scene changes. Main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including the user's complete sea PR #51, remains an ancestor. No file outside CozyRooms ownership changes.

**Integration remains open:** investigate and pass winter fresh-engine recreation under the unchanged conditions, then run the original motion-only pixel proof and integrated-app checks. This visual draft does not grant lifecycle acceptance. No shared-core change is proposed here, and this worker performs no merge.

Entry paths, `active:boolean` as the sole required prop, optional bounded interaction callbacks, one-canvas holder transfer and the existing engine/audio contract are unchanged. Shared core, wrappers, registries, `rainyWindow`, `oilSea`, input handlers, scheduler and other scenes are untouched. See [original integration contract](../../INTEGRATION.md).

The final source has been exercised in the isolated owned harness with modeled player chrome. Actual integrated app routing/fullscreen/audio, physical Fold hardware, hardware performance/thermals and physical GPU-memory reclamation remain unrun/unmeasured and belong to integration/device validation. QA PNGs and bundles are review artifacts; do not ship or precache them as public production assets.
