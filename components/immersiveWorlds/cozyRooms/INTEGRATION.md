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

## Source / rights

All meshes, GLSL and CanvasTexture maps are authored for this group. No generated-image service was used and no external scene assets were downloaded. The public asset folder is intentionally empty. Both requested JEV galleries were actually inspected; concrete adopted and rejected principles, observations and rights limitations are recorded in `REFERENCES.md`. Existing installed Three.js/React are reused under the repository dependency licenses.
