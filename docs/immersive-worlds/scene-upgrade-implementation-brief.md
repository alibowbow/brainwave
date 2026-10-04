# Brainwave: 30 independent immersive worlds — implementation handoff

Updated 2026-10-04 UTC. This is a planning/research artifact, not a code change. Implementation is now owned by the coordinating worker. Recheck main before branching because the reference inventory below was verified at commit `1bb79ac572e8568676881bbc7b4404f1bac443e8`.

## 1. Confirmed user decisions

- Upgrade ALL remaining 30 cards into independent spaces matching their names. Shared rendering technology is welcome; visually identical shared landscapes or palette-only variants are not.
- Preserve existing high-quality 3D **깊은 집중** and **파도 해변**. Their quality is the benchmark, not a mandate to copy their setting.
- Prefer high-quality physical depth, light, materials, reflections, detail, and life, particularly the feel of 깊은 집중. Distinct styles are welcome, but do not spread oil-paint/watercolor/painterly texture to the new scenes. Existing 파도 해변 is sufficient for that look.
- Immersive first-person spaces, as though seated in or looking from inside the environment. Not detached dioramas.
- Fantasy is allowed, particularly fantasy within nature.
- Light touch interactions are wanted.
- The primary use is LOOKING at the screen to rest/meditate. Default to visual quality first. Do not default to flattened images, low-resolution effects, or a blanket 24–30 fps cap as the product's defining solution. Optimize the high-quality experience; a separate optional power-saving mode can be considered.
- Life/presence and audio improvements are wanted. Living things should belong to the space, rather than demand attention.
- No sudden loud sounds, strong flashes, fast camera motion, or people/animals approaching the viewer or monopolizing attention.
- Three exact pilot directions approved: (1) 카페 집중 = rainy evening window seat, coffee, warm lights, distant quiet patrons; (2) 아침 숲 = morning forest resting spot with dew, sunlight and a small bird; (3) 우주 명상 = floating garden with planets, nebulae and responsive light particles. **The spaceship-window alternative is discarded.**
- Parent reports implementation and main merge are approved. Parent/coordinator owns the exact authorization evidence and publication workflow. User specified GPT Work Astra Ultra, Fast off, multiple windows in parallel.

## 2. Verified current code and inventory

Repository: https://github.com/alibowbow/brainwave
Production: https://jhbrainwave.vercel.app/
Reference main: `1bb79ac572e8568676881bbc7b4404f1bac443e8`, which includes autoplay merge while preserving seaside PR46/47.

- `types.ts`: PRESETS (6), AMBIENCE_PRESETS (13), NATURE_MIXES (13). Total 32 home cards.
- `sceneCatalog.ts`: 14 actual NatureScene images, their names, points and mood; `inferNatureScene(types)` chooses by audio-layer priority.
- `components/session/sessionBackdrop.ts`: `sessionBackdropFor` selects rainy-window only for `focus` (and matching `last`), oil-sea only for `amb:ocean_shore` (and matching `last`), campfire for `relax` and `amb:campfire_night`.
- `components/SessionBackdrop.tsx`: lazy RainyWindowScene and OilSeaScene; all other session backgrounds currently fall through to NatureScene.
- `components/NatureScene.tsx`: image backdrop + restrained CSS mood effects; campfire video; responsive sound anchor projection; crossfade; sound-event pulses; explicit `sceneId` for NatureMode.
- `components/NatureMode.tsx`: natural-sound editor/fullscreen host, keeps selected scenery separate from subsequent layer editing.
- `components/nature-scene.css`: generic rain overlay, very subtle waterlight, five fireflies, thunder flash; no full spatial world.
- `components/useSceneMotion.ts`: pause motion when not active, hidden, OS reduced-motion, or `.reduce-motion`.
- `components/Player.tsx`, `components/ImmersiveMode.tsx`: session and full-screen hosts. Avoid duplicate GPU contexts on entering fullscreen.
- `components/liveScene/liveSceneHost.ts`: existing single shared canvas/engine host, lifecycle, resize, pause and delayed disposal. `look.ts`, `useLookDrag.ts`: bounded drag behavior.
- `components/rainyWindow/**`, `components/oilSea/**`: protected scene implementations. Three.js usage search and renderer routing confirm these are the only dedicated 3D scene families.
- `components/AuraVisualizer.tsx`: alternate shared Canvas 2D graphics view, not a third protected 3D world.
- `App.tsx`: selected preset, explicit `natureSceneId`, audio state and main routing. `experience.ts`: LastSession/UserPreset. `appLink.ts`: canonical hashes and session resolution. `services/audioPlaybackGate.ts`: autoplay protection.
- `services/audioEngine.ts`, `audioSamples.ts`, `audioOptions.tsx`, `audioLevels.ts`: audio infrastructure; `THIRD_PARTY_AUDIO.md`: source/binding details.
- Existing verification entry points: `scripts/verify-focus-scene.mjs`, `verify-sea-scene.mjs`, `verify-scenes.mjs`, `verify-links.mjs`, unit tests and bundle checks. Read package scripts before choosing commands.

