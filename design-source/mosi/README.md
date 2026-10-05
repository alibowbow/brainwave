# Mosi Shadow Garden

The mindfulness scene uses geometry exported with Blender 4.3.2 from the author's
`Mosi_Shadow_Garden_responsive.blend`, with all 100 garden gravel objects removed.
The original packed Blender source is retained in the delivered source archive.
The web GLB is evaluated scene geometry, not a box standing in for the artwork.

Five actual Cycles renders (384 samples, no denoiser) supply view-dependent color
projection onto that geometry. The app picks the nearest authored aspect and crops
without stretching. This preserves the reviewed lighting and shadow appearance.
It is **baked illumination**, not real-time cloth physics or a 360-degree room.
Pointer drag is intentionally limited to a small look-around. No new audio is added.

A responsive Cycles image remains visible while loading and if WebGL initialization
fails. The engine does not use float render targets, PMREM, or the previous garden's
GPU-dependent environment pipeline. A shared live-scene host moves one canvas into
immersive mode. Pause, reduced motion and visibility policies remain in force.

Assets: original procedural geometry, original AI-generated ramie base texture
incorporated into Blender renders. No third-party stock models. The GLB contains no
cameras used at runtime or material textures; runtime framing is explicit in code.

Re-export: set MOSI_BLEND to the packed Blender file and run Blender in background
with export_web.py. Convert the five responsive PNGs to quality-95 WebP. Preserve
filenames matching components/immersiveWorlds/mosi/framing.ts.

Binary assets are losslessly gzip/base64 packaged in encoded-assets.json for text-only connector publication. prebuild/predev restore the exact GLB/WebP bytes into public; no network requests or third-party dependencies are used.
