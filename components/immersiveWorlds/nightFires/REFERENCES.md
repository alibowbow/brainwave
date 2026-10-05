# Independent references and provenance

Original code, geometry, shaders, canvas material maps and interactions were authored for these three worlds. No third-party demo code or image/model asset was copied. Existing project dependencies (Three.js and React) are reused; no package files were changed, no new service/credit/payment was used.

Both live JEV galleries were inspected in a supported browser on 2026-10-04:

- https://alibowbow.github.io/jev/sonnet-html100.html
- https://alibowbow.github.io/jev/opus-html100.html

The MiaAI-Lab repositories have no verified reuse grant. They were treated as visual/behavioral references only. References are not claims that those original 2D demos meet this task's spatial quality bar.

| Live reference | Observed behavior | Independent application | Rejected features |
| --- | --- | --- | --- |
| [Sonnet 015](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/015-pixel-campfire.html) | Pressing Space produced a taller bright plume and ascending embers; warm light remained near the fire. | Small world-space flame ribbons, local amber point light, bounded sparse log-touch embers. | Pixel art, miniature camper/tent, large plume, feed-fire UI. |
| [Sonnet 018](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/018-firefly-sync.html) | Layered stems and fog separated near/far glows. | Spatial vegetation occlusion and sparse depth cues; sparks remain near their real fire source. | Thousand-particle synchronized flashes and scientific HUD. |
| [Sonnet 090](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html) | Dragging from 04:01 to 18:10 changed sky, mountain and water colors coherently; windows cast broken vertical reflected streaks. | Violet sky/water coherence, atmospheric mountain layers and restrained water normal/reflection variation. | Clock UI, repeated cone trees, flat village, broad halos. |
| [Opus 061](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html) | Wind slider 40 to 100 visibly increased grass bending. Fireflies/fog interleaved through vegetation. | Slow coherent breeze with varied plant phase; real foreground/middle/far geometry. | Cursor attraction, synchronized flashing, meteors, flat final scene. |
| [Opus 051](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/051-winter-cabin.html) | Toggling lamp off removed its local halo while fireplace remained lit. Timber seams, varied stone and cool exterior remained distinct. | Brass/glass lantern, restrained brightness ramp, rough wood/stone/metal variation and warm/cool light separation. | SVG room, cardboard flames, cat. |

Browser reference review verified actual behavior, not only thumbnails or source text. The production scenes themselves are separately verified in software WebGL; screenshots and exact source/bundle fingerprints are under `qa/evidence/`.
