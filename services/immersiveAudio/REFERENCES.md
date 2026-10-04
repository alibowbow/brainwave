# Reference decisions and provenance

Read against core PR #48 at `7816e3b3b9704aed0ad94c87038acf50bfb43b21`: `docs/immersive-worlds/scene-upgrade-implementation-brief.md` and `opus-balanced-benchmark-addendum.md`. Both JEV collections inform the distinctions below. The core documents preserve the planner's original source/render inspection; this audio worker does not claim to have rendered or auditioned those demos.

| Reference | Apply to this audio module | Defer or reject |
| --- | --- | --- |
| [Opus 092 Soundscape Mixer](https://miaai-lab.github.io/Claude-Opus-5.5-100-HTML-Files/092-soundscape-mixer.html), original source pinned by addendum to `86ad33f7928bd6289b84ef9049c39a6d5bbc4fe0` | Restrained filtered synthesis, sparse events, smooth gain changes, pan and a gesture/transport gate. Existing Brainwave buses and peak protection remain in charge. | Do not transplant its mixer or treat its synthetic cafe murmur as a verified field recording. No source or asset copied. |
| [Sonnet 036 Rainy Sunday Records](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/036-lofi-turntable.html), collection source pinned in brief to `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d` | A close cup/quiet room suggests a small intentional ceramic cue, with rain as the existing bed. | No music player, intelligible speech or another audio context. Visual composition remains the cafe worker's responsibility. |
| [Sonnet 092 Nocturne Window Seat](https://miaai-lab.github.io/Sonnet-5.5-100-HTML-Files/092-rainy-window-bokeh.html), same Sonnet pin | Keep the source's rain/window relationship as scene intent; distinguish close touch detail from the exterior bed. | Reject its flash/thunder behavior for these quiet defaults. Do not pretend the existing shared rain recording implements distinct fabric/glass/leaf material acoustics. |
| Sonnet 073 ocean / 031 snow, as inspected in the brief | Preserve quiet scene identity. | No sonar, giant creature calls, shaking-triggered chime or lullaby. Deep sea uses an explicitly provisional low bed because the current engine source includes whale-like calls. |

The Opus page's public text was reopened for this task; that is not an audio audition. The pinned planning documents record no verified reuse grant for either reference collection. All five new cues and all module code are original; there are no copied assets or external downloads. Existing recordings retain `audioSamples.ts` / `THIRD_PARTY_AUDIO.md` provenance unchanged.

Native offline QA follows the platform's [OfflineAudioContext contract](https://www.w3.org/TR/webaudio/#OfflineAudioContext). QA-only rendering contexts are isolated from production. Measurements are kept separate from perceptual claims.
