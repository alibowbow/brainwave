# Revised bounded static-image completion contract

These are new, explicitly revised harnesses. A passing report has `revisedContract: true` and `originalGateClaim: false`. It cannot retroactively pass the original fixed-observation pause/input assertions or replace their preserved failures under `../backpressure/evidence/`. The original harnesses and historical evidence are immutable.

The new contract permits a required static image to finish asynchronously. `completion.mjs` waits for the same live engine/canvas to report all of the following:

- Actual animation is stopped and scene time stays exactly fixed throughout the wait.
- A positive requested revision equals the submitted and GPU-acknowledged revisions, with neither image nor size dirty.
- Real submitted/completed batch counts match; no retained incomplete fence, pending image request, completion timer, or failure remains.
- Revisions and batch counts are monotonic. Every additional paused frame corresponds to a real submission/return and an advancing required image revision; unchanged-clock arbitrary redraws are not accepted.

The completion deadline is absolute, normally captured before the requesting action, and never resets on a poll or a coalesced revision. The first observed unfinished request further clamps the remaining budget using the production `image.requestedAt` clock. Final production timestamps must show ordered request/submission/acknowledgement within 120,000 ms. The helper polls diagnostics every 50 ms; this is a polling interval, not a fixed sleep used as evidence of completion. It issues no GL calls, fence, readback, scene render, or replacement production scheduler.

Only after acknowledgement does the existing 180 ms observation window prove exact frame/time/image-revision/submission stability. `completeAndStable` treats that observation as a separate post-completion window. The dedicated lifecycle copies retain their stronger existing outer 120-second wrappers where those already enclose completion plus stability. The original **fresh-ready selector still has its unchanged 120,000 ms bound**, followed by a separately identified required-image acknowledgement. Disposal retains its separate 30,000 ms bound and unchanged 5,000 ms host grace.

## Coverage and provenance

| New file | Retained coverage and explicit revision |
| --- | --- |
| `verify.mjs` | Copied original full sequence, unchanged imported chrome checks, fixed-pose PNGs, actual animation, geometry touch, keyboard callbacks, drag/cancel, holder transfer, reduced motion, static mode, synthetic hidden state, three rapid remounts, delayed disposal, and original fresh-ready gate. Required static images are acknowledged before stability/capture. Native keyboard actions and geometry touch require a newer acknowledged revision on the same engine/canvas and exactly one callback. |
| `verify-group.mjs` | One browser invocation per world, no retries. Continues only with previously unrun worlds after a failure; aggregate result fails if any invocation/report fails. |
| `cycles.mjs` | Initial actual animation, two consecutive disposal/fresh-engine/native-keyboard-input cycles, three distinct engine/canvas identities, and final disposal. Original exact one-event/one-frame input checks remain after acknowledgement. |
| `context-loss.mjs` | Actual `WEBGL_lose_context` while running and after pause, trusted event/state observation, failed UI, detached old canvas, fresh identities, native cup input and final disposal. No synthetic loss event or restoration. |
| `motion-proof.mjs` | Requires the complete revised four-world report, checks current source/bundle hashes, and compares native pixels before/after at least 12 actual animation frames. Both captures follow acknowledged stable images. It saves actual PNGs and hashes. |

The full sequence additionally tests active resize followed by stop on the same canvas, requiring the latest backing/CSS dimensions and a newer acknowledged image. This happens after all ten fixed-pose screenshots, preserving their original poses. During intentionally synthetic-hidden or detached states, polling is suspended: the harness checks no frame/time advance while hidden, resumes visibly in static mode, then requests bounded acknowledgement. It does not wait for completion while deliberately preventing the production pump from running.

Original upstream hashes, revised runner/helper hashes, source and bundle digests, and original entry/shared-host hashes are recorded. Source-map content must match the untransformed original entry, actual engine source, and shared host. Through-run checks reject source/bundle/harness drift. `provenance.mjs` and the lifecycle copies reject output paths that overwrite other original QA directories. The full/group/motion runners also reject an existing final report instead of overwriting it. Root controls the single browser and records the final frozen artifact manifest.

Completion progress is appended incrementally with actual sampled revisions, counters, timestamps, and last-known failures. A blocked page can prevent further diagnostics from reaching Node; the external absolute deadline still fails, and the last accessible sample remains the measurement limit. Diagnostics are production-reported counters, not an independent native-GL trace. The 1 Hz progress output is a filtered log of 50 ms polling, not a complete sequence of every browser transition. No physical GPU reclamation, device FPS/thermal behavior, or real hardware fault is inferred.

## Commands after root freezes production

Build the unchanged original QA entry once using the existing builder. No new browser entry or source transform is used:

```sh
COZY_BUNDLE=/tmp/cozy-static-completion-bundle node components/immersiveWorlds/cozyRooms/qa/followup/build.mjs
```

Set `SCENE_BROWSER_PATH` to the approved Chromium executable. Run each gate once, sequentially, with that same `COZY_BUNDLE` and optional `COZY_MANIFEST`:

```sh
COZY_BUNDLE=/tmp/cozy-static-completion-bundle node components/immersiveWorlds/cozyRooms/qa/static-completion/verify-group.mjs
COZY_BUNDLE=/tmp/cozy-static-completion-bundle node components/immersiveWorlds/cozyRooms/qa/static-completion/cycles.mjs
COZY_BUNDLE=/tmp/cozy-static-completion-bundle node components/immersiveWorlds/cozyRooms/qa/static-completion/context-loss.mjs
COZY_BUNDLE=/tmp/cozy-static-completion-bundle node components/immersiveWorlds/cozyRooms/qa/static-completion/motion-proof.mjs
```

Each has a separate default evidence directory beneath this directory. `COZY_OUTPUT` can select a new owned directory. For motion with a non-default group output, set `COZY_VERIFICATION` to its complete revised `verification.json`. A failed prerequisite is recorded before opening a motion browser. A retry needs a separately authorized run and a new evidence path; there is no automatic retry loop.

Implementation checks so far: all seven `.mjs` files pass `node --check`. Browser results are not claimed here until root runs the frozen candidate.
