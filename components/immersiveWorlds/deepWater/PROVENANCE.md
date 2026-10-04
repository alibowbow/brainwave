# Deep water worlds — sources and design

## Bounded follow-up, 2026-10-04

The original observations and assets below are retained. The follow-up changes only target compatibility, guarded chrome input, waterfall material layers and GPU submission backpressure; no reference code/assets or paid services were added.

- Read the exact upstream [Three r186 Reflector](https://raw.githubusercontent.com/mrdoob/three.js/r186/examples/jsm/objects/Reflector.js). Download SHA256 `57836df976f02a474b2dcfbb6609bca8bde0ccc6e77159ad8e418fa11c065d3b` is byte-identical to installed Three 0.186.1. It constructs a HalfFloat target without allocating GPU storage in the constructor. Our wrapper selects the texture type before the first target bind and reflection draw.
- Read [Khronos EXT_color_buffer_half_float revision 9](https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/): WebGL2 RGBA16F is color-renderable with this extension; WebGL2 alone is insufficient. The pool uses RGBA16F/RGBA8 with zero samples, never RGB16F. Both real float/half-float extensions are checked/enabled; no extension or GL API is spoofed.
- Every DeepWater render target was searched. Only waterfall/cave pool Reflectors allocate floating-point targets; sea has none, and no PMREM or offscreen postprocessing is used. Existing shadow targets remain Three's ordinary byte/depth targets.
- Nonblocking WebGL2 completion fences bound full scene submissions to two in flight. The read-only forest owner's approach confirmed this general GL synchronization principle. No forest code/assets were copied and no forest/core files changed. Native RAF, antialiasing, geometry, 1024-square reflections and DPR up to 2 remain unchanged.

See `FOLLOWUP.md` for exact source-bound evidence and remaining limits.

All scene geometry, procedural materials, particles, vegetation, animals, camera compositions and interaction code in this group were independently authored for this assignment. No external image/model/audio files, paid services, access changes or permission tokens were used. The public asset directory is intentionally empty: all assets are generated at runtime and require no downloads.

## Runtime dependencies

- Existing `three` 0.186.x dependency, MIT: renderer, primitives, `Reflector` and `BufferGeometryUtils`. The original installed Three.js dependency license remains the governing notice. `Reflector` is imported rather than vendored. It owns the reflected-camera calculation and render target; our water shading is original.
- Existing React and shared `LiveSceneHost`, `LookSpring`, `useSceneMotion` are consumed read-only.
- No copied code or assets from either MiaAI-Lab reference repository. The supplied brief states `license=null` and no verified reuse grant.

## Actual reference inspection

Both https://alibowbow.github.io/jev/sonnet-html100.html and https://alibowbow.github.io/jev/opus-html100.html were opened in the supported cloud browser by the reference reviewer, including live original scenes. This was technique observation, not a source port.

| Reference | Observed behavior | Applied / rejected |
| --- | --- | --- |
| Sonnet073 `073-ocean-descent.html`, gallery source revision `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d` | Scrolled cyan surface → 3,252m dark/navy → 934m twilight. Fine specks differ in contrast by distance, distant jelly bells diffuse. | Apply independent 3D blue distance fog, interleaved particles, quiet distant jellyfish. Reject submarine/HUD, giant creatures, spotlight cone, scroll descent and black void. |
| Sonnet090 `090-sky-clock-day-cycle.html` | Time-lapse enabled, 03:58→04:31→05:39→07:06: sky/hills/water shifted coherently to peach dawn; village and boat reflections stretched and rippled. | Apply consistent source light and pool reflection, near tactile occlusion and lower distant contrast. Reject flat repeated silhouettes, controls/clock and heavy vignette. |
| Opus100 `100-organic-wave-lab.html`, supplied reference revision `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0` | Double-slit interference visible. Empty + single click generated a local concentric packet that expanded and faded; centre regained calm, probe trace decayed. | Apply bounded contact points, radial propagation/decay and gradient-normal reflection response. Reject neon amplitude, persistent oscillators, top-down laboratory. Our analytic four-event ripple field is NOT their finite-difference solver and does not claim boundary/obstacle simulation. |

Original live URLs:
- https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/073-ocean-descent.html
- https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html
- https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/100-organic-wave-lab.html

No audio quality or physical device performance was inferred from those references. The Opus solver and absorbing boundaries were not independently audited; only visible click behavior was inspected.

## Water architecture (GameWater)

Coordinates use metres and seconds. Cameras remain seated, cannot walk or submerge, and look within ±0.16 rad yaw/±0.085 rad pitch. Ordinary rendering uses display-rate RAF without a 24fps cap and device pixel ratio up to 2; capture timings on software WebGL are not device FPS claims.

| World | Primary water model | Reasons and limits |
| --- | --- | --- |
| Waterfall | Four original curved vertical sheet meshes + directional fragment flow, filaments, base mist/spray, horizontal plunge-pool reflection | Falling water cannot use a horizontal mirror plane. The pool reflects actual surrounding geometry at 1024². Local foam/spray exists at impacts, not across the entire water body. No fluid solver/physical spray collision claim. |
| Cave | Planar pool reflection, Fresnel response, slow normal detail, four analytic touch events | Near wet ledge and daylight reflection are central visual cues. One extra mirrored scene pass buys actual spatial linkage. Very low amplitude; no FFT or persistent solver needed. Submerged visibility is a simple blended absorption approximation, not screen-space refraction. |
| Deep sea | Enclosing depth-tinted volume, fog attenuation, lit particle distribution, soft distant shafts | Fully underwater view has no artificial pool surface or infinite ocean plane. Shader/geometry jellyfish provide translucency and slow in-place response. Single-scattering approximation; no physical volumetric multiple-scattering claim. |

Pool inputs: world x/z contact, scene clock and local normal phase. Outputs: reflection distortion, Fresnel light and damped ring shading. Four event slots are overwritten cyclically, events decay; event emission has a 650ms gate. Render target and all scene GPU resources are disposed on final release. Pool reflection is a second render of the same scene and camera, not another WebGL context.

Alternatives rejected: copying 2D gallery canvases; sky-only environment map for close pool reflection; high-cost FFT on small enclosed pool; opaque poster as default; global resolution/frame cap to conceal measured bottlenecks. Shader fidelity is judged from the captured actual WebGL frames, separately from unit tests.
