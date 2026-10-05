Cozy actual-App disposal run — FAILED

One granted run completed in 28.341 s. No retries or additional cases ran. Source and dist stayed stable; application provenance is valid. Owned Chromium PID 52 exited normally (code 0), with no forced kill or cleanup error. Preview/verifier children ended. GPU is released.

The frozen input was HEAD `19c0561bff1b17d88c447a63fd8bb7e4315c8514` plus the recorded dirty changes, with `index-CkDIijGa.js` and `index-BXP0utCv.css`. The existing verifier selected Winter in Nature, waited for its still state, and navigated to `#/guide`; this was not the separate native Session End harness.

| Gate | Exact evidence | Result |
|---|---|---|
| Old engine identity/lifetime | Instance 1; created 1, disposed 1 | Observed |
| Actual owner disposal | Exactly 1 attempt and 1 return; 7.2 ms call; return 5004.5 ms after observed detach | Observed within retention budget |
| RAF/running | `running=false`; last two native samples frames 2→2 and GL draws 1398→1398 across 106.3 ms | Stopped snapshot observed; dedicated 500 ms quiet gate not reached |
| Canvas listeners | Added 4, removed 4, active 0 | Observed |
| Resource accounting | Post-return geometry count 0, texture count 1, targets [] | **Fails unchanged zero-accounting predicate** |
| Native GL deletion | Textures 30, buffers 1394, VAOs 684, shaders 38, programs 18, framebuffer 1 | Observed |
| Automatic context loss | Not observed; not required by Cozy disposal contract | Informational |
| Fixed 20 s disposal gate | Failed after 20057 ms; texture accounting criterion pending | **Failed** |
| Fresh instance / native callback / second disposal | Execution stopped at first failed gate | **Not reached** |
| Browser cleanup / provenance | Normal exit, no forced kill; sourceStable/distStable/applicationBound all true | Passed |

The host stores one diagnostics snapshot immediately after `dispose()` returns. Later reads repeat that stored snapshot; they do not establish that live memory stayed at 1. The present evidence proves the zero-accounting gate failed, not that disposal hung, a physical GPU leak exists, or the browser stalled. Physical GPU reclamation and garbage collection were not measured. The observer intentionally retains old canvas/GL references.

The prior owner four-world 120 s failure remains separate and unresolved. This run does not replace or erase it. See `evidence/nature-verification.json`, `runner-summary.json`, and `review-summary.json` for exact evidence and hashes.
