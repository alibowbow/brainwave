# NightFires transmission inventory — read-only, 2026-10-04

**No concrete unresolved compatibility blocker is demonstrated.** The remaining line describes an unmeasured stock Three target path. Keep it as nonblocking evidence inventory, without a new owner implementation request or withdrawal of accepted art.

Current intake is PR60 `3ad1292f971dfb37186d423be6c6c19e8620f4d0`, renderer source `6623c083888e2baece9da11436fe35694a7fcebf`, owned tree `e9a215c3108d6bbba85ef3f0e824a270a00d2e37`.

| Exact local source | Observation |
| --- | --- |
| `components/immersiveWorlds/nightFires/scenery.ts:685–688` | Shared lantern chimney is MeshPhysicalMaterial, transmission0.08, thickness0.026, transparent opacity0.18, DoubleSide. This is real transmission use. |
| `deepScene.ts:235`; `lakesideScene.ts:328` | DeepNight and Lakeside instantiate the lantern. Mountain does not. Lakeside's other physical materials only use clearcoat and do not add transmission. |
| `nightEngine.ts:37–43,57–62` | Normal WebGLRenderer with antialiasing; DPR cap2. No owner half-float target override or transmission-resolution change. |
| `node_modules/three/src/renderers/webgl/WebGLRenderLists.js:130–134` | Any material.transmission>0 enters the transmissive list, despite low opacity. |
| `node_modules/three/src/renderers/WebGLRenderer.js:2012–2027` | Installed r186 creates an internal transmission target per camera. It OR-checks EXT_color_buffer_half_float / EXT_color_buffer_float and chooses HalfFloatType if either exists, otherwise UnsignedByteType. It is **not** an unconditional half-float allocation. Target has mipmaps and requested samples=max(4,capabilities.samples). |
| `WebGLRenderer.js:2043–2052,2076–2079` | Actual allocation/render size follows active viewport × transmissionResolutionScale (default1 at297). It renders opaque contents, resolves multisample storage and updates mipmaps. |
| `WebGLRenderer.js:2048–2050,2118–2124` | Normal return restores prior target, cube face and mip, clear state, camera viewport and tone mapping. Exceptional nested-render paths lack a surrounding finally, but no such failure is evidenced here. |
| `node_modules/three/src/renderers/webgl/WebGLTextures.js:2104–2137,2404–2414` | Standard multisample color/depth storage and framebuffer attachment; sample count clamps to maxSamples or uses WEBGL_multisampled_render_to_texture. No checkFramebufferStatus probe or failed-half→byte retry is present in this stock target setup path. |

Final owned report `qa/evidence/material-refinement/results.json` binds16 source files to source6623 (`2957a9ed91177425953654a2fe0dc68ee554e60b7ffb6eb77a792dbcd9fbd371`). It reports67 normal checks: Mountain21, Deep23, Lakeside23; allpassed/errors[]. There are24 actual final PNGs (14 main screenshot entries plus motion/lantern pairs). The report records WebGL2/Chromium153/ANGLE SwiftShader and unchanged source/build.

It does **not** record actual chosen transmission storage type, transmission FBO status or normal-vs-byte target comparison. No forced-byte/no-extension owner test or corresponding PNG exists. Therefore normal scene/render/interaction acceptance is supported; a forced-byte transmission pass is unverified. Extension-advertised but incomplete storage is a theoretical compatibility case, not an observed failure or sufficient basis for a new blocking change.

Suggested ledger wording: “Stock r186 transmission used by DeepNight/Lakeside lanterns; automatic extension-based byte selection exists. Accepted normal owner evidence remains valid. Actual-target status and forced-byte transmission are unmeasured, nonblocking inventory; no demonstrated source failure.”

No browser/GPU execution, source mutation or remote change occurred.
