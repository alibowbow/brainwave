# Immersive worlds integration contract

Base: `1bb79ac572e8568676881bbc7b4404f1bac443e8` (remote main checked 2026-10-04).
Branch: `codex/immersive-worlds-integration-20261004`. Draft only; **do not merge until the user's later instruction**.
The [complete supplied brief](./scene-upgrade-implementation-brief.md) fixes all 30 world directions, audio directions, JEV references and license limits. Its exact canonical IDs are checked against the 32-card catalog minus the two protected worlds in unit tests. This foundation does not implement or register the remaining 27 worlds.

## Ownership and pilot entry points

| Session ID | Default export | Worker-owned paths |
| --- | --- | --- |
| `amb:focus_cafe` | `components/immersiveWorlds/cafe/CafeWorld.tsx` | `components/immersiveWorlds/cafe/`, `public/immersive-worlds/cafe/`, its isolated verification harness |
| `amb:morning_forest` | `components/immersiveWorlds/forest/ForestWorld.tsx` | `components/immersiveWorlds/forest/`, `public/immersive-worlds/forest/`, its isolated verification harness |
| `amb:cosmic` | `components/immersiveWorlds/cosmic/CosmicWorld.tsx` | `components/immersiveWorlds/cosmic/`, `public/immersive-worlds/cosmic/`, its isolated verification harness |

The coordinator alone owns shared routing, types/persistence, the registry, live host, audio services, package/build configuration, integration tests and this documentation. Pilot workers can read `liveSceneHost`, `useLookDrag`, `useSceneMotion` but must not modify them. The coordinator does not implement or edit the pilot-owned directories. Existing `components/rainyWindow/**` and `components/oilSea/**` remain protected. Main currently has no `AGENTS.md` or `.agents/skills`; recheck these and remote changes before subsequent integration.

## Minimum component contract

```tsx
export default function CafeWorld({ active }: { active: boolean }) {
  // Actual independently implemented world; active=false still shows its first frame.
}
```

Only `active: boolean` is required. `contract.ts` additionally offers **optional** readonly `layers`, `subscribeEvents`, and `quality: 'auto' | 'high' | 'balanced'`. A component accepting only `active` is assignable and does not need importing coordinator types into its branch. Default/auto starts at high visual quality; a small viewport is not evidence of low performance. Adaptive reduction needs measured sustained pressure. No fixed 24–30fps default or low-resolution replacement.

- The component fills its parent and handles resizing. It has no full-page navigation, portal, independent player, AudioContext, or autoplay. User audio remains in the shared engine and playback gate.
- Use `useSceneMotion(active)` for active, page visibility and both reduced-motion controls. Render a usable still on pause and reduced motion. Stop RAF, timers, event reactions and look motion when disallowed.
- Prefer one module-level `LiveSceneHost` per world. Every mount acquires a holder and returns its release function on cleanup. Player and fullscreen reuse that same canvas. For new worlds use `disposeDelayMs: 0` to avoid accumulating idle GPU contexts across 30 spaces. The protected hosts retain their existing 5000ms default.
- Engines must release geometry/materials/textures/render targets, RAF, timers/listeners, observers and their context on `dispose()`. An async `init()` must also abort or dispose late results if its engine has been disposed; the host's stale-completion guard cannot clean allocations the engine creates after disposal.
- `useLookDrag` uses the nearest `data-scene-surface`. UI buttons must remain usable. Bound movement; avoid fast camera travel. Interactions can start as visual-only. Any later sound interaction must be reviewed centrally for loudness, rate limits, autoplay and sound-off state.
- Suggested diagnostics on the world root: `data-world-id`, `data-state="loading|ready|failed"`, `data-motion="running|paused"`. These allow integration QA without reading engine internals. They are attributes, not extra required props.
- A meaningful first-frame/loading/error fallback is required inside each actual scene. Shared chunk failure falls back to the old experience. Neither fallback nor a synthetic QA fixture counts as an upgraded world.
- Assets resolve under the existing Vite base URL. Supply source/license records or original-generation provenance. Do not copy JEV/MiaAI code or assets where reuse permission is not established; the brief's technique references are inspiration only.
- Supplemental textures/plants/materials/nebula images may use the built-in image generator when they materially improve quality (user approval 2026-10-04). They must not replace the 3D world with a flat picture. Record generator/date/prompt/provenance, actual local asset paths and build inclusion; paid external services, subscriptions, extra credit spending and new permissions are outside that approval. No generated assets are needed for this core foundation.

## Routing and sequential admission

`worldCatalog.ts` is the stable ID allowlist. Home keys normalize `preset:*` to the existing routine ID and `ambience:*` to `amb:*`. The selected world never comes from edited sound types.

`App → Player / ImmersiveMode → SessionBackdrop → ImmersiveWorldSlot` and `NatureMode → ImmersiveWorldSlot` both use the same registry. Nature studio uses explicit `sceneId`, not `mixId`, preserving “소리 유지” and scene selection after audio editing. Legacy `cave` remains a supported old background, not an extra 33rd card.

Optional `worldId` persists in LastSession/UserPreset, links, renamed saves and backups. Older records remain valid. Legacy `last` records can recover an unambiguous exact built-in name; unknown custom records retain their original fallback. Invalid imported world metadata is stripped without deleting valid saved audio. Protected variants are selected before the new registry and registration of their IDs is rejected.

