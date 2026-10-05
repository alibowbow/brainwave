Links single actual-App run — FAILED

The one granted run completed in 63.402 s on frozen HEAD `19c0561bff1b17d88c447a63fd8bb7e4315c8514` plus the recorded working-tree changes. Build `index-CkDIijGa.js` / `index-BXP0utCv.css` matched the own preview. Source, dist and application provenance are valid. No retry or audio run occurred.

The first step failed at the unchanged 60,000 ms renderer-readiness deadline (actual elapsed 60001 ms), before the first native click. The report contains zero completed checkpoints.

| Check | Result |
|---|---|
| Cold readiness binding | Failed; zero binding payloads received |
| Native first click / one-tap retry / timer and history assertions | Not reached |
| Warm hash / copy / history | Not reached |
| Saved / last / reload / invalid links | Not reached |
| Pending readiness cancellation | Not reached |
| Source / dist / served build provenance | Passed |
| Browser cleanup | Passed: Chromium PID 52 normal exit 0, no forced kill, no cleanup errors; own preview/verifier ended |

The final raw read used `userGesture:false` and acknowledged in 3.44 ms, within its 5 s bound. At that moment the focus route and heading were present, autoplay was blocked, the timer was 40:00, activation remained false/false and no inputs had occurred. One suspended AudioContext existed, with zero analyser graphs or oscillators; its sole resume attempt recorded no active gesture. No recent session was written. These are failure-time observations, not a passed first gate.

Zero binding evidence includes no initial non-ready payload. The run therefore does not distinguish observer installation/delivery failure from actual scene-readiness failure. `scene:null` is the optional `__coldSceneSnapshot` hook result, not a DOM canvas count. The prompt raw response supplies no App-stall finding.

GPU is released and repository freeze may lift. Raw results remain unchanged in `evidence/links/link-verification.json` and `runner-summary.json`.
