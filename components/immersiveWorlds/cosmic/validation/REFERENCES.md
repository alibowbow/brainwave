# Cosmic floating garden: reference review

Reviewed 2026-10-04. These references inform technical principles and motion
hierarchy only. No third-party source, shader, illustration, or asset is included
in this implementation.

## Sonnet 5.5 references

| Reference | Access and observed scope | Principles used |
| --- | --- | --- |
| [JEV #024, Orbital Sandbox](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/024-orbital-sandbox.html) | Actual HTML fetched and inspected; separate live browser review confirmed softly glowing planet sprites, fading trails, and coherent orbital paths. | Cache soft glow textures; let a few slow, coordinated paths establish motion; ease camera changes; clamp elapsed time on return to the scene. |
| [JEV #073, Ocean Descent](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/073-ocean-descent.html) | Actual HTML fetched and inspected; separate live browser review confirmed surface light columns and layered particle depth. | Separate far and near particles by scale, speed, contrast, and draw order; use broad low-opacity light; cap raster cost; reduce quality only after sustained slow rendering. |
| [JEV #014, Nebula Voyager](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/014-nebula-voyager.html) | Conditional reference only. The live browser displayed **FALLBACK STARFIELD**, a blurred color field with tiny stars. A successful volumetric/raymarch render was **not** verified. | No claim of a visually verified volumetric benchmark. Do not treat its fallback as evidence that raymarching succeeded. |

The independent source review and live visual review were performed separately.
The source reviewer did not infer visual success from shader or drawing code.

## Sonnet source observations

`#024` prepares and reuses canvas sprites for illuminated planet discs and star
halos. Its simulation and view smoothing use bounded elapsed time; its
visibility handler cancels the animation request while hidden. The relevant
design lesson is that a small number of clear, continuous movements reads more
coherently than unrelated flashing points. This pilot uses its own motion and
materials, without the reference's gravity simulation, orbit UI, or trail code.

`#073` draws distant suspended particles before scene subjects and nearer
particles afterward. Particle depth affects size, drift, and brightness; broad
light columns fade with depth. It also limits canvas pixel count and steps down
resolution after sustained slow frames. This pilot applies the layer and budget
principles to an original three-dimensional garden, without the reference's
ocean creatures, scroll narrative, or drawing code.

## Opus 5.5 HTML 100: additional benchmark

The requested collection is specifically
[alibowbow/jev — Opus 5.5 HTML 100](https://alibowbow.github.io/jev/opus-html100.html).
Its actual `opus-html100.html` source links the creator's
[Claude-Opus-5.5-100-HTML-Files repository](https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files).
This is a separate collection from the Sonnet examples above; identical numbers
do not identify equivalent works. The gallery link and source files below were
retrieved directly, rather than inferred from thumbnail descriptions.

| Actual Opus example | Source mechanism verified | Technical comparison and recommendation |
| --- | --- | --- |
| [#091 Alpenglow Day Cycle](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/091-alpenglow-day-cycle.html) | Canvas2D; six ridges with distinct parallax/depth, distance haze, broad sun-facing versus shaded faces, coordinated sky/terrain/water colors. The upper world is mirrored into displaced strips for lake reflections. | Strongest candidate for environmental light coherence and reflective water. Beyond Sonnet #073's depth particles, the same world and light are visibly meant to affect foreground, distance, and reflection. Keep the garden's own 3D water/reflection implementation; evaluate whether the pool belongs to its surroundings rather than reading as a separate glowing shape. |
| [#066 Planet Forge](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/066-planet-forge.html) | CPU Canvas2D per-pixel sphere rendering, with precomputed visible pixel geometry, shared directional illumination, day/night separation, water specular, atmospheric rim, ring/planet shadow tests, independent cloud drift, and depth-sorted moons. It is not a WebGL or raymarch example. | Strongest candidate for cosmic material and light consistency. Sonnet #024 establishes calm orbits and sprite reuse; Opus #066 adds a coherent illuminated surface and terminator. Favor a readable dark side, restrained rim, and consistent light direction over simply increasing halo brightness. Do not transplant its CPU pixel renderer. |
| [#061 Firefly Meadow](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html) | Cached land/treeline, two grass scales with spring response to a shared wind field, reusable glow sprites, and three firefly depth bands interleaved with foliage. Its firefly phase coupling gradually synchronizes flashes. | Strongest candidate for botanical scale and local glow placement. Unlike a particle overlay, near leaves hide some lights while other lights pass in front. Use varied plant silhouettes, foliage occlusion, and sparse glow hierarchy in the existing 3D scene. Do not import the pairwise firefly simulation or add synchronized flashing to a meditation background. |
| [#022 Deep Sea Descent](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/022-deep-sea-descent.html) | CSS/inline SVG organisms with Canvas2D effects: gradient light columns, cached glow sprites, bounded typed-array particle pools, scroll-dependent suspended particles, and an eased pointer torch affecting subjects. | Useful secondary check for local light affecting nearby matter. Sonnet #073 remains the more direct far/near particle source comparison. Neither example establishes a successful volumetric WebGL render. |
| [#100 Organic Wave Lab](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/100-organic-wave-lab.html) | CPU Canvas2D finite-difference height field using three buffers, damped propagation and absorbing edges; slope-derived diffuse/specular shading and a curvature-based caustic approximation. | Secondary reference for how a local touch propagates and fades. Retain the garden's smaller analytic ripple response; a full-screen numerical simulation would add cost and an unrelated visual mode. |
| [#082 Rosée / Perfume Rosée](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/082-perfume-rosee.html) | Source-only review on 2026-10-04. SVG bottle facets clip differently tinted, translated copies of the liquid path to suggest refraction. A damped pointer-driven bottle tilt and a separate lagging liquid slope animate that path; a moving gradient ellipse suggests transmitted light. It is not a 3D transmission renderer. | **Deferred for this correction.** The conceptual separation of surface highlight, liquid body and transmitted light is useful, but its illustrative facet offsets and projected ellipse do not improve the already accepted mirrored-camera garden basin. Keep the original 3D reflection, geometry and small analytic ripples. Do not port the bottle, shopping UI, falling petals, shine sweeps or spring parameters. No new visual claim is made for this source-only review. |

These Opus rows record **source review**, not a claim that a live rendered view
was inspected by the source reviewer. Separate live browser reviews confirmed:

- **#066 Planet Forge:** Earthlike and Gas Giant presets rendered successfully,
  showing cloud layers, a dark terminator, and rings.
- **#061 Firefly Meadow:** strong foreground grass silhouettes overlapped the
  lights; small distant glows sat against receding ridges, while sparse nearer
  glow discs established a different scale.
- **#091 Alpenglow Day Cycle:** the Blue Hour to Alpenglow change lit summit
  faces warmly above cool valleys; multiple ranges remained separated, and
  tree/peak reflections were broken into fine horizontal lake ripples.

The other Opus rows remain source-only observations. Source presence is not
evidence of renderer success or mobile performance.

Also inspected [Opus #004 Brass Orrery](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/004-brass-orrery.html):
it builds a mechanical instrument with SVG arms, globe gradients, shadows,
engraving, and period-based orbital transforms. Its deliberate mechanical
organization is useful context, but the stronger garden benchmarks are #091,
#066, and #061; no ornamental SVG or interface elements should be ported.

The lifecycle policies remain the pilot's own requirements. Several reviewed
Opus examples reduce motion speed while continuing to render, and #100 uses a
fixed number of simulation steps per animation frame. Those patterns do not
replace the garden's elapsed-time motion, reduced-motion still, hidden/offscreen
stop, or resource disposal behavior.

## Render-target compatibility sources and scope

The correction also reviews the actual upstream
[Three r186 Reflector source](https://raw.githubusercontent.com/mrdoob/three.js/r186/examples/jsm/objects/Reflector.js),
matched against the installed dependency. Its constructor creates a
`WebGLRenderTarget` with `HalfFloatType`; the first target bind performs GPU
allocation. Therefore the owned helper must select the texture type before
that bind or any scene render, not change an already rendered texture afterward.
The garden explicitly uses `multisample: 0`, avoiding an additional requirement
for optional multisampled floating-point buffers. A completeness probe must
restore the renderer's previous target, active cube face and mip level in a
`finally` block.

The Khronos specifications establish the format decision:

- [EXT_color_buffer_float](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_float/)
  makes WebGL2 `RGBA16F` color-renderable.
- [EXT_color_buffer_half_float](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/)
  also applies to WebGL2 and requires `RGBA16F` color-renderability. It is a valid
  alternative when the broader float extension is absent. WebGL2 `RGB16F` is
  not color-renderable through this extension.
- WebGL2 presence alone is insufficient. The current reflector uses RGBA;
  choosing `HalfFloatType` requires a relevant enabled extension and successful
  framebuffer check. The unsupported or deliberately forced test path uses
  RGBA `UnsignedByteType`, retaining the reflection pass and scene geometry.

Audit of all cosmic targets: the pool is the only explicitly constructed scene
render target. The one shadow-casting directional light additionally creates a
Three-managed PCF shadow target; the installed r186 non-VSM path uses a default
byte color texture plus an unsigned-integer depth texture. No cosmic code uses
PMREM, VSM, cube-camera environment capture, postprocessing render targets or a
second renderer. Thus no PMREM generation needs a separate capability-safe
environment path here. The tests and captures, rather than these source
observations alone, establish the selected target's actual rendering result.

## Provenance and license boundary

The public repository
[MiaAI-Lab/Sonnet-5.5-100-HTML-Files](https://github.com/MiaAI-Lab/Sonnet-5.5-100-HTML-Files)
was checked through GitHub metadata and its root file listing. No LICENSE,
COPYING, NOTICE, or README file appeared in the 202-entry root listing; a direct
`LICENSE` lookup returned 404. This is **not a verified reuse license**. The
reference HTML remains outside this repository; only these independently
written observations are retained.

The Opus creator repository's 203-entry root listing contains a README but no
LICENSE, COPYING, or NOTICE file. Its README describes the collection and the
creator's checks; it does not establish a reuse license. The same no-copy
boundary applies to the Opus examples. The creator's testing statements are not
our independent validation results.

Fetched reference fingerprints, for reproducibility:

| HTML | Bytes | SHA-256 |
| --- | ---: | --- |
| `024-orbital-sandbox.html` | 37,020 | `a2267f789a1a7168da965fb3983f34e2b32d1d385c09437e783f18256313df5d` |
| `073-ocean-descent.html` | 84,194 | `f3a532ee9dd6c3d1fb96a6db92daa461b6f666b98486c12a541f0b0295ead9a0` |
| Opus `061-firefly-meadow.html` | 35,932 | `7ea4a55c2d06272eae39904bf05589b70ccce99dafaf42d1e4fd7addc0cc38fc` |
| Opus `066-planet-forge.html` | 64,575 | `d600726567a1ff0a534c60add0c4f5ba13123481401112c33dc18ee2f90c20fc` |
| Opus `091-alpenglow-day-cycle.html` | 37,559 | `a75d4218b39d4debaa9c377691e14405a07dd8e287a7a08865b5b0db867b2e82` |
| Opus `022-deep-sea-descent.html` | 92,277 | `ad4b26599e916f5c5b58a5176f416030e5691a6414348af2264cfca0c9b84d5e` |
| Opus `100-organic-wave-lab.html` | 45,530 | `a42d6ab1ec3dd928332f544be4005b2667e0a5c08ce04695fde51bdd9a061aa1` |
| Opus `082-perfume-rosee.html` | 55,792 | `0209a01493bea764402588ce343d36e651f43970bdf5cc9d7ae63394b3d91b24` |
