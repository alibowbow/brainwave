# Isolated rain-shelter QA

This harness imports only the four owned entry components. It does not change the production App, catalog, shared player, audio engine, or protected worlds. The QA bundle is ignored and stays outside production assets.

Build and serve the isolated production bundle from repository root:

```sh
npx vite build --config components/immersiveWorlds/rainShelters/qa/vite.config.ts
npx vite preview --config components/immersiveWorlds/rainShelters/qa/vite.config.ts
```

With that preview running, use an installed supported Chromium executable:

```sh
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/rainShelters/qa/verify.mjs
```

`SCENE_BASE_URL` defaults to `http://127.0.0.1:4175/`. `SCENE_SCREENSHOT_DIR` changes the output directory. `SCENE_WORLDS=tent,window,porch,storm` selects a subset; `SCENE_CAPTURE_ONLY=1` performs initial animation/pause checks and desktop/portrait screenshots for iterative visual review. A complete acceptance run omits that flag.

The script records actual WebGL2 renderer information, errors, exact source and emitted QA bundle SHA-256, desktop 1440×960 and portrait 390×844 PNGs for every world, and an 884×768 Fold-inner-sized viewport for the porch. It checks animation, pause, interactions, pointer cancellation, drag-versus-tap, reduced motion, static3D, synthetic hidden state, second-holder canvas identity, quick mount/unmount reuse, and delayed resource disposal.

Second-holder relocation tests the scene-host contract; integrating real production fullscreen remains the integration owner's task. Hidden state is explicitly synthetic, not a real tab switch. Viewports do not establish physical Fold performance. Software WebGL timings do not establish device FPS or thermals.
