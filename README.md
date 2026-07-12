<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New Project** and import this repository.
3. Use the project root as the **Root Directory**.
4. Vercel can auto-detect Vite, and this repository also includes `vercel.json` with:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Leave `VITE_BASE_URL` unset for Vercel so the app uses the default `/`.
6. Deploy.

## Notes

- This app is a static Vite app. No required runtime environment variables are used by the checked-in code.
- `VITE_BASE_URL` is only needed when deploying under a subpath such as GitHub Pages (`/brainwave/`).
- Styling is compiled with Tailwind CSS via PostCSS (`tailwind.config.js` / `postcss.config.js`) — no runtime CDN.
- The app is an installable PWA (web manifest + service worker via `vite-plugin-pwa`), so it can be added to the home screen and works offline after the first visit.
- Run `npm run typecheck` to type-check without emitting. CI (`.github/workflows/ci.yml`) runs the type check and build on every push/PR.
- Binaural beats rely on a **stereo difference between the left and right ears**, so headphones/earphones are recommended for the intended effect.
- Nature sounds compose into one layered living diorama. Generated painterly plates provide the high-detail summer valley and moonlit pond, while twelve fauna species use paired 5×5 idle/action atlases with irregular NPC-style rests. Five additional shared 5×5 environment atlases contain 125 generated motion cells for clouds, storms, rain, snow, water, waves, streams, waterfall and mist, fire, fireflies, leaves, bubbles, bamboo, temple, tent, rain window, eaves, pebbles, wind chimes, singing bowl, fan, drone, heartbeat and noise particles. Atlas cells switch at fixed anchors; CSS is limited to placement and slow whole-object travel, avoiding sprite sliding and constant dancing. The renderer retains vector fallbacks only for sound types without generated art, and versioned runtime caches refresh scene assets without bloating the install precache.
- Nature audio is a hybrid of real CC0 field recordings and live Web Audio synthesis. Rain, thunder, stream, waterfall, ocean, fire, forest, birds, cricket, and wind textures lazy-load local OGG/MP3 assets only when used; procedural sound starts immediately, supplies fine detail, and remains the fallback if a file is unavailable. Frogs, owl, chimes, singing bowl, drone, fan, and white/pink noise remain procedural. The sounds are layerable in any combination and mixed through a shared stereo reverb. Full recording provenance, licenses, processing commands, measurements, and SHA-256 hashes are in [`THIRD_PARTY_AUDIO.md`](./THIRD_PARTY_AUDIO.md).
- Nature recordings are excluded from the install precache to keep the initial PWA lightweight. A successfully requested recording is stored in a versioned runtime cache for later/offline playback, with codec capability detection preferring Vorbis and falling back to MP3. Decoded buffers use a bounded cache rather than keeping every recording in memory. The mixer retains analyser-calibrated trims, role-weighted multi-layer headroom, gentle mix compression, a separate peak guard, loop-safe procedural beds, and a diffuse predelayed reverb tail. Mixer settings persist locally and are included in saved/recent sessions.

## Deploy to GitHub Pages

1. Commit and push your changes to the `main` branch.
2. Ensure the repo name matches the `VITE_BASE_URL` used for GitHub Pages (default set to `/brainwave/` in the workflow). If your repository name is different, update `VITE_BASE_URL` in `.github/workflows/deploy-gh-pages.yml` and optionally set it in a `.env` file for local builds.
3. GitHub Actions will automatically build the app with `npm run build` and publish the `dist` folder to GitHub Pages.
4. After the workflow completes, your site will be available at `https://<username>.github.io/<repo>/`.
