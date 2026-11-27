# Forest pilot file inventory

All changes stay inside the two assigned forest directories.

## components/immersiveWorlds/forest/

- `.gitignore`
- `ForestEngine.ts`
- `ForestWorld.tsx`
- `botany.ts`
- `build-qa.mjs`
- `forest.browser.test.ts`
- `forest.css`
- `forestHost.ts`
- `forestMath.test.ts`
- `forestMath.ts`
- `forestStones.ts`
- `harness.html`
- `harness.tsx`
- `harness.vite.config.ts`
- `integration.md`
- `qa/attempt-1-ci.json`
- `qa/attempt-2-ci.json`
- `qa/attempt-2/forest-desktop.jpg`
- `qa/attempt-2/forest-fold-landscape.jpg`
- `qa/attempt-2/forest-fold-portrait.jpg`
- `qa/attempt-3-ci.json`
- `qa/attempt-4-ci.json`
- `qa/attempt-5-ci.json`
- `qa/attempt-6-ci.json`
- `qa/browser-report.json`
- `qa/files.md`
- `qa/forest-desktop.jpg`
- `qa/forest-fold-landscape.jpg`
- `qa/forest-fold-portrait.jpg`
- `qa/forest-motion.jpg`
- `qa/paused-start-report.json`
- `qa/verification.md`
- `references.md`

## public/immersive-worlds/forest/

- `qa/LICENSES.txt`
- `qa/build-manifest.json`
- `qa/forest-qa.mjs`
- `qa/index.html`

## HDR upgrade (2026-11)

Added inside `components/immersiveWorlds/forest/` only; no shared, app or other
family file changed, and the public preview bundle above was not rebuilt.

- `forestLight.ts`: sun, canopy light cookie, shared surface patch (cookie, wind, translucency, underwater light)
- `forestAtmosphere.ts`: HDR sky, canopy ambient probe, volume pass, post settings, per-path fog
- `forestTrees.ts`: lofted trunks with buttresses and roots, limbs, crown lobes, bark and canopy materials
- `forestFoliage.ts`: canopy sprig atlas, leaf-cluster, fern-frond, grass-tuft and litter-leaf geometry
- `forestUndergrowth.ts`: forest-floor ground and material, ferns, grass, litter, twigs, floating leaves
- `forestWater.ts`: pool reflection shader
- `qa/capture-hdr.mjs`: before/after and animated captures of the isolated harness
- `qa/evidence/hdr-upgrade/`: side-by-side BEFORE/AFTER JPGs and the capture reports
