# Native offline audio evidence

`metrics.json` contains **95 passing checks**, five example renders and 19 comparative/control renders from Chromium's native `OfflineAudioContext`. The WAV files contain only original procedural touch accents; they are not complete ambience recordings or mixes. No listening test was performed.

## Reproduce

Use the project's existing `esbuild` and `playwright-core` installations plus an already installed Chromium binary. This script installs nothing, starts no web server, and makes no network request.

```sh
BRAINWAVE_CHROMIUM_PATH=/absolute/path/to/chromium node services/immersiveAudio/qa/render-offline.mjs
```

The executable-path variable is optional if Playwright already has its expected browser installed. Production source is bundled into an operating-system temporary directory, then injected into an isolated blank browser page. Temporary bundles are removed after the run. `metrics.json` and `examples/*.wav` are regenerated only within this QA directory.

The report records SHA-256 values for all six production source files, the QA script and each WAV. It refuses to save the evidence if any production source changes during the run. The recorded browser is Chromium 153.0.8010.0, sample rate 48 kHz, stereo. Each example uses intensity 1, centered pan, and an injected output gain of 1, with no normalization. Files are PCM16 WAV; separate float-render and quantized-WAV statistics are supplied.

## Results

| Cue | WAV duration (s) | Native float peak | Native float RMS |
| --- | ---: | ---: | ---: |
| water-drop | 1.05 | 0.00862384 | 0.00185061 |
| soft-rustle | 1.45 | 0.00471483 | 0.00063553 |
| ceramic-touch | 0.90 | 0.00763389 | 0.00138569 |
| ember-tick | 0.75 | 0.00321821 | 0.00038394 |
| soft-resonance | 3.40002083 | 0.00957019 | 0.00219304 |

All samples were finite, there were zero samples at or above digital full scale, and each example had exactly silent first/last samples. The long example's one extra frame comes from floating-point duration rounding and is included in its reported duration. RMS includes the natural tail and approximately 0.2 seconds of final silence; it is not an integrated loudness measurement.

Comparative renders verify:

- Quarter intensity and quarter injected bus gain each scale actual samples linearly; zero injected gain produces exact silence.
- Inactive, muted, blocked, paused and disposed controllers reject new cues and produce silence.
- Stereo pan changes the expected channel energy; excessive pan matches the clamped waveform.
- Two real voices can overlap; a third request is rejected. Maximum allowed overlap stays finite and unclipped.
- Pause produces a native linear release ending at the requested 60 ms boundary and then exact silence. Mute/gate closure/dispose disconnect active voices immediately, as designed.
- A native suspended context rejects playback; finished renders leave zero voices.

A silent, QA-only `ScriptProcessor` schedules mid-render calls while the actual production controller uses the native context. Chromium can apply these control messages in the current or next 128-frame audio quantum, so the release assertion compares the full waveform against only those two explicit ramp starts and records the measured latency. It does not alter native context state or time. Production code does not use this scheduler or create a context.

## Evidence limits

These are digital sample measurements, not a listening test, LUFS result, physical SPL measurement or real-device/browser compatibility certification. They do not prove that the accents sound natural in a final scene. Real-device audition, licensed ambience balance, UI bridge behavior, and the full production engine remain the core integrator's verification responsibilities. Unit tests separately cover invalid requests, exception paths, rate limits, profile coverage and saved/custom-mix preservation.
