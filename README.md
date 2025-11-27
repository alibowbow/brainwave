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
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Commit and push your changes to the `main` branch.
2. Ensure the repo name matches the `VITE_BASE_URL` used for GitHub Pages (default set to `/brainwave/` in the workflow). If your repository name is different, update `VITE_BASE_URL` in `.github/workflows/deploy-gh-pages.yml` and optionally set it in a `.env` file for local builds.
3. GitHub Actions will automatically build the app with `npm run build` and publish the `dist` folder to GitHub Pages.
4. After the workflow completes, your site will be available at `https://<username>.github.io/<repo>/`.
