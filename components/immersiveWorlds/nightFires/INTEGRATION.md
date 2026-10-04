# Night Fires integration handoff

Exclusive worker roots: `components/immersiveWorlds/nightFires/` and `public/immersive-worlds/nightFires/`. No shared app, catalog, player, audio, package, CI or protected scene file is changed. Branch starts at main `14940149cc5c0fccb778b58d4d755a04aea55e53`. Integration owner must wire canonical IDs; this worker must not merge.

| Canonical ID | Default component entry | Independent spatial setting |
| --- | --- | --- |
| `amb:campfire_night` | `MountainCampfireWorld.tsx` | Open mountain clearing, rooted pines, near rock/needle detail, small fire and broad stars; no camping equipment or water. |
| `amb:deep_night` | `DeepNightWorld.tsx` | Seated worn bench on a stone overlook, grass, lantern, mountain basin and sparse house lights; no fire or lake. |
| `nature:campfire` | `LakesideCampWorld.tsx` | Violet lake, tensioned canvas tent, chair, table/enamel cup, lantern and low campfire. |

All entries are default React components. **The only required prop is `active: boolean`.** Optional `static3D`, `onInteraction(event)` and `className` are available. `static3D` keeps a real rendered first frame while the audio/session can remain active. Import the entry lazily at the same boundary as the existing protected scenes. Give the component a positioned parent with a real height; its single canvas fills that parent. It has no app navigation, sound player, timekeeper or persistent storage.

```tsx
<MountainCampfireWorld active={playing} onInteraction={handleSceneInteraction} />
```

`onInteraction` is optional. Payload:

```ts
{ world: 'mountain' | 'deep' | 'lakeside', kind: 'log-embers' | 'lantern-brightness', value: number /* 0..1 */ }
```

The runtime throttles interaction emissions to one per 650 ms. Log taps emit a small bounded ember burst. Lantern taps cycle three quiet brightness levels. Pointer travel over 8 CSS pixels, press longer than 650 ms, pointer cancellation, lost capture, blur, hidden state and inactive session do not count as taps. Slow drag is limited to roughly 9° yaw/5° pitch, then eases home. Keyboard actions are focus-revealed buttons. Reduced-motion interaction changes the static rendered frame without restarting a loop.

Pointerdown is delegated to the nearest guarded `data-scene-surface`. It admits the scene subtree and the exact transparent sibling `data-scene-drag` target, excludes native/ARIA interactive chrome, rejects nested foreign surfaces, and gates input to the top holder before capture. All listeners are removed from the same surface on cleanup. The integration owner should include these worlds in the existing outer live-scene/touch-action classification (retain `detailsOpen` → `pan-y`); a scene subtree’s CSS cannot set touch-action on its sibling chrome.

Each canonical world has one `LiveSceneHost` instance. Multiple player/fullscreen holders move the **same canvas/context** to the top holder and return it on release. Hidden, paused, OS reduced motion and the existing `.reduce-motion` class stop rendering. Initialization/resize still produces a real 3D frame. Last release stops immediately; after the shared host's 5-second grace period, geometry, materials, generated texture maps, light shadow maps, render lists and WebGL context are disposed. A WebGL failure displays an explicit short accessible unavailable message; it is never labeled a successful 3D render.

## Existing-engine audio recommendations

No independent AudioContext, player or new recording is included. Suggested quiet layers for the integrator:

| World | Existing engine arrangement | Touch response recommendation |
| --- | --- | --- |
| Mountain | Close gentle fire; insects diffuse; distant owl/wind low and infrequent. | Optional tiny fire crackle gain increase, eased over at least 250 ms, never a loud one-shot. |
| Deep | Wide wind, sparse night birds/insects, low drone if the routine already uses it. | No extra sound required for lamp. |
| Lakeside | Fire near left; lake diffuse front; faint fabric/insects from sides. | Optional gentle fire gain or fabric response; lantern may remain silent. |

These are integration recommendations, not verified audio playback/panning in this isolated branch.

## Verification

Main commands: `npm run typecheck`, `npm test`, `npm run build`, `npm run check:bundle`.

The main application intentionally does not import these entries until the integration owner wires them. Therefore the isolated production harness **also** compiles all scene code:

```sh
npx vite build --config components/immersiveWorlds/nightFires/qa/vite.config.ts
SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/nightFires/qa/verify-night-fires.mjs --serve
```

`--serve` starts and stops only the built QA preview on `127.0.0.1:4190` in the same execution environment. Without it set `SCENE_BASE_URL` to the existing harness. `qa/build/` is ignored and never a production asset. Modest actual PNGs, source/bundle SHA256, motion pairs and test evidence are committed under `qa/evidence/`. This harness uses the real components and shared host, not substitutes.

The software WebGL viewport checks do not establish physical Fold performance, battery/thermal behavior, hardware-GPU FPS, actual browser-tab switching or final app/audio integration. The hidden-state test is explicitly synthetic. The second-holder test exercises the canvas handoff used by fullscreen; the final shared app fullscreen controls remain the integration owner's gate. Water uses an original wave-normal/reflected-sky-and-ridge shader; it is not a planar mirror of every near object.
