# Shared rendering for immersive worlds

Code-only building blocks for lifting the procedural worlds toward current
console quality. Nothing here loads external models or textures.

| Module | What it gives a world |
|---|---|
| `hdrPipeline.ts` | Half-float, multisampled scene target with depth; screen-space AO; an optional world-owned volume pass (god rays, mist) at half resolution with a depth-aware blur and upsample; Karis-weighted bloom pyramid; fitted ACES tone curve, split-tone grade, vignette, grain and dithering. Returns `null` without float colour buffers so the engine keeps its direct path. |
| `rockSurface.ts` | World-space stone for `MeshStandardMaterial`: mineral blotches, strata, stains, sparse fractures, wet band and drip streaks driving roughness, finite-difference bump, optional moving water caustics. |
| `rockGeometry.ts` | Faceted, eroded boulders normalised to a unit box. |
| `woodSurface.ts` | Sawn-timber grain (rings, figure, fibres, pores), optional shader-drawn boards, varnish clearcoat. |
| `fabricSurface.ts` | Plain, twill, knit and velvet weaves in uv space with sheen and an anti-aliasing fade. |
| `interiorSurface.ts` | Plaster and ceramic glaze, plus the `patchSurface` bump helper the other surfaces share. |
| `barkSurface.ts` | Furrowed, plated bark with lichen, moss and rain wetness, for `treeGeometry` trunks. |
| `treeGeometry.ts` / `foliageShading.ts` / `foliageTextures.ts` | Procedural branching trees with root flare and leaf-cluster cards; shared canopy-transmittance function (ground dapples and volume shafts agree), slow unsynchronised wind, leaf translucency, alpha that stays dense at distance; leaf, frond and bamboo atlases drawn in code. |
| `translucentSurface.ts` | Wrap light, thin-sheet transmission and back-glow for membranes, petals and fabric. |
| `wetSurface.ts` / `rainStreaks.ts` | Rain-wet surfaces (darkening, puddles with ripple rings, dry zones under shelter); GPU rain at several depths with drips, splashes and eave runoff. |
| `snowSurface.ts` / `snowFall.ts` | Settled snow with blue shade and facet glints; GPU snowfall in depth layers. |
| `fireFlame.ts` | Ray-marched HDR flame from a tileable noise volume, embers, shimmer and a smooth light flicker. |
| `skyNight.ts` | HDR night sky (gradient, Milky Way, phased moon, stars) and a radiance probe built from it. |
| `noise.ts` / `glsl.ts` | The same PCG-hashed gradient noise on the CPU (geometry displacement) and GPU (shading), plus fBm and ridged variants. `GLSL_DEPTH` snaps depth reads to texel centres so half-resolution passes stay stable. |
| `targets.ts` | Full-screen pass, render-target helpers, bloom chain sizes, MSAA choice. |

## Adopting it in an engine

1. Create the pipeline after the world exists:
   `HdrPipeline.create(renderer, { settings, volume: () => world.createVolume() })`.
2. Forward `setSize(width, height, pixelRatio)` and replace `renderer.render(scene, camera)` with `pipeline.render(scene, camera, time)`.
3. Dispose it with the engine. Keep the direct path for `null`.

The deep-water engine (`deepWater/engine/DeepWaterEngine.ts`) is the reference
integration; the cave (`deepWater/engine/cave.ts`) shows a volume pass, the
rock shader with caustics and a radiance probe for wet reflections. Every
upgraded family follows the same pattern, and each family's QA harness accepts
`post=off` to render the direct path for comparison.

## Checking the look

`node components/immersiveWorlds/deepWater/qa/capture-quality.mjs` builds the
isolated harness and writes PNGs. `DEEP_WATER_QUERY=post=off` captures the
previous direct renderer for comparison; `DEEP_WATER_ACTIVE=<frames>` captures
after animation. SwiftShader output grades appearance only, not device speed.
