# Rain shelter worlds — integration contract

Four independent first-person 3D environments. Baseline: `14940149cc5c0fccb778b58d4d755a04aea55e53` (latest remote main at branch creation; includes protected seaside PR #51). The worker does not edit or merge the shared application.

| Canonical ID | Default component |
| --- | --- |
| `nature:tent_rain` | `components/immersiveWorlds/rainShelters/RainTentWorld.tsx` |
| `nature:window_rain` | `components/immersiveWorlds/rainShelters/GardenWindowWorld.tsx` |
| `nature:monsoon_eaves` | `components/immersiveWorlds/rainShelters/MonsoonPorchWorld.tsx` |
| `amb:summer_storm` | `components/immersiveWorlds/rainShelters/SummerStormWorld.tsx` |

```tsx
<World active={playing} onInteraction={handleShelterInteraction} />
```

`active: boolean` is the only required prop. `onInteraction` and `static3D` are optional. Place the component inside a positioned parent with nonzero width/height; it fills that parent. The existing player controls can be overlaid. `static3D` displays the actual 3D first frame and disables the loop. It does not replace the scene with a poster.

Each entry can be lazy-imported independently. All rendering/material helpers are private to this group. Existing `LiveSceneHost` and `useSceneMotion` are used read-only. One host per world moves the same canvas between player and topmost holder (e.g. fullscreen); it does not create a second context for that world. After the final holder releases, the existing host retains the stopped engine for five seconds, then disposes renderer, geometry, materials, textures, shadow targets and the garden refraction target. Pointer gestures are cancelled when their holder/motion policy changes.

The default uses antialiased rendering at device pixel ratio up to 2; there is no FPS cap, adaptive low-resolution downgrade or poster-only main view. Animation follows requestAnimationFrame, with simulation step clamping to avoid a jump after suspension. Reduced motion, the app's `reduce-motion` root class, hidden documents and inactive sessions stop the loop. Resizing a paused scene draws one frame to keep the canvas intact. Camera look is bounded and eases back; movement over 8 CSS pixels is a drag and cannot become a tap. Pointer cancellation and window blur do not emit interaction events.

## Events and audio handoff

```ts
type ShelterInteraction = {
  world: 'tent' | 'window' | 'porch' | 'storm';
  action: 'opening' | 'glass-trace' | 'basin-ripple' | 'awning';
  value: number; // clamped 0..1
};
```

Events are emitted only for a successful explicit scene interaction. The small accessible button performs the same local action as touching its object. No component creates an AudioContext, HTML audio element, timer-based sound or player. No sound has been synthesized or auditioned by this worker. The integrator can connect the callback to the single existing engine; opening state is session-local until central persistence is wired.

| Scene | Existing sound IDs verified in `types.ts` / engine | Recommended response in shared engine (not implemented here) |
| --- | --- | --- |
| Tent | `tent`, `rain`, `dthunder` | Preserve fabric-impact texture; use opening value to gently mix exterior rain and relax low-pass filtering. Gain/filter transition ≥0.8s; do not add an impact on every click. |
| Garden window | `window`, `eaves`, `rain` | Narrow near glass rain, quieter roof drips, broad low garden bed. A trace needs no added sound. |
| Monsoon porch | `eaves`, `rain`, `stream` | Near runoff, stone/water impacts at basin location, broad monsoon bed. Optional small damped water response, no pitched ping. |
| Summer storm | `rain`, `eaves`, `dthunder` | Prefer the existing distant-thunder layer over the `thunder` path's bright initial crack. Quiet gradual rolls plus separate near runoff. Awning value only changes the filtering/exterior balance. |

The current shared summer-storm preset still selects `thunder` at 0.8; this worker is prohibited from changing it. The integration owner must make the distant/no-sudden-peak audio choice centrally before approving the final experience. Thunder delay belongs in that engine; a plausible distant event at 1–3 km has roughly a 3–9s sound delay, if a coordinated weather event is ever introduced. This scene deliberately provides **no lightning flash or flash callback**.

## QA separation

Everything under `qa/` is a development harness, test script, or evidence; it is not a production asset. The harness builds separately with its own Vite config and imports the same entry sources. Do not add the harness or evidence to app imports/PWA caches. No public runtime assets are required: all current geometry and material maps are locally generated and deterministic. `public/immersive-worlds/rainShelters/` is reserved for future group-owned assets.

See `qa/README.md` and evidence JSON for commands, exact source/bundle hashes and measured results. Screenshots are real local Chromium WebGL renders. Viewport emulation is not physical Fold hardware validation; synthetic hidden-state tests are not real tab switching. A second-holder test proves canvas reuse in this harness, not completed wiring of the shared fullscreen UI. Production integration and device/audio approval remain with the integration owner.
