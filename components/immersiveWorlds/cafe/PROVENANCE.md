# Provenance and benchmark decisions

All café geometry, texture generation, rain/refraction/condensation shader, steam, plant meshes, and scene layout were independently implemented for this pilot. No paid service, external media asset, image-generation request, subscription, or new permission was used. All textures are deterministic local canvas output; no runtime network asset request is required. The compiled pilot is generated only from this source and existing npm dependencies.

Existing dependencies: Three.js (MIT, including its Reflector/RoomEnvironment utilities), React/ReactDOM (MIT). No package or lockfile modification. The illustrative scenes below are inspiration/research only: no HTML, CSS, shader, texture, sound, or other asset was copied. Their source license was not established, so reuse was deliberately excluded.

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