`registry.ts` deliberately starts **empty**. No glob imports, placeholder modules or speculative pilot imports. After a pilot PR and its QA evidence arrive:

Vite names scene-directory chunks `world-*`; the service worker excludes those and `public/immersive-worlds/**` assets from initial precache, retaining only requested files in a bounded runtime cache. Asset filenames must be versioned/content-hashed when changed because this cache is CacheFirst. Verify actual generated chunks/CSS and network requests when the first real pilot is admitted.

1. Record exact PR head/base, changed files and asset licenses. Verify its changes stay within worker-owned paths. Review unexpected shared edits rather than overwriting them.
2. Apply the reviewed pilot commit(s) to this integration branch, preserving other Work changes. Add only its exact static import callback to `approvedLoaders`; no protected IDs.
3. Run the gates below on that exact integrated head. Review actual pixels and movement against the supplied direction and protected focus benchmark. Report a poster fallback as a fallback, never successful 3D.
4. Share the verified preview URL. Wait for the user's pilot quality decision before distributing the other 27 worlds. Keep this PR draft and do not merge main yet.

## Fixed QA gate

| Area | Required evidence before final integration |
| --- | --- |
| Code/build | `npm run typecheck`, `npm test`, `npm run build`, `npm run check:bundle`; retain current entry budgets, verify world/Three modules are lazy and absent from unrelated initial entry imports |
| Protected scenes | `verify:focus` and `verify:sea`; real ready canvas, pause/resume, bounded drag, unchanged PR46/47 sea features, fullscreen one-canvas transfer, reduced motion and exit/disposal; still + moving visual review |
| Existing functionality | `verify:links`, `verify:scenes`; all home/card and edited/deep-link paths, timer/history, Back/Forward, recent/saved/renamed sessions, audio edit without world switch, “소리 유지”, legacy cave |
| Autoplay/audio | Restrictive browser policy → one real tap; no elapsed time/history before readiness; hybrid sample failure → procedural bed; recording-only failure → error/retry, never resurrect removed synthesized rain; no stale voices after rapid route changes; no extra AudioContext |
| Lifecycle | Repeated enter/exit/rapid switches including unresolved init and late failures; actual dispose calls, GPU/context counts and resource plateau after release; active=false, hidden tab, OS/app reduced motion, scene chunk/asset failure |
| Desktop/viewport | Desktop 1440×1000; Fold-like cover 344×882; inner 768×1024 and landscape 1024×768; repeated resize, no overflow, reachable controls, scene detail/cropping. These are viewport checks, not physical Fold tests |
| Physical-device follow-up | Actual Fold inner/cover, folding, prolonged viewing, audio continuity, heat and measured frame times if a device is available; otherwise explicitly unverified. Never invent device FPS/thermal claims |
| Visual identity | Side-by-side stills and actual interactions for all admitted worlds: independent first-person layouts, physical depth/light/materials/reflection/detail, calm life; no color-only copies, new oil/painter texture, strong flashes, fast camera, startling sound or approaching people/animals |
| Pilots | Cafe: rainy evening seat/coffee/warm lights/distant patrons. Forest: resting viewpoint/dew/sun/small bird. Cosmic: planted floating garden/stone-water/planets/nebula/soft responsive light; no cockpit |
| JEV technical comparison | Both Sonnet 5.5 HTML 100 **and Opus 5.5 HTML 100** must be reviewed before the final visual gate. For strong candidates record exact source/commit, actual rendered observations, light/material/water/depth/life mechanism, fit to each pilot and apply/defer decision. Gallery names or metadata alone do not pass this gate. The user is supplying independently researched Opus links/observations; preserve current work and compare them when received. No copying before license verification |

## Validation record (foundation)

- Baseline main: typecheck, 147 tests, build, bundle passed. Entry JS 402.6 KiB / 410 KiB; CSS 99.5 KiB / 135 KiB.
- Foundation local checks: typecheck, 174 tests, build and bundle passed. New unit cases cover all 30 brief IDs, 32 home mappings, stable saved/link identity, protected-name collisions, lazy registration and 8 host lifecycle cases. Browser chunk/render failures and actual GPU cleanup remain distinct pending gates.
- Local browser discovery found no Chromium/Chrome binary in standard runtime/cache paths. `npx playwright-core install chromium` attempted official Playwright CDN Chrome-for-Testing 149.0.7827.55; downloaded archive was reported as 0 MiB and failed ZIP central-directory validation. No permission changes, paid service or alternate network path was attempted. This is a local executable/download limitation, not proof that the site or all browser validation is unavailable.
- Local `verify:focus`, `verify:sea`, `verify:links`, `verify:scenes` stop before page execution because the Chromium headless executable is absent. Mark **not run**, not pass.
- A supported cloud browser is available. On production baseline, focus loaded the visible poster and reported `data-state=failed`, zero live canvases; autoplay block exposed one-tap start. This cannot establish protected live-3D quality or physical Fold performance.
- Draft PR CI and its Vercel preview are the next available verification paths. Results on each exact head must be recorded separately. Do not label the final gate passed before the three real pilots and their visual reviews exist.
