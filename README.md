<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1dobbbv_ujqtPfH4jbdcMabTs2brkBa7j

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

- This app is currently a static Vite app. No required runtime environment variables are used by the checked-in code.
- `VITE_BASE_URL` is only needed when deploying under a subpath such as GitHub Pages (`/brainwave/`).

## Deploy to GitHub Pages

1. Commit and push your changes to the `main` branch.
2. Ensure the repo name matches the `VITE_BASE_URL` used for GitHub Pages (default set to `/brainwave/` in the workflow). If your repository name is different, update `VITE_BASE_URL` in `.github/workflows/deploy-gh-pages.yml` and optionally set it in a `.env` file for local builds.
3. GitHub Actions will automatically build the app with `npm run build` and publish the `dist` folder to GitHub Pages.
4. After the workflow completes, your site will be available at `https://<username>.github.io/<repo>/`.
