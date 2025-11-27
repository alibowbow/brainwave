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
3. The build auto-detects the repo name (from `GITHUB_REPOSITORY`) to set the base path for GitHub Pages, so assets keep working even if you publish from a branch build or forget to set `VITE_BASE_URL`. For local previews, you can still set `VITE_BASE_URL=/<repo>/` in `.env.local` to mirror production.
4. GitHub Actions will build with `npm run build` and publish the `dist` folder to GitHub Pages. After it completes, your site will be available at `https://<username>.github.io/<repo>/`.
5. If you previously used the **Deploy from a branch** option, switch the source to **GitHub Actions** and remove any old `gh-pages` branch so only this workflow publishes—otherwise GitHub Pages will report a deployment conflict.

### If GitHub shows a merge conflict on `deploy-gh-pages.yml`
> The repo now tags this file in `.gitattributes` to auto-prefer the canonical version from your current branch, so most conflicts should resolve automatically. If GitHub still shows a conflict:
1. In the GitHub UI, click **Resolve conflicts** on the pull request.
2. Delete any conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) in `.github/workflows/deploy-gh-pages.yml` and paste in the exact file content from this repository's `main` branch (the canonical workflow lives at `.github/workflows/deploy-gh-pages.yml`).
3. Save the resolution and commit it in the UI, then re-run the workflow. Keeping the canonical workflow avoids legacy branch-based deployments from conflicting with the GitHub Actions Pages flow.
