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
2. In GitHub → **Settings → Pages**, set **Source** to **GitHub Actions** (not a branch build) so the workflow can publish the site.
3. The workflow sets `VITE_BASE_URL` to `/${repo-name}/` automatically; no manual edits are needed even if you fork or rename the repo. For local previews, you can set the same value in `.env.local`.
4. GitHub Actions will build with `npm run build` and publish the `dist` folder to GitHub Pages. After it completes, your site will be available at `https://<username>.github.io/<repo>/`.
