# LivingWoods bounded continuation — integration handoff

**17 selected acceptance jobs passed, with 29 real native-browser PNGs.**
[The machine-readable index](validation-summary.json) identifies each selected job,
its exact source/bundle/runner hashes and image hashes. Earlier failed runs remain
failed in their original reports. This is a draft follow-up, not merge approval.

## Scope

Branch: `codex/living-woods-quality-compat-followup`, created directly from
`a3ec0ca45fc9e545fbee3791a72e1d90a56c7249` on PR #54's
`codex/living-woods-four-worlds`. The original remote head was checked before work;
publication repeats the exact guard. No merge, force-push or original-branch write.

All changes are inside `components/immersiveWorlds/livingWoods/`. Shared core,
wrappers, registries, other scenes, rainyWindow and oilSea are unchanged.
`14940149cc5c0fccb778b58d4d755a04aea55e53` remains an ancestor, and the diff from
that commit outside LivingWoods is empty, preserving the user's sea PR #51.

- Morning: ceramic microtexture/roughness and local highlights, closer physical
  cup/saucer/book support and subtle contact shadow, plus timber grain.
- Rainy/ancient: varied bark, fern scale/direction/shading and nearby branches;
  real forks/canopy cover the rainy scene's visible flat trunk ends.
- Bamboo: irregular soil/vegetation gaps, varied stone size/submersion and calmer
  culm roughness/node shading. Existing nodes, stream geometry and reflection stay.
- Original cameras/composition/input bounds and callback contract remain.
  `active: boolean` is still the only required prop. No independent AudioContext,
  paid service, credential, poster world, external/JEV code or asset was added.

Use the existing [entry-point and callback map](../../INTEGRATION.md) for later
main integration. Its animation-stop description is refined here: paused engines
may retain a drain-only RAF until pending fences retire; simulation stays stopped.

## Reflector and paused work

The owned Reflector target is configured before its first allocation/render.
Genuine `EXT_color_buffer_float` or applicable `EXT_color_buffer_half_float` enables
RGBA16F; WebGL2 alone does not. Otherwise RGBA8/UnsignedByte is selected. The actual
framebuffer must be complete; renderer target, cube face and mip level are restored
in `finally`. An incomplete half-float allocation is disposed before byte retry.
No extension is falsified or GL API patched. There is no PMREM generation path.

Both actual paths passed with complete status **36053** at the unchanged **512×512**
target, samples 0. The normal path used HalfFloat/RGBA16F; forced byte used
UnsignedByte/RGBA8 and produced [this real PNG](evidence/bamboo-scene-desktop-forced-byte.png).
Byte storage has less HDR range/precision; it is not claimed pixel-equivalent.
Supported devices retain the full-quality half-float default.

The original [baseline diagnostic](../followup-evidence/baseline-queue-diagnostic.json)
observed a 30-second nonblocking fence timeout after 13 original scene submissions.
The owned gate bounds pending complete-scene submissions to two, advances simulation
only on submission and coalesces paused resizes to the latest native backing size.
No fixed FPS cap or quality reduction was introduced. WAIT_FAILED, null fence and
context loss fail closed. This addresses a concrete queue-risk observation; it does
not establish a universal cause for every software-renderer delay.

## Verification

| Check | Result and scope |
| --- | --- |
| Typecheck | Passed on final QA source; [gate logs](gates/results.json) |
| Unit tests | 184 passed, 1 opt-in browser wrapper skipped; actual browser runs below |
| Existing app build/budget | Passed; JS 402.6/410 KiB, CSS 99.5/135 KiB; not catalog integration |
| Owned harness build | Passed; includes all four actual scene entries |
| Selected browser jobs | 17 passed across the retained reports below |
| Native PNGs | 29 selected; desktop 1280×800, portrait 390×844, Fold-like 882×768, DPR 1 |
| Input and chrome | Trusted native mouse/keyboard, visible/hidden tap+drag, one bounded callback, Pause, immersive entry/Escape, portrait tap |
| Motion/lifetime | Paused frame/time stable, reduced-motion media/class, synthetic hidden/cancel/blur, same-canvas holder transfer, rapid remount, cold recreation, disposal |
| Reflector | Normal and forced-byte actual complete FBO + PNG; unit capability/restore/failure cases |
| Pixel review | Original and final actual PNG pixels inspected; bounded material/canopy/bank corrections accepted |

Selected runs: [full run](evidence/report.json),
[morning capture/lifecycle retry](morning-final-evidence/report.json),
[final morning/bamboo native-input retry](interaction-final-evidence/report.json).
The summary selects only passing jobs without close errors. All source and PNG
hashes were rechecked before handoff; no unreferenced/stale PNG is included as evidence.
The runner now rejects reused output directories before build/browser startup.

Runtime-source inventory SHA-256 (identical across all selected runs):
`2a3f1d19ccc89ee51ecd3f4c6343e036d781e66c8a6c4704e7c2e0023fbbc89f`.

