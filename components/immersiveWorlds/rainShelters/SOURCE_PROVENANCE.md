# Rain shelters: visual references and source provenance

Reference review date: 2026-10-04. Scope: only the four rain-shelter worlds.

## Rights and implementation boundary

The supplied `rainShelters.md` records `license=null` for both MiaAI-Lab repositories and no verified reuse grant. This review did not independently establish a different license. Public execution was used to study visible techniques; no demo source, shader, artwork, audio, or other asset was copied or ported. The rain-shelter implementation is independently authored procedural geometry, materials, and motion. Existing Brainwave rendering infrastructure may be imported read-only. No reference audio was enabled, captured, or reused.

These references are not evidence that a completed Brainwave scene matches their quality. Our own screenshots and QA results provide that evidence separately.

## Actual gallery review

Both requested galleries were opened in the cloud browser and their rendered 100-card collections inspected:

- [JEV Sonnet HTML 100](https://alibowbow.github.io/jev/sonnet-html100.html)
- [JEV Opus HTML 100](https://alibowbow.github.io/jev/opus-html100.html)

The Sonnet gallery's source links for the reviewed examples pinned revision `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d`. The Opus gallery linked `main`; the supplied brief identifies its previously verified source revision as `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0`. Live page rendering was inspected, but its bytes were not independently matched to either revision.

## Running examples: observed behavior and transfer decisions

| Reference | Actually observed in this review | Technique selected for independent reinterpretation | Explicitly rejected |
| --- | --- | --- | --- |
| [S092: Nocturne — Window Seat](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/092-rainy-window-bokeh.html) | Running night-window canvas; dense small condensation, differently sized larger droplets with bright rims, and intermittent descending trails over defocused colored lights. Drag across the glass was exercised; the local clearing was subtle in the still captures, so its strength was not quantitatively verified. | Different scales of water on one surface; restrained wet highlights and trails whose direction follows gravity. Use spatial window/fabric surfaces and real garden/forest geometry. | Urban night setting, blanket blur, oversized neon bokeh, full-scene 2D transplant, flash effects. |
| [S015: Last Light at Camp](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/015-pixel-campfire.html) | Running pixel-art forest campsite. Clicking visibly enlarged the upward flame/ember formation and increased the locally warm region around the fire. | A small light source can give nearby material its own localized warm illumination; use only low-amplitude, slow lantern variation in the tent. | Pixel-resolution rendering, overhead/exterior campsite composition, flying logs, large flame impulses, repeated people, attention-seeking sparks. |
| [S090: Sky Clock](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html) | Actual layered sky/ridges/near reeds/lake. Reflections are vertically stretched, broken by moving horizontal ripples; near silhouette, distant haze and warm point lights separate depth. Time-control interaction changed displayed time/state; the inspected screenshot remained a nighttime view, so a full daylight color cycle was not pixel-verified. | Separate high sky, distant low-contrast weather, middle vegetation, and close wet surface response. Reflected brightness should break into small water-normal variations rather than remain a flat mirrored strip. | Clock and dial UI, paper-flat skyline as the whole world, automatic rapid day cycle, oversized glowing insects. |
| [O041: Midnight Window](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/041-rain-on-glass.html) | Actual varied droplets and longer rivulets over cyan/amber exterior. A real drag produced a local darker/clearer trace while unaffected beads and fog remained nearby. | Locality of glass interaction; sparse heavy rivulets among finer stationary beads; a touched region should recover gently and remain tied to the glass plane. | Copying city colors/composition, globally wiping the whole screen, sudden lightning/thunder, using an opaque blur to conceal scene geometry. |
| [O051: Hytte — A Winter Cabin](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/051-winter-cabin.html) | Actual room with warm timber/stone/brass and cool window exterior. Lamp and window controls were operated; accessibility state confirmed lamp on → off and window closed → open, with corresponding status messages. The still capture was near the transition, so the settled light delta was not measured. | Different materials need different roughness and edge cues. Nearby warm lighting should have a bounded area and remain distinct from the cool broad exterior light. | SVG room reconstruction, cloned log walls/fireplace/cat, uniformly plastic wood, globally orange lighting, winter props in summer scenes. |
| [O100: Organic Wave Lab — Ripple Tank](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/100-organic-wave-lab.html) | Running double-slit interference rendered with continuous bright/dark wave gradients and a live probe. Empty, tap and drag controls were exercised. A post-empty still was calm; the isolated tap ripple was not conclusively captured before a later browser layout-metrics timeout. | A contact produces a bounded expanding water disturbance with damping, and water appearance follows surface slope. Apply this principle to the stone basin and wet-ground response at seated perspective. | Top-down laboratory UI, neon laboratory water, strong repetitive oscillation, claiming an analytical ripple is a finite-difference fluid solver. |

The supplied brief describes O100's finite-difference solver, absorbing boundaries and gradient normals. That algorithm description is supplied prior evidence, not newly verified by this visual review; no source internals were inspected here. Sonnet 100 is a different SVG path-morphing design tool and is not the ripple-tank reference.

## Four-world design transfer matrix

The following is the selected design intent. The implementation and visual QA must verify the actual realization; it is not a blanket completion claim.

| World / entry | Sonnet contribution | Opus contribution | Distinct spatial realization |
| --- | --- | --- | --- |
| `nature:tent_rain` / `RainTentWorld.tsx` | S092 water-scale variation and downward trails; S015 localized warm light with restrained motion. | O051 warm nearby material versus cool exterior; O041 separating small beads from heavier flowing water. | Low sleeping-bag eye height, enveloping folded wet fabric, close lantern, asymmetric tent entrance and forest depth. Water belongs on fabric and outdoors, not on a fake camera glass sheet. |
| `nature:window_rain` / `GardenWindowWorld.tsx` | S092 small condensation plus larger wet highlights, reinterpreted on an actual closed pane. | O041 local touched trace and heavier rivulets; O051 independently differentiated wood and cool exterior illumination. | Traditional close wooden window with hydrangea clusters in front/middle garden layers. Keep enough clear surface to read actual garden geometry. This is neither an urban night window nor a cafe. |
| `nature:monsoon_eaves` / `MonsoonPorchWorld.tsx` | S090 sky/weather/water brightness layers; S092 gravity and multiple water scales used for eave runoff, not glass. | O100 bounded damped basin disturbance and surface-slope light response; O051 wood/stone material contrast. | Open seated porch, visible overhead eave edge, foreground worn timber, roof runoff, tactile stone basin and garden. No pane separates the viewer from the rain. |
| `amb:summer_storm` / `SummerStormWorld.tsx` | S090 layered low-contrast weather and distance; S092 varied falling-water scales adapted to runoff and distant rain curtains. | O051 shelter/exterior light separation; O041 fine-versus-heavy water hierarchy without its window/city composition. | Safe roof/awning edge, close support structure and wet threshold against a broad field and layered storm sky. Opening movement is bounded and slow; no full-screen lightning or sudden light pulses. |

## Audio and reference limits

Reference sound toggles remained off. This review supports no claim about their sound quality. The scene group must emit bounded interaction events only and leave playback, filtering, panning and gain ramps to the existing Brainwave engine. Suitable layers are fabric impact/outside rain for the tent; glass/eaves/garden for the window; roof stream/stone and basin impacts/broad monsoon for the porch; and near runoff/distant rolling thunder for the storm. Thunder should be quiet, distant and gradual, with no sudden peaks; the visual scene does not need a flash to trigger it.

Browser observations were made on a desktop cloud browser, not physical Fold hardware. The running reference pages were available. A later O100 follow-up capture timed out after several animated reference tabs were open; no permissions, networking, fingerprint or browser security settings were changed. The reference tabs were closed after review.
