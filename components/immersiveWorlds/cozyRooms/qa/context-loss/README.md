# Actual context-loss regression

Status: prepared only; not executed by its author. This is conditional QA for a later, explicitly selected final production bundle. Its presence is not a context-loss pass or authorization for a production change.

The runner opens one Chromium browser and one page using the original `qa/index.html` and `qa/main.tsx`. It tests Winter Lodge twice: loss during actual animation, and loss after verified pause. Each case submits at least three animated frames before its loss setup.

It calls `WEBGL_lose_context.loseContext()` on the scene's existing WebGL2 context. It requires a browser-generated `webglcontextlost` event with `isTrusted === true`, `isContextLost() === true`, the original failed-state DOM, engine disposal, no subsequent lost-canvas frame submissions, and disabled failed-scene input. It never dispatches a synthetic context-loss event. A missing extension, browser failure, timeout, page error, or failed assertion fails the run; none becomes a skip or pass.

After each loss, it unmounts the failed holder and requires a fresh engine and canvas, one trusted native Enter activation of the original cup action, an exactly-once bounded callback with the Winter Lodge ID, and final normal disposal. Across both cases it requires four distinct engine/canvas identities and final lifetime counters of four created and four disposed. Canvas IDs use a WeakMap. The lost canvas has a temporary strong reference only through the immediate loss/stopped-frame assertions; this reference is cleared before unmount and recovery.

Readiness keeps the 120-second bound. Actual loss-to-failed/disposed/stopped and each final disposal have a single 30-second outer budget. Normal disposal retains the unchanged host's 5000 ms grace. The runner does not install a production transform, renderer wrapper, screenshot, readback, fence, or restoration call. It does not replace the original visual, chrome, drag, cancellation, hidden, reduced-motion, and holder-transfer suites.

Before running, build the original harness from the chosen production source using the existing builder, then use the same bundle and manifest paths:

```bash
COZY_BUNDLE=/tmp/cozy-final-bundle node components/immersiveWorlds/cozyRooms/qa/followup/build.mjs
SCENE_BROWSER_PATH=/path/to/installed/chromium COZY_BUNDLE=/tmp/cozy-final-bundle COZY_OUTPUT=/tmp/cozy-final-context-loss node components/immersiveWorlds/cozyRooms/qa/context-loss/verify.mjs
```

`COZY_MANIFEST` optionally selects the manifest; by default it is `<COZY_BUNDLE>.manifest.json`. `COZY_PORT` defaults to `4215`. `COZY_OUTPUT` defaults to this folder's `evidence` directory. Building alone does not run the regression. Run it only when the integration owner requests final coverage.

The runner reuses `followup/common.mjs` for source/bundle verification and Chromium flags. It checks the original entry and shared host against HEAD, verifies original entry/engine/host bytes in bundle source maps, and compares final source/bundle hashes to their initial values. It records the Git revision, tested production and bundle hashes, runner hash, browser version and observed WebGL renderer. Current source hashes matter when a final patch has not yet been committed.

`progress.jsonl` is written and streamed as each stage starts or completes. `context-loss.json` preserves completed cases and failures, including a bounded one-second DOM/status snapshot attempt. Browser cleanup is bounded; if graceful close exceeds ten seconds, the runner gives its own BrowserServer forced termination five seconds, then requests SIGKILL of that owned process if needed. Any graceful-cleanup timeout marks the run failed. It makes no retry in a tainted browser.

This tests real driver context loss in a software WebGL browser. It does **not** simulate a physical GPU fault, establish physical GPU resource-release timing, or measure hardware performance. No execution result is claimed until a byte-bound report exists and is reviewed.