Protected IDs:

| Card | Session ID | Renderer |
|---|---|---|
| 깊은 집중 | focus | rainy-window |
| 파도 해변 | amb:ocean_shore | oil-sea |

Do not mistake 자연 장면 `window_rain` for protected rainy-window or `pebble_shore` for protected oil-sea. Both are presently static image scenes and are in upgrade scope. Campfire is an MP4 loop, not a protected 3D scene.

All 14 current basic backdrops were visually inspected in the actual cloud-browser production app. Protected renderer identity is verified in source; the cloud browser showed a fallback poster for focus, so this research does not establish live protected-3D or Galaxy Fold performance.

Current shared mappings to eliminate:
- summer_valley is shown by 9 cards: country_morning, power_nap, meditation, amb:morning_forest, amb:waterfall_valley, amb:summer_storm, amb:cosmic, amb:deep_forest, nature:summer_valley.
- monsoon_eaves is shown by amb:rainy_forest, amb:focus_cafe, nature:monsoon_eaves.
- rural_summer_night is shared by amb:night_pond and nature:rural_summer_night.
- scops_night is shared by sleep_prep, amb:deep_night, nature:scops_night.
- campfire is shared by relax, amb:campfire_night, nature:campfire.
- winter_lodge is shared by amb:snowy_night and nature:winter_lodge.
- Other natural worlds are their own static scene; `cave` is used by amb:cave_meditation and is not a separate NatureMix card.

## 3. The 30-card design inventory

Each row is a distinct place, not a skin of another place. Durations are current defaults, not requests to change timing. For the non-pilot worlds these are coherent design proposals derived from the agreed direction, not claims that the user separately approved every prop. Preserve the three approved pilots exactly.

### Routines (5)

1. **relax — 불멍 힐링 (20m)**. First-person armchair directly before an indoor stone fireplace. Detailed charred wood, deep embers, warm bounced light and subtle smoke. Touch a log for a restrained ember response. Audio: close ember ticks, broader fire bed, soft room resonance. Distinct from both outdoor campfires. JEV #015 for fire behavior only.
2. **country_morning — 상쾌한 아침 (25m)**. Rural-house porch facing a dewy garden, low wall, pale morning sky and a small bird. Touch tea cup for a tiny ripple/steam response. Audio: near/far birds, foliage breeze, restrained distant life. JEV #042 light/bokeh and #090 morning colors.
3. **sleep_prep — 수면 준비 (30m)**. Reclined bedroom view toward moonlit curtains and a window gap; tactile linen, wood and dim warm lighting. Adjust bedside light or curtain gap. Audio: night insects/wind gently filtered by the room. JEV #092 glass/window logic, #049 very restrained color atmosphere; no conspicuous visual pulsing.
4. **power_nap — 파워 냅 (15m)**. Reclining terrace chair beneath a shade canopy, looking toward leaf shadows and soft daylight. Slight canopy interaction. Audio: cloth rustle, breeze, distant birds. JEV #011 depth principles and #097 vegetation motion; no papercut appearance.
5. **meditation — 마음 챙김 (25m)**. Seated at a quiet open meditation courtyard with a shallow basin and tactile stone/wood. Touch water or a small bowl. Audio: tiny water movement, clean long resonance, spatial breathing room. JEV #100 smooth response curves and #090 reflections, not flat abstract wallpaper.

