# Living woods — isolated integration handoff

Base: `14940149cc5c0fccb778b58d4d755a04aea55e53` (origin/main fetched 2026-10-04). Branch: `codex/living-woods-four-worlds`. Do not merge this worker PR automatically: shared integration is owned by another Work.

## Entry points

All files below default-export a React component. Only `active: boolean` is required. Optional `static3D?: boolean` requests a real first WebGL frame without animation. Optional `onInteraction?: (event: LivingWoodsInteraction) => void` supplies a bounded event to the existing shared audio engine.

| Canonical ID | Entry relative to this directory | Setting |
|---|---|---|
| `country_morning` | `MorningPorchWorld.tsx` | Seated rural porch, near glazed tea, garden/low wall/fields |
| `amb:rainy_forest` | `RainyForestWorld.tsx` | Broad leaf shelter, wet fern understory, rain/puddles |
| `amb:deep_forest` | `AncientForestWorld.tsx` | Old-growth trunk, buttress roots, moss and shaded depth |
| `nature:bamboo_grove` | `BambooWorld.tsx` | Segmented bamboo grove beside shallow flowing stream |

Mount inside a positioned parent with a nonzero height. Entry fills that parent. The integration owner must wire the exact IDs in its own shared registry; this branch intentionally has no shared catalog/App/SessionBackdrop modifications. Code and materials for each world are independent; only renderer lifetime and interaction policy are shared inside this owned group.

## Lifetime, motion, and interaction

- Reuses the read-only shared `LiveSceneHost`. One canvas/engine per world is reparented to the top holder, including fullscreen. The second holder must use the same world entry; it does not make another context.
- The holder controls `active`; `useSceneMotion` also stops RAF for hidden documents, OS reduced-motion, and the app's `.reduce-motion` class. `static3D` is explicit and optional. The first frame renders even when inactive/static/reduced. Resize repaints frozen 3D.
- Last-holder release stops immediately; the shared host's existing 5-second retention window permits quick remount. After it expires, listeners, shadow maps, geometries, materials, textures and renderer/context are released.
- Real raycast hit on a near interactive object is required. A gesture must stay within 8 CSS px, last less than 700 ms, and not be cancelled. Dragging away and back is never treated as a tap. Non-primary pointers and UI controls are ignored.
- Slow bounded look is limited to ±0.14 rad yaw / ±0.08 rad pitch and eases back. Interactions require running motion, are separated by at least 650 ms, and emit strength `0.24`.
- `world`, `sceneId`, `kind`, `strength` are defined in `types.ts`. Kinds: `tea-ripple`, `leaf-drip`, `leaf-rustle`, `bamboo-leaf`. These are visual events, not new audio types. No AudioContext, playback, samples, network services or permissions are created here.

## Existing audio recommendations

These are integration suggestions only; this branch does not change current mixes or claim audio QA.

| World | Existing engine layers | Direction |
|---|---|---|
| Morning | `birds`, `forest` | Near/far birds; light foliage, no loud close call |
| Rainy | `rain`, `forest`, restrained `stream` | Leaf/soil/water impact depth; no `thunder`/`dthunder` |
| Ancient | `forest`, `cuckoo`, `woodpecker`, `stream` | Restrained distant calls and quiet stream behind the seated listener |
| Bamboo | `bamboo`, `stream`, `birds` | Hollow knocks/leaf friction, close flowing water, distant birds |

Use existing gain ramps and the shared engine, maintaining user volume and mute choices. Do not map every touch to a loud or immediately repeated sample. A silent touch response is valid.

## Isolated QA

All harness, runner, source/bundle hashes and modest evidence files stay in `qa/` in this owned directory. The harness has no production route and its controls are test-only. See `qa/README.md` and generated evidence for commands, viewport sizes, actual checks and limitations. Screenshots must be read as viewport tests, not claims about physical Fold hardware or mobile performance. Software Chromium WebGL proves rendered geometry and lifecycle behavior, not real-device FPS or thermals.

No public textures are required: every material texture is procedurally generated from original code at initialization. `public/immersive-worlds/livingWoods/` is reserved and may remain empty. Source references and reuse restrictions are in `REFERENCE_REVIEW.md`.
