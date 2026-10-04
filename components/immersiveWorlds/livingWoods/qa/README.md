# Isolated Living Woods QA

This harness imports only the four assigned entries. It neither changes the app route nor creates a second audio engine. Its generated bundle and evidence are QA artifacts, not production assets.

Run the actual browser contract after installing the repository dependencies and Chromium through the existing CI browser-install step:

```sh
node components/immersiveWorlds/livingWoods/qa/run.mjs
```

Optional environment variables:

- `SCENE_BROWSER_PATH`: an already-installed Chromium executable. The runner checks the Playwright install path and the available Work runtime; it never downloads a browser.
- `SCENE_SCREENSHOT_DIR`: output directory (default `qa/evidence`).
- `SCENE_SOURCE_REVISION`: exact Git revision label supplied by the caller. Regardless of that label, the report lists exact source-file and bundled-file SHA-256 hashes.
- `LIVING_WOODS_WORLDS=morning,rainy,ancient,bamboo`: choose scenes for diagnosis.
- `LIVING_WOODS_SCREENSHOTS_ONLY=1` (or `QA_CAPTURE_ONLY=1`, `--capture-only`): capture cold inactive viewport frames and stable paused pixels only, without motion/interaction/lifecycle checks. The report labels this reduced scope.
- `LIVING_WOODS_BROWSER_TEST=1`: opt into the same runner through Vitest. Default `npm test` skips this wrapper because current CI installs the browser only afterward.

For interactive inspection, run the existing Vite dev server and open `/components/immersiveWorlds/livingWoods/qa/index.html?world=morning&controls=1`. World keys are `morning`, `rainy`, `ancient`, and `bamboo`. `active=0` and `static=1` exercise first-frame states. `window.__livingWoodsQA` offers state toggles, captured interaction events, and projected target coordinates.

The runner first creates an independent production build, then checks actual WebGL pixel movement; stable pixels and simulation counters for pause, static mode, reduced motion, and synthetic hidden state; raycast interaction using a real mouse click; drag versus tap; synthetic pointer cancellation; identical canvas/engine through a second-holder overlay; rapid remount reuse and delayed disposal. Desktop (1280×800), portrait (390×844), and Fold-inner-like (882×768) viewport PNGs are captured for every selected world. The latter is a viewport simulation, not physical Fold hardware. Hidden state is synthetic, not a real tab-switch claim. The overlay checks scene ownership; production fullscreen integration remains with the integration owner. No measured frame rate or thermal claim is made.

`evidence/report.json` binds each PNG to the exact bundle SHA-256. Visual approval also requires a human/model to inspect those PNGs; passing byte-size and lifecycle assertions alone does not judge composition or material quality.

The native-resolution screenshot viewports are captured first. Repeated motion and lifecycle assertions then use a 640×400 QA viewport to limit software-rendering cost, with the actual portrait tap tested separately at 390×844. Each check records its viewport. No production resolution or motion policy is changed. `LIVING_WOODS_REUSE_BUILD=1` is a diagnostic option that reuses the already-built bundle only when its hash matches the previous report; the report retains the original source inventory and separately records the current runner hash. Final acceptance should use a fresh build.
