# Bounded visual follow-up verification

These scripts supplement the existing `verify-group.mjs` and its 104 reported checks. The original verification scripts, assertions, timeouts, and evidence remain unchanged. No shared host, production input policy, renderer scheduler, browser security configuration, image quality, or drawing-buffer scale is changed by this follow-up.

Final status is in [HANDOFF.md](HANDOFF.md) and [FINAL_RESULTS.json](FINAL_RESULTS.json): the original group completed 78 checks, then failed winter recreation; an isolated unchanged retry failed the same step. Four separate clean disposal measurements passed, but do not resolve recreation. The original motion-only pixel proof remains unrun because its passing-verification prerequisite was unmet.

The screenshot runner serves a bundle built from the **original** `qa/index.html` and `qa/main.tsx`, with the same Vite settings as `verify.mjs`. Its manifest includes the current production-source digest, each source file's SHA-256, the bundle digest and individual bundle-file hashes. Each PNG report records its SHA-256, viewport/DPR/backing/CSS dimensions, actual renderer/backend, browser version, scene instance/frame/time, GPU completion status, drain duration, and screenshot duration. Files under this directory are QA artifacts, not production assets.

From the repository root, set `SCENE_BROWSER_PATH` to the supported Chromium executable. Run one browser workload at a time:

```sh
export SCENE_BROWSER_PATH=/path/to/chromium
export COZY_BUNDLE=/tmp/cozy-followup-bundle
export COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/followup/evidence/final
node components/immersiveWorlds/cozyRooms/qa/followup/build.mjs
COZY_INTERACTIONS=0 node components/immersiveWorlds/cozyRooms/qa/followup/capture.mjs
```

The quick visual run captures the initial, naturally paused desktop and portrait views of every world, plus the existing terrace Fold-inner and winter landscape viewports. `COZY_WORLDS` can select a comma-separated subset. After reviewing the real PNGs and freezing production source, run the native-input supplement into its own subdirectory so both reports remain available:

```sh
COZY_CAPTURE_COLD=0 COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/followup/evidence/final-native node components/immersiveWorlds/cozyRooms/qa/followup/capture.mjs
COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/followup/evidence/final-original node components/immersiveWorlds/cozyRooms/qa/verify-group.mjs
COZY_OUTPUT=components/immersiveWorlds/cozyRooms/qa/followup/evidence/final-lifecycle node components/immersiveWorlds/cozyRooms/qa/followup/lifecycle.mjs
node components/immersiveWorlds/cozyRooms/qa/followup/fence-check.mjs
```

Compare the original verification's source and bundle digests with the follow-up manifest. The original runner rebuilds the same entry/settings; hash equality establishes the same tested source and bundle. A source change requires rebuilding and fresh final evidence. None of these commands overwrite the earlier `qa/evidence` images. Do not launch a second screenshot or fallback on a timed-out browser.

`fence-check.mjs` runs seven controlled diagnostic checks in Node, including both completion statuses, `WAIT_FAILED`, a null fence, context loss, scene-state drift and a nonresolving page evaluation. Its JSON identifies the exact common-helper and script hashes. These tests exercise diagnostic control flow; they are not GPU scheduler or visual acceptance evidence.

## What the supplement establishes

Before each screenshot the scene must remain paused through a 400 ms settling period and a separate 500 ms no-submission interval. A fence is inserted into the canvas's existing WebGL2 context and flushed once. Zero-timeout `clientWaitSync` checks occur in later event-loop tasks. Only `ALREADY_SIGNALED` or `CONDITION_SATISFIED` count as completion. Null fences, `WAIT_FAILED`, context loss, canvas replacement, or scene/frame/time/size changes fail the capture. Both an in-page deadline and a Node deadline bound the drain; drain and PNG share the existing 120 s capture budget. The fence is deleted in `finally`. No new render or blocking `gl.finish()` is performed.

The native-input run adds browser mouse and touchscreen taps through the hit-tested transparent chrome, a browser mouse drag while real scene animation advances, and a native chrome-button click. It verifies trusted pointer events, exactly one event per successful scene tap, no tap during drag, and a separate chrome action. Its PNG is captured after those interactions with visible chrome. This is additional coverage; it does not replace the original synthetic PointerEvent cancellation, maximum-excursion, hidden-state, reduced-motion, keyboard, holder, and remount assertions.

The clean lifecycle run uses a **separately hashed instrumentation-only bundle**, with the same production-source digest. It imports the original QA UI and delegates through wrappers around the original `CozyEngine.dispose`, connected canvas or ancestor detachment through `Element.remove`/`Node.removeChild`, and 5000 ms timer. A new browser per world advances at least three animated submissions, pauses, verifies a stopped frame counter, then performs holder transfer and final removal without any screenshot, fence, or readback. The report separates configured retention, actual timer fire, dispose entry, dispose return, context-loss observation, and heartbeat delay. It retains events and states before phase assertions and a bounded diagnostic snapshot on failure. It keeps the original 30 s eventual-disposal bound. No `WEBGL_lose_context` call is added; an absent context-loss event is explicitly recorded as unobserved. Dispose return is not a measurement of physical GPU memory reclamation. The separate deterministic host test establishes the configured 5000 ms retention contract, not GPU cleanup timing. This scenario does not test fresh-engine recreation.

## Interpretation and limits

A long fence drain followed by a cheap screenshot is evidence consistent with queued GL work. A quickly signaled fence followed by a slow capture points beyond this scene's preceding GL command stream, without proving a compositor-only defect. The follow-up does not impose or certify a production submission bound, and does not copy another world's renderer policy. A failed drain or PNG remains a failure; later lifecycle evidence comes only from a fresh capture-free browser.

The original before images are actual rendered PNGs, with their original source/bundle identity preserved separately. Final screenshots show the isolated scene harness and its modeled player chrome, not a deployed integrated application. Fold-like sizes are viewport emulation, not physical hardware certification. Existing hidden-state checks explicitly assign `document.hidden` and dispatch `visibilitychange`; they are synthetic. Software WebGL demonstrates pixels and exercised behavior, not hardware FPS, battery, thermal, physical audio, or real-device performance. No result is claimed until its machine-readable report passes and the actual PNGs are reviewed.
