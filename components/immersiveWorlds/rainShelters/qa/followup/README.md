# RainShelters bounded follow-up verification

This fixture is separate from production. It preserves the original fixture's scene surfaces, sibling chrome, controls, all four scene entries, and viewport/DPR 1 settings. `instrumentation.ts` imports only into this fixture; it wraps the owned engine and renderer's JavaScript methods to timestamp scene initialization, each real `renderer.render` submission, disposal entry/exit, canvas connection, and a 50 ms main-thread heartbeat. It does not patch WebGL calls, extensions, native capabilities, or production scheduling.

The original 17 PNGs, 64 segmented behavioral checks, and all prior reports remain untouched in `../evidence`. Neither the original checks nor this follow-up is claimed as one uninterrupted full-application pass.

## Source and evidence identity

The before captures served the original built fixture from detached source `0dc8e935fb950bf43ede4ab96b3623649d2bc37f`. The after runs served the follow-up fixture built from source checkpoint `1897ea5295fa1a88777e3aae8f969d888df607d4`. Each report binds exact owned source hashes, the SHA-256 of that ordered source map, built assets, actual served JavaScript/CSS response hashes, browser identity, viewport/backing dimensions, and every PNG's dimensions/SHA-256. Evidence-only commits after the source checkpoint do not change those tested runtime bytes.

Reports under `evidence/`:

- `before-capture-window-storm-tent-porch-normal.json`: eight fresh paused desktop/portrait baseline captures.
- `after-capture-window-storm-tent-porch-normal-byte.json`: sixteen fresh paused desktop/portrait captures, all four worlds in normal and explicitly selected byte mode.
- `after-compatibility-input-motion-lifecycle-window-storm-tent-porch-normal-byte.json`: thirty-two independently launched browser segments, four stages per world per target mode.
- `summary.json`: counts, exact-preservation comparisons, and cleanup timing table derived from the detailed reports.
- `artifact-manifest.json`: SHA-256 and size for the evidence files.

`target=byte` calls the owned helper's explicit QA selector before the original engine initializes. It never lies about `EXT_color_buffer_float`, `EXT_color_buffer_half_float`, or WebGL2 capabilities. Actual checks assert full-native-size window refraction storage, existing 1024² directional shadow storage, FBO status 36053, zero GL errors, and binding/state restoration. No PMREM, Reflector, or environment target exists in these Rain scenes; the window effect is same-camera refraction.

## Test stages

**Capture:** each image starts in a fresh browser at the final target viewport and paused state. After JavaScript submits the first frames, a real WebGL2 fence is flushed once and polled with `clientWaitSync(sync, 0, 0)` in later 25 ms tasks. A null fence, `WAIT_FAILED`, context loss, or changed simulation/submission count fails. No `gl.finish`, readback substitution, altered CSS scene, or fake screenshot is used. Fence retirement and actual native PNG capture share a 120 s budget, with at most 90 s assigned to the fence. Screenshot overhead is recorded separately from GPU completion waiting.

**Compatibility:** after first-frame GPU completion, a real checked 16² byte cube render target is selected at cube face 2, mip 1. Both the full audit state helper and production hot refraction state helper are tested for exact normal/exception restoration. GardenWindow additionally executes the actual refraction recipe once successfully and once with an intentional JavaScript exception at `renderer.render`; no GL function or extension is modified. The exception test verifies the owned pass restores the same non-null target/face/mip and renderer state.

**Input:** real mouse events hit the transparent sibling drag surface and interactive chrome. The test proves one native target tap produces one event, controls receive native input without scene gestures, drag is not tap, and transfer/return retains one canvas and one listener. Synthetic cancellation/blur is explicitly labeled. Static before/after PNGs prove a native tap changes actual pixels in exactly one draw without advancing simulation time. A final native screenshot preserves visible chrome after interactions.

**Motion:** fresh paused first frame, no paused submissions/time advance, active motion, pause, emulated reduced-motion media, static3D, and synthetic hidden/restored visibility are tested. Synthetic document visibility is not a real browser-tab switch.

**Lifecycle:** a fresh browser with no screenshots and no pre-disposal fence checks cold paused removal, actual cleanup/context-loss, fresh remount, short real motion plus holder transfer/return, and a second removal. Both cycles have the same strict 20,000 ms removal-to-dispose-exit gate, including the unchanged configured 5,000 ms shared-host grace. The reports separately record removal request/observation, dispose entry/exit, `isContextLost()` observation, JavaScript submissions, and heartbeat gaps. Detached canvas `webglcontextlost` event delivery is not assumed. A failed first cleanup marks dependent remount unrun; failures are retained, not replaced by a longer timeout.

## Reproduction

Use the repository's existing dependencies. Set `SCENE_BROWSER_PATH` to an available Chromium executable. The existing Three revision remains r186.

```sh
npx vite build --config components/immersiveWorlds/rainShelters/qa/followup/vite.config.ts
RAIN_PHASE=after RAIN_WORLDS=window,storm,tent,porch RAIN_MODES=normal,byte RAIN_STAGES=capture node components/immersiveWorlds/rainShelters/qa/followup/run.mjs
RAIN_PHASE=after RAIN_WORLDS=window,storm,tent,porch RAIN_MODES=normal,byte RAIN_STAGES=compatibility,input,motion,lifecycle node components/immersiveWorlds/rainShelters/qa/followup/run.mjs
```

The wrapper starts the built preview and browser within one process scope on loopback port 4187. `RAIN_QA_ROOT`, `RAIN_SOURCE_ROOT`, `RAIN_PROJECT_ROOT`, and `RAIN_OUTPUT` allow the same capture runner to serve the original detached fixture without modifying it. `RAIN_VIEWS=desktop,portrait` defaults to 1440×960 and 390×844; neither buffer nor DPR is reduced relative to the original matching fixture.

## Limits

These are isolated scene fixture checks. Production routing, shared audio/player integration, full-app chrome and protected scenes remain the central integration owner's responsibility. Viewports are emulated, not physical phones/Fold devices. SwiftShader timing is not hardware FPS or thermal performance. No listening assessment was performed. The near-limit window disposal and measured event-loop blocking are explicitly retained in the timing summary; a passing 20 s gate must not be described as five-second GPU resource release or a guarantee for long playback.
