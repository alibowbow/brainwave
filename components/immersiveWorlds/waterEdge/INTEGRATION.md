# Water edge worlds — integration contract

This worker owns only `components/immersiveWorlds/waterEdge/` and `public/immersive-worlds/waterEdge/`. Built from main `14940149cc5c0fccb778b58d4d755a04aea55e53`, including protected ocean PR #51. No common catalog, audio, app, package, CI or protected scene changes. The integration Work owns canonical routing, persisted settings and final merge.

| Canonical scene ID | Default entry |
|---|---|
| `amb:night_pond` | `components/immersiveWorlds/waterEdge/NightPondWorld.tsx` |
| `nature:summer_valley` | `components/immersiveWorlds/waterEdge/SummerValleyWorld.tsx` |
| `nature:pebble_shore` | `components/immersiveWorlds/waterEdge/PebbleShoreWorld.tsx` |

Each entry accepts `{ active: boolean; static3D?: boolean; onInteraction?: (event: WaterEdgeInteraction) => void }`. Only `active` is required. Lazy-import entries from the shared core. Supply a positioned parent with a nonzero height; the world fills it. Keep existing `data-scene-surface` / `data-scene-drag` hooks for chrome-overlay look/taps, and classify these IDs as live 3D centrally so shared overlays and touch-action follow the existing live-scene path. No extra audio context, media element, fetch dependency or external asset service is created. All geometry, textures and shaders are procedural original work. Public asset directory is intentionally empty of runtime assets.

Integration owner also needs to include these lazy scene chunks in the shared PWA on-demand cache policy rather than precaching every world. The isolated QA build imports all three only for verification; do not import its dev entry into production.

## Rendering and lifecycle

Each world has its own Three scene and camera; each same-world player/fullscreen holder shares one `LiveSceneHost` and one canvas. The newest holder wins, and release returns the canvas to the previous holder. Different worlds have independent hosts. All holders released => animation stops immediately, then the standard host schedules disposal after a 5-second retention period. Disposal requests release of geometry, instance buffers, material textures, shadow maps, environment targets and renderer; that delay does not establish completed GPU cleanup. The follow-up records failed clean valley disposal gates below. Static shadow maps are cached; the rolling pebble explicitly invalidates its map while moving. No package changes.

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
# The verifier can start its own server, useful for isolated execution environments:
CHROMIUM_PATH=/path/to/chromium node components/immersiveWorlds/waterEdge/qa/verify.mjs --serve
```

Open `/?world=night-pond`, `/?world=summer-valley`, or `/?world=pebble-shore`; add `&controls=1` for QA controls. See QA report for exact executed commands, browser/runtime, code/bundle digests and limitations. Root production build passing does not by itself prove the unintegrated scenes render: the separate harness build and actual WebGL checks provide that evidence.

## Scope limits

No real Fold hardware, mobile thermal or device FPS guarantee. Fold-inner coverage means viewport emulation. Hidden-state synthetic tests are labeled separately from real tab switching. Reflection/refraction techniques and approximations are documented in REFERENCES.md. No swimmer, underwater camera, free-roaming camera or fast viewpoint motion is exposed. No main merge or live production deployment is performed by this worker.

## Bounded follow-up to PR58

The follow-up branch `codex/water-edge-material-compat` starts at original final head `299a18911b2b7818149e4997dc2101b9c760bef5` and targets the original branch as a separate draft PR. Published production commit `8b906c4e23f18984804659e9213292b84204500b` changes only shore stone material and owned render-target/environment compatibility. It has the exact tree of local capture-source commit `9420bd71def5f8ec6de13006f6132e0ee09ff621`; the GitHub connector changed commit metadata, not source bytes. Entry paths, props, motion/input/audio contracts and geometry/composition are unchanged. Normal and real forced-byte renders are documented in [qa/FOLLOWUP.md](qa/FOLLOWUP.md), with raw source/bundle/image hashes, publication mapping and input/lifecycle reports.

Integration remains blocked on both clean valley lifecycle failures: normal and forced-byte first disposal gates exceeded the unchanged 20-second limit; context loss was eventually observed at 36.8076 and 45.4897 seconds after final detachment. Eventual release does not convert either failure to a pass; second cycles/remounts remain unrun. Resolve or explicitly disposition these failures before general lifecycle approval.

Integrate PR58's exact original head first, then the bounded follow-up commits, preserving all newer main/user changes and the entire sea PR51. The integrator still owns actual Player/ImmersiveMode route/chrome/native-fullscreen validation and exact integrated-head CI. Shared-host five-second retention is not a promise of five-second GPU reclamation; the follow-up measures dispose entry/exit/context-loss separately. Do not treat trusted browser touch emulation as physical touchscreen certification, or the finite SwiftShader bursts as a sustained-performance/queue-bound pass. No merge or deployment is performed by this worker.
