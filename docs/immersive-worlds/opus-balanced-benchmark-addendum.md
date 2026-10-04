# Brainwave reference addendum: Opus 5.5 + Sonnet 5.5

Verified 2026-10-04 UTC. This supplements, rather than changes, the approved 30-world designs. The original research over-weighted Sonnet; the entire Opus catalogue has now been inventoried and its strongest matches reviewed. Do not force a model-based preference: use the strongest specific effect from either collection, while preserving the quality-first immersive direction.

Latest explicit art exception: **nature:rural_summer_night** preserves the original image's composition/palette/identity with warm Ghibli-like countryside atmosphere and Zelda-like 3D toon shading. This user-requested exception is exclusive to 시골 여름밤; create original scenery with no copied characters/assets. Opus/Sonnet vegetation references serve motion/depth, not replacement art direction.

## Scope and provenance

- JEV Opus gallery: https://alibowbow.github.io/jev/opus-html100.html
- JEV data: https://github.com/alibowbow/jev/blob/3a9da2170a2adc41a39ae86c5221cfd7338b8429/assets/opus-html-data.js
- Exactly 100 entries, 001–100. All original titles, Korean titles, demo links and code links were inventoried in the adjacent `opus-html100-inventory.md`.
- Original repo: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files
- JEV source commit and currently verified original main: `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0`.
- Direct rendered pixels inspected: Opus 041, 066 (Earthlike and Gas Giant), 078 (autumn and summer), 061, 051 (lamp and window interaction), 035, 082, 100 (default interference and isolated touch ripple).
- Source inspected for those eight plus 092 Soundscape Mixer. Source audit is not an audio audition: no claim is made that the synthesized ambience was heard or meets production sound quality.
- Not every one of the 100 demos was visually opened. Catalogue descriptions alone are not evidence of actual rendered quality.

## Immediate pilot guidance

### Café: Opus materially improves the interaction reference set

Keep the approved rainy evening cafe, warm lamps, coffee and distant quiet patrons. Use Sonnet 036 for room/desk composition; add Opus 041 for a truly responsive close glass surface, Opus 035 for differentiated cup materials, and Opus 051 for coherent inside/outside state relationships.

- Opus 041 Midnight Window: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/041-rain-on-glass.html
  - Observed: dark blue/cyan city lights, warm amber bokeh, convex droplets of varied size, long rivulets. Dragging produced a localized clear path through condensation, with the surrounding glass still fogged.
  - Source: pooled droplets merge by area, pass a sliding threshold, stretch with velocity, shed smaller drops and erase fog trails. Each drop samples an inverted/scaled exterior image to suggest refraction; fog returns after wiping.
  - Strength relative to earlier Sonnet reference: the wipe/condensation interaction is directly relevant, not just ambient rain appearance.
  - Reimplement on the actual cafe's exterior render/refraction. Do not turn the entire space into blurred flat bokeh. Remove automatic lightning/thunder.
  - Exact source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/041-rain-on-glass.html#L314
- Opus 035 Ember & Oak Coffee Roasters: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/035-coffee-roasters.html
  - Observed: cream stoneware cup with darker glazed upper body/rim, pale crema and rosetta, saucer/contact shadow and faint steam. This is a retail-page prop, not an immersive cafe.
  - Source: differentiated stoneware/glaze/crema, contact shadow, turbulence-displaced blurred steam.
  - Use as the near-prop material checklist, not the floating product composition, marketing typography, roasting pops or store UI.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/035-coffee-roasters.html#L395

### Forest: both collections are useful mechanically, neither flat tree is the visual target

Keep the approved first-person morning resting spot, dew, sunlight and small bird. Add Opus hierarchical wind and occlusion to physically rendered geometry/materials. Do not switch to paper-cut, full-tree infographic, or flat illustrated forest.

- Opus 078 Four Seasons — A Fractal Tree: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/078-fractal-tree-seasons.html
  - Observed: full-tree composition, branching limbs and individually colored leaves, distinct autumn and lush summer states. Overall rendering is clean flat illustration, not a quality upgrade over the required immersive 3D baseline.
  - Source: seeded parent-child branches, depth-dependent flexibility, curved limbs, leaf-level thresholds, interior canopy mass, sun dapples, snow on upward-facing limbs.
  - Best transfer: correlated trunk/branch/leaf movement with differing stiffness, foliage mass and dappling. Add real bark roughness, leaf translucency and contact shadows in Brainwave.
  - Remove shake-tree, regrowth, accelerated year/season playback. No implication that every forest is this same tree with new colors.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/078-fractal-tree-seasons.html#L235
