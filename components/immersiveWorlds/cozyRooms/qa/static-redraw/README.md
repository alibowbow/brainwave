# Static redraw unit regression

`engine.test.ts` uses real Three vectors, scene, camera, materials and geometry. Only `WebGLRenderer` is partially mocked, with controllable RAF callbacks and a small fake DOM for the unchanged shared-host transfer scenario.

The tests verify observable world updates, camera settling, successful frame counters, time, canvas backing dimensions, event responses and cancellation. They do not read the engine's private invalidation marker. Coverage includes unchanged zero requests, real size/DPR changes, every holder restoration, zero-intensity interaction events, the first zero after animation, exact nonzero aim/look, a failed render followed by a required retry, and stop/disposal without deferred submissions.

Run only this unit file from the repository root:

```bash
npx vitest run components/immersiveWorlds/cozyRooms/qa/static-redraw/engine.test.ts
```

These tests are not browser, GPU, pixel, physical cleanup, or context-loss evidence. The real original-entry recreation and context-loss runners remain separate gates. Fake host timers establish JavaScript behavior only.
