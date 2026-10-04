# Cosmic pilot asset provenance

All garden, botanical and celestial meshes/textures are generated locally by the
original code in `components/immersiveWorlds/cosmic/`. No remote scene assets,
reference source, reference images, AI-generated image files or paid assets are used.

`preview/` is a reproducible Vite build of the owned validation harness. It uses
existing repository dependencies (React MIT, Three.js MIT, Pretendard SIL OFL).
The font is copied by Vite from the existing `pretendard` package; its upstream
OFL license is copied from its official upstream repository into `preview/Pretendard-OFL.txt` (the installed package declares OFL-1.1 and its README explicitly permits redistribution). Build details and the dependency
lockfile remain in the repository. The component’s `validation/screenshots/` contains actual Chromium captures
and factual validation output; those are evidence, not textures used by the scene.

The reference repositories have no verified reuse license; no material from them
is copied into this directory. Detailed review notes are in the component's
`validation/REFERENCES.md`.
