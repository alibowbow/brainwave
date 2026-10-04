# Independent evidence audit — bounded GPU backpressure

The candidate does **not** pass the required runtime gates. The original nap and winter sequences pass 26 checks each; relax and sleep fail their unchanged paused-frame assertions. The dedicated winter-cycle and actual-context-loss tests both stop at a fresh-engine static-input frame assertion. The observed one-batch bound and unchanged still images do not override those failures.

This audit read the production source, original harnesses, reports, raw sampled event arrays, persisted JSONL readbacks, and actual PNG bytes. It launched no browser, reran no test, and changed no production code, assertion, timeout, or historical evidence. Root reports **189 passing automated tests**; that count is attributed to root's verification and was not independently rerun by this auditor.

## Exact identity

All four original-world reports bind the same source and untransformed browser bundle. Their observer start/end identities agree. During this audit, every production-source and bundle file was independently rehashed against the recorded per-file manifests.

| Object | SHA-256 |
| --- | --- |
| Production source digest | `c67f2b6e467841fbc3fe0897b6ff646db5dba968c3c5d54b896672c371e312a3` |
| Browser bundle digest | `597e78687fc1fc38eb317c6e4fb73ff41735d128c88804757d7135745980a947` |
| `engine.ts` | `8401b0e80ef802d9f0c3d527aa91a271ea0b25e8c043d68d30a60491a3671bba` |
| Shared host | `a1b85fea6a44a5a1240f738b9908cee9570d8a2f95b94d40ad544dc3fbf41684` |
| Original `verify.mjs` | `87d6993d9fe2ff1f122706f523c9d2e1ba3e3591c2ed2d781d26a7bb4d49bad8` |
| Observer preload | `58ee719812102d8424af55a7726a34fe0045610cb6d6175e585d54eed9c511e4` |

[FROZEN_IDENTITY.json](FROZEN_IDENTITY.json) records all individual source/bundle hashes and production commit `56d3075eaf8cda076f7d25d53fac7b4026066bd9`. Runtime reports record HEAD `aa2d01f1a87a11dc208c48ada0ce157e6a595c81`. The build manifest's earlier `gitHead` is build-time repository metadata; the exact tested content is bound by the source and bundle hashes above.

## Original sequence outcomes

The group stopped on relax. Each remaining, previously unrun world was then run once with the unchanged original sequence. No failed world was retried.

| World | Actual result and first failure | Reconciled records |
| --- | --- | ---: |
| [relax](evidence/original/relax/verification.json) | FAIL: `verify.mjs:72` calls `freeze()` at line 25; `paused RAF does not advance`, `8 !== 7` | 11 / 11 |
| [sleep_prep](evidence/original/sleep_prep/verification.json) | FAIL: `verify.mjs:63:78` calls the same `freeze()`; `7 !== 6` | 7 / 7 |
| [power_nap](evidence/original/power_nap/verification.json) | PASS: all 26 reported checks, including delayed disposal and recreation | 22 / 22 |
| [nature:winter_lodge](evidence/original/nature-winter_lodge/verification.json) | PASS: all 26 reported checks, including delayed disposal and recreation | 25 / 25 |

There are **52 checks in completed per-world results**, plus two failed partial sequences. Both failed reports have `results: []`; this audit does not invent a partial-check count. Exact failures were captured before the original `finally` by delegated assertion methods, then rethrown unchanged: [relax first failure](evidence/original/relax/passive-observation/first-failure.json), [sleep first failure](evidence/original/sleep_prep/passive-observation/first-failure.json). Browser cleanup returned normally for all four original-world runs.

For relax, consecutive late paused samples show frames/submitted/returned increasing 7 → 8 while scene time remains `8.150000000000002`. Completed batches increase 6 → 7; the final eighth submission remains unconfirmed. For sleep, the last moving sample has frames 6, time `8.100000000000001`, and `pending: 0`; its final paused sample has frames 7 at the same scene time. Source review shows `stop()` retains a pending zero-delta request and schedules its asynchronous poll. The source and samples support deferred static submission as the conflict with the existing pause contract. The 1 Hz sampler cannot identify the exact request origin or callback ordering inside the assertion's 180 ms window.

Across the sampled live-engine diagnostics, `maxInFlight` and `submitted - completed` never exceed 1. No GPU failure, context-loss event, or inspect error was recorded in these four runs. The final old-engine snapshots for both passing worlds retain submitted 7 / completed 6 / unconfirmed 1 at disposal. Disposing/deleting that fence is **not** recorded as a signaled completion. Fresh first-render durations retained by production diagnostics are 282.4 ms for nap and 716.8 ms for winter; these measure synchronous renderer-call duration, not native GPU completion.