- Opus 061 Dusk Meadow — Fireflies: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/061-firefly-meadow.html
  - Observed: close dark grass, mist across the meadow, layered treeline/hills, rose-indigo sky and sparse glowing fireflies. Better direct match for night scenes than morning forest.
  - Source: spring-damped grass with coherent wind; fireflies and mist interleaved among vegetation depths.
  - Transfer depth occlusion and living grass to the morning forest; use its nocturnal atmosphere for rural night, night pond, scops night and campfire clearings.
  - Remove phase-synchronized mass flashing, meteors, cursor attraction and fast scattering. Avoid approaching or attention-grabbing life.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/061-firefly-meadow.html#L334

### Cosmic floating garden: Opus 066 is a stronger planetary material reference

Keep the approved natural-fantasy floating garden with plants, planets, nebulae and softly responsive light particles. No spaceship option. Opus 066 is a better celestial-surface/lighting reference than Sonnet 024's mostly orbital-particle abstraction. Sonnet 024 remains useful for composing slow orbits, not surface quality.

- Opus 066 Planet Forge: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/066-planet-forge.html
  - Observed: Earthlike world with continent/sea/cloud differences, bright atmospheric limb, day/night boundary and an orbiting rocky moon; Gas Giant showed directional shading and layered gas bands. Ring controls were exercised, but ring-shadow visual fidelity was not separately established by screenshot; that part is source-confirmed.
  - Source: CPU per-pixel sphere, domain-warped terrain noise, biome color, water specular, atmospheric rim, drifting clouds, ring occlusion and mutual-shadow logic.
  - Native source map 512×256; internal planet radius capped at 205px. Do not enlarge its rendered canvas into the hero scene. Reimplement the principles in an appropriately detailed planetary material.
  - Place the planet beyond a near garden/platform with meaningful scale, not centered as a specimen editor. Remove survey panel, scanner/HUD and all creation controls.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/066-planet-forge.html#L463
- Opus 082 Rosée: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/082-perfume-rosee.html
  - Observed: faceted pink glass bottle, thick tinted side/base edges, bright liquid surface, metal cap and cast shadow. It remains an SVG-style product illustration, not real physical transmission.
  - Source: glass-thickness cues, facet tint, shifted liquid images, bright meniscus, cast shadow/caustic placement, spring-damped liquid lag.
  - Use the material-cue checklist for small garden crystals/water vessels and cafe glass. Do not copy the perfume product or storefront, or mistake fake SVG layers for physically rendered volume.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/082-perfume-rosee.html#L230

## Strong additions for the remaining 27

- Opus 051 Hytte — A Winter Cabin: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/051-winter-cabin.html
  - Actual pixels: timber interior, stone fireplace, warm reading lamp, cool snowy/aurora window, steaming cup and sleeping cat. Lamp off and window open state were directly verified.
  - Source: SVG grain/knots/plank variation/stone shading/brass gradients/perspective floor, cool window spill and warm composited light. Three snow depths and window-dependent wind, fire and steam.
  - Strong direct match for winter_lodge; useful material/state relationships for relax, tent_rain, sleep_prep, window_rain, focus_cafe and campfire.
  - The scene itself is still illustrated/composited. Upgrade to the required material/light depth. Tame log flare/spark bursts; no intrusive animal behavior.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/051-winter-cabin.html#L158
- Opus 100 Organic Wave Lab — Ripple Tank: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/100-organic-wave-lab.html
  - Actual pixels: turquoise specular wave field and interference. After Empty, a single touch produced an isolated expanding ripple, directly confirming local interaction.
  - Source: damped finite-difference waves, absorbing edges, obstacles, height-gradient normals, specular and curvature-derived pseudo-caustics.
  - Stronger water-response reference than Sonnet 100 (which is path-morphing, despite the similar title). Good for meditation basin, pond, cave pool, stream, eaves basin and cosmic garden water.
  - Approximately 62k simulation cells and upscaled top-down canvas. Use simulation data to feed a high-quality spatial water material; do not ship the lab grid/oscilloscope/panel or large bright interference as the scene.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/100-organic-wave-lab.html#L434
- Opus 092 Ambience — Soundscape Mixer: https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/092-soundscape-mixer.html
  - Source-only audit, not a listening test. Independent buses, stereo panning, filtered white/pink/brown noise, slow modulation, scheduled sparse events, gain ramps, compression and gesture-gated playback.
  - Useful cross-scene audio architecture, but Brainwave must keep its single existing engine/playback gate. No second competing AudioContext, mixer or autoplay system.
  - Synthetic four-second noise loops/formant-noise cafe voices do not establish convincing high-quality ambience. Prefer licensed field recordings where helpful and audition actual output. Remove/redesign thunder peaks, fire pops and sharp crockery transients.
  - Source: https://github.com/MiaAI-Lab/Claude-Opus-5.5-100-HTML-Files/blob/86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0/092-soundscape-mixer.html#L521

