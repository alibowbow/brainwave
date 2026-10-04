# Scops correction and current audio evidence — read-only review

**Keep the narrow correction as an evidence-supported integration candidate. Do not mark its PCM gate or the current build's full audio QA passed.** Run 5 remains failed/incomplete.

The current change is only `services/immersiveSessionBridge.ts:8–17` plus the resolver call at `components/immersiveWorlds/useImmersiveAudioBridge.ts:42`. It overrides `nature:scops_night` positions to scops `.20`, stream `.75`; it preserves the owner profile, defaults, source levels, scheduler and callbacks. Other 29 profile positions return by identity; protected/unregistered IDs get no profile override. The seven focused tests cover these boundaries. All six owner production-file hashes still match the audited PR61 module, and there is no local diff under `services/immersiveAudio/**`.

The actual renderer places the owl left and the stream right, as documented in `scops-spatial-review.md`. The source generator has an internal primary panner `+.5` (`services/audioEngine.ts:3389`); the engine's existing external mapping is `(x - .5) * 1.3` with `.15s` smoothing (`:651–656`). The chosen positions therefore target external scops `−.39`, stream `+.325` without changing the internal generator. The prior owner's `.68/.25` anchors opposed the reviewed visual placement.

Run 5 supplies real application evidence beyond that calculation: before any native input, no graph or starts; trusted Play creates exactly one existing context. The real 780Hz primary source path contains internal panner30 `+.5` and outer panner23 `−.3876928`. Native stream control `.07 → .11 → .07` caused actual gains69/70 to converge on panner72, whose observed value was `+.3228658`. Both final values are within the existing `.003` smoothing tolerance. Stream identity was established from real fader changes and graph connections, not from the expected pan value. This is sufficient to retain the local routing correction; it is not measured output direction or listening approval.

The remaining Scops gate is unchanged: after independent identity and fader restoration, observe at least four nonzero primary-call PCM windows from at least two naturally scheduled calls within 90 seconds; confirm the existing internal primary is right-biased, the corrected outer source is left-biased, and the independently identified stream is right-biased over at least two audio seconds. Require one context, stable source/build/served hashes, no application page error, and normal owned browser cleanup. The run5 raw-observation 5s timeout and browser-process cleanup15s timeout remain unresolved; no proof identifies either app or test as the cause. The outside runner now records exact observation/stage, partial PCM, Korean canvas/frame data. Bounds and assertions are unchanged.

## Scope of the established 9/9

`audio-full-run4-fixed/results.json` passed all nine representative Café engine/bridge checks at `index-D0DhBDB7.js` / CSS `index-Dxjefzym.css`, with82 served hashes and normal cleanup. Among its13 tracked sources,11 remain byte-identical now: App, Player, ImmersiveMode, audioEngine, fresh selection, loader, controller, profiles, interaction normalizer, Café engine, NatureMode. Only `immersiveSessionBridge.ts` and `useImmersiveAudioBridge.ts` changed, exactly by the Scops resolver addition/call. The current build is `index-DFSibu4A.js`, with owner renderer intakes and corresponding dependency chunk changes. Therefore the old9/9 remains source-specific evidence for those unchanged behaviors, but must not be relabelled current-build9/9.

A new nine-check pass will bind cold gate, real cup callback/cue, master/source zero gates, pause/edited resume, user/last restore, actual HTTP503 source status, and pending cancellation to the current bridge/build. It still will not cover all30 semantic events, all holders, scene rendering compatibility, audio naturalness, listening or physical device output. Water/Cozy/Quiet renderer changes require their separate owner/integration gates; Café audio QA cannot stand in for them.

## Next bounded execution proposal, not executed

First run the established nine checks alone once, on a fresh output path, after the owner confirms the frozen source/build and exclusive GPU slot. Each check retains180s, raw observation5s, and cleanup15s bounds; stop at the first failure and preserve it. This isolates the current audio regression evidence from the unresolved Scops measurement/cleanup stall. Then schedule one separately reported Scops diagnostic with the added stage markers; do not automatically retry it.

```bash
SCENE_QA_SERVER_READY=1 \
SCENE_REPO=/workspace/scratch/448e5748a57d/brainwave-integration \
SCENE_BROWSER_PATH=/tmp/cosmic-browser-bin/chromium \
SCENE_BASE_URL=http://127.0.0.1:4175 \
AUDIO_QA_START_PREVIEW=1 \
AUDIO_QA_CASES=live,restore,status,cancel \
AUDIO_QA_OUTPUT=/workspace/scratch/448e5748a57d/integration-audit/audio-full-run6-latest9 \
node /workspace/scratch/448e5748a57d/integration-audit/verify-audio-bridge.mjs
```

No browser rerun, repository change, commit, push or PR action was performed for this review.
