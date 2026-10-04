# Isolated deep-water QA

This directory is development evidence and is not part of the application router or production public assets. It imports the three exact default entry components with only `active` required. No shared application or package files are changed.

From the repository root, use existing dependencies:

```sh
./node_modules/.bin/vite build --config components/immersiveWorlds/deepWater/qa/vite.config.ts
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/deepWater/qa/verify.mjs
```

`verify.mjs` owns its preview server and browser in the same process. This matters in Work shells with isolated loopback namespaces. For a pre-existing accessible preview, set `DEEP_WATER_QA_BASE`. The default browser path is this Work's already-installed Chromium; CI or another machine should set `SCENE_BROWSER_PATH` explicitly. No browser or dependency download is performed.

- Default output: `components/immersiveWorlds/deepWater/qa/evidence/`
- Override output with `DEEP_WATER_QA_OUTPUT`.
- Override bundle path with `DEEP_WATER_QA_DIST` consistently for build and verification.
- Optional scene subset: `DEEP_WATER_SCENES=waterfall,cave,sea`.
- Fast visual review: run `capture.mjs` after building; it produces desktop and portrait PNGs and throws if JavaScript/shader errors occurred.

The harness accepts `?scene=waterfall|cave|sea`, `&active=1`, `&static`, and optional `&controls`. `window.__deepWaterQA` exposes state setters (`setActive`, `setStatic`, `setSecondHolder`, `setMounted`) and collected interaction events. It does not expose or bypass the scene raycaster.

Full verification captures every scene at desktop 1280×800, narrow portrait 390×844, Fold-like inner 884×1104, and landscape 1104×884. These are browser viewport emulations at DPR 1, not tests on physical Fold hardware. It also checks real rendered pixel motion, first-frame static display, active/pause, both reduced-motion settings, synthetic hidden/visible signals, drag versus tap, pointer cancellation, actual raycast callback delivery, exact canvas identity across a second fullscreen-style holder, rapid remount reuse, delayed disposal, and fresh post-disposal remount.

The hidden test injects `document.hidden` and dispatches `visibilitychange`; it does **not** claim a native background-tab test. A second holder exercises the shared player/fullscreen ownership contract; the native Fullscreen API and full integrated application are outside this isolated harness.

`results.json` includes browser version, runtime/shader errors, per-check results, per-image SHA-256, a source manifest (including harness source), the built asset manifest, and the Git baseline. Source immutability is checked at the end of each complete run. Build immediately before verification and keep scene edits paused until the run completes. Visual approval still requires inspecting the actual PNGs; a `ready` flag alone does not prove shaders compiled or composition is good.

Motion samples are read back with the renderer briefly paused **after** real active RAF frames, resumed between samples, and resumed for pointer testing. This prevents continuous software GPU submissions while Chromium encodes PNGs; the test still requires increased simulation time and different rendered pixels. This is only a test capture procedure, not a production frame cap.

GPU teardown uses the same 120-second test budget as other browser operations. In this shared SwiftShader environment, a 20-second wait timed out even though the next diagnostic snapshot showed zero holders, no engine, and a disposed canvas; the browser was delayed while draining rendering work. Full results record observed elapsed time instead of claiming that disposal finishes exactly at the host's five-second grace deadline. `probe-disposal.mjs` provides a small standalone diagnostic for this path.
