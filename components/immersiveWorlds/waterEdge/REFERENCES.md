# Water-edge worlds: reference and material decisions

Reviewed 2026-10-04. This is a technique/provenance record, not a licence to reuse the reference implementations and not a claim that their entire collections were tested.

## Collections and rights

Both **actual JEV galleries** were opened in the cloud browser and their relevant entry links inspected:

- [Sonnet HTML 100](https://alibowbow.github.io/jev/sonnet-html100.html)
- [Opus HTML 100](https://alibowbow.github.io/jev/opus-html100.html)

JEV checkout inspected: `alibowbow/jev` at `3a9da2170a2adc41a39ae86c5221cfd7338b8429`.

| Original reference collection | Source revision inspected | Rights status |
| --- | --- | --- |
| `MiaAI-Lab/Sonnet-5.5-100-HTML-Files` | `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d` | User brief records `license=null`; JEV's source audit also records `license:null`. No LICENSE/COPYING/NOTICE file found in the inspected checkout. No verified reuse grant. |
| `MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files` | `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0` | User brief records `license=null`. No LICENSE/COPYING/NOTICE file found in the inspected checkout. No verified reuse grant. |

The new water-edge code, meshes, material functions, and generated-in-code textures are independently authored. No source blocks, screenshots, downloaded textures, original SVG paths, character designs, or original audio were imported from either collection. No model-generated picture is used as a full-scene background. Reference screenshots were inspected in the browser session, not shipped as scene assets. Three.js and React are pre-existing project dependencies; no package or licence changes are made here.

## Actual reference observations and decisions

The five relevant originals below were opened and visually inspected. The public live URLs are not immutable; the listed source revisions anchor the accompanying source reading. The two galleries' card descriptions alone were not treated as visual verification.

| Reference | Actual browser observation | Independent adoption | Rejected or deliberately reduced |
| --- | --- | --- | --- |
| **S090 — Sky Clock** | Night scene pixels showed separately layered sky, moon, mountains, tree line, water, close reeds, and scattered low ripple ellipses. Reflected bank/house silhouettes broke into horizontal distortions. A later screenshot showed changed ripples/firefly placement. The keyboard End action turned off AUTO but did not change the displayed 04:00 time, so a time-of-day transition is **not** claimed as tested. | Keep water radiance related to sky direction; break the reflection through moving surface normals; use foreground plants or stones to establish the viewer's position and an unobstructed route into depth. Pond takes moon-path logic; valley takes reflected canopy/sky; shore takes directional sky colour only. | Giant clock, village, boat, flat scenic collage, oversized point glows, graphic UI, broad dark vignette, and a literal horizontal strip-copy reflection. None is the target first-person geometry. |
| **S018 — Synchrony** | Actual pixels showed near large/soft lights and many small distant lights, dark foreground plant silhouettes, a low mist band, and a coherence gauge. Scatter was clicked; the next screenshot showed redistributed illuminated points and a different phase/coherence state. Long-term convergence and audio were **not** tested. | Give the pond a small number of independently phased, depth-placed firefly lights. Occlusion and distance should establish position among reeds, not an overlay of identical dots. | One thousand lights, synchronization experiments, whole-field glow, large foreground bloom, flash interaction and the instrumentation. Pond interaction belongs to the water, not an approaching swarm. |
| **S073 — The Descent** | Actual surface-view pixels showed a thin bright waterline, distinct light beams beneath it, depth-colour falloff, sparse small particles, and large illustrative turtle/submersible subjects. A scroll attempt did not change the displayed 0 m, so no successful descent interaction is claimed. Source reading separately confirmed depth-dependent attenuation, particle layers, and animated rays. | Valley separates visible stone bed, shallow water surface, canopy reflection and sun caustics. Light/detail should attenuate with depth, and particles stay sparse enough that the bed and tiny fish remain legible. | Submersible, sonar/HUD, large foreground animals, educational ruler, deep-sea darkness, and 2D rays used as a substitute for real shallow geometry. |
| **O100 — Organic Wave Lab / Ripple Tank** | Actual default pixels showed double-slit waves and interference. Empty cleared the tank. A direct click on its `over` canvas then produced clearly visible expanding circular fronts. The source separately confirms a finite-difference wave update, edge damping and slope-based lighting. | A tap produces a local, decaying disturbance in the world-space surface normal/height. Keep it bounded, gentle and transient; the disturbance must move with the water in perspective. | Top-down lab, high-contrast cyan experiment palette, persistent wave emitters, sliders, walls and oscilloscope. Our analytical impulses are **not** a port of its finite-difference solver and do not reproduce diffraction or wall reflection. |
| **O061 — Dusk Meadow / Fireflies** | Actual pixels showed foreground curved grass blades, lower-contrast distant vegetation, a low mist band and lights interleaved through it. WIND changed from 40 to 100 and the next screenshot showed changed blade lean and light placement. Source reading separately confirmed damped spring grass response, phase-coupled fireflies, cursor attraction, scatter and meteors. | Pond plants have varied rooted shapes and coherent, low-amplitude motion; tiny independently animated lights sit at vegetation depth. Separate material and silhouette scales instead of repeating one plant billboard. | Cursor attraction, rapid scatter, collective pulsing, meteors, decorative title, excessive empty sky and importing the 2D grass drawing. The present reed animation is a restrained analytic group sway, not a copied spring solver. |

Exact original URLs and pinned source links:

- S090 [live](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html) · [source](https://github.com/MiaAI-Lab/Sonnet-5.5-100-HTML-Files/blob/d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d/090-sky-clock-day-cycle.html)
- S018 [live](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/018-firefly-sync.html) · [source](https://github.com/MiaAI-Lab/Sonnet-5.5-100-HTML-Files/blob/d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d/018-firefly-sync.html)
- S073 [live](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/073-ocean-descent.html) · [source](https://github.com/MiaAI-Lab/Sonnet-5.5-100-HTML-Files/blob/d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d/073-ocean-descent.html)
- O100 [live](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/100-organic-wave-lab.html) · [source](https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/100-organic-wave-lab.html)
- O061 [live](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html) · [source](https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/061-firefly-meadow.html)

Browser limitations during reference inspection: an initial S018 screenshot and subsequent DOM capture timed out while multiple animated references were open. Closing the extra reference tabs and reopening S018 alone allowed its actual pixels and Scatter control to be inspected. No browser security, permissions or network settings were changed. No inference about end-user device performance follows from this tool timeout. Reference audio was left off.

## Water architecture decisions

The three locations use separate geometry and optics. Shared lifecycle plumbing does not imply a shared landscape. These decisions describe the implemented rendering approach, including its approximations, so integrators should not promise physically simulated water.

| World | Geometry/composition | Surface/lighting method | Interaction and limits |
| --- | --- | --- | --- |
| `amb:night_pond` | Water-level seated view; notched and curled lily pads, petal meshes, reeds, irregular close rocks, separate receding banks. Local moon-facing detail remains visible instead of hiding the foreground in black. | World-space analytical water normals, view-dependent Fresnel term, a lunar reflection lobe and small broken glints. Sky/bank radiance is analytical; the bank reflection is a stylized approximation, not an exact planar scene reflection. | Four recycled decaying ripple impulses; visible-water hit testing and bounded event strength. No global flash and no fluid grid. Small fish shadows and sparse lights remain subordinate. |
| `nature:summer_valley` | Low rock beside a winding shallow stream; real bed stones, near boulders, fern/leaf/root geometry and forest depth; no large waterfall centerpiece. | Transparent water reveals actual bed meshes. A one-time scene cubemap gives spatially coherent forest/sky reflection; animated directional normals and small vertex undulations convey flow. Procedural caustics brighten submerged stone materials; wetness adjusts colour/roughness. | Local ripple and slowly turning small fish. Bed visibility is **alpha transparency**, not screen-space/planar refraction. Caustics are an artistic material pattern, not refracted ray tracing. Static reflection capture does not reproduce moving objects or exact planar parallax. |
| `nature:pebble_shore` | Very low seated shoreline with many individually varied rounded basalt stones, a sloped bed and tactile reachable pebble; silver morning colour separates it from panoramic midday `oil-sea`. | Water depth is evaluated against the same sloped-bed function used by the beach. The moving swash edge discards dry fragments and carries narrow broken foam; analytical sky Fresnel reflection, shallow transparency and wet roughness contrast. A procedurally generated environment provides stone radiance. | Only the close selected pebble rolls gently. Swash is a bounded analytic tide/wave combination, not a breaking-wave solver. Foam and wetness are procedural approximations; no claim of full hydrodynamics, moving sediment or physically advected foam. |

Why not install a fluid solver: the required perception is calm local touch response, visible shallow bed, or moving swash rather than an experiment with obstacle diffraction. Independent analytic functions keep scene state bounded and deterministic. This is a scope decision, not a measured universal performance advantage.

## Pixel-review priorities from the rejected pilot

- Review a narrow portrait independently: lily pads, reachable rock, or rolling pebble must remain sizeable and identifiable. A landscape crop with mostly sky or undifferentiated water is insufficient.
- Keep foreground asymmetrical with partial occlusion and useful variation in size, edge wear and roughness. Do not compensate for weak geometry with darkness, vignette or blur.
- Check wet and dry stone colour/roughness separately; specular highlights must not turn every object into polished plastic.
- Check the stream bed and small fish through actual surface pixels, and check shore foam at both advancing and retreating stages. A successful shader compile is not evidence that the surface looks correct.
- Distinguish reference observation from new-scene QA. Exact implementation commit/bundle hashes, generated PNGs and lifecycle tests belong to this group's own QA report; the original demo observations above do not certify the new scenes.

## Audio handoff

No reference audio is reused, and no independent AudioContext or player is created. The existing engine should interpret bounded interaction events if the integrator elects to connect them.

| World | Existing-engine mix direction | Interaction detail |
| --- | --- | --- |
| Night pond | Water-edge insects and soft reeds, a genuinely distant occasional owl, close quiet water details. | Small, softly ramped water-touch detail; no splash shock or firefly sound. |
| Summer valley | Close shallow flow around stones, restrained isolated drops, distant cicadas. | Quiet ripple response. Fish turning is visual and needs no dramatic sound. |
| Pebble shore | Pebble rattle should remain distinguishable from the continuous wave bed; vary rattle density gently with swash phase. | One quiet close pebble roll, separate from wave playback, with no competing player. |
