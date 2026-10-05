# Audio bridge validation — 2026-10-04

**Passed:9/9 actual-app audio checks, plus the focused Player clipping regression.** Full execution ended at 2026-10-04T22:21:08.110Z. Both final runs closed their owned browser/preview normally; no page or cleanup error was recorded.

Verified frozen build: `index-D0DhBDB7.js` / `index-Dxjefzym.css`. Source HEAD was `693f49529e0d5194710dbd8df10c59058491019c` with the Player layout fix in the working tree. This is evidence for the recorded file/build hashes, not a claim that the untouched HEAD alone contains the fix. Player SHA256: `a90335757d6b9b67ff91fe7784f4548e63e2706cc2009ac79a11596e3024aa37`. All82 served JS/CSS resources matched the frozen asset hashes; source/build stayed unchanged throughout the full run.

| Actual-browser check | Result |
|---|---|
| Cold autoplay and fresh café profile | Before first trusted Play:1 suspended context,0graphs/starts; UI and persisted window0.32/pink0.09 agree |
| Native semantic cup touch |1callback→1 bounded0.7-second cue through existing background/master/safety graph; no extra AudioContext |
| Master0 then restore | Cue suppressed after cooldown; native restore enables positive control on same graph |
| Window source0 then restore | Cue suppressed while transport runs; native restore enables positive control |
| Edited native pause/resume | Window0.17/pink0.04 preserved; paused tap gives0callback/cue; resumed cue works with1context |
| Saved user restore | Explicit café identity preserves custom levels, mute and master/background mix; muted required source yields no cue |
| Last-session restore | Same preservation and mute eligibility |
| Explicit HTTP503 rain fixture | Actual failed-window status and1semantic callback produce0cues; independent pink PCM remains nonzero with brainwave disabled |
| Explicit held-resume cancellation fixture | Native Minimize at412.2ms sees starting/held before1200ms timeout; later real running context still has0graphs/starts/cues |

Inputs were real mouse, wheel and keyboard operations. There was no synthetic pointer dispatch, forced click, style override, direct scene interaction call or engine exposure. The cold path uses raw CDP with userGesture:false; actual control pointerdown verifies intended target, visible chrome, ancestor opacity and elementFromPoint hit. The only behavior fixtures are isolated saved-state records, an explicitly reported HTTP503 response, and a clearly labeled held native-resume promise released through a trusted neutral click.

The investigation found and confirmed a real desktop Player defect before passing: an independently590px-tall inner scroll area extended below a666px overflow-hidden aside. Even native maximum scroll left Pink center outside the aside and hitting MAIN. The flex-column/min-height:0 fix reduced the inner viewport to524px. The unchanged paused regression then hit INPUT at(889,721), with its full y699–743 range inside the aside. This fix was also exercised by the actual Pink edit in the full audio run.

Evidence directories:

- `audio-full-run4-fixed/results.json` and `summary.json`: full9check pass, exact fixtures/native audio graph records, hashes and cleanup.
- `audio-clip-run3-fixed/results.json`: focused fixed-layout pass and complete clipping/hit ancestry.
- `audio-clip-run2/results.json`: preserved confirmed app-defect baseline.
- `audio-live-run1`, `audio-live-run2`, `audio-live-run3`, `audio-clip-run1`: earlier failed runs remain preserved. Later passes do not erase those observations.

Limits: this verifies a representative café audio bridge and state-safety integration. It does not approve perceived sound quality, all30mixes/interactions, physical-device audio, GPU performance or the remaining all-world functional gates. No listening was performed. No repository changes were made by this reviewer.
