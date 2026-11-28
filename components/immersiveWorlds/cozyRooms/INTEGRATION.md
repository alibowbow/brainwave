# Cozy Rooms integration handoff

Four independently constructed seated / reclining first-person Three.js environments. This worker owns only `components/immersiveWorlds/cozyRooms/` and `public/immersive-worlds/cozyRooms/`. Branch starts from main `1494014` (includes protected seaside PR51). Shared App, SessionBackdrop, catalog, audio, package/CI and protected scenes were not edited. No merge is performed by this worker.

## Entry points

| Canonical ID | Default component |
| --- | --- |
| `relax` | `components/immersiveWorlds/cozyRooms/HearthWorld.tsx` |
| `sleep_prep` | `components/immersiveWorlds/cozyRooms/SleepRoomWorld.tsx` |
| `power_nap` | `components/immersiveWorlds/cozyRooms/NapTerraceWorld.tsx` |
| `nature:winter_lodge` | `components/immersiveWorlds/cozyRooms/WinterLodgeWorld.tsx` |

`active: boolean` is the only required prop. Optional props: `onInteraction(event)`, `static3D`, `className`. Lazy-import the entries independently. Give their parent a real height; the scene fills it and has a 180px minimum fallback height. Do not wrap it in another canvas or create a parallel scene for fullscreen. The existing read-only `LiveSceneHost` moves the same canvas to the most recently mounted holder and restores it when that holder closes.

`active=false`, hidden documents, the existing app `.reduce-motion` class, and `prefers-reduced-motion` stop the clock/RAF. `static3D=true` retains the fully rendered first frame. Resizing a frozen view draws the same state at its new aspect, with separate portrait compositions. A WebGL creation/context-loss failure is reported visibly, without pretending a poster is a 3D render.

Input listens at the closest `data-scene-surface`, accepting the scene subtree or the exact transparent `data-scene-drag` target. Native/ARIA controls, links, form fields, editable/inert content and unrelated nested surfaces are excluded. Only the holder that currently owns the shared canvas can begin/continue an input gesture. A short tap raycasts actual geometry; dragging over seven CSS pixels never becomes a tap even when it returns to its origin. Cancel, blur and unmount release the gesture. Look motion is bounded and eases home. Keyboard users can Tab to contextual controls (shown only while focused). Paused/hidden scenes do not dispatch interactions. Reduced/static mode allows discrete light/curtain updates without ambient animation.

After the last holder leaves, the existing host retains the stopped renderer for five seconds for quick return. Then geometry, materials, textures, instanced buffers, shadow maps and renderer resources are disposed; the detached canvas/context is released for browser reclamation. We do not synchronously force WEBGL_lose_context, which demonstrably stalled this SwiftShader driver after renderer disposal. There are no standalone AudioContexts, audio elements, network assets, timers for sounds, paid assets or new dependencies.

## Existing-engine audio adapter

`onInteraction` receives `{ world, type, intensity }`, with intensity clamped to `[0, 0.35]`. These are recommendations, not an instruction to autoplay or create another engine. Central integration decides if an existing layer supports the event and applies the current session volume / fade / mute policy.

| World | Event types and emitted strength | Recommended existing audio treatment |
| --- | --- | --- |
| Hearth | `ember` 0.20 | Quiet close ember tick over broad fire bed; soft room resonance; no flare/thunder. |
| Sleep | `lamp` 0.16, `curtain` 0.20 | Keep lamp silent; slight filtered cloth/wind change for curtain; distant night insects. |
| Nap | `canopy` 0.22 | Very soft cloth rustle; gentle breeze and distant birds. |
| Winter | `lamp` 0.16/0.24, `cup` 0.12, `log` 0.18 | Silent lamp; tiny cup/ember transient only if available; indoor fire separated from filtered exterior wind. |

No persistence is implemented here; canonical selection and persistence belong to the integration owner. Scene-local light/gap settings live with the shared engine and reset after disposal. No unrequested user localStorage is read or written.

## Evidence / reproduction

