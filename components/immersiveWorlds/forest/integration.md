# Morning forest pilot

Card: `amb:morning_forest` · 아침 숲 · 30 minutes.

## Integration contract

The integration owner can lazy import the default export from `components/immersiveWorlds/forest/ForestWorld.tsx` into the existing scene routing. Its only required prop is `active: boolean`. `className?: string` and `onInteraction?: (event: ForestInteraction) => void` are optional. Provide a positioned, nonzero-size parent; the world fills it absolutely.

```tsx
const ForestWorld = lazy(() => import('./immersiveWorlds/forest/ForestWorld'));
// Render inside the app's existing Suspense boundary and scene container.
<ForestWorld active={isPlaying} onInteraction={handleForestInteraction} />
```

The shared `LiveSceneHost` moves one canvas to the most recently mounted holder, including a fullscreen holder. A holder receives callbacks only while it is the top holder and running. Callback refs update without rebuilding the engine. Closing fullscreen returns the same canvas to the prior holder. The last release stops animation immediately and the existing shared host disposes its engine after a five-second reuse window.

The existing `useSceneMotion` policy disables continuous rendering and interaction while inactive, hidden, under OS reduced motion, or while the app's `reduce-motion` class is present. A static 3D frame remains visible. Existing `useLookDrag` provides slight view rotation and engine-controlled slow return. Taps travel no more than six CSS pixels; drags do not also trigger touch effects. Coordinates sent to the engine are NDC in `[-1, 1]`, with positive Y upward. The engine raycasts actual scene surfaces.

`data-state="ready"` means the engine initialized and rendered; `failed` shows a clearly labeled fallback. The fallback is not a substitute for 3D visual verification.

```ts
interface ForestInteraction {
  kind: 'water' | 'leaf';
  position: [number, number, number]; // forest world coordinates
  strength: number;                 // normalized strength
}
```

## Existing audio engine only

This scene creates no AudioContext, media element, player, sound file or independently scheduled audio. Its optional interaction callback is the sole scene-to-audio bridge. Integration should continue using the app's existing mixer, transport, mute state and session lifecycle.

Suggested layers are a quiet water bed near the listener, distant sparse bird calls with subtle left/right placement, and gentle canopy wind at two apparent distances. Bird sounds should come from the distant canopy, never move toward the listener, and leave long quiet intervals. Keep water/leaf touch accents quieter than the main environment bed and rate-limit them in the existing engine. Resolve world coordinates relative to the listener before mapping to an existing pan parameter; do not use raw world X as a pan value. Omit accents if the engine has no suitable licensed source or spatial API. Do not add a new context or fetch unreviewed recordings.

No audio capability is claimed as implemented by the pilot. The integration owner should verify available licensed sources and supported mixer controls in `audioEngine` before connecting anything. Shared audio/catalog/routing files are unchanged here.

## Isolated harness

From the repository root, run:

```sh
npx vite --config components/immersiveWorlds/forest/harness.vite.config.ts
```

Open `http://127.0.0.1:4178/components/immersiveWorlds/forest/harness.html`. Add `?capture=1` to hide verification controls for screenshots. This URL uses only an in-repository Vite entry; no app routes, manifests, dependencies or protected scenes are changed. The optional standalone bundle uses the same config with `vite build` and writes only `.harness-build` below the owned forest directory.

Controls exercise active/pause, the app reduced-motion class, a second fullscreen holder and unmount/remount. `data-testid="interaction-status"` records main/second callback counts and the last event source. The engine's canvas data attributes provide frame, time, look, lifecycle and surface-hit counters for verification. Check OS reduced motion separately through browser emulation, and actual page visibility separately from the app reduced-motion toggle. Wait more than five seconds after the last holder unmounts when asserting final disposal.

### Same-origin cloud preview

For a browser environment that cannot reach localhost, build the isolated entry into the owned public directory:

```sh
node components/immersiveWorlds/forest/build-qa.mjs
```

The existing branch deployment can then serve `/immersive-worlds/forest/qa/index.html`. This generates a standalone `forest-qa.mjs` with inline HTML styles and bundled dependency license notices. The `.mjs` extension keeps the large QA-only bundle outside the existing app PWA's `*.js`/`*.css` precache patterns; shared build and PWA files remain unchanged. Re-run this command after changes to the scene or harness so the reviewed preview matches source. The bundle uses only the already-installed dependencies and no external runtime requests.

Viewport buttons use responsive desktop, an actual 344×800 CSS-pixel portrait scene, and an actual 882×344 CSS-pixel landscape scene. Capture links can use `?capture=1&viewport=portrait` or `?capture=1&viewport=landscape`. These are narrow-layout simulations, not a claim of physical Fold hardware testing.

`Run lifecycle QA` dispatches synthetic PointerEvents through the real component DOM handlers and reads engine diagnostics; it does not call engine methods. It checks live 3D rendering, advancing frames, leaf/water raycasts, active pause, the app reduced-motion class, gentle drag and slow return, single-canvas fullscreen ownership, delayed disposal and fresh remount. Results appear in `data-testid="qa-report"` and are downloadable as JSON. The report distinguishes the actual OS media-query value from the tested app class; it does not emulate or override OS reduced motion.

Real `visibilitychange` observations are logged separately. Hide the actual browser tab for at least 800 ms and return; the log compares the same canvas's frames and simulation time across the hidden interval. A successful observation permits at most two final transition frames and 0.1 seconds of simulation advance. No document visibility property is overridden or simulated. An absent visibility result means the real hidden-tab test has not been observed.

All runtime visuals are generated by original code in the owned scene directory. No external assets or example source code are included. Design references inform broad principles only: branch hierarchy, small leaf motion, backlighting and depth-separated natural details. Reference inspection and final verification evidence are recorded by the implementing owner alongside this document.