### Soundscapes (12)

6. **amb:morning_forest — 아침 숲 (30m), APPROVED PILOT**. First-person forest resting spot, dew, sunlight through the canopy, a small bird. Wet leaf highlights, bark and real layered forest depth. Nearby leaf/water touch response. Audio: placed bird calls, a gentle stream and moving canopy; no bird approaching the viewer. JEV #097/#042 as behavior/light cues.
7. **amb:rainy_forest — 비 오는 숲 (30m)**. Sheltered beneath large leaves among wet ferns and tree trunks; dripping leaves and shallow mist. Touch a near leaf to release droplets. Audio: different rain impacts on leaves, soil and puddles with forest depth. JEV #092/#097. No lightning show.
8. **amb:night_pond — 여름밤 연못 (40m)**. Seated at water level beside lily pads/reeds, moon reflection, distant owl and small fish shadows. Touch makes a localized ripple. Audio: water-edge insects, reeds, far owl, small water details. JEV #090/#018. Not the rural field or scops branch scene.
9. **amb:waterfall_valley — 폭포 계곡 (30m)**. Rocky resting ledge facing a tall waterfall and deep plunge pool. Wet rock, spray and atmospheric depth. Restrained look drag around the fall. Audio: broad low waterfall bed, distinct nearby splash and side streams. JEV #073/#090 principles; new waterfall geometry/effects required.
10. **amb:campfire_night — 모닥불 밤 (25m)**. Seated in an open mountain clearing with a small fire and broad star sky, minimal camping equipment. Touch a log for faint sparks. Audio: close fire, surrounding insects and distant owl/wind. JEV #015/#018. Do not reuse the lakeside campsite layout.
11. **amb:deep_night — 깊은 밤 (45m)**. Hilltop bench looking across dark mountain layers, faint stars and distant house lights. Small lantern brightness interaction. Audio: infrequent night birds, insects, expansive wind and low drone. JEV #090/#018. Quiet, but still materially rich rather than blank.
12. **amb:snowy_night — 눈 내리는 밤 (40m)**. Outside under a village roof/eave facing a snow-covered lane and warm distant windows. Sweep a little snow from a railing. Audio: softened winter wind and sparse distant life. JEV #031; no snow-globe shell or shaking.
13. **amb:summer_storm — 여름 뇌우 (30m)**. Safely sheltered under a roof facing a wide summer field, layered storm clouds and rain curtains. Adjust an opening/awning. Audio: near runoff and distant rolling thunder with credible delay/distance; no sudden loud peaks. JEV #092/#090. Strong flashes excluded; no full-screen white lightning.
14. **amb:cosmic — 우주 명상 (20m), APPROVED PILOT**. Immersive floating garden in natural fantasy: living plants, tactile floating stone/water, large planets, nebulae and softly responsive light particles. Touch nearby light particles or plants for a slow luminous response. Audio: expansive low spatial bed, long soft resonances and sparse clear tones. **No spaceship/cockpit.** JEV #024 motion principles and #073 spatial particles; #014 nebula is conditional inspiration only because its high-end render could not be verified.
15. **amb:focus_cafe — 카페 집중 (40m), APPROVED PILOT**. Rainy evening cafe window seat with coffee, warm lights and distant quiet patrons. Detailed glass, wet reflections, wood, steam and fabric. Small cup/lamp interactions. Audio: rain at window, soft crockery, distant quiet movement/room tone; avoid intelligible distracting dialogue and sudden clatter. JEV #036/#092. Separate identity from protected focus study.
16. **amb:deep_forest — 깊은 숲 (35m)**. Seated near a mossy old-growth trunk, roots and deep shaded forest interior with little sky. Small near-leaf/branch response; tiny distant life. Audio: cuckoo, woodpecker, forest wind and stream at distinct distances. JEV #097/#011 structure only; no paper style.
17. **amb:cave_meditation — 동굴 명상 (25m)**. Seated on a ledge at water inside a broad cavern; wet rock, reflected volume and a narrow shaft of daylight. Touch pool for ripples. Audio: localized drops with differing cavern resonance, low spacious ambience. JEV #073/#090 techniques, new rock/space design.

