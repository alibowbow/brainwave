# Café compatibility verification — 2026-10-04

## Exact source and fresh evidence

**Render source: `9f7cad297ee27b57c75da19c245f79bfb6dd85d4`**
Source tree: `c81ee7ccc06794057508e025010917a1124a7dd6`.
Both browser runs started after this source was committed and pushed. Their reports record `uncommitted: false`, unique run IDs/timestamps, the source commit/tree and hashes of the actual compiled bundle, environment and captures. The following evidence-only commit does not change scene source or compiled output.

- Pilot: `cafe-pilot-DUYsDNTQ.mjs`; SHA-256 `60b203d397980271a36c869c188b8705be07a445a0b765e03161ecdbb21fd8ac`.
- Environment: `room-environment.hdr`; SHA-256 `43bb5410f1ede07802bf3371ee2a9c3054abeaba1fb87eefb7bc992b1cac5d92`.
- Fresh aggregate: `screenshots/results.json`.
- Full lifecycle/GPU reports: `screenshots/forced-byte/results.json` and `screenshots/supported/results.json`.
- Eight new PNGs, dimensions, byte counts and SHA-256: `screenshots/compatibility-manifest.json`.
- Supported-path comparison with the approved baseline: `screenshots/compatibility-pixels.json`.

The old c0de-era source-unbound lifecycle JSON was removed. None of its checks are presented as current evidence. The four root-level PNGs and `manifest.json` remain the historical, user-reviewed baseline: source `215c50ff7bafd7e52a1593022a75a7a032cc3c4c`, evidence head `8b9383b8086b99bec04eb2273a68ec9d2bd76f43`.

## Complete target audit and correction

Exact installed Three.js is **0.186.1**. Inspected local `Reflector.js`, `PMREMGenerator.js`, `WebGLTextures.js`, `WebGLEnvironments.js`, `WebGLShadowMap.js` and `WebGLRenderer.js`. r186 Reflector constructs a HalfFloat target but GPU allocation is lazy. PMREM allocates HalfFloat output and ping-pong targets and renders during generation; mutating its returned texture afterward cannot make that operation safe.

| Target / texture | Actual format and handling |
| --- | --- |
| Capability probe | 4 × 4, RGBA16F/HalfFloat with depth renderbuffer only when either genuine color-buffer extension is enabled; otherwise RGBA8/UnsignedByte. Check real framebuffer completeness, dispose probe. |
| Window refraction | Full native viewport × DPR, selected RGBA16F or RGBA8 before allocation; real-size completeness checked after every size change. |
| Planar reflection | 65% viewport × DPR, Reflector target configured before its first GPU allocation; same selected type and completeness checks. |
| PCF shadow | Up to 2048 × 2048 RGBA8 plus UnsignedInt depth texture, checked before the first shadow draw. No VSM target. r186's removed PCFSoft was already converted to PCF; use PCF directly. |
| Environment | 768 × 1024 prefiltered CubeUV atlas, sample-only RGBA16F texture. Never attached to a framebuffer. No runtime PMREM output or ping-pong targets. |
| Final canvas | Renderer default UnsignedByte output; no HDR output-buffer target. Scene physical materials have transmission 0, so no internal transmission target. |
| QA state probe only | Byte cube target, 16 × 16, active cube face 4 and mip 1; completeness checked, used for real state-restoration rendering, then disposed. |

`EXT_color_buffer_float OR EXT_color_buffer_half_float` enables the candidate RGBA16F probe; WebGL2 alone is not used as evidence of RGBA16F color renderability. Explicit `internalFormat` matches the tested attachment. If HDR fails at the actual scene dimensions, both scene targets are disposed and reconfigured as RGBA8 before new allocation. RGBA8 completeness is required too. There are no GL monkeypatches or fabricated extension claims. The QA byte preference changes only owner policy, leaving the actual reported extensions intact.

Probes, both scene passes and Reflector's callback restore renderer target, active cube face and mip level with `finally`. Reflector additionally restores its XR/shadow-auto-update/visibility state. A paused QA render began with an actual cube target on face 4/mip 1, invoked the real Reflector and scene rendering, then verified all three values unchanged and `gl.getError() === 0` in both policies. Unit cases cover exceptional exits and changes to face/mip while retaining the same target object.

A failed reflection framebuffer can break reflection rendering; it does not necessarily black the whole canvas.

## Capability-safe environment, unchanged art direction

The runtime now loads a locally baked version of the **same** MIT-licensed Three RoomEnvironment, same sigma .035 and face size 256, same environment intensity .27. Both target policies use it. Direct `CubeUVReflectionMapping` bypasses Three's automatic equirectangular/cube PMREM conversion. WebGL2 supports the sample-only RGBA16F texture without requiring floating-point color-attachment support. The texture is never used as a render target.

