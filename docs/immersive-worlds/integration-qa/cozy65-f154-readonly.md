# Cozy PR65 f154065 read-only delta audit

**Owned-code intake is suitable as a bounded candidate; winter lifecycle acceptance remains blocked.** Audited immutable commit `f1540653283a09ddb91427a2e1692466275db2c7` against `6ba4eee62f490360decb1c51007e8d3e604a7315`. Published tree is `778af9c04fafeb0c521be68e88e766a6551fdc64`; GitHub PR65 remains open/draft at that exact head. CI37238237316 completed success. This reviewer used a unique read-only fetch ref and outside-repository extraction/report files; no reset, code edit, GPU, render or test execution.

## Exact delta and semantics

79 changed paths, all under `components/immersiveWorlds/cozyRooms/**`: one production file `engine.ts`, plus78 diagnostic/QA files. No visual factory, material, wrapper, props/callback, input, scheduler, shared host, registry, protected scene or public asset changes. Original QA entry and `verify.mjs`/`verify-group.mjs` are byte-identical to6ba4eee; historical followup failure documents are unchanged.

The engine stores one `Vector2` and skips `setPixelRatio` when the clamped1–2 DPR is already equal, then skips renderer `setSize` when logical dimensions already match. Actual size/DPR changes still resize. Camera/world resize, projection and baseline rotation still run. Source review found no extra render suppression, altered quality or changed lifecycle timing.

The installed Three renderer bytes independently match the owner's recorded SHA256 `9e8740aad691246b31b3704014e8f3bbd38a8e7bf4b1b4d23868541b023cc63a`. In those bytes, setPixelRatio calls setSize and setSize unconditionally assigns both canvas backing dimensions. The candidate removes a verified redundant operation. The owner's complete clean probe records backing writes12→2 per mount while retaining two static frames; this is not proof that the original recreation failure is fixed. Real changed-DPR browser behavior remains source-reviewed only.

## Independent provenance and pixels

| Check | Read-only result |
|---|---|
| Runtime source | All14 file hashes and aggregate match `4d83102d72152dec1a831b592e3624d608197c2a9714d5a22a4ca2ea9807ee2c` |
| Artifact manifest | All77 listed file hashes and byte counts match; manifest SHA256 `e9c3cd4f640e3d8c84f43a4d87f89d42e544f5652d83f59f635d8816ee111e67` |
| Final PNGs | All11 hash/byte/dimensions match;10 cold captures byte-identical to6ba4eee images previously actually opened across all four scenes/viewports |
| New chrome PNG | Actual new relax chrome image opened; correct fireplace/room/controls, no placeholder substitution |
| Final original/cycle provenance | Both use exact final source and recorded bundle `94d67a1b92ff2723ecd68620c2547ec8c036bb3f08907f2391cdde48067180be` |
| Bundle limitation | Emitted bundle bytes are not committed; matching recorded bundle manifests are verified, no independent rebuild claim |

Machine-readable results: `cozy65-f154-hash-audit.json`. Recorded test HEAD6ba4eee labels the owner's base working tree; the source hash binds the tested candidate to publishedf154065.

## Gate remains held

Read the actual final world reports and failure log: relax, sleep_prep and power_nap each pass26 labels; winter has no completed result and the unchanged recreated visible ready-canvas wait times out at120000ms. The preceding eventual-disposal assertions passed. This third retained uninstrumented failure is bound to the new source. Both previous6ba4eee failures remain unchanged. Empty captured console/page errors do not establish the timeout's internal cause.

The separate native cycle report does pass: one page, engines/canvas objects1/2/3, two successive fresh recreations, native trusted Enter/click→exactly one cup callback per cycle, one static redraw per action, final created=disposed=3 and no recorded error. Its source/bundle matches final original evidence. It is a smaller workload and **does not clear the original failure**. About5039–5041ms unmount-to-disposed includes configured5000ms grace and polling; it is not physical GPU reclamation.

The diagnostic report locates a100.196s synchronous render boundary in the complete baseline probe. Candidate events386–396 are missing, so its49.7622s factory-entry→render-return interval cannot be partitioned. No driver-only, shader, GPU-backlog, resource-reuse or shared-host cause is proved. Original motion-only pixels remain UNRUN because the original gate prerequisite rejects; integrated routes/fullscreen/audio, real tab hiding, physical device/DPR changes and hardware performance remain separate.

## Minimal central implication

Coordinator may intake only this exact owned engine delta plus its evidence as the current draft candidate. No new central registry/props/audio adaptation is needed. Preserve the existing shared-core implementation and all other owners; these diagnostics justify no shared-host or renderer workaround. Continue holding the original winter recreation and dependent motion/integration gates. This is a safe source-intake judgment, not permission to mark the scene accepted or merge past the failed gate.
