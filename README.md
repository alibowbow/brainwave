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
- Nature sounds compose into one layered living diorama: creatures and objects (birds, frogs, owl, cricket, fish, campfire, tree, wind chimes…) appear as cute characters, while weather and water (rain, thunderstorm, winter wind, ocean waves) render as scenery — rainfall, lightning flashes, drifting snow, a rolling sea — so any combination blends into a coherent scene.
- All background sounds are synthesized live in the browser (Web Audio API) — no audio files. The library includes rain, thunderstorm, stream, waterfall, ocean waves, campfire, forest wind, birds, cicadas, frogs, owl, night crickets, wind chimes, singing bowl, deep drone, winter wind, seabirds, fan, and white/pink noise — layerable in any combination, mixed through a shared stereo reverb for depth.
- The v3.8 mixer uses calibrated source trims, perceptual master/bus controls, automatic multi-layer headroom, loop-safe 8-second noise beds, and a DC-blocked safety limiter. Mixer settings persist locally and are included in saved/recent sessions.

## Deploy to GitHub Pages

1. Commit and push your changes to the `main` branch.
2. Ensure the repo name matches the `VITE_BASE_URL` used for GitHub Pages (default set to `/brainwave/` in the workflow). If your repository name is different, update `VITE_BASE_URL` in `.github/workflows/deploy-gh-pages.yml` and optionally set it in a `.env` file for local builds.
3. GitHub Actions will automatically build the app with `npm run build` and publish the `dist` folder to GitHub Pages.
4. After the workflow completes, your site will be available at `https://<username>.github.io/<repo>/`.