| Local rendered QA revision | Harness bundle SHA-256 | Selected evidence |
| --- | --- | --- |
| `814fefd1e8ae80daf979d03b1f3783e0b08e06d3` | `c13edb83709474a14341f797fe05bbf6a06bd6b581579768a91cb0bc48ebbb51` | Rainy/ancient; bamboo capture and clean lifecycle |
| `2da658d7ffff1a11106d666366439c2aafe399dc` | `2a76ce74c6a119eb5c04f098ab2710ed73d76b1deb251c754048a55726a4e94f` | Morning capture and clean lifecycle |
| `8c182cdcbf63834ff3e26aeb8e2843872855451f` | `2a76ce74c6a119eb5c04f098ab2710ed73d76b1deb251c754048a55726a4e94f` | Final morning/bamboo native input |

Only QA target selection differs between those bundles. The final runner-only
output-directory guard was checked to reject existing evidence without building,
launching a browser or overwriting any report. Later documentation/evidence do not
change rendered runtime source. Full inventories and runner hashes are in each report.

Direct Git push lacked configured credentials. Publication uses the already
authenticated GitHub Git-data connector to mirror the complete validated tree onto
a new commit with the original head as its sole parent. The new tree must match
the local final Git tree hash exactly before branch creation. Render revisions
above identify local validation commits; the PR records the actual published commit.
No new credential, permission, merge or original-branch write is used.

## Before/after pixels

Original PNGs and their [original report](../evidence/report.json) are untouched.
These are viewport tests, not physical-device performance measurements.

| Scene | Before desktop | After desktop | After portrait |
| --- | --- | --- | --- |
| Morning | [PNG](../evidence/morning-desktop.png) | [PNG](morning-final-evidence/morning-scene-desktop.png) | [PNG](morning-final-evidence/morning-scene-portrait.png) |
| Rainy | [PNG](../evidence/rainy-desktop.png) | [PNG](evidence/rainy-scene-desktop.png) | [PNG](evidence/rainy-scene-portrait.png) |
| Ancient | [PNG](../evidence/ancient-desktop.png) | [PNG](evidence/ancient-scene-desktop.png) | [PNG](evidence/ancient-scene-portrait.png) |
| Bamboo | [PNG](../evidence/bamboo-desktop.png) | [PNG](evidence/bamboo-scene-desktop.png) | [PNG](evidence/bamboo-scene-portrait.png) |

## Host grace versus cleanup

Each selected lifecycle job used a fresh browser with no screenshot requests and
observed drained paused work before removal. The shared host retains a canvas for
5000 ms before disposal. Timings below are milliseconds and are distinct events.

| World | Removal → dispose entry | Synchronous dispose | Dispose entry → actual context-loss event |
| --- | ---: | ---: | ---: |
| Morning | 5003.9 | 19.0 | 19.2 |
| Rainy | 5007.1 | 17.6 | 17.8 |
| Ancient | 5002.3 | 24.5 | 24.7 |
| Bamboo | 5000.4 | 28.2 | 28.4 |

These do **not** measure OS/driver memory reclamation or mean GPU cleanup took five
seconds. Actual host tests separately prove retention through 4999 ms, disposal at
5000 ms, reattach cancellation and identical-canvas transfer.

## Failed history and unrun scope

- [First pass](first-pass-evidence/report.json): 13 job bodies passed; four hidden-hit
  assertions failed. Retained Play focus caused focusout to re-show existing shared
  chrome. A trusted click on the actual H1 now establishes the unfocused viewing
  state; strict hidden hit testing remains. [DOM trace](hit-diagnostic-second/morning-hit-diagnostic.json).
  Morning's later close exceeded 10 seconds after an undrained recreated cold frame;
  final lifecycle jobs drain that frame and require a clean close. Its wrapper font
  import was also corrected in QA. The first-pass PNGs are historical evidence.
- [Cold timeout run](cold-timeout-evidence/report.json): first morning settlement
  exceeded 15 seconds and close exceeded 10 seconds; 16 remaining jobs were unrun.
  The later full run retained four morning cold-settlement failures. DOM telemetry
  showed one pending frame, correct size and paused state; it cannot distinguish
  unfinished software GPU work from delayed retirement callbacks. The same runtime
  subsequently passed unchanged 15-second limits. Timing variability remains a
  real limitation; no timeout was inflated or screenshot queued after failed drain.
- The full run also failed bamboo's portrait box-center tap fixture. The final
  QA-only picker projects and raycast-verifies a real leaf triangle interior, then
  uses the original trusted native input and one-callback assertion. The first
  picker run had a QA JavaScript scope error (`world`); it was corrected to
  `entry.world` and both final input jobs passed. Those failures are preserved.
- **Unrun:** actual App/catalog registration, production audio/autoplay and Back/
  history routing. The harness imports unmodified Player/ImmersiveMode with an owned
  QA backdrop adapter; it is not the integrated App. Final main integration remains
  with the shared integration owner.
- **Unrun:** native background-tab hiding (headless kept pages visible), physical
  touch/Fold hardware, hardware FPS/thermals, half-float-only or unsupported hardware,
  and driver memory-reclamation timing. Synthetic visibility/cancel/blur are labeled
  separately. Forced-byte software rendering proves the real fallback path, not
  every physical driver's behavior.