Run repository gates from its root:

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
```

The production app remains intentionally unwired, so its successful build alone does not validate these new worlds. The owned QA script separately bundles all four entry points and uses the resulting static output for real software-WebGL rendering and interaction/lifecycle tests:

```bash
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/cozyRooms/qa/verify-group.mjs
```

The browser may also be a normal installed Playwright Chromium (omit `SCENE_BROWSER_PATH`). `COZY_OUTPUT` defaults to `/tmp/cozy-qa-final`, `COZY_BUNDLE` to `/tmp/cozy-qa-bundle`, `COZY_PORT` to4201. The group runs one browser per world and preserves completed evidence. `qa/verify.mjs` is the single-process harness; `COZY_WORLDS` selects a subset when reproducing a specific scene. The script records exact source and bundle SHA-256, PNG hashes, browser version and evidence. See `qa/evidence/verification.json` and `qa/VALIDATION.md` for actual outcomes, rather than treating this reproduction instruction as a pass claim.

The small committed QA PNGs/JSON are review artifacts, not production assets. Do not move the harness or screenshots into the public asset directory or precache. Fold-inner / landscape checks are viewport emulation, not physical Fold hardware. Visibility tests explicitly simulate `document.hidden`; no real tab-switch claim. Software WebGL does not establish real-device FPS, battery or thermals. Central player/selection/audio wiring must be exercised by the integration Work after it connects the entries.

## HDR rendering upgrade

`CozyEngine` renders through the shared `HdrPipeline` (`components/immersiveWorlds/shared/render/`) when the context supports half-float targets: HDR MSAA scene target, SSAO, a half-resolution room volume (moon/window beam with dust, fire haze through the firebox mouth, outdoor aerial haze), bloom and the ACES grade. The pipeline is created once in `init()` after the world factory, receives sizes only at the engine's existing deferred `applySize()` point, replaces only the single scene draw inside the fenced submission, and is disposed with the engine. Without float targets (and in unit tests with renderer doubles) the previous direct renderer path remains, using the world's exposure. `?post=off` in the isolated QA harness forces the direct path for comparison.

Worlds now describe light physically: one motivated key (fire, moon, sun, blue-hour window), a dim ambient and the room's own radiance probe (`lighting.ts`, captured once in `prepare`) for reflections and soft bounce. Surfaces are code-only shaders: world/object-space wood with varnish (`shared/render/woodSurface.ts`), woven/knit/velvet textiles (`fabricSurface.ts`), plaster and glaze (`interiorSurface.ts`), the shared rock surface for masonry, plus cozy-local fire (`fireDetail.ts`: char cracks, coal bed, ray-marched flame volume, sparks, flicker-driven light), rubble masonry (`masonry.ts`) and cloth/cushion/stone geometry (`geometry.ts`). `qa/capture-quality.mjs` captures quality PNGs (`COZY_QUALITY_ACTIVE`, `COZY_QUALITY_QUERY=post=off`); before/after comparisons are in `qa/evidence/hdr-upgrade/`. SwiftShader captures grade appearance only, never device speed.

### 파워 냅 garden (second pass)

The terrace garden is built in `napGarden.ts` (geometry, the shared canopy function and the haze/shaft volume) and `gardenPaint.ts` (a small pure-JS painter for the olive, cypress and meadow atlases, so the same drawings run in Node tests). Old olives are lofted, twisted strands with burls and flutes that part into `treeGeometry` crowns of small silver-green sprays; cypresses are dense card columns around a dark core; the meadow is instanced tuft cards (green, dry, mixed, poppy, chamomile, lavender) placed by low-frequency fields, thinned along the path, with a cheaper far band and sparse stubble on the grove slope. One canopy function (`oliveCanopy`, with a CPU twin for tests) dapples the leaves, bark, meadow, flags and the sail's transmitted light and lights the shafts in the volume pass. `napGarden.test.ts` and `gardenPaint.test.ts` hold the budget (under 0.9M triangles including the shadow pass), tree, canopy, meadow and atlas contracts.

Daylight: a strong warm key sun (8.4) against the sky's fill, so sunlit and shaded surfaces separate, with crisp canopy dapples. The sky is linear HDR radiance: a saturated zenith over a lighter blue horizon, the sun's aureole on its side, a few cumulus, and sunlit fields below the horizon so the radiance probe gives warm ground bounce instead of sky blue. The garden volume's haze is gated by distance (`clear`), so the near meadow stays clear and only the far ridges recede into blue aerial perspective; sky pixels take a short path so the haze does not grey them. The sail transmits the sun as warm HDR light that blooms, brightest on the sun's side, with leaf shadows broken at leaf scale. The radiance probe sees it at about a third of that (`sailGain`), as much light as real canvas passes, so the shade beneath stays cool shade. The grade uses thresholded bloom (only the sail, aureole and glints spill light) in place of the earlier veil, with warm highlights and cool shadows.

### Third pass: sleep room, hearth, winter lodge

- **수면 준비** is now a whole bedroom seen from a reading chair in the corner (still a seated first-person view). The made bed stands against the left wall: channel-tufted headboard, mattress and sheet, a duvet that rolls over the edge and falls in folds with drooping corners and a turned-down band (`bedding.ts`), two euro shams, two sleeping pillows sewn from puffed panels with corner creases and a head dent, a velvet cushion and a chunky knit throw over the foot. A casement window of twelve panes between floor-length pinch-pleated linen drapes looks onto a night garden (`nightView.ts`): the shared HDR night sky with a moon and twinkling stars, a lime tree built with `treeGeometry` whose leaf sprays (painted by the family's pure-JS painter) sway slowly across the panes, a dark lawn and a ragged treeline. The moon is the key light: its shadowed beam lays the window bars across the duvet, floor and rug, with dust in the volume pass and faint, slowly moving leaf dapples from the tree's crown (`crownCanopy`); a broad shadowed cool spot outside the glass gives the pane's sky light. The ceramic lamp on the far nightstand (with a book and a glass of water) is the warm counterpoint. Walls are embossed half-drop wallpaper above a painted dado with applied panel mouldings, a moulded skirting, a cornice and an architrave (`roomTrim.ts`: profiles swept along runs with mitred frames). A framed moonlit print with glass hangs above the bed, a fiddle-leaf fig stands in a woven basket by the window (`houseplant.ts`). The drapes breathe in the vertex shader and gather by a transform when the curtain is tapped, so nothing is rebuilt on the CPU per frame.
- **불멍 힐링** is furnished as a reading room (`readingRoom.ts`): a built-in oak bookcase fills the right alcove flush with the chimney breast (cupboard doors, six shelves of a few hundred books of varied size, binding and colour with gilt bands and labels drawn per spine, stacks, leaners, a jug, a trailing plant and a small print, under a brass picture light); a buttoned leather wingback with a knitted throw over its arm stands in the left alcove beside a side table with tea and an open book; a woven basket of split logs sits on the hearth; the mantel carries a clock, candles and a trailing plant; the side walls and left alcove are oak-panelled to dado height above a moulded skirting, with trowelled lime plaster above; the rug has pile. A small unshadowed light dances in the firebox mouth and the volume's fire glow follows the flicker, so warm shading moves over the hearth, chair and shelves.
- **겨울 산장**: the cone conifers are replaced by Norway spruces built spray by spray (`winterView.ts`: whorls of drooping ribbons whose upper faces carry snow, ragged green edges, slow sway), in three depth layers fading into the blue-hour air; snow falls through the shared `snowFall` at three depths (soft out-of-focus flakes just outside the glass, lamplit); the panes carry fern frost grown from the frame and corners, a misted condensation band and water beads. Inside, the logs take individual tones, dark contact lines and strips of bark, the plaid is a heavier twill, a chunky cream knit lies folded over it, and a clothbound book with a ribbon sits beside the steaming mug.
- Probes: a degenerate-derivative guard in the shared surface bump (`interiorSurface.ts`) stops thin trim seen edge-on by a probe face from writing NaN into the radiance probe (which otherwise blacked out every lit material). Glossy liquids and glass keep a roughness of at least 0.12 so their specular peaks stay inside half-float range, and the bedroom's garden tree is left out of its room probe (it adds no measurable bounce).

## Source / rights

All meshes, GLSL and CanvasTexture maps are authored for this group. No generated-image service was used and no external scene assets were downloaded. The public asset folder is intentionally empty. Both requested JEV galleries were actually inspected; concrete adopted and rejected principles, observations and rights limitations are recorded in `REFERENCES.md`. Existing installed Three.js/React are reused under the repository dependency licenses.