### Nature worlds (13)

18. **nature:rural_summer_night — 시골 여름밤**. Low seated viewpoint beside a rice-field path, warm house, utility pole/wires, moving rice and quiet clouds. Touch nearby grass. Audio: preserve the identity of actual recorded rural insects while improving near/far layering and loop coherence. JEV #018/#097; move away from a flat painted postcard without losing the familiar place.
19. **nature:tent_rain — 텐트 속 빗소리**. Low view from sleeping bag inside a wet tent toward the forest. Tactile fabric folds, droplets and lantern. Open/close the entrance slightly. Audio: distinct fabric impacts versus outside rain, changing acoustic filtering with the opening. JEV #092/#015 principles.
20. **nature:window_rain — 비 오는 창가**. At a closed traditional wooden window facing a hydrangea garden. Droplet refraction, wood frame and close flowers. Subtle touch trace on glass or a droplet path. Audio: glass rain, eaves and garden at separate depths. JEV #092. Not urban night focus or cafe.
21. **nature:monsoon_eaves — 장마철 처마**. Seated on an open traditional porch facing roof runoff and a stone water basin. No glass between viewer and garden. Touch basin water. Audio: roof stream, drops on stone/water and broad monsoon bed. JEV #092/#090 principles.
22. **nature:deep_sea — 깊은 바다**. Underwater observation beside rock walls looking into deep blue volume; small fish, jellyfish, suspended particles and distant light. A nearby floating organism responds slowly to touch without approaching. Audio: deep soft water bed and sparse distant resonance. JEV #073; remove expedition HUD/submarine/giant creatures.
23. **nature:pebble_shore — 몽돌 해변**. Very low seated viewpoint by rounded dark stones as shallow water advances and recedes. Wet stone reflections and thin foam. Roll one close pebble gently. Audio: detailed pebble rattle is the main character, separate from the wave bed. JEV #090 reflection principles only; requires new near-shore/pebble work. Clearly distinct from protected panoramic midday oil-sea.
24. **nature:bamboo_grove — 대나무숲**. Resting beside a small stream among tall layered bamboo. Individual nodes, thin leaves, moving light and real vertical depth. Touch a near leaf. Audio: hollow bamboo knocks, leaf friction, stream and distant birds. JEV #097 hierarchy/motion only; new bamboo shapes.
25. **nature:temple_dawn — 산사의 아침**. Seated on a platform near a Korean temple bell pavilion, courtyard and mountain mist. Detailed bronze, timber, roof tile and dancheong. Gentle wind-chime/bell interaction. Audio: long natural bell decay, birds and tree wind. JEV #011/#090/#097 techniques only; no directly matching temple example found.
26. **nature:summer_valley — 여름 계곡**. Seated on a low rock beside a clear shallow stream, looking through water at stones and tiny fish with sun caustics. Touch ripple causes fish to turn slowly. Audio: close flow between stones, small drops, distant cicadas. JEV #090/#073 principles. No big waterfall as centerpiece.
27. **nature:scops_night — 소쩍새 밤**. Forest-edge porch facing a small scops owl on a branch, dark ridge and a narrow distant stream. Small lantern adjustment. Audio: credible owl position/distance, irregular calls with substantial silence; match subtle bird movement to calls. JEV #018. No owl approaching the viewer.
28. **nature:campfire — 모닥불 캠핑**. Seated in a lakeside campsite with tent, chair, lantern, cup, logs and violet twilight. Adjust lantern or subtly affect a log. Audio: fire, lake water, tent fabric and insects from different directions. JEV #015/#090; high-quality spatial rendering rather than pixel-demo transplant.
29. **nature:womb — 포근한 심장**. Inside a warm, embracing natural-fantasy space with translucent membrane/fiber-like materials and gentle life rhythm. Touch spreads a slow light/form response. Audio: soft heartbeat blended coherently with brown noise, no sharp thumps. JEV #100 response/morphing principles; not a clinical heartbeat visualization or flat blob editor.
30. **nature:winter_lodge — 겨울 산장**. Seated by an indoor fireplace facing a large window and blue snowy forest/mountains. Tactile blanket, wood, glass, warm lamp. Adjust lamp; tiny cup/log response. Audio: indoor wood fire separated from outside wind, warm room resonance. JEV #031/#015/#036 principles. Not the exterior snowy village.

