# Isolated Korean places QA

This development-only harness imports the three real entry components. It does not alter the application registry, audio engine, package scripts, or protected scenes. `dist/` is ignored and is not a production asset.

From the repository root, using the repository's existing dependencies:

```sh
node node_modules/vite/bin/vite.js build --config components/immersiveWorlds/koreanPlaces/qa/vite.config.ts
node components/immersiveWorlds/koreanPlaces/qa/verify.mjs --screenshots-only
node components/immersiveWorlds/koreanPlaces/qa/verify.mjs
```

Follow-up runs default to `qa/evidence/followup/`, preserving all original evidence. Use `--output=evidence/followup/review-1` for a separate run directory; output is constrained to a child directory of `qa/evidence/`.

The verification script serves the built harness through a temporary standard HTTP server in the same process/network namespace as Playwright. This avoids cross-exec loopback failures in managed workspaces. No external deployment is created. `--url=http://127.0.0.1:4179` can instead use an existing preview when its namespace is reachable.

The default browser is the existing executable `/tmp/cosmic-browser-bin/chromium`. Override with `CHROMIUM_PATH` or `--browser=/absolute/path/to/chromium` in another environment. The script uses installed `playwright-core` and Chromium ANGLE SwiftShader, without downloading a browser or installing dependencies. `--scene=temple`, `--scene=scops`, and `--scene=rural` select one world.

For interactive inspection in a local environment:

```sh
node node_modules/vite/bin/vite.js preview --config components/immersiveWorlds/koreanPlaces/qa/vite.config.ts
```

Open `/components/immersiveWorlds/koreanPlaces/qa/index.html?scene=temple`. The panel exposes play/pause, static 3D, mount/unmount, second-holder transport, sibling chrome, and an existing-engine `scops` event. Add `capture=1` to hide the panel. Add `active=0` to request a paused real 3D first frame. Add `chrome=1` for the sibling full-cover chrome fixture. All interactions are delivered through the public optional props.

The chrome fixture reproduces the actual `Player` / `ImmersiveMode` DOM relationship: a `data-scene-surface` ancestor contains a scene layer and a sibling full-cover `data-scene-drag` overlay. It uses the real world entries, while the buttons are isolated test UI, not imports of the shared Player components. Tests assert that mouse taps really hit this overlay, that drags reach look, and that UI controls receive their own input without causing scene interactions. Button, input, link and button/slider/switch/checkbox/textbox role probes are deliberately placed over a previously verified raycast target. Real mouse and browser-emulated touch must be captured only by the active scene surface and released on completion. Additional captured mouse gestures test labelled synthetic pointercancel/blur and native lostpointercapture cancellation. Three holder round trips check that each mounted surface has exactly one pointerdown handler and covered holders reject both taps and drags.

## Evidence

PNG captures use desktop 1365×900, narrow portrait 390×844, and landscape/Fold-inner-sized 960×700 viewports for each world. Full verification also saves one **initial paused chrome-visible** PNG per world, immediately after the initial desktop capture and before any resizing, motion or interaction tests. That PNG establishes initial visible chrome and composition; it is not a post-interaction frame. Actual subsequent interaction results are recorded in the JSON. These are viewport tests, not physical Fold hardware tests. Screenshot-only mode loads paused so still-image review does not consume continuous software rendering. The full suite separately exercises genuine motion between two paused screenshot endpoints.

Lifecycle and input tests use a separate **683×450 test viewport**. This keeps genuine native RAF animation and unchanged scene rendering while reducing observed SwiftShader GPU queue/readback cost. Pointer and touch coordinates are derived from that viewport. Lifecycle stays at that viewport throughout; taking the initial full-size chrome image before lifecycle avoids a late full-size SwiftShader readback after many held/stepped frames. The three clean captures and chrome-visible capture remain at their full stated sizes; no production quality, DPR, frame cap, or scene source is changed. Each lifecycle phase logs progress, evaluate calls have a 30-second bound, and composited screenshot readbacks have a 60-second bound. Timeout failures are reported immediately and are not presented as successful hardware testing.

The first motion probe runs with **native RAF, scheduler held=false**, and compares actual changed pixels between paused endpoints. Afterward, a **QA-only scheduler** holds just the renderer's pending RAF callbacks between input actions, preventing an unbounded software GPU backlog. Other browser RAF and trusted browser input are unchanged. Cooldown is advanced through **11 actual scene renders**, one at a time: an ≥85ms real wait, an actual native RAF timestamp, the original engine callback, then `gl.finish()` to drain that real render. No timestamp/dt is fabricated and no world-time field is mutated. Drag/touch also execute real rendered steps. Pause/reduced/static/hidden checks require the engine's running flag to be false and its scheduled renderer callback count to be zero, so the gate cannot conceal cancellation leaks. Navigation installs a fresh scheduler, and the application never imports this QA module.

Screenshots assert that the canvas fills the viewport and that its resized backbuffer matches the expected DPR, drain submitted WebGL work with the existing QA `gl.finish()`, then capture that exact viewport clip through Chromium `Page.captureScreenshot`. This retains actual composited chrome pixels and avoids temporary Playwright screenshot stylesheet/layout preparation while the scene scheduler is held; no screenshot condition, resolution, or rendered content is substituted.

JSON records exact source-file SHA-256 values, the built harness file hashes, repository HEAD, browser version, PNG hashes, scene state, canvas identity, and observed rendering counters. Since screenshots can be generated before a commit, the content hashes are the authoritative evidence linkage. Rebuild before rerunning after source edits.

Full verification covers actual motion and changed pixels; active pause, reduced motion, static-3D and static first-frame stability; labelled synthetic hidden-state pause; pointer drag/cancellation/blur; raycast touch events and bounds; second-holder canvas transport and return; rapid remount reuse; observed disposal followed by a newly built canvas; and no newly created AudioContext. The synthetic hidden and cancellation tests are explicitly labelled in evidence. Bringing another headless tab forward may not trigger real visibility changes; the JSON records observation without claiming a test that did not occur.

Disposal evidence separates the **5000 ms host grace period** from real cleanup. The isolated harness wraps `WorldEngine.dispose` only to timestamp its entry and synchronous return, and observes the browser's actual `webglcontextlost` event on the old detached canvas. It does not change the host timer, resource methods, or renderer. The report includes unmount-request and observed-detach timestamps, cleanup duration, context-loss timing, zero retained scene RAF callbacks/listeners/audio subscribers, and the distinct new canvas identity after remount. This establishes execution of application cleanup and browser context loss; it does not measure physical GPU-driver memory reclamation latency.

The suite additionally sends Chromium CDP `Input.dispatchTouchEvent` touch-start/move/end events over visible sibling chrome. It checks trusted browser pointer behavior, actual look handling, no native pointer cancellation, and no accidental tap. Computed ancestor `touch-action:none` and explicit inline `pan-y` precedence are checked separately. This is real browser input emulation, not synthetic DOM pointer dispatch, and does not establish physical touch-device performance.

The audio test checks subscription to the existing-engine event contract. It does not certify recordings, actual playback, spatial sound, or listening quality. No device FPS, temperature, battery, or GPU-memory claims are made.
