# WaterEdge render-target compatibility and provenance

This is a bounded correction to the original WaterEdge implementation. It preserves geometry, camera composition, native scene resolution and default reflection/environment dimensions. The dependency inspected in the executor is **Three.js 0.186.1**, licensed MIT. This note documents source decisions and deterministic tests; browser results, image hashes and source identity belong to the separate final evidence report.

## Complete owned-target audit

| Target/path | Format and size | Compatibility decision |
| --- | --- | --- |
| Summer valley static scene-reflection cube | Six 128×128 faces, RGBA16F normally; RGBA8 fallback; existing mipmaps retained | Query actual `EXT_color_buffer_float` and `EXT_color_buffer_half_float` before selecting/allocating HalfFloat. Either extension permits RGBA16F in WebGL2. Bind and check all six actual face framebuffers before the cube-camera draw. An incomplete HalfFloat allocation is disposed and replaced by a separately validated byte target. |
| Summer valley scene-color refraction | RGBA8 plus `UnsignedIntType` depth texture, full drawing-buffer width/height | Byte format remains unchanged. Check actual framebuffer completeness before first refraction render and again after each resize. No resolution reduction or depth removal. |
| Pebble shore supported PMREM | Default 256px face size; 768×1024 RGBA16F output and internal ping-pong atlas | `PMREMGenerator.fromScene` renders synchronously. Before calling it, validate the required extension and exact-size RGBA16F framebuffer configurations with depth enabled and disabled. These are disposed format/size probes, not claims to inspect an internal PMREM framebuffer before generation. The actual returned output framebuffer is also checked. No returned texture type is mutated. |
| Pebble shore byte environment | Six 256×256 RGBA8 capture faces; 768×1024 RGBA8 CubeUV atlas | Choose this path before PMREM generation when forced for QA, when extensions are absent, or when PMREM preflight fails. Capture the same sky geometry, then independently filter eleven roughness levels, mip 8 through −2, into the full atlas. Check the actual cube faces and atlas before rendering. `CubeUVReflectionMapping` bypasses Three's automatic cube/equirectangular-to-PMREM conversion. |
| All worlds' directional-light PCF shadows | Three's ordinary byte render target with native unsigned-integer depth texture; existing light shadow-map dimensions retained | Source-audited in r186 `WebGLShadowMap`. The owned runtime selects `PCFSoftShadowMap`/PCF, not VSM. The HalfFloat VSM map and blur-target allocations are therefore not used by these worlds. This source audit is not an independent runtime framebuffer check for each shadow map. |

There is **no Reflector instance or import** in the owned worlds. The referenced r186 Reflector does unconditionally construct a HalfFloat target; it is not assumed to be capability-safe and is not introduced here. Night pond has no explicit color/refraction/environment target beyond its renderer-managed shadow path.

## State, resources and QA forcing

Framebuffer checks and nested captures restore the renderer's previous target, active cube face and active mip level through `try/finally`, on success and on exceptions. Valley capture also restores shadow-update flags and object visibility. Byte environment generation restores tone mapping, XR enablement and automatic clearing; its temporary cube, filter geometry and filter material are disposed. Environment output remains scene-owned and is disposed with the world. An incomplete byte framebuffer or lost context is a failure, never reported as completed rendering.

The isolated harness calls `configureWaterEdgeRenderTargets({ forceByte: true })` before mounting worlds. This selects real byte targets without falsifying extension availability, changing GL methods or adding required component props. `canvas.dataset.waterEdgeRenderTargets` records actual queried extensions, the force flag, framebuffer statuses and chosen environment path. Forcing byte on a capable software renderer exercises the fallback implementation; it does not establish testing on hardware that lacks these extensions.

Ten deterministic tests in `renderTargets.test.ts` passed: both extension routes, missing extensions, actual incomplete-HalfFloat fallback/disposal, six-face validation, target/face/mip restoration after errors, context-loss rejection, PMREM preflight ordering, byte-path avoidance of PMREM, and complete nonoverlapping CubeUV packing. These mock-renderer tests establish control-flow and state contracts, not GPU shader execution or pixel quality.

## Precision and filtering limits

RGBA8 stores normalized linear radiance with 8-bit precision and clamps values outside 0–1. It cannot retain the HDR range or precision of RGBA16F; future brighter environment content would require reconsidering its encoding. The fallback uses an independently authored 64-sample GGX importance filter for rougher levels and a full-resolution direct sample at the finest level. Its filter differs from Three's default multi-pass PMREM and initial 0.05-radian blur, so byte and HalfFloat images need not be pixel-identical. It retains directional environment lighting and roughness-dependent material response, rather than substituting flat ambient light or a scene image. Normal-path PMREM and main scene dimensions remain unchanged.

## Primary references and rights

- [Khronos EXT_color_buffer_half_float](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/): RGBA16F renderability in WebGL2 when this extension is enabled.
- [Khronos EXT_color_buffer_float](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_float/): additional floating-point color-renderable formats.
- [Three r186 PMREMGenerator](https://github.com/mrdoob/three.js/blob/r186/src/extras/PMREMGenerator.js): synchronous generation, default dimensions and HalfFloat output/ping-pong allocation.
- [Three r186 CubeUV shader](https://github.com/mrdoob/three.js/blob/r186/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js): atlas layout, face orientation and roughness-to-mip contract used for interoperability.
- [Three r186 WebGLEnvironments](https://github.com/mrdoob/three.js/blob/r186/src/renderers/webgl/WebGLEnvironments.js): automatic PMREM conversion applies to cube/equirectangular mappings; an already filtered CubeUV texture passes through.
- [Three r186 WebGLShadowMap](https://github.com/mrdoob/three.js/blob/r186/src/renderers/webgl/WebGLShadowMap.js), [CubeCamera](https://github.com/mrdoob/three.js/blob/r186/src/cameras/CubeCamera.js), [Reflector](https://github.com/mrdoob/three.js/blob/r186/examples/jsm/objects/Reflector.js).
- [Three MIT license](https://github.com/mrdoob/three.js/blob/r186/LICENSE), copyright © 2010–2026 three.js authors; the installed dependency retains its license. CubeUV packing/roughness compatibility follows this dependency's public shader contract; the fallback filter and target-selection helper are independently authored.

No JEV source, image, texture or other asset was copied. The original reference/licensing record in `../REFERENCES.md` remains applicable.