The owner-local offline bake checks genuine capabilities and framebuffer completeness before PMREM generation, preserves target/face/mip state, reads back HDR values, and independently encodes a Radiance RGBE file. Two bakes produced the same hash. Actual r186 HDRLoader/HalfFloat decode retained source radiance up to 43 with maximum relative quantization error 0.3922%; provenance and measured errors are in the adjacent asset JSON. No runtime PMREM call, post-generation type mutation, paid service or downloaded third-party media is involved.

Camera framing, customers, geometry, lighting parameters and material appearance are preserved. `world.ts`, `materials.ts`, `plant.ts`, `exterior.ts` and `shelves.ts` are byte-identical to the approved render source. Supported-path PNGs compared with the approved source have mean absolute RGB channel differences **0.0395–0.0495 out of 255**, and zero channels differ by more than 8. All eight final native-resolution PNGs were inspected: café seating, cup/steam, glass reflection, wet exterior and readable materials remain visible. The byte path has less offscreen HDR highlight range, visible mainly at the brightest exterior lights, while preserving real 3D and the approved composition.

## Executed verification

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm test` | 24 files, 160 tests passed, including 13 target-policy/state unit cases |
| `npm run build` | Pass; existing large-chunk warning |
| `npm run check:bundle` | Pass; JS 402.6 / 410 KiB, CSS 99.5 / 135 KiB |
| `node components/immersiveWorlds/cafe/qa/build.mjs` | Pass; compiled review bundle hash above |
| Forced byte, fresh browser run | **28/28 pass**, zero runtime/shader errors |
| Supported HalfFloat, fresh browser run | **28/28 pass**, zero runtime/shader errors |

Both actual browser runs checked reflection, refraction and shadow framebuffer status **36053 / FRAMEBUFFER_COMPLETE** at desktop 1280 × 850, Fold-like portrait 412 × 915, inner portrait 673 × 841, landscape 915 × 412, and fresh remount. Forced byte captured reflection/refraction type 1009 / RGBA8; supported captured type 1016 / RGBA16F. Both report the same sample-only prefiltered environment and `runtimePmrem: false`.

The preserved 23 lifecycle/visual checks plus five compatibility checks cover actual WebGL geometry, native canvas sizes, active/pause, changing rain/steam pixels, look drag and eased return, cup/lamp/window callbacks, ignored paused taps, OS/app reduced motion, hidden/visible signals, same-canvas fullscreen-holder transfer and return, grace-period disposal, fresh remount, target choice/completeness and absence of runtime/shader errors. The verifier serves committed public bytes directly with a static server; there is no Vite/HMR transformation during verification.

The source deployment is Vercel READY: https://brainwave-k0rzg9hu0-alibowbows-projects.vercel.app/immersive-worlds/cafe/pilot/index.html . Add `?targets=byte` to inspect the forced path. PNG evidence comes from the local actual renderer. No share/bypass token, account access or protection change was created. PR #50 remains draft; this owner does not merge.

## Reproduction and limits

```bash
SCENE_BROWSER_PATH=/path/to/chromium CAFE_TARGETS=byte CAFE_OUTPUT=/tmp/cafe-byte node components/immersiveWorlds/cafe/qa/verify.mjs
SCENE_BROWSER_PATH=/path/to/chromium CAFE_TARGETS=auto CAFE_OUTPUT=/tmp/cafe-supported node components/immersiveWorlds/cafe/qa/verify.mjs
```

- Browser: Chromium 153, SwiftShader software WebGL2, DPR 1. Both genuine extensions are present on this test device; the byte run forces the legitimate byte policy without hiding them. Half-float-only, float-only, neither-extension and incomplete-FBO selection cases are unit-tested, not claimed as separately tested physical GPUs.
- The supported regression expects HalfFloat on this capable test device. Viewport emulation is not physical Fold testing; no mobile GPU/frame-rate claim.
- Hidden testing injects document.hidden/visibilitychange. Fullscreen testing moves the real canvas between holders; it does not request OS/browser fullscreen.
- Simulation is paused for reproducible initial stills. The motion test advances real frames and pauses only for pixel readback; renderer quality and requestAnimationFrame timing remain unchanged, without a fixed frame cap.
- Shared app routing, full app overlays/audio and target-device performance remain the integration owner's checks. No shared/protected file or dependency is changed.
- Procedural customers/buildings, layered droplet fields and approximate wet street reflection remain the prior known limitations. Interior window reflection is an actual planar render.
