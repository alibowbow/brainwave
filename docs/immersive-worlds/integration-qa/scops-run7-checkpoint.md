# Scops run7 — functional PCM pass, overall cleanup failure

Against Korean4b5f23a intake build `index-BIpQoT7O.js` / `index-BXP0utCv.css`, the actual-app Scops routing and PCM case passed in8.695s. The run as a whole is **failed** because the owned browser process did not close within15s. The public launchServer kill completed afterward. The normal application source graph teardown is **not verified**.

Run: 2026-10-04T23:03:50.253Z–23:04:14.458Z. HEAD `693f49529e0d5194710dbd8df10c59058491019c` plus frozen integration changes. Before/after17 source hashes, built index and complete dist asset manifest were equal. All18 served JS/CSS resource records matched the frozen build. There were no application page errors, raw5s observation timeouts or PCM90s timeouts in this run. The browser-process cleanup15s failure is retained.

| Functional observation | Measured result |
|---|---|
| Cold/trusted startup | Cold activation=false, context1, graph0/start0; first trusted Play saw blocked with0 graph/start. |
| Actual stream identity | Native fader.07→.11→.07; gains116/117 converged on panner119, independently of expected pan. |
| Existing actual panners | Primary internal panner30 +.5; outer Scops panner23 −.3876928; stream panner119 +.3228658, within existing smoothing tolerance. |
| Natural primary calls | Four PCM samples from two natural780Hz call IDs219 and293; no injected source or scheduler. |
| Primary internal PCM | Right/left energy ratio 5.828427. |
| Corrected Scops outer PCM | Left/right energy ratio 1.462960. |
| Independently identified stream PCM | Right/left ratio 2.064947,103 windows across 4.899410 audio seconds. |
| Context count | One existing native context throughout observed audio. |

Only passive splitter/analyser branches were added to actual identified source panners; no new context, destination route, fake extension, fake input, source or scheduling replacement. Native controls were hit-tested; original stream volume was restored before measurement. This proves the source-layer directional correction under this run's conditions. It does not establish listening quality, physical-device output or all-scene audio coverage.

The earlier run5 failure is preserved. This run passed attachment and PCM observation with explicit stage acknowledgements, but that difference does not prove a causal relationship to the Korean PMREM change. The separate run6 nine-check pass remains bound to its earlier DFSibu4A build and is not transferred to this newer build.

## Cleanup qualification

The outside helper originally tested an accessible `일시정지` role before revealing auto-hidden chrome. In run7 it skipped the native Pause action (no corresponding native input diagnostic), then context.close returned, browser connection closed, and browser-process close exceeded15s. That identifies a test teardown gap, but does **not** establish the cause of the browser process delay or verify application graph disposal. An outside-only helper correction now detects the attached transport through raw DOM, reveals and clicks the genuine native Pause control, and checks the transport changed before context close. It has only passed syntax checking; no rerun was performed.

## Exact tracked source inventory

| Path | SHA256 before = after |
|---|---|
| `App.tsx` | `2a65e2963b9344dfbd73f2dfa47edca7adfc3b0674affcdbb57115caf1e90ba9` |
| `components/Player.tsx` | `a90335757d6b9b67ff91fe7784f4548e63e2706cc2009ac79a11596e3024aa37` |
| `components/ImmersiveMode.tsx` | `13384e202e7d6b2e596c35ad8dfa7ed9a41bc4bb70fbf21913bc07666dc9bd8e` |
| `sceneLayout.ts` | `0de619c6184e1565f973b204afbf31a2e9cc92874cc6f36b5158f6df7f687df0` |
| `components/immersiveWorlds/koreanPlaces/scenes/scops.ts` | `ed4d40a721d640f0ec24abb67e1704f203bb7488e8345e18a3e2a70689db673e` |
| `components/immersiveWorlds/koreanPlaces/WorldEngine.ts` | `37ef6d71fa94d47582c83d0c5ce7dea610e854755b16ebd8b5756aaab0cc8c9c` |
| `components/immersiveWorlds/koreanPlaces/KoreanWorld.tsx` | `07114da6db74ca17b07c32fe715bc4912f05b9be184d71a98f4db92c1145b40a` |
| `services/audioEngine.ts` | `69a2ac927ed5a86cead1ab50e49599ab7806e58cba71f6ad083c496d2d12e020` |
| `services/freshImmersiveSelection.ts` | `21efe50b50d3e601efbfb196386ff91bb815f22d65325f06ca5153e8730f9be2` |
| `services/immersiveBridgeLoader.ts` | `c612f4c2b2d99c05e39ddad8d112cc91387677754f779cc29a76b36798c2a98e` |
| `services/immersiveSessionBridge.ts` | `d07fe121ec3dfe18a565528faef09a98b0e1c3f21ed85967b3e051f9b210bf52` |
| `components/immersiveWorlds/useImmersiveAudioBridge.ts` | `4ee8909fa9859a94403269f0d432af758e008632ada85cf849e025f2a53ceac6` |
| `services/immersiveAudio/controller.ts` | `b1a99b11c2eda2ad3a581040b704452d2666ae414c2c8c924278fbc322e62751` |
| `services/immersiveAudio/profiles.ts` | `09cca1460d48468109ee035c2bf2a18e157b515ee7bbcc69e956025ff3ea32a8` |
| `services/immersiveAudio/interaction.ts` | `47cac9bf6117e6f6a659ddf4f86a347793e00e0e154ea5e226ca3f1151312b65` |
| `components/immersiveWorlds/cafe/CafeEngine.ts` | `5c6617559f37c8f39f05da6d99600479c5917316620218e8db52f62bd40ada74` |
| `components/NatureMode.tsx` | `e91bcd6b6cc27883bd6de89049187ec599102c8e792de7c31270d486cdb54032` |

The18 served resource records, individual hashes, complete built-asset manifest, native inputs and PCM samples are in `audio-scops-run7-korean4b5/results.json` and its `summary.json`. Both the overall failure and functional pass remain explicit.
