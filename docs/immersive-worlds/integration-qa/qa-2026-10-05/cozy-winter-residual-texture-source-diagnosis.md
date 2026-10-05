# Winter disposal: residual texture source diagnosis

The most concrete source explanation for post-dispose `renderer.info.memory.textures === 1` is **Three 0.186.1's renderer-owned `DFG_LUT`**, not an uncounted WebGLState placeholder and not a Winter material texture. The actual recorded residual GL handle was not identified by name, so distinguish this source trace from direct handle identification.

No source was edited and no renderer, browser, or GPU check was repeated for this diagnosis.

## Recorded actual-App result

Read `local-cozy-disposal-20261004T234124Z/evidence/nature-verification.json`. The retained Winter context ID 2 reports:

| Observation | Value |
|---|---|
| Host disposal | attempts 1, returned 1, phase returned |
| Disposal interval | 10163.8–10171.0 ms in document time |
| Engine lifetime | created 1, disposed 1 |
| Running | false |
| Canvas | disconnected |
| Owned canvas listeners | added 4, removed 4, active 0 |
| Engine frames / actual draw calls | 2 / 1398 |
| Post-dispose accounting | geometries 0, textures 1 |
| Recorded GL deletes | textures 30, framebuffer 1, vertex arrays 684, buffers 1394, programs 18 |

The 20-second release check failed solely on the nonzero accounting assertion. These observed values do not by themselves identify which texture remains, prove physical GPU reclamation, or establish new-session readiness: execution stopped at the release assertion.

## Concrete reached source path

All following references use the installed Three 0.186.1 source beneath `brainwave-integration/node_modules/three/src/`.

1. `renderers/shaders/DFGLUTData.js:31–48` keeps a module-level singleton, creates `new DataTexture(DATA, 16, 16, RGFormat, HalfFloatType)`, names it `DFG_LUT`, disables mipmaps, and sets `needsUpdate = true`.
2. `renderers/shaders/ShaderLib.js:79–103` includes `UniformsLib.envmap` for standard materials; `UniformsLib.js:38` provides `dfgLUT`. This does **not** require a scene environment map.
3. `renderers/WebGLRenderer.js:2742–2745` assigns `getDFGLUT()` to the renderer's private compiled material uniforms. `ShaderChunk/lights_fragment_begin.glsl.js:57–73` samples it for STANDARD material direct-light compensation. Winter has many MeshStandardMaterial/MeshPhysicalMaterial objects and actual direct lights, so this is a reached material path, not an unused helper.
4. The uniform upload runs through `WebGLUniforms.js:584` → `WebGLTextures.js:559–573` / normal `initTexture` allocation at `747–752`. The texture is **counted** by `info.memory.textures++`. Its unchanged singleton source/parameters share one allocation per renderer context.
5. Cozy `engine.ts:65` disposes textures reachable through owner material properties, custom ShaderMaterial uniforms, and scene background/environment. Standard material renderer-private uniforms are not owner material properties; the DFG LUT is not reachable through that traversal.
6. `WebGLRenderer.js:1086–1109` does not dispose the DFG LUT. The installed WebGL sources have no `getDFGLUT().dispose()` or equivalent LUT release. Normal texture accounting decrements only on explicit disposal via `WebGLTextures.js:399–405`; renderer property/cache resets do not decrement it.

Thus the installed renderer source predicts **one counted internal texture remaining** after all Winter-owned textures are disposed. The emitted Three bundle `dist/assets/three-hZqueUhM.js` contains `DFG_LUT` as well.

The failed run served that exact Three bundle, SHA-256 `2e441274922e1c20a1aa1863ca80fdf7b6de07e2e52911e50cc6c5915dfe1a6c`; its recorded sourceStable/distStable/applicationBound/valid flags are all true. Installed version, source hashes and exact 512-word / 1024-byte DFG data identity are in `cozy-winter-residual-texture-source-manifest.json`.

## Alternatives checked

