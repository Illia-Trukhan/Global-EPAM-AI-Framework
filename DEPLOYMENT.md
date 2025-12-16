# GitHub Pages Deployment Guide

This app is configured to deploy to GitHub Pages automatically.

## Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub: https://github.com/Illia-Trukhan/Global-EPAM-AI-Framework
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **The deployment will happen automatically:**
   - Every time you push to the `main` branch, the app will be built and deployed
   - You can also manually trigger deployment from the **Actions** tab

3. **Access your app:**
   - Once deployed, your app will be available at:
   - `https://illia-trukhan.github.io/Global-EPAM-AI-Framework/`

## Manual Deployment

If you want to deploy manually:
1. Run `npm run build`
2. The built files will be in the `dist` directory
3. Push the `dist` folder to the `gh-pages` branch (if using manual deployment)

## Notes

- The app uses HashRouter for GitHub Pages compatibility
- The base path is set to `/Global-EPAM-AI-Framework/` in `vite.config.ts`
- All routes will work with hash-based routing (e.g., `/#/skills`)

