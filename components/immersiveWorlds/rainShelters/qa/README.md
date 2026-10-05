# Isolated rain-shelter QA

This harness imports only the four owned entry components. Each lives inside a realistic parent `[data-scene-surface]` with a sibling full-cover `[data-scene-drag]` layer and button/range-input player chrome inside that layer. The harness does not assign `touch-action:none` to this layer; any touch policy must come from the owned scene implementation. It does not change the production App, catalog, shared player, audio engine, or protected worlds. The QA bundle is ignored and stays outside production assets.

Build and serve the isolated production bundle from repository root:

```sh
npx vite build --config components/immersiveWorlds/rainShelters/qa/vite.config.ts
npx vite preview --config components/immersiveWorlds/rainShelters/qa/vite.config.ts
```

With that preview running, use an installed supported Chromium executable:

```sh
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/rainShelters/qa/verify.mjs
```

For executors with a separate loopback namespace per command, stop any separate preview and run both preview and browser in one process:

```sh
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/rainShelters/qa/run.mjs
```

`SCENE_BASE_URL` defaults to `http://127.0.0.1:4175/`. `SCENE_SCREENSHOT_DIR` changes the output directory. `SCENE_WORLDS=tent,window,porch,storm` selects a subset; `SCENE_CAPTURE_ONLY=1` checks the initial paused full 3D frame and captures desktop/portrait screenshots for iterative visual review without starting continuous rendering. A complete acceptance run omits that flag.

The script records actual WebGL2 renderer information, errors, exact source and emitted QA bundle SHA-256, desktop 1440×960 and portrait 390×844 PNGs for every world, and an 884×768 Fold-inner-sized viewport for the porch. It checks animation, pause, native canvas taps on raycast targets, accessible interactions, pointer cancellation, drag-versus-tap, reduced motion, static3D single-frame interaction with actual pixel changes, an initially static nonblank first frame, synthetic hidden state, native visible-chrome overlay taps/drags, chrome control isolation, overlay cancellation/window blur, second-holder canvas identity and single-listener ownership, quick mount/unmount reuse, and delayed resource disposal. The tent player-chrome screenshot deliberately includes controls as evidence; normal composition images hide QA-only controls.

Second-holder relocation tests the scene-host contract; integrating real production fullscreen remains the integration owner's task. Hidden state is explicitly synthetic, not a real tab switch. Viewports do not establish physical Fold performance. Software WebGL timings do not establish device FPS or thermals.

The accessible scene-action check dispatches the button's semantic click handler; it does not certify that this local button can be physically hit through a sibling cover. Native object taps, native overlay drags, and native player button/range-input isolation are separate checks. Integration should expose the semantic action in reachable shared chrome.

Disposal is verified on the retained native WebGL context with `isContextLost()` after the host retention delay and by a fresh canvas on remount. A detached canvas may not deliver a `webglcontextlost` notification, so an event counter alone is not the disposal gate. The evidence includes the diagnostic that motivated this correction. The final report identifies any segmented run and its exact source/bundle provenance.
