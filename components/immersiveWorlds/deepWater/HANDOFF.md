# Deep water group — integration contract

Started from fetched remote `main` **14940149cc5c0fccb778b58d4d755a04aea55e53** (includes protected seaside PR #51), in isolated branch `codex/deep-water-worlds`. No AGENTS.md or .agents/skills existed at this baseline or workspace parents. README/package verification instructions were read. Do not merge from this worker; the shared integration Work owns wiring and merge.

| Canonical ID | Default component |
| --- | --- |
| `amb:waterfall_valley` | `components/immersiveWorlds/deepWater/WaterfallWorld.tsx` |
| `amb:cave_meditation` | `components/immersiveWorlds/deepWater/CaveWorld.tsx` |
| `nature:deep_sea` | `components/immersiveWorlds/deepWater/DeepSeaWorld.tsx` |

Only required prop: `active: boolean`. Optional `static3D?: boolean` renders the same real 3D first frame without motion. Optional `onInteraction?: (event: DeepWaterInteraction) => void`. Parent must give a nonzero width and height; the root fills it. No scene titles, audio controls or QA controls appear in production components.

A single module host exists for each world. Player and fullscreen holders of that same world move the existing canvas; they do not create a second renderer. Only top holder controls motion and receives its interactions. After the last holder releases, scene stops immediately and the existing host's 5-second grace period disposes all geometry/material/texture/shadow/reflection/renderer resources. Context loss presents an honest unavailable status. Paused, hidden, reduced-motion (OS or root `.reduce-motion`) and static3D retain a rendered 3D frame.

Tap is <7px travel and <600ms, separated from drag. Pointer cancel, blur and effect cleanup cancel without tap. Slow damped look is bounded. No independent AudioContext, audio player, fetch, storage, timer or fullscreen API is introduced.

## Optional interaction / existing audio engine

Events: `{ world: 'waterfall'|'cave'|'sea', kind: 'pool-ripple'|'organism-pulse'|'spray', strength: 0..1, pan: -1..1 }`. They are descriptive callbacks, not audio playback or persistent state. Events require a successful visible-world raycast and running top holder, max one emitted event per 650ms. Integration may choose whether to react.

- Waterfall: broad soft waterfall bed, quiet local plunge splash and lateral side stream. Pool touch can gently vary existing splash gain, with a bounded ramp.
- Cave: low spacious ambience plus sparse localized drops; vary existing drop resonance/pan without a new audio bus.
- Sea: soft deep-water bed and sparse distant resonance; organism pulse may remain silent. Never an approaching sound or sharp chime.

No sounds were created or auditioned in this worker; audio engine integration and balancing belong to the integration owner.

## Verification and limits

QA lives entirely in `qa/` and is not imported by production entries. Build and preview commands:

```sh
npm run typecheck
npm test
npm run build
npm run check:bundle
npx vite build --config components/immersiveWorlds/deepWater/qa/vite.config.ts
npx vite preview --config components/immersiveWorlds/deepWater/qa/vite.config.ts
```

The main app intentionally does not route these unmerged entries. The separate production-built QA harness proves scene chunks compile and render. QA bundle/PNG manifests tie evidence to actual source and bundle hashes; do not mistake main-app success alone for new-scene validation. Source and QA evidence stay in the owned directory; no CI/package/shared/protected changes are included.

Physical Fold hardware, mobile thermals/FPS, actual OS fullscreen integration and existing engine audio mix are not claimed by viewport/synthetic tests. Exact completed tests, source/bundle identity, screenshots and measured software-renderer teardown limits are in `VALIDATION.md` and `qa/evidence/results.json`. The existing 5-second delay is a grace period before cleanup, not a guarantee that software-GPU teardown finishes within 5 seconds. Source/license and adopted/rejected reference techniques are in PROVENANCE.md.