## Disk reconciliation and image preservation

All **65 records**—61 diagnostics samples and four observer-install events—were independently compared with their actual persisted readback JSONL records, stripping only `receivedAt` and `delivery`. Every sequence and content value matches. No missing, conflicting, duplicate, recovered, or unreconciled earlier-document record was reported. The readback bytes were independently hashed:

| World | Readback SHA-256 |
| --- | --- |
| relax | `857339772bc8d239af7a7bbfb8fabc7760db4677015a77da6fab3da81790d736` |
| sleep_prep | `198274b059ed8d2eed0d040034e23ec05a5f9c5d63faa57aaea8179bbc5a3a2c` |
| power_nap | `b520813368128407822abe8bb99b360331fa9a31a9fcca0ab7b44cb12cb823bc` |
| nature:winter_lodge | `64edba24581f44baf15a7f22c323a742d75c533ecc1a69c0d871854061cac110` |

Each world's `passive-observation/` directory contains `page-1-events.json`, `page-1-readback.jsonl`, and `observation.json`. These claims end at each final snapshot's watermark; subsequent Node/cleanup records are outside the in-page array claim.

All **ten fixed-pose PNGs** were independently hashed and compared byte-for-byte with their approved references under [followup/evidence/final](../followup/evidence/final): two relax, two sleep, three nap, three winter. Every expected image exists and matches. Exact individual PNG hashes and reference paths are preserved in the four observation reports. The additional `relax-chrome-visible.png` is recorded separately and is not claimed as an approved fixed-pose match.

## Dedicated gates

[Winter two-cycle report](evidence/winter-cycles/recreation-cycle.json): **FAIL**, `generation-1-native-enter`, `recreation-cycle/verify.mjs:164`, `one discrete action renders its stopped frame`, `1 !== 2`. Initial actual animation, the first disposal, and fresh engine/canvas 2 succeeded. Trusted Enter/key/click records and one bounded cup callback are present, but the required new stopped frame is absent. The second recreation cycle and final disposal were not reached. The first disposal took 5038.9 ms by the Node observation clock; browser detach-to-disposal observation lies between 4926.3 and 5026.5 ms. This includes the configured 5000 ms host retention period and observation granularity; it is not a physical GPU cleanup duration. The unchanged disposal budget is 30000 ms.

[Actual context-loss report](evidence/context-loss/context-loss.json): **FAIL**, `generation-1-native-input`, `context-loss/verify.mjs:197`, `discrete action rendered a real stopped frame`, `1 !== 2`. The running-context case actually invoked `WEBGL_lose_context`; it recorded a trusted loss event with `contextLost: true`, old canvas detachment, failed UI, and recovery to distinct engine/canvas 2. The recovered trusted input emitted one cup callback but no required stopped-frame increment. The paused-context-loss case and subsequent final lifecycle checks were not reached. Thus running loss/recovery observations succeeded within an overall failed gate; the full context-loss suite did not pass.

These two dedicated harnesses retain selected frame/time/lifetime fields but omit the new GPU diagnostic fields from their snapshots. Their failure-time pending/fence state is therefore unmeasured. Neither test was run with the original-suite passive observer.

[Motion status](evidence/motion/execution-status.json): pixel proof **UNRUN**, zero pixel checks. Its unchanged prerequisite rejected the same-source failed original report before browser launch. Still-image byte equality is not a substitute for that motion proof.

## Measurement limits

The original test and browser-bundle bytes are unchanged, but the original runs include the disclosed Node preload: public Playwright plumbing observation, delegated strict assertions, and a 1 Hz in-page `inspect()`/DOM sampler. Sampling adds CPU matrix/geometry work, IPC, and timing overhead. No extra GL calls, renderer calls, fences, screenshots, or production scheduler replacements were introduced by the observer. It is not a zero-instrumentation timing baseline.

The sampled GPU values are production-reported scalar diagnostics supported by source review, not independent native-GL call counts. The sampler cannot execute while the page thread is synchronously blocked. Retained phase timestamps become externally readable only after execution returns; an inaccessible boundary must remain unobserved. Event reconciliation proves preservation of the recorded observations, not observation of every browser or GPU transition.

The environment is Chromium 153 with SwiftShader software WebGL. Original hidden-state testing is explicitly synthetic; Fold coverage is viewport emulation. These results do not establish physical GPU-memory reclamation, hardware frame rate, thermal behavior, real-device behavior, or completion of any unrun gate.