## 4. Verified JEV examples and limits

JEV gallery https://alibowbow.github.io/jev/sonnet-html100.html was reached through the actual JEV home → Sonnet 5.5 → HTML 100 navigation. It curates the MiaAI-Lab 001–100 examples rather than hosting all original demos itself. The linked HTML code and actual rendered example pixels were inspected for the following entries.

| No. | Verified title and live URL | Technique / cautions |
|---|---|---|
| 092 | Nocturne — Window Seat — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/092-rainy-window-bokeh.html | Canvas 2D cached layers, refractive drops, half-resolution mist, DPR 1.5. Original flash/thunder unsuitable. Material/light logic is inspiration, not target flatness. |
| 018 | Synchrony — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/018-firefly-sync.html | SVG landscape + Canvas glow sprites/spatial-grid firefly simulation. Original 1,000 synchronized fireflies and dashboard unsuitable. |
| 090 | Sky Clock — A Day Over the Lake — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/090-sky-clock-day-cycle.html | Canvas depth layers, time palettes and strip-distorted water reflections. Day and 23:59 night verified. Remove clock/time-travel UI; new terrain needed for new worlds. |
| 036 | Rainy Sunday Records — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/036-lofi-turntable.html | SVG interior/props + Canvas rain/dust + CSS steam; portrait/landscape layouts. Do not copy its music/playback system. |
| 011 | Paper Hours — A Papercut Diorama — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/011-papercut-dioramas.html | Layering/parallax reference only. Papercut/diorama art is inconsistent with the final interview direction. |
| 097 | Four Seasons Tree — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/097-l-system-seasons.html | Procedural Canvas branches/leaves/wind. Remove growth demonstration and automatic season cycle. Bamboo needs its own geometry. |
| 073 | The Descent — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/073-ocean-descent.html | Canvas depth palette, shafts and particle layers; surface and ~673m view verified. Remove submarine/HUD/sonar/giant squid/exploration. |
| 031 | Winter, 1924 — A Snow Globe — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/031-snow-globe.html | SVG village and front/back Canvas snow. Remove globe/shaking/chime/lullaby. |
| 015 | Last Light at Camp — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/015-pixel-campfire.html | Low-resolution Canvas and cellular fire behavior. Borrow motion principles, not pixel-game look or low resolution. |
| 100 | Organic Wave Lab — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/100-organic-wave-lab.html | SVG path morphing, gradients, optional blur. Blob and Rings verified. Use restrained responsive organic forms, no editor UI. |
| 024 | Orbits — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/024-orbital-sandbox.html | Canvas celestial sprites/trails. Replace N-body interaction, collisions, launches and HUD with composed slow paths as appropriate. |
| 042 | Make a Wish — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/042-dandelion-wish.html | Golden backlight, dandelion, green bokeh. Inspiration for light and small organic detail, not mandatory seed storm. |
| 049 | Lucid — https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/049-mesh-gradient-dream.html | Pastel color field observed. Large blur/distortion can be expensive and is not a substitute for physical space. |