## Balanced mapping across all 30 IDs

S = Sonnet collection; O = Opus collection. Numbers identify separately verified sources, not interchangeable IDs. All transfers are selective effect/material ideas; none justifies visual duplication across cards.

| ID | Balanced reference emphasis |
|---|---|
| relax | O051 warm room/material/state + S015 fire dynamics; physical indoor fireplace |
| country_morning | S042 backlight/organic detail + O078 plant mechanics + O035 tea/ceramic detail |
| sleep_prep | O051 warm/cool room relation + O041 filtered window + S049 restrained atmosphere |
| power_nap | O078 foliage/dappling + S011 depth structure only, no paper appearance |
| meditation | O100 local basin response + S090 reflections + S100 restrained organic response |
| amb:morning_forest | O078 correlated vegetation + O061 depth occlusion + S042 sunlight/dew |
| amb:rainy_forest | O041 droplet/trail mechanics + O078 vegetation + S092 restrained rain ambience |
| amb:night_pond | O100 ripple + O061 interleaved life/mist + S090 moonlit reflection |
| amb:waterfall_valley | O100 water behavior + S073 particle/shaft depth + S090 distant water; new waterfall work |
| amb:campfire_night | O061 living grass/depth + S015 fire + S018 night silhouettes |
| amb:deep_night | O061 mist/depth without mass blink + S090 dark palette |
| amb:snowy_night | O051 warm windows/cold snow layers + S031 snow depth |
| amb:summer_storm | O041 rain behavior with no flashes + S090 sky layers + O092 controlled audio ramps |
| amb:cosmic | O066 planetary lighting/material + O082 translucent material cues + O100 water + S024 slow composition |
| amb:focus_cafe | O041 responsive glass + O035 ceramic/steam + O051 interior state + S036 room composition |
| amb:deep_forest | O078 branch motion/canopy mass + O061 occlusion + S097 vegetation variation |
| amb:cave_meditation | O100 pool response + S073 shafts/particles + S090 reflected layers |
| nature:rural_summer_night | Preserve original image and approved warm countryside/3D toon direction; O061 grass/mist + O078 plant wind + S018 night depth as mechanics only |
| nature:tent_rain | O041 rain trails + O051 interior/exterior state coupling + S015 camp details |
| nature:window_rain | O041 wipe/condensation + S092 refractive-drop principles, newly composed traditional garden |
| nature:monsoon_eaves | O100 basin interaction + O041 water trails + S090 reflection |
| nature:deep_sea | S073 depth palette/particles + O100 localized liquid response where relevant; no forced planet/space effect |
| nature:pebble_shore | O100 shallow wave mechanics + S090 reflection principles; new foam/pebble rendering |
| nature:bamboo_grove | O078 hierarchy/wind + S097 vegetation logic; distinct bamboo geometry/material |
| nature:temple_dawn | O078 surrounding trees + S090 mountain atmosphere; independent Korean architecture/material research |
| nature:summer_valley | O100 local water interaction + S073 shafts + S090 reflection |
| nature:scops_night | O061 occlusion/mist + S018 night space; original subtle owl behavior |
| nature:campfire | O051 prop/material response + S015 fire + S090 lakeside atmosphere |
| nature:womb | O082 translucency/meniscus-like material cues + S100 slow organic response; no anatomical/medical claims |
| nature:winter_lodge | O051 primary interaction/material reference + S031 layered snowfall |

## Rights and quality guardrails

- Opus current repository metadata: `license: null`. Full recursive tree was not truncated and had no LICENSE/COPYING/NOTICE. README and the nine inspected HTML files contain no reuse grant. As with Sonnet, public code is not evidence of permission to import code/assets.
- Implement original techniques; clarify rights before direct copying/porting. JEV itself links creator-hosted demos/thumbs/prompts rather than granting rights to their contents.
- None of these nine Opus files is a ready-made physically lit 3D environment. Some are excellent material/behavior studies; some are deliberately flat graphics. Do not describe them all as high-quality 3D.
- Keep the agreed first-person, quality-first, natural-fantasy direction. Avoid blanket low-resolution buffers, default flat backgrounds or replacing good existing pilot work purely because it used Sonnet inspiration.
- No sudden loud sounds, strong flashes, fast camera motion, or approaching/attention-grabbing animals/people. No synchronized mass twinkle or unnecessary game controls.
- Pilot artists should record which effect was improved and verify actual resulting materials/light/interaction before the quality gate. Both source collections remain available for the other 27 worlds.
