# Actual render-target compatibility verification

The current compatibility check is `verify-target-compatibility.mjs`. It uses the built scene and native WebGL APIs throughout. Its normal meditation case uses the production entry. The explicit QA-only `?world=meditation&targets=byte` case selects unsigned-byte targets through the builder configuration; it does not mask extensions, patch GL methods, or claim to emulate hardware that lacks float support. Production entry props remain unchanged.

From the repository root:

```sh
npx vite build --config components/immersiveWorlds/quietSanctuaries/qa/vite.config.ts
SANCTUARY_QA_SERVE=1 SCENE_BROWSER_PATH=/tmp/cosmic-browser-bin/chromium node components/immersiveWorlds/quietSanctuaries/qa/verify-target-compatibility.mjs
```

Use an existing compatible Chromium path on other machines, or omit `SCENE_BROWSER_PATH` if Playwright's configured browser is installed. `SANCTUARY_QA_SERVE=1` serves and tests the built bundle in one process, avoiding this executor's separate loopback namespaces. The browser and owned preview server close in `finally`. Do not run concurrent GPU verification while scene sources are changing.

The output is separate: `qa/compat-evidence/target-compatibility.json` plus 12 PNGs. `SANCTUARY_QA_OUTPUT` overrides that directory; `SANCTUARY_QA_MODE=visual` captures only the eight full-size images and explicitly omits lifecycle verification. The full run captures:

- Meditation normal and explicit byte targets, each at native desktop 1280×800 and portrait 390×844. Normal images must exactly match the approved historical meditation PNG hashes.
- Warm heart and snow village at both native viewports, with exact PNG hash equality against the approved historical evidence in commit `c5a100794084e6230e9fdc8a4c036a02a5813176`.
- Meditation normal and byte motion plus genuine post-interaction frames at native 640×480.

Each meditation first frame must retain a real reflection and non-null CubeUV environment. The report records actual allocation dimensions, texture storage, framebuffer status, GL errors and renderer-state restoration from every checked target, including PMREM output and scratch targets. Normal selection is based on capability policy and real framebuffer completeness, not the extension advertisement alone. Forced-byte must use byte storage for reflection and both environment targets. The byte QA builder also binds a real complete 64×64 cube target at face 4, mip 1 (32×32 attachment), then probes a separate byte target while viewport, scissor, XR, auto-clear, tone mapping and clear state are non-default. It requires the exact native framebuffer and renderer state to return, with the cube fixture still complete, and disposes both fixtures before building the scene. The browser additionally checks its existing WebGL2 context for loss/errors and measures nonuniform pixels in the desktop basin. Pixel measurements establish usable rendered content; visual approval requires inspecting the PNGs. Missing-extension, half-only, advertised-but-incomplete and byte-failure policy cases are separate deterministic unit tests, not simulated device claims in this browser verifier.

Both meditation configurations run genuine tap, drag, out-and-back drag and synthetic pointer-cancel checks; active/reduced-motion/static and explicitly simulated hidden pause; exact canvas reuse between holders; three quick remounts within the shared five-second grace; static first mount; and actual released GPU context loss after grace followed by a new renderer. Motion requires real counter progression and changed captured pixels. This is SwiftShader browser viewport evidence, not a hardware, thermal or FPS measurement.

Source-file, built-file and PNG SHA-256 manifests bind every capture to exact content and Git HEAD. The verifier fetches every served build file and verifies its hash, then confirms source and bundle content stayed unchanged until completion. It checks the two unrelated scene implementations, the old verifier, and every historical evidence file against the baseline commit without modifying them. `compat-evidence`, historical `evidence`, and generated `.build` are excluded from source hashing. Checkpoints retain `passed: false` until all required checks finish.

## Historical extension-mask verification

The material below documents the earlier `verify.mjs` run and `qa/evidence/` files. Those files remain unchanged for provenance. The old extension-mask experiment is **not** evidence for the current checked-target compatibility patch; use the real-target verifier above for that claim.

### Isolated visual and lifecycle QA

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
