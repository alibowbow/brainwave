Cozy disposal continuation — overall FAILED; independent fresh-instance diagnostics passed

The one granted run completed in 72.636 s on frozen HEAD `19c0561bff1b17d88c447a63fd8bb7e4315c8514` plus recorded changes, build `index-CkDIijGa.js` / `index-BXP0utCv.css`. Source/dist/application provenance passed. No retry or repo mutation occurred.

| Check | Result | Exact evidence |
|---|---|---|
| Old fixed 20 s resource gate | Failed | Texture accounting remains 1; last read exceeded its remaining 9 ms budget at the absolute 20 s deadline |
| Old separate post-failure quiet check | Passed | Detached/stopped instance 1; frames 2 and draws 1398 stable 734.8 ms |
| Fresh Winter | Passed | New canvas and instance 2, ready in 1345 ms under unchanged 120 s; actual Shift+Tab focus + Enter callback delta 1 assertion passed |
| Fresh fixed 20 s resource gate | Failed | Same retained internal texture accounting |
| Fresh separate post-failure quiet check | Passed | Instance2 frames 13 and draws 9087 stable 895.5 ms; old instance also stayed quiet |
| Actual owner lifetime | Passed | created/disposed 1/1 → 2/2, one actual dispose attempt/return per instance |
| Browser graceful cleanup | Failed | Owned browser close exceeded 15000 ms; only recorded PID 52 killed, SIGKILL exit/ACK confirmed |

Both instances have geometry count 0, texture count 1, no owned targets and running=false after actual dispose returns. Dispose calls took 5.2 / 6.1 ms; all 4 observed canvas listeners were removed. Each raw ledger observed 35 textures created and 30 deleted, leaving IDs 1–4 (identified Three state placeholders) and ID 9 (DFG); no unclassified live textures. Both DFG handles remain undeleted. This explains the owner accounting remainder but preserves the unchanged overall resource failure.

The actual DFG CPU upload is 16×16 RG16F / RG / HALF_FLOAT, 512 Uint16 elements / 1024 bytes, with zero unpack skips/row overrides. Its captured bytes independently equal all installed expected words and hash to `b41ba8e2bd29fa007dfbf034d4d58b853f378062183847846b1f6d228f2c7e79`. Installed Three source hash: `280b75b70d9d55c39d4121d5244c22ee445d27cc05ed6b134c3a5bde6b81b3da`. Exact recorded upload bytes are extracted separately as `dfg-upload-instance-1.bin` and `dfg-upload-instance-2.bin`. This proves upload identity and native handle accounting; no GPU readback, physical reclamation or GC claim is made.

The native callback assertion passed, although the report stores the focused label/status rather than a separate raw before/after callback pair. The focused action was “장작 살짝 건드리기”. Host post-dispose diagnostics are captured once, so later stored snapshots do not measure evolving live renderer memory.

Own preview/verifier processes ended and the recorded Chromium process termination was confirmed after forced cleanup. GPU is released. Browser graceful cleanup remains failed; no cause is inferred from the resource findings. Earlier owner four-world 120 s and integrated 20 s failures remain separate and open.

Exact final failed report: **4,677,187 bytes**, SHA256 `56395e21666e2a63f8efd2497a93a8b823dd866d1925938bf8e70667410b4f46`. It was copied once after child exit, fsynced, and separately re-read with matching hash; original raw report matches.
