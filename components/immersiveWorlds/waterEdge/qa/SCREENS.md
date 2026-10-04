# Actual WebGL visual evidence

Rendered source: `b4fee13a43a6e3188786401f94d1426d7300b5e7`.

Production source SHA-256: `09b3112034e6f20cdcf3f170f056154a81cd6ef87d623cd73434cc44ae519cf7`.

Compiled harness bundle SHA-256: `49ac6409b4b31f74d4da1251973d5a31547c991a71d54fa526e4c3c2f20e889a`.

All images are real Three.js WebGL pixels, captured at the rendered first frame with animation paused for readback, not generated pictures or fallback posters. `screenshots.json` records every PNG hash, canvas dimensions, source/harness/bundle digests and empty error arrays. Browser: Chromium153 with SwiftShader, DPR1. Fold-inner is a884×700 viewport check, not physical Fold hardware.

| World | Desktop1280×800 | Portrait390×844 | Fold-inner884×700 |
|---|---|---|---|
| Night pond | [PNG](night-pond-desktop.png) | [PNG](night-pond-portrait.png) | [PNG](night-pond-fold-inner-viewport.png) |
| Summer valley | [PNG](summer-valley-desktop.png) | [PNG](summer-valley-portrait.png) | [PNG](summer-valley-fold-inner-viewport.png) |
| Pebble shore | [PNG](pebble-shore-desktop.png) | [PNG](pebble-shore-portrait.png) | [PNG](pebble-shore-fold-inner-viewport.png) |

Desktop and portrait of every world were directly inspected by the primary implementer and the scene author; all three Fold viewport images were also reviewed by their scene authors. Primary reviewer additionally inspected the pebble Fold pixels.

- Pond: replaced polygonal canopy masses with folded leaf geometry; brought flower, lily, reeds and rock into portrait foreground; reduced metallic leaf highlights; broken moon glints and low bank vegetation provide depth.
- Valley: corrected missing left-bank face, smoothed rock normals, varied tree scale and added understory, implemented actual depth-guarded bed refraction. A real GLSL sky syntax error found in an earlier run was fixed before these final captures. All final first-frame shader/page error arrays are empty.
- Shore: removed unnecessary rear stone geometry while preserving large near stones, opened a shallow water corridor through the near field, moderated wet gloss and pale touch stone, improved portrait sky-to-ground ratio. Near water/foam motion and roll behavior are checked separately from the still images.

[Interaction frame](pebble-shore-interaction.png): a real geometry tap and subsequent native animation frames move the close selected pebble approximately 25–30 screen pixels and change its orientation/highlight. The neighboring stones and coast remain fixed. The scene author and primary implementer reviewed the actual PNG. Its SHA-256 is `66b10079f2b86313e9eb6a5d793210109e2a0d1b52785eeb12d09eeaeeb216cb`.

Remaining visual limits: forest leaf/branch shapes and cliff strata remain visibly procedural; water reflections are analytical/static-cubemap approximations. Shore foam is deliberately subtle at the initial phase. No photorealism, ray-traced optics, actual mobile FPS or thermal claims. Functional test methods and limits are recorded separately in [VALIDATION.md](VALIDATION.md) and `verification.json`.
