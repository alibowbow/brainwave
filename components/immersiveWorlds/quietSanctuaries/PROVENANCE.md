# Quiet Sanctuaries — reference and asset provenance

## Rights and original work

The three worlds are independently implemented for Brainwave. No MiaAI-Lab HTML,
SVG paths, shaders, images, textures, audio, characters, or other assets were copied
into this group. The assignment records `license=null` and no verified reuse grant
for both original collections; public availability is not a reuse license. These
examples are visual/behavioral references only. This document does not grant rights
to the reference works.

The group uses original procedural geometry/materials with the repository's existing
Three.js dependency and read-only shared scene-host infrastructure. It adds no paid
asset service, remote asset fetch, copied soundtrack, or separate audio engine.

## Inspection method and reference identity

Reviewed on 2026-10-04 through the actual rendered public pages in the cloud
browser. Both gallery cards and the linked running examples were opened. The web
retrieval service could not fetch the galleries; the observations below came from
direct browser interaction, not a claim that static retrieval reproduced them.

- [Sonnet gallery](https://alibowbow.github.io/jev/sonnet-html100.html): inspected
  cards S031/S090/S100 and followed their displayed execution URLs. Gallery code
  links point to source revision `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d`.
- [Opus gallery](https://alibowbow.github.io/jev/opus-html100.html): inspected cards
  O051/O078/O082/O100 and their linked examples. The assignment pins the reviewed
  Opus source revision to `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0`; the gallery
  itself links to `main`. The live page bytes were not hash-pinned during this
  inspection, so that revision is assignment provenance, not a live-byte claim.

Browser screenshots were inspected as reference evidence only, not included as
production assets. These observations do not establish mobile performance or
Brainwave scene quality; the group's own QA evidence does that separately.

## Concrete observations, adaptations and exclusions

| Reference and observed behavior | Independent design decision for this group | Deliberately excluded |
| --- | --- | --- |
| [S031 — Snow Globe](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/031-snow-globe.html). Dragging the globe changes its tilt and disperses snow. Smaller flakes sit behind the village while larger/softer flakes cross the foreground; small warm windows contrast with blue snow. | Snow Village uses depth-distributed falling snow, size/phase variation, warm distant openings and snow-coated near wood to support a seated outdoor viewpoint. Foreground flakes must not all share one screen-space size or speed. | Glass globe, table-top miniature, shake control, copied village geometry, church-bell/music-box behavior and large bright flakes that obstruct the view. |
| [S090 — Sky Clock](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html). Dragging the time arc changed the sky and landscape illumination together. Reflected buildings, trees and lights are broken into a subtly wavering water layer beneath the horizon. | Meditation Court keeps sky/light/water color coherent, with differentiated shallow-water response and reflective cues attached to the actual basin surface. Near stone and wood remain readable alongside the water. | The flat valley drawing, giant clock, real-time day switch, copied panorama and reflection as an unrelated full-screen overlay. |
| [S100 — Organic Wave Lab](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/100-organic-wave-lab.html). Blob and Rings modes were observed; switching to Rings produced nested continuously changing rounded contours. The page explicitly exposes SVG artwork/code and design sliders. | Warm Heart takes smooth low-frequency curvature, phase variation between adjacent layers and a gradual response/settling envelope as principles for spatial membranes and fibers. Meditation uses restrained response timing. | Flat blobs, concentric SVG wallpaper, editor controls, abrupt palette cycling and any claim that this Sonnet example solves physical water waves. |
| [O051 — Winter Cabin](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/051-winter-cabin.html). Timber, mortar/stone, brass and cloth are differentiated. A warm lamp/fire region contrasts with the cool snowy window. Lamp toggle changed the checked state and the page reported that only the fire now lights the room. | Snow Village uses localized warm window/eave light against cool open-air snow, with separate roughness/color families for grainy wood, powder snow, roof edges and distant masonry. Avoid one uniform ambient tint. | Interior cabin composition, flat SVG room, sleeping cat, aurora spectacle and competing ambient audio. The immediate lamp screenshot precedes the full fade, so no quantitative lighting claim is made. |
| [O078 — Fractal Tree Seasons](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/078-fractal-tree-seasons.html). Moving the season control to winter produced bare connected branching, snow on upper limbs and falling flakes. Clicking the tree reported snow tumbling off branches; the settled winter image was inspected. | Use varied connected branch silhouettes and coherent low-amplitude movement where vegetation is present. Snow rests on upward surfaces, with branches/roofs retaining a readable dark underside. | A single centered infographic tree, annual time control, cartoon hills, whole-scene shaking and continuous snow bursts. Parent-child flexibility is a technique described by the assignment, not independently measured from source in this review. |
| [O082 — Rosée](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/082-perfume-rosee.html). Pointer drag across the bottle produced a visible slight tilt. Thick bright edges/base, pink absorption, a separate liquid surface and narrow reflected highlights make the transparent object readable. | Warm Heart uses local thickness, edge/back-light cues and layered fibrous surfaces rather than uniform transparent pink. Slow displacement/response belongs to geometry in depth. The basin similarly benefits from a distinct waterline and rim. | Product bottle, retail UI, branding/copy, uniform glass-like shell and any assertion of full volumetric scattering. Liquid lag is an assignment-described cue, not a timing measurement from this session. |
| [O100 — Ripple Tank](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/100-organic-wave-lab.html). The initial double-slit pattern was animated. After Empty, a single click in the tank generated an expanding set of circular waves; a later screenshot showed the propagated ring clearly. The page labels itself a discrete 2D wave equation. | Meditation Court uses localized propagating/damped surface response on the shallow basin. Warm Heart borrows the spatial spreading and settling principle for a gentle touch light response. Strength is bounded and the resting scene remains calm. | Top-down lab viewport, neon contrast, oscilloscope, wall-drawing controls, continuous oscillators and copying the solver. Unlike S100, this is a ripple simulation; the two references are not interchangeable. |

## Production boundary

The references guide distinct places: an open stone-and-wood court, an embracing
translucent natural-fantasy interior, and a sheltered view into a snow-covered lane.
They do not justify reusing one scene with alternate colors. All production
geometry, shaders, textures and interaction code remain original to this change.
Any approximation in reflection, translucency or physical response should be named
in the integration/QA notes rather than presented as a physically exact simulation.
