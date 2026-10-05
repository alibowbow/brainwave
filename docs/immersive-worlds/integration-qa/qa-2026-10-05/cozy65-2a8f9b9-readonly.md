# Cozy PR65 2a8f9b9: preserve candidate, block intake

Reviewed immutable public head `2a8f9b97ba4982623da13ed6835a14c27ef7fae2`, tree `9764e9f7f56e76c916340edbd5ad4560ab14af16`, plus live PR metadata and its exact-head CI. PR65 is open, draft and unmerged. CI run `37244926015` / run 316 is now **success**; the PR body still reported in progress when read. This does not clear its explicitly failed runtime gates.

This review reads existing source and published artifacts. No code intake, source change, renderer/GPU execution, or new browser test occurred. Current integration remains on the f154 Cozy runtime; the prior 024 original 120-second failure remains preserved.

## Source and identity

- Relative to 024, all 77 changed paths are inside `components/immersiveWorlds/cozyRooms/`. The sole production delta is `engine.ts`; the rest are owned QA. No shared host or other owner changes.
- Engine SHA-256: `8401b0e80ef802d9f0c3d527aa91a271ea0b25e8c043d68d30a60491a3671bba`.
- All 14 production file hashes and the sorted-path-plus-NUL-byte aggregate match `FROZEN_IDENTITY`: `c67f2b6e467841fbc3fe0897b6ff646db5dba968c3c5d54b896672c371e312a3`.
- All 74 new artifact file lengths/hashes and aggregate match: `107e01480f284a2edbd64247a3e5dc0b278c29da623996895eee9592c780ffd4`.
- All 11 PNG hashes/lengths match the manifest. The ten fixed-pose files are byte-identical to the previously reviewed approved 6ba images. This limited blocker review did not repeat visual judgment of the one dynamic chrome image.
- All eight named original runtime/entry harness hashes match. Older followup and recreation folders are unchanged; old static-redraw evidence is unchanged, with only its unit test updated for the new engine protocol.
- The original-entry bundle aggregate `597e78687fc1fc38eb317c6e4fb73ff41735d128c88804757d7135745980a947` is consistently recorded by the source-bound reports. Emitted bundle files are not included in this source checkout, so this review did not recompute bundle bytes. The preparation-time Git label 024 is explicitly accompanied by candidate source hashes; it must not be mistaken for testing old production source.

Machine-readable checks: `cozy65-2a8f9b9-hash-audit.json`.

## Published raw results independently read

| Check | Raw result and remaining boundary |
|---|---|
| Relax original | `passed:false`, `results:[]`; final freeze at original verify line 72 records frames 8 versus 7, while time stays fixed. Disposal/fresh gate not reached. |
| Sleep original | `passed:false`, `results:[]`; freeze at line 63 records frames 7 versus 6, while time stays fixed. Later lifecycle checks not reached. |
| Nap original | `passed:true`, 26 labels, including delayed disposal and fresh canvas. |
| Winter original | `passed:true`, 26 labels, including unchanged original 120000 ms fresh-ready gate. This is a narrow source-bound pass, not an overall integration pass. |
| Winter two fresh cycles | Overall false; first disposal and fresh engine/canvas 2 succeed; native trusted input emits cup event, but required stopped frame remains 1 instead of 2. Second cycle and final disposal unrun. |
| Running context loss/recovery | Overall false; actual trusted extension loss, old stop/detach, lifetime 1/1 and fresh engine/canvas 2 observed; recovery input image fails 1 versus 2. Paused-loss case/final disposal unrun. |
| Motion-only pixels | Prerequisite rejects same-source failed lifecycle before browser launch; zero pixel checks. |

Only Nap and Winter contribute 52 completed original labels. Partial failed-world progress must not be added to that count. The original group stopped at Relax; each remaining previously unrun world ran once with unchanged original `verify.mjs`. The QA-only 1 Hz diagnostic/assertion observer adds timing overhead, so these are not uninstrumented runs.

The raw reports substantiate the public blocker descriptions; they are independently **read and hash-checked**, not independently rerun here.

## Concrete source semantics

`engine.ts:76–151` funnels every requested frame through one retained sync and `clientWaitSync(sync,0,0)`. Unsignaled work keeps one pending request without applying simulation/size updates; only a signaled fence allows the next real draw. The new counters preserve submitted-minus-completed even after a sync is deleted.

`engine.ts:179–185` stops active RAF but deliberately retains `pendingDt === 0`, then `schedulePoll()` can submit it later. Consequently a genuine final static image can increment frames after `running:false`. This matches Relax/Sleep's unchanged immediate freeze failures; constant time does not turn those failures into passes.

`engine.ts:191` invokes the interaction and returns its bounded event even if `renderFrame(0)` has only queued its image behind the preceding fence. Thus one callback can be correct while the immediate stopped-image assertion still reads frame 1 instead of 2. The cycle and context-loss raw snapshots omit GPU pending/fence fields; their exact timing cannot be reconstructed from a different suite's samples.

The original Winter record reports submitted/returned 7/7 and signaled completed 6; one batch is still unconfirmed at disposal even though retained sync count becomes zero. Deleting the sync is not GPU completion. Reported fresh first-render return and disposal-body durations are CPU boundary timings, separate from five-second host retention and physical reclamation.

## Intake decision

Keep this measured candidate and its honest failure evidence, but **do not replace current f154 or merge PR65**. Reconcile the required final static image with the existing paused/input contract through the owner; do not weaken assertions, hide frame increments, discard necessary images, or call the narrow Winter pass a completed four-world gate. No source evidence establishes that a shared-host edit is required. Full App routing/fullscreen/audio, physical reclamation, hardware performance, real tab hiding and actual hardware DPR changes remain unverified by these owner artifacts.

The separate current-f154 DFG investigation remains applicable as its own finding: identifying a sole renderer-owned DFG texture does not mean all resources are freed. The module-global LUT's dispose listener strongly retains a per-renderer texture-manager/context reference path; see `cozy-winter-residual-texture-source-diagnosis.md`.
