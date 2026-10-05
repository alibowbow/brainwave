# Provenance and benchmark decisions

All café geometry, texture generation, rain/refraction/condensation shader, steam, plant meshes, and scene layout were independently implemented for this pilot. No paid service, external media asset, image-generation request, subscription, or new permission was used. Material textures are deterministic local canvas output. The compatibility patch also bundles a locally baked Three RoomEnvironment CubeUV atlas, fetched from the same origin at runtime; there are no external image requests. The compiled pilot is generated only from this source and existing npm dependencies.

The visual revision follows the same provenance: `exterior.ts` independently constructs varied architecture, curtains, light halos and wet-street reflection strips; `shelves.ts` independently constructs pitchers, cups, folded paper packets, books, an unlettered still life and trailing leaves. Contact-shadow, masonry, halo and reflection maps are locally generated canvas effects. These auxiliary surfaces sit within a geometric 3D scene; no image replaces the café or street. No external or generated-image asset was added for this revision.

Existing dependencies: Three.js (MIT, including its Reflector/RoomEnvironment and BufferGeometryUtils utilities), React/ReactDOM (MIT). No package or lockfile modification. The illustrative scenes below are inspiration/research only: no HTML, CSS, shader, texture, sound, or other asset was copied. Their source license was not established, so reuse was deliberately excluded.

## Actual source and visual reviews

Sonnet gallery: https://alibowbow.github.io/jev/sonnet-html100.html

| Reference | Source evidence | Actual visual observation | Independent application |
| --- | --- | --- | --- |
| Sonnet #036 Rainy Sunday Records | https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/036-lofi-turntable.html ; source blob `08a352085f7989633295c9a6a9ad6cbf73a32c0f` | Warm cream/amber interior, readable wood grain and projected window light, staggered steam; SVG/2D implementation | Warm local light pools against cool exterior; procedural wood/bump/roughness; three translucent deforming steam ribbons in real 3D |
| Sonnet #092 Nocturne Window Seat | https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/092-rainy-window-bokeh.html ; blob `48c6585aedf3ea3f628f505cc0922c8b22b87919` | Canvas2D layered bokeh, sharp refracting beads, faint lamp ghost, tiny foreground mug | Real 3D camera depth, much closer open ceramic cup, limited background blur, actual planar indoor reflection instead of painted ghost |
| Opus #041 Midnight Window | https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/041-rain-on-glass.html ; blob `d05bf91ec3cf0557e0b77bbdf424c5bd15a54fc2` | Canvas2D small beads + larger convex drops + sparse long trails; cool city/amber band; wipe reveals background through a regrowing fog mask | Multiple independently jittered bead scales, sparse slow descending fields, dark rim/lower gathered highlight, weak edge condensation; a local tap clears only inside fog and gently regrows it |

Opus gallery was located in the actual JEV navigation (`opus.html` → `opus-html100.html` → `assets/opus-html-data.js`, data blob `c4adddd85f5430f88b337ebb74208b17d6a76960`). Source and actual browser visuals were reviewed, not only thumbnails/titles. Root LICENSE requests on both source repositories returned 404; the Opus README reviewed did not provide reuse permission. No inference of permission was made from public availability.

The physical quality benchmark was the repository's existing rainyWindow scene, inspected read-only: differentiated material maps, real curved geometry, lighting depth, reflection, and lifecycle. This café does not reuse its study layout, textures, city, material code, or audio. The approved café remains its own scene.

Not adopted: original music systems, lightning/thunder, strong whole-screen blur, entire-scene wiping, 2D scene composition as the final environment, or their source code. Opus's collision/merge simulation was considered but not reproduced; current shader rain prioritizes quiet continuous motion without adding a CPU fluid system.

## Capability-safe environment bake

`public/immersive-worlds/cafe/room-environment.hdr` is generated locally from the existing MIT-licensed Three 0.186.1 RoomEnvironment and PMREMGenerator, using the previous sigma .035, 256 face size and original HDR lighting. It is not a downloaded photo or a scene replacement. The reproducible owner-local bake checks real RGBA16F framebuffer support before generation and writes a standard Radiance RGBE atlas. Asset SHA-256: `43bb5410f1ede07802bf3371ee2a9c3054abeaba1fb87eefb7bc992b1cac5d92`. Full source hashes, dimensions, format and HDRLoader roundtrip measurements are in `room-environment.provenance.json`. No generated-image service or new asset license was needed.

Runtime uses direct CubeUV mapping with a sample-only HalfFloat texture; no PMREM render targets are allocated at runtime on either supported or byte path. Relevant exact local sources were inspected: examples/jsm/objects/Reflector.js, src/extras/PMREMGenerator.js, src/renderers/webgl/{WebGLEnvironments,WebGLTextures,WebGLShadowMap}. Khronos EXT_color_buffer_half_float permits RGBA16F rendering in WebGL2 independently of EXT_color_buffer_float; actual framebuffer completeness remains checked.

References: https://raw.githubusercontent.com/mrdoob/three.js/r186/examples/jsm/objects/Reflector.js ; https://registry.khronos.org/webgl/extensions/EXT_color_buffer_half_float/ . No other owner's code or helper was used.
