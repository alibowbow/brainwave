# Winter recreation phase diagnosis

Run one clean same-document winter probe first. It keeps the original QA UI, active=false, full quality, 960×700/DPR 1, original 5000 ms retention and original 30 s disposal/120 s readiness bounds. It adds no screenshots, GPU fences, motion, forced context loss, reload, or retry.

```sh
SCENE_BROWSER_PATH=/path/to/chromium COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/recreation/evidence/clean node components/immersiveWorlds/cozyRooms/qa/recreation/clean.mjs
```

The QA-only Vite plugin instruments built copies of the existing engine and shared host. It never edits those production files. Constructor, factory and swallowed host exception boundaries are explicit. Prototype observers preserve argument/return/throw semantics and return the exact original `init()` Promise. Native canvas width/height descriptors delegate unchanged and distinguish actual setter invocations from renderer resize calls. Renderer pixel ratio, size and render methods record entry/return with program/draw counts; these count submission work, not GPU completion. Three's original shader-console behavior is retained. No GL function or shader implementation is replaced.

`phases.jsonl` is appended incrementally from console protocol events and an independent binding delivery path, deduplicated by event sequence. It survives a later synchronous browser stall. `diagnostic.json` retains first mount, disposed and fresh-mount snapshots, actual host status/engine identity separately from React DOM state, production/shared/dependency source hashes, instrumentation-script hashes and the separate instrumented bundle hash. The canvas inventory uses WeakRefs; it does not retain old canvases or contexts. Final read-only diagnostics and browser cleanup have separate Node bounds. A readiness timeout must be classified by the earliest missing phase or recorded caught/context-loss event; a GPU backlog by itself does not establish why DOM readiness failed.

Only if the clean probe passes, perform one comparison with the original failure sequence:

```sh
SCENE_BROWSER_PATH=/path/to/chromium COZY_CLEAN_REPORT=components/immersiveWorlds/cozyRooms/qa/recreation/evidence/clean/diagnostic.json COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/recreation/evidence/original-sequence node components/immersiveWorlds/cozyRooms/qa/recreation/original-sequence.mjs
```

This wrapper reads the existing `verify.mjs`, preserves its entire `try/for` sequence byte-for-byte, and records the source, generated runner, unchanged-sequence hashes and every setup substitution. Original assertions, screenshots, controls, motion policies and timeouts stay intact. A generated runner only inserts the diagnostic build plugin and stream before navigation, and preserves a thrown error outside the original test body. It executes one winter process and retains the original failure rather than retrying or widening a gate. Compare earliest phase divergence with the clean run; neither instrumented run substitutes for final uninstrumented acceptance.