Conditional only: #014 Nebula Voyager https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/014-nebula-voyager.html. Source contains WebGL volumetric raymarching/adaptive quality/2D fallback, but this cloud browser rendered only FALLBACK STARFIELD. Do not claim its high-end nebula was visually verified.

Rights: Original repository https://github.com/MiaAI-Lab/Sonnet-5.5-100-HTML-Files metadata reports `license=null`; no root LICENSE/README was found. Public availability does not establish reuse permission. Treat techniques/composition as inspiration and implement original code; direct copying/porting requires license/permission clarification. Inspected original source commit: `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d`.

## 5. Suggested parallel integration contract

The coordinator should freeze one contract before workers edit shared files; these are suggestions, not already implemented APIs.

1. Assign the three approved pilots first, in distinct scene directories, with one integration owner for shared routing/audio/lifecycle. Each worker receives the full confirmed direction, protected paths, its ID, and the shared API.
2. Resolve visuals by explicit canonical session ID (`focus_cafe` is `amb:focus_cafe`, nature IDs have `nature:`), not audio type inference. Editing a sound must not replace the chosen space. Preserve distinct visuals on deep link, last-session restore and fullscreen. Decide migration of LastSession's visual identity centrally.
3. The integration owner exclusively controls `App.tsx`, `types.ts`, `experience.ts`, `appLink.ts`, `SessionBackdrop.tsx`, shared renderer/registry, and core audio service files. Scene workers own isolated scene modules and their tests/assets. Avoid concurrent broad edits to protected rainyWindow/oilSea.
4. Define one scene props/host interface with active/visibility/reduced-motion state, viewport/quality, scene sound state, bounded look input and optional interaction-event callbacks. Scene workers must not create competing AudioContexts or independent music players.
5. Audio interactions route through the existing engine/playback gate; normalize loudness and rate-limit one-shots. Preserve consent/autoplay handling, volume settings, session timers, and current deep-link semantics.
6. Share one active render context between player/fullscreen where practical; lazy-load world modules, stop hidden/inactive motion, release resources, keep first-frame/error fallback. Fallback is robustness, not the advertised high-quality result.
7. Quality-first rendering with measured optimization. No blanket low-resolution default, default flat poster, or blanket 24–30 fps assumption. Test actual Fold internal/cover displays, portrait/landscape, folding/resize, long viewing, audio continuity and heat. Report measured limits rather than inventing FPS/thermal claims.
8. Validate independent identity with side-by-side stills and actual moving interaction, not just titles. Review 3 pilots against existing focus's depth/material/light quality before scaling patterns to all remaining scenes.
9. Full integration regression includes protected focus/ocean, PR46/47 seaside behavior, direct links and autoplay block/retry, pause/resume, last session, back/fullscreen exit, audio edits without scenery switching, reduced motion, hidden tabs, asset failures and context cleanup.

Recommended later batches once pilots establish the contract: water/deep spaces (night pond, waterfall, cave, deep sea, pebbles, summer valley); shelter/weather (sleep, nap, tent, window, eaves, storm, snow, lodge); living land/fire (relax, morning, campfire night, deep night, deep forest, rural night, bamboo, temple, scops, campfire camping); contemplative fantasy (meditation, womb). Coordinator can rebalance by measured complexity and shared-file ownership rather than card count.

No repository code, commits, publishing, or browser writes were performed by the planning worker. This brief supersedes earlier planning suggestions for shared worlds, painterly expansion, low-quality default, and the spaceship cosmic option.