- Winter `winterLodge.ts:10` uses a `Color` background; no scene environment or material `envMap` is assigned by Winter or its helpers. PMREM is therefore not an explanation supported by this scene's source.
- Winter physical materials at lines 87, 287 and 291 do not set transmission. A transmission render target is not supported as this scene's explanation.
- Winter owns direct CanvasTexture maps from `materials.ts`, fire maps from `fireDetail.ts`, frost (`winterLodge.ts:101–102`), and Points snow (`:356`). Those are attached to material properties covered by current engine traversal. No removed scene node or material replacement leaving an uploaded owner texture unreachable was found.
- Its directional shadow target/depth texture is covered by the light shadow disposal path. The four raw WebGLState placeholder textures are not tracked by `info.memory.textures`; they cannot explain this specific counter.
- No second reached singleton texture allocation path was found: Winter has no rect-area light/LTC tables, skeleton/bone texture, morph-target texture, or light probe grid. This source inventory does not substitute for an actual residual-handle ledger.

## Central contract implication

`renderer.info.memory.textures` is total renderer accounting, **not exclusively owned-scene accounting**. Do not label it that way or require unconditional zero. Preserve the actual observed value and this version-specific internal allocation explanation. Do not replace the assertion with a generic allowance for any unexplained texture, nor call the existing failed run a completed gate.

The existing native listener/RAF/canvas/dispose-return checks remain useful. The resource-graph unit test verifies the actual engine's traversal contract with real Three objects and a mocked renderer; it does not directly classify this actual GL handle. If stricter per-handle evidence is required later, correlate the renderer-private DFG texture upload's handle with the residual handle in read-only QA instrumentation; do not modify the owner renderer or forcibly dispose a module-global Three texture across active renderers.

For a fail-closed native GL ledger, the live handles after disposal should be exactly the independently identified DFG handle plus the four proven raw WebGLState placeholders. Identify placeholders by the complete fresh-constructor prefix and signatures at `WebGLState.js:411–442`: first four creations in 2D/cube/2D-array/3D order; all-zero Uint8Array(4); RGBA/UNSIGNED_BYTE; level 0; 1×1, depth 1 for array/3D; NEAREST min/mag; all six cube faces; no later overwrite. Record `texImage3D` as well as 2D uploads, track active-unit binding and normalize cube-face targets. Any unknown, overwritten or additional live handle remains a failure. An exact DFG match requires the installed 512 Uint16 words, dimensions, format/type and upload region, not just 16×16 dimensions or the total counter. This instrumentation must start before context construction and reject ambiguous context generation/loss or unknown preexisting handles.

The owner Winter 120-second sequence failure and pending new-session check remain separate gates.

## Reference retention limitation

The source contains a concrete strong-reference path beyond QA's own retained canvas references:

`DFGLUTData` module-global `lut` → `EventDispatcher._listeners.dispose` array → per-renderer `WebGLTextures.onTextureDispose` closure → texture-manager closures using `properties`, `_sources`, and `_gl`.

`EventDispatcher.js:33–45` stores listeners strongly in an array. `WebGLTextures.js:715–719` registers its renderer-specific callback on the LUT during first upload. Its callback at `324–330` removes itself only when that texture dispatches disposal, then calls `deallocateTexture`; the associated deletion closure uses `_gl` at `399`. `WebGLRenderer.dispose()` neither dispatches LUT disposal nor removes that texture listener. `properties.dispose()` resetting a WeakMap does not remove the singleton's listener or its closure references.

Consequently, even if a precise upload ledger identifies the sole counted residual as DFG_LUT and all owner-world textures have deletion evidence, report these separately: **owner-world cleanup established to the recorded scope; renderer-internal DFG allocation and a context-retaining reference path remain**. Do not describe the residual as harmless, all resources as freed, or physical GPU reclamation as proved. The source supports possible retention across repeated renderer creation; its actual browser heap/physical-memory impact was not measured.

Calling the global LUT's disposal after renderer properties were reset is not a proposed remedy: `deallocateTexture` sees missing `__webglInit` and returns at `WebGLTextures.js:362`, and a global disposal can affect other active renderer contexts. No owner or dependency fix was made.
