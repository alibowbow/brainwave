# Water-edge implementation and validation

The three independent scenes are implemented on `codex/water-edge-three-worlds`, based on main `14940149cc5c0fccb778b58d4d755a04aea55e53`. [Draft PR #58](https://github.com/alibowbow/brainwave/pull/58) is the integration handoff; this worker has not merged or deployed it. Only the two assigned waterEdge directories are changed.

## Exact rendered implementation

- Production source commit: `b4fee13a43a6e3188786401f94d1426d7300b5e7`. Subsequent commits contain evidence, QA scripts and documentation.
- Production source SHA-256: `09b3112034e6f20cdcf3f170f056154a81cd6ef87d623cd73434cc44ae519cf7`.
- Harness source SHA-256: `c41329d2aab9caf019cfe71f0540da1c76ce38cea8fe723321cccc64106bfffe`.
- Compiled harness bundle SHA-256: `49ac6409b4b31f74d4da1251973d5a31547c991a71d54fa526e4c3c2f20e889a`.
- Browser: Chromium 153.0.8010.0, headless SwiftShader, DPR 1. Production rendering supports DPR up to 2 and has no artificial frame cap.

The source digest excludes QA, dev files and documentation. The separate harness imports the exact three production entries. Root app compilation alone cannot establish that an unintegrated world renders correctly.

## Build and automated checks

`npm run typecheck`, `npm test`, `npm run build` and `npm run check:bundle` passed. The test suite contains 149 tests in 24 files, including two added resource-disposal tests. Existing protected-scene checks also passed in [CI run #259](https://github.com/alibowbow/brainwave/actions/runs/37228310263) on the final production source commit. Initial bundle size remained 402.6 KiB against a 410 KiB budget; CSS remained 99.5 KiB against 135 KiB because the new entries are not wired into the shared app by this worker.

The isolated Vite harness built successfully. Actual browser captures have zero final shader errors and zero page errors. Earlier invalid valley sky GLSL was found in the actual browser, repaired, and re-rendered; type checking was not treated as a shader test.

## Reproduction

Run from the repository root. Set `CHROMIUM_PATH` when Chromium is not at the recorded environment's `/tmp/cosmic-browser-bin/chromium`. `--serve` starts and closes a local static server in the same verifier process. These commands overwrite the relevant local evidence files; preserve the committed evidence when comparing another machine.

```bash
npx vite build --config components/immersiveWorlds/waterEdge/dev/vite.config.ts
node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve --screenshots-only
node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve --world=night-pond
node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve --world=summer-valley --controlled-bursts
node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve --world=pebble-shore
```

The two targeted lifecycle rechecks used these commands on the same compiled bundle:

```bash
node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve --world=night-pond --lifecycle-only
node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve --world=summer-valley --lifecycle-only
```

## Actual pixels and behavior

[SCREENS.md](SCREENS.md) links all nine still views: each scene at desktop 1280×800, portrait 390×844 and Fold-inner viewport 884×700. These are real Three.js framebuffer PNGs, captured after a genuine rendered frame with animation paused for readback. They are neither generated images nor fallback posters. Each view was visually reviewed, with several composition and material revisions before acceptance.

[Pebble interaction PNG](pebble-shore-interaction.png) additionally shows a real pointer-triggered roll: the target stone moves approximately 25–30 screen pixels and changes orientation/highlight while surrounding geometry remains fixed. Its recorded event is scene-bounded and no audio player is created.

| Check | Night pond | Summer valley | Pebble shore |
|---|---|---|---|
| Actual rendered motion | 2,979 changed pixels | 44,344 changed pixels | 10,094 changed pixels |
| Active off, static3D, reduced-motion and hidden-state pause | Passed | Passed | Passed |
| Tap hits actual scene geometry and emits bounded event | Passed | Passed | Passed |
| Drag, cancel, outside release and overlay-button suppression | Passed | Passed | Passed |
| Same-world holder roundtrip preserves one canvas | Passed | Passed | Passed |
| Two disposal/remount cycles; zero live engines and canvases after each disposal | Passed in scoped rerun | Passed in scoped rerun | Passed |

Pixel counts use a threshold of `abs(ΔR) + abs(ΔG) + abs(ΔB) > 6` between two real rendered frames at 1280×800. They demonstrate visible change, not a measured frame rate. The exact raw states, hashes, test methods and any scoped reruns are retained with `verification.json` and its referenced reports. Historical failed or timed-out attempts remain labeled in `iteration-history.json` and raw reports.

Pond and shore used Playwright mouse input for taps and drags, plus synthetic cancel/outside cases. Valley used synthetic DOM PointerEvents through the actual host input handler and mesh raycast. The valley fixture ran two native animation frames per burst and drained the paused framebuffer between steps. It does not cap production animation or lower rendering resolution.

Pond's original run exceeded a nine-second lifecycle polling deadline after its other checks passed. Valley's controlled run exceeded the second lifecycle polling deadline after its other checks and first disposal/remount passed. Both immediate failure snapshots already showed equal created/disposed counters and no live canvas. Separate lifecycle-only runs on the exact same source and bundle then passed both full disposal/remount cycles. The valley rerun drained each initialized framebuffer before the next cycle to separate software-GPU work from the disposal timer. The original failed runs remain failed in their raw reports; `verification.json` combines only completed checks and explicitly references these successful scoped reruns.

## Limits and integration responsibilities

- Unrestricted valley animation queued enough SwiftShader work to hit a 90-second screenshot readback deadline. Short native-frame bursts allowed functional motion and pause checks. Sustained valley throughput, hardware GPU behavior, device FPS, mobile thermals and long-session memory behavior are not certified by this software-renderer test.
- Hidden-state checks override `document.hidden` and dispatch `visibilitychange`; they do not establish real browser-tab switching behavior. Holder tests model the shared player/fullscreen ownership contract without invoking the native Fullscreen API. Fold coverage is viewport emulation, not physical Fold hardware. Captures used DPR 1.
- Vegetation and cliff geometry remain visibly procedural. Pond/shore reflection is analytical; valley reflection uses a static scene cubemap and its bed refraction is a depth-guarded screen-space approximation. These are original 3D scenes, not a claim of photorealistic or ray-traced optics.
- The integration Work owns scene catalog/routing, shared live-scene classification, PWA on-demand caching and any connection to the existing audio engine. Only `active: boolean` is required by every entry. Shared files, protected rainy-window/oil-sea worlds, packages and CI configuration are untouched. Audio recommendations and bounded optional callbacks are supplied; sound quality and audio/visual synchronization are not claimed as tested.

See [INTEGRATION.md](../INTEGRATION.md) for exact entry paths and runtime contract, and [REFERENCES.md](../REFERENCES.md) for actual observations from both JEV galleries, technique decisions and provenance. No source or assets from unlicensed reference collections were copied.
