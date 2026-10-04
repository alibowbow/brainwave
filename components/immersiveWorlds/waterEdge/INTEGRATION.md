# Water edge worlds — integration contract

This worker owns only `components/immersiveWorlds/waterEdge/` and `public/immersive-worlds/waterEdge/`. Built from main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including protected ocean PR #51. No common catalog, audio, app, package, CI or protected scene changes. The integration Work owns canonical routing, persisted settings and final merge.

| Canonical scene ID | Default entry |
|---|---|
| `amb:night_pond` | `components/immersiveWorlds/waterEdge/NightPondWorld.tsx` |
| `nature:summer_valley` | `components/immersiveWorlds/waterEdge/SummerValleyWorld.tsx` |
| `nature:pebble_shore` | `components/immersiveWorlds/waterEdge/PebbleShoreWorld.tsx` |

Each entry accepts `{ active: boolean; static3D?: boolean; onInteraction?: (event: WaterEdgeInteraction) => void }`. Only `active` is required. Lazy-import entries from the shared core. Supply a positioned parent with a nonzero height; the world fills it. No extra audio context, media element, fetch dependency or external asset service is created. All geometry, textures and shaders are procedural original work. Public asset directory is intentionally empty of runtime assets.

## Rendering and lifecycle

Each world has its own Three scene and camera; each same-world player/fullscreen holder shares one `LiveSceneHost` and one canvas. The newest holder wins, and release returns the canvas to the previous holder. Different worlds have independent hosts. All holders released => animation stops immediately, then the standard host disposes after 5 seconds. Geometry, instance buffers, material textures, shadow maps, environment targets and renderer are released. No package changes.

Normal view uses antialiasing, DPR up to 2, and requestAnimationFrame without an artificial frame cap. Reduced-motion media query, existing `.reduce-motion` app setting, hidden document, `active=false` or `static3D=true` preserve a rendered first/current 3D frame and stop animation/interaction. Resize re-renders the still view. WebGL failure displays a truthful localized unavailable state; it never claims a poster is live 3D.

Pointer look is limited to approximately ±8.6° yaw / ±5.2° pitch and eases back. Tap requires travel <=8 CSS px, duration <750 ms, primary pointer/button, and a true scene hit. Movement back to origin is still a drag. Cancel and blur never tap. No audio reaction while paused/reduced/hidden. Keyboard Enter/Space touches the lower-center view where valid geometry exists. Optional callbacks are bounded; they do not change global settings.

## Interaction/audio adapter

```ts
interface WaterEdgeInteraction {
  world: 'night-pond' | 'summer-valley' | 'pebble-shore';
  kind: 'ripple' | 'pebble-roll';
  strength: number; // scene-bounded visual cue, not a gain multiplier
  position: { x: number; z: number }; // metres in the scene's local water/ground plane
}
```

The host limits successful events to at least 0.65 seconds apart; pebble animation adds its own settling interval. Route the callback into the existing audio engine only if the integration owner implements a suitable quiet one-shot adapter. Do not instantiate another player or modify selected sound-layer volumes on tap.

Recommended existing-engine layers (not applied by this worker):

| World | Quiet bed and spatial hierarchy | Integration recommendation |
|---|---|---|
| Night pond | `ruralCrickets`/`night`, faint `stream`, very distant `owl` | Lower owl relative to insects, gentle water detail; reeds only if an existing suitable layer is available. No sudden close call. |
| Summer valley | Close `stream`, distant `cicadas`, occasional small drops | Existing preset includes `waterfall`; avoid a prominent waterfall bed because this place is a shallow stream. Integration owner may lower/remove it. |
| Pebble shore | `pebbles` is the main detail, separate quieter `wave`, sparse distant `seabirds` | Preserve existing engine's retreat-rattle timing. Visual swash is not claimed sample-synchronized with the current independent audio scheduler. |

## Verification harness (QA only)

`dev/` imports these exact entries; no temporary App/SessionBackdrop patch is required. `dev/dist/` is ignored and is never production content. `qa/` evidence and scripts are excluded from scene imports.

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
npx vite build --config components/immersiveWorlds/waterEdge/dev/vite.config.ts
npx vite preview --config components/immersiveWorlds/waterEdge/dev/vite.config.ts --host 127.0.0.1 --port 4187
# In another terminal:
SCENE_BASE_URL=http://127.0.0.1:4187 SCENE_BROWSER_PATH=/path/to/chromium node components/immersiveWorlds/waterEdge/qa/verify.mjs
```

Open `/?world=night-pond`, `/?world=summer-valley`, or `/?world=pebble-shore`; add `&controls=1` for QA controls. See QA report for exact executed commands, browser/runtime, code/bundle digests and limitations. Root production build passing does not by itself prove the unintegrated scenes render: the separate harness build and actual WebGL checks provide that evidence.

## Scope limits

No real Fold hardware, mobile thermal or device FPS guarantee. Fold-inner coverage means viewport emulation. Hidden-state synthetic tests are labeled separately from real tab switching. Reflection/refraction techniques and approximations are documented in REFERENCES.md. No swimmer, underwater camera, free-roaming camera or fast viewpoint motion is exposed. No main merge or live production deployment is performed by this worker.
