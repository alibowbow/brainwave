# 카페 집중 · rainy evening café pilot

Card identity: **`amb:focus_cafe`**, name **카페 집중**, default **40 minutes**.
Base main: `1bb79ac572e8568676881bbc7b4404f1bac443e8` (verified remotely before branching).
Branch: `codex/cafe-focus-3d-pilot`; draft PR: https://github.com/alibowbow/brainwave/pull/50 .
The integration owner controls routing and merge. This branch does not modify any shared file.

## Minimal integration

```tsx
const CafeWorld = lazy(() => import('../immersiveWorlds/cafe/CafeWorld'));
// Resolve the exact public card ID amb:focus_cafe in the shared router.
// The underlying existing preset has id focus_cafe and durationMinutes: 40.
<Suspense fallback={null}>
  <CafeWorld active={isPlaying && !sceneCovered} />
</Suspense>
```

`active` is the only required prop. Optional `onInteraction?: (event: 'cup' | 'lamp' | 'window') => void` emits after a successful short tap/raycast while motion is allowed. Cup: tiny ceramic/steam response; lamp: smooth 22% brightness change; window: locally clear only inside condensation, leaving exterior rain intact. Dragging turns the view up to about 3° and release eases home over 1.35 s. A drag that returns to its origin is still not a tap.

Mount inside a positioned container with nonzero dimensions. This component fills its parent. For the existing player/fullscreen pattern, mount another instance in the fullscreen holder: the read-only shared `LiveSceneHost` moves the **same** canvas to the top holder and back. Do not retain a hidden top holder. `useSceneMotion` gates active, hidden, OS reduced motion and the app `reduce-motion` class. Paused resize redraws the frozen scene without advancing time. Last release removes the canvas immediately and disposes resources after the shared host's 5-second grace period.

Integration owner should include this variant in existing live-scene `touchAction`/overlay rules. Shared `[data-scene-drag]` permits look gestures over the chrome's empty area; direct object taps require the scene itself to be the pointer target. Buttons must retain their own pointer handling. No changes to those shared rules are included here.

## Audio handoff (proposal only)

Use the **existing single audio engine**. The current preset is pink noise 0.5 + rain 0.6; consider the existing `window` rain layer as the dominant bed, with much quieter pink/room noise, after listening in the complete mix. No thunder, music, or intelligible speech.

- Continuous: muffled window rain, restrained room air, distant nonspeech movement.
- Very sparse: small ceramic/cutlery contact, substantially below the rain bed, with long nonperiodic gaps. No new sound type or source is invented in this pilot; any new recording needs provenance/licensing review by the audio owner.
- `cup` callback: optional quiet dry ceramic touch using an existing engine event path; rate-limit it and honor user volume/mute. `lamp` and `window` can remain silent.
- No `AudioContext`, media player, audio fetch, timer, volume setting, or audio dependency exists in this scene.

## Review and reproduction

The checked-in standalone review page is `/immersive-worlds/cafe/pilot/index.html` on the PR's existing Vercel preview. It is not wired to production card routing. It includes a reproducible compiled bundle so reviewers can open the isolated scene before the integration branch exists.

```bash
npm run typecheck
npm test
npm run build
npm run check:bundle
node components/immersiveWorlds/cafe/qa/build.mjs
SCENE_BROWSER_PATH=/path/to/chromium CAFE_OUTPUT=/tmp/cafe-qa node components/immersiveWorlds/cafe/qa/verify.mjs
```

`verify.mjs` starts and closes its own server and browser and tests the **built** pilot. `capture.mjs` captures the source/dev harness; `dispose-check.mjs` is a focused resource-release diagnostic. No package.json or dependency lock change is required. The browser executable is test tooling, not a shipped dependency.

The pilot build uses `.mjs`, which is outside the application's existing `.js` service-worker precache glob; the 3D pilot is fetched only when its review page opens. The tiny HTML/CSS can appear in the broad static precache. Regenerate the pilot after source changes using the command above. This bundle duplicates React/Three for isolated review only; integrated routing should import `CafeWorld.tsx` and let the app share its Three chunk. The integration owner may later remove the compiled review route after acceptance.

## Implementation and boundaries

- `CafeWorld.tsx`, `cafeHost.ts`, `cafe.css`: component contract, motion/input policy, shared-canvas adapter.
- `CafeEngine.ts`: Three renderer, real planar reflection, independent rain/refraction/condensation shader, camera, resource lifetime.
- `world.ts`: real café/street geometry, local lighting and shadow, open lathed ceramic cup, steam, quiet seated people.
- `materials.ts`, `plant.ts`: deterministic PBR canvas textures, custom curved leaves and ceramic pot.
- `qa/**`: isolated entry, reproducible build, browser tests, evidence and handoff notes.
- `public/immersive-worlds/cafe/pilot/**`: compiled optional review page.

Native viewport resolution at DPR 1–2; no fixed 24fps cap, low-resolution replacement or flat image backdrop. Planar reflection alone uses 65% resolution while the main scene/refraction remains full resolution. Renderer uses requestAnimationFrame and freezes when inactive. Basic unsupported-device status is explicitly identified as failure, never described as rendered 3D.

Known limits: customers/buildings are original procedural models, not scans; street streaks approximate wet reflections while window interior reflection is true planar rendering; droplets use layered shader fields, not fluid collision/merging simulation. No image-generation assets were necessary. Actual Fold hardware/GPU performance and the shared production route remain integration-stage checks. See `PROVENANCE.md` and `qa/VALIDATION.md` for evidence and precise verification limits.
