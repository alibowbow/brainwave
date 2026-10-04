# Isolated visual and lifecycle QA

This harness imports the actual three scene entries. It neither changes shared routing nor bundles a duplicate scene implementation. Its toolbar is excluded from every evidence PNG. These are browser viewport tests, including a Fold-inner-like viewport, not hardware/thermal/FPS measurements.

From the repository root, with existing dependencies installed:

```sh
npx vite build --config components/immersiveWorlds/quietSanctuaries/qa/vite.config.ts
npx vite preview --config components/immersiveWorlds/quietSanctuaries/qa/vite.config.ts --host 127.0.0.1 --port 4175
```

Keep that preview process running, then use a second terminal:

```sh
SCENE_BROWSER_PATH=/path/to/existing/chromium node components/immersiveWorlds/quietSanctuaries/qa/verify.mjs
```

If the configured Playwright Chromium already exists, omit `SCENE_BROWSER_PATH`. On this Work executor an existing compatible binary was found at `/tmp/cosmic-browser-bin/chromium`; Chromium reported version `153.0.8010.0` and created WebGL2 successfully. No browser-install success is implied. The verifier uses ANGLE SwiftShader so it also works on GPU-less CI with a supported installed browser. Do not add a new shared workflow solely for this harness.

Optional environment variables:

- `SANCTUARY_QA_URL`: URL of the isolated built harness (default `http://127.0.0.1:4175`).
- `SANCTUARY_QA_SERVE=1`: start/stop the owned Vite preview in the verifier process. Use this when separate executor commands have separate loopback namespaces; no external routing or access change is needed.
- `SANCTUARY_QA_OUTPUT`: evidence output directory (default `qa/evidence/`).
- `SANCTUARY_QA_MODE=visual`: fast initial visual captures; deliberately skips full interaction and lifecycle verification and labels the JSON accordingly. Final approval requires a normal run.

Manual URLs are `?world=meditation`, `?world=warm-heart`, and `?world=snow-village`. Add `&inactive=1` or `&static=1` to test a complete first frame directly in those states. The visible QA toolbar toggles active, static 3D, mount, and a second holder; its output counts genuine scene `onInteraction` events.

The full verifier checks active motion by frame/clock progression and actual changed rendered pixels; active pause; initial inactive/static first frames; static/reduced-motion/synthetic-hidden pause; genuine raycast taps and bounded callback values; real drag and out-and-back drag versus tap; pointer cancellation; exact canvas DOM and engine identity while moving between two holders; quick repeated remounts during the existing five-second grace; actual GPU context loss on the saved released renderer after grace, followed by fresh engine creation. Each scene gets desktop 1280×800 and narrow portrait 390×844 captures. Snow village also gets a 900×650 Fold-inner-like landscape capture. The hidden test explicitly overrides `document.hidden`/`visibilityState` and dispatches `visibilitychange`; it does not claim real browser-tab switching. Pointer cancellation is synthetic after a real mouse-down; taps and drags use browser pointer input.

`verification.json` contains Git HEAD, branch, dirty owned status, every source-file SHA-256, aggregate source SHA-256, every built-file SHA-256, aggregate bundle SHA-256, renderer counters, per-check results, errors, and PNG hashes. Before testing, it fetches every served bundle file and checks exact equality to the local `.build` content. A dirty source tree is explicitly recorded; the source manifest identifies its exact content independently of Git HEAD. A passing JSON means the automated checks completed; aesthetic approval still requires reading the actual images. No production audio or shared catalog integration is claimed.

The verifier captures all seven visual compositions first: desktop 1280×800 and portrait 390×844 for every world, plus 900×650 Fold-inner-like snow. Each uses the real complete initially inactive frame. It also captures a **1280×800 byte-reflection compatibility frame** from a separate context described below. It then uses a native **640×480 browser viewport** for motion, pointer and lifecycle checks, producing three motion and three post-interaction PNGs. This test-window size limits software-GPU contention; production resolution, geometry, shaders, shadow settings and frame policy are unchanged. The JSON explicitly records every viewport. The full run produces 14 PNGs, and progress checkpoints are saved with `passed: false` until every check finishes.

Reflection capability verification uses the normal meditation desktop frame to compare the renderer's `reflectionTargetType`, `reflectionFloatExtension`, and `reflectionHalfFloatExtension` diagnostics with extension queries on its existing WebGL2 context. Half-float is expected if either color-buffer extension is available; otherwise unsigned byte is expected. A separate fresh browser context installs an initialization script **before application startup** that makes native `getExtension` return `null` for `EXT_color_buffer_float` and `EXT_color_buffer_half_float`. It records blocked startup requests, loads the unchanged production component with only `inactive=1`, and requires a ready unsigned-byte first frame. No production capability flag, substitute canvas, shader replacement, or poster is used.

Both paths must retain a live WebGL context, leave no GL error codes, and show nonuniform pixels in a documented interior basin region of their actual PNGs. The JSON records the sampled rectangle, color/luminance variation, actual queried capabilities, selected type and mask startup evidence; GL-related warning messages also fail verification. This tests simulated missing-extension behavior, **not** physically unsupported hardware. The compatibility path can omit indirect environment lighting, so normal and byte screenshots are not required to have identical pixels. Direct/hemi lighting and real scene reflections still have to produce a usable first frame.

Screenshots are taken while paused after the relevant frames have actually rendered. Motion verification advances the real frame/elapsed counters between two paused images and compares their pixels. The post-interaction PNG follows a genuine successful raycast event; its visual change is not isolated from ordinary ambient movement, and the recorded callback is the interaction-specific evidence. Fast visual mode captures the seven initially inactive composition frames plus the byte-reflection frame and capability checks; it never claims motion verification.

`qa/.build/` is generated and uncommitted. `qa/evidence/` contains modest committed QA-only images/JSON for review and must not enter production assets. Do not change the scene source or harness after the final evidence run without rebuilding and re-running; generated evidence itself is excluded from the source digest.

For the managed Work executor, a single-process preview + browser run is reproducible with:

```sh
npx vite build --config components/immersiveWorlds/quietSanctuaries/qa/vite.config.ts
SANCTUARY_QA_SERVE=1 SCENE_BROWSER_PATH=/tmp/cosmic-browser-bin/chromium node components/immersiveWorlds/quietSanctuaries/qa/verify.mjs
```
